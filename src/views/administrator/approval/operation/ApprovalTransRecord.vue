<template>
  <!-- 审批——运输作业备案-->
  <div v-if="value">
    <el-dialog
      title="运输作业备案审批"
      width="1200px"
      :append-to-body="true"
      :before-close="close"
      :close-on-click-modal="false"
      :visible.sync="winCard"
    >
    <TopBar title="审批" />
    <ApprovalOperate></ApprovalOperate>
    
    <TopBar title="工地信息" />
    <selfTable class="self-table-two">
      <selfTd label="工地名称">{{ resData.siteName }}</selfTd>
      <selfTd label="所属辖区">{{ resData.region }}</selfTd>
      <selfTd label="工地地址">{{ resData.address }}</selfTd>
      <selfTd label="渣土类型">{{ resData.soilType }}</selfTd>
      <selfTd label="建设单位">{{ resData.constructionUnit }}</selfTd>
      <selfTd label="建设单位联系人">{{ resData.constructionUser }}</selfTd>
      <selfTd label="建设单位联系方式">{{ resData.constructionPhone }}</selfTd>
      <selfTd label="施工单位">{{ resData.workUnit }}</selfTd>
      <selfTd label="施工单位联系人">{{ resData.workUser }}</selfTd>
      <selfTd label="施工单位联系方式">{{ resData.workPhone }}</selfTd>
      <selfTd label="建设面积">{{ resData.siteArea }} 平方米</selfTd>
      <selfTd label="渣土处置量">{{ resData.soilAmount }} 立方米</selfTd>
    </selfTable>

    <TopBar title="消纳场信息" />
    <selfTable class="self-table-two">
      <selfTd label="消纳场名称">{{ resData.absorName }}</selfTd>
      <selfTd label="所属辖区">{{ resData.absorRegion }}</selfTd>
      <selfTd label="消纳场地址">{{ resData.absorAddress }}</selfTd>
      <selfTd label="所属单位">{{ resData.absorEnterprise }}</selfTd>
    </selfTable>

    <TopBar title="运输信息" />
    <selfTable class="self-table-two">
      <selfTd label="承运单位">{{ resData.transCompany }}</selfTd>
      <selfTd label="运输类型">{{ resData.tranTypeText }}</selfTd>
      <selfTd label="申请运输日期">{{ resData.tranStartDate }} 至 {{ resData.tranEndDate }}</selfTd>
      <selfTd label="申请说明">{{ resData.remark }}</selfTd>
      <selfTd label="运输合同" type='img' :url="resData.tranContractFile" />
      <selfTd label="施工许可证" type='img' :url="resData.workLicenseFile" />
      <selfTd label="承诺书" type='img' :url="resData.promiseFile" />
      <selfTd label="出土方证明" type='img' :url="resData.siteFreeProveFile" />
      <selfTd label="调车单" type='img' :url="resData.shuntingFile" />
      <selfTd label="运输申请函" type='img' :url="resData.tranApplyFile" />
      <template v-if="resData.tranType == 'external'">
        <selfTd label="消纳场证明" type='img' :url="resData.absorProveFile" />
        <selfTd label="收土点证明" type='img' :url="resData.absorFreeProveFile" />
      </template>
      <selfTd label="其他附件" type='img' :url="resData.otherFile" style="width:100%" />
    </selfTable>

    <TopBar title="运输车辆" />
    <el-table
      style="width: 100%"
      class="fk-table"
      :data="resData.items"
      border
      highlight-current-row
    >
      <el-table-column type="index" width="80" label="序号"/>
      <el-table-column prop="carNum" label="车牌牌号" width="120"/>
      <el-table-column prop="company" show-overflow-tooltip label="所属单位" />
      <el-table-column
        label="车辆状态"
        prop="status"
        width="100"
        filter-placement="bottom-end">
        <template slot-scope="scope" >
          <el-tag
            class="self-tag"
            :type="scope.row.status === '禁运' ? 'warning' : 'success'">
            {{scope.row.status}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="carOwner" label="车主名称" show-overflow-tooltip/>
      <el-table-column prop="carOwnerContact" label="车主联系方式" width="130"/>
      <el-table-column
        label="北斗在线"
        prop="gpsOnline"
        width="100"
        filter-placement="bottom-end">
        <template slot-scope="scope" >
          <el-tag
            class="self-tag"
            :type="scope.row.gpsOnline === '否' ? 'warning' : 'success'">
            {{scope.row.gpsOnline}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="useType" label="调用类型" width="100"/>
      <el-table-column label="操作" width="160px" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button size="mini" type="primary" @click="handleViewCar(row)">
            详情
          </el-button>
          <el-button size="mini" type="danger" @click="handleRemoveCar(row, $index)">
            移除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    
    </el-dialog>
    <CarDetailView v-model="showCarDetailView" :carId="carId"></CarDetailView>
  </div>
</template>

<script>
import TopBar from '@/components/TopBar.vue'
import CarDetailView from '@/views/administrator/components/CarDetailView.vue'
import ApprovalOperate from "@/views/administrator/approval/components/ApprovalOperate.vue"

export default {
  name: 'ApprovalTransRecords',
  components: { TopBar, CarDetailView, ApprovalOperate },
  props: {
    value: {
      type: Boolean,
    },
    approvalInfo: {
      type: Object,
    }
  },
  data() {
    return {
      winCard: true, // 卡片显隐控制
      showCarDetailView: false,
      resData: {
        siteId: '15',
        siteName: '洞山东路综合地块改造项目', // 工地名称
        region: '大通区', // 工地所属辖区
        address: '安徽省淮南市大通区', // 工地地址
        transCompanyId: 25,
        transCompany: '淮南市金苗建筑工程有限公司',
        constructionUnit: '中建四局', // 建设单位
        constructionUser: '李白', // 建设单位联系人
        constructionPhone: '13565254158', // 建设单位联系方式
        workUnit: '安徽怡富建设工程有限公司', // 施工单位
        workUser: '赵杠', // 施工单位联系人
        workPhone: '18254652102', // 施工单位联系方式
        siteArea: '15241', // 工地面积
        soilAmount: '26321', // 预计渣土处置量
        soilType: '土方渣土', // 渣土类型
        tranType: 'external', // 运输类型：external(默认) / internal
        tranTypeText: '场外运输',
        tranStartDate: '2021--02-15', // 申请运输开始日期
        tranEndDate: '2021-03-15', // 申请运输结束日期
        remark: '',       //申请说明
        promiseFile: '1', // 承诺书附件
        shuntingFile: '2', // 调车单附件
        siteFreeProveFile: '2,3', // 出土点不收费证明附件
        tranContractFile: '0,1,2,3', // 运输合同附件
        workLicenseFile: '1', // 施工许可证附件
        tranApplyFile: '', // 运输申请函附件
        otherFile: '', // 其他附件

        absorId: '5', 		// 消纳场ID
        absorName: '采煤塌陷区治理（肿瘤医院）',		//
        absorRegion: '谢家集区',	//
        absorAddress: '安徽省淮南市谢家集区X009(黄歇路)',	//
        absorEnterprise: '淮南市政',
        submitTranRoad: '上海路-北京路-重庆路', // 提交外运线路
        absorProveFile: '2', // 消纳场证明附件
        absorFreeProveFile: '0,2,3', // 收土点不收费证明附件
        // 提交车辆列表
        items: [
          { id: 1, carNum: '皖D38339', company: '淮南市诚安土石方工程有限公司', gpsOnline:'是', carOwner: '淮南市诚安土石方工程有限公司', carOwnerContact: '13526548745', useType: '自有车辆', status: '正常' },
          { id: 2, carNum: '皖D50589', company: '淮南市诚安土石方工程有限公司', gpsOnline:'是', carOwner: '淮南市诚安土石方工程有限公司', carOwnerContact: '13526548745', useType: '自有车辆', status: '正常' },
          { id: 3, carNum: '皖D60877', company: '淮南市诚安土石方工程有限公司', gpsOnline:'是', carOwner: '淮南市诚安土石方工程有限公司', carOwnerContact: '13526548745', useType: '自有车辆', status: '正常' },
          { id: 4, carNum: '皖D39972', company: '淮南市诚安土石方工程有限公司', gpsOnline:'是', carOwner: '淮南市诚安土石方工程有限公司', carOwnerContact: '13526548745', useType: '自有车辆', status: '禁运' },
          { id: 5, carNum: '皖D50058', company: '淮南市德祥汽车运输有限公司', gpsOnline:'是', carOwner: '淮南市德祥汽车运输有限公司', carOwnerContact: '13526548745', useType: '外借车辆', status: '正常' },
          { id: 6, carNum: '皖D38551', company: '淮南市德祥汽车运输有限公司', gpsOnline:'否', carOwner: '淮南市德祥汽车运输有限公司', carOwnerContact: '13526548745', useType: '外借车辆', status: '正常' },
          { id: 7, carNum: '皖D37498', company: '淮南市德祥汽车运输有限公司', gpsOnline:'是', carOwner: '淮南市德祥汽车运输有限公司', carOwnerContact: '13526548745', useType: '外借车辆', status: '正常' },
          { id: 8, carNum: '皖D50589', company: '淮南市诚安土石方工程有限公司', gpsOnline:'是', carOwner: '淮南市诚安土石方工程有限公司', carOwnerContact: '13526548745', useType: '自有车辆', status: '正常' },
          { id: 9, carNum: '皖D60877', company: '淮南市诚安土石方工程有限公司', gpsOnline:'是', carOwner: '淮南市诚安土石方工程有限公司', carOwnerContact: '13526548745', useType: '自有车辆', status: '正常' },
          { id: 10, carNum: '皖D39972', company: '淮南市诚安土石方工程有限公司', gpsOnline:'是', carOwner: '淮南市诚安土石方工程有限公司', carOwnerContact: '13526548745', useType: '自有车辆', status: '正常' },
          { id: 11, carNum: '皖D50058', company: '淮南市德祥汽车运输有限公司', gpsOnline:'是', carOwner: '淮南市德祥汽车运输有限公司', carOwnerContact: '13526548745', useType: '外借车辆', status: '正常' },
          { id: 12, carNum: '皖D38551', company: '淮南市德祥汽车运输有限公司', gpsOnline:'是', carOwner: '淮南市德祥汽车运输有限公司', carOwnerContact: '13526548745', useType: '外借车辆', status: '禁运' },
          { id: 13, carNum: '皖D60877', company: '淮南市诚安土石方工程有限公司', gpsOnline:'否', carOwner: '淮南市诚安土石方工程有限公司', carOwnerContact: '13526548745', useType: '自有车辆', status: '正常' }
        ],
        approvalDate: '2021-02-08',
      },
      carId: null,
    }
  },
  created() {

  },
  methods: {
    close() {
      this.$emit('input', false)
    },

    /* 查看车辆详情点击事件*/
    handleViewCar(row) {
      this.carId = row.id
      this.showCarDetailView = true
    },

    /* 移除备案申请车辆事件*/
    handleRemoveCar(row, index) {
      this.$confirm('确认移除运输车辆：[ ' + row.carNum + ' ] ? 确认移除后将不可恢复！', '删除警示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message.success('运输车辆：[ ' + row.carNum + ' ] 移除成功!')
        this.resData.items.splice(index, 1)
      }).catch(() => {
        //取消处理
        console.log('取消')
      })
    },
  },

  watch: {
    approvalInfo(v) {
      console.log('wacth')
      this.resData.siteName = this.approvalInfo.siteName
    }
  },

}
</script>
<style lang="scss" scoped>


</style>
