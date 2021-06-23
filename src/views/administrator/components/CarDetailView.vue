<template>
  <!-- 查看单个车辆详情内容-->
  <div v-if="value">
    <el-dialog
      title="车辆详情"
      width="1100px"
      append-to-body
      :before-close="close"
      :close-on-click-modal="false"
      :visible.sync="winCard"
    >
      <!-- 车辆信息-->
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
        <selfTd label="北斗在线">{{ carData.gpsOnline }}</selfTd>
        <selfTd label="最后上线时间">{{ carData.lastOnlineDate }}</selfTd>
        <selfTd label="行驶证(正本)" type='img' :url="carData.img" />
        <selfTd label="行驶证(副本)" type='img' :url="carData.img" />
        <selfTd label="登记证" type='img' :url="carData.img" />
        <selfTd label="营运证" type='img' :url="carData.img" />
        <selfTd label="车身照片" type='img' :merge="true" :url="carData.car_img" />
      </selfTable>
      <!-- 车辆绑定驾驶员信息-->
      <template v-for="(item, index) in driverData">
        <TopBar :title="'驾驶员：'+item.name"></TopBar>
        <selfTable class="self-table-two">
          <selfTd label="姓名">{{ item.name }}</selfTd>
          <selfTd label="户籍地址">{{ item.address }}</selfTd>
          <selfTd label="身份证号">{{ item.code }}</selfTd>
          <selfTd label="联系方式">{{ item.phone }}</selfTd>
          <selfTd label="驾驶车辆" :merge="true">{{ item.phone }}</selfTd>
          <selfTd label="驾驶证" type='img' :url="item.driveCard" />
          <selfTd label="运输证" type='img' :url="item.transCard" />
          <selfTd label="身份证" type='img' :url="item.codeCard" />
          <selfTd label="人脸照片" type='img' :url="item.faceCard" />
        </selfTable>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import TopBar from '@/components/TopBar.vue'
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
        car_color: '黄色', // 车牌颜色
        car_vol: '12', // 车厢体积
        car_code: '2296147', // 设备ID
        car_sim: '13302296147' ,// 设备SIN卡号
        gpsOnline: '是',
        lastOnlineDate: '2021-06-23 14:05:28',
        img: '1',
        car_img: '0,1,2,3'
      },
      driverData: [
        {
          name: '张三',
          address: '安徽省淮南市田家庵区三和乡横塘村13西郢组',
          code: '340121196705202896',
          phone: '13866328249',
          driveCar: '皖D56894,皖D47840,皖D69523',
          driveCard: '2',
          transCard: '3',
          codeCard: '0',
          faceCard: '1'
        },
        {
          name: '吴庆敢',
          address: '安徽省淮南市田家庵区三和乡横塘村13西郢组',
          code: '340121196705202896',
          phone: '13866328249',
          driveCar: '皖D56894,皖D47840,皖D69523',
          driveCard: '2',
          transCard: '3',
          codeCard: '0',
          faceCard: '1'
        },
        {
          name: '许修易',
          address: '安徽省淮南市田家庵区三和乡横塘村13西郢组',
          code: '340121196705202896',
          phone: '13866328249',
          driveCar: '皖D56894,皖D47840,皖D69523',
          driveCard: '2',
          transCard: '3',
          codeCard: '0',
          faceCard: '1'
        },
      ],
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
      // 监听carId,请求车辆数据信息
      console.log(this.carId)
    }
  }
}
</script>
<style lang="scss">

</style>
