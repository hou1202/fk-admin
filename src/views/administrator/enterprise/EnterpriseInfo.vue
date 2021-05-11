<template>
  <div class="app-container">
    <selfTable class="self-table-two">
      <selfTh colors="blue">{{ enterpriseData.name }}</selfTh>
      <selfTd label="企业名称">{{ enterpriseData.name }}</selfTd>
      <selfTd label="组织机构代码">{{ enterpriseData.entCode }}</selfTd>
      <selfTd label="注册地址">{{ enterpriseData.regAddress }}</selfTd>
      <selfTd label="注册资本">{{ enterpriseData.regCapital }}</selfTd>
      <selfTd label="法人">{{ enterpriseData.legaler }}</selfTd>
      <selfTd label="身份证号码">{{ enterpriseData.legalerCode }}</selfTd>
      <selfTd label="户籍地址">{{ enterpriseData.legalerAddress }}</selfTd>
      <selfTd label="联系方式">{{ enterpriseData.legalerContact }}</selfTd>
      <selfTd label="企业联系人">{{ enterpriseData.entPerson }}</selfTd>
      <selfTd label="联系方式">{{ enterpriseData.entContact }}</selfTd>
      <selfTd label="所在行政区">{{ enterpriseData.entArea }}</selfTd>
      <selfTd label="企业性质">{{ enterpriseData.entAture }}</selfTd>
      <selfTd label="办公地址">{{ enterpriseData.entAddress }}</selfTd>
      <selfTd label="企业状态">{{ enterpriseData.status }}</selfTd>
      <selfTd label="备案车辆数">{{ enterpriseData.carNum }}</selfTd>
      <selfTd label="备案日期">{{ enterpriseData.applyDate }}</selfTd>
      <!-- <selfTd label="营业执照" :url="enterpriseData.entLicenseFile"></selfTd>
        <selfTd label="道路运输经营许可证" :url="enterpriseData.entLicenseFile"></selfTd>
        <selfTd label="法人身份证" :url="enterpriseData.entLicenseFile" merge="true"></selfTd> -->

      <selfTh colors="blue">GPS管理员</selfTh>
      <selfTd label="管理员姓名">{{ enterpriseData.gpsAdminer }}</selfTd>
      <selfTd label="身份证号码">{{ enterpriseData.gpsAdminerCode }}</selfTd>
      <selfTd label="户籍地址">{{ enterpriseData.gpsAdminerAddress }}</selfTd>
      <selfTd label="联系方式">{{ enterpriseData.gpsAdminerContact }}</selfTd>
      <!-- <selfTd label="管理员身份证" :url="enterpriseData.entLicenseFile" merge="true"></selfTd> -->

      <selfTh colors="blue">车队负责人</selfTh>
      <selfTd label="负责人姓名">{{ enterpriseData.carAdminer }}</selfTd>
      <selfTd label="身份证号码">{{ enterpriseData.carAdminerCode }}</selfTd>
      <selfTd label="户籍地址">{{ enterpriseData.carAdminerAddress }}</selfTd>
      <selfTd label="联系方式">{{ enterpriseData.carAdminerContact }}</selfTd>
      <!-- <selfTd label="负责人身份证" :url="enterpriseData.entLicenseFile" merge="true"></selfTd> -->

    </selfTable>

  </div>
</template>

<script>

export default {
  name: 'EnterpriseInfo',
  components: {},
  data() {
    return {
      enterpriseData: {
        name: '合肥方科信息技术有限公司', // 单位名称
        entCode: '91340100790148711N', // 机构代码
        regAddress: '合肥市包河区南二环与包河大道交叉口加侨国际广场A座22楼', // 注册地址
        regCapital: '伍拾万圆整', // 注册资本
        legaler: '李志尧', // 法人
        legalerCode: '341126197902020239', // 法人身份证号
        legalerAddress: '安徽省定远县仓镇张巷村前周组0.05号2室', // 法人户籍地址
        legalerContact: '18297905431', // 法人联系方式
        entAture: '个体经营户', // 企业性质
        entArea: '八公山区', // 企业据辖区
        entAddress: '合肥市包河区南二环与包河大道交叉口加侨国际广场A座22楼', // 企业办公地址
        entPerson: '李志尧', // 企业负责人
        entContact: '18297905431', // 负责人联系方式
        gpsAdminer: '李志尧', // GPS管理员
        gpsAdminerCode: '341126197902020239', // GPS管理员身份证号
        gpsAdminerAddress: '安徽省定远县仓镇张巷村前周组0.05号2室', // GPS管理员户籍地址
        gpsAdminerContact: '18297905431', // GPS管理员联系方式
        carAdminer: '李志尧', // 车队负责人
        carAdminerCode: '341126197902020239', // 车队负责人身份证号
        carAdminerAddress: '安徽省定远县仓镇张巷村前周组0.05号2室', // 车队负责人户籍地址
        carAdminerContact: '18297905431', // 车队负责人联系方式
        status: '正常',
        carNum: '25',
        applyDate: '2021-02-18',

        entLicenseFile: '12', // 企业营业执照文件
        entTranPremFile: '', // 运输许可证文件
        legalerIsFile: '', // 法人身份证正面
        legalerTheFile: '', // 法人身份证反面
        gpsAdminerIsFile: '', // GPS管理员身份证正面
        gpsAdminerTheFile: '', // GPS管理员身份证反面
        carAdminerIsFile: '', // 车队负责人身份证正面
        carAdminerTheFile: '', // 车队负责人身份证反面
        applyFile: '' // 申请函
      }

    }
  },
  created() { },
  methods: {

  }

}
</script>
<style scoped lang="scss">

</style>
