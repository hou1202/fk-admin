<template>

  <div class="self-th" :class="[url ? tdImg : '']" :style="tdStyle">
    <p :style="pStyle">
      <slot />
    </p>
  </div>
</template>
<script>
export default {
  name: 'FkTh',
  // 如果有传URL值，则使用图片表格，若无，则使用文字表格
  props: ['colors'],
  data() {
    return {

      tdStyle: {},
      pStyle: {},
      pColor: ''
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
  },
  methods: {}

}
</script>
<style scoped>
</style>
