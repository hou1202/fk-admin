<template>
  <!-- 审批流程展示-->
  <div style="width: 100%;overflow:hidden;">
    <div class="approv-proc" v-for="(item, index) in processInfoV">
      <div class="approv-proc-block">
        <div class="approv-user">
          <i class="iconfont icon-zt-ren"></i>
          <p>{{item.name}}</p>
        </div>
        <div class="approv-direc">
          <i class="iconfont icon-zt-jiantou"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'ApprovalProcess',
  components: {  },
  props: {
    value: {
      type: Boolean,
    },
    processInfo: {
      type: Object,
    }
  },
  data() {
    return {
      processInfoV: [
        {user: '信息科审批'},
        {user: '执法二中队'},
        {user: '综合管理科'},
        {user: '信息业务分管领导'},
        {user: '书记大队长'},
      ],
    }
  },
  created() {

  },
  methods: {

  },


}
</script>
<style lang="scss" scoped>
.approv-proc{
  display: flex;
  .approv-proc-block {
    text-align: center;
    display: flex;
    .approv-user {
      font-size: 18px;
      color: #409EFF;
      border: 1px solid #F2F6FC;
      border-radius: 3px;
      padding: 10px 0;
      i {
        font-size: 22px;
      }
      p {
        width: 75px;
        font-size: 12px;
        margin: 10px 0 0 0;
        padding: 0 5px;
        overflow:hidden;        white-space: nowrap;
      }

    }
    .approv-direc {
      width: 50px;
      line-height: 73px;
      color: #67C23A;
    }
  }
  .approv-proc-block:nth-last-child(1) {
    .approv-direc {
      display: none;;
    }
  }
}


</style>
