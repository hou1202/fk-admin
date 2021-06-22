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
          <el-button type="warning" :disabled="enButton" plain class="design-button" @click="stDrawLine">
            绘制线路
          </el-button>
          <el-button type="warning" :disabled="enButton" plain class="design-button" @click="unDrawLine">
            消除线路
          </el-button>
          <el-button type="warning" :disabled="enButton" plain class="design-button" @click="close">
            取消
          </el-button>
          <el-button type="warning" :disabled="enButton" plain class="design-button" @click="handleSave">
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
      siteImg: require('@/assets/point-site.png'),
      absorImg: require('@/assets/point-absor.png'),
      returnData: [], // 绘制线路坐标点,需返回给父组件数据
      drawLine: null, // 鼠标绘制管理类实例化对象
      overlays: null, // 新绘制线路对象
      existOverlay: [] // 已存在的线路对象
    }
  },
  watch: {

    value(v) {
      if (this.value) {
        this.$nextTick(() => {
          this.initMap()
        })
      }
    }
  },
  created() {

  },
  mounted() {
    const s = document.createElement('script')
    s.type = 'text/javascript'
    s.src = '//mapopen.bj.bcebos.com/github/BMapGLLib/DrawingManager/src/DrawingManager.min.js'
    // s.src = '//api.map.baidu.com/library/DrawingManager/1.4/src/DrawingManager_min.js';     //普通BMapLib版本
    document.body.appendChild(s)
  },
  methods: {
    close() {
      this.$emit('input', false)
    },

    initMap() {
      this.map = this.$bdMap.initBPGL({
        el: 'container',
        lat: this.transInfo.siteLat,
        lng: this.transInfo.siteLng
      })

      // 线的样式
      var polylineStyle = {
        strokeColor: '#67C23A', // 边线颜色
        fillColor: '#67C23A', // 填充颜色。当参数为空时，圆形没有填充颜色
        strokeWeight: 4, // 边线宽度，以像素为单位
        strokeOpacity: 1, // 边线透明度，取值范围0-1
        fillOpacity: 0.2 // 填充透明度，取值范围0-1
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
      }
      // 初始化图形绘制工具
      this.drawLine = new BMapGLLib.DrawingManager(this.map, {
        isOpen: false, // 是否开启绘制模式
        enableDrawingTool: false, // 是否添加绘制工具栏控件
        enableCalculate: false, // 绘制是否进行测距/测面
        enableSorption: true, // 是否开启边界吸附功能
        sorptiondistance: 20, // 边界吸附距离
        polylineOptions: polylineStyle, // 线样式
        labelOptions: labelOptions // label样式
      })
      // 设置当前的绘制模式:线型
      this.drawLine.setDrawingMode(BMAP_DRAWING_POLYLINE)

      /* 添加事件监听 */
      this.drawLine.addEventListener('overlaycomplete', (e) => { // 成功派发事件
        this.overlays = e.overlay
        this.enButton = false
      })
      this.drawLine.addEventListener('overlaycancel', (overlay) => { // 失败派发事件
        this.enButton = false
      })

      // 创建工地标注图标
      this.$bdMap.markerPoint(this.map, {
        lat: this.transInfo.siteLat,
        lng: this.transInfo.siteLng,
        icon: require('/src/assets/point-site.png')
      })
      // 创建工地多边形，如果存在工地多边形数据
      if (this.transInfo.siteFence && this.transInfo.siteFence.length > 0) { this.$bdMap.markerPolygon(this.map, this.transInfo.siteFence) }

      // 创建消纳场标注图标
      this.$bdMap.markerPoint(this.map, {
        lat: this.transInfo.absorLat,
        lng: this.transInfo.absorLng,
        icon: require('@/assets/point-absor.png')
      })
      // 创建消纳场多边形，如果存在消纳场多边形数据
      if (this.transInfo.absorFence && this.transInfo.absorFence.length > 0) { this.$bdMap.markerPolygon(this.map, this.transInfo.absorFence, 2) }

      // 绘制线路，如果存在已绘制线路数据，并将返回的线路overlay对象进行存储，方便后期进行清除
      if (this.transInfo.transLine && this.transInfo.transLine.length > 0) { this.existOverlay = this.$bdMap.markerPolyline(this.map, this.transInfo.transLine) }
    },

    /* 保存绘制线路*/
    handleSave() {
      if (this.overlays) { this.returnData = this.overlays.getPath() }

      this.$emit('return-draw-road', this.returnData)
      this.close()
    },

    /* 开始绘制线路*/
    stDrawLine() {
      this.enButton = true // 禁用按钮操作
      this.clearOverlays()

      // 开启地图的绘制模式
      this.drawLine.open()
    },

    /* 清除已绘制线路*/
    unDrawLine() {
      this.enButton = false // 开启按钮操作
      this.clearOverlays()
    },

    /* 清除新老overlay中的线性覆盖物对象*/
    clearOverlays() {
      // 清除老线路覆盖物
      if (this.existOverlay.length > 0) {
        this.existOverlay.forEach((item, index) => {
          this.map.removeOverlay(item)
        })
      }

      // 清除新绘制线路覆盖物
      if (this.overlays) { this.map.removeOverlay(this.overlays) }

      // 重新置空数据
      this.returnData = []
      this.overlays = null
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
