<template>
  <!-- 备案车辆时添加车辆页面-->
  <!-- 父组件中需定义选中车辆接收事件：child-selected-car-->
  <div v-if="value">
    <el-dialog
      title="添加备案车辆"
      width="1100px"
      append-to-body
      :before-close="close"
      :close-on-click-modal="false"
      :visible.sync="winCard"
    >
      <el-form ref="carData" :model="applyData" label-position="right" label-width="150px">
        <TopBar title="备案车辆信息 (必填)" />
        <div class="img-upload">
          <el-form-item>
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleUploadSuccess"
            >
              <img v-if="carData.entLicenseFile" :src="carData.entLicenseFile" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
            <p>行驶证正本</p>
          </el-form-item>
          <el-form-item>
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleUploadSuccess"
            >
              <img v-if="carData.entTranPremFile" :src="carData.entTranPremFile" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
            <p>行驶证副本</p>
          </el-form-item>
          <el-form-item>
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleUploadSuccess"
            >
              <img v-if="carData.legalerIsFile" :src="carData.legalerIsFile" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
            <p>登记证</p>
          </el-form-item>
          <el-form-item>
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleUploadSuccess"
            >
              <img v-if="carData.legalerTheFile" :src="carData.legalerTheFile" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
            <p>营运证</p>
          </el-form-item>
          <el-form-item>
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleUploadSuccess"
            >
              <img v-if="carData.applyFile" :src="carData.applyFile" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
            <p style="width:150px;">车辆照片（前后左右）</p>
          </el-form-item>
        </div>
        <el-form-item label="车牌号码">
          <el-input v-model="carData.car_num" placeholder="请输入车辆车牌号码 (必填)" />
        </el-form-item>
        <el-form-item label="车架号">
          <el-input v-model="carData.car_serial" placeholder="请输入车辆车架号 (必填)" />
        </el-form-item>
        <el-form-item label="行驶证号">
          <el-input v-model="carData.car_license" placeholder="请输入行驶证档案编号 (必填)" />
        </el-form-item>
        <el-form-item label="车主名称">
          <el-input v-model="carData.carer_name" placeholder="请输入车辆车主名称 (必填)" />
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="carData.carer_contact" placeholder="请输入车辆车主联系方式 (必填)" />
        </el-form-item>
        <el-form-item label="车牌颜色">
          <el-select v-model="carData.car_color" class="filter-item" placeholder="请选择车牌颜色">
            <el-option v-for="item in cardColor" :label="item.name" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="车厢体积">
          <el-input v-model="carData.car_vol" type="number" placeholder="请输入车辆车厢体积 (必填)" />
          <p class="input-unit">立方米</p>
        </el-form-item>
        <el-form-item label="设备ID">
          <el-input v-model="carData.car_code" placeholder="请输入车辆车载设备ID (必填)" />
        </el-form-item>
        <el-form-item label="SIM卡号">
          <el-input v-model="carData.car_sim" placeholder="请输入车辆车载设备SIM卡号 (必填)" />
        </el-form-item>

        <TopBar title="驾驶员信息 (选填)" />
        <div class="img-upload">
          <el-form-item>
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleUploadSuccess"
            >
              <img v-if="carData.entLicenseFile" :src="carData.entLicenseFile" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
            <p>驾驶证正本</p>
          </el-form-item>
          <el-form-item>
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleUploadSuccess"
            >
              <img v-if="carData.entTranPremFile" :src="carData.entTranPremFile" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
            <p>驾驶证副本</p>
          </el-form-item>
          <el-form-item>
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleUploadSuccess"
            >
              <img v-if="carData.legalerIsFile" :src="carData.legalerIsFile" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
            <p>身份证</p>
          </el-form-item>
          <el-form-item>
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleUploadSuccess"
            >
              <img v-if="carData.legalerTheFile" :src="carData.legalerTheFile" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
            <p>人脸正面照</p>
          </el-form-item>
        </div>
        <el-form-item label="驾驶员姓名">
          <el-input v-model="carData.car_code" placeholder="请输入驾驶员姓名" />
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input v-model="carData.car_code" placeholder="请输入驾驶员身份证号" />
        </el-form-item>
        <el-form-item label="驾驶证号">
          <el-input v-model="carData.car_code" placeholder="请输入驾驶员驾驶证号" />
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="carData.car_code" placeholder="请输入驾驶员联系方式" />
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="close()">
          取消
        </el-button>
        <el-button type="primary" @click="sureCarSelect">
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TopBar from '@/components/TopBar.vue'
export default {
  name: 'SelectTranCar',
  components: { TopBar },
  props: ['value', 'add_car'],
  data() {
    return {
      winCard: true,
      carData: {
        car_num: '', // 车牌号码
        car_serial: '', // 车架号
        car_license: '', // 行驶证号
        carer_name: '', // 车主姓名
        carer_contact: '', // 车主联系方式
        car_color: '', // 车牌颜色
        car_vol: '', // 车厢体积
        car_code: '', // 设备ID
        car_sim: '' // 设备SIN卡号
      },
      cardColor: [
        { value: 'yellow', name: '黄色' },
        { value: 'blue', name: '蓝色' }]
    }
  },
  methods: {

    /** 车辆选择确定
     * 父组件定义选中车辆接收方法：child-selected-car
     * */
    sureCarSelect() {
      const list = this.$refs.selectCarTable.selection
      this.$emit('child-selected-car', list)
      this.$emit('input', false)
    },

    close() {
      this.$emit('input', false)
    }

  }
}
</script>
<style lang="scss">
  .img-upload {
    width: 100%;
    padding: 20px 40px;
    background: #f3f3f3;
    border-radius: 5px;
    text-align: center;
    margin-bottom: 30px;

    .el-form-item {
      margin-bottom: 0;
      margin-right: 15px;

      .el-form-item__content {
        width: auto;

        p {
          color: #ccc;
          font-size: 12px;
          margin: 0;
          text-align: center;
          width: 110px;
        }

      }

    }
  }
/* .el-form {
  position: relative;
}
.el-form .el-form-item {
  width:calc(100% - 100px)
}
/deep/ .el-form .el-form-item .el-form-item__content {
  width: 100% !important;
}
.el-form .el-form-item .el-form-item__content .el-textarea {
  width: 100%;
}
.el-form .el-button {
  height: 50px;
  position: absolute;
  top: 2px;
  right: 0;
} */
</style>
