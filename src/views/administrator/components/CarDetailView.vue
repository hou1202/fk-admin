<template>
  <!-- 查看单个车辆详情内容-->
  <!-- 父组件中需定义选中车辆接收事件：child-selected-car-->
  <div v-if="value">
    <el-dialog
      title="车辆详情"
      width="1100px"
      append-to-body
      :before-close="close"
      :close-on-click-modal="false"
      :visible.sync="winCard"
    >
      <selfTable class="self-table-two">
        <selfTd label="车牌号码">{{ carData.car_num }}</selfTd>
        <selfTd label="所属单位">{{ carData.car_company }}</selfTd>
        <selfTd label="车架号">{{ carData.car_serial }}</selfTd>
        <selfTd label="行驶证号">{{ carData.car_license }}</selfTd>
        <selfTd label="车主姓名">{{ carData.carer_name }}</selfTd>
        <selfTd label="车主联系方式">{{ carData.carer_contact }}</selfTd>
        <selfTd label="车牌颜色">{{ carData.car_color }}</selfTd>
        <selfTd label="车厢体积">{{ carData.car_vol }} 立方米</selfTd>
        <selfTd label="设备ID">{{ carData.car_code }}</selfTd>
        <selfTd label="SIM卡号">{{ carData.car_sim }}</selfTd>
        <selfTd label="北斗在线">{{ carData.carer_contact }}</selfTd>
        <selfTd label="最后上线时间">{{ carData.lastOnlineDate }}</selfTd>
        <selfTd label="SIM卡号">{{ carData.carer_contact }}</selfTd>
        <selfTd label="SIM卡号">{{ carData.carer_contact }}</selfTd>
      </selfTable>

    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'CarDetailView',
  components: { TopBar },
  props: ['value', 'carId'],
  data() {
    return {
      winCard: true,
      carData: {
        car_num: '皖D38253', // 车牌号码
        car_company: '安徽顺全物流有限公司',  //车辆所属单位
        car_serial: 'LVS65E656DG7562987', // 车架号
        car_license: '2548645413', // 行驶证号
        carer_name: '安徽顺全物流有限公司', // 车主姓名
        carer_contact: '18541225411', // 车主联系方式
        car_color: 'yellow', // 车牌颜色
        car_vol: '12', // 车厢体积
        car_code: '2296147', // 设备ID
        car_sim: '13302296147' ,// 设备SIN卡号
        gpsOnline: '是',
        lastOnlineDate: '2021-02-26 15:45:02'
      },
      cardColor: [
        { value: 'yellow', name: '黄色' },
        { value: 'blue', name: '蓝色' }]
    }
  },
  methods: {
    close() {
      this.$emit('input', false)
    }

  },
  watch: {
    carId(v) {
      
    }
  }
}
</script>
<style lang="scss">

</style>
