<template>
  <div class="app-container">
    <!-- 搜索、功能按钮模块-->
    <div class="filter-container">

      <div class="self-search">
        <div v-if="showSearch">
          <el-input v-model="searchData.title" placeholder="搜索流程名称" class="filter-item" @keyup.enter.native="handleSearch" />
          <el-input v-model="searchData.title" placeholder="搜索申请人名称" class="filter-item" @keyup.enter.native="handleSearch" />
          <el-input v-model="searchData.title" placeholder="搜索工地名称" class="filter-item" @keyup.enter.native="handleSearch" />
          <el-date-picker
            v-model="searchData.create_time"
            type="daterange"
            class="filter-item"
            range-separator="至"
            start-placeholder="发起开始日期"
            end-placeholder="发起结束日期">
          </el-date-picker>

          <el-button type="primary" size="mini" icon="el-icon-search" @click="handleSearch">
            搜索
          </el-button>
          <!-- <div class="search-icon" @click="showSearch = false">
            <i class="search-icon-hid" />
          </div> -->
        </div>
        <!-- <div v-else class="search-icon" @click="showSearch = true">
          <i class="search-icon-open" />
        </div> -->
      </div>

    </div>

    <!-- 列表模块-->
    <el-table
      v-loading="listLoading"
      :data="datas"
      border
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="序号" type="index" width="80" />
      <el-table-column label="流程申请人" prop="proposer" show-overflow-tooltip />
      <el-table-column label="工地名称" prop="siteName" show-overflow-tooltip />
      <el-table-column label="流程名称" prop="processName" show-overflow-tooltip />
      <el-table-column label="发起时间" prop="startDate"  width="150" />
      <el-table-column label="指派时间" prop="assignDate"  width="150" />
      <el-table-column label="当前节点" prop="currentNodes"  width="150" />
      <el-table-column label="流程耗时" prop="processExpend"  width="180" />
      <el-table-column label="操作" width="150px" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button size="mini" type="primary" @click="handleApproval(row)">
            审 批
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页-->
    <!-- <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" /> -->
    <ApprovalTransRecord v-model="showApprovalTransRecord"></ApprovalTransRecord>
  </div>
</template>

<script>


import Pagination from '@/components/Pagination'
import ApprovalTransRecord  from "./operation/ApprovalTransRecord.vue"        // 运输作业备案

export default {
  name: 'ApprovalList',
  components: { Pagination, ApprovalTransRecord},
  data() {
    return {
      showSearch: true,
      total: 0,
      listLoading: false,
      showApprovalTransRecord: true,     // 运输作业备案
      datas: [
        { id: 1, proposer: '淮南市金苗建筑工程有限公司', siteName: '采煤塌陷区治理（肿瘤医院）', processName: '运输作业备案', startDate: '2021-06-18 14:00:02', assignDate: '2021-06-18 14:00:02', currentNodes: '业务科审批',  processExpend: '3天21小时29分钟13秒' },
        { id: 2, proposer: '淮南市裕洋渣土运输有限公司', siteName: '拓基鼎元世家', processName: '运输线路变更', startDate: '2021-06-21 17:08:36', assignDate: '2021-06-22 11:26:28', currentNodes: '业务科审批',  processExpend: '18小时33分钟8秒' },
        { id: 3, proposer: '淮南市松凯运输有限公司', siteName: '观湖名邸一期', processName: '增加运输车辆', startDate: '2021-06-21 17:20:35', assignDate: '2021-06-22 11:25:44', currentNodes: '业务科审批',  processExpend: '18小时21分钟8秒' },
        { id: 4, proposer: '淮南市聚鼎运输有限公司', siteName: '', processName: '企业备案', startDate: '2021-06-21 17:30:13', assignDate: '2021-06-22 11:25:12', currentNodes: '业务科审批',  processExpend: '18小时11分钟31秒' },
        { id: 5, proposer: '长丰县金岭运输有限公司淮南分公司', siteName: '', processName: '车辆备案', startDate: '2021-06-21 16:42:47', assignDate: '2021-06-21 16:42:47', currentNodes: '业务科审批',  processExpend: '18小时58分钟57秒' },
        { id: 6, proposer: '淮南市长兴汽车运输有限公司', siteName: '国烨新城', processName: '运输作业延期', startDate: '2021-06-21 16:12:30', assignDate: '2021-06-21 16:13:12', currentNodes: '业务科审批',  processExpend: '19小时29分钟14秒' },
        { id: 7, proposer: '业务科', siteName: '', processName: '禁运企业申请', startDate: '2021-06-21 15:50:01', assignDate: '2021-06-21 16:12:34', currentNodes: '业务科审批',  processExpend: '19小时51分钟43秒' },
        { id: 8, proposer: '信息科', siteName: '', processName: '禁运车辆申请', startDate: '2021-06-21 15:56:52', assignDate: '2021-06-21 16:12:22', currentNodes: '业务科审批',  processExpend: '19小时44分钟51秒' },
        { id: 8, proposer: '淮南市贝乐运输有限公司', siteName: '世行贷款采煤塌陷修复3-2工区', processName: '运输作业备案', startDate: '2021-06-21 15:48:27', assignDate: '2021-06-21 15:49:17', currentNodes: '业务科审批',  processExpend: '19小时53分钟17秒' },
      ],
      searchData: {
        title: '',
        create_time: ''
      },
    }
  },
  created() { },
  methods: {
    handleSearch() {
      console.log(this.searchData)
    },

    handleApproval(row) {
      console.log(row)
      switch(row.processName) {
        case '运输作业备案' :
          this.showApprovalTransRecord = true;
          break;
        case '运输线路变更' :
          this.showApprovalTransRecord = true;
          break;
        case '增加运输车辆' :
          this.showApprovalTransRecord = true;
          break;
        case '企业备案' :
          this.showApprovalTransRecord = true;
          break;
        case '车辆备案' :
          this.showApprovalTransRecord = true;
          break;
        case '运输作业延期' :
          this.showApprovalTransRecord = true;
          break;
        case '禁运企业申请' :
          this.showApprovalTransRecord = true;
          break;
        case '禁运车辆申请' :
          this.showApprovalTransRecord = true;
          break;
      }
    },


  }

}
</script>
