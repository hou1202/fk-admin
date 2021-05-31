<template>
  <!-- 增加运输车辆申请-->
  <div v-if="value">
    <el-dialog
      :title="title"
      width="1000px"
      :append-to-body="true"
      :before-close="close"
      :close-on-click-modal="false"
      :visible.sync="winCard"
    >

      <el-form ref="dataForm" :rules="rules" :model="formData" label-position="right" label-width="150px" class="form-single">

        <el-form-item label="标题">
          <el-input v-model="formData.title" placeholder="请输入公告标题(必填)" required="公告标题不得为空" />
        </el-form-item>

        <el-form-item label="摘要">
          <el-input v-model="formData.v_title" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="请输入公告摘要说明" />
        </el-form-item>
        <el-form-item label="内容">
          <!-- <editor
            :api-key="tinyConfig.apiKey"
            :init="tinyConfig.editConfig"
            v-model="formData.content"
          >
          </editor> -->
          <TinymceEditor
            v-model="formData.content"
            :disabled="disabled"
            @onClick="clickEditor"
            ref="editor"
          >

          </TinymceEditor>
        </el-form-item>



      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitApplyData">
          保存
        </el-button>
      </div>
    </el-dialog>

  </div>

</template>

<script>


// 引入image-conversion - 图片压缩
import * as imageConversion from 'image-conversion'
/* import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue' */
import TinymceEditor from "/src/components/TinymceEditor"



export default {
  name: 'NoticeAdd',
  components: { imageConversion, TinymceEditor},
  props: ['value'],
  data() {
    return {
      title: '新增公告',
      winCard: true, // 卡片显隐控制
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false,
      formData: {
        title: '',
        v_title: '',
        content: '',
      },
      disabled: false,
      /* 副文本配置信息*/
      tinyConfig: {
        apiKey: '39c035b73b98af84fa9dcb8439bbe19ee95af523c33ada57adaf97ff0272709d',
        editConfig: {
          height: 500, //富文本高度
          language_url: '/static/tinymce/zh_CN.js', //中文包
          language: 'zh_CN', //中文
          skin_url: '/static/tinymce/skins/ui/oxide',//skin路径
          content_css: '/static/tinymce/skins/content/default/content.css',//skin路径
          browser_spellcheck: true, // 拼写检查
          branding: false, // 去水印
          elementpath: true, //禁用编辑器底部的状态栏
          statusbar: false, // 隐藏编辑器底部的状态栏
          paste_data_images: true, // 是否允许粘贴图像
          menubar: true, // 隐藏最上方menu
          fontsize_formats: '14px 16px 18px 20px 24px 26px 28px 30px 32px 36px', //字体大小
          font_formats:'微软雅黑=Microsoft YaHei,Helvetica Neue;PingFang SC;sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun;serifsans-serif;Terminal=terminal;monaco;Times New Roman=times new roman;times', //字体
          file_picker_types: 'image',
          images_upload_credentials: true,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount',
          ],
          toolbar: 'fontselect fontsizeselect link lineheight forecolor backcolor bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | image quicklink h2 h3 blockquote table numlist bullist preview fullscreen',
          // 图片上传三个参数，图片数据，成功时的回调函数，失败时的回调函数
          /* images_upload_handler: function(blobInfo, success, failure) {
            let formdata = new FormData();
            formdata.append("file", blobInfo.blob());
            // 上传图片接口，跟后端同事协调上传图片
            // http://hh.xxxx.cn/admin/upload为上传图片接口
            axios.post('http://hh.xxxx.cn/admin/upload',formdata)
            .then(function(res) {
              success(res.data.data.src);
            }).catch(res => {
               failure("error");
             });
          } */
        }
      }
    }
  },
  methods: {
    close() {
      this.$emit('input', false)
    },
    clickEditor() {

    },
    // 提交数据
    submitApplyData() {
      console.log(this.applyData.items)
      console.log(this.applyData)
    },


  },
  wacht: {}
}
</script>
