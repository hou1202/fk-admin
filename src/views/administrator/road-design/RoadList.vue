<template>
  <div class="app-container">
    <!-- 搜索、功能按钮模块-->
    <div class="filter-container">

      <div class="self-search">
        <div v-if="showSearch">
          <el-input v-model="searchData.title" placeholder="搜索工地名称" class="filter-item" @keyup.enter.native="handleSearch" />
          <el-input v-model="searchData.title" placeholder="搜索消纳场名称" class="filter-item" @keyup.enter.native="handleSearch" />
          <el-input v-model="searchData.title" placeholder="搜索承运单位名称" class="filter-item" @keyup.enter.native="handleSearch" />

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
      <el-table-column label="序号" type="index" align="center" width="80" />
      <el-table-column label="工地名称" align="center" prop="siteName"  show-overflow-tooltip/>
      <el-table-column label="消纳场名称" prop="absorName" show-overflow-tooltip/>
      <el-table-column label="承运单位" prop="tranCompany" show-overflow-tooltip/>
      <el-table-column label="核准线路" prop="allowRoad"  show-overflow-tooltip/>
      <el-table-column
        label="是否已规划"
        prop="isDesign"
        width="130"
        filter-placement="bottom-end">
        <template slot-scope="scope" >
          <el-tag
            class="self-tag"
            :type="scope.row.isDesign === '是' ? 'success' : 'warning'">
            {{scope.row.isDesign}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="170px" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button size="mini" type="primary" @click="handleDesign(row)">
            设计线路
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页-->
    <!-- <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" /> -->

    <DesignRoad v-model="showDesignRoadCard" :siteId="siteId"></DesignRoad>

  </div>
</template>

<script>


import Pagination from '@/components/Pagination'
import DesignRoad from "./DesignRoad.vue"

export default {
  name: 'RoadList',
  components: { Pagination, DesignRoad},
  data() {
    return {
      showSearch: true,     //  搜索区展示或隐藏，本页面不启用
      showDesignRoadCard: false,
      total: 0,
      listLoading: false,
      siteId: null,
      datas: [
        { id: 1, siteName: '恒大君庭', absorName: '采煤塌陷区治理（肿瘤医院）', tranCompany: '淮南金顺运输有限公司', allowRoad: '产业园二期-国槐路-二通道-洛河大道-中电科八号院', isDesign: '否' },
        { id: 3, siteName: '观湖名邸一期', absorName: '世行贷款采煤塌陷修复3-2工区', tranCompany: '淮南市同辉运输有限公司', allowRoad: '水厂路-啤酒厂路-田大南路-洞山东路-南山路', isDesign: '是' },
        { id: 4, siteName: '舜耕华府三期', absorName: '档案馆回填', tranCompany: '淮南金顺运输有限公司', allowRoad: '舜耕学府-玉兰大道-淮舜南路-洞山东路-九大路-206国道-大通区孵化基地', isDesign: '是' },
        { id: 5, siteName: '城市综合体', absorName: '中电科八号院灰塘', tranCompany: '淮南市鼎龙工程有限公司', allowRoad: '初阳苑-金家岭路-国庆路-广场北路-沿淮路-净水厂取水口', isDesign: '是' },
        { id: 7, siteName: '经开区绿色制造产业园', absorName: '林王村2号炉灰塘', tranCompany: '长丰县金岭运输有限公司淮南分公司', allowRoad: '瓦埠湖路-民惠街-国槐路-民裕大街-中南漫悦湾北门', isDesign: '是' }
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


    handleDesign(row) {
      this.siteId = row.id
      this.showDesignRoadCard = true;
    },


  }

}
</script>
