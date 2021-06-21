<template>
  <!-- 设计运输线路确认页面-->
  <div v-if="value">
    <el-dialog
      title="规划运输线路"
      width="1000px"
      :append-to-body="true"
      :before-close="close"
      :close-on-click-modal="false"
      :visible.sync="winCard"
    >
      <TopBar title="基本信息" />
      <selfTable class="self-table-two">
        <selfTd label="工地名称">{{ transData.siteName }}</selfTd>
        <selfTd label="工地地址">{{ transData.siteAddress }}</selfTd>
        <selfTd label="消纳场名称">{{ transData.absorName }}</selfTd>
        <selfTd label="消纳场地址">{{ transData.absorAddress }}</selfTd>
        <selfTd label="承运单位">{{ transData.transCompany }}</selfTd>
        <selfTd label="在运车辆数">{{ transData.runningCar }}</selfTd>
        <selfTd label="核准运输线路" merge="true">{{ transData.allowRoad }}</selfTd>
      </selfTable>

      <TopBar title="线路信息" />
      <div class="design-road">
       <div id="allmap" style="width:940px;height:400px;" />
        <el-button type="warning" plain @click="handleDesign" class="design-button">
          绘制
        </el-button>
      </div>


      <div slot="footer" class="dialog-footer">
        <el-button @click="close()">
          取消
        </el-button>
        <el-button type="primary" @click="handleSave">
          保存
        </el-button>
      </div>
    </el-dialog>

    <DesignMap v-model="showDesignMapCard" :transInfo="transData" @return-draw-road="drawLinePoints"></DesignMap>
  </div>
</template>
<script>
import TopBar from '@/components/TopBar.vue'
import DesignMap from '../components/MapDrawRoad.vue'

export default {
  name: 'DesignRoad',
  components: { TopBar, DesignMap },
  props: ['value', 'siteId'],
  data() {
    return {
      winCard: true,
      showDesignMapCard: false,
      transData: {
        siteId: null,
        siteName: '淮南高新区产业园二期',
        siteArea: '山南新区',
        siteAddress: '安徽省淮南市田家庵区国槐路',
        siteLng: 116.986695,
        siteLat: 32.623211,
        siteFence: [
          {lng: 116.986066, lat: 32.623652},
          {lng: 116.987126, lat: 32.623911},
          {lng: 116.987665, lat: 32.623287},
          {lng: 116.987935, lat: 32.622953},
          {lng: 116.986156, lat: 32.622466},
        ],
        absorName: '李郢孜小井',
        absorArea: '谢家集区',
        absorLng: 116.998535,
        absorLat: 32.629977,
        absorFence: [
          {lng: 116.997654, lat: 32.630281},
          {lng: 116.999164, lat: 32.63054},
          {lng: 116.999307, lat: 32.629612},
          {lng: 116.998014, lat: 32.629491}
        ],
        absorAddress: '安徽省淮南市谢家集区',
        transCompany: '淮南金顺运输有限公司',
        runningCar: 12,
        allowRoad: '产业园二期-国槐路-二通道-洛河大道-中电科八号院',
        transLine: [
          {lat: 32.622770258983294, lng: 116.98692855943246},
          {lat: 32.6225269803186, lng: 116.98701838998345},
          {lat: 32.6238802094195, lng: 116.99120449365995},
          {lat: 32.6290344546780, lng: 116.98992889983577},
          {lat: 32.6306612486249, lng: 116.99844483607038},
          {lat: 32.6303571772588, lng: 116.99851670051117}
        ],
      },
      map: null,
      mapStyle: require('@/assets/map-json/base_map_config.json'),
      formData: {
        id: this.siteId,
        points: []
      },
    }
  },
  methods: {
    close() {
      this.$emit('input', false)
    },

    handleDesign() {
      this.showDesignMapCard = true
    },

    /* 初始化地图*/
    initMap() {
      this.map = new BMapGL.Map('allmap')
      var point = new BMapGL.Point(this.transData.siteLng, this.transData.siteLat)
      this.map.centerAndZoom(point, 16) // 创建中心点坐标及地图层级
      this.map.enableScrollWheelZoom(true)
      this.map.setMapStyleV2({    // 加载自定义地图样式
        styleJson: this.mapStyle
      })

    },

    /* 创建标注信息*/
    createMarker() {

      // 创建工地标注图标
      this.$bdMap.markerPoint(this.map,{
        lat:this.transData.siteLat,
        lng:this.transData.siteLng,
        icon:require('/src/assets/point-site.png'),
        enClear: false
      })
      // 创建工地多边形
      if(this.transData.siteFence && this.transData.siteFence.length > 0) {
        this.$bdMap.markerPolygon(this.map, this.transData.siteFence)
      }

      // 创建消纳场标注图标
      this.$bdMap.markerPoint(this.map,{
        lat:this.transData.absorLat,
        lng:this.transData.absorLng,
        icon:require('@/assets/point-absor.png'),
        enClear: false,
      })

      // 创建消纳场多边形
      if(this.transData.absorFence && this.transData.absorFence.length > 0) {
        this.$bdMap.markerPolygon(this.map, this.transData.absorFence, 2)
      }

      // 创建线路
      if(this.transData.transLine && this.transData.transLine.length > 0) {
        this.$bdMap.markerPolyline(this.map, this.transData.transLine)
      }
    },

    handleSave() {
      console.log(this.formData)
    },

    // 子组件返回数据接收
    drawLinePoints(res) {
      if(res.length > 0){   // 有点位返回数据时执行，即有新绘制的线路
        this.formData.points = res
        this.map.clearOverlays()
        this.$bdMap.markerPolyline(this.map, this.formData.points)
      }
    },
  },
  created() {

  },
  watch: {
    siteId(newValue) {
      this.transData.siteId = this.siteId
      this.$nextTick(() => {
        this.initMap()
        this.createMarker()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .design-road {
    position: relative;
    .design-button {
      position: absolute;
      top: 10px;
      right: 10px;
      z-index: 100;
    }
  }
#allmap {
  border:1px solid #DCDFE6;
  border-radius: 3px;
}
</style>
