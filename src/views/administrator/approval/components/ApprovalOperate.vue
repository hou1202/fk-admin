<template>
  <!-- 审批操作-->
  <div>
    <ApprovalProcessUser :procUserInfo="approvProcess" ></ApprovalProcessUser>
<!--    <ApprovalProcessRecord :procRecordInfo="approvProcess" ></ApprovalProcessRecord> -->
    <div class="approv-operate">

        <div class="oper-tr tr-oper-button">
          <p class="td-title">审批</p>
          <div class="td-oper">
            <el-button type="success" plain size="mini" @click="formData.result = 'agree'">同意</el-button>
            <el-button type="danger" plain size="mini" @click="formData.result = 'regect'">驳回</el-button>
            <el-button type="warning" plain size="mini" @click="formData.result = 'disagree'">退回上级</el-button>
          </div>
        </div>
        <div class="oper-tr tr-oper-remark">
          <p class="td-title">审批意见</p>
          <div class="td-oper ">
            <el-input
              type="textarea"
              placeholder="请输入审批意见(选填,最多输入500字)"
              v-model="formData.remark"
              maxlength="500"
              show-word-limit
            />
          </div>
        </div>
        <div class="oper-tr tr-oper-adjunct">
          <p class="td-title">审批附件</p>
          <div class="td-oper">
            <!-- <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              multiple
              :limit="4"
              :before-upload="handleBeforeUpload"
              :on-exceed="handleNumBeyond"
              :on-progress="handleUploadProgress"
              :on-success="(response, file, fileList) => {handleUploadSuccess(response, file, fileList, 'other')}"
              :on-remove="(file, fileList) => {handleRemove(file, fileList, 'other')}"
              :on-change="(file, fileList) => {handleUploadChange(file, fileList, 'other')}"
              :class="{hideUpload:hideUpload.otherHide}"
            >
              <i class="el-icon-plus" />
            </el-upload> -->
            <ImgUpload :multiple="false"></ImgUpload>
          </div>
        </div>
        <div class="oper-tr tr-oper-adjunct">
          <p class="td-title">审批附件</p>
          <div class="td-oper">
            <ImgUpload :limit="3"></ImgUpload>
          </div>
        </div>


    </div>
  </div>
</template>
<script>
import ApprovalProcessUser from "@/views/administrator/approval/components/ApprovalProcessUser.vue"
import ApprovalProcessRecord from "@/views/administrator/approval/components/ApprovalProcessRecord.vue"
import ImgUpload from "@/views/administrator/components/ImgUpload.vue"
export default {
  name: 'ApprovalOperate',
  components: { ApprovalProcessUser, ApprovalProcessRecord, ImgUpload },
  props: {
    value: {
      type: Boolean,
    },
  },
  data() {
    return {
      approvProcess: [
        {user: '信息科审批'},
        {user: '执法二中队'},
        {user: '综合管理科'},
        {user: '信息业务分管领导'},
        {user: '书记大队长'},
      ],
      formData: {
        result: '',
        remark: '',
        adjunct: '',

      },
    }
  },
  created() {

  },
  methods: {

  },


}
</script>
<style lang="scss" >
.approv-operate {
  width: 100%;
  padding: 10px;

  .oper-tr {
    width: 100%;
    display: flex;
    .td-title {
      border:1px solid #dfe6ec;
      width: 20%;
      margin: 0;
      text-align: center;
    }
    .td-oper {
      border:1px solid #dfe6ec;
      width: 80%;
      padding: 5px;
    }
  }
  .tr-oper-button {
    line-height:50px;
    text-align: center;
  }
  .tr-oper-remark {
    .td-title {
      line-height:64px;
    }
    .td-oper {

      .el-textarea {
        .el-textarea__inner {
          border: none;
        }
      }
    }
  }
  .tr-oper-adjunct {
    .td-title {
      line-height:72px;
    }
  }
}


</style>
