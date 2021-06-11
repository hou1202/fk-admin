<template>
  <div v-if="value">
    <el-dialog
      :title="title"
      width="1000px"
      :append-to-body="true"
      :before-close="close"
      :close-on-click-modal="false"
      :visible.sync="winCard"
    >

      <el-form ref="dataForm" :rules="rules" :model="formData" label-position="top" label-width="150px" class="form-single-full">

        <el-form-item label="标题">
          <el-input v-model="formData.title" placeholder="请输入公告标题(必填)" required="公告标题不得为空" />
        </el-form-item>

        <el-form-item label="摘要">
          <el-input v-model="formData.v_title" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="请输入公告摘要说明" />
        </el-form-item>
        <el-form-item label="内容">
          <TinymceEditor
            ref="editor"
            v-model="formData.content"
            :content="formData.content"
            :disabled="disabled"

          />
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveDatas">
          保存
        </el-button>
      </div>
    </el-dialog>

  </div>

</template>

<script>

// 引入image-conversion - 图片压缩
import * as imageConversion from 'image-conversion'

import TinymceEditor from '/src/components/TinymceEditor'

export default {
  name: 'NoticeAdd',
  components: { imageConversion, TinymceEditor },
  props: {
    value: {
      type: Boolean,
    },
    title: {
      type: String,
      default: '新增公告',
    },
    noticeId: {
      type: Number,
      default: null,
    },
  },

  data() {
    return {
      winCard: true, // 卡片显隐控制
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      formData: {
        title: '',
        v_title: '',
        content: '',
      },
      disabled: false,

    }
  },
  created() {

  },
  methods: {
    close() {
      this.$emit('input', false)
    },

    // 提交数据
    saveDatas() {

      console.log(this.formData)

    }

  },
  watch: {
    /* 监听是否有ID，判断是新增公告还是编辑公告*/
    noticeId(newValue) {
      if(newValue) {
        this.formData = {
          title: 'G7将向全球捐10亿剂新冠疫苗？慈善组织批：杯水车薪',
          v_title: '【环球时报-环球网报道 记者 张继丹】七国集团（G7）峰会11日在英国康沃尔郡举行。据路透社报道，东道主英国首相约翰逊10日宣布，G7领导人将向全球提供超过10亿剂新冠疫苗，协助全球80%成年人接种，以期在2022年底前结束疫情',
          content: '在峰会前夕，美英两国分别宣布将捐赠5亿剂和1亿剂新冠疫苗。其中，英国将在未来数周提供500万剂，并于明年达到共捐赠1亿剂的目标，其中80%将通过新冠肺炎疫苗实施计划（COVAX）捐赠。美国总统拜登10日也宣布将购买5亿剂辉瑞疫苗，捐赠给92个低收入国家，并扬言美国将成为全球对抗新型肺炎的疫苗库。不过，乐施会表示，全球约有40亿人需要通过COVAX获得疫苗，迄今，COVAX只分发了8100万剂，世界上的几个地区，尤其是非洲，都缺乏供应。世卫组织官员表示，非洲大部分地区的疫苗接种率仅在1-2%之间。',
        }
      }else{
        this.formData = {
          title: '',
          v_title: '',
          content: '',
        }
      }
    }
  },

}
</script>
<style lang="scss" scoped>

  .form-single .el-form-item .el-form-item__content {
    width: 750px !important;
  }
</style>
