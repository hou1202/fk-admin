<template>
  <div class="app-container">
    <!-- 搜索、功能按钮模块-->
    <div class="filter-container">

      <div class="self-search">
        <div v-if="showSearch">
          <el-input v-model="searchData.title" placeholder="搜索公告标题" class="filter-item" @keyup.enter.native="handleSearch" />
          <el-date-picker
            v-model="searchData.create_time"
            type="daterange"
            class="filter-item"
            range-separator="至"
            start-placeholder="发布开始日期"
            end-placeholder="发布结束日期">
          </el-date-picker>

          <el-button type="primary" size="mini" icon="el-icon-search" @click="handleSearch">
            搜索
          </el-button>
          <div class="search-icon" @click="showSearch = false">
            <i class="search-icon-hid" />
          </div>
        </div>
        <div v-else class="search-icon" @click="showSearch = true">
          <i class="search-icon-open" />
        </div>
      </div>

      <div class="self-func">
        <el-button class="filter-item" size="small" type="primary" @click="handleCreate">
          新增公告
        </el-button>
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
      <el-table-column label="序号" type="index" align="center" width="80" />
      <el-table-column label="公告标题" align="center" prop="siteName" show-overflow-tooltip min-width="150" />
      <el-table-column label="公告摘要" prop="absorName" show-overflow-tooltip min-width="150" />
      <el-table-column label="发布时间" prop="applyDate" width="150" />
      <el-table-column label="公告类型" prop="approvalStatus" :formatter="this.$selfJs.getTableText" width="150" />
      <el-table-column label="操作" align="center" width="280px" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button size="mini" type="primary" @click="handleRead(row)">
            查看
          </el-button>
          <el-button type="success" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button size="mini" type="danger" @click="handleDel(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页-->
    <!-- <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" /> -->
    <NoticeAdd v-model="showNoticeAddCard" :noticeId="noticeId" :title="noticeTitle"></NoticeAdd>
    <!-- 查看公告-->
    <NoticeRead v-model="showNoticeReadCard" :noticeId="noticeId"></NoticeRead>

  </div>
</template>

<script>

import NoticeAdd from "./NoticeAdd.vue"
import NoticeRead from "./NoticeRead.vue"
import Pagination from '@/components/Pagination'

export default {
  name: 'NoticeList',
  components: { Pagination, NoticeAdd, NoticeRead},
  data() {
    return {
      downloadLoading: false,
      showSearch: false,
      showNoticeAddCard: false,
      showNoticeReadCard: false,
      total: 0,
      listLoading: false,
      datas: [
        { id: 1, siteName: '恒大君庭', absorName: '采煤塌陷区治理（肿瘤医院）', tranType: 'external', runCarNum: '', cumulTran: '', tranStatus: 'wait', applyDate: '2021-01-25', approvalStatus: 'edit' },
        { id: 2, siteName: '拓基鼎元世家', absorName: '', tranType: 'internal', runCarNum: '', cumulTran: '', tranStatus: 'wait', applyDate: '2021-01-05', approvalStatus: 'approving' },
        { id: 0, siteName: '观湖名邸一期', absorName: '世行贷款采煤塌陷修复3-2工区', tranType: 'external', runCarNum: '5', cumulTran: '541', tranStatus: 'runing', applyDate: '2020-12-14', approvalStatus: 'agree' },
        { id: 4, siteName: '舜耕华府三期', absorName: '档案馆回填', tranType: 'external', runCarNum: '18', cumulTran: '1259', tranStatus: 'runing', applyDate: '20210-12-08', approvalStatus: 'agree' },
        { id: 5, siteName: '城市综合体', absorName: '中电科八号院灰塘', tranType: 'external', runCarNum: '', cumulTran: '', tranStatus: 'wait', applyDate: '2020-11-11', approvalStatus: 'rejected' },
        { id: 6, siteName: '国烨新城', absorName: '', tranType: 'internal', runCarNum: '11', cumulTran: '', tranStatus: 'runing', applyDate: '2020-10-19', approvalStatus: 'agree' },
        { id: 7, siteName: '经开区绿色制造产业园', absorName: '林王村2号炉灰塘', tranType: 'external', runCarNum: '20', cumulTran: '2560', tranStatus: 'over', applyDate: '2020-10-03', approvalStatus: 'agree' }
      ],
      searchData: {
        title: '',
        create_time: ''
      },
      noticeId: null,
      noticeTitle: '',

    }
  },
  created() { },
  methods: {
    handleCreate () {
      this.noticeId = null;
      this.noticeTitle = '新增公告'
      this.showNoticeAddCard = true;
    },

    handleSearch() {
      console.log(this.searchData)
    },

    handleDel(row) {
      this.$confirm('确认删除公告：[ ' + row.siteName + ' ] ？', '删除警示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message.success('删除成功!')
      }).catch(() => {})
    },

    handleUpdate(row) {
      console.log(row)
      this.noticeId = row.id
      this.noticeTitle = '编辑公告'
      this.showNoticeAddCard = true;
    },

    handleRead(row) {
      this.noticeId = row.id
      this.showNoticeReadCard = true;
    },


  }

}
</script>
