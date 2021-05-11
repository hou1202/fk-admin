<template>
  <div class="register-container">
    <div class="register-title">
      <h3>新运输企业资质备案</h3>
    </div>

    <div class="register-step">
      <el-steps :active="1">
        <el-step title="帐户注册" icon="el-icon-edit" />
        <el-step title="企业信息完善" icon="el-icon-orange" />
        <el-step title="车辆信息录入" icon="el-icon-truck" />
      </el-steps>
    </div>

    <el-form ref="registerForm" :model="registerForm" :rules="rules" class="register-form" label-position="left">

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          v-model="registerForm.username"
          placeholder="请输入注册手机号码"
        />
      </el-form-item>

      <el-form-item prop="sureCode">
        <span class="svg-container">
          <svg-icon icon-class="message" />
        </span>
        <el-input
          v-model="registerForm.sureCode"
          placeholder="请输入验证码"
        />
        <el-button class="get_code" :disabled="isDisabled" @click="getCode">{{ isDisabled ? countText.count + 's后获取' : countText.click }}</el-button>
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          v-model="registerForm.password"
          :type="passwordType"
          placeholder="请设置登录密码"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click="handleRegister">下 一 步</el-button>

      <div class="a-footer">
        <a href="/login" class="footer-right">返回登录</a>
      </div>
    </el-form>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'

export default {
  name: 'Register',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        // this.$message.error("注册手机号码不得为空！");
        // return false;
        callback(new Error('注册手机号码不得为空！'))
      } else if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(value))) {
        callback(new Error('输入手机号码有误，请重填！'))
      }
    }
    const validateSureCode = (rule, value, callback) => {
      if (!value) {
        callback(new Error('验证码不得为空！'))
      } else if (value.length != 6 || !(/^[0-9]+.?[0-9]*$/.test(value))) {
        callback(new Error('验证码信息有误，请重填！'))
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (!value || value.length < 6) {
        callback(new Error('密码不得为空，且长度不得小于六位！'))
      }
    }

    return {
      countText: {
        count: '59',
        click: '获取验证码'
      },
      isDisabled: false,
      registerForm: {
        username: '13564078415',
        password: '111111',
        sureCode: '111111'
      },
      rules: {
        username: [{ validator: validateUsername, trigger: 'blur' }],
        sureCode: [{ validator: validateSureCode, trigger: 'blur' }],
        password: [{ validator: validatePassword, trigger: 'blur' }]
      },
      passwordType: 'password',

      loading: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  methods: {
    // 倒计时
    countTime() {
      const TIME_COUNT = 10 // 倒计时60秒
      if (!this.timer) {
        this.countText.count = TIME_COUNT
        this.isDisabled = true
        this.timer = setInterval(() => {
          if (this.countText.count > 0 && this.countText.count <= TIME_COUNT) {
            this.countText.count--
          } else {
            this.isDisabled = false
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
    },

    // 点击获取短信验证码
    getCode() {
      this.countTime()
    },

    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },

    handleRegister() {
      window.location.href = '#/registerEnterprise'
      return false
      this.$refs['registerForm'].validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }

  }
}
</script>

<style lang="scss">
$bg:rgb(72, 122, 237);
$dark_gray:#889aa4;
$light_gray:rgba(72, 122, 237,0.9);
$title-height: 60px;
.register-container {
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
    width: 400px;
    margin: 0 auto;
    padding-top: 120px;
    .el-form-item {
      width: 100% !important;

      .el-form-item__content {
        width: 100%;
        border-bottom: 1px solid rgb(72, 122, 237);

        .svg-container {
          padding: 6px 5px 6px 15px;
          color: $dark_gray;
          vertical-align: middle;
          width: 30px;
          display: inline-block;
        }

        .el-input {
          width: calc(100% - 30px);
          height: 100%;

          .el-input__inner {
            height: 45px !important;
            line-height: 45px;
            color: rgb(72, 122, 237) !important;
            caret-color: rgb(72, 122, 237) !important;
            border: none;
          }

        }
      }
    }

    .el-button {
      height: 47px;
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

    @media only screen and (max-width: 470px) {
      .thirdparty-button {
        display: none;
      }
    }
  }
}
/* 获取短信验证码按钮 */
.get_code {
  height: 36px !important;
  width: 95px;
  line-height: 36px;
  padding: 0 10px;
  position: absolute;
  right: 5px;
  top: -45px
}
/* 暂时未用 */
.countdown_timer {
  background-color: #e8f4ff;
  color: #1682e6;
  border-color: #badeff;
}
/* 底部返回链接 */
.a-footer {
        color: rgb(72, 122, 237);
        font-size: 14px;
        margin-top: 25px;
        .footer-right {

        }
        .footer-left {
          float:right;
        }

      }

</style>
