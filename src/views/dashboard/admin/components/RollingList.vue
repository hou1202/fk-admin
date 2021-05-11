<template>

  <el-table
    :data="tableData"
    style="width: 300px;"
  >
    <el-table-column
      prop="title"
      label="Title"
      align="center"
      min-width="10"
    />
  </el-table>

</template>

<script>

export default {
  data() {
    return {
      tableData: [
        { title: '本报北京3月30日电 （记者张璁）由中央网信办主办' },
        { title: '中央网信办网络传播局、各地网信办' },
        { title: '中央新闻网站联合承办的“铿锵奋进的脚步' },
        { title: '续写春天的故事”网络主题宣传30日启动' },
        { title: '启动仪式以云连线方式举行，在北京设主会场，浙江嘉兴、陕西延安、广东深圳、贵州毕节、黑龙江齐齐哈尔、湖北武汉等地设分会场' },
        { title: '“胸怀千秋伟业 恰是百年风华”“在这里读懂初心使命' },
        { title: '网络媒体革命老区行”“建党百年 初心之路”“续写更多春天的故事 走进经济特区国家级新区”“强国中坚 高质量发展看国企”“民族要复兴 乡村必振兴”“樱花又开放' },
        { title: '中央新闻单位新媒体部门、中央新闻网站、商业网站和地方媒体平台将深入红色发源地探寻百年大党的梦想与追求' },
        { title: '走进革命老区读懂共产党人的初心和使命，在改革开放最前沿聆听时代脉动' },
        { title: '在乡村振兴第一线挖掘鲜活素材，用脚力践行责任，用眼力发现真实，用脑力深刻思考' }
      ],
      // 页面展示数据
      bloading: false,
      // 页面使用数据
      tableData: [
      ]
      // 码表

      // js使用数据
      // 子组件使用数据
      // rules
    }
  },
  created() {
    this.init
  },
  methods: {
    init() {
      this.bloading = true
      this.tableData.unshift({ date: this.getNowDate('ss') })
      this.tableMove()
      this.a = setInterval(() => {
        this.tableMove()
      }, 1000)
    },
    tableMove() {
      // 48px 为表格行高
      const t = document.getElementsByClassName('el-table__body-wrapper')
      setTimeout(() => {
        this.tableData.splice(4, 1)
        t[0].style.transition = 'all .5s'
        t[0].style.marginTop = '48px'
      }, 500)
      setTimeout(() => {
        this.tableData.unshift({ date: this.getNowDate('ss') })
        t[0].style.transition = 'all 0s ease 0s'
        t[0].style.marginTop = '0'
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
