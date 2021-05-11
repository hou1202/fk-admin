<template>
  <!-- 查看运输任务详情-->
  <div v-if="value">
    <el-dialog
      title="查看运输作业信息"
      width="1160px"
      :append-to-body="true"
      :before-close="close"
      :close-on-click-modal="false"
      :visible.sync="winCard"
    >
      <el-tabs v-model="activeName">
        <el-tab-pane label="基本信息" name="first">
          <TopBar title="工地信息" />
          <selfTable class="self-table-two">
            <selfTd label="工地名称">{{ siteData.siteName }}</selfTd>
            <selfTd label="所属辖区">{{ siteData.region }}</selfTd>
            <selfTd label="工地地址">{{ siteData.address }}</selfTd>
            <selfTd label="渣土类型">{{ siteData.soilType }}</selfTd>
            <selfTd label="建设单位">{{ siteData.constructionUnit }}</selfTd>
            <selfTd label="建设单位联系人">{{ siteData.constructionUser }}</selfTd>
            <selfTd label="建设单位联系方式">{{ siteData.constructionPhone }}</selfTd>
            <selfTd label="施工单位">{{ siteData.workUnit }}</selfTd>
            <selfTd label="施工单位联系人">{{ siteData.workUser }}</selfTd>
            <selfTd label="施工单位联系方式">{{ siteData.workPhone }}</selfTd>
            <selfTd label="建设面积">{{ siteData.siteArea }} 平方米</selfTd>
            <selfTd label="渣土处置量">{{ siteData.soilAmount }} 立方米</selfTd>
          </selfTable>

          <TopBar title="运输信息" />
          <selfTable class="self-table-two">
            <selfTd label="运输类型">{{ siteData.tranTypeText }}</selfTd>
            <template v-if="siteData.tranType == 'external'">
              <selfTd label="消纳场名称">{{ siteData.absorName }}</selfTd>
              <selfTd label="所属辖区">{{ siteData.absorRegion }}</selfTd>
              <selfTd label="消纳场地址">{{ siteData.absorAddress }}</selfTd>
              <selfTd label="所属单位">{{ siteData.absorEnterprise }}</selfTd>
            </template>
            <template v-if="siteData.approvalStatus != 'agree'">
              <selfTd label="申请运输日期">{{ siteData.tranStartDate }} 至 {{ siteData.tranEndDate }}</selfTd>
              <selfTd v-if="siteData.tranType == 'external'" label="申请运输线路">{{ siteData.submitTranRoad }}</selfTd>
              <selfTd v-if="siteData.tranType == 'internal'" label="场内转动说明">{{ siteData.absorRegion }}</selfTd>
              <selfTd label="备注说明">{{ siteData.remark }}</selfTd>
            </template>
            <template v-else>
              <selfTd label="运输日期">{{ siteData.tranStartDate }} 至 {{ siteData.tranEndDate }}</selfTd>
              <selfTd v-if="siteData.tranType == 'external'" label="运输线路">{{ siteData.submitTranRoad }}</selfTd>
              <selfTd v-if="siteData.tranType == 'internal'" label="场内转动说明">{{ siteData.absorRegion }}</selfTd>
            </template>
            <selfTd label="申请日期">{{ siteData.approvalDate }}</selfTd>
            <selfTd label="审批状态" :merge="siteData.approvalStatus == 'agree' ? 'true' : ''">{{ this.$selfJs.getTextVal('approvalStatus', siteData.approvalStatus) }}</selfTd>
            <selfTd v-if="siteData.approvalStatus == 'rejected'" label="驳回说明" merge="true" colors="red">{{ siteData.regectInfo }}</selfTd>
            <template v-if="siteData.approvalStatus != 'agree'">
              <!-- 附件图片-->
              <selfTd label="运输合同" :url="siteData.tranContractFile" />
              <selfTd label="施工许可证" :url="siteData.tranContractFile" />
              <selfTd label="承诺书" :url="siteData.tranContractFile" />
              <selfTd label="出土方证明" :url="siteData.tranContractFile" />
              <selfTd label="调车单" :url="siteData.tranContractFile" />
              <selfTd label="运输申请函" :url="siteData.tranContractFile" />
              <template v-if="siteData.tranType == 'external'">
                <selfTd label="消纳场证明" :url="siteData.tranContractFile" />
                <selfTd label="收土点证明" :url="siteData.tranContractFile" />
              </template>
              <selfTd label="其他附件" :url="siteData.tranContractFile" style="width:100%" />
            </template>
          </selfTable>
        </el-tab-pane>
        <template v-if="siteData.approvalStatus != 'agree'">
          <el-tab-pane label="申请车辆信息" name="second">
            <el-table
              style="width: 100%"
              class="fk-table"
              :data="siteData.items"
              border
              highlight-current-row
            >
              <el-table-column type="index" width="100" />
              <el-table-column prop="carNum" label="车牌牌号" />
              <el-table-column prop="company" min-width="200" show-overflow-tooltip label="所属单位" />
              <el-table-column prop="carType" label="车辆类型" />
              <el-table-column prop="useType" label="调用类型" />
              <!-- <el-table-column prop="status" label="车辆状态" /> -->
            </el-table>
          </el-tab-pane>
        </template>
        <template v-else>
          <el-tab-pane label="在运车辆信息" name="second">
            <el-table
              style="width: 100%"
              class="fk-table"
              :data="siteData.runItems"
              border
              highlight-current-row
            >
              <el-table-column type="index" width="100" />
              <el-table-column prop="carNum" label="车牌牌号" />
              <el-table-column prop="company" min-width="200" show-overflow-tooltip label="所属单位" />
              <el-table-column prop="carType" label="车辆类型" />
              <el-table-column prop="useType" label="调用类型" />
              <el-table-column label="准运日期" min-width="130">
                <template slot-scope="{row}">
                  <span>{{ row.startDate }}  至  {{ row.endDate }}</span>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane v-if="siteData.runItems" label="历史车辆信息" name="three">
            <el-table
              style="width: 100%"
              class="fk-table"
              :data="siteData.runItems"
              border
              highlight-current-row
            >
              <el-table-column type="index" width="100" />
              <el-table-column prop="carNum" label="车牌牌号" />
              <el-table-column prop="company" min-width="200" show-overflow-tooltip label="所属单位" />
              <el-table-column prop="carType" label="车辆类型" />
              <el-table-column prop="useType" label="调用类型" />
              <el-table-column label="准运日期" min-width="130">
                <template slot-scope="{row}">
                  <span>{{ row.startDate }}  至  {{ row.endDate }}</span>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </template>
      </el-tabs>

    </el-dialog>
  </div>

</template>

<script>

import TopBar from '@/components/TopBar.vue'
import BaseTranInfo from './components/BaseTranInfo.vue'

export default {
  name: 'TransportRead',
  components: { TopBar, BaseTranInfo },
  props: ['value', 'tranId'],
  data() {
    return {
      imageUrl: '',
      winCard: true, // 卡片显隐控制
      activeName: 'first',

      siteData: {
        siteId: '15',
        siteName: '洞山东路综合地块改造项目', // 工地名称
        region: '大通区', // 工地所属辖区
        address: '安徽省淮南市大通区', // 工地地址
        longitude: '', // 经度
        latitude: '', // 纬度
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
        promiseFile: '1', // 承诺书附件
        shuntingFile: '1', // 调车单附件
        siteFreeProveFile: '1', // 出土点不收费证明附件
        tranContractFile: '1', // 运输合同附件
        workLicenseFile: '1', // 施工许可证附件
        tranApplyFile: '1', // 运输申请函附件
        otherFile: '', // 其他附件

        absorId: '5', 		// 消纳场ID
        absorName: '采煤塌陷区治理（肿瘤医院）',		//
        absorRegion: '谢家集区',	//
        absorAddress: '安徽省淮南市谢家集区X009(黄歇路)',	//
        absorEnterprise: '淮南市政',
        submitTranRoad: '上海路-北京路-重庆路', // 提交外运线路
        absorProveFile: '1', // 消纳场证明附件
        absorFreeProveFile: '1', // 收土点不收费证明附件
        // 提交车辆列表
        items: [
          { id: 1, carNum: '皖D38339', company: '淮南市诚安土石方工程有限公司', carType: '新型环保车', useType: '自有车辆', status: '正常' },
          { id: 2, carNum: '皖D50589', company: '淮南市诚安土石方工程有限公司', carType: '新型环保车', useType: '自有车辆', status: '正常' },
          { id: 3, carNum: '皖D60877', company: '淮南市诚安土石方工程有限公司', carType: '新能源车', useType: '自有车辆', status: '正常' },
          { id: 4, carNum: '皖D39972', company: '淮南市诚安土石方工程有限公司', carType: '新型环保车', useType: '自有车辆', status: '禁运' },
          { id: 5, carNum: '皖D50058', company: '淮南市德祥汽车运输有限公司', carType: '新能源车', useType: '外借车辆', status: '正常' },
          { id: 6, carNum: '皖D38551', company: '淮南市德祥汽车运输有限公司', carType: '新型环保车', useType: '外借车辆', status: '正常' },
          { id: 7, carNum: '皖D37498', company: '淮南市德祥汽车运输有限公司', carType: '新型环保车', useType: '外借车辆', status: '正常' },
          { id: 8, carNum: '皖D50589', company: '淮南市诚安土石方工程有限公司', carType: '新型环保车', useType: '自有车辆', status: '正常' },
          { id: 9, carNum: '皖D60877', company: '淮南市诚安土石方工程有限公司', carType: '新能源车', useType: '自有车辆', status: '正常' },
          { id: 10, carNum: '皖D39972', company: '淮南市诚安土石方工程有限公司', carType: '新型环保车', useType: '自有车辆', status: '正常' },
          { id: 11, carNum: '皖D50058', company: '淮南市德祥汽车运输有限公司', carType: '新能源车', useType: '外借车辆', status: '正常' },
          { id: 12, carNum: '皖D38551', company: '淮南市德祥汽车运输有限公司', carType: '新型环保车', useType: '外借车辆', status: '禁运' },
          { id: 13, carNum: '皖D60877', company: '淮南市诚安土石方工程有限公司', carType: '新能源车', useType: '自有车辆', status: '正常' }
        ],
        // 在运车辆列表
        runItems: [
          { id: 1, carNum: '皖D38339', company: '淮南市诚安土石方工程有限公司', carType: '新型环保车', useType: '自有车辆', status: '正常', startDate: '2021-02-01', endDate: '2021-03-02' },
          { id: 2, carNum: '皖D50589', company: '淮南市诚安土石方工程有限公司', carType: '新型环保车', useType: '自有车辆', status: '正常', startDate: '2021-02-01', endDate: '2021-03-02' },
          { id: 3, carNum: '皖D60877', company: '淮南市诚安土石方工程有限公司', carType: '新能源车', useType: '自有车辆', status: '正常', startDate: '2021-02-01', endDate: '2021-03-02' },
          { id: 4, carNum: '皖D39972', company: '淮南市诚安土石方工程有限公司', carType: '新型环保车', useType: '自有车辆', status: '禁运', startDate: '2021-02-01', endDate: '2021-03-02' },
          { id: 5, carNum: '皖D50058', company: '淮南市德祥汽车运输有限公司', carType: '新能源车', useType: '外借车辆', status: '正常', startDate: '2021-02-01', endDate: '2021-03-02' },
          { id: 6, carNum: '皖D38551', company: '淮南市德祥汽车运输有限公司', carType: '新型环保车', useType: '外借车辆', status: '正常', startDate: '2021-02-01', endDate: '2021-03-02' },
          { id: 7, carNum: '皖D37498', company: '淮南市德祥汽车运输有限公司', carType: '新型环保车', useType: '外借车辆', status: '正常', startDate: '2021-02-01', endDate: '2021-03-02' },
          { id: 8, carNum: '皖D50589', company: '淮南市诚安土石方工程有限公司', carType: '新型环保车', useType: '自有车辆', status: '正常', startDate: '2021-02-01', endDate: '2021-03-02' },
          { id: 9, carNum: '皖D60877', company: '淮南市诚安土石方工程有限公司', carType: '新能源车', useType: '自有车辆', status: '正常', startDate: '2021-02-01', endDate: '2021-03-02' },
          { id: 10, carNum: '皖D39972', company: '淮南市诚安土石方工程有限公司', carType: '新型环保车', useType: '自有车辆', status: '正常', startDate: '2021-02-01', endDate: '2021-03-02' },
          { id: 11, carNum: '皖D50058', company: '淮南市德祥汽车运输有限公司', carType: '新能源车', useType: '外借车辆', status: '正常', startDate: '2021-02-01', endDate: '2021-03-02' },
          { id: 12, carNum: '皖D38551', company: '淮南市德祥汽车运输有限公司', carType: '新型环保车', useType: '外借车辆', status: '禁运', startDate: '2021-02-01', endDate: '2021-03-02' },
          { id: 13, carNum: '皖D60877', company: '淮南市诚安土石方工程有限公司', carType: '新能源车', useType: '自有车辆', status: '正常', startDate: '2021-02-01', endDate: '2021-03-02' }
        ],
        approvalDate: '2021-02-08',
        approvalStatus: 'edit',
        regectInfo: '提交的信息不对'
      }
    }
  },
  watch: {
    tranId() {
      this.siteData.approvalStatus = this.tranId.approvalStatus
      this.siteData.tranType = this.tranId.tranType
    }
  },
  methods: {
    close() {
      this.activeName = 'first' // 退出时将标签卡重置为第一个
      this.$emit('input', false)
    }

  }

}
</script>
