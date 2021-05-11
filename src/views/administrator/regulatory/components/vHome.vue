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
            <p>车辆总数</p>
            <p>在运车辆</p>
            <p>异常车辆</p>
          </div>
        </div>
      </dv-border-box-13>

      <dv-border-box-13 class="block-box">
        <div class="block-box-content  box-2">
          <h3 class="block-box-title">今日出土量<dv-decoration-3 class="block-box-icon" /></h3>
          <div class="box2-charts">
            <dv-water-level-pond :config="soilNum.soil" style="width:90px;height:90px" />
            <dv-water-level-pond :config="soilNum.tranks" style="width:90px;height:90px" />
          </div>
          <div class="box-label box2-label">
            <p>今日出土量</p>
            <p>运输趟次</p>
          </div>
          <dv-scroll-ranking-board :config="soilNum.ranking" :color="['#409eff','#409eff']" style="height:315px" />
        </div>
      </dv-border-box-13>
    </div>

    <div class="box-right">
      <dv-border-box-13 class="block-box">
        <!-- <h3>车辆数据</h3> -->
        <div class="block-box-content  box-1">
          <dv-decoration-9 style="width:70px;height:70px;" :dur="5">365</dv-decoration-9>
          <dv-decoration-9 style="width:70px;height:70px;" :dur="5">158</dv-decoration-9>
          <dv-decoration-9 style="width:70px;height:70px;" :dur="5">77</dv-decoration-9>
          <div class="box-label box1-label">
            <p>车辆总数</p>
            <p>在运车辆</p>
            <p>异常车辆</p>
          </div>
        </div>
      </dv-border-box-13>
    </div>

  </div>

</template>
<script>

export default {
  name: 'VHome',

  data() {
    return {
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
          rowNum: 5
          // waitTime: 200000
        }
      }

    }
  },
  methods: {

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
        margin: 0 13px;
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
      .dv-scroll-ranking-board {
        padding-top: 15px;
      }
    }
  }
  .box-right {

  }

}

</style>
