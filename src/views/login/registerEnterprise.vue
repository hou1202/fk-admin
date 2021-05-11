<template>
  <div class="register-enterpriser">
    <div class="register-title">
      <h3>新运输企业资质备案</h3>
    </div>

    <div class="register-step">
      <el-steps :active="2">
        <el-step title="帐户注册" icon="el-icon-edit" />
        <el-step title="企业信息完善" icon="el-icon-orange" />
        <el-step title="车辆信息录入" icon="el-icon-truck" />
      </el-steps>
    </div>

    <el-form ref="registerForm" :model="registerForm" :rules="rules" label-width="150px" class="register-form">
      <div class="img-upload">
        <el-form-item>
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleUploadSuccess"
          >
            <img v-if="registerForm.entLicenseFile" :src="registerForm.entLicenseFile" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
          <p>营业执照</p>
        </el-form-item>
        <el-form-item>
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleUploadSuccess"
          >
            <img v-if="registerForm.entTranPremFile" :src="registerForm.entTranPremFile" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
          <p>道路运输经营许可证</p>
        </el-form-item>
        <el-form-item>
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleUploadSuccess"
          >
            <img v-if="registerForm.legalerIsFile" :src="egisterForm.legalerIsFile" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
          <p>法人身份证(正面)</p>
        </el-form-item>
        <el-form-item>
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleUploadSuccess"
          >
            <img v-if="registerForm.legalerTheFile" :src="registerForm.legalerTheFile" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
          <p>法人身份证(反面)</p>
        </el-form-item>
        <el-form-item>
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleUploadSuccess"
          >
            <img v-if="registerForm.applyFile" :src="registerForm.applyFile" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
          <p>申请函<a href="" style="position: static;display:inline-block;margin-left:5px;"> 下载模板</a></p>
        </el-form-item>
      </div>

      <el-form-item label="单位名称" prop="name">
        <el-input v-model="registerForm.name" placeholder="请输入完整单位名称 (必填)" />
      </el-form-item>
      <el-form-item label="机构代码" prop="entCode">
        <el-input v-model="registerForm.entCode" placeholder="请输入单位组织机构代码 (必填)" />
      </el-form-item>
      <el-form-item label="注册地址" prop="regAddress">
        <el-input v-model="registerForm.regAddress" placeholder="请输入单位注册地址 (必填)" />
      </el-form-item>
      <el-form-item label="注册资本" prop="regCapital">
        <el-input v-model="registerForm.regCapital" placeholder="请输入单位注册资本 (必填)" />
      </el-form-item>
      <el-form-item label="法人代表" prop="legaler">
        <el-input v-model="registerForm.legaler" placeholder="请输入单位法人代表姓名 (必填)" />
      </el-form-item>
      <el-form-item label="身份证号" prop="legalerCode">
        <el-input v-model="registerForm.legalerCode" placeholder="请输入单位法人代表身份证号码 (必填)" />
      </el-form-item>
      <el-form-item label="户籍地址" prop="legalerAddress">
        <el-input v-model="registerForm.legalerAddress" placeholder="请输入单位法人代表户籍地址 (必填)" />
      </el-form-item>
      <el-form-item label="联系方式" prop="legalerContact">
        <el-input v-model="registerForm.legalerContact" placeholder="请输入单位法人代表联系方式 (必填)" />
      </el-form-item>
      <el-form-item label="企业性质" prop="entAture">
        <el-select v-model="registerForm.entAture" class="filter-item" placeholder="请选择单位经营性质">
          <el-option v-for="item in atrue" :key="item.id" :label="item.value" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="所在辖区" prop="entArea">
        <el-select v-model="registerForm.entArea" class="filter-item" placeholder="请选择单位所在行政辖区">
          <el-option v-for="item in region" :key="item.id" :label="item.value" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="主要负责人" prop="entPerson">
        <el-input v-model="registerForm.entPerson" placeholder="请输入单位主要联系人姓名 (必填)" />
      </el-form-item>
      <el-form-item label="联系方式" prop="entContact">
        <el-input v-model="registerForm.entContact" placeholder="请输入单位主要负责人联系方式 (必填)" />
      </el-form-item>
      <el-form-item label="办公地址" prop="entAddress">
        <el-input v-model="registerForm.entAddress" placeholder="请输入单位办公地址 (必填)" />
      </el-form-item>
      <el-form-item label="申请说明" prop="remark">
        <el-input v-model="registerForm.remark" placeholder="资质申请备注说明" />
      </el-form-item>

      <div class="img-upload">
        <el-form-item>
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleUploadSuccess"
          >
            <img v-if="registerForm.carAdminerIsFile" :src="egisterForm.carAdminerIsFile" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
          <p style="width:140px">车队负责人身份证(正面)</p>
        </el-form-item>
        <el-form-item>
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleUploadSuccess"
          >
            <img v-if="registerForm.carAdminerTheFile" :src="registerForm.carAdminerTheFile" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
          <p style="width:140px">车队负责人身份证(反面)</p>
        </el-form-item>
      </div>
      <el-form-item label="车队负责人" prop="carAdminer">
        <el-input v-model="registerForm.carAdminer" placeholder="请输入车队负责人姓名 (必填)" />
      </el-form-item>
      <el-form-item label="身份证号" prop="carAdminerCode">
        <el-input v-model="registerForm.carAdminerCode" placeholder="请输入车队负责人身份证号码 (必填)" />
      </el-form-item>
      <el-form-item label="户籍地址" prop="carAdminerAddress">
        <el-input v-model="registerForm.carAdminerAddress" placeholder="请输入车队负责人户籍地址 (必填)" />
      </el-form-item>
      <el-form-item label="联系方式" prop="carAdminerContact">
        <el-input v-model="registerForm.carAdminerContact" placeholder="请输入车队负责人联系方式 (必填)" />
      </el-form-item>

      <div class="img-upload">
        <el-form-item>
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleUploadSuccess"
          >
            <img v-if="registerForm.gpsAdminerIsFile" :src="egisterForm.gpsAdminerIsFile" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
          <p style="width:140px">GPS管理员身份证(正面)</p>
        </el-form-item>
        <el-form-item prop="gpsAdminerTheFile">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleUploadSuccess"
          >
            <img v-if="registerForm.gpsAdminerTheFile" :src="registerForm.gpsAdminerTheFile" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
          <p style="width:140px">GPS管理员身份证(反面)</p>
        </el-form-item>
      </div>
      <el-form-item label="GPS管理员" prop="gpsAdminer">
        <el-input v-model="registerForm.gpsAdminer" placeholder="请输入GPS管理员姓名 (必填)" />
      </el-form-item>
      <el-form-item label="身份证号" prop="gpsAdminerCode">
        <el-input v-model="registerForm.gpsAdminerCode" placeholder="请输入GPS管理员身份证号码 (必填)" />
      </el-form-item>
      <el-form-item label="户籍地址" prop="gpsAdminerAddress">
        <el-input v-model="registerForm.gpsAdminerAddress" placeholder="请输入GPS管理员户籍地址 (必填)" />
      </el-form-item>
      <el-form-item label="联系方式" prop="gpsAdminerContact">
        <el-input v-model="registerForm.gpsAdminerContact" placeholder="请输入GPS管理员联系方式 (必填)" />
      </el-form-item>

      <div style="width:100%">
        <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click="handleRegister">下 一 步 , 完 善 车 辆 信 息</el-button>
        <a href="#/register">上一步</a>
      </div>

    </el-form>
  </div>
</template>

<script>

import { validEmpty, validPhone, validCompany, validCard, validEmptyImg } from '@/utils/validate-rule.js'

export default {
  name: 'EnterpriseInfo',
  data() {
    return {
      region: [ // 行政区域
        { id: 1, value: '谢家集区' },
        { id: 2, value: '田家庵区' },
        { id: 3, value: '八公山区' },
        { id: 4, value: '燔集区' },
        { id: 5, value: '山南新区' },
        { id: 6, value: '大通区' },
        { id: 7, value: '经济开发区' }
      ],
      atrue: [ // 企业性质
        { id: 1, value: '国企' },
        { id: 2, value: '私企' },
        { id: 3, value: '个人单位' }
      ],
      registerForm: {
        name: '', // 单位名称
        entCode: '', // 机构代码
        regAddress: '', // 注册地址
        regCapital: '', // 注册资本
        legaler: '', // 法人
        legalerCode: '', // 法人身份证号
        legalerAddress: '', // 法人户籍地址
        legalerContact: '', // 法人联系方式
        entAture: '', // 企业性质
        entArea: '', // 企业据辖区
        entAddress: '', // 企业办公地址
        entPerson: '', // 企业负责人
        entContact: '', // 负责人联系方式
        gpsAdminer: '', // GPS管理员
        gpsAdminerCode: '', // GPS管理员身份证号
        gpsAdminerAddress: '', // GPS管理员户籍地址
        gpsAdminerContact: '', // GPS管理员联系方式
        carAdminer: '', // 车队负责人
        carAdminerCode: '', // 车队负责人身份证号
        carAdminerAddress: '', // 车队负责人户籍地址
        carAdminerContact: '', // 车队负责人联系方式
        remark: '', // 申请说明

        entLicenseFile: '', // 企业营业执照文件
        entTranPremFile: '', // 运输许可证文件
        legalerIsFile: '', // 法人身份证正面
        legalerTheFile: '', // 法人身份证反面
        gpsAdminerIsFile: '', // GPS管理员身份证正面
        gpsAdminerTheFile: '', // GPS管理员身份证反面
        carAdminerIsFile: '', // 车队负责人身份证正面
        carAdminerTheFile: '', // 车队负责人身份证反面
        applyFile: '' // 申请函

      },
      rules: {
        name: [{ validator: validEmpty, trigger: 'blur' },, { max: 5, message: ' 单位名称最大长度为：50！', trigger: 'blur' }],
        entCode: [{ validator: validEmpty, trigger: 'blur' }, { validator: validCompany, trigger: 'blur' }],
        regAddress: [{ validator: validEmpty, trigger: 'blur' }, { max: 100, message: ' 地址最大长度为：100！', trigger: 'blur' }],
        regCapital: [{ validator: validEmpty, trigger: 'blur' }, { max: 20, message: ' 注册资本最大长度为：20！', trigger: 'blur' }],
        legaler: [{ validator: validEmpty, trigger: 'blur' }, { max: 10, message: ' 法人姓名最大长度为：10！', trigger: 'blur' }],
        legalerCode: [{ validator: validEmpty, trigger: 'blur' }, { validator: validCard, trigger: 'blur' }],
        legalerAddress: [{ validator: validEmpty, trigger: 'blur' }, { max: 100, message: ' 地址最大长度为：100！', trigger: 'blur' }],
        legalerContact: [{ validator: validEmpty, trigger: 'blur' }, { validator: validPhone, trigger: 'blur' }],
        entAture: [{ validator: validEmpty, trigger: 'change' }],
        entArea: [{ validator: validEmpty, trigger: 'change' }],
        entAddress: [{ validator: validEmpty, trigger: 'blur' }, { max: 100, message: ' 地址最大长度为：100！', trigger: 'blur' }],
        entPerson: [{ validator: validEmpty, trigger: 'blur' }, { max: 10, message: ' 负责人姓名最大长度为：10！', trigger: 'blur' }],
        entContact: [{ validator: validEmpty, trigger: 'blur' }, { validator: validPhone, trigger: 'blur' }],
        gpsAdminer: [{ validator: validEmpty, trigger: 'blur' }, { max: 10, message: ' GPS管理员姓名最大长度为：10！', trigger: 'blur' }],
        gpsAdminerCode: [{ validator: validEmpty, trigger: 'blur' }, { validator: validCard, trigger: 'blur' }],
        gpsAdminerAddress: [{ validator: validEmpty, trigger: 'blur' }, { max: 100, message: ' 地址最大长度为：100！', trigger: 'blur' }],
        gpsAdminerContact: [{ validator: validEmpty, trigger: 'blur' }, { validator: validPhone, trigger: 'blur' }],
        carAdminer: [{ validator: validEmpty, trigger: 'blur' }, { max: 10, message: ' 车队负责姓名最大长度为：10！', trigger: 'blur' }],
        carAdminerCode: [{ validator: validEmpty, trigger: 'blur' }, { validator: validCard, trigger: 'blur' }],
        carAdminerAddress: [{ validator: validEmpty, trigger: 'blur' }, { max: 100, message: ' 地址最大长度为：100！', trigger: 'blur' }],
        carAdminerContact: [{ validator: validEmpty, trigger: 'blur' }, { validator: validPhone, trigger: 'blur' }],
        remark: [{ max: 255, message: ' 申请说明最大长度为：255！', trigger: 'blur' }],
        gpsAdminerTheFile: [{ validator: validEmptyImg, trigger: 'blur' }]
      },

      loading: false
    }
  },
  methods: {

    handleUploadSuccess() {

    },

    handleRegister() {
      window.location.href = '#/registerCar'
      return false
      this.$refs['registerForm'].validate(valid => {
        /* if (valid) {
          this.loading = true

        } else {
          console.log('error submit!!')
          return false
        } */
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
