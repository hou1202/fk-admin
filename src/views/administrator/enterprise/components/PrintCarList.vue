<template>
  <!-- 打印调车单-->
  <div v-if="value">
    <el-dialog
      title="打印调车单"
      width="800px"
      append-to-body
      :before-close="close"
      :close-on-click-modal="false"
      :visible.sync="diaLogCard"
    >
      <div>
        <h3>建筑垃圾（渣土）工地车辆申请表</h3>
        <p>公司自有车辆号牌</p>
        <div>
          <ul>
            <li />
            <li />
            <li />
            <li />
            <li />
          </ul>
        </div>
        <p>公司借用车辆号牌</p>
        <div>
          <ul>
            <li />
            <li />
            <li />
            <li />
            <li />
          </ul>
        </div>

      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="close()">
          取消
        </el-button>
        <el-button type="primary" @click="">
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'PrintCarList',
  props: ['value', 'carList'],
  data() {
    return {
      diaLogCard: true
    }
  },

  watch: {
    carList() {
      console.log(this.carList)
    }
  },
  methods: {

    close() {
      this.$emit('input', false)
    }

  }
}
</script>
<style scoped>

</style>
