<template>
  <!-- 选择经纬度坐标-->
  <!-- 父组件中需定义选中接收事件：@selected-point-->
  <div v-if="value">
    <el-dialog
      title="选择地址"
      width="1000px"
      append-to-body
      :before-close="close"
      :close-on-click-modal="false"
      :visible.sync="mapSelectPonitCard"
    >
      <el-form ref="searchForm" class="el-search">
        <el-form-item>
          <el-input
            v-model="searchData"
            resize="none"
            placeholder="请输入检索区域"
          />
        </el-form-item>
        <el-button icon="el-icon-search" @click="submitSearchForm">
          查 询
        </el-button>
      </el-form>
      <el-form class="form-map">
        <el-form-item label="经度:">
          <el-input v-model="returnData.lat" readonly />
        </el-form-item>
        <el-form-item label="纬度:">
          <el-input v-model="returnData.lng" readonly />
        </el-form-item>
        <el-form-item label="地址:" style="margin: 0;width:40%">
          <el-input v-model="returnData.address" readonly />
        </el-form-item>

      </el-form>

      <!-- 地图加载-->
      <div id="allmap" style="width:940px;height:500px;" />

      <div slot="footer" class="dialog-footer">
        <el-button @click="close()">
          取消
        </el-button>
        <el-button type="primary" @click="sureAbsorSelect">
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'MapSelectPonit',
  props: ['value'],
  data() {
    return {
      mapSelectPonitCard: true,
      searchData: '',
      pointImg: require('@/assets/point.png'),
      returnData: {
        lng: null,
        lat: null,
        address: ''
      }, // 选中数据
      map: null
    }
  },
  watch: {
    value(v) {
      if (this.value) {
        this.returnData.lng = null
        this.returnData.lat = null
        this.returnData.address = ''
        this.searchData = '',

        // 百度地图API功能
        setTimeout(() => {
          this.map = new BMap.Map('allmap')
          var point = new BMap.Point(117.028161, 32.635982)
          this.map.centerAndZoom(point, 12) // 创建中心点坐标及地图层级
          this.map.enableScrollWheelZoom(true)

          // 单击获取点击的经纬度
          this.map.addEventListener('click', e => {
            this.map.clearOverlays()
            this.returnData.lng = e.point.lng
            this.returnData.lat = e.point.lat

            // 创建Marker自定义标注图标
            var myIcon = new BMap.Icon(this.pointImg, new BMap.Size(33, 40))
            var marker = new BMap.Marker(new BMap.Point(e.point), { icon: myIcon })
            this.map.addOverlay(marker)

            // 地址逆解析
            new BMap.Geocoder().getLocation(e.point, res => {
              this.returnData.address = res.address
            })
          })
        }, 1000)
      }
    }
  },
  methods: {

    /** 确定地图中选择的经纬度信息
     * 父组件定义选中接收方法：@selected-point
     * */
    sureAbsorSelect() {
      if (!this.returnData.lat || !this.returnData.lng || !this.returnData.address) { return this.$message.warning('请选择具体位置信息！') }

      this.$emit('selected-point', this.returnData)
      this.$emit('input', false)
    },

    close() {
      this.$emit('input', false)
    },

    // 搜索位置
    submitSearchForm() {
      var localSearch = new BMap.LocalSearch(this.map, {
        renderOptions: { map: this.map }
      })
      localSearch.search(this.searchData)
    }
  }
}
</script>
<style scoped>
.el-form {
  position: relative;
}
.el-form .el-form-item {
  width:calc(100% - 130px)
}
/deep/ .el-form .el-form-item .el-form-item__content {
  width: 100% !important;
}
/deep/ .el-form .el-form-item .el-form-item__content .el-input {
  width: 100% !important;
}
.el-form .el-button {
  height:33px;
  position: absolute;
  top: 0px;
  right: 0;
}
.form-map:first {

}
.form-map .el-form-item {
  width: 25%;
  margin-right: 5%;
}
/deep/ .form-map .el-form-item .el-form-item__content {
  width: calc(100% - 60px) !important;
}
/deep/ .form-map .el-form-item .el-form-item__content .el-input .el-input__inner {
  border: none !important;
  padding-left: 0;
}
#allmap {
  border:1px solid #DCDFE6;
  border-radius: 3px;
}

</style>
