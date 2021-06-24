
<template>
  <div>
    <div v-for="(item, index) in urlList" class="demo-image__preview self-img">
      <el-image
        :style="{width:popWidth,height:popHeight}"
        :src="urlList[index]"
        :preview-src-list="urlList"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShowImg',
  /** props 参数解析
   *  urlStr    图片地址字符串，如果是多张图片是，以约定字符进行分割，如：，，
   *  width     图片的展示宽度，展示时图片为正方形，若不传值时，默认值为60
  */
  props: {
    urlStr: {
      style: String,
      defalut: '',
    },
    width: {
      style: String,
      default: '60',
    }
  },
  data() {
    return {
      testList: [
        'https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/cdbf6c81800a19d86524639732fa828ba61e4679.jpg',
        'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1757702845,51708014&fm=26&gp=0.jpg',
        'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1396521707,1973816781&fm=26&gp=0.jpg',
        'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2080110811,891738648&fm=26&gp=0.jpg',
        'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2080110811,891738648&fm=26&gp=0.jpg'
      ],
      urlList: [],
    }
  },
  computed: {
    /* 图片宽度*/
    popWidth() {
      if(this.width !== 60){
        return (parseInt(this.width)+5)+'px';
      }else {
        return (60+5)+'px';
      }
    },
    /* 图片高度*/
   popHeight() {
      if(this.width !== 60){
        return (parseInt(this.width)+7)+'px';
      }else {
        return (60+7)+'px';
      }
    },
  },
  created() {
    /* 传过来的图片地址，对地址进行处理*/
    if(this.urlStr) {
      let tempArr = this.urlStr.split(',')
      tempArr.forEach((item, index) => {
        //let tempUrl = "@/assets/"+item+".png"
        // 此处应请求图片真实地址，现为临时用
        this.urlList.push(this.testList[index]);
      })
    }
  },
}
</script>
<style lang="scss" >
.self-img {
  display:inline-block;
  .el-image {
    padding: 5px 0 2px 5px;
    .el-image__inner {
      width: 100%;
      height: 100%;
      border: 1px solid #dfe6ec;
      border-radius: 3px;

    }
    .el-image__error {
      width: 100%;
      height: 100%;
      border: 1px solid #dfe6ec;
      border-radius: 3px;
      margin: 5px 0 2px 5px;
    }
  }
}
</style>
