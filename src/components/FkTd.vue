<template>

  <!-- 若需使用合并单元格，即在引用时给merge属性-->
  <div class="self-td" :class="[type === 'img' ? tdImg : '']" :style="tdStyle">
    <p class="self-td-title">{{ label }}</p>

    <!-- 图片表格-->
    <div v-if="type === 'img'" class="self-td-cont">
      <showImg :url-str="url" />
    </div>

    <!-- 文字表格-->
    <div v-else class="self-td-cont">
      <!-- <el-tooltip placement="bottom-start">
        <div slot="content"><slot></slot></div>
        <p>
          <slot></slot>
        </p>
      </el-tooltip> -->
      <el-popover trigger="click" placement="bottom">
        <p><slot /></p>
        <p slot="reference" :style="pStyle">
          <slot />
        </p>
      </el-popover>
    </div>
  </div>
</template>
<script>
export default {
  name: 'FkTd',
  // 如果有传URL值，则使用图片表格，若无，则使用文字表格
  props: {
    label: String,
    url: String,
    merge: {
      type: Boolean,
      default : false,
    },
    type: {
      /* type类型为两种：text=>文本（默认值）；img=>图片*/
      type: String,
      default: 'text',
    },
    colors: String
  },
  data() {
    return {
      tdImg: 'self-td-img',
      tdStyle: {},
      pStyle: {},
      pColor: '',
    }
  },
  created() {
    if (this.colors) {
      switch (this.colors) {
        case 'blue':
          this.pColor = '#409EFF'
          break
        case 'green':
          this.pColor = '#67C23A'
          break
        case 'yellow':
          this.pColor = '#E6A23C'
          break
        case 'red':
          this.pColor = '#F56C6C'
          break
        default:
          this.pColor = this.colors
          break
      }
      this.pStyle = { color: this.pColor }
    }

    if (this.merge) {
      this.tdStyle = { width: '100%' }
    }
  },
  methods: {},


}
</script>
<style scoped>
</style>
