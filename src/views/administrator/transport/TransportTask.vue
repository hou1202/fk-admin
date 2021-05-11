<template>
  <div class="app-container">
    <!-- 搜索、功能按钮模块-->
    <div class="filter-container">

      <div class="self-search">
        <div v-if="showSearch">
          <el-input v-model="searchData.siteName" placeholder="搜索工地名称" class="filter-item" @keyup.enter.native="handleSearch" />
          <el-input v-model="searchData.absorName" placeholder="搜索消纳场名称" class="filter-item" @keyup.enter.native="handleSearch" />
          <el-select v-model="searchData.tranType" placeholder="选择任务运输类型" clearable class="filter-item">
            <el-option v-for="item in Object.entries(this.$selfJs.tranType)" :label="item[1]" :value="item[0]" />
          </el-select>
          <el-select v-model="searchData.tranStatus" placeholder="选择任务状态" clearable class="filter-item">
            <el-option v-for="item in Object.entries(this.$selfJs.tranStatus)" :label="item[1]" :value="item[0]" />
          </el-select>
          <el-select v-model="searchData.approvalStatus" placeholder="选择任务审批状态" class="filter-item">
            <el-option v-for="item in Object.entries(this.$selfJs.approvalStatus)" :label="item[1]" :value="item[0]" />
          </el-select>
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
        <el-button class="filter-item" size="small" type="primary" @click="showNewRecrod = true">
          新任务备案
        </el-button>
        <el-button class="filter-item" size="small" type="primary" @click="showAddTransCar = true">
          增加运输车辆
        </el-button>
        <el-button class="filter-item" size="small" type="primary" @click="showVideoPlay = true">
          视频播放
        </el-button>
        <el-button :loading="downloadLoading" class="filter-item" size="small" type="primary" icon="el-icon-download">
          Export
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
      <el-table-column label="工地名称" align="center" prop="siteName" show-overflow-tooltip min-width="150" />
      <el-table-column label="消纳场名称" prop="absorName" show-overflow-tooltip min-width="150" />
      <el-table-column label="任务类型" prop="tranType" :formatter="this.$selfJs.getTableText" width="130" />
      <el-table-column label="在运车辆数" prop="runCarNum" width="130">
        <template v-if="row.runCarNum" slot-scope="{row}">
          <span>{{ row.runCarNum }} 辆</span>
        </template>
      </el-table-column>
      <el-table-column label="运输趟次" prop="cumulTran" width="130">
        <template v-if="row.cumulTran" slot-scope="{row}">
          <span>{{ row.cumulTran }} 趟</span>
        </template>
      </el-table-column>
      <el-table-column label="运输状态" prop="tranStatus" :formatter="this.$selfJs.getTableText" width="130" />
      <el-table-column label="申请日期" prop="applyDate" width="130" />
      <el-table-column label="审批状态" prop="approvalStatus" :formatter="this.$selfJs.getTableText" width="130" />
      <el-table-column label="操作" align="center" width="280px" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button size="mini" type="primary" @click="handleRead(row)">
            查看
          </el-button>
          <el-button :type="row.approvalStatus =='edit' || row.approvalStatus =='rejected' ? 'success' : 'info'" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button size="mini" :type="row.approvalStatus =='edit' || row.approvalStatus =='rejected' ? 'danger' : 'info'" @click="handleDel(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页-->
    <!-- <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" /> -->
    <!-- 新任务备案-->
    <TransportNewRecord v-model="showNewRecrod" />
    <!-- 新增运输车辆-->
    <TransportAddCar v-model="showAddTransCar" />
    <!-- 视频播放-->
    <VideoPlay v-model="showVideoPlay" />
    <!-- 查看运输信息-->
    <TransportRead v-model="showReadTran" :tran-id="tranId" />

  </div>
</template>

<script>

import TransportNewRecord from './TransportNewRecord.vue'
import TransportAddCar from './TransportAddCar.vue'
import VideoPlay from './VideoPlay.vue'
import Pagination from '@/components/Pagination'
import TransportRead from './TransportRead.vue'

export default {
  name: 'TransportTask',
  components: { Pagination, TransportNewRecord, VideoPlay, TransportAddCar, TransportRead },
  data() {
    return {
      showNewRecrod: false,
      showAddTransCar: false,
      showVideoPlay: false,
      showReadTran: false,
      recordStatus: 'create',
      downloadLoading: false,
      showSearch: false,

      total: 0,
      listLoading: false,
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      datas: [
        { id: 1, siteName: '恒大君庭', absorName: '采煤塌陷区治理（肿瘤医院）', tranType: 'external', runCarNum: '', cumulTran: '', tranStatus: 'wait', applyDate: '2021-01-25', approvalStatus: 'edit' },
        { id: 2, siteName: '拓基鼎元世家', absorName: '', tranType: 'internal', runCarNum: '', cumulTran: '', tranStatus: 'wait', applyDate: '2021-01-05', approvalStatus: 'approving' },
        { id: 3, siteName: '观湖名邸一期', absorName: '世行贷款采煤塌陷修复3-2工区', tranType: 'external', runCarNum: '5', cumulTran: '541', tranStatus: 'runing', applyDate: '2020-12-14', approvalStatus: 'agree' },
        { id: 4, siteName: '舜耕华府三期', absorName: '档案馆回填', tranType: 'external', runCarNum: '18', cumulTran: '1259', tranStatus: 'runing', applyDate: '20210-12-08', approvalStatus: 'agree' },
        { id: 5, siteName: '城市综合体', absorName: '中电科八号院灰塘', tranType: 'external', runCarNum: '', cumulTran: '', tranStatus: 'wait', applyDate: '2020-11-11', approvalStatus: 'rejected' },
        { id: 6, siteName: '国烨新城', absorName: '', tranType: 'internal', runCarNum: '11', cumulTran: '', tranStatus: 'runing', applyDate: '2020-10-19', approvalStatus: 'agree' },
        { id: 7, siteName: '经开区绿色制造产业园', absorName: '林王村2号炉灰塘', tranType: 'external', runCarNum: '20', cumulTran: '2560', tranStatus: 'over', applyDate: '2020-10-03', approvalStatus: 'agree' }
      ],
      searchData: {
        siteName: '',
        absorName: '',
        tranType: '',
        tranStatus: '',
        approvalStatus: ''
      },
      tranId: {}
    }
  },
  created() { },
  methods: {
    handleSearch() {
      console.log('搜索')
      console.log(this.searchData)
    },
    handleDel(row) {
      if (row.approvalStatus == 'agree' || row.approvalStatus == 'approving') {
        this.$message.warning('该信息状态为 [ ' + this.$selfJs.getTextVal('approvalStatus', row.approvalStatus) + ' ],不可删除')
      } else {
        this.$confirm('确认删除工地为：[ ' + row.siteName + ' ]，的申请信息?', '删除警示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message.success('删除成功!')
        }).catch(() => {})
      }
    },
    handleUpdate(row) {
      if (row.approvalStatus == 'agree' || row.approvalStatus == 'approving') {
        this.$message.warning('该信息状态为 [' + this.$selfJs.getTextVal('approvalStatus', row.approvalStatus) + '],不可编辑')
      } else {
        this.$confirm('确认编辑工地为：[ ' + row.siteName + ' ]，的申请信息?', '编辑提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message.success('编辑成功!')
        }).catch(() => {
          return false
        })
      }
    },
    handleRead(row) {
      console.log('123456')
      console.log(row)
      // this.tranId = row.id;
      this.tranId = row
      this.showReadTran = true
    },
    getList() {
      /* this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      }) */
    }
  }

}
</script>
