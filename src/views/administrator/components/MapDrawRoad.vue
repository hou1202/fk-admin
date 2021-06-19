<template>
  <!-- 线路规划设计-->
  <!-- 父组件调用时，需prop工地信息transInfo
        -> 工地经纬度：siteLng /siteLat
        -> 工地电子围栏：siteFence     (非必传)
        -> 消纳场经纬度：absorLng /absorLat
        -> 消纳场电子围栏：absorFence     (非必传)
        -> 规划线路：transLine     (非必传)
  -->
  <!-- 父组件中需定义接收事件：@return-draw-road -->
  <div v-if="value">
    <el-dialog
      title="规划运输线路"
      width="100%"
      append-to-body
      :before-close="close"
      :close-on-click-modal="false"
      :fullscreen="true"
      :visible.sync="winCards"
      class="design-map"
    >

      <div class="design-road">

        <div id="container" style="width:100%;height:100%;" />

        <div class="design-fun">
          <el-button type="warning" :disabled="enButton" plain @click="stDrawLine" class="design-button">
            绘制线路
          </el-button>
          <el-button type="warning" :disabled="enButton" plain @click="unDrawLine" class="design-button">
            消除线路
          </el-button>
          <el-button type="warning" :disabled="enButton" plain @click="close" class="design-button">
            取消
          </el-button>
          <el-button type="warning" :disabled="enButton" plain @click="handleSave" class="design-button">
            确 认
          </el-button>
        </div>

      </div>

    </el-dialog>
  </div>
</template>
<script>

export default {
  name: 'MapDrawRoad',
  props: ['value', 'transInfo'],
  data() {
    return {
      winCards: true,
      enButton: false,
      map: null,
      mapStyle: require('@/assets/map-json/base_map_config.json'),
      siteImg: require('@/assets/gong.png'),
      absorImg: require('@/assets/xiao.png'),
      returnData: [],       // 绘制线路坐标点,需返回给父组件数据
      drawLine: null,     // 鼠标绘制管理类实例化对象
      overlays: null,     // 新绘制线路对象
      existOverlay: [],   // 已存在的线路对象
    }
  },
  methods: {
    close() {
      this.$emit('input', false)
    },

    initMap() {
      this.map = new BMapGL.Map('container')
      var points = new BMapGL.Point(this.transInfo.siteLng, this.transInfo.siteLat)
      this.map.centerAndZoom(points, 16) // 创建中心点坐标及地图层级
      this.map.enableScrollWheelZoom(true)
      this.map.setMapStyleV2({    // 加载自定义地图样式
        styleJson: this.mapStyle
      })

      // 线的样式
      var polylineStyle = {
        strokeColor: '#67C23A',   // 边线颜色
        fillColor: '#67C23A',     // 填充颜色。当参数为空时，圆形没有填充颜色
        strokeWeight: 4,          // 边线宽度，以像素为单位
        strokeOpacity: 1,         // 边线透明度，取值范围0-1
        fillOpacity: 0.2          // 填充透明度，取值范围0-1
      }
      // label的样式
      var labelOptions = {
          borderRadius: '5px',
          background: '#FFFBCC',
          border: '1px solid #E1E1E1',
          color: '#70480f',
          fontSize: '12px',
          letterSpacing: '0',
          padding: '8px'
      };
      // 初始化图形绘制工具
      this.drawLine = new BMapGLLib.DrawingManager(this.map, {
          isOpen: false,            // 是否开启绘制模式
          enableDrawingTool: false, //是否添加绘制工具栏控件
          enableCalculate: false,   // 绘制是否进行测距/测面
          enableSorption: true,     // 是否开启边界吸附功能
          sorptiondistance: 20,     // 边界吸附距离
          polylineOptions: polylineStyle,   // 线样式
          labelOptions: labelOptions // label样式
      });
      // 设置当前的绘制模式:线型
      this.drawLine.setDrawingMode(BMAP_DRAWING_POLYLINE);

      /* 添加事件监听 */
      this.drawLine.addEventListener("overlaycomplete", (e) => {    // 成功派发事件
        this.overlays = e.overlay
        this.enButton = false;
      });
      this.drawLine.addEventListener("overlaycancel", (overlay) => {    // 失败派发事件
        this.enButton = false;
      });

      // 创建工地标注图标
      var siteIcon = new BMapGL.Icon(this.siteImg, new BMapGL.Size(25, 36))
      var siteMarker = new BMapGL.Marker(new BMapGL.Point(this.transInfo.siteLng, this.transInfo.siteLat), { icon: siteIcon })
      this.map.addOverlay(siteMarker)
      // 创建工地多边形，如果存在工地多边形数据
      if(this.transInfo.siteFence && this.transInfo.siteFence.length > 0)
        this.$bdMap.drawPolygon(this.map, this.transInfo.siteFence)

      // 创建消纳场标注图标
      var absorIcon = new BMapGL.Icon(this.absorImg, new BMapGL.Size(25, 36))
      var absorMarker = new BMapGL.Marker(new BMapGL.Point(this.transInfo.absorLng, this.transInfo.absorLat), { icon: absorIcon })
      this.map.addOverlay(absorMarker)
      // 创建消纳场多边形，如果存在消纳场多边形数据
      if(this.transInfo.absorFence && this.transInfo.absorFence.length > 0)
        this.$bdMap.drawPolygon(this.map, this.transInfo.absorFence, 2)

      // 绘制线路，如果存在已绘制线路数据，并将返回的线路overlay对象进行存储，方便后期进行清除
      if(this.transInfo.transLine && this.transInfo.transLine.length > 0) 
        this.existOverlay = this.$bdMap.drawPolyline(this.map, this.transInfo.transLine)
    },

    /* 返回百度地图数组坐标点*/
    returnMapArr(arr) {
      let reArr = [];
      arr.forEach((item, index) => {
        reArr.push(new BMapGL.Point(item.lng, item.lat))
      })
      return reArr
    },

    /* 保存绘制线路*/
    handleSave() {
      if(this.overlays)
        this.returnData = this.overlays.getPath()

      this.$emit('return-draw-road', this.returnData)
      this.close()
    },

    /* 开始绘制线路*/
    stDrawLine() {
      this.enButton = true;     // 禁用按钮操作
      this.clearOverlays();

      // 开启地图的绘制模式
      this.drawLine.open();
    },

    /* 清除已绘制线路*/
    unDrawLine() {
      this.enButton = false;    // 开启按钮操作
      this.clearOverlays();
    },

    /* 清除新老overlay中的线性覆盖物对象*/
    clearOverlays() {
      // 清除老线路覆盖物
      if(this.existOverlay.length > 0) {
        this.existOverlay.forEach((item, index) => {
          this.map.removeOverlay(item)
        })
      }

      // 清除新绘制线路覆盖物
      if(this.overlays)
        this.map.removeOverlay(this.overlays)

      // 重新置空数据
      this.returnData = [];
      this.overlays = null;
    }

  },
  created() {

  },
  mounted() {
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = '//mapopen.bj.bcebos.com/github/BMapGLLib/DrawingManager/src/DrawingManager.min.js';
    //s.src = '//api.map.baidu.com/library/DrawingManager/1.4/src/DrawingManager_min.js';     //普通BMapLib版本
    document.body.appendChild(s);
  },
  watch: {

    value(v) {
      if(this.value) {
        this.$nextTick(() => {
          this.initMap()
        })
      }
    }
  }
}
</script>
<style scoped>
  @import '//mapopen.cdn.bcebos.com/github/BMapGLLib/DrawingManager/src/DrawingManager.min.css';
  /* 普通BMapLib版本 */
  /* @import '//api.map.baidu.com/library/DrawingManager/1.4/src/DrawingManager_min.css';  */
</style>
<style lang="scss">
  .design-map {
    .el-dialog {
      width: 100% !important;

      .el-dialog__header {
        display: none;
      }

      .el-dialog__body {

        height: 100%;
        max-height: 100% !important;
        padding: 20px;

        .design-road {
          width: 100%;
          height: 100%;
          position: relative;

          .design-fun {
            width: 100%;
            position: absolute;
            top: 10px;
            z-index: 100;
            text-align: center;
          }
        }
      }

    }
  }

#container {
  border-radius: 5px;
}
</style>
