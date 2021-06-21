<template>

  <div class="regulatory regulatory-site">
    <!-- 工地树结构列表-->
    <el-card class="re-left">
      <div class="re-search">
        <el-input
          v-model="searchText"
          placeholder="输入工地名称进行搜索"
        >
          <el-button slot="append" icon="el-icon-search" @click="searchCar" />
        </el-input>
      </div>
      <div class="re-box-tree">
        <el-collapse accordion>
          <template v-for="(item, index) in treeData">
            <el-collapse-item :name="index">
              <template slot="title">
                <span>[ {{ item.transWorkTasks.length }} ]</span> {{ item.areaName }} <i class="change-read iconfont icon-zt-chakan" @click="readArea(item)" />
              </template>
              <div
                v-for="(itemc, indexc) in item.transWorkTasks"
                :class="[
                  'site-list',
                  itemc.status == 'abnormal'
                    ? 'site-abnormal'
                    : itemc.status == 'over'
                      ? 'site-over'
                      : ''
                ]"
                @click="readSite(item.id,itemc)"
              >
                <p><i class="iconfont icon-zt-gongdi" /> {{ itemc.projectName }}</p>
                <span>{{ itemc.companyName }}</span>
              </div>
            </el-collapse-item>
          </template>
        </el-collapse>
      </div>
    </el-card>

    <div class="re-right">
      <!-- 总体统计数据-->
      <el-card v-if="isShowTotal" class="box-card-total">
        <div class="card-item">
          <p>100</p>
          <p>工地总数</p>
        </div>
        <div class="card-item">
          <p>100</p>
          <p>今日在运数</p>
        </div>
        <div class="card-item">
          <p>100</p>
          <p>今出土量</p>
        </div>
      </el-card>

      <!-- 具体工地信息-->
      <el-card v-if="isShowButton" class="box-card-button">
        <i class="iconfont icon-zt-gengduo info-icon" @click="openSiteCard('monitorInfo')" />

        <div class="card-item" @click="openSiteCard('monitorInfo')">
          <i class="iconfont icon-zt-jiankong color-red" /> <!-- 视频 -->
          <p>2</p>
        </div>
        <!-- <div class="card-item" @click="openSiteCard('baseInfo')">
          <i class="el-icon-document-copy color-cyan"></i> 基本
          <p>2</p>
        </div> -->
        <div class="card-item" @click="openSiteCard('carInfo')">
          <i class="iconfont icon-zt-huoche color-default" />  <!-- 全部车辆-->
          <p>36</p>
        </div>
        <div class="card-item" @click="openSiteCard('tasksInfo')">
          <i class="iconfont icon-zt-car color-green" />  <!-- 在运车辆-->
          <p>24</p>
        </div>
        <div class="card-item" @click="openSiteCard('tasksInfo')">
          <i class="iconfont icon-zt-tangci color-blue" /> <!-- 运输趟次-->
          <p>356</p>
        </div>
        <div class="card-item" @click="openSiteCard('tasksInfo')">
          <i class="iconfont icon-zt-chutu color-yellow" />  <!-- 出土量-->
          <p>1956</p>
        </div>

      </el-card>

      <!-- 工地信息展开盒子-->
      <el-card v-if="isShowSite" class="box-card-site">
        <i class="iconfont icon-zt-gengduo site-icon" @click="openSiteCard('closed')" />

        <el-collapse v-model="activeBoxItem" accordion>
          <el-collapse-item title="视频监控" name="monitorInfo" class="is-active">
            <div class="item-info">
              <label>~ 暂无视频信息 ~</label>
            </div>
          </el-collapse-item>

          <el-collapse-item title="基本信息" name="baseInfo">
            <div class="item-info">
              <label>工地名称</label>
              <p>{{ siteDetail.projectName }}</p>
            </div>
            <div class="item-info">
              <label>工地地址</label>
              <p>{{ siteDetail.projectAddress }}</p>
            </div>
            <div class="item-info">
              <label>建设单位</label>
              <p>{{ siteDetail.constructionUnitName }}</p>
            </div>
            <div class="item-info">
              <label>建设单位联系人</label>
              <p>{{ siteDetail.cUContactName }}</p>
            </div>
            <div class="item-info">
              <label>施工单位</label>
              <p>{{ siteDetail.implementUnitName }}</p>
            </div>
            <div class="item-info">
              <label>施工单位联系人</label>
              <p>{{ siteDetail.iUContactName }}</p>
            </div>
            <div class="item-info">
              <label>承运单位</label>
              <p>{{ siteDetail.enterpriseName }}</p>
            </div>
            <div class="item-info">
              <label>承运单位联系人</label>
              <p>{{ siteDetail.iUContactName }}</p>
            </div>
            <div class="item-info">
              <label>承运单位联系方式</label>
              <p>{{ siteDetail.iUPhoneNum }}</p>
            </div>
            <div class="item-info">
              <label>运输类型</label>
              <p>{{ $selfJs.getTextVal('tranType',siteDetail.wSTransportType) }}</p>
            </div>
            <template v-if="siteDetail.wSTransportType == 'external'">
              <div class="item-info">
                <label>消纳场名称</label>
                <p>{{ absorbDetail.name }}</p>
              </div>
              <div class="item-info">
                <label>消纳场地址</label>
                <p>{{ absorbDetail.address }}</p>
              </div>
            </template>
            <div class="item-info">
              <label>核准线路</label>
              <p>{{ siteDetail.allowRoute }}</p>
            </div>
          </el-collapse-item>

          <el-collapse-item title="在运车辆" name="tasksInfo">
            <!-- <div class="item-info" >
              <label>~ 今日暂无在运车辆 ~</label>
            </div> -->
            <div class="soil-total">
              <div class="soil-item">
                <p>{{ siteDetail.transNum }}</p>
                <label>今日运输趟次</label>
              </div>
              <div class="soil-item">
                <p>{{ siteDetail.outSoilNum }}</p>
                <label>今日出土量</label>
              </div>
            </div>
            <div v-for="(item, index) in siteDetail.carList" v-if="item.transNum" class="itme-tc item-tc-three">
              <div>
                <p><i class="iconfont icon-zt-huoche color-blue" />{{ item.carNum }}</p>
                <p>{{ item.companyName }}</p>
              </div>
              <div>
                <p><i class="el-icon-odometer color-blue" /> {{ item.transNum }} 趟</p>
                <p><i class="el-icon-orange color-blue" /> {{ item.outSoilNum }} 方</p>
                <p><i class="el-icon-position color-blue" /> {{ $selfJs.getTextVal('gpsStatus',item.gpsStatus) }}</p>
              </div>
            </div>
          </el-collapse-item>

          <el-collapse-item title="全部车辆" name="carInfo">
            <!-- <div class="item-info">
              <label>~ 该任务中暂无车辆 ~</label>
            </div> -->
            <div v-for="(item, index) in siteDetail.carList" class="itme-tc item-all">
              <div>
                <p><i class="iconfont icon-zt-huoche color-blue" />{{ item.carNum }}</p>
                <p>{{ item.companyName }}</p>
              </div>
              <div>
                <p><i class="el-icon-date color-blue" /> <span>{{ item.startDate }} 至 {{ item.endDate }}</span></p>
              </div>
            </div>
          </el-collapse-item>

        </el-collapse>
      </el-card>

      <!-- 地图加载-->
      <div id="allmap" style="width:100%;height:100%" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'RegulatorySite',
  data() {
    return {
      map: null,
      isShowTotal: true, // 总统计数据卡片
      isShowButton: false, // 信息功能按钮区卡片
      isShowSite: false, // 工地信息详情卡片
      activeBoxItem: 'monitorInfo', // 详情折叠面板控制键
      searchText: '', // 检索内容
      isAppointArea: true, // 是否查看指定辖区
      mapStyle: require('@/assets/map-json/base_map_config.json'),
      siteImg: require('@/assets/point-site.png'),
      absorbImg: require('@/assets/point-absor.png'),
      carImg: {
        normal: require('@/assets/car-normal-small.png'),
        park: require('@/assets/car-park-small.png'),
        offline: require('@/assets/car-offline-small.png'),
        abnormal: require('@/assets/car-abnormal-small.png')
      },

      treeData: [],
      // 工地树结构数据
      list: [
        {
          'areaName': '山南新区',
          'transWorkTasks': [
            {
              'id': 99,
              'enterpriseId': 22,
              'companyName': '淮南市金苗建筑工程有限公司',
              'projectName': '安粮淮安府',
              'status': 'in_progress',
              'constructionUnitName': '淮南汇鸿国基房地产投资有限公司',
              'longitude': 117.017887,
              'latitude': 32.600550,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 0
            }, {
              'id': 100,
              'enterpriseId': 32,
              'companyName': '淮南金顺运输有限公司',
              'projectName': '淮南高新区产业园二期',
              'status': 'in_progress',
              'constructionUnitName': '淮南市高新区开发投资有限公司',
              'longitude': 117.000126,
              'latitude': 32.574011,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 0
            }, {
              'id': 115,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '碧桂园一期',
              'status': 'abnormal',
              'constructionUnitName': '待定',
              'longitude': 117.010687,
              'latitude': 32.588130,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }, {
              'id': 116,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '晟地绿园',
              'status': 'over',
              'constructionUnitName': '待定',
              'longitude': 116.983646,
              'latitude': 32.604498,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }, {
              'id': 119,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '龙城奥运二期',
              'status': 'in_progress',
              'constructionUnitName': '待定',
              'longitude': 117.029513,
              'latitude': 32.573944,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }, {
              'id': 120,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '安理家园',
              'status': 'in_progress',
              'constructionUnitName': '待定',
              'longitude': 117.042362,
              'latitude': 32.561941,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }, {
              'id': 122,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '拓基集团',
              'status': 'in_progress',
              'constructionUnitName': '待定',
              'longitude': 117.017895,
              'latitude': 32.598493,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }, {
              'id': 123,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '老年公寓',
              'status': 'in_progress',
              'constructionUnitName': '待定',
              'longitude': 117.047752,
              'latitude': 32.607748,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }, {
              'id': 124,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '一品麓苑',
              'status': 'in_progress',
              'constructionUnitName': '待定',
              'longitude': 116.990318,
              'latitude': 32.608653,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }, {
              'id': 125,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '舜山名邸',
              'status': 'in_progress',
              'constructionUnitName': '待定',
              'longitude': 117.031652,
              'latitude': 32.606792,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }, {
              'id': 126,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '金融中心',
              'status': 'in_progress',
              'constructionUnitName': '待定',
              'longitude': 117.033423,
              'latitude': 32.587520,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }, {
              'id': 128,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '南山名邸',
              'status': 'in_progress',
              'constructionUnitName': '待定',
              'longitude': 117.016164,
              'latitude': 32.587418,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }, {
              'id': 130,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '中电科八号院',
              'status': 'in_progress',
              'constructionUnitName': '待定',
              'longitude': 117.028568,
              'latitude': 32.582868,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }, {
              'id': 131,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '中至信壹号院',
              'status': 'in_progress',
              'constructionUnitName': '待定',
              'longitude': 117.016198,
              'latitude': 32.587467,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }, {
              'id': 144,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '中南漫悦湾二期',
              'status': 'in_progress',
              'constructionUnitName': '待定',
              'longitude': 117.004445,
              'latitude': 32.598317,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }, {
              'id': 145,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '综合医院',
              'status': 'in_progress',
              'constructionUnitName': '待定',
              'longitude': 117.006342,
              'latitude': 32.587687,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }, {
              'id': 146,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '舜耕华府三期',
              'status': 'in_progress',
              'constructionUnitName': '待定',
              'longitude': 117.020730,
              'latitude': 32.586009,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }, {
              'id': 147,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '观湖名居三期',
              'status': 'in_progress',
              'constructionUnitName': '待定',
              'longitude': 117.020389,
              'latitude': 32.587459,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }, {
              'id': 148,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '三和卫生院',
              'status': 'in_progress',
              'constructionUnitName': '待定',
              'longitude': 116.989070,
              'latitude': 32.597880,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }, {
              'id': 149,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '三和中学',
              'status': 'in_progress',
              'constructionUnitName': '待定',
              'longitude': 116.983941,
              'latitude': 32.607946,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }, {
              'id': 150,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '恒大君庭',
              'status': 'in_progress',
              'constructionUnitName': '待定',
              'longitude': 116.991743,
              'latitude': 32.605473,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }, {
              'id': 151,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '双创服务中心',
              'status': 'in_progress',
              'constructionUnitName': '待定',
              'longitude': 117.007331,
              'latitude': 32.564939,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }, {
              'id': 152,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '山南四种和七小',
              'status': 'in_progress',
              'constructionUnitName': '待定',
              'longitude': 116.993059,
              'latitude': 32.593774,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }, {
              'id': 154,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '中至信书香雅苑',
              'status': 'in_progress',
              'constructionUnitName': '待定',
              'longitude': 117.041477,
              'latitude': 32.593063,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }, {
              'id': 156,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '香樟苑五期',
              'status': 'in_progress',
              'constructionUnitName': '待定',
              'longitude': 117.002206,
              'latitude': 32.578877,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }, {
              'id': 158,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '香樟苑六期',
              'status': 'in_progress',
              'constructionUnitName': '待定',
              'longitude': 116.996795,
              'latitude': 32.577293,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }, {
              'id': 161,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '拓基鼎元世家',
              'status': 'in_progress',
              'constructionUnitName': '待定',
              'longitude': 117.040383,
              'latitude': 32.600208,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }, {
              'id': 162,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '山南职教园',
              'status': 'in_progress',
              'constructionUnitName': '待定',
              'longitude': 116.982585,
              'latitude': 32.582643,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }, {
              'id': 164,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '御香山',
              'status': 'in_progress',
              'constructionUnitName': '待定',
              'longitude': 117.031327,
              'latitude': 32.599732,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }, {
              'id': 166,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '中南春风南岸',
              'status': 'in_progress',
              'constructionUnitName': '待定',
              'longitude': 117.013285,
              'latitude': 32.590272,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }, {
              'id': 168,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '东方学府',
              'status': 'in_progress',
              'constructionUnitName': '待定',
              'longitude': 117.041779,
              'latitude': 32.587838,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }, {
              'id': 171,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '海德公馆',
              'status': 'in_progress',
              'constructionUnitName': '待定',
              'longitude': 117.052266,
              'latitude': 32.587254,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }, {
              'id': 174,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '南山里',
              'status': 'in_progress',
              'constructionUnitName': '待定',
              'longitude': 117.026034,
              'latitude': 32.604835,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }, {
              'id': 176,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '一品山南',
              'status': 'in_progress',
              'constructionUnitName': '待定',
              'longitude': 117.006094,
              'latitude': 32.609841,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }, {
              'id': 178,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '城市综合体',
              'status': 'in_progress',
              'constructionUnitName': '待定',
              'longitude': 117.038256,
              'latitude': 32.593121,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }, {
              'id': 179,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '东昌庭院',
              'status': 'in_progress',
              'constructionUnitName': '待定',
              'longitude': 117.011549,
              'latitude': 32.594174,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }, {
              'id': 180,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '山南一号',
              'status': 'in_progress',
              'constructionUnitName': '待定',
              'longitude': 117.002913,
              'latitude': 32.594048,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }, {
              'id': 181,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '候机楼',
              'status': 'in_progress',
              'constructionUnitName': '待定',
              'longitude': 117.015926,
              'latitude': 32.576382,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }, {
              'id': 182,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '观湖名邸一期',
              'status': 'in_progress',
              'constructionUnitName': '待定',
              'longitude': 117.020728,
              'latitude': 32.586509,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }, {
              'id': 184,
              'enterpriseId': 14,
              'companyName': '淮南市松凯运输有限公司',
              'projectName': '舜耕学府',
              'status': 'in_progress',
              'constructionUnitName': '淮矿地产淮南东方蓝海置业有限责任公司',
              'longitude': 117.041179,
              'latitude': 32.587308,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 0
            }
          ]
        }, {
          'areaName': '大通区',
          'transWorkTasks': [
            {
              'id': 101,
              'enterpriseId': 23,
              'companyName': '长丰县金岭运输有限公司淮南分公司',
              'projectName': '颐高智慧城',
              'status': 'in_progress',
              'constructionUnitName': '淮南颐新科技产业园有限公司',
              'longitude': 117.070863,
              'latitude': 32.665340,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 0
            }, {
              'id': 167,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '瀚城四期',
              'status': 'in_progress',
              'constructionUnitName': '待定',
              'longitude': 117.063674,
              'latitude': 32.638777,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }, {
              'id': 169,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '天泰花园',
              'status': 'in_progress',
              'constructionUnitName': '待定',
              'longitude': 117.062506,
              'latitude': 32.635106,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }, {
              'id': 170,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '北大学府',
              'status': 'in_progress',
              'constructionUnitName': '待定',
              'longitude': 117.080220,
              'latitude': 32.631433,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }, {
              'id': 172,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '惠民花园',
              'status': 'in_progress',
              'constructionUnitName': '待定',
              'longitude': 117.067098,
              'latitude': 32.579186,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }, {
              'id': 173,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '洞山东路综合地块改造项目',
              'status': 'in_progress',
              'constructionUnitName': '待定',
              'longitude': 117.077286,
              'latitude': 32.641585,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }, {
              'id': 185,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '测试',
              'status': 'in_progress',
              'constructionUnitName': '测试',
              'longitude': 117.074226,
              'latitude': 32.636226,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 0
            }
          ]
        }, {
          'areaName': '田家庵区',
          'transWorkTasks': [
            {
              'id': 110,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '览山名苑',
              'status': 'in_progress',
              'constructionUnitName': '待定',
              'longitude': 117.028340,
              'latitude': 32.630642,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }, {
              'id': 111,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '天凌尚书苑',
              'status': 'in_progress',
              'constructionUnitName': '待定',
              'longitude': 116.987437,
              'latitude': 32.635414,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }, {
              'id': 112,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '恒大御府',
              'status': 'in_progress',
              'constructionUnitName': '待定',
              'longitude': 117.016461,
              'latitude': 32.639873,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }, {
              'id': 113,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '龙泉广场',
              'status': 'in_progress',
              'constructionUnitName': '待定',
              'longitude': 116.988916,
              'latitude': 32.628160,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }, {
              'id': 114,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '天鹅湾',
              'status': 'in_progress',
              'constructionUnitName': '待定',
              'longitude': 117.014328,
              'latitude': 32.657937,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }, {
              'id': 117,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '淮河新城五期',
              'status': 'in_progress',
              'constructionUnitName': '待定',
              'longitude': 117.001602,
              'latitude': 32.660522,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }, {
              'id': 118,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '东方佳苑',
              'status': 'in_progress',
              'constructionUnitName': '待定',
              'longitude': 116.995907,
              'latitude': 32.624823,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }, {
              'id': 121,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '花鸟鱼市',
              'status': 'in_progress',
              'constructionUnitName': '待定',
              'longitude': 116.995686,
              'latitude': 32.651417,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }, {
              'id': 127,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '四宜城',
              'status': 'in_progress',
              'constructionUnitName': '待定',
              'longitude': 117.019025,
              'latitude': 32.634809,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }, {
              'id': 129,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '玉兰公馆',
              'status': 'in_progress',
              'constructionUnitName': '待定',
              'longitude': 116.990872,
              'latitude': 32.646021,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }, {
              'id': 132,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '玫瑰庄园',
              'status': 'in_progress',
              'constructionUnitName': '待定',
              'longitude': 116.995156,
              'latitude': 32.650167,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }, {
              'id': 133,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '东悦府',
              'status': 'in_progress',
              'constructionUnitName': '待定',
              'longitude': 117.045776,
              'latitude': 32.655533,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }, {
              'id': 134,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '青年网络科技创新基地',
              'status': 'in_progress',
              'constructionUnitName': '待定',
              'longitude': 116.980562,
              'latitude': 32.649898,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }, {
              'id': 135,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '书香名苑',
              'status': 'in_progress',
              'constructionUnitName': '待定',
              'longitude': 116.983988,
              'latitude': 32.632901,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }, {
              'id': 136,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '世茂观天下',
              'status': 'in_progress',
              'constructionUnitName': '待定',
              'longitude': 116.996020,
              'latitude': 32.628699,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }, {
              'id': 137,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '四宜新安居小区',
              'status': 'in_progress',
              'constructionUnitName': '待定',
              'longitude': 116.978115,
              'latitude': 32.640965,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }, {
              'id': 138,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '世茂公园项目',
              'status': 'in_progress',
              'constructionUnitName': '待定',
              'longitude': 117.013848,
              'latitude': 32.657954,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }, {
              'id': 139,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '龙泉苑',
              'status': 'in_progress',
              'constructionUnitName': '待定',
              'longitude': 117.008818,
              'latitude': 32.629844,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }, {
              'id': 140,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '四宜新景苑',
              'status': 'in_progress',
              'constructionUnitName': '待定',
              'longitude': 116.978679,
              'latitude': 32.626834,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }, {
              'id': 141,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '新华钟书院',
              'status': 'in_progress',
              'constructionUnitName': '待定',
              'longitude': 117.036496,
              'latitude': 32.636385,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }, {
              'id': 142,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '中丹新城学府',
              'status': 'in_progress',
              'constructionUnitName': '待定',
              'longitude': 117.013740,
              'latitude': 32.657969,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }, {
              'id': 143,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '朝阳医院',
              'status': 'in_progress',
              'constructionUnitName': '待定',
              'longitude': 117.031468,
              'latitude': 32.647118,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }
          ]
        }, {
          'areaName': '经济发区',
          'transWorkTasks': [
            {
              'id': 153,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '网云小镇一期',
              'status': 'in_progress',
              'constructionUnitName': '待定',
              'longitude': 117.074853,
              'latitude': 32.649580,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }, {
              'id': 155,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '网云小镇二期',
              'status': 'in_progress',
              'constructionUnitName': '待定',
              'longitude': 117.075983,
              'latitude': 32.648083,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }, {
              'id': 157,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '风华和悦',
              'status': 'in_progress',
              'constructionUnitName': '待定',
              'longitude': 117.103959,
              'latitude': 32.652595,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }, {
              'id': 159,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '富力地产',
              'status': 'in_progress',
              'constructionUnitName': '待定',
              'longitude': 117.080603,
              'latitude': 32.652864,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }, {
              'id': 160,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '富力城',
              'status': 'in_progress',
              'constructionUnitName': '待定',
              'longitude': 117.081066,
              'latitude': 32.651135,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }, {
              'id': 163,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '经开区绿色制造产业园',
              'status': 'in_progress',
              'constructionUnitName': '待定',
              'longitude': 117.104398,
              'latitude': 32.638673,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }
          ]
        }, {
          'areaName': '八公山区',
          'transWorkTasks': [
            {
              'id': 165,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '公园道一号',
              'status': 'in_progress',
              'constructionUnitName': '待定',
              'longitude': 116.844266,
              'latitude': 32.629331,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }
          ]
        }, {
          'areaName': '谢家集区',
          'transWorkTasks': [
            {
              'id': 175,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '西商农商城',
              'status': 'in_progress',
              'constructionUnitName': '待定',
              'longitude': 116.880162,
              'latitude': 32.573928,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }, {
              'id': 177,
              'enterpriseId': 1,
              'companyName': '合肥方科信息技术有限公司',
              'projectName': '国烨新城',
              'status': 'in_progress',
              'constructionUnitName': '待定',
              'longitude': 116.875126,
              'latitude': 32.599778,
              'transportingCarNum': 0,
              'totalTransCount': 0,
              'transportStatus': 1
            }
          ]
        }
      ],

      // 具体工地详情数据
      siteDetail: {
        id: 100,
        projectName: '淮南高新区产业园二期',
        projectBelongArea: 68,
        projectAddress: '安徽省淮南市田家庵区国槐路',
        projectAddressLatitude: 32.574011,
        projectAddressLongitude: 117.000126,
        constructionUnitName: '淮南市高新区开发投资有限公司',
        cUContactName: '王传扬',
        cUPhoneNum: '17309640292',
        implementUnitName: '中国建筑第四工程局有限公司',
        iUContactName: '牛春跃',
        iUPhoneNum: '18109642333',
        projectBuiltUpArea: 471117.000,
        wasteSoilAmount: 40000.000,
        wasteSoilType: 36,
        wSTransportType: 'external',
        status: 'in_progress',
        allowRoute: '产业园二期-国槐路-二通道-洛河大道-中电科八号院',
        belongAreaDesc: '山南新区',
        enterpriseName: '淮南市兴顺商贸有限公司',
        transNum: 127, // 运输趟次
        outSoilNum: 1524, // 出土量
        coordinates: [],
        carList: [
          { id: 1, carNum: '皖D35725', companyName: '淮南市兴顺商贸有限公司', transNum: 8, outSoilNum: 96, startDate: '2021-03-28', endDate: '2021-04-27', lat: '32.693', lng: '117.110216', gpsStatus: 'offline' },
          { id: 2, carNum: '皖D36738', companyName: '淮南市兴顺商贸有限公司', transNum: 11, outSoilNum: 132, startDate: '2021-03-28', endDate: '2021-04-27', lat: '32.533318', lng: '116.952328', gpsStatus: 'normal' },
          { id: 3, carNum: '皖D38397', companyName: '淮南市兴顺商贸有限公司', transNum: 0, outSoilNum: 0, startDate: '2021-03-28', endDate: '2021-04-27', lat: '32.689949999999996', lng: '117.09609599999999', gpsStatus: 'abnormal' },
          { id: 4, carNum: '皖D38006', companyName: '淮南市兴顺商贸有限公司', transNum: 9, outSoilNum: 108, startDate: '2021-03-28', endDate: '2021-04-27', lat: '32.591968', lng: '117.05399999999999', gpsStatus: 'park' },
          { id: 5, carNum: '皖D39362', companyName: '淮南市兴顺商贸有限公司', transNum: 10, outSoilNum: 120, startDate: '2021-03-28', endDate: '2021-04-27', lat: '32.684032', lng: '117.102752', gpsStatus: 'normal' },
          { id: 6, carNum: '皖D35545', companyName: '淮南市大马路汽车运输有限公司', transNum: 12, outSoilNum: 144, startDate: '2021-03-28', endDate: '2021-04-27', lat: '32.68945', lng: '117.095832', gpsStatus: 'normal' },
          { id: 7, carNum: '皖D39321', companyName: '淮南市大马路汽车运输有限公司', transNum: 15, outSoilNum: 180, startDate: '2021-03-28', endDate: '2021-04-27', lat: '32.67875', lng: '117.09197599999999', gpsStatus: 'offline' },
          { id: 8, carNum: '皖D39981', companyName: '淮南市大马路汽车运输有限公司', transNum: 0, outSoilNum: 0, startDate: '2021-03-28', endDate: '2021-04-27', lat: '32.6441', lng: '117.06943199999999', gpsStatus: 'normal' },
          { id: 9, carNum: '皖D37197', companyName: '淮南市大马路汽车运输有限公司', transNum: 10, outSoilNum: 120, startDate: '2021-03-28', endDate: '2021-04-27', lat: '32.645365999999996', lng: '116.97384799999999', gpsStatus: 'park' },
          { id: 10, carNum: '皖D38509', companyName: '淮南市贝乐运输有限公司', transNum: 12, outSoilNum: 144, startDate: '2021-03-28', endDate: '2021-04-27', lat: '32.632232', lng: '116.953184', gpsStatus: 'normal' },
          { id: 11, carNum: '皖D35260', companyName: '淮南市贝乐运输有限公司', transNum: 0, outSoilNum: 0, startDate: '2021-03-28', endDate: '2021-04-27', lat: '32.58025', lng: '116.981456', gpsStatus: 'normal' },
          { id: 12, carNum: '皖D35261', companyName: '淮南市贝乐运输有限公司', transNum: 13, outSoilNum: 156, startDate: '2021-03-28', endDate: '2021-04-27', lat: '32.579898', lng: '116.98164799999999', gpsStatus: 'abnormal' },
          { id: 13, carNum: '皖D35275', companyName: '淮南市贝乐运输有限公司', transNum: 12, outSoilNum: 144, startDate: '2021-03-28', endDate: '2021-04-27', lat: '32.5453', lng: '117.00712', gpsStatus: 'abnormal' },
          { id: 14, carNum: '皖D36721', companyName: '淮南市贝乐运输有限公司', transNum: 15, outSoilNum: 180, startDate: '2021-03-28', endDate: '2021-04-27', lat: '32.580183999999996', lng: '116.98164799999999', gpsStatus: 'normal' },
          { id: 15, carNum: '皖D36248', companyName: '淮南市贝乐运输有限公司', transNum: 0, outSoilNum: 0, startDate: '2021-03-28', endDate: '2021-04-27', lat: '32.545384', lng: '117.00707999999999', gpsStatus: 'park' }
        ]
      },
      // 对应消纳场信息
      absorbDetail: {
        id: 15,
        name: '中电科八号院灰塘',
        belongArea: 48,
        address: '安徽省淮南市田家庵区',
        longitude: 117.028465,
        latitude: 32.582914,
        wasteSoilTyp: 36,
        principal: '待定',
        contactWay: '待定',
        wasteSoilCapacity: 10000,
        floorArea: 10000,
        status: 'normal',
        belongAreaDesc: '田家庵区',
        wasteSoilTypeDesc: '土方渣土',
        enterpriseName: '待定企业',
        coordinates: [
          {
            longitude: 117.027850,
            latitude: 32.584527
          }, {
            longitude: 117.028002,
            latitude: 32.583751
          }, {
            longitude: 117.028964,
            latitude: 32.581887
          }, {
            longitude: 117.030877,
            latitude: 32.581880
          }, {
            longitude: 117.032045,
            latitude: 32.581826
          }, {
            longitude: 117.032054,
            latitude: 32.584595
          }
        ]
      },
      // 工地消纳场规划线路
      designRoute: [
        {
          lng: 117.000205,
          lat: 32.573741
        }, {
          lng: 116.999675,
          lat: 32.573649
        }, {
          lng: 116.999675,
          lat: 32.57562
        }, {
          lng: 117.017165,
          lat: 32.575696
        }, {
          lng: 117.017201,
          lat: 32.581826
        }, {
          lng: 117.021566,
          lat: 32.581781
        }, {
          lng: 117.021656,
          lat: 32.57565
        }, {
          lng: 117.032238,
          lat: 32.575635
        }, {
          lng: 117.032238,
          lat: 32.581644
        }, {
          lng: 117.028914,
          lat: 32.581644
        }, {
          lng: 117.02829,
          lat: 32.582834
        }, {
          lng: 117.028416,
          lat: 32.58288
        }
      ]

    }
  },
  watch: {

  },
  created() {
    this.treeData = this.list
    setTimeout(() => {
      // 延时执行初始化地图
      this.initMap()
    }, 500)
  },

  methods: {

    /* 工地详情盒子控制方法*/
    openSiteCard(page) {
      if (page == 'closed') {
        this.isShowButton = true
        this.isShowSite = false
      } else {
        this.activeBoxItem = page
        this.isShowButton = false
        this.isShowSite = true
      }
    },

    /* 左侧树结构，车辆检索方法*/
    searchCar() {
      if (this.searchText.trim().length > 7) {
        return this.$message.warning('您输入的车牌号码有误，请重新输入！')
      }
      var tempCarData = this.$selfJs.deepClone(this.list)
      tempCarData.forEach((item, index) => {
        var tempCarList = []
        item.carList.forEach((itemC, indexC) => {
          if (itemC.carNum.search(this.searchText.trim()) != -1) { tempCarList.push(itemC) }
        })
        item.carList = tempCarList
      })

      var tempCarListCheck = []
      // 如果该状态下企业车辆数据为空，则不显示该企业
      tempCarData.forEach((item, index) => {
        if (item.carList.length != 0) { tempCarListCheck.push(item) }
      })
      tempCarListCheck.length == 0 ? this.$message.warning('抱歉，未查询到该车辆！') : this.treeData = tempCarListCheck
    },

    /* 左侧树结构，查看指定行政区级信息 */
    readArea(row) {
      this.isShowButton = false
      this.isShowSite = false
      this.isShowTotal = true

      if (this.isAppointArea) {
        this.treeData = [row]
        this.isAppointArea = false
      } else {
        this.treeData = this.list
        this.isAppointArea = true
      }
      this.setMarker()
    },

    /* 左侧树结构，点击工地列表，查看具体工地信息 */
    readSite(objId, row) {
      this.isShowButton = true
      this.isShowSite = false
      this.isShowTotal = false
      // 重置工地数据（临时，应请求接口）
      this.siteDetail.projectName = row.projectName
      this.siteDetail.enterpriseName = row.companyName
      this.siteDetail.projectAddressLatitude = row.latitude
      this.siteDetail.projectAddressLongitude = row.longitude
      this.initDateSite()
    },

    /* 重新初始化地图标注信息*/
    initDateSite() {
      // 清除地图覆盖物
      this.map.clearOverlays()

      // 重新初始化中心及层级
      var point = new BMapGL.Point(this.siteDetail.projectAddressLongitude, this.siteDetail.projectAddressLatitude)
      this.map.centerAndZoom(point, 13)

      /* 工地信息*/
      // 创建工地标注
      var siteMarker = this.$bdMap.markerPoint(this.map,{
        lat:this.siteDetail.projectAddressLatitude,
        lng:this.siteDetail.projectAddressLongitude,
        icon:require('@/assets/point-site.png'),
      })
      // 创建工地信息窗体
      var sContent = `<p><label>地址：</label>` + this.siteDetail.projectAddress + `</p>
                        <p><label>承运单位：</label>` + this.siteDetail.enterpriseName + `</p>`
      var siteWindow = new BMapGL.InfoWindow(sContent, { title: this.siteDetail.projectName }) // 创建信息窗口对象
      siteMarker.addEventListener('click', function() {
        this.map.openInfoWindow(siteWindow, point) // 开启信息窗口
      })

      /* 消纳场信息*/
      // 创建消纳场标注
      if (this.siteDetail.wSTransportType == 'external') {
        var absorbPoint = new BMapGL.Point(this.absorbDetail.longitude, this.absorbDetail.latitude)
        var absorbIcon = new BMapGL.Icon(this.absorbImg, new BMapGL.Size(30, 36))
        var absorbMarker = new BMapGL.Marker(absorbPoint, { icon: absorbIcon })
        this.map.addOverlay(absorbMarker)
        // 创建消纳场信息窗体
        var aContent = `<p><label>地址：</label>` + this.absorbDetail.address + `</p>
                          <p><label>所属单位：</label>` + this.absorbDetail.enterpriseName + `</p>`
        var absorbWindow = new BMapGL.InfoWindow(aContent, { title: this.absorbDetail.name }) // 创建信息窗口对象
        absorbMarker.addEventListener('click', function() {
          this.map.openInfoWindow(absorbWindow, absorbPoint) // 开启信息窗口
        })
      }

      /* 规划线路信息*/
      this.$bdMap.markerPolyline(this.map, this.designRoute)

      /* 创建工地在运车辆标注 */
      this.siteDetail.carList.forEach((item, index) => {
        this.$bdMap.markerPoint(this.map,{
          width: 35,
          height: 31,
          lat:item.lat,
          lng:item.lng,
          icon:this.carImg[item.gpsStatus],
        })
      })
    },

    /* 初始化地图*/
    initMap() {
      this.map = new BMapGL.Map('allmap')
      var point = new BMapGL.Point(117.028161, 32.635982)
      this.map.centerAndZoom(point, 12) // 创建中心点坐标及地图层级
      this.map.enableScrollWheelZoom(true)
      this.map.setMapStyleV2({
        styleJson: this.mapStyle
      })
      this.setMarker()
    },

    /* 创建地图工地覆盖物 */
    setMarker() {
      // 清除地图覆盖物
      this.map.clearOverlays()
      // 重新初始化中心及层级
      var point = new BMapGL.Point(117.028161, 32.635982)
      this.map.centerAndZoom(point, 13)
      // 循环数据，创建标注
      this.treeData.forEach((item, index) => {
        item.transWorkTasks.forEach((itemS, indexS) => {
          // 创建Marker自定义标注图标
          this.$bdMap.markerPoint(this.map,{
            lat:itemS.latitude,
            lng:itemS.longitude,
            icon:require('@/assets/point-site.png'),
          })

        })
      })
    }

  }
}
</script>

<style lang="scss">
  .regulatory-site{
    width:100%;
    height: calc(100vh - 84px);
    overflow: hidden;

    /* 工地树结构列表*/
    .re-left {
      width: 350px;
      height: 100%;
      float: left;

      .el-card__body {
        height: 100%;
      }

      .re-search {
        margin: 10px 0 20px 0;
      }

      .re-box-tree {
        height: calc(100% - 66px) !important;
        overflow-y: auto;
        .el-collapse-item__header {
          span{
            color: #409EFF;
            margin-right: 5px;
            font-weight: 600;
          }
        }

        .site-list {
          overflow: hidden;
          padding-left: 20px;
          border-bottom: 1px dashed #EBEEF5;
          padding-bottom: 10px;

          p {
            margin: 0;
            height: 40px;
            line-height: 40px;
            color: #67C23A;
          }
          span {
            width: 100%;
            color: #909399;
            padding-left: 20px;
          }
        }
        .site-abnormal {
          p { color: #F56C6C; }
        }
        .site-over {
          p { color: #909399; }
        }
        .site-list:hover {
          cursor: pointer;
          background: rgba(64,158,255,0.1)
        }

        .el-collapse-item__header {
          .change-read {
            font-size: 12px;
            margin-left: 15px;
            color: rgba(198,226,255,0.9);
          }
        }
      }
    }

    /* 地图展示区*/
    .re-right {
      width: calc(100% - 350px);
      height: 100%;
      overflow: hidden;
      float: left;
      position: relative;

      /* 头部统计数据*/
      .box-card-total {
        width: 70%;
        position: absolute;
        left: 0;
        right:0;
        margin: 0 auto;
        margin-top: 20px;
        z-index: 10;
        background: rgba(255,255,255,0.8);

        .el-card__body {
          overflow: hidden;
          padding: 10px;
          .card-item {
            width: 33.33%;
            float: left;
            text-align: center;

            p {
              margin: 10px 0;
            }
            p:nth-child(1){
              font-size: 28px;
              color: #409EFF;
              font-weight: 600;
            }
            p:nth-child(2){
              font-size: 16px;
              color: #909399;
            }
          }
        }
      }

      /* 工地信息功能按钮*/
      .box-card-button{
        width: 80px;
        height: 98%;
        z-index: 10;
        position: absolute;
        right: 10px;
        margin: 1% 0;
        text-align: center;
        background: rgba(255,255,255,0.8);

        .info-icon {
          font-size: 24px;
          color: #409EFF;
          cursor: pointer;
          border: 1px solid #409EFF;
          border-radius: 50%;
          padding: 8px;
        }
        .card-item {
          margin-top: 30px;
          padding-bottom: 20px;
          border-bottom: 1px solid #DCDFE6;
          cursor: pointer;
          i {
            font-size: 18px;
          }
          p {
            color: #909399;
            font-size: 18px;
            font-weight: 600;
            margin: 10px 0;
          }
        }
        .card-item:nth-child(2){
          margin-top: 60px;
        }
        .card-item:last-child{
          border: none;
        }
      }

      /* 车辆详情展开抽屉盒子*/
      .box-card-site {
        width: 400px;
        height: 98%;
        z-index: 10;
        position: absolute;
        right: 10px;
        margin: 1% 0;
        background: rgba(255,255,255,0.8);
        text-align: center;

        .el-card__body{
          height: 100%;

          .site-icon {
            //color: #409EFF;
            color: #909399;
            padding: 10px;
            border: 1px solid #909399;
            border-radius: 50%;
          }

          .el-collapse {
            height: calc(100% - 30px);
            text-align: left;
            margin-top: 20px;
            overflow-y: auto;
            border-bottom: none;

            .el-collapse-item{

              .el-collapse-item__header {
                font-size: 14px;
                font-weight: 600;
                background: rgba(255,255,255,0);
              }

              .el-collapse-item__wrap {
                padding-left: 10px;
                background: rgba(255,255,255,0);

                .el-collapse-item__content {
                  .item-info {
                    padding: 10px 0;
                    label {
                      font-weight: 400;
                      color:#909399;
                    }
                    p {
                      color:#303133;
                      margin: 0 0 0 10px;
                      line-height:24px;
                      span {
                        color:#909399;
                      }
                    }
                  }
                  .soil-total {
                    overflow: hidden;
                    padding-bottom: 10px;
                    border-bottom: 1px solid #E4E7ED;
                    .soil-item {
                      width: 50%;
                      float: left;
                      text-align: center;
                      p {
                        font-size: 24px;
                        color: #409EFF;
                        margin: 0;
                        line-height: 40px;
                      }
                      label {
                        color: #909399;
                        font-weight: 400;
                      }
                    }
                  }
                  .itme-tc {
                    overflow: hidden;
                    padding: 10px 0;
                    border-bottom:1px dashed #EBEEF5;

                    div {
                      overflow: hidden;
                      p {
                        color: #606266;
                        float: left;
                        margin: 0;
                        overflow: hidden;
                        height: 25px;
                        line-height: 25px;
                        i {
                          margin-right:5px;
                          font-size: 14px;
                        }
                      }
                      p:nth-child(1) {
                        width: 40%;
                        font-size: 14px;
                      }
                      p:nth-child(2) {
                        width: 60%;
                      }
                    }
                    div:nth-child(1) {
                      p:nth-child(1) {
                        font-weight: 600;
                        i {
                          font-weight: 400;
                        }
                      }
                      p:nth-child(2) {
                        text-align:right;
                      }
                    }
                  }
                  .itme-tc:last-child {
                    border: none;
                  }
                  .item-tc-three {
                    div:nth-child(2) {
                      p {
                        width: 33.33%
                      }
                    }
                  }
                  .item-all {
                    div:nth-child(2) {
                      p {
                        width: 100%;
                      }
                    }
                  }

                }
              }
            }

          }
        }
      }
    }
  }

</style>
