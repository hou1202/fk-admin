<template>
  <!-- 测试视频播放-->
  <div v-if="value">
    <el-dialog
      title="测试视频播放"
      :append-to-body="true"
      :before-close="close"
      :close-on-click-modal="false"
      :visible.sync="VideoPlay"
      width="1100px"
    >
      <el-form label-position="right" label-width="150px">
        <el-form-item>
          <el-input v-model="inputUrl" placeholder="请输入URL" />
        </el-form-item>
        <el-button @click="exchangeVideo(1)">
          切换视频1
        </el-button>
        <el-button @click="exchangeVideo(2)">
          切换视频2
        </el-button>
        <el-button @click="exchangeVideo(3)">
          切换视频3
        </el-button>
      </el-form>
      <div id="hello_ezuikit" class="hello-ezuikit-js" style="width:100%;height:600px">
        <!-- <div  class="video-cs">
          <div id="myPlayer0" style="width:100%;height:100%;"></div>
        </div>
        <div  class="video-cs">
          <div id="myPlayer1" style="width:100%;height:100%;"></div>
        </div>
        <div  class="video-cs">
          <div id="myPlayer2" style="width:100%;height:100%;"></div>
        </div>
        <div  class="video-cs">
          <div id="myPlayer3" style="width:100%;height:100%;"></div>
        </div> -->
        <!-- <div v-for="(item, index) in videItemUrl" class="video-cs">
          <video :id="'myPlayer'+index" poster="" controls playsInline webkit-playsinline autoplay>
              <source  type="application/x-mpegURL" />
          </video>
        </div> -->

        <video id="myPlayer" poster="" controls playsInline webkit-playsinline autoplay muted>
          <source :src="videoUrl" type="application/x-mpegURL">
        </video>
      </div>

    </el-dialog>

  </div>

</template>

<script defer="defer">
import BaseVideo from './BaseVideo.vue'
import LivePlayer from '@liveqing/liveplayer'
// import EZUIKit from "ezuikit-js";
import EZUIKit from '../../../static/ezui/ezuikit.js'

export default {
  name: 'VideoPlay',
  components: { BaseVideo, LivePlayer },
  props: ['value'],
  data() {
    return {
      VideoPlay: true, // 卡片显隐控制
      token: 'at.1xcva7jh2ujyejr22xm777ej4vm7fudg-6iiu9fszsr-1e1agwp-4ifmandi5',
      videoUrl: 'http://hls01open.ys7.com/openlive/15b588c7a5ba4306bdd03362089d9a39.m3u8',
      inputUrl: '',
      playerInstance: null,
      videItem: ['672958927', '672959177', '682049761', 'D16415255'],
      videItemUrl: [
        'ezopen://open.ys7.com/672958927/1.live',
        'http://hls01open.ys7.com/openlive/2b743299fe3c4ab2a1ae0c981227fd6a.m3u8',
        'http://hls01open.ys7.com/openlive/15b588c7a5ba4306bdd03362089d9a39.m3u8',
        'http://hls01open.ys7.com/openlive/042df7ff55e7407faa8f7cea6941e05f.m3u8'
      ],
      videlObj: ''
    }
  },
  created() {},
  mounted() {
    this.$nextTick(function() {
      // this.initPlay();
      // this.initPlay2();
      this.initPlay3()
    })
  },
  methods: {
    close() {
      this.$emit('input', false)
    },
    exchangeVideo(index) {
      // this.videoUrl = this.videItemUrl[index];
      this.videlObj.stop()
      this.videoUrl = this.inputUrl
      console.log(this.videoUrl)
      this.$nextTick(function() {
        this.videlObj = new EZUIKit.EZUIPlayer('myPlayer')
        console.log(this.videlObj)
        this.videlObj.play()
      })
    },
    initPlay() {
      this.videItem.forEach((item, index) => {
        new EZUIKit.EZUIKitPlayer({
          autoplay: true,
          id: 'myPlayer' + index,
          accessToken: 'at.34rjrezx8np8cd4uc53e4f97bicy2hdw-92oox1ljzb-1hct3xb-emuxbuxfc',
          url: 'ezopen://open.ys7.com/' + item + '/1.live',
          template: 'simple', // simple - 极简版;standard-标准版;security - 安防版(预览回放);voice-语音版；
          // footer: [ "hd", "fullScreen"], // 如果template参数不为simple,该字段将被覆盖
          audio: 0, // 是否默认开启声音 0 - 关闭 1 - 开启
          openSoundCallBack: data => console.log('开启声音回调', data),
          closeSoundCallBack: data => console.log('关闭声音回调', data),
          capturePictureCallBack: data => console.log('截图成功回调', data),
          fullScreenCallBack: data => console.log('全屏回调', data),
          getOSDTimeCallBack: data => console.log('获取OSDTime回调', data),
          // width: 600, // 宽度高度为容器规格，将按照窗口数均分
          // height: 400,
          splitBasis: 1 // 设置窗口切割参数
        })
      })
    },
    initPlay2() {
      this.videItemUrl.forEach((item, index) => {
        new EZUIKit.EZUIPlayer('myPlayer' + index)
      })
    },
    initPlay3() {
      this.videlObj = new EZUIKit.EZUIPlayer('myPlayer')
      console.log(this.videlObj)
      this.videlObj.play()
    }

  }
}
</script>
<style scoped lang="scss">
    .media-container {
        padding-top: 50px;
        height: 500px;
        width: 800px;

        div {
            height: 200px;
            width: 100%;
            background-color: red;
        }
    }
    .video-cs {
      color: #ccc;
      width: 50%;
      height:50%;
      overflow: hidden;
      float:left;
      border:1px solid #fff;
      border-radius: 5px;
    }
</style>
