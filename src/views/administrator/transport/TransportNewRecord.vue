<template>
  <!-- 新任务备案-->
  <div>
    <el-dialog title="新运输作业备案" :visible.sync="createTaskCard" >
      <el-form ref="dataForm" :rules="rules" :model="applyData" label-position="right" label-width="150px" style="width:1100px">
        <el-form-item label="工地名称">
          <el-input v-model="applyData.siteName"   placeholder="请输入工地名称" required="工地名称不得为空"/>
        </el-form-item>
        <el-form-item label="所属辖区">
          <el-select  v-model="applyData.region" class="filter-item" placeholder="请选择工地所在辖区">
            <el-option v-for="item in region" :label="item.value" :key="item.id" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="工地地址">
          <el-input v-model="applyData.adress"  placeholder="请选择工地所在详情地址" disabled/>
        </el-form-item>
        <el-form-item label="渣土类型">
          <el-select  v-model="applyData.soilType" class="filter-item" placeholder="请选择工地产生少渣土类型">
            <el-option v-for="item in soilType" :label="item.value" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="建设单位">
          <el-input v-model="applyData.constructionUnit"   placeholder="请输入建设单位名称" required="建设单位名称不得为空"/>
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="applyData.constructionUser"   placeholder="请输入建设单位联系人" required="建设单位联系人不得为空"/>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="applyData.constructionPhone"   placeholder="请输入建设单位联系方式" required="建设单位联系方式不得为空"/>
        </el-form-item>
        <el-form-item label="施工单位">
          <el-input v-model="applyData.workUser"   placeholder="请输入施工单位名称" required="施工单位名称不得为空"/>
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="applyData.workUser"   placeholder="请输入施工单位联系人" required="施工单位联系人不得为空"/>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="applyData.workPhone"   placeholder="请输入施工单位联系方式" required="施工单位联系方式不得为空"/>
        </el-form-item>
        <el-form-item label="建设面积">
          <el-input v-model="applyData.siteArea"   placeholder="请输入施工工地建设面积" required="施工工地建设面积不得为空"/>
          <p class="input-unit">平方米</p>
        </el-form-item>
        <el-form-item label="渣土处置量">
          <el-input v-model="applyData.soilAmount"   placeholder="请输入预计工地渣土处置量" required="预计工地渣土处置量不得为空"/>
          <p class="input-unit">立方米</p>
        </el-form-item>
        <el-form-item label="运输类型">
          <el-select  v-model="applyData.tranType" class="filter-item" placeholder="请选择渣土运输类型">
            <el-option v-for="item in transportType" :label="item.value" :value="item.type" />
          </el-select>
        </el-form-item>
        <el-form-item label="运输日期" prop="timestamp" >
          <el-date-picker
                v-model="selectTranDate"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                :change="changTranDate()">
              </el-date-picker>
        </el-form-item>
        <template v-if="applyData.tranType == 'external'">
        <el-form-item label="消纳场">
          <el-input v-model="applyData.adress"  placeholder="请选择收土点消纳场" disabled/>
        </el-form-item>
        <el-form-item label="消纳场辖区">
          <el-input disabled/>
        </el-form-item>
        <el-form-item label="所属单位">
          <el-input disabled/>
        </el-form-item>
        <el-form-item label="消纳场地址">
          <el-input disabled/>
        </el-form-item>
        <el-form-item label="外运线路">
          <el-input  :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="请输入外运线路信息" />
        </el-form-item>
        </template>
        <el-form-item label="转运说明" v-if="applyData.tranType == 'internal'">
          <el-input  :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="请输入场内转运说明" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input  :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="请输入备注说明信息" />
        </el-form-item>
        <el-form-item label="承诺书">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createTaskCard = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
/* import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
import waves from '@/directive/waves'
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' */


export default {
  name: 'TransportNewRecord',
  components: {  },
  data() {
    return {
      selectTranDate:'',
      region: [   //行政区域
        {id:1, value: '谢家集区'},
        {id:2, value: '田家庵区'},
        {id:3, value: '八公山区'},
        {id:4, value: '燔集区'},
        {id:5, value: '山南新区'},
        {id:6, value: '大通区'},
        {id:7, value: '经济开发区'},
      ],
      soilType: [   //渣土类型
        {id:1, value: '土方渣土'},
        {id:2, value: '建筑垃圾'},
        {id:3, value: '装修垃圾'},
      ],
      transportType: [    //运输类型
        {id:1, value: '场外运输',type: 'external'},
        {id:2, value: '场内倒运',type: 'internal'},
      ],
      applyData: {
        siteName:'',          //工地名称
        region:'',            //工地所属辖区
        adress:'',            //工地地址
        longitude:'',         //经度
        latitude:'',          //纬度
        constructionUnit:'',  //建设单位
        constructionUser:'',  //建设单位联系人
        constructionPhone:'', //建设单位联系方式
        workUnit:'',          //施工单位
        workUser:'',          //施工单位联系人
        workPhone:'',         //施工单位联系方式
        siteArea:'',          //工地面积
        soilAmount:'',        //预计渣土处置量
        soilType:'',          //渣土类型
        tranType:'external',  //运输类型：external(默认) / internal
        tranStartDate:'',     //运输开始日期
        tranEndDate:'',       //运输结束日期
        promiseFile:'',       //承诺书附件
        shuntingFile:'',      //调车单附件
        siteFreeProveFile:'', //出土点不收费证明附件
        tranContractFile:'',  //运输合同附件
        workLicenseFile:'',   //施工许可证附件
        tranApplyFile:'',     //运输申请函附件
        otherFile:'',         //其他附件

        absorptiveId:'',      //消纳场ID
        submitTranRoad:'',    //提交外运线路
        absorptiveProveFile:'',   //消纳场证明附件
        absorptiveFreeProveFile:'',   //收土点不收费证明附件
      },
      createTaskCard: true,   //卡片显隐控制
      dialogStatus: '',

      showReviewer: false,
      dialogStatus: '',
      dialogPvVisible: false,
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    //选择运输开始-结束日期
    changTranDate(){
      this.applyData.tranStartDate = this.selectTranDate[0];
      this.applyData.tranEndDate = this.selectTranDate[1];
    },
    
    /* 图片上传相关方法*/
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {    //上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
    
    getList() {

    },
    handleFilter() {
      /* this.listQuery.page = 1
      this.getList() */
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    handleCreate() {

    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(tempData).then(() => {
            const index = this.list.findIndex(v => v.id === this.temp.id)
            this.list.splice(index, 1, this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'warning',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row, index) {
      this.$notify({

        message: 'Delete Successfully',
        type: 'warning',

      })
      this.list.splice(index, 1)
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>
