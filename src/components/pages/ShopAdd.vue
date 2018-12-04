<template>
  <div >
    <el-row>
      <el-col>
        <br/>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{path:'/index'}" ><b style="cursor: pointer">&nbsp;&nbsp;首页</b><b> / 新建</b></el-breadcrumb-item>
        </el-breadcrumb>
        <hr/>
        <br/>
      </el-col>
      <el-form ref="originData" :model="originData" label-width="110px" size="medium ">
        <el-form-item label="类别" prop="category"  required>
          <el-select v-model="originData.category" placeholder="请选择">
            <el-option
              v-for="item in category"
              :key="item.label"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称" prop="spName" required>
          <el-col :span="10">
            <el-input  placeholder="请输入名称" v-model="originData.spName" clearable></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="负责人" prop="leader"  required>
          <el-col :span="10">
            <el-input  placeholder="请输入负责人" v-model="originData.leader" clearable></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="联系电话" prop="leaderPhone"  required>
          <el-col :span="10">
            <el-input  placeholder="请输入电话" v-model="originData.leaderPhone" clearable></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="客服电话" prop="cusPhone"  required>
          <el-col :span="10">
            <el-input  placeholder="请输入电话" v-model="originData.cusPhone" clearable></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="地址" prop="address"  required>
          <el-col :span="15">
            <el-input  placeholder="请输入地址" v-model="originData.address" clearable></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="logo" prop="upload">
          <el-upload
            :auto-upload="false"
            :action="uploadUrl"
            list-type="picture-card"
            ref="newUpload"
            :data="uploadData"
            :limit="4"
            :file-list="pictureList"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :before-upload="handleBefore">
            <i class="el-icon-plus"></i>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="formSubmit()">提交</el-button>
          <el-button type="danger" @click="resetForm('originData')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'ShopAdd',
  created () {

  },
  data () {
    return {
      originData: {},
      category: [
        {
          label: '药品鲜花',
          value: 1
        },
        {
          label: '水果',
          value: 2
        },
        {
          label: '超市',
          value: 3
        },
        {
          label: '便利店',
          value: 4
        }
      ],
      dialogImageUrl: '',
      dialogVisible: false,
      uploadUrl: '/api/pic',
      pictureList: [],
      uploadData: {name: ''}
    }
  },
  methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      console.log(this.dialogImageUrl)
      this.dialogVisible = true
    },
    handleBefore (file) {
      console.log(file)
      let types = file.type.split('/')
      console.log(types)
      this.uploadData.name = file.name
    },
    formSubmit () {
      console.log('submit')
      this.$http.post('/api/shopAdd', this.originData).then(ref => {
        if (ref) {
          console.log(ref)
        }
      })
      //this.$refs.newUpload.submit()
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>

</style>
