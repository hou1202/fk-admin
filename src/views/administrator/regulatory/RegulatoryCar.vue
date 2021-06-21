<template>

  <div class="regulatory">
    <!-- 车辆树结构列表-->
    <el-card class="re-left">
      <div class="re-icon-classify">
        <div class="icon-classify-item" @click="screenCars('all')">
          <i />
          <p>全部<span>{{ carTotalDate.normal+carTotalDate.park+carTotalDate.offline + carTotalDate.abnormal }}</span></p>
        </div>
        <div class="icon-classify-item" @click="screenCars('normal')">
          <i />
          <p>正常<span>{{ carTotalDate.normal }}</span></p>
        </div>
        <div class="icon-classify-item" @click="screenCars('park')">
          <i />
          <p>停车<span>{{ carTotalDate.park }}</span></p>
        </div>
        <div class="icon-classify-item" @click="screenCars('offline')">
          <i />
          <p>离线<span>{{ carTotalDate.offline }}</span></p>
        </div>
        <div class="icon-classify-item" @click="screenCars('abnormal')">
          <i />
          <p>异常<span>{{ carTotalDate.abnormal }}</span></p>
        </div>

      </div>
      <div class="re-search">
        <el-input
          v-model="searchText"
          placeholder="输入车牌号码进行搜索"
        >
          <el-button slot="append" icon="el-icon-search" @click="searchCar" />
        </el-input>
      </div>
      <div class="re-box-tree">
        <el-collapse accordion>
          <template v-for="(item, index) in carData">
            <el-collapse-item :name="index">
              <template slot="title">
                <span>[ {{ item.carList.length }} ]</span> {{ item.companyName }} <i class="change-read iconfont icon-zt-chakan" @click="readCompany(item)" />
              </template>
              <!-- 车辆列表-->
              <div
                v-for="(itemc, indexc) in item.carList"
                :class="[
                  'car-list',
                  itemc.gpsStatus == 'park'
                    ? 'car-park'
                    : itemc.gpsStatus == 'offline'
                      ? 'car-offline'
                      : itemc.gpsStatus == 'abnormal'
                        ? 'car-abnormal'
                        : 'car-normal'
                ]"
                @click="readCar(item.id,itemc)"
              >
                <i />
                <p>{{ itemc.carNum }}</p>
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
          <p>今日在运车辆数</p>
        </div>
        <div class="card-item">
          <p>100</p>
          <p>今日报警数</p>
        </div>
        <div class="card-item">
          <p>100</p>
          <p>今日运输趟次</p>
        </div>
      </el-card>

      <!-- 具体车辆信息-->
      <el-card v-if="isShowCar" class="box-card-button">
        <i class="iconfont icon-zt-gengduo info-icon" @click="openCarDrawer('baseInfo')" />

        <div class="card-item" @click="openCarDrawer('alarmInfo')">
          <i class="iconfont icon-zt-bojin" />
          <p>0</p>
        </div>
        <div class="card-item" @click="openCarDrawer('taskInfo')">
          <i class="iconfont icon-zt-renwu" />
          <p>2</p>
        </div>
        <div class="card-item" @click="openCarDrawer('baseInfo')">
          <i class="iconfont icon-zt-daohang" />
          <p>在线</p>
        </div>
        <i class="iconfont icon-zt-riqi date-icon" @click="showDateCard" />
      </el-card>

      <!-- 车辆信息展开抽屉盒子-->
      <el-drawer
        :title="carDetail.carNum"
        class="drawer-box-car"
        :modal="false"
        :show-close="true"
        :visible.sync="showCarDrawer"
      >
        <el-collapse v-model="activeCarInfo" accordion>
          <el-collapse-item title="基本信息" name="baseInfo" class="is-active">
            <div class="item-info">
              <label>车牌号码</label>
              <p>{{ carDetail.carNum }}</p>
            </div>
            <div class="item-info">
              <label>所属单位</label>
              <p>{{ carDetail.companyName }}</p>
            </div>
            <div class="item-info">
              <label>联系方式</label>
              <p>{{ carDetail.mainContactPersonPhoneNum }}</p>
            </div>
            <div class="item-info">
              <label>车主名称</label>
              <p>{{ carDetail.ownerName }}</p>
            </div>
            <div class="item-info">
              <label>联系方式</label>
              <p>{{ carDetail.phoneNum }}</p>
            </div>
            <div class="item-info">
              <label>车辆状态</label>
              <p>{{ $selfJs.getTextVal('carStatus',carDetail.status) }}</p>
            </div>
            <div class="item-info">
              <label>北斗是否在线</label>
              <p>{{ carDetail.gpsOnline }}</p>
            </div>
            <div class="item-info">
              <label>最后上线时间</label>
              <p>{{ carDetail.sendTime }}</p>
            </div>
          </el-collapse-item>
          <el-collapse-item title="报警信息" name="alarmInfo">
            <div v-if="!carDetail.alarmInfo || carDetail.alarmInfo.length == 0" class="item-info">
              <label>~ 暂无报警信息 ~</label>
            </div>
            <div v-for="(item, index) in carDetail.alarmInfo" v-else class="item-info">
              <label class="color-yellow">{{ $selfJs.getTextVal('alarmType', item.type) }}</label>
              <p>[ {{ item.createDate }} ] {{ item.address }}</p>
            </div>
          </el-collapse-item>
          <el-collapse-item title="在运信息" name="taskInfo">
            <div v-if="!carDetail.taskInfo || carDetail.taskInfo.length == 0" class="item-info">
              <label>~ 暂无在运信息 ~</label>
            </div>
            <div v-for="(item, index) in carDetail.taskInfo" v-else class="item-info item-big">
              <label>{{ item.siteName }}</label>
              <p><span>运输类型：</span>{{ $selfJs.getTextVal('tranType', item.tranType) }}</p>
              <p v-if="item.tranType == 'external'"><span>消纳场名称：</span>{{ item.absorName }}</p>
              <p><span>承运单位：</span>{{ item.tranCompany }}</p>
              <p><span>准运证日期：</span>{{ item.startDate }} 至 {{ item.endDate }}</p>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-drawer>

      <!-- 日期时间轨迹查询-->
      <div v-if="isShowDate" class="box-card-date">
        <el-card>
          <div>
            <el-date-picker
              v-model="searchDate.date"
              :clearable="false"
              type="date"
              width="320px"
              :default-time="new Date()"
              placeholder="选择日期"
              @change="changeDate()"
            />
            <el-time-picker
              v-model="searchDate.time"
              is-range
              range-separator="至"
              value-format="HH:mm:ss"
              start-placeholder="请选择开始时间"
              end-placeholder="请选择结束时间"
              placeholder="选择时间范围"
              @change="changeTime()"
            />
            <el-button @click="searchCarPath">查询</el-button>
          </div>
          <div class="block">
            <el-slider
              v-model="sliderValue"
              range
              :max="24"
              :min="0"
              :step="0.5"
              :marks="timeMark"
              @change="changeSlider"
            />
          </div>
        </el-card>

      </div>

      <!-- 地图加载-->
      <div id="allmap" style="width:100%;height:100%" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'RegulatoryCar',
  data() {
    return {
      map: null,
      isShowTotal: true, // 总统计数据卡片
      isShowCar: false, // 车辆信息功能按钮区卡片
      showCarDrawer: false, // 车辆信息详情卡片
      isShowDate: false, // 时间检索查车卡片
      activeCarInfo: 'baseInfo', // 车辆详情折叠面板控制键
      mapStyle: require('@/assets/map-json/base_map_config.json'),
      searchText: '', // 检索查车内容
      searchDate: {
        date: new Date(),
        time: ['00:00:00', '23:59:59']
      },
      carTotalDate: {
        normal: 0,
        park: 0,
        offline: 0,
        abnormal: 0
      },
      sliderValue: [0, 24],
      timeMark: {
        0: '00:00',
        0.5: '',
        1: '1:00',
        1.5: '',
        2: '2:00',
        2.5: '',
        3: '3:00',
        3.5: '',
        4: '4:00',
        4.5: '',
        5: '5:00',
        5.5: '',
        6: '6:00',
        6.5: '',
        7: '7:00',
        7.5: '',
        8: '8:00',
        8.5: '',
        9: '9:00',
        9.5: '',
        10: '10:00',
        10.5: '',
        11: '11:00',
        11.5: '',
        12: {
          style: {
            color: '#1989FA'
          },
          label: this.$createElement('strong', '12:00')
        },
        12.5: '',
        13: '13:00',
        13.5: '',
        14: '14:00',
        14.5: '',
        15: '15:00',
        15.5: '',
        16: '16:00',
        16.5: '',
        17: '17:00',
        17.5: '',
        18: '18:00',
        18.5: '',
        19: '19:00',
        19.5: '',
        20: '20:00',
        20.5: '',
        21: '21:00',
        21.5: '',
        22: '22:00',
        22.5: '',
        23: '23:00',
        23.5: '',
        24: '24:00'
      },
      carImg: {
        normal: require('@/assets/car-normal-small.png'),
        park: require('@/assets/car-park-small.png'),
        offline: require('@/assets/car-offline-small.png'),
        abnormal: require('@/assets/car-abnormal-small.png')
      },
      startImg: require('@/assets/point-start.png'),
      endImg: require('@/assets/ponit-end.png'),
      carData: [],
      // 公司及车辆树结构数据
      list: [
        { id: 1, companyName: '淮南市兴顺商贸有限公司', carList: [
          { id: 1, carNum: '皖D35725', lat: '32.693', lng: '117.110216', gpsStatus: 'offline' },
          { id: 2, carNum: '皖D36738', lat: '32.533318', lng: '116.952328', gpsStatus: 'normal' },
          { id: 3, carNum: '皖D38397', lat: '32.689949999999996', lng: '117.09609599999999', gpsStatus: 'abnormal' },
          { id: 4, carNum: '皖D38006', lat: '32.591968', lng: '117.05399999999999', gpsStatus: 'park' },
          { id: 5, carNum: '皖D39362', lat: '32.684032', lng: '117.102752', gpsStatus: 'normal' }
        ]
        },
        { id: 2, companyName: '淮南市贝乐运输有限公司', carList: [
          { id: 6, carNum: '皖D35545', lat: '32.68945', lng: '117.095832', gpsStatus: 'normal' },
          { id: 7, carNum: '皖D39321', lat: '32.67875', lng: '117.09197599999999', gpsStatus: 'offline' },
          { id: 8, carNum: '皖D39981', lat: '32.6441', lng: '117.06943199999999', gpsStatus: 'normal' },
          { id: 9, carNum: '皖D37197', lat: '32.645365999999996', lng: '116.97384799999999', gpsStatus: 'park' },
          { id: 10, carNum: '皖D38509', lat: '32.632232', lng: '116.953184', gpsStatus: 'normal' }

        ]
        },
        { id: 3, companyName: '淮南市大马路汽车运输有限公司', carList: [
          { id: 11, carNum: '皖D35260', lat: '32.58025', lng: '116.981456', gpsStatus: 'normal' },
          { id: 12, carNum: '皖D35261', lat: '32.579898', lng: '116.98164799999999', gpsStatus: 'abnormal' },
          { id: 13, carNum: '皖D35275 ', lat: '32.5453', lng: '117.00712', gpsStatus: 'abnormal' },
          { id: 14, carNum: '皖D36721', lat: '32.580183999999996', lng: '116.98164799999999', gpsStatus: 'normal' },
          { id: 15, carNum: '皖D36248', lat: '32.545384', lng: '117.00707999999999', gpsStatus: 'park' }
        ]
        },
        { id: 4, companyName: '淮南市红帆汽车运输有限公司', carList: [
          { id: 16, carNum: '皖D38581', lat: '32.64275', lng: '116.97052', gpsStatus: 'normal' },
          { id: 17, carNum: '皖D39657', lat: '32.588482', lng: '116.97893599999999', gpsStatus: 'normal' },
          { id: 18, carNum: '皖D37209', lat: '32.635766', lng: '116.961064', gpsStatus: 'normal' },
          { id: 19, carNum: '皖D60898', lat: '32.622451999999996', lng: '116.930872', gpsStatus: 'offline' },
          { id: 20, carNum: '皖D60859', lat: '32.632232', lng: '117.07567999999999', gpsStatus: 'normal' },
          { id: 21, carNum: '皖D35078', lat: '32.593102', lng: '116.98307199999999', gpsStatus: 'park' }
        ]
        },
        { id: 5, companyName: '淮南德祥汽车运输有限公司', carList: [
          { id: 22, carNum: '皖D51788', lat: '32.545116', lng: '117.00713599999999', gpsStatus: 'normal' },
          { id: 23, carNum: '皖D35361', lat: '32.599498', lng: '116.97481599999999', gpsStatus: 'normal' },
          { id: 24, carNum: '皖D35329', lat: '32.589768', lng: '116.98379999999999', gpsStatus: 'normal' },
          { id: 25, carNum: '皖D53952', lat: '32.577866', lng: '116.98193599999999', gpsStatus: 'normal' },
          { id: 26, carNum: '皖D38712', lat: '32.5789', lng: '116.98176799999999', gpsStatus: 'normal' }
        ]
        },
        { id: 6, companyName: '淮南市聚鼎运输有限公司', carList: [
          { id: 27, carNum: '皖D38371', lat: '32.601452', lng: '116.973016', gpsStatus: 'offline' },
          { id: 28, carNum: '皖D51398', lat: '32.583934', lng: '116.977184', gpsStatus: 'offline' },
          { id: 29, carNum: '皖D38345', lat: '32.597415999999996', lng: '116.96972', gpsStatus: 'offline' },
          { id: 30, carNum: '皖D52180', lat: '32.578934', lng: '116.97910399999999', gpsStatus: 'offline' },
          { id: 31, carNum: '皖D51911', lat: '32.578682', lng: '116.981752', gpsStatus: 'offline' },
          { id: 32, carNum: '皖D61205', lat: '32.577934', lng: '116.981968', gpsStatus: 'offline' }
        ]
        },
        { id: 7, companyName: '长丰县金岭运输有限公司淮南分公司', carList: [
          { id: 33, carNum: '皖D38138', lat: '32.578967999999996', lng: '116.98776799999999', gpsStatus: 'park' },
          { id: 34, carNum: '皖D38085', lat: '32.574452', lng: '116.99087999999999', gpsStatus: 'park' },
          { id: 35, carNum: '皖D50648 ', lat: '32.625766', lng: '116.846312', gpsStatus: 'park' }
        ]
        },
        { id: 8, companyName: '淮南金科再生资源利用有限公司', carList: [
          { id: 36, carNum: '皖D39400', lat: '32.643451999999996', lng: '117.069688', gpsStatus: 'abnormal' },
          { id: 37, carNum: '皖D38557', lat: '32.645416', lng: '116.9740559999999', gpsStatus: 'abnormal' },
          { id: 38, carNum: '皖D39935', lat: '32.673984', lng: '117.08107199999999', gpsStatus: 'abnormal' }
        ]
        }
      ],
      // 车辆轨迹数据
      trajectory: [
        {
          'lng': '117.14792936729226',
          'lat': '32.492032275995854',
          'direction': 103
        },
        {
          'lng': '117.15351790940024',
          'lat': '32.49019457750481',
          'direction': 177
        },
        {
          'lng': '117.15359994589218',
          'lat': '32.484992682192086',
          'direction': 180
        },
        {
          'lng': '117.15338367457535',
          'lat': '32.483878912898874',
          'direction': 266
        },
        {
          'lng': '117.15308656097869',
          'lat': '32.48390072314353',
          'direction': 338
        },
        {
          'lng': '117.15308656097869',
          'lat': '32.48390072314353',
          'direction': 161
        },
        {
          'lng': '117.15308656097869',
          'lat': '32.48390072314353',
          'direction': 325
        },
        {
          'lng': '117.15308656097869',
          'lat': '32.48390072314353',
          'direction': 89
        },
        {
          'lng': '117.15308656097869',
          'lat': '32.48390072314353',
          'direction': 191
        },
        {
          'lng': '117.15279746174959',
          'lat': '32.483956360524594',
          'direction': 249
        },
        {
          'lng': '117.15279746174959',
          'lat': '32.483956360524594',
          'direction': 36
        },
        {
          'lng': '117.15279746174959',
          'lat': '32.483956360524594',
          'direction': 225
        },
        {
          'lng': '117.15279746174959',
          'lat': '32.483956360524594',
          'direction': 36
        },
        {
          'lng': '117.15279746174959',
          'lat': '32.483956360524594',
          'direction': 90
        },
        {
          'lng': '117.1518739537565',
          'lat': '32.48415624845712',
          'direction': 266
        },
        {
          'lng': '117.1519784123102',
          'lat': '32.484006234829955',
          'direction': 187
        },
        {
          'lng': '117.1519784123102',
          'lat': '32.484006234829955',
          'direction': 356
        },
        {
          'lng': '117.1519784123102',
          'lat': '32.484006234829955',
          'direction': 209
        },
        {
          'lng': '117.1519784123102',
          'lat': '32.484006234829955',
          'direction': 188
        },
        {
          'lng': '117.1519784123102',
          'lat': '32.484006234829955',
          'direction': 303
        },
        {
          'lng': '117.1519784123102',
          'lat': '32.484006234829955',
          'direction': 118
        },
        {
          'lng': '117.1519784123102',
          'lat': '32.484006234829955',
          'direction': 169
        },
        {
          'lng': '117.1519784123102',
          'lat': '32.484006234829955',
          'direction': 170
        },
        {
          'lng': '117.1519784123102',
          'lat': '32.484006234829955',
          'direction': 52
        },
        {
          'lng': '117.1519784123102',
          'lat': '32.484006234829955',
          'direction': 26
        },
        {
          'lng': '117.1519784123102',
          'lat': '32.484006234829955',
          'direction': 183
        },
        {
          'lng': '117.1519784123102',
          'lat': '32.484006234829955',
          'direction': 0
        },
        {
          'lng': '117.15172997753194',
          'lat': '32.48308102329852',
          'direction': 180
        },
        {
          'lng': '117.15172997753194',
          'lat': '32.48308102329852',
          'direction': 54
        },
        {
          'lng': '117.15172997753194',
          'lat': '32.48308102329852',
          'direction': 24
        },
        {
          'lng': '117.15172997753194',
          'lat': '32.48308102329852',
          'direction': 181
        },
        {
          'lng': '117.15172997753194',
          'lat': '32.48308102329852',
          'direction': 179
        },
        {
          'lng': '117.15256473153991',
          'lat': '32.483696886607035',
          'direction': 3
        },
        {
          'lng': '117.15259668291353',
          'lat': '32.48402826573174',
          'direction': 1
        },
        {
          'lng': '117.15259668291353',
          'lat': '32.48402826573174',
          'direction': 280
        },
        {
          'lng': '117.15259668291353',
          'lat': '32.48402826573174',
          'direction': 136
        },
        {
          'lng': '117.1523637458687',
          'lat': '32.484182785863034',
          'direction': 250
        },
        {
          'lng': '117.1523637458687',
          'lat': '32.484182785863034',
          'direction': 311
        },
        {
          'lng': '117.1523637458687',
          'lat': '32.484182785863034',
          'direction': 316
        },
        {
          'lng': '117.1523637458687',
          'lat': '32.484182785863034',
          'direction': 140
        },
        {
          'lng': '117.1523637458687',
          'lat': '32.484182785863034',
          'direction': 44
        },
        {
          'lng': '117.1523637458687',
          'lat': '32.484182785863034',
          'direction': 195
        },
        {
          'lng': '117.1523637458687',
          'lat': '32.484182785863034',
          'direction': 119
        },
        {
          'lng': '117.1523637458687',
          'lat': '32.484182785863034',
          'direction': 149
        },
        {
          'lng': '117.1523637458687',
          'lat': '32.484182785863034',
          'direction': 261
        },
        {
          'lng': '117.1523637458687',
          'lat': '32.484182785863034',
          'direction': 221
        },
        {
          'lng': '117.1523637458687',
          'lat': '32.484182785863034',
          'direction': 236
        },
        {
          'lng': '117.1525325869189',
          'lat': '32.48374751066842',
          'direction': 177
        },
        {
          'lng': '117.1525325869189',
          'lat': '32.48374751066842',
          'direction': 354
        },
        {
          'lng': '117.1525325869189',
          'lat': '32.48374751066842',
          'direction': 339
        },
        {
          'lng': '117.1520987737369',
          'lat': '32.48417191214211',
          'direction': 330
        },
        {
          'lng': '117.15194626885928',
          'lat': '32.48405685471606',
          'direction': 149
        },
        {
          'lng': '117.15194626885928',
          'lat': '32.48405685471606',
          'direction': 146
        },
        {
          'lng': '117.15208277281276',
          'lat': '32.484054220848094',
          'direction': 232
        },
        {
          'lng': '117.15208277281276',
          'lat': '32.484054220848094',
          'direction': 0
        },
        {
          'lng': '117.15236409944767',
          'lat': '32.48348477975514',
          'direction': 21
        },
        {
          'lng': '117.15239618509327',
          'lat': '32.48354815755739',
          'direction': 148
        },
        {
          'lng': '117.15239618509327',
          'lat': '32.48354815755739',
          'direction': 44
        },
        {
          'lng': '117.15203455324277',
          'lat': '32.48413915198642',
          'direction': 305
        },
        {
          'lng': '117.15191423252949',
          'lat': '32.483893472061695',
          'direction': 33
        },
        {
          'lng': '117.15191423252949',
          'lat': '32.483893472061695',
          'direction': 144
        },
        {
          'lng': '117.15179378144161',
          'lat': '32.483909791399505',
          'direction': 30
        },
        {
          'lng': '117.15179378144161',
          'lat': '32.483909791399505',
          'direction': 268
        },
        {
          'lng': '117.15179378144161',
          'lat': '32.483909791399505',
          'direction': 137
        },
        {
          'lng': '117.15179378144161',
          'lat': '32.483909791399505',
          'direction': 309
        },
        {
          'lng': '117.15179378144161',
          'lat': '32.483909791399505',
          'direction': 259
        },
        {
          'lng': '117.15179378144161',
          'lat': '32.483909791399505',
          'direction': 274
        },
        {
          'lng': '117.15183443462806',
          'lat': '32.48294501550218',
          'direction': 302
        },
        {
          'lng': '117.1524122093969',
          'lat': '32.48361584659538',
          'direction': 38
        },
        {
          'lng': '117.1520024178938',
          'lat': '32.48417377219193',
          'direction': 226
        },
        {
          'lng': '117.1519783704936',
          'lat': '32.48409023579395',
          'direction': 233
        },
        {
          'lng': '117.1519783704936',
          'lat': '32.48409023579395',
          'direction': 298
        },
        {
          'lng': '117.15196238510661',
          'lat': '32.483942543851356',
          'direction': 306
        },
        {
          'lng': '117.15196238510661',
          'lat': '32.483942543851356',
          'direction': 0
        },
        {
          'lng': '117.15239609140347',
          'lat': '32.48373015868731',
          'direction': 345
        },
        {
          'lng': '117.15239609140347',
          'lat': '32.48373015868731',
          'direction': 203
        },
        {
          'lng': '117.15239609140347',
          'lat': '32.48373015868731',
          'direction': 21
        },
        {
          'lng': '117.15239609140347',
          'lat': '32.48373015868731',
          'direction': 338
        },
        {
          'lng': '117.15239609140347',
          'lat': '32.48373015868731',
          'direction': 356
        },
        {
          'lng': '117.15239609140347',
          'lat': '32.48373015868731',
          'direction': 185
        },
        {
          'lng': '117.15239609140347',
          'lat': '32.48373015868731',
          'direction': 208
        },
        {
          'lng': '117.15239609140347',
          'lat': '32.48373015868731',
          'direction': 184
        },
        {
          'lng': '117.15239609140347',
          'lat': '32.48373015868731',
          'direction': 195
        },
        {
          'lng': '117.15239609140347',
          'lat': '32.48373015868731',
          'direction': 192
        },
        {
          'lng': '117.15239609140347',
          'lat': '32.48373015868731',
          'direction': 198
        },
        {
          'lng': '117.15239609140347',
          'lat': '32.48373015868731',
          'direction': 207
        },
        {
          'lng': '117.15239609140347',
          'lat': '32.48373015868731',
          'direction': 209
        },
        {
          'lng': '117.15239609140347',
          'lat': '32.48373015868731',
          'direction': 196
        },
        {
          'lng': '117.15239609140347',
          'lat': '32.48373015868731',
          'direction': 190
        },
        {
          'lng': '117.15239609140347',
          'lat': '32.48373015868731',
          'direction': 197
        },
        {
          'lng': '117.15239609140347',
          'lat': '32.48373015868731',
          'direction': 197
        },
        {
          'lng': '117.15239609140347',
          'lat': '32.48373015868731',
          'direction': 197
        },
        {
          'lng': '117.15239609140347',
          'lat': '32.48373015868731',
          'direction': 206
        },
        {
          'lng': '117.15239609140347',
          'lat': '32.48373015868731',
          'direction': 202
        },
        {
          'lng': '117.15239609140347',
          'lat': '32.48373015868731',
          'direction': 196
        },
        {
          'lng': '117.15239609140347',
          'lat': '32.48373015868731',
          'direction': 15
        },
        {
          'lng': '117.1533194424771',
          'lat': '32.48386617036619',
          'direction': 79
        },
        {
          'lng': '117.15368829057553',
          'lat': '32.484956947745005',
          'direction': 359
        },
        {
          'lng': '117.15353395605078',
          'lat': '32.490258269053776',
          'direction': 2
        },
        {
          'lng': '117.15285932111698',
          'lat': '32.49093952570372',
          'direction': 285
        },
        {
          'lng': '117.1490613610744',
          'lat': '32.49179371464604',
          'direction': 284
        },
        {
          'lng': '117.14046643914229',
          'lat': '32.49403500422534',
          'direction': 287
        },
        {
          'lng': '117.13541575745066',
          'lat': '32.4954091473825',
          'direction': 286
        },
        {
          'lng': '117.1314028198107',
          'lat': '32.49637344975944',
          'direction': 283
        },
        {
          'lng': '117.123259572701',
          'lat': '32.498188858709355',
          'direction': 286
        },
        {
          'lng': '117.11986401136713',
          'lat': '32.49802080818387',
          'direction': 257
        },
        {
          'lng': '117.11525763721379',
          'lat': '32.49715423052126',
          'direction': 258
        },
        {
          'lng': '117.10484379536581',
          'lat': '32.49710849943064',
          'direction': 272
        },
        {
          'lng': '117.09997485770565',
          'lat': '32.49702133302108',
          'direction': 271
        },
        {
          'lng': '117.09488269322074',
          'lat': '32.49720667470753',
          'direction': 272
        },
        {
          'lng': '117.09226099068431',
          'lat': '32.500275561874226',
          'direction': 6
        },
        {
          'lng': '117.09230242655502',
          'lat': '32.50402741669744',
          'direction': 356
        },
        {
          'lng': '117.09180251592981',
          'lat': '32.507901328537095',
          'direction': 355
        },
        {
          'lng': '117.090605524604',
          'lat': '32.516100390086635',
          'direction': 354
        },
        {
          'lng': '117.08997970133943',
          'lat': '32.520126741757636',
          'direction': 357
        },
        {
          'lng': '117.08991243867274',
          'lat': '32.524277529881395',
          'direction': 4
        },
        {
          'lng': '117.08892449454154',
          'lat': '32.532461664596006',
          'direction': 342
        },
        {
          'lng': '117.08710142267971',
          'lat': '32.536031203966644',
          'direction': 339
        },
        {
          'lng': '117.08540918414036',
          'lat': '32.53538425800559',
          'direction': 223
        },
        {
          'lng': '117.07925978760511',
          'lat': '32.527707716499805',
          'direction': 213
        },
        {
          'lng': '117.07653687385249',
          'lat': '32.52354167350407',
          'direction': 198
        },
        {
          'lng': '117.07588370779696',
          'lat': '32.51864847091852',
          'direction': 180
        },
        {
          'lng': '117.07465856335237',
          'lat': '32.50871432223898',
          'direction': 197
        },
        {
          'lng': '117.07271062880812',
          'lat': '32.50436458042',
          'direction': 203
        },
        {
          'lng': '117.07061828083934',
          'lat': '32.50019765482018',
          'direction': 203
        },
        {
          'lng': '117.0680844281969',
          'lat': '32.49195272122677',
          'direction': 183
        },
        {
          'lng': '117.06791648551393',
          'lat': '32.489217868141075',
          'direction': 186
        },
        {
          'lng': '117.06778073858626',
          'lat': '32.48718329118155',
          'direction': 183
        },
        {
          'lng': '117.06196245032437',
          'lat': '32.48476730168447',
          'direction': 251
        },
        {
          'lng': '117.0586835313735',
          'lat': '32.48387966846667',
          'direction': 255
        },
        {
          'lng': '117.05557788086578',
          'lat': '32.484597759928164',
          'direction': 291
        },
        {
          'lng': '117.05072868777702',
          'lat': '32.48794372872557',
          'direction': 312
        },
        {
          'lng': '117.04772974307866',
          'lat': '32.4905657591097',
          'direction': 320
        },
        {
          'lng': '117.04547158801691',
          'lat': '32.49296003290582',
          'direction': 324
        },
        {
          'lng': '117.0402440878746',
          'lat': '32.49883755523462',
          'direction': 329
        },
        {
          'lng': '117.03703305033667',
          'lat': '32.502454075796734',
          'direction': 302
        },
        {
          'lng': '117.03281245730547',
          'lat': '32.504503687101504',
          'direction': 304
        },
        {
          'lng': '117.02506928653416',
          'lat': '32.51012932003777',
          'direction': 317
        },
        {
          'lng': '117.02223282764749',
          'lat': '32.512980826832134',
          'direction': 322
        },
        {
          'lng': '117.01929400304375',
          'lat': '32.51662641390591',
          'direction': 329
        },
        {
          'lng': '117.01555494940725',
          'lat': '32.52305765225235',
          'direction': 347
        },
        {
          'lng': '117.01536206832552',
          'lat': '32.52339085453495',
          'direction': 336
        },
        {
          'lng': '117.01374809110887',
          'lat': '32.527116147979214',
          'direction': 342
        },
        {
          'lng': '117.01092502965297',
          'lat': '32.535629775531305',
          'direction': 347
        },
        {
          'lng': '117.00971428308245',
          'lat': '32.53939845198077',
          'direction': 339
        },
        {
          'lng': '117.0085593978826',
          'lat': '32.542733492088026',
          'direction': 346
        },
        {
          'lng': '117.01659754684165',
          'lat': '32.5430075398322',
          'direction': 102
        },
        {
          'lng': '117.01707278845142',
          'lat': '32.543058479931446',
          'direction': 66
        },
        {
          'lng': '117.01726020115535',
          'lat': '32.54627457975313',
          'direction': 1
        },
        {
          'lng': '117.01872011185031',
          'lat': '32.54958103695949',
          'direction': 76
        },
        {
          'lng': '117.01901017717678',
          'lat': '32.549546676074925',
          'direction': 320
        },
        {
          'lng': '117.01901017717678',
          'lat': '32.549546676074925',
          'direction': 58
        },
        {
          'lng': '117.01901017717678',
          'lat': '32.549546676074925',
          'direction': 262
        },
        {
          'lng': '117.01901017717678',
          'lat': '32.549546676074925',
          'direction': 312
        },
        {
          'lng': '117.01901017717678',
          'lat': '32.549546676074925',
          'direction': 3
        }
      ],
      // 具体车辆详情数据
      carDetail: {
        id: 1,
        carNum: '皖D39362',
        companyName: '淮南市兴顺商贸有限公司',
        mainContactPersonName: '周则义',
        mainContactPersonPhoneNum: '13905547177',
        ownerName: '兴顺',
        phoneNum: '15621021254',
        status: 'forbid',
        taskCount: 0,
        sendTime: '2021-04-22 18:14:50',
        gpsOnline: '在线',
        alarmInfo: [
          { id: 1, type: 'speed', address: '安徽省淮南市大通区玉兰大道辅路淮南市保莲畜牧有限公司东93米', createDate: '2021-04-22 18:14:50' },
          { id: 2, type: 'offset', address: '安徽省淮南市大通区民惠街淮南市气象灾害预警服务中心东543米', createDate: '2021-04-13 11:59:45' },
          { id: 3, type: 'entrance', address: '安徽省淮南市大通区玉兰大道辅路王郢东南312米', createDate: '2021-04-13 22:50:01' },
          { id: 4, type: 'gather', address: '安徽省淮南市田家庵区民裕大街聚鑫源食府东236米', createDate: '2021-04-13 12:05:29' }
        ],
        taskInfo: [
          { id: 1, siteName: '淮南高新区产业园二期', tranType: 'external', absorName: '中电科八号院灰塘', tranCompany: '淮南金顺运输有限公司', startDate: '2021-04-01', endDate: '2021-04-30' },
          { id: 1, siteName: '安粮淮安府', tranType: 'external', absorName: '人防1811', tranCompany: '淮南金顺运输有限公司', startDate: '2021-04-11', endDate: '2021-05-07' },
          { id: 1, siteName: '拓基鼎元世家', tranType: 'internal', absorName: '', tranCompany: '淮南市松凯运输有限公司', startDate: '2021-03-27', endDate: '021-04-27' }
        ]
      }
    }
  },
  watch: {
    carData() {
      this.initCountDate()
    }
  },
  created() {
    this.carData = this.list
    this.initCountDate()
    setTimeout(() => {
      // 延时执行初始化地图
      this.initMap()
    }, 500)
  },

  methods: {

    /* 车辆详情抽屉盒子控制方法*/
    openCarDrawer(page) {
      this.activeCarInfo = page
      this.showCarDrawer = true
    },

    /* 左侧树结构，车辆检索方法*/
    searchCar() {
      if (this.searchText.trim().length > 7) { return this.$message.warning('您输入的车牌号码有误，请重新输入！') }

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
      tempCarListCheck.length == 0 ? this.$message.warning('抱歉，未查询到该车辆！') : this.carData = tempCarListCheck
    },

    /* 左侧树结构，查看指定公司级信息 */
    readCompany(row) {
      this.carData = [row]
      this.setMarker()
      this.isShowDate = false
      this.isShowCar = false
      this.isShowTotal = true
    },

    /* 左侧树结构，查看车辆信息 */
    readCar(companyId, row) {
      this.isShowTotal = false
      this.isShowCar = true
      this.initDateCard()
      this.setTrajectory()
    },

    /* 左侧树结构，状态统计数据点击事件 */
    screenCars(type) {
      this.isShowTotal = true
      this.isShowCar = false
      this.isShowDate = false

      if (type != 'all') {
        var tempList = this.$selfJs.deepClone(this.list)
        var oneLevel = 0
        this.list.forEach((item, index) => {
          var twoLevel = 0
          item.carList.forEach((itemC, indexC) => {
            if (itemC.gpsStatus != type) {
              tempList[index - oneLevel].carList.splice(indexC - twoLevel, 1)
              twoLevel++
            }
          })
        })

        this.carData = []
        // 如果该状态下企业车辆数据为空，则不显示该企业
        tempList.forEach((item, index) => {
          if (item.carList.length != 0) { this.carData.push(item) }
        })
      } else {
        this.carData = this.list
      }
      this.setMarker()
    },

    /* 左侧树结构，初始化车辆GPS状态统计数据*/
    initCountDate() {
      this.carTotalDate = {
        normal: 0,
        park: 0,
        offline: 0,
        abnormal: 0
      },
      this.list.forEach((item, index) => {
        item.carList.forEach((itemC, indexC) => {
          switch (itemC.gpsStatus) {
            case 'normal':
              this.carTotalDate.normal++
              break
            case 'park':
              this.carTotalDate.park++
              break
            case 'offline':
              this.carTotalDate.offline++
              break
            case 'abnormal':
              this.carTotalDate.abnormal++
              break
          }
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

    /* 创建地图车辆覆盖物 */
    setMarker() {
      // 清除地图覆盖物
      this.map.clearOverlays()
      // 重新初始化中心及层级
      var point = new BMapGL.Point(117.028161, 32.635982)
      this.map.centerAndZoom(point, 12)
      // 循环数据，创建标注
      this.carData.forEach((item, index) => {
        item.carList.forEach((itemC, indexC) => {
          // 创建车辆标注图标
          this.$bdMap.markerPoint(this.map,{
            width: 35,
            height: 31,
            lat:itemC.lat,
            lng:itemC.lng,
            icon:this.carImg[itemC.gpsStatus],
          })
        })
      })
    },

    /* 创建车辆轨迹 */
    setTrajectory() {
      // 清除地图覆盖物
      this.map.clearOverlays()

      // 重新初始化中心及层级
      var point = new BMapGL.Point(this.trajectory[0].lng, this.trajectory[0].lat)
      this.map.centerAndZoom(point, 13)

      // 创建起终点标注
      this.$bdMap.markerPoint(this.map,{
        lat:this.trajectory[0].lat,
        lng:this.trajectory[0].lng,
        icon:require('@/assets/point-start.png'),
      })
      this.$bdMap.markerPoint(this.map,{
        lat:this.trajectory[this.trajectory.length - 1].lat,
        lng:this.trajectory[this.trajectory.length - 1].lng,
        icon:require('@/assets/point-end.png'),
      })

      // 创建线路
      this.$bdMap.markerPolyline(this.map, this.trajectory)
    },

    /* 选择查询日期*/
    changeDate() { // 临时测试
      console.log(this.searchDate.date)
    },
    changeTime() { // 临时测试
      console.log(this.searchDate.time)
    },

    /* 按日期时间查询车辆轨迹*/
    searchCarPath() {
      console.log(this.searchDate)
      // console.log(this.$selfJs.getDateString(this.searchDate.date,'date'))
    },

    /* 时间日期卡片：时间进度条变化时控制方法*/
    changeSlider() {
      this.searchDate.time = [this.numToStrTime(this.sliderValue[0]), this.numToStrTime(this.sliderValue[1])]
    },

    /* 时间日期卡片隐藏/显示控制*/
    showDateCard() {
      this.initDateCard()
      this.isShowDate = !this.isShowDate
    },

    /* 时间日期卡片：重新初始化日期时间*/
    initDateCard() {
      this.searchDate = {
        date: new Date(),
        time: ['00:00:00', '23:59:59']
      }
      this.sliderValue = [0, 24]
    },

    /* 将数值转换成对应时间值并返回*/
    numToStrTime(numTime) {
      const splitTime = String(numTime).split('.')
      let strTime = ''
      let hoursStr = ''
      if (splitTime[0] > 24 || splitTime[0] < 0 || splitTime.length == 0) {
        return false
      } else if (splitTime[0] == 24) {
        return '23:59:59'
      } else if (splitTime[0] < 10) {
        hoursStr = '0' + splitTime[0]
      } else {
        hoursStr = splitTime[0]
      }
      strTime = splitTime.length == 1 ? hoursStr + ':00:00' : strTime = hoursStr + ':30:00'
      return strTime
    }

  }
}
</script>

<style lang="scss">
  .regulatory{
    width:100%;
    height: calc(100vh - 84px);
    overflow: hidden;

    /* 车辆树结构列表*/
    .re-left {
      width: 350px;
      height: 100%;
      float: left;

      //background: #ccc;
      //background: rgba(192,192,192,0.4);

      .el-card__body {
        height: 100%;
      }

      .re-search {
        margin: 10px 0 20px 0;
      }

      .re-icon-classify {
        padding: 10px 5px;
        height: 100px;
        //border-bottom: 1px solid #ccc;

        div {
          float: left;
          margin: 0 12px;

          i {
            display: block;
            width: 30px;
            height:  30px;
            margin: 0 auto;
          }
          p {
            margin: 10px 0 0 0;
            width: 40px;
            text-align: center;
            font-size: 13px;

            span {
              display: block;
              font-size: 16px;
              font-weight: 600;
              margin-top: 5px;
            }
          }
        }
        div:nth-child(1) {
          margin-left: 0;
          i{
            background:url('../../../assets/car-all.png') no-repeat;
            background-size: 100%;
          }
          span {
            color: #409EFF;
          }
        }
        div:nth-child(2) {
          i{
            background:url('../../../assets/car-normal.png') no-repeat;
            background-size: 100%;
          }
          span {
            color: #67C23A;
          }
        }
        div:nth-child(3) {
          i{
            background:url('../../../assets/car-park.png') no-repeat;
            background-size: 100%;
          }
          span {
            color: #E6A23C;
          }
        }
        div:nth-child(4) {
          i{
            background:url('../../../assets/car-offline.png') no-repeat;
            background-size: 100%;
          }
          span {
            color: #909399;
          }
        }
        div:nth-child(5) {
          margin-right: 0;
          i{
            background:url('../../../assets/car-abnormal.png') no-repeat;
            background-size: 100%;
          }
          span {
            color: #F56C6C;
          }
        }
      }
      .re-box-tree {
        height: calc(100% - 180px);
        overflow-y: auto;
        .el-collapse-item__header {
          span{
            color: #409EFF;
            margin-right: 5px;
            font-weight: 600;
          }
        }

        .car-list {
          overflow: hidden;
          padding-left: 20px;
          i {
            display: block;
            width: 20px;
            height: 20px;
            margin-top: 10px;
            float: left;
          }
          p {
            margin: 0 0 0 10px;
            height: 40px;
            line-height: 40px;
            float:left;
          }
        }
        .car-normal {
          i {
            background: url(../../../assets/car-normal.png) no-repeat;
            background-size: 100%;
          }
          p { color: #67C23A; }
        }
        .car-offline {
          i {
            background: url(../../../assets/car-offline.png) no-repeat;
            background-size: 100%;
          }
          p { color: #909399; }
        }
        .car-park {
          i {
            background: url(../../../assets/car-park.png) no-repeat;
            background-size: 100%;
          }
          p { color: #E6A23C; }
        }
        .car-abnormal {
          i {
            background: url(../../../assets/car-abnormal.png) no-repeat;
            background-size: 100%;
          }
          p { color: #F56C6C; }
        }
        .car-list:hover {
          cursor: pointer;
          background: rgba(64,158,255,0.1)
        }
        /* .car-list-active {
          background: rgba(64,158,255,0.4)
        } */
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

      /* 车辆详情功能按钮*/
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
        .date-icon {
          font-size: 20px;
          color: #409EFF;
          cursor: pointer;
          border: 1px solid #409EFF;
          border-radius: 50%;
          padding: 8px;
          position: absolute;
          bottom: 30px;
          left: 21px;
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
          i {
            color: #F56C6C;
          }
        }
        .card-item:nth-child(3){
          i {
            color: #67C23A;
          }
        }
        .card-item:nth-child(4){
          border: none;
          i {
            color: #E6A23C;
          }
          p {
            font-size: 14px;
          }
        }
      }

      /* 车辆详情展开抽屉盒子*/
      .drawer-box-car {
        .el-drawer__container {
          .el-drawer {
            .el-drawer__header {
              span {
                font-weight: 800;
                color: #409EFF;
              }
            }
            .el-drawer__body {
              padding: 20px;
              //overflow: hidden;
              overflow-y:auto;
              .el-collapse {
                .el-collapse-item{
                  .el-collapse-item__header {
                    font-size: 14px;
                    font-weight: 600;
                  }
                  .el-collapse-item__wrap {
                    padding-left: 10px;
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
                      .item-big {
                        label {
                          color: #409EFF;
                        }
                        p {
                          line-height: 30px;
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

      /* 日期时间轨迹查询*/
      .box-card-date {
        width: calc(100% - 90px);
        position: absolute;
        bottom: 10px;
        z-index: 5;
        //text-align: center;

        .el-card {
          background: rgba(255,255,255,0.8);
          .el-card__body {

            .el-input {
              .el-input__inner {
                background:rgba(255,255,255,0);
              }
            }
            .el-date-editor--date{
              width: 320px;
            }
            .el-date-editor--timerange {
              background:rgba(255,255,255,0);
              width: 352px;
              margin-left:20px;
              .el-range-input {
                background:rgba(255,255,255,0);
              }
            }
            .el-button {
              margin-left:20px;
              background:rgba(255,255,255,0);
            }
            .block {
              padding: 10px;
            }
          }

        }
      }
    }
  }
</style>
