<template>
  <div class="tinymce-editor">
    <editor
      v-model="eContent"
      :init="init"
      :disabled="disabled"
      @onClick="onClick">
    </editor>
  </div>

</template>
<script>
/* import tinymce from 'tinymce/tinymce' */
import Editor from '@tinymce/tinymce-vue'

export default {
  name: 'TinymceEditor',
  components: {
    Editor
  },
  props: {
    //传入一个value，使组件支持v-model绑定
    content: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    plugins: {
      type: [String, Array],
      default: 'lists image media table textcolor wordcount contextmenu'
    },
    toolbar: {
      type: [String, Array],
      default: ['bold italic strikethrough underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table | formatselect | removeformat']
    }
  },
  data() {
    return {
      //初始化配置
      init: {
        language_url: '/static/tinymce/zh_CN.js', //中文包
        language: 'zh_CN', //中文
        skin_url: '/static/tinymce/skins/ui/oxide',//skin路径
        content_css: '/static/tinymce/skins/content/default/content.css',
        height: 300,
        plugins: this.plugins,
        toolbar: this.toolbar,
        branding: false,
        menubar: false,
        //此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
        //如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
        images_upload_handler: (blobInfo, success, failure) => {
          const img = 'data:image/jpeg;base64,' + blobInfo.base64()
          success(img)
        }
      },
      eContent: this.content,
    }
  },
  mounted() {
    /* tinymce.init({}) */
  },
  created() {


  },
  methods: {
    //添加相关的事件，可用的事件参照文档=> https://github.com/tinymce/tinymce-vue => All available events

    onClick(e) {
      /* this.$emit('onClick', e, tinymce) */
    },
    //可以添加一些自己的自定义事件，如清空内容
    clear() {
      this.eContent = ''
    }
  },
  watch: {
    content(newValue) {
      this.eContent = newValue
    },
    eContent(newValue) {
      this.$emit('input', newValue)
    }
  }

}
</script>
<style scoped>
</style>
