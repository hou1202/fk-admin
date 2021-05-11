<template>
  <!-- 新任务备案-->
  <div v-if="value">
    <el-dialog
      title="新运输作业备案"
      :append-to-body="true"
      :before-close="close"
      :close-on-click-modal="false"
      :visible.sync="createTaskCard"
    >
      <el-form ref="dataForm" :rules="rules" :model="applyData" label-position="right" label-width="150px" style="width:1100px">
        <el-form-item label="工地名称">
          <el-input v-model="applyData.siteName" placeholder="请输入工地名称 (必填)" required="工地名称不得为空" />
        </el-form-item>
        <el-form-item label="所属辖区">
          <el-select v-model="applyData.region" class="filter-item" placeholder="请选择工地所在辖区">
            <el-option v-for="item in region" :key="item.id" :label="item.value" :value="item.id" />
          </el-select>
        </el-form-item>
        <div class="el-form-item-click" @click="showMapSelectPoint = true">
          <el-form-item label="工地地址">
            <el-input v-model="applyData.address" placeholder="请选择工地所在详情地址 (必填)" readonly />
          </el-form-item>
        </div>
        <el-form-item label="渣土类型">
          <el-select v-model="applyData.soilType" class="filter-item" placeholder="请选择工地产生少渣土类型">
            <el-option v-for="item in soilType" :label="item.value" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="建设单位">
          <el-input v-model="applyData.constructionUnit" placeholder="请输入建设单位名称 (必填)" required="建设单位名称不得为空" />
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="applyData.constructionUser" placeholder="请输入建设单位联系人 (必填)" required="建设单位联系人不得为空" />
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="applyData.constructionPhone" type="number" placeholder="请输入建设单位联系方式 (必填)" required="建设单位联系方式不得为空" />
        </el-form-item>
        <el-form-item label="施工单位">
          <el-input v-model="applyData.workUser" placeholder="请输入施工单位名称 (必填)" required="施工单位名称不得为空" />
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="applyData.workUser" placeholder="请输入施工单位联系人 (必填)" required="施工单位联系人不得为空" />
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="applyData.workPhone" type="number" placeholder="请输入施工单位联系方式 (必填)" required="施工单位联系方式不得为空" />
        </el-form-item>
        <el-form-item label="建设面积">
          <el-input v-model="applyData.siteArea" type="number" placeholder="请输入施工工地建设面积 (必填)" required="施工工地建设面积不得为空" />
          <p class="input-unit">平方米</p>
        </el-form-item>
        <el-form-item label="渣土处置量">
          <el-input v-model="applyData.soilAmount" type="number" placeholder="请输入预计工地渣土处置量 (必填)" required="预计工地渣土处置量不得为空" />
          <p class="input-unit">立方米</p>
        </el-form-item>
        <el-form-item label="运输类型">
          <el-select v-model="applyData.tranType" class="filter-item" placeholder="请选择渣土运输类型">
            <el-option v-for="item in transportType" :label="item.value" :value="item.type" />
          </el-select>
        </el-form-item>
        <el-form-item label="运输日期">
          <el-date-picker
            v-model="selectTranDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            :change="changTranDate()"
          />
        </el-form-item>
        <template v-if="applyData.tranType == 'external'">
          <div class="el-form-item-click" @click="showSelectAbsor = true">
            <el-form-item label="消纳场">
              <el-input v-model="absorInfo.name" placeholder="请选择收土点消纳场" readonly />
            </el-form-item>
          </div>
          <el-form-item label="消纳场辖区">
            <el-input v-model="absorInfo.area" placeholder="消纳场所属辖区" readonly />
          </el-form-item>
          <el-form-item label="所属单位">
            <el-input v-model="absorInfo.company" placeholder="消纳场所属单位" readonly />
          </el-form-item>
          <el-form-item label="消纳场地址">
            <el-input v-model="absorInfo.address" placeholder="消纳场详细地址" readonly />
          </el-form-item>
          <el-form-item label="外运线路">
            <el-input :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="请输入外运线路信息" />
          </el-form-item>
        </template>
        <el-form-item v-if="applyData.tranType == 'internal'" label="转运说明">
          <el-input :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="请输入场内转运说明" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="请输入备注说明信息" />
        </el-form-item>
        <el-form-item label="承诺书">
          <a href="#">下载模板</a>
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :limit="1"
            :before-upload="handleBeforeUpload"
            :on-progress="handleUploadProgress"
            :on-success="(response, file, fileList) => {handleUploadSuccess(response, file, fileList, 'promise')}"
            :on-remove="(file, fileList) => {handleRemove(file, fileList, 'promise')}"
            :on-change="(file, fileList) => {handleUploadChange(file, fileList, 'promise', 1)}"
            :class="{hideUpload:hideUpload.promiseHide}"
          >
            <i class="el-icon-plus" />
          </el-upload>
        </el-form-item>
        <el-form-item label="调车单">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :limit="1"
            :before-upload="handleBeforeUpload"
            :on-progress="handleUploadProgress"
            :on-success="(response, file, fileList) => {handleUploadSuccess(response, file, fileList, 'shunting')}"
            :on-remove="(file, fileList) => {handleRemove(file, fileList, 'shunting')}"
            :on-change="(file, fileList) => {handleUploadChange(file, fileList, 'shunting', 1)}"
            :class="{hideUpload:hideUpload.shuntingHide}"
          >
            <i class="el-icon-plus" />
          </el-upload>
        </el-form-item>
        <el-form-item label="出土方证明">
          <a href="#">下载模板</a>
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :limit="1"
            :before-upload="handleBeforeUpload"
            :on-progress="handleUploadProgress"
            :on-success="(response, file, fileList) => {handleUploadSuccess(response, file, fileList, 'siteFreeProve')}"
            :on-remove="(file, fileList) => {handleRemove(file, fileList, 'siteFreeProve')}"
            :on-change="(file, fileList) => {handleUploadChange(file, fileList, 'siteFreeProve', 1)}"
            :class="{hideUpload:hideUpload.siteFreeProveHide}"
          >
            <i class="el-icon-plus" />
          </el-upload>
        </el-form-item>
        <el-form-item label="收土点证明">
          <a href="#">下载模板</a>
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :limit="1"
            :before-upload="handleBeforeUpload"
            :on-progress="handleUploadProgress"
            :on-success="(response, file, fileList) => {handleUploadSuccess(response, file, fileList, 'absorFreeProve')}"
            :on-remove="(file, fileList) => {handleRemove(file, fileList, 'absorFreeProve')}"
            :on-change="(file, fileList) => {handleUploadChange(file, fileList, 'absorFreeProve', 1)}"
            :class="{hideUpload:hideUpload.absorFreeProveHide}"
          >
            <i class="el-icon-plus" />
          </el-upload>
        </el-form-item>
        <el-form-item label="消纳场证明">
          <a href="#">下载模板</a>
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :limit="1"
            :before-upload="handleBeforeUpload"
            :on-exceed="handleNumBeyond"
            :on-progress="handleUploadProgress"
            :on-success="(response, file, fileList) => {handleUploadSuccess(response, file, fileList, 'absorProve')}"
            :on-remove="(file, fileList) => {handleRemove(file, fileList, 'absorProve')}"
            :on-change="(file, fileList) => {handleUploadChange(file, fileList, 'absorProve', 1)}"
            :class="{hideUpload:hideUpload.absorProveHide}"
          >
            <i class="el-icon-plus" />
          </el-upload>
        </el-form-item>
        <el-form-item label="运输合同">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            multiple
            :limit="4"
            :before-upload="handleBeforeUpload"
            :on-exceed="handleNumBeyond"
            :on-progress="handleUploadProgress"
            :on-success="(response, file, fileList) => {handleUploadSuccess(response, file, fileList, 'tranContract')}"
            :on-remove="(file, fileList) => {handleRemove(file, fileList, 'tranContract')}"
            :on-change="(file, fileList) => {handleUploadChange(file, fileList, 'tranContract')}"
            :class="{hideUpload:hideUpload.contractHide}"
          >
            <i class="el-icon-plus" />
          </el-upload>
        </el-form-item>
        <el-form-item label="施工许可证">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            multiple
            :limit="4"
            :before-upload="handleBeforeUpload"
            :on-exceed="handleNumBeyond"
            :on-progress="handleUploadProgress"
            :on-success="(response, file, fileList) => {handleUploadSuccess(response, file, fileList, 'workLicense')}"
            :on-remove="(file, fileList) => {handleRemove(file, fileList, 'workLicense')}"
            :on-change="(file, fileList) => {handleUploadChange(file, fileList, 'workLicense')}"
            :class="{hideUpload:hideUpload.workLicenseHide}"
          >
            <i class="el-icon-plus" />
          </el-upload>
        </el-form-item>
        <el-form-item label="运输申请函">
          <a href="#">下载模板</a>
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            multiple
            :limit="4"
            :before-upload="handleBeforeUpload"
            :on-exceed="handleNumBeyond"
            :on-progress="handleUploadProgress"
            :on-success="(response, file, fileList) => {handleUploadSuccess(response, file, fileList, 'tranApply')}"
            :on-remove="(file, fileList) => {handleRemove(file, fileList, 'tranApply')}"
            :on-change="(file, fileList) => {handleUploadChange(file, fileList, 'tranApply')}"
            :class="{hideUpload:hideUpload.tranApplyHide}"
          >
            <i class="el-icon-plus" />
          </el-upload>
        </el-form-item>
        <el-form-item label="其他附件">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            multiple
            :limit="4"
            :before-upload="handleBeforeUpload"
            :on-exceed="handleNumBeyond"
            :on-progress="handleUploadProgress"
            :on-success="(response, file, fileList) => {handleUploadSuccess(response, file, fileList, 'other')}"
            :on-remove="(file, fileList) => {handleRemove(file, fileList, 'other')}"
            :on-change="(file, fileList) => {handleUploadChange(file, fileList, 'other')}"
            :class="{hideUpload:hideUpload.otherHide}"
          >
            <i class="el-icon-plus" />
          </el-upload>
        </el-form-item>

        <TopBar title="运输车辆" />

        <div style="margin:0 0 10px 10px">
          <el-button @click="showSelectCar = true">
            选择车辆
          </el-button>
          <el-button @click="showPrintCarList = true">
            打印调车单
          </el-button>
        </div>
        <!-- 选中车辆展示列表-->
        <SelectedCarList :items-car="applyData.items" />

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createTaskCard = false">
          保存
        </el-button>
        <el-button type="primary" @click="submitApplyData">
          提交审批
        </el-button>
      </div>
    </el-dialog>

    <SelectTranCar v-model="showSelectCar" @child-selected-car="selectedCarList" />
    <SelectAbsor v-model="showSelectAbsor" @selected-absor="selectedAbsor" />
    <MapSelectPoint v-model="showMapSelectPoint" @selected-point="selectedPonit" />
    <PrintCarList v-model="showPrintCarList" :car-list="applyData.items" />
  </div>

</template>

<script>

import TopBar from '@/components/TopBar.vue'
import SelectTranCar from './components/SelectTranCar.vue' // 选择车辆
import SelectedCarList from './components/SelectedCarList.vue' // 选中展示车辆列表
import SelectAbsor from './components/SelectAbsor.vue' // 选择消纳场
import MapSelectPoint from '@/views/administrator/components/MapSelectPoint.vue' // 地图选择经纬度
import PrintCarList from './components/PrintCarList.vue' // 打印调车单
// 引入image-conversion - 图片压缩
import * as imageConversion from 'image-conversion'

export default {
  name: 'TransportNewRecord',
  components: { TopBar, SelectTranCar, SelectedCarList, imageConversion, SelectAbsor, MapSelectPoint, PrintCarList },
  props: ['value'],
  data() {
    return {
      showSelectCar: false, // 选择车辆页面弹窗
      showSelectAbsor: false, // 选择消纳场页面弹窗
      showMapSelectPoint: false, // 选择地图经纬度页面弹窗
      showPrintCarList: false, // 打印调车单页面弹窗
      createTaskCard: true, // 卡片显隐控制
      selectTranDate: '',
      absorInfo: {},
      region: [ // 行政区域
        { id: 1, value: '谢家集区' },
        { id: 2, value: '田家庵区' },
        { id: 3, value: '八公山区' },
        { id: 4, value: '燔集区' },
        { id: 5, value: '山南新区' },
        { id: 6, value: '大通区' },
        { id: 7, value: '经济开发区' }
      ],
      soilType: [ // 渣土类型
        { id: 1, value: '土方渣土' },
        { id: 2, value: '建筑垃圾' },
        { id: 3, value: '装修垃圾' }
      ],
      transportType: [ // 运输类型
        { id: 1, value: '场外运输', type: 'external' },
        { id: 2, value: '场内倒运', type: 'internal' }
      ],
      hideUpload: { // 上传按钮隐藏样式控件
        promiseHide: false, // 承诺书
        shuntingHide: false, // 调车单
        siteFreeProveHide: false, // 出土点不收费证明
        absorProveHide: false, // 消纳场证明
        absorFreeProveHide: false, // 收土点不收费证明
        contractHide: false, // 运输合同
        workLicenseHide: false, // 施工许可证
        tranApplyHide: false, // 运输申请函
        otherHide: false // 其他附件
      },

      applyData: {
        siteName: '', // 工地名称
        region: '', // 工地所属辖区
        adress: '', // 工地地址
        longitude: '', // 经度
        latitude: '', // 纬度
        constructionUnit: '', // 建设单位
        constructionUser: '', // 建设单位联系人
        constructionPhone: '', // 建设单位联系方式
        workUnit: '', // 施工单位
        workUser: '', // 施工单位联系人
        workPhone: '', // 施工单位联系方式
        siteArea: '', // 工地面积
        soilAmount: '', // 预计渣土处置量
        soilType: '', // 渣土类型
        tranType: 'external', // 运输类型：external(默认) / internal
        tranStartDate: '', // 运输开始日期
        tranEndDate: '', // 运输结束日期
        promiseFile: '', // 承诺书附件
        shuntingFile: '', // 调车单附件
        siteFreeProveFile: '', // 出土点不收费证明附件
        tranContractFile: '', // 运输合同附件
        workLicenseFile: '', // 施工许可证附件
        tranApplyFile: '', // 运输申请函附件
        otherFile: '', // 其他附件

        absorId: '', // 消纳场ID
        submitTranRoad: '', // 提交外运线路
        absorProveFile: '', // 消纳场证明附件
        absorFreeProveFile: '', // 收土点不收费证明附件
        // 提交车辆列表
        items: []
      },

      ImgNum: {
        promiseFileNum: true, // 承诺书附件
        shuntingFileNum: true, // 调车单附件
        siteFreeProveFileNum: true, // 出土点不收费证明附件
        tranContractFileNum: true, // 运输合同附件
        workLicenseFileNum: true, // 施工许可证附件
        tranApplyFileNum: true, // 运输申请函附件
        otherFileNum: true, // 其他附件
        absorProveFileNum: true, // 消纳场证明附件
        absorFreeProveFileNum: true // 收土点不收费证明附件
      },

      tempImg: {
        promiseFile: '', // 承诺书附件
        shuntingFile: '', // 调车单附件
        siteFreeProveFile: '', // 出土点不收费证明附件
        tranContractFile: '', // 运输合同附件
        workLicenseFile: '', // 施工许可证附件
        tranApplyFile: '', // 运输申请函附件
        otherFile: '', // 其他附件
        absorProveFile: '', // 消纳场证明附件
        absorFreeProveFile: '' // 收土点不收费证明附件
      },

      dialogStatus: '',
      showReviewer: false,
      dialogPvVisible: false,
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
  },
  methods: {
    // 选择运输开始-结束日期
    changTranDate() {
      this.applyData.tranStartDate = this.selectTranDate[0]
      this.applyData.tranEndDate = this.selectTranDate[1]
    },

    /** 图片上传前钩子
     * 图片压缩
     **/
    handleBeforeUpload(file) {
      console.log('图片上传前', file)
      const maxUploadSize = file.size / 1024 / 1024 < 1 // 判定图片大小是否小于1MB
      if (maxUploadSize) { return file }

      return new Promise((resolve, reject) => {
        // 压缩到400KB,这里的400就是要压缩的大小,可自定义
        imageConversion.compressAccurately(file, 400).then(res => {
          res = new File([res], file.name, { type: res.type, lastModified: Date.now() })
          console.log('上传前压缩图片后', res)
          resolve(res)
        })
      })
    },

    /** 文件状态改变时的钩子
     * @param {object}  file      文件对象
     * @param {array}   fileList  上传文件队列
     * @param {string}  fileType  多文件时，文件类型：为自定义参数
     * @param {int}     maxNum    最大上传文件数，默认值为：4，为自定义参数
     * */
    handleUploadChange(file, fileList, fileType, maxNum = 4) {
      var isHide = fileList.length >= maxNum
      this.isHideUpolad(fileType, isHide)
    },

    // 图片上传时的钩子---测试时用，完成后可删除
    handleUploadProgress(event, file, fileList) {
      console.log('图片上传时', file)
    },

    // 图片上传成功后回调
    handleUploadSuccess(response, file, fileList, fileType) {
      switch (fileType) {
        case 'promise' : // 承诺书附件
          this.applyData.promiseFile = URL.createObjectURL(file.raw)
          this.tempImg.promiseFile = URL.createObjectURL(file.raw)
          break

        case 'shunting' : // 调车单附件
          this.applyData.shuntingFile = URL.createObjectURL(file.raw)
          this.tempImg.shuntingFile = URL.createObjectURL(file.raw)
          break

        case 'siteFreeProve' : // 出土点不收费证明附件
          this.applyData.siteFreeProveFile = URL.createObjectURL(file.raw)
          this.tempImg.siteFreeProveFile = URL.createObjectURL(file.raw)
          break

        case 'absorProve' : // 消纳场证明附件
          this.applyData.absorProveFile = URL.createObjectURL(file.raw)
          this.tempImg.absorProveFile = URL.createObjectURL(file.raw)
          break

        case 'absorFreeProve' : //  收土点不收费证明附件
          this.applyData.absorFreeProveFile = URL.createObjectURL(file.raw)
          this.tempImg.absorFreeProveFile = URL.createObjectURL(file.raw)
          break

        case 'tranContract' : // 运输合同
          this.applyData.tranContractFile = this.$selfJs.strImgId(fileList)
          break

        case 'workLicense' : // 施工许可证
          this.applyData.tranContractFile = this.$selfJs.strImgId(fileList)
          break

        case 'tranApply' : // 运输申请函
          this.applyData.tranApplyFile = this.$selfJs.strImgId(fileList)
          break

        case 'other' : // 其他附件
          this.applyData.tranApplyFile = this.$selfJs.strImgId(fileList)
          break
      }
    },

    // 图片删除成功后回调
    handleRemove(file, fileList, fileType, maxNum = 4) {
      this.ImgNum.fileType = true

      var isHide = fileList.length >= maxNum
      this.isHideUpolad(fileType, isHide)
    },

    /* 是否隐藏上传按钮
     * @param {string}  fileType  多文件时，文件类型
     * @param {boolean} isHide    是否隐藏
     * */
    isHideUpolad(fileType, isHide) {
      switch (fileType) {
        case 'promise' : // 承诺书附件
          this.hideUpload.promiseHide = isHide
          break

        case 'shunting' : // 调车单附件
          this.hideUpload.shuntingHide = isHide
          break

        case 'siteFreeProve' : // 出土点不收费证明附件
          this.hideUpload.siteFreeProveHide = isHide
          break

        case 'absorProve' : // 消纳场证明附件
          this.hideUpload.absorProveHide = isHide
          break

        case 'absorFreeProve' : //  收土点不收费证明附件
          this.hideUpload.absorFreeProveHide = isHide
          break

        case 'tranContract' : // 运输合同
          this.hideUpload.contractHide = isHide
          break

        case 'workLicense' : // 施工许可证
          this.hideUpload.workLicenseHide = isHide
          break

        case 'tranApply' : // 运输申请函
          this.hideUpload.tranApplyHide = isHide
          break

        case 'other' : // 其他附件
          this.hideUpload.otherHide = isHide
          break
      }
    },

    // 超出上传限制
    handleNumBeyond(files, fileList, maxNum = 4) {
      this.$message.warning('最大上传文件数量为：' + maxNum + ' !')
    },

    // 选中车辆列表-子组件返回数据
    selectedCarList(res) {
      let tempCarList = []
      tempCarList = this.applyData.items.concat(res)
      const hash = {}
      this.applyData.items = tempCarList.reduce((item, next) => { // 赋值给选选择车辆表单并去除重复添加车辆
        hash[next.id] ? '' : hash[next.id] = true && item.push(next)
        return item
      }, [])
    },

    // 选中消纳场信息-子组件返回数据
    selectedAbsor(res) {
      this.absorInfo = res
      this.applyData.absorId = this.absorInfo.id
    },

    // 地图中选择经纬度
    selectedPonit(res) {
      this.applyData.latitude = res.lat
      this.applyData.longitude = res.lng
      this.applyData.address = res.address
    },

    close() {
      this.$emit('input', false)
    },

    // 提交数据
    submitApplyData() {
      console.log(this.applyData.items)
      console.log(this.applyData)
    },

    beforeAvatarUpload(file) { // 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },

    // 选择车辆列表中删除操作
    handleDeleteCar(row, index) {
      this.$notify({
        message: '车辆 [ ' + index.carNum + ' ] 移除成功！',
        type: 'success'
      })
      this.applyData.items.splice(index, 1)
    },

    handleFilter() {
      /* this.listQuery.page = 1
      this.getList() */
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },

    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(tempData).then(() => {
            const index = this.list.findIndex(v => v.id === this.temp.id)
            this.list.splice(index, 1, this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'warning',
              duration: 2000
            })
          })
        }
      })
    },

    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },

    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  },
  wacht: {

  }
}
</script>
