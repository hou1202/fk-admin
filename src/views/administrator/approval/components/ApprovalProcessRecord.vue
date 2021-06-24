<template>
  <!-- 审批流程审批记录展示-->
  <div style="width: 100%;overflow:hidden;padding:10px;">
    <el-table
      v-loading="listLoading"
      :data="recordInfo"
      border
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="序号" type="index" width="60" />
      <el-table-column label="审批步骤" prop="name" show-overflow-tooltip width="180"/>
      <el-table-column label="审批人" prop="user" show-overflow-tooltip width="180"/>
      <el-table-column
        label="审批结果"
        prop="result"
        width="120"
        filter-placement="bottom-end">
        <template slot-scope="scope" >
          <el-tag
            class="self-tag"
            :type="resultStatus(scope.row.result)">
            {{scope.row.result}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="审批意见" prop="remark" />
      <el-table-column label="审批附件" prop="adjunct"  max-width="100">
        <template slot-scope="scope" >
          <showImg :url-str="scope.row.adjunct" width="45"/>
        </template>
      </el-table-column>
      <el-table-column label="审批时间" prop="create_time"  width="150" />
    </el-table>
  </div>
</template>
<script>
import ShowImg from "@/components/ShowImg.vue"
export default {
  name: 'ApprovalProcessRecord',
  components: { ShowImg  },
  props: {
    value: {
      type: Boolean,
    },
    procRecordInfo: {
      type: Array,
    },
    type: {     //是展示审批记录还是在审批时展示，在审批时展示会在最后一行加上当前审批人
      type: Boolean,
      default: true,
    }
  },
  data() {
    return {
      listLoading: false,
      recordInfo: [
        {name: '运输作业备案-提交', user: '淮南市松凯运输有限公司', result: '', remark: '', adjunct:'', create_time: '2021-06-04 11:38:52'},
        {name: '信息科审批', user: '信息科', result: '驳回', remark: '李一矿李二矿修复区没有做好六个百分百，整改中', adjunct:'1', create_time: '2021-06-09 10:10:26'},
        {name: '运输作业备案-提交', user: '淮南市松凯运输有限公司', result: '', remark: '再次提交', adjunct:'', create_time: '2021-06-09 11:26:21'},
        {name: '信息科审批', user: '信息科', result: '同意', remark: '', adjunct:'', create_time: '2021-06-16 10:29:14'},
        {name: '执法中队审批', user: '执法二中队', result: '同意', remark: '严格实行6个100%文明施工', adjunct:'', create_time: '2021-06-18 10:26:32'},
        {name: '综合管理科审批', user: '综合管理科', result: '同意', remark: '', adjunct:'', create_time: '2021-06-18 10:26:32'},
        {name: '信息业务分管领导审批', user: '信息业务分管领导', result: '退回上级', remark: '消纳场证明文件请填写自己工地的消纳场', adjunct:'', create_time: '2021-06-18 10:26:32'},
        {name: '综合管理科审批', user: '综合管理科', result: '同意', remark: '已重新修整', adjunct:'1,2', create_time: '2021-06-18 10:26:32'},
        {name: '信息业务分管领导审批', user: '信息业务分管领导', result: '同意', remark: '', adjunct:'', create_time: '2021-06-18 10:26:32'},
      ],
    }
  },
  mounted() {
    /* 若type为真时，添加当前审批人*/
    if(this.type){
      let currentUser = {name: '书记大队长审批', user: '书记大队长', result: '待审批', remark: '', adjunct:'', create_time: ''}
      this.recordInfo.push(currentUser)
    }
  },
  methods: {
    //审批状态颜色显示
    resultStatus(res) {
      switch(res) {
        case '同意':
          return 'success';
        case '退回上级':
          return 'warning';
        case '驳回':
          return 'danger';
      }
    }
  },


}
</script>
<style lang="scss" scoped>
</style>
