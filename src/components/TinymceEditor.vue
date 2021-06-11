<template>
  <div class="tinymce-editor">
    <editor
      v-model="eContent"
      :init="init"
      :disabled="disabled"
      @onClick="onClick"
    />
  </div>

</template>
<script>
import tinymce from 'tinymce'

import Editor from '@tinymce/tinymce-vue'
/* 引入tinymce插件 */
import "tinymce/themes/silver"
/* 列表插件 */
import 'tinymce/plugins/lists'
/* 图片插件 */
import 'tinymce/plugins/image'
import 'tinymce/plugins/imagetools'   //图片编辑工具
import '/public/static/tinymce/axupimgs'   //  多图上传
/* 媒体文件插件 */
import 'tinymce/plugins/media'
/* 表格插件 */
import 'tinymce/plugins/table'

/* 链接插件 */
import 'tinymce/plugins/link'
/* 源码插件 */
import 'tinymce/plugins/code'
/* 水平分割线插件 */
import 'tinymce/plugins/hr'

import 'tinymce/plugins/contextmenu'


export default {
  name: 'TinymceEditor',
  components: {
    Editor
  },
  props: {
    // 传入一个value，使组件支持v-model绑定
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
      default: 'lists image imagetools axupimgs media table contextmenu hr code'
    },
    toolbar: {
      type: [String, Array],
      default: () => ['code font_formats forecolor backcolor bold italic strikethrough underline fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image axupimgs media table hr | removeformat']
    },
    id: {
      type: Number,
      default: null,
    }
  },
  data() {
    return {
      // 初始化配置
      init: {
        language_url: '/static/tinymce/langs/zh_CN.js',    // 中文包
        language: 'zh_CN', // 中文
        skin_url: '/static/tinymce/skins/ui/oxide',        // skin路径(外观样式)
        content_css: '/static/tinymce/skins/content/default/content.css',     //以css文件方式自定义可编辑区域的css样式，css文件需自己创建并引入
        plugins: this.plugins,    // 指定需加载的插件
        toolbar: this.toolbar,    // 工具栏配置
        height: 500,
        fontsize_formats: '12px 14px 16px 18px 20px 24px 26px 28px 30px 32px 36px', // 字体大小
        font_formats: '微软雅黑=Microsoft YaHei,Helvetica Neue;PingFang SC;sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun;serifsans-serif;Terminal=terminal;monaco;Times New Roman=times new roman;times', // 字体
        lineheight_formats: '0.5 1 1.2 1.5 1.6 1.8 2 2.4',    // 行高配置
        auto_focus: true,         // 自动获得焦点
        readonly: false,          // 只读模式
        branding: false,      // tiny技术支持信息是否显示
        menubar: false,       // 菜单栏配置
        statusbar: false,     // 最下方的元素路径和字数统计那一栏是否显示
        elementpath: false,   // 元素路径是否显示
        resize: false,        // 编辑器宽高是否可变，false-否,true-高可变，'both'-宽高均可，注意引号
        content_style: "",    // 直接自定义可编辑区域的css样式
        paste_data_images: false,    //图片是否可粘贴
        placeholder: '请输入文本内容',
        // images_upload_url: '',  //后端处理程序的url，建议直接自定义上传函数image_upload_handler，这个就可以不用了
        // images_upload_base_path: '/demo',  //相对基本路径
        setup:(editor)=> {
          // 初始化前执行的函数
        },
        init_instance_callback:(editor)=> {
          // 初始化结束后执行的回调函数

        },
        // 此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
        // 如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
        images_upload_handler: (blobInfo, success, failure) => {
          const img = 'data:image/jpeg;base64,' + blobInfo.base64()
          success(img)

        }
      },
      eContent: this.content
    }
  },
  watch: {
    content(newValue) {
      this.eContent = newValue
    },
    eContent(newValue) {
      this.$emit('input', newValue)
    }
  },
  mounted() {
    /* tinymce.init({}) */
  },
  created() {

  },
  methods: {
    // 添加相关的事件，可用的事件参照文档=> https://github.com/tinymce/tinymce-vue => All available events

    onClick(e) {
      /* this.$emit('onClick', e, tinymce) */
    },
    // 可以添加一些自己的自定义事件，如清空内容
    clear() {
      //this.eContent = ''
    }
  }

}
</script>
<style lang="scss" scoped>

</style>
