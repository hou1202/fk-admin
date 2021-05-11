<template>
  <div class="login-container">

    <div class="login-logo">
      <img src="../../assets/favicon.png">
      <div>
        <h3>淮南市建筑垃圾管理平台(企业)</h3>
        <p>Huainan Construction Waste Management Platform (Enterprise)</p>
      </div>

    </div>
    <div class="login-block">
      <h3>登录</h3>
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left" hide-required-asterisk>

        <el-form-item prop="username" label="帐户">
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
          <el-form-item prop="password" label="密码">
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

        <el-button :loading="loading" type="primary" @click.native.prevent="handleLogin">登 录</el-button>

        <div class="bottom-footer">
          <a href="/register" class="footer-right">新企业备案</a>
          <a href="/forget" class="footer-left">忘记密码 ?</a>
        </div>
      </el-form>

    </div>
    <div class="login-footer">
      <i class="line_left" />
      <p>技术支持  合肥方科信息技术有限公司</p>
      <i class="line_right" />
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
              // this.$message.error('登录失败，请检查用户名或密码，重新登录！')
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

.login-container {
  min-height: 100%;
  width: 100%;
  background:url("../../assets/main1.png");
  background-position: center center;

  .login-logo {
    //height: 50px;
    text-align:left;
    position: absolute;
    top: 30px;
    left: 60px;
    img {
      width: 50px;
      height: 50px;
      float: left;
    }
    div {
      float: left;
      margin-left: 10px;
      color: #1890ff;
      //color: rgba(255,255,255,0.9);
      h3 {
        height: 30px;
        line-height: 30px;
        margin: 0;
        font-size: 26px;
        letter-spacing: 3px;
      }
      p {
        height: 30px;
        line-height: 30px;
        margin: 0;
        font-size: 12px;
        letter-spacing: 1px;
      }
    }
  }
  .login-block {

    margin: 0 auto;
    padding: 40px 80px;
    border-radius: 3px;
    background: rgba(255,255,255,0.8);
    border-radius: 8px;
    position: absolute;
    left: 50%;
    top: 50%;

    overflow: hidden;
    box-shadow: 0 6px 20px 5px rgba(40, 120, 255, 0.1), 0 16px 24px 2px rgba(0, 0, 0, 0.05);
    webkit-box-shadow: 0 14px 45px rgba(0,0,0,.247059), 0 10px 18px rgba(0,0,0,.219608);
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);

    //box-shadow: 0 14px 45px rgba(0,0,0,.247059), 0 10px 18px rgba(0,0,0,.219608);
    h3 {
      margin: 20px auto;
      font-size: 32px;
      text-align: center;
      letter-spacing: 10px;
      color: #1890ff;
    }
    .el-form {
      //width: 100%;
      max-width: 300px;
      margin: 50px 0;

      .el-form-item {
        width: 100% !important;

        .el-form-item__label {
          color: rgba(0, 0, 0, 0.54) !important;
        }
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
        width:100%;
        height: 50px;
        margin:30px 0 ;
      }
      .bottom-footer {
        font-size: 12px;
        color: rgb(72, 122, 237);
        .footer-right {

        }
        .footer-left {
          float:right;
        }
      }
    }
  }
  .login-footer {
    position: absolute;
    bottom: 20px;
    left: 0;
    width: 100%;
    //display: flex;
    text-align: center;
    p{
      font-size: 14px;
      color: #1890ff;
      margin: 0 10px;
      text-align: center;
      line-height:20px;
      display: inline-block;

    }

    i{
      display:inline-block;
      width: 100px;
      height: 20px;
      line-height: 20px;

    }

    .line_left {
      background: url("../../assets/line_left.png") no-repeat;
      background-position: center center;
    }
    .line_right {
      background: url("../../assets/line_right.png") no-repeat;
      background-position: center center;
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
/* 当浏览器宽度小于850px时执行 */
@media screen and (max-width:850px){
  .login-container {
    background-size:auto 100%;
    .login-block {
      .el-form {
        width: 300px;
      }
    }
  }
}
/* 当浏览器宽度小于550px时执行 */
@media screen and (max-width:550px){
  .login-container {
    .login-logo {
      left: 20px;
      img {
        width: 40px;
        height: 40px;
        margin-top: 5px;
      }
      div {
        h3 {
          font-size: 22px;
          letter-spacing: 1px;
        }
        p {
          height: 20px;
          line-height: 20px;
          letter-spacing: 0.5px;
          max-width: calc(100vw - 80px);
          overflow: hidden;
        }
      }

    }
    .login-block {
      padding: 40px 30px;
      .el-form {
        width: calc(100vw - 80px);
      }
    }
  }
}

</style>
