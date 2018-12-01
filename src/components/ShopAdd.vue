<template>
  <div >
    <el-row>
      <el-col>
        <br/>
      </el-col>
      <el-form ref="originData" :model="originData" label-width="80px" size="medium " >
        <el-form-item label="名称" prop="spName">
          <el-col :span="8">
            <el-input  placeholder="请输入内容" v-model="originData.spName" clearable></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-col :span="8">
            <el-input  placeholder="请输入内容" v-model="originData.address" clearable></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="负责人" prop="leader">
          <el-col :span="8">
            <el-input  placeholder="请输入内容" v-model="originData.leader" clearable></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="联系电话" prop="leaderPhone">
          <el-col :span="8">
            <el-input  placeholder="请输入内容" v-model="originData.leaderPhone" clearable></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="客服电话" prop="cusPhone">
          <el-col :span="8">
            <el-input  placeholder="请输入内容" v-model="originData.cusPhone" clearable></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="类别" prop="category">
         <el-select v-model="originData.category" placeholder="请选择">
            <el-option
              v-for="item in category"
              :key="item.label"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="logo" prop="picAddress">
          <el-upload
            :auto-upload="false"
            action="picUpload"
            list-type="picture-card"
            :limit="4"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :before-upload="handleBefore">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item>
          <el-button @click="formSubmit()">提交</el-button>
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
      picUpload: '/api/pic',
      pictureList: []
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
    },
    formSubmit () {
      console.log(this.pictureList)
    }
  }
}
</script>

<style scoped>

</style>
