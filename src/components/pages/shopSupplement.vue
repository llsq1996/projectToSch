<template>
  <div >
    <el-row>
      <el-col>
        <br/>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{path:'/index'}" ><b style="cursor: pointer">&nbsp;&nbsp;首页</b><b> / 品牌商家补录</b></el-breadcrumb-item>
        </el-breadcrumb>
        <hr/>
        <br/>
      </el-col>
      <el-form ref="originData" :model="originData" label-width="120px" size="medium ">
        <el-form-item label="品牌商家" pror="isTradeMark" required>
          <el-select v-model="originData.isTradeMark" >
            <el-option
              v-for="item in isTradeMark"
              :key="item.label"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="品牌商家文档" prop="world">
          <el-upload
            class="upload-demo"
            :auto-upload="false"
            :action="uploadUrlExcel"
            ref="excUpload"
            :limit="1"
            :before-upload="handleBeforeExcel"
            :on-exceed="handleExceed"
            :on-success="handExSuccess"
            :data="fileData"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传.xls和.xlsx的excel文件，且不超过1Mb,非品牌商家不会上传</div>
          </el-upload>
        </el-form-item>
        <el-col><br/></el-col>
      </el-form>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'shopSupplement',
  data () {
    return {
      isTradeMark: [
        {
          label: '非品牌商家',
          value: 0
        },
        {
          label: '品牌商家',
          value: 1
        }
      ],
      originData: [],
      uploadUrlExcel: '/api/excel',
      fileList: [],
      fileData: {name: '', id: ''},
      fileSuccess: false
    }
  }
}
</script>

<style scoped>

</style>
