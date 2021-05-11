<template>
  <!-- 提交运输任务及运输任务相关申请时，选择车辆时，展示的全部车辆页面-->
  <!-- 父组件中需定义选中车辆接收事件：child-selected-car-->
  <div v-if="value">
    <el-dialog
      title="选择运输车辆"
      width="800px"
      append-to-body
      :before-close="close"
      :close-on-click-modal="false"
      :visible.sync="selectCarCard"
    >
      <el-form ref="searchForm" class="el-search">
        <el-form-item>
          <el-input
            v-model="searchData"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            resize="none"
            placeholder="请输入车牌号码进行搜索(多个车牌号码搜索时,以 空格 或 逗号 隔开)"
          />
        </el-form-item>
        <el-button icon="el-icon-search" @click="submitSearchForm">
          查 询
        </el-button>
      </el-form>

      <el-table
        ref="selectCarTable"
        style="width: 100%"
        class="fk-table"
        :data="carData"
        border
        highlight-current-row
        @row-click="handleRowClick"
      >
        <el-table-column type="selection" :selectable="isSelected" width="55" />
        <el-table-column prop="carNum" label="车牌牌号" />
        <el-table-column prop="company" min-width="200" show-overflow-tooltip label="所属单位" />
        <el-table-column prop="carType" label="车辆类型" />
        <el-table-column prop="useType" label="调用类型" />
        <el-table-column prop="status" label="车辆状态" />
      </el-table>

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
export default {
  name: 'SelectTranCar',
  props: ['value'],
  data() {
    return {
      selectCarCard: true,
      searchData: '',
      carData: [
        { id: 1, carNum: '皖D38339', company: '淮南市诚安土石方工程有限公司', carType: '新型环保车', useType: '自有车辆', status: '正常' },
        { id: 2, carNum: '皖D50589', company: '淮南市诚安土石方工程有限公司', carType: '新型环保车', useType: '自有车辆', status: '正常' },
        { id: 3, carNum: '皖D60877', company: '淮南市诚安土石方工程有限公司', carType: '新能源车', useType: '自有车辆', status: '正常' },
        { id: 4, carNum: '皖D39972', company: '淮南市诚安土石方工程有限公司', carType: '新型环保车', useType: '自有车辆', status: '禁运' },
        { id: 5, carNum: '皖D50058', company: '淮南市德祥汽车运输有限公司', carType: '新能源车', useType: '外借车辆', status: '正常' },
        { id: 6, carNum: '皖D38551', company: '淮南市德祥汽车运输有限公司', carType: '新型环保车', useType: '外借车辆', status: '正常' },
        { id: 7, carNum: '皖D37498', company: '淮南市德祥汽车运输有限公司', carType: '新型环保车', useType: '外借车辆', status: '正常' },
        { id: 8, carNum: '皖D50589', company: '淮南市诚安土石方工程有限公司', carType: '新型环保车', useType: '自有车辆', status: '正常' },
        { id: 9, carNum: '皖D60877', company: '淮南市诚安土石方工程有限公司', carType: '新能源车', useType: '自有车辆', status: '正常' },
        { id: 10, carNum: '皖D39972', company: '淮南市诚安土石方工程有限公司', carType: '新型环保车', useType: '自有车辆', status: '正常' },
        { id: 11, carNum: '皖D50058', company: '淮南市德祥汽车运输有限公司', carType: '新能源车', useType: '外借车辆', status: '正常' },
        { id: 12, carNum: '皖D38551', company: '淮南市德祥汽车运输有限公司', carType: '新型环保车', useType: '外借车辆', status: '禁运' },
        { id: 13, carNum: '皖D60877', company: '淮南市诚安土石方工程有限公司', carType: '新能源车', useType: '自有车辆', status: '正常' },
        { id: 14, carNum: '皖D39972', company: '淮南市诚安土石方工程有限公司', carType: '新型环保车', useType: '自有车辆', status: '正常' },
        { id: 15, carNum: '皖D50058', company: '淮南市德祥汽车运输有限公司', carType: '新能源车', useType: '外借车辆', status: '正常' },
        { id: 16, carNum: '皖D38551', company: '淮南市德祥汽车运输有限公司', carType: '新型环保车', useType: '外借车辆', status: '正常' },
        { id: 17, carNum: '皖D37498', company: '淮南市德祥汽车运输有限公司', carType: '新型环保车', useType: '外借车辆', status: '正常' },
        { id: 18, carNum: '皖D50589', company: '淮南市诚安土石方工程有限公司', carType: '新型环保车', useType: '自有车辆', status: '正常' },
        { id: 19, carNum: '皖D60877', company: '淮南市诚安土石方工程有限公司', carType: '新能源车', useType: '自有车辆', status: '正常' },
        { id: 20, carNum: '皖D39972', company: '淮南市诚安土石方工程有限公司', carType: '新型环保车', useType: '自有车辆', status: '禁运' },
        { id: 21, carNum: '皖D50058', company: '淮南市德祥汽车运输有限公司', carType: '新能源车', useType: '外借车辆', status: '正常' },
        { id: 22, carNum: '皖D38551', company: '淮南市德祥汽车运输有限公司', carType: '新型环保车', useType: '外借车辆', status: '正常' },
        { id: 23, carNum: '皖D37498', company: '淮南市德祥汽车运输有限公司', carType: '新型环保车', useType: '外借车辆', status: '正常' },
        { id: 24, carNum: '皖D50589', company: '淮南市诚安土石方工程有限公司', carType: '新型环保车', useType: '自有车辆', status: '正常' }
      ]
    }
  },
  methods: {

    // 点击行事件
    handleRowClick(row, column, event) {
      // 切换选中行状态
      if (row.status != '禁运') { this.$refs.selectCarTable.toggleRowSelection(row) }
    },

    /** 车辆选择确定
     * 父组件定义选中车辆接收方法：child-selected-car
     * */
    sureCarSelect() {
      const list = this.$refs.selectCarTable.selection
      this.$emit('child-selected-car', list)
      this.$emit('input', false)
    },

    // 行是否可以被选中
    isSelected(row) {
      return row.status != '禁运'
    },

    close() {
      this.$emit('input', false)
    },

    // 搜索查询车辆
    submitSearchForm() {
      console.log(this.searchData)
    }
  }
}
</script>
<style scoped>
.el-form {
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
}
</style>
