<template>
  <!-- 图片上传组件-->
  <!-- 父组件中需定义选中车辆接收事件：child-selected-car-->
  <div>
    <!-- <el-upload
      action="https://jsonplaceholder.typicode.com/posts/"
      list-type="picture-card"
      :multiple="multiple"
      :limit="limit"
      :before-upload="handleBeforeUpload"
      :on-progress="handleUploadProgress"
      :on-exceed="handleNumBeyond"
      :on-success="(response, file, fileList) => {handleUploadSuccess(response, file, fileList, 'other')}"
      :on-remove="(file, fileList) => {handleRemove(file, fileList, 'other')}"
      :on-change="(file, fileList) => {handleUploadChange(file, fileList, 'other')}"
      :class="{hideUpload:isHide}"
    > -->
    <el-upload
      action="https://jsonplaceholder.typicode.com/posts/"
      list-type="picture-card"
      :multiple="multiple"
      :limit="limit"
      :before-upload="handleBeforeUpload"
      :on-progress="handleUploadProgress"
      :on-exceed="handleNumBeyond"
      :on-success="handleUploadSuccess"
      :on-remove="handleRemove"
      :on-change="handleUploadChange"
      :class="{hideUpload:isHide}"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-button type="warning" plain size="mini" @click="showUrl">展示URL</el-button>
  </div>

</template>

<script>
// 引入image-conversion - 图片压缩
import * as imageConversion from 'image-conversion'
export default {
  name: 'ImgUpload',
  components: { imageConversion },
  props: {
    limit: {      // 最大上传文件数量
      type: [String, Number],
      default: 1,
    },
    hidden: {     // 达到文件上传限制时，是否隐藏上传按钮
      type: Boolean,
      default: true,
    },
    multiple: {   // 是否支持多选文件
      type: Boolean,
      default: true,
    }
  },
  data() {
    return {
      isHide: false,
      files: '',
      tempFiles: '',
    }
  },
  methods: {
    showUrl() {
      console.log(this.files)
    },
    
    /** 向父组件回传文件地址
     * 
      * */
    returnFiles() {
      
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
          resolve(res)
        })
      })
    },

    /**文件上传时的钩子
     *  on-progress
     *  测试时用，完成后可删除
     **/
    handleUploadProgress(event, file, fileList) {
      //console.log('图片上传时', file)
    },

    /**文件超出个数限制时的钩子
     *  on-exceed
     **/
    handleNumBeyond(files, fileList) {
      this.$message.warning('最大上传文件数量为：' + this.limit + '个 !')
    },

    /**图片上传成功后回调
     *  on-success
     **/
    handleUploadSuccess(response, file, fileList) {
      console.log(response)
      console.log(file)
      console.log(fileList)
      //console.log(URL.createObjectURL(file.raw))
      //this.files= URL.createObjectURL(file.raw)
      //此时为临时处理，应根据实际上传图片返回来进行处理
      this.fileListEetract(fileList)

    },

    /** 文件状态改变时的钩子
     *  on-change
     *  @param {object}  file      文件对象
     *  @param {array}   fileList  上传文件队列
     * */
    handleUploadChange(file, fileList) {
      this.isHide = fileList.length >= this.limit ? true : false;
      console.log("change")
    },

    /**文件列表移除文件时的钩子
     * on-remove
     * */
    handleRemove(file, fileList) {
      this.fileListEetract(fileList)
      this.files=this.files.substring(0,this.files.length-1)
      console.log(fileList)
    },

    /**文件上传失败时的钩子
     * on-error
     * */
    handUploadError(err, file, fileList) {
      this.$message.warning('文件上传失败，请重新上传！')
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

    fileListEetract(list) {
      this.files = ''
      list.forEach((item, index) => {
        this.files = this.files+item.response.id+','
      })
      this.files=this.files.substring(0,this.files.length-1)
    }

  },
}
</script>
<style lang="scss">


</style>
