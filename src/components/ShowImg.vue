
<template>
  <div>
    <div v-for="(item, index) in urlList" class="demo-image__preview self-img">
      <el-image
        :src="urlList[index]"
        :preview-src-list="urlList"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShowImg',
  props: ['urlStr'],
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
  }
}
</script>
<style scoped>

</style>
