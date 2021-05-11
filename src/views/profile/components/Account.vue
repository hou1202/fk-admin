<template>
  <el-form label-position="top" label-width="150px">
    <el-form-item label="原密码">
      <el-input v-model.trim="user.name" />
    </el-form-item>
    <el-form-item label="新密码">
      <el-input v-model.trim="user.email" />
    </el-form-item>
    <el-form-item label="确认新密码">
      <el-input v-model.trim="user.email" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">确认修改</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          email: ''
        }
      }
    }
  },
  methods: {
    submit() {
      this.$message({
        message: 'User information has been updated successfully',
        type: 'success',
        duration: 5 * 1000
      })
    }
  }
}
</script>
<style scoped lang="scss">
  .el-form .el-form-item {
    display: block !important;
  }
</style>
