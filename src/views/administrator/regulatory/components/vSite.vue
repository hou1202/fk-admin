  <template>
  <div class="v-home">

    <div class="box-left">
      <dv-border-box-13 class="block-box">
        <!-- <h3>车辆数据</h3> -->
        <div class="block-box-content  box-1">
          <dv-decoration-9 style="width:70px;height:70px;" :color="['rgba(64, 158, 255,0.5)','rgba(64, 158, 255,0.5)']" :dur="5">365</dv-decoration-9>
          <dv-decoration-9 style="width:70px;height:70px;" :color="['rgba(64, 158, 255,0.5)','rgba(64, 158, 255,0.5)']" :dur="5">158</dv-decoration-9>
          <dv-decoration-9 style="width:70px;height:70px;" :color="['rgba(64, 158, 255,0.5)','rgba(64, 158, 255,0.5)']" :dur="5">77</dv-decoration-9>
          <div class="box-label box1-label">
            <p>工地总数</p>
            <p>在运车辆</p>
            <p>异常车辆</p>
          </div>
        </div>
      </dv-border-box-13>

      <dv-border-box-13 class="block-box">
        <div class="block-box-content  box-2">
          <h3 class="block-box-title">工地数据<dv-decoration-3 class="block-box-icon" /></h3>
          <div class="box2-charts">
            <dv-water-level-pond :config="soilNum.soil" style="width:90px;height:90px" />
            <dv-water-level-pond :config="soilNum.tranks" style="width:90px;height:90px" />
          </div>
          <div class="box-label box2-label">
            <p>工地总数</p>
            <p>在运工地数</p>
          </div>
          <h4>在运工地分布</h4>
          <!-- <dv-scroll-ranking-board :config="soilNum.ranking" :color="['#409eff','#409eff']" /> -->
          <!-- <div class="e-charts" style="width: 100%;height:200px;"></div> -->
          <BarChart></BarChart>
        </div>
      </dv-border-box-13>

      <dv-border-box-13 class="block-box">
        <div class="block-box-content  box-2">
          <h3 class="block-box-title">系统预警<dv-decoration-3 class="block-box-icon" /></h3>
          <dv-scroll-board :config="warinInfo" />
        </div>
      </dv-border-box-13>

    </div>

    <div class="box-right">
      <dv-border-box-13 class="block-box block-box-video">
        <!-- <h3>车辆数据</h3> -->
        <div class="block-box-content  box-1">
          <h3 class="block-box-title">
            视频监控
            <dv-decoration-3 class="block-box-icon" />
            <dv-border-box-2 :color="['#409eff','#60adfb']" class="video-button"><p  @click="SelectSiteCard = true">选择工地</p></dv-border-box-2>
          </h3>
          <div class="video-item">
            <div @click="openVideo"><LivePlayer :video-url="videoUrl" fluent autoplay live stretch class="video-box"/></div>
            <div @click="openVideo"><LivePlayer :video-url="videoUrl" fluent autoplay live stretch class="video-box"/></div>
            <div @click="openVideo"><LivePlayer :video-url="videoUrl" fluent autoplay live stretch class="video-box"/></div>
            <div @click="openVideo"><LivePlayer :video-url="videoUrl" fluent autoplay live stretch class="video-box"/></div>
            <div @click="openVideo"><LivePlayer :video-url="videoUrl" fluent autoplay live stretch class="video-box"/></div>
          </div>
        </div>
      </dv-border-box-13>
    </div>

    <el-dialog
      title="选择工地"
      :append-to-body="true"
      :before-close="close"
      :close-on-click-modal="false"
      :visible.sync="SelectSiteCard"
      width="1000px"
      class="vis-dialog select-site"
    >
      <dv-border-box-4 class="top-border">
        <!-- 关闭按钮-->
        <div class="box-closed" @click="closeSite()"><i /></div>

        <!-- 表格-->
        <el-table
          :data="tableData"
          :highlight-current-row="true"
          @row-dblclick="dbclickRow"
          @row-click="clickRow"
          class="site-table">
            <el-table-column
              label="序号"
              type="index">
            </el-table-column>
            <el-table-column
              prop="date"
              label="日期"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址">
            </el-table-column>
        </el-table>
        <!-- 确认按钮-->
        <dv-border-box-10 class="table-bottom"><p @click="sureSite">确 认</p></dv-border-box-10>
      </dv-border-box-4>
      <dv-border-box-4 :reverse="true" class="buttom-border" />
    </el-dialog>

    <el-dialog
      title="播放视频"
      :append-to-body="true"
      :before-close="close"
      :close-on-click-modal="false"
      :visible.sync="OpenVideoCard"
      width="70%"
      class="vis-dialog big-video"
    >
      <!-- 关闭按钮-->
      <div class="video-box-closed">
        <div class="box-closed" @click="closeVideo()"><i class="iconfont icon-zt-closed"></i></div>
        <div class="box-line"></div>
      </div>
      <!-- 视频-->
      <LivePlayer :video-url="videoUrl" fluent autoplay live stretch class="video-box"/>
      <p class="video-title">淮南高新区产业园二期</p>
    </el-dialog>
  </div>

</template>
<script>
import LivePlayer from '@liveqing/liveplayer'

import BarChart from './charts/Bar3dChart.vue'

export default {
  name: 'VHome',
  components: {
    LivePlayer, BarChart
  },
  data() {
    return {
      /* 出土量图表数据*/
      soilNum: {
        soil: {
          data: [30],
          shape: 'round',
          waveNum: 1,
          waveHeight: 20,
          formatter: '{value}',
          colors: ['#60adfb', '#409eff']
        },
        tranks: {
          data: [36],
          shape: 'round',
          waveNum: 1,
          waveHeight: 20,
          formatter: '{value}',
          colors: ['#60adfb', '#409eff']
        },
        ranking: {
          data: [
            { name: '淮南高新区产业园二期', value: 2548 },
            { name: '安粮淮安府', value: 2014 },
            { name: '颐高智慧城', value: 1687 },
            { name: '拓基鼎元世家', value: 1520 },
            { name: '观湖名邸一期', value: 1085 },
            { name: '网云小镇一期', value: 1024 },
            { name: '舜耕华府三期', value: 964 },
            { name: '经开区绿色制造产业园', value: 892 },
            { name: '海德公馆', value: 687 },
            { name: '北大学府', value: 501 }
          ],
          unit: '方',
          rowNum: 5,
          // waitTime: 200000
        }
      },
      /* 报警图表数据*/
      warinInfo: {
        data: [
          ['【超速报警】 皖D25487 - 合肥市包河区南二环路与马鞍山路交叉口'],
          ['【偏离报警】 皖D65214 - 合肥市包河区南二环路与马鞍山路交叉口'],
          ['【非法进入】 皖D10214 - 合肥市包河区南二环路与马鞍山路交叉口'],
          ['【聚集报警】 皖D21021 - 合肥市包河区南二环路与马鞍山路交叉口'],
          ['【超速报警】 皖D32154 - 合肥市包河区南二环路与马鞍山路交叉口'],
          ['【偏离报警】 皖D21025 - 合肥市包河区南二环路与马鞍山路交叉口'],
          ['【非法进入】 皖D85214 - 合肥市包河区南二环路与马鞍山路交叉口'],
        ],
        rowNum: 5,
        waitTime: 20001,
        oddRowBGC: "rgba(255,255,255,0)",
        evenRowBGC: "rgba(255,255,255,0)",
      },
      videoUrl: '',
      SelectSiteCard: false,
      OpenVideoCard: false,
      tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },
      ],
      selectedSite: {},
    }
  },
  methods: {
    closeSite() {
      this.SelectSiteCard = false
    },
    openSite() {
      this.SelectSiteCard = true
    },
    dbclickRow(row, column, event) {
      this.selectedSite = row
      this.sureSite()
    },
    clickRow(row, column, event) {
      this.selectedSite = row
    },
    sureSite() {
      console.log(this.selectedSite)
      this.SelectSiteCard = false
    },
    openVideo(url){
      this.OpenVideoCard = true;
    },
    closeVideo() {
      this.OpenVideoCard = false;
    },


  }
}
</script>

<style lang="scss">

.v-home {
  width: 100%;
  height: 100%;
  /* padding: 35px 10px 10px 10px; */
  position: relative;

  .box-left {
    /* 第一个盒子*/
    .box-1 {
      .dv-decoration-9 {
        float: left;
        margin: 0 20px;
        font-weight: bold;
      }
      .box1-label p{
        width: 33.33%;
      }
    }
    /* 第二个盒子*/
    .box-2 {
      .box2-charts {
        display: flex;
        align-items: center;
        justify-content: space-around;
      }
      .box2-label p{
        width: 50%;
      }

      /* 出土量轮播排名*/
      .dv-scroll-ranking-board {
        padding-top: 15px;
        height: 270px;
        .row-item {
          height: 50px !important;
        }
      }
    }
    /* 预警模块字体颜色*/
    .dv-scroll-board {
      height:150px;

      .rows {
        .ceil{
          color: #409eff;
        }
      }
    }
  }
  .box-right {
    .block-box-video {
      height: 100%;

      .block-box-content {
        height: 100%;
        /* 选择按钮*/
        .video-button {
          width: 100px;
          position: absolute;
          right: 0;

          .border-box-content {
            padding: 0;
            p {
              font-size: 12px;
              text-align: center;
              margin: 0;
            }

          }
        }
        .video-button:hover {
          cursor:pointer;
        }

        /* 视频列表*/
        .video-item {
          height: calc(100% - 40px);
          overflow-y: auto;
          .video-box {
            margin-bottom: 10px;
          }
        }
      }

    }
  }

}
/* 弹层公共样式 */
.vis-dialog {
  .el-dialog {
    background: none;
    -webkit-box-shadow:none;
    box-shadow:none;
    -webkit-box-sizing:none;
    .el-dialog__header {
      display: none;
    }
    .el-dialog__body {
      padding: 0;
      position: relative;
    }
  }
}
/* 表格弹层 */
.select-site {
  .top-border {
    padding: 30px 20px;
    z-index: 10;
    .border-box-content {
      background:rgba(16,37,72,0.4);
      border-radius: 10px;
      position: relative;
      padding: 20px;
      /* 关闭按钮*/
      .box-closed {
        width: 50px;
        position: absolute;
        top: -22px;
        left: 60px;
        text-align: center;
        i{
          display: block;
          width: 20px;
          height: 20px;
          background: url(../../../../assets/closed.png) no-repeat center;
          background-size: 20px;
          margin: 0 auto;

        }
      }
      .box-closed:hover {
        cursor:pointer
      }

      /* 表格*/

      .site-table {
        background: none;
        tr {
          background: none;
          color: #fff;
          th {
            background: none;
          }
        }
        .el-table__header-wrapper {
          .el-table__header {
            .has-gutter {

            }
          }
        }
        .el-table__body-wrapper {

          .el-table__body {

            .el-table__row {

            }
          }
        }

        /* 修改表格覆盖及选中背景色*/
        .el-table__body tr.current-row > td {
          background-color: rgba(64, 158, 255, 0.6) !important;
        }
        .el-table__body tr:hover>td{
          background-color: rgba(64, 158, 255, 0.4) !important;
        }
      }
      .table-bottom {
        width: 80px;
        height: 40px;
        margin: 0 auto;
        margin-top: 30px;
        .border-box-content {
          position: relative;
          p{
            width: 100%;
            line-height: 40px;
            text-align: center;
            color: rgba(255,255,255,0.6);
            margin: 0;
            position: absolute;
            top: 0;
            left: 0;
            cursor:pointer
          }

        }
      }
    }

  }
  .buttom-border {
    position: absolute;
    top: 0;
  }


}
/* 视频弹层 */
.big-video {
  .video-box-closed {
    width: 100%;
    height: 60px;
    .box-closed {
      width: 35px;
      height: 35px;
      line-height: 35px;
      text-align: center;
      margin:0 auto;
      color: rgba(64,158,255,0.6);
      border:1px solid rgba(64,158,255,0.6);
      border-radius: 50%;
      i { font-size: 20px; }
    }
    .box-closed:hover {
      cursor:pointer;
      background: rgba(64,158,255,0.6);
      color: #fff;
    }
    .box-line {
      margin:0 auto;
      width: 200px;
      height: 30px;
      background: url(../../../../assets/v-line.png) no-repeat center;
      overflow: hidden;
    }

  }
  .video-title {
    margin: 0;
    line-height: 40px;
    text-align: center;
    color: #fff;
    font-size: 16px;
  }

}

</style>
