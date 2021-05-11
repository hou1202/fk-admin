<template>
  <!-- 选择消纳场-->
  <!-- 父组件中需定义选中接收事件：@selected-absor-->
  <div v-if="value">
    <el-dialog
      title="选择消纳场"
      width="1000px"
      append-to-body
      :before-close="close"
      :close-on-click-modal="false"
      :visible.sync="selectAbsorCard"
    >
      <el-form ref="searchForm" class="el-search">
        <el-form-item>
          <el-input
            v-model="searchData"
            resize="none"
            placeholder="请输入消纳场名称"
          />
        </el-form-item>
        <el-button icon="el-icon-search" @click="submitSearchForm">
          查 询
        </el-button>
      </el-form>

      <el-table
        ref="selectAbsorTable"
        style="width: 100%"
        class="fk-table"
        :data="carData"
        border
        highlight-current-row
        @row-click="handleRowClick"
      >
        <el-table-column type="index" label="序号" width="80" />
        <el-table-column prop="name" label="消纳场名称" min-width="150" show-overflow-tooltip />
        <el-table-column prop="company" label="所属单位" min-width="150" show-overflow-tooltip />
        <el-table-column prop="area" label="消纳场辖区" />
        <el-table-column prop="address" label="消纳场地址" min-width="150" show-overflow-tooltip />
        <el-table-column prop="status" label="消纳场状态" />
      </el-table>

      <div slot="footer" class="dialog-footer">
        <el-button @click="close()">
          取消
        </el-button>
        <el-button type="primary" @click="sureAbsorSelect">
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'SelectAbsor',
  props: ['value'],
  data() {
    return {
      selectAbsorCard: true,
      searchData: '',
      selectedData: {}, // 选中数据
      carData: [
        { id: 1, name: '林王村2号炉灰塘', company: '淮南市诚安土石方工程有限公司', area: '谢家集区', address: '淮南市田家庵区陈洞南路21号金海大厦', status: '正常' },
        { id: 2, name: '档案馆回填', company: '淮南市诚安土石方工程有限公司', area: '田家庵区', address: '淮南市田家庵区国庆路与淮舜北路交汇处', status: '正常' },
        { id: 3, name: '中电科八号院灰塘', company: '淮南市诚安土石方工程有限公司', area: '八公山区', address: '安徽省淮南市洞山西路', status: '正常' },
        { id: 4, name: '大通工业园', company: '淮南市诚安土石方工程有限公司', area: '山南新区', address: '安徽省淮南市合阜路', status: '整改中' },
        { id: 5, name: '上窑码头', company: '淮南市德祥汽车运输有限公司', area: '经济开发区', address: '淮南市广场路1号', status: '正常' },
        { id: 6, name: '人防1811', company: '淮南市德祥汽车运输有限公司', area: '毛集区', address: '淮南市山南新区206国道金山花园北侧公路', status: '正常' },
        { id: 7, name: '世行贷款采煤塌陷修复3-2工区', company: '淮南市德祥汽车运输有限公司', area: '凤台县', address: '淮南市凤台县102省道附近', status: '正常' },
        { id: 8, name: '淮南金科再生资源利用有限公司', company: '淮南金科再生资源利用有限公司', area: '大通区', address: '淮南市大通区上窑镇镇政府东100米', status: '正常' },
        { id: 9, name: '林王村2号炉灰塘', company: '淮南市诚安土石方工程有限公司', area: '谢家集区', address: '淮南市田家庵区陈洞南路21号金海大厦', status: '正常' },
        { id: 10, name: '档案馆回填', company: '淮南市诚安土石方工程有限公司', area: '田家庵区', address: '淮南市田家庵区国庆路与淮舜北路交汇处', status: '正常' },
        { id: 11, name: '中电科八号院灰塘', company: '淮南市诚安土石方工程有限公司', area: '八公山区', address: '安徽省淮南市洞山西路', status: '正常' },
        { id: 12, name: '大通工业园', company: '淮南市诚安土石方工程有限公司', area: '山南新区', address: '安徽省淮南市合阜路', status: '整改中' },
        { id: 13, name: '上窑码头', company: '淮南市德祥汽车运输有限公司', area: '经济开发区', address: '淮南市广场路1号', status: '正常' },
        { id: 14, name: '人防1811', company: '淮南市德祥汽车运输有限公司', area: '毛集区', address: '淮南市山南新区206国道金山花园北侧公路', status: '正常' },
        { id: 15, name: '世行贷款采煤塌陷修复3-2工区', company: '淮南市德祥汽车运输有限公司', area: '凤台县', address: '淮南市凤台县102省道附近', status: '正常' },
        { id: 16, name: '淮南金科再生资源利用有限公司', company: '淮南金科再生资源利用有限公司', area: '大通区', address: '淮南市大通区上窑镇镇政府东100米', status: '正常' }
      ]
    }
  },
  methods: {

    // 点击行事件
    handleRowClick(row, column, event) {
      this.selectedData = row
    },

    /** 消纳场选择确定
     * 父组件定义选中接收方法：@selected-absor
     * */
    sureAbsorSelect() {
      if (this.selectedData.status !== '正常') { return this.$message.warning('消纳场：' + this.selectedData.name + '处于' + this.selectedData.status + ',不可被选择使用！') }
      this.$emit('selected-absor', this.selectedData)
      this.$emit('input', false)
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
  width:calc(100% - 130px)
}
/deep/ .el-form .el-form-item .el-form-item__content {
  width: 100% !important;
}
/deep/ .el-form .el-form-item .el-form-item__content .el-input {
  width: 100% !important;
}
.el-form .el-button {
  height:33px;
  position: absolute;
  top: 0px;
  right: 0;
}
</style>
