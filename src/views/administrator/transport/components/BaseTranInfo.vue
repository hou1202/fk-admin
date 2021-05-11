<template>
  <!-- 任务相关申请任务基本信息展示页面-->
  <selfTable class="self-table-two">
    <selfTd label="工地名称">{{ tranInfos.siteName }}</selfTd>
    <selfTd label="所属辖区">{{ tranInfos.region }}</selfTd>
    <selfTd label="工地地址">{{ tranInfos.address }}</selfTd>
    <selfTd label="渣土类型">{{ tranInfos.soilType }}</selfTd>
    <selfTd label="建设单位">{{ tranInfos.constructionUnit }}</selfTd>
    <selfTd label="施工单位">{{ tranInfos.workUnit }}</selfTd>
    <selfTd label="运输类型" :class="[tranInfos.tranType != 'out' ? 'is-out' : '']">{{ tranInfos.tranTypeText }}</selfTd>
    <template v-if="tranInfos.tranType == 'out'">
      <selfTd label="消纳场名称">{{ tranInfos.absorName }}</selfTd>
      <selfTd label="所属辖区">{{ tranInfos.absorRegion }}</selfTd>
      <selfTd label="消纳场地址">{{ tranInfos.absorAddress }}</selfTd>
    </template>
    <!-- <selfTd label="图片" url="test1" style="width:100%"></selfTd> -->
  </selfTable>
</template>
<script>
export default {
  name: 'BaseTranInfo',
  props: ['tranInfo'],
  data() {
    return {
      tranInfos: {
        siteName: '拓基鼎元世家',
        region: '山南新区',
        address: '安徽省淮南市田家庵区',
        soilType: '土方渣土',
        constructionUnit: '中建四局',
        workUnit: '安徽怡富建设工程有限公司',
        tranTypeText: '场外运输',
        tranType: 'out',
        absorName: '世行贷款采煤塌陷修复3-2工区',
        absorRegion: '大通区',
        absorAddress: '安徽省淮南市大通区'
      }
    }
  },
  methods: {}
}
</script>
<style scoped>
.is-out {
  width: 100%;
}
</style>
