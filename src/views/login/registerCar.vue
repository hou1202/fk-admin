<template>
  <div class="register-enterpriser">
    <div class="register-title">
      <h3>新运输企业资质备案</h3>
    </div>

    <div class="register-step">
      <el-steps :active="3">
        <el-step title="帐户注册" icon="el-icon-edit" />
        <el-step title="企业信息完善" icon="el-icon-orange" />
        <el-step title="车辆信息录入" icon="el-icon-truck" />
      </el-steps>
    </div>
    <div style="width:1200px;margin:0 auto;margin-top:30px">
      <el-table
        :data="registerForm"
        style="width: 100%"
      >
        <el-table-column
          type="index"
          label="序号"
          width="80"
        />
        <el-table-column
          prop="car_num"
          label="车牌号码"
          width="150"
        />
        <el-table-column
          prop="car_license"
          label="行驶证号"
          show-overflow-tooltip
        />
        <el-table-column
          prop="carer_name"
          label="车主名称"
          show-overflow-tooltip
        />
        <el-table-column
          prop="carer_contact"
          label="车主联系方式"
          width="130"
          show-overflow-tooltip
        />
        <el-table-column
          prop="car_code"
          label="设备ID"
          width="130"
          show-overflow-tooltip
        />
        <el-table-column
          prop="car_sim"
          label="设备SIM号"
          width="130"
          show-overflow-tooltip
        />
        <el-table-column
          label="操作"
          width="180"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >移除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="width:100%;text-align:center">
        <el-button style="height: 35px;margin: 0 auto;margin-top: 20px;" @click="showAddCar = true"><i class="el-icon-circle-plus-outline el-icon--right" /> 添加车辆</el-button>
      </div>

      <div style="width:100%;text-align:center">
        <el-button :loading="loading" type="primary" style="height: 47px;width: 350px;margin: 0 auto;margin-top: 50px;" @click="handleRegister">提交审核</el-button>
        <a href="#/registerEnterprise">上一步</a>
      </div>

    </div>
    <AddCar v-model="showAddCar" :add_car="registerForm" />
  </div>
</template>

<script>
import AddCar from '@/views/administrator/components/AddCar.vue'
export default {
  name: 'EnterpriseCar',
  components: { AddCar },
  data() {
    return {
      showAddCar: true,
      loading: false,
      registerForm: [
        { car_num: '皖D32541',
          car_license: '325412562541254254',
          carer_name: '合肥文科信息技术有限公司',
          carer_contact: '13800000000',
          car_code: '2542563',
          car_sim: '13525425698' }
      ]

    }
  },
  methods: {

    handleUploadSuccess() {

    },

    handleRegister() {
      window.location.href = '#/registerCar'
      return false
      this.$refs['registerForm'].validate(valid => {
      })
    }

  }
}
</script>

<style lang="scss">
$bg:rgb(72, 122, 237);
$dark_gray:#889aa4;
$light_gray:rgba(72, 122, 237,0.9);
$title-height: 60px;
.register-enterpriser {
  padding-top: 50px;
  .register-title {
    h3 {
      font-size: 26px;
      color: #1890ff;
      margin: 0px auto 50px auto;
      text-align: center;
      font-weight: bold;
    }
  }
  .register-step {
    padding: 0 30%;
    min-width: 500px;
  }
  .register-form {
    width: 1000px;
    margin: 0 auto;
    padding-top: 60px;
    text-align: center;

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

    .el-button {
      height: 47px;
      width: 350px !important;
      margin: 0 auto;
      margin-top: 50px;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }

    .thirdparty-button {
      position: absolute;
      right: 0;
      bottom: 6px;
    }

  }
}

</style>
