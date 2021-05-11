<template>
  <!-- 提交运输任务及运输任务相关申请时，调用选中车辆列表展示页面 -->
  <!-- 父组件需向该组件中传递车辆列表数组：itemsCar -->
  <el-table
    :data="itemsCar"
    border
    highlight-current-row
    style="width: 100%"
    class="fk-table"
  >
    <el-table-column
      type="index"
      label="序号"
      width="60"
    />
    <el-table-column
      prop="carNum"
      label="车牌牌号"
    />
    <el-table-column
      prop="company"
      min-width="200"
      show-overflow-tooltip
      label="所属单位"
    />
    <el-table-column
      prop="carType"
      label="车辆类型"
    />
    <el-table-column
      prop="useType"
      label="调用类型"
    />
    <el-table-column
      prop="status"
      label="车辆状态"
    />
    <el-table-column
      width="150"
      label="操作"
    >
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          icon="el-icon-delete-solid"
          @click="handleDeleteCar(scope.$index, scope.row)"
        >删 除</el-button>
      </template>
    </el-table-column>
  </el-table>

</template>

<script>
export default {
  name: 'SelectedCarList',
  components: { },
  props: ['value', 'itemsCar'],
  data() {
    return {
    }
  },
  methods: {
    // 选择车辆列表中删除操作
    handleDeleteCar(row, index) {
      this.$notify({
        message: '车辆 [ ' + index.carNum + ' ] 移除成功！',
        type: 'success'
      })
      this.itemsCar.splice(index, 1)
    }
  }
}
</script>

<style>
</style>
