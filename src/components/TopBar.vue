<template>
  <div class="top-bar-box">
    <p>{{ this.title }}</p>
  </div>
</template>

<script>
export default {
  props: ['title'],
  data() {
    return {}
  },
  mounted() {},
  methods: {}
}
</script>
<style scoped>
  .top-bar-box {
    width: 100%;
    height: 30px;
    line-height: 30px;
    background: #f7f7f7;
    border-left:4px solid #4c8fce;
    border-radius:3px;
    margin:10px 0;
  }
  .top-bar-box p {
    font-size: 15px;
    color: #4c8fce;
    font-weight: bold;
    margin: 0;
    display: inline-block;
    padding:0 10px;
  }
</style>
