<template>
  <!-- 审批流程用户展示-->
  <div style="width: 100%;overflow:hidden;padding:10px;">
    <div class="approv-proc" v-for="(item, index) in processI">
      <el-tooltip class="item" :content="item.user">
        <div class="approv-proc-block">
          <div class="approv-user">
            <i class="iconfont icon-zt-ren"></i>
            <p>{{item.user}}</p>
          </div>
          <div class="approv-direc">
            <i class="iconfont icon-zt-jiantou"></i>
          </div>
        </div>
      </el-tooltip>
    </div>
  </div>
</template>
<script>

export default {
  name: 'ApprovalProcessUser',
  components: {  },
  props: {
    value: {
      type: Boolean,
    },
    procUserInfo: {
      type: Array,
    }
  },
  data() {
    return {
      processI: [
        {user: '信息科审批'},
        {user: '执法二中队'},
        {user: '综合管理科'},
        {user: '信息业务分管领导'},
        {user: '书记大队长'},
      ],
    }
  },
  methods: {},


}
</script>
<style lang="scss" scoped>
.approv-proc{
  float:left;
  .approv-proc-block {
    text-align: center;
    display: flex;
    .approv-user {
      font-size: 18px;
      color: #409EFF;
      border: 1px solid #F2F6FC;
      border-radius: 3px;
      padding: 15px 5px;
      i {
        font-size: 26px;
      }
      p {
        width: 75px;
        font-size: 12px;
        margin: 10px 0 0 0;
        overflow:hidden;        white-space: nowrap;
      }

    }
    .approv-direc {
      width: 50px;
      line-height: 84px;
      color: #67C23A;
    }
  }
}
.approv-proc:nth-last-child(1) {
    .approv-direc {
      display: none;;
    }
  }


</style>
