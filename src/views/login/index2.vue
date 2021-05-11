<template>
  <div class="login-container">

    <div class="container-left">
      <div class="container-title">
        <img src="@/assets/favicon.png">
        <div>
          <h2>淮南市建筑垃圾管理平台(企业端)</h2>
          <h3>Huainan Construction Waste Management Platform (Enterprise)</h3>
        </div>
      </div>
      <div class="container-img">
        <img src="@/assets/main.png">
      </div>

    </div>

    <div class="container-right">
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">

        <div class="title-container">
          <h3 class="title">系统登录</h3>
        </div>

        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="登录用户名"
            name="username"
            type="text"
            tabindex="1"
            autocomplete="on"
          />
        </el-form-item>

        <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              placeholder="登录密码"
              name="password"
              tabindex="2"
              autocomplete="on"
              @keyup.native="checkCapslock"
              @blur="capsTooltip = false"
              @keyup.enter.native="handleLogin"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>
        </el-tooltip>

        <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登 录</el-button>

        <div class="right-footer">
          <a href="/register" class="footer-right">新企业备案</a>
          <a href="/forget" class="footer-left">忘记密码 ?</a>
        </div>
      </el-form>

    </div>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import SocialSign from './components/SocialSignin'

export default {
  name: 'Login',
  components: { SocialSign },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入登录用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 3) {
        callback(new Error('登录密码最小长度为6位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
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
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
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
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
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
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#1890ff;
$cursor: #1890ff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
    height: 50px;
    line-height: 50px;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 50px;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 50px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border-bottom: 1px solid rgba(72, 122, 237,0.5);
    .el-form-item__content {
      width:100%;
    }

  }
}
</style>

<style lang="scss" scoped>
$bg:rgb(72, 122, 237);
$dark_gray:#889aa4;
$light_gray:rgba(72, 122, 237,0.9);
$title-height: 60px;

.login-container {
  min-height: 100%;
  width: 100%;
  display: flex;
  overflow: hidden;

  .container-left {
    width: 70%;
    height: 100vh;
    background-color: $bg;
    padding: 10% 10%;
    position: relative;

    .container-title {
      width: 100%;
      padding: 50px 0 20px 50px;
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      z-index: 10;

      img {
        width: $title-height;
        height: $title-height;
      }
      h2 {
        margin: 0;
        margin-left:30px;
        line-height: 40px;
        font-size: 34px;
        color: rgba(255,255,255,0.9);
        letter-spacing: 3px;

      }
      h3 {
        margin: 0;
        margin-left:30px;
        line-height: 30px;
        font-size: 18px;
        color: rgba(255,255,255,0.9);
      }

    }

    .container-img {
      width: 70%;
      position: absolute;
      top:50%;
      left: 50%;
      transform: translate(-50%, -50%);

      img {
        width: 100%;
      }
    }
  }
  .container-right {
    width: 30%;
    min-width: 400px;
    height: 100vh;

    .login-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 200px 35px 0;
      margin: 0 auto;
      overflow: hidden;

      .title-container {
        position: relative;

        .title {
          font-size: 26px;
          color: #1890ff;
          margin: 0px auto 40px auto;
          text-align: center;
          font-weight: bold;
        }
      }

      .el-form-item {
        width: 100% !important;
        margin-bottom: 50px !important;

        .el-form-item__content {
          width: 100%;

          .el-input {
            width: calc(100% - 30px);
            height: 100%;

            .el-input__inner {
              height: 50px;
              line-height: 50px;
              color: rgb(72, 122, 237) !important;
              caret-color: rgb(72, 122, 237) !important;
            }

          }
        }

      }

      .el-button {
        height: 47px;
        margin-top: 50px;
      }

      .right-footer {
        color: rgb(72, 122, 237);
        font-size: 14px;
        margin-top: 25px;
        .footer-right {

        }
        .footer-left {
          float:right;
        }

      }
    }
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
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

</style>
