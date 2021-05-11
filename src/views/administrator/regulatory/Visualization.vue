<template>
  <div class="visual">

    <dv-border-box-11 title="建设垃圾管理数据可视化平台" :title-width="450" class="body-box">
      <!-- 主页-->
      <vHome />
      <div class="bottom-nav">
        <dv-border-box-1 :width="50" :height="50"><p>首页</p></dv-border-box-1>
        <dv-border-box-1><p>工地</p></dv-border-box-1>
        <dv-border-box-1><p>企业</p></dv-border-box-1>
        <dv-border-box-1><p>工作台</p></dv-border-box-1>
      </div>
    </dv-border-box-11>
    <div id="container" />

  </div>

</template>
<script>
import vHome from './components/vHome.vue'
export default {
  name: 'Visualization',
  components: {
    vHome
  },
  data() {
    return {
      map: null,
      path: [
        [
          { lat: 31.858419, long: 117.347845 },
          { lat: 31.858405, long: 117.347948 },
          { lat: 31.858344, long: 117.34798 },
          { lat: 31.858324, long: 117.348118 },
          { lat: 31.858361, long: 117.348131 },
          { lat: 31.858327, long: 117.348223 },
          { lat: 31.85849, long: 117.348293 },
          { lat: 31.858529, long: 117.34819 },
          { lat: 31.858575, long: 117.348183 },
          { lat: 31.858631, long: 117.348003 },
          { lat: 31.858601, long: 117.347979 }
        ],
        [
          { lat: 31.857996, long: 117.347403 },
          { lat: 31.857923, long: 117.347627 },
          { lat: 31.858211, long: 117.347777 },
          { lat: 31.858366, long: 117.347367 },
          { lat: 31.857943, long: 117.34712 },
          { lat: 31.857888, long: 117.34734 },
          { lat: 31.857994, long: 117.347402 }

        ],
        [
          { lat: 31.85814, long: 117.347357 },
          { lat: 31.858276, long: 117.347414 },
          { lat: 31.858185, long: 117.347651 },
          { lat: 31.858042, long: 117.34756 }
        ]

      ],
      paths: [
        [31.858419, 117.347845],
        [31.858405, 117.347948],
        [31.858344, 117.34798],
        [31.858324, 117.348118],
        [31.858361, 117.348131],
        [31.858327, 117.348223],
        [31.85849, 117.348293],
        [31.858529, 117.34819],
        [31.858575, 117.348183],
        [31.858631, 117.348003],
        [31.858601, 117.347979]
      ]
    }
  },
  watch: {

  },
  created() {
    this.openFullscreen()
    setTimeout(() => {
      // 延时执行初始化地图
      // this.initMap();
    }, 1000)
  },
  mounted() {
    /* 腾讯地图JS文件 */
    const s = document.createElement('script')
    s.type = 'text/JavaScript'
    s.charset = 'utf-8'
    s.src = 'https://map.qq.com/api/gljs?v=1.exp&key=OMGBZ-ODICS-REQOP-6QFOS-LWHUZ-MWB6M'
    document.body.appendChild(s)
  },

  methods: {

    /* 初始化地图*/
    initMap() {
      // 定义地图中心点坐标
      // 定义map变量，调用 TMap.Map() 构造函数创建地图
      this.map = new TMap.Map(document.getElementById('container'), {
        center: new TMap.LatLng(31.858113, 117.348754), // 设置地图中心点坐标
        zoom: 17.2, // 设置地图缩放级别
        pitch: 43.5, // 设置俯仰角
        rotation: 45 // 设置地图旋转角度
      })
    },

    // 进入全屏
    openFullscreen() {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen()
      } else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen()
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen()
      } else if (document.documentElement.msRequestFullscreen) {
        // IE11
        document.documentElement.msRequestFullscreen()
      }
    },

    initPolyon() {
      // this.path.forEach((item, index) => {
      var pathStr = []
      /* item.forEach((itemP, indexP) => {
            pathObj.push(new TMap.LatLng(itemP.lat, itemP.long)) ,
            return new TMap.LatLng(itemP.lat, itemP.long);
          }) */
      pathStr = this.paths.map(p => {
        return new TMap.LatLng(p[0], p[1])
      })
      new TMap.MultiPolygon({
        id: 'polygon-layer', // 图层id
        map: this.map, // 设置多边形图层显示到哪个地图实例中
        // 多边形样式
        styles: {
          'polygon': new TMap.ExtrudablePolygonStyle({
            'color': 'rgba(0,125,255,0.7)', // 面填充色
            'showBorder': false, // 是否显示拔起面的边线
            'extrudeHeight': 100, // 多边形拔起高度
            'borderColor': '#999' // 边线颜色
          })
        },
        // 多边形数据
        geometries: [
          {
            'id': 'p1', // 该多边形在图层中的唯一标识（删除、更新数据时需要）
            'styleId': 'polygon', // 绑定样式名
            'paths': pathStr // 多边形轮廓
          }
        ]
      })
      // })
    }
  }
}
</script>

<style lang="scss">
.visual {
  width: 100%;
  height: 100vh;
}
.body-box {
  padding: 35px 10px 10px 10px;
  position: fixed;
  top:0;
  left: 0;
  z-index: 1;
  .dv-border-box-11-title {
    font-weight: bold;
    letter-spacing: 5px;
    font-size: 20px;
  }
  .bottom-nav {
    position: absolute;
    bottom: 10px;
    width: 100%;
    height: 50px;
    .dv-border-box-1 {
      width: 50px;
          height: 50px;
          float: left;
          margin-left: 50px;
    }
  }
}
.box-left {
  width: 390px;
  height: 100%;
  position: absolute;
  left: 10px;
  top: 40px;
}
.box-right {
  width: 390px;
  height: 100%;
  position: absolute;
  right: 10px;
  top: 40px;
}

.block-box {
  height: auto;
  overflow: hidden;
  margin-bottom: 20px;
  .border-box-content{
    padding: 20px 15px;
    overflow: hidden;
    color: #fff;
  }
  .block-box-content {
    overflow: hidden;
    padding: 15px;
    background: rgba(16,37,72,0.4);
    border-radius: 10px;

    .block-box-title{
      width: 100%;
      height: 30px;
      line-height: 30px;
      font-size: 18px;
      margin: 0 0 10px 0;
      display: flex;
      .block-box-icon {
        height: 20px;
        width: 100px;
        margin: 5px 0 0 10px;

      }
    }
    .box-label {
      p {
        float: left;
        font-size: 12px;
        margin:10px 0 0 0;
        text-align:center;
      }
    }
  }
}
.dv-scroll-ranking-board {
  .row-item {
    .ranking-info {
      .rank {
        color: #409eff;
      }
    }
    .ranking-column {
      border-bottom: 2px solid rgba(64, 158, 255, 0.5);
      .inside-column {
        background-color: #409eff;
      }
    }
  }
}
#container {
  width: 100%;
  height: 100%;
}
</style>
