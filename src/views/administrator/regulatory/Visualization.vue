<template>
  <div class="visual">

    <dv-border-box-11 title="建设垃圾管理数据可视化平台" :title-width="450" class="body-box">
      <!-- 主页-->
      <vHome v-if="activePage == 'home'"/>
      <vSite v-if="activePage == 'site'"/>
      <div class="bottom-nav">
        <div style="display:inline-block;">
          <!-- <div class="nav-box">
            <p><span /><span /></p>
            <p>首页</p>
            <p><span /><span /></p>
          </div>
          <div class="nav-box">
            <p><span /><span /></p>
            <p>工地</p>
            <p><span /><span /></p>
          </div>
          <div class="nav-box">
            <p><span /><span /></p>
            <p>企业</p>
            <p><span /><span /></p>
          </div>
          <div class="nav-box">
            <p><span /><span /></p>
            <p>工作台</p>
            <p><span /><span /></p>
          </div> -->
          <dv-border-box-10 class="table-bottom"><p @click="changePage('home')">首页</p></dv-border-box-10>
          <dv-border-box-10 class="table-bottom"><p @click="changePage('site')">工地</p></dv-border-box-10>
          <dv-border-box-10 class="table-bottom"><p @click="changePage('site')">企业</p></dv-border-box-10>
          <!-- <dv-border-box-10 class="table-bottom"><p><router-link to="/">工作台</router-link></p></dv-border-box-10> -->
          <dv-border-box-10 class="table-bottom"><p @click="changePage('/')">工作台</p></dv-border-box-10>
        </div>
      </div>
    </dv-border-box-11>
    <div id="container" />

  </div>

</template>
<script>
import vHome from './components/vHome.vue'
import vSite from './components/vSite.vue'

export default {
  name: 'Visualization',
  components: {
    vHome, vSite
  },
  data() {
    return {
      map: null,
      activePage: 'site',
      fullscreen: false,
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
    this.isFullscreen()
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

    /* 全屏 */
    isFullscreen() {
      let element = document.documentElement;
      if (this.fullscreen) {
        // 退出全屏
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        // 进入全屏
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
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
    },

    /* 切换页面*/
    changePage(page) {
      if(page == 'home' || page == 'site'){
        this.activePage = page
      }else{
        this.isFullscreen()
        this.$router.push("/");
      }
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
    text-align: center;
    .dv-border-box-10 {
      width: 80px;
      height: 45px;
      float: left;
      margin: 0 25px;
      p {
        margin: 0;
        line-height: 45px;
        color: rgba(64,158,255,0.6);
        cursor:pointer
      }
    }

    .nav-box {
      width: 50px;
      height: 50px;
      background-color: rgba(64,158,255,0.6);
      float: left;
      margin-right: 50px;
      p{
        margin: 0;
        position: relative;
        color: #fff;
        span {
          display: block;
          width: 10px;
          height: 10px;
        }
      }
      p:nth-child(1){
        height: 10px;
        span:nth-child(1) {
          border-top: 2px solid #409EFF;
          border-left: 2px solid #409EFF;
          position: absolute;
          top: 0;
          left: 0;
        }
        span:nth-child(2) {
          border-top: 2px solid #409EFF;
          border-right: 2px solid #409EFF;
          position: absolute;
          top: 0;
          right: 0;
        }
      }
      p:nth-child(2){
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: 14px;
      }
      p:nth-child(3){
        height: 10px;
        span:nth-child(1) {
          border-bottom: 2px solid #409EFF;
          border-left: 2px solid #409EFF;
          position: absolute;
          top: 0;
          left: 0;
        }
        span:nth-child(2) {
          border-bottom: 2px solid #409EFF;
          border-right: 2px solid #409EFF;
          position: absolute;
          top: 0;
          right: 0;
        }
      }
    }
    .nav-box:last-child {
      margin-right: 0;
    }
  }
}
.box-left {
  width: 390px;
  height: calc(100% - 60px);
  position: absolute;
  left: 10px;
  top: 40px;
  overflow: hidden;
}
.box-right {
  width: 390px;
  height: calc(100% - 60px);
  position: absolute;
  right: 10px;
  top: 40px;
  overflow: hidden;
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
      position: relative;
      .block-box-icon {
        height: 20px;
        width: 100px;
        margin: 5px 0 0 10px;

      }
    }
    h4 {
      margin: 20px 0 10px 10px;
      font-size: 14px;
    }
    .box-label {
      /* overflow: hidden; */
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
