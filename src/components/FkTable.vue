<template>
  <!-- 默认为一般三个单元格，若使用一行两个单元格，即在引入时加入class为self-table-two，即可-->
  <div class="self-table">
    <slot />
  </div>
</template>
<script>
export default {
  name: 'FkTable',
  data() {
    return {}
  },
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped>

</style>
