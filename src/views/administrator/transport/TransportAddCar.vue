<template>
  <!-- 增加运输车辆申请-->
  <div v-if="value">
    <el-dialog
      title="增加运输作业车辆"
      width="1160px"
      :append-to-body="true"
      :before-close="close"
      :close-on-click-modal="false"
      :visible.sync="winCard"
    >
      <TopBar title="工地信息" />
      <BaseTranInfo tran-info="1" />

      <TopBar title="申请信息" />
      <el-form ref="dataForm" :rules="rules" :model="applyData" label-position="right" label-width="150px" class="form-single">

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

        <el-form-item label="备注">
          <el-input :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="请输入备注说明信息" />
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

        <el-form-item label="申请函">
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

        <el-form-item label="测试">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"

            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>

        <TopBar title="运输车辆" />
        <div style="margin:0 0 10px 10px">
          <el-button @click="showSelectCar = true">
            选择车辆
          </el-button>
        </div>
        <!-- 选中车辆展示列表-->
        <SelectedCarList :items-car="applyData.items" />
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="winCard = false">
          保存
        </el-button>
        <el-button type="primary" @click="submitApplyData">
          提交审批
        </el-button>
      </div>
    </el-dialog>

    <SelectTranCar v-model="showSelectCar" @child-selected-car="selectedCarList" />
  </div>

</template>

<script>

import TopBar from '@/components/TopBar.vue'
import SelectTranCar from './components/SelectTranCar.vue' // 选择车辆
import SelectedCarList from './components/SelectedCarList.vue' // 选中展示车辆列表
import BaseTranInfo from './components/BaseTranInfo.vue'
// 引入image-conversion - 图片压缩
import * as imageConversion from 'image-conversion'

export default {
  name: 'TransportAddCar',
  components: { TopBar, SelectTranCar, SelectedCarList, imageConversion, BaseTranInfo },
  props: ['value'],
  data() {
    return {
      imageUrl: '',
      showSelectCar: false, // 选择车辆页面弹窗
      winCard: true, // 卡片显隐控制
      selectTranDate: '',

      hideUpload: { // 上传按钮隐藏样式控件
        shuntingHide: false, // 调车单
        tranApplyHide: false, // 运输申请函
        otherHide: false // 其他附件
      },

      applyData: {
        siteID: '', // 工地ID
        tranStartDate: '', // 运输开始日期
        tranEndDate: '', // 运输结束日期
        remark: '', //  备注
        shuntingFile: '', // 调车单附件
        tranApplyFile: '', // 运输申请函附件
        otherFile: '', // 其他附件

        // 提交车辆列表
        items: []
      },

      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  methods: {
    beforeAvatarUpload(file) {
      console.log(123)
    },

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
        case 'shunting' : // 调车单附件
          this.applyData.shuntingFile = URL.createObjectURL(file.raw)
          /* this.tempImg.shuntingFile = URL.createObjectURL(file.raw) */
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
        case 'shunting' : // 调车单附件
          this.hideUpload.shuntingHide = isHide
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

    close() {
      this.$emit('input', false)
    },

    // 提交数据
    submitApplyData() {
      console.log(this.applyData.items)
      console.log(this.applyData)
    },

    // 选择车辆列表中删除操作
    handleDeleteCar(row, index) {
      this.$notify({
        message: '车辆 [ ' + index.carNum + ' ] 移除成功！',
        type: 'success'
      })
      this.applyData.items.splice(index, 1)
    }
  },
  wacht: {}
}
</script>
