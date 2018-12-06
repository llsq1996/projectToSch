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
        <el-form-item label="地址" prop="addressList"  required>
          <el-cascader
            :options="options2"
            @active-item-change="handleItemChange"
            :props="props"
            v-model="originData.addressList"
          ></el-cascader>
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
    this.$http.get('/api/getProvince').then(ref => {
      if (ref.body.code === 1) {
        let data = ref.body.data
        data.forEach(x => {
          let opt = {
            label: x.province,
            value: x.provinceid,
            children: []
          }
          this.options2.push(opt)
        })
      } else {
        this.$message({
          showClose: true,
          message: '服务器返回错误',
          type: 'error'
        })
      }
    })
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
      uploadData: {name: ''},
      options2: [],
      props: {
        label: 'label',
        value: 'value',
        children: 'children'
      },
      area: []
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
      let str = ''
      //深层复制
      let shop = JSON.parse(JSON.stringify(this.originData))
      shop.addressList.forEach(x => {
        console.log('x:', x)
        str += x + ','
      })
      shop.addressList = str
      console.log(shop)
      this.$http.post('/api/shopAdd', shop).then(ref => {
        if (ref.body.code === 1) {
          this.$message({
            showClose: true,
            message: '提交成功',
            type: 'success'
          })
        }
      })
      // this.$refs.newUpload.submit()
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    handleItemChange (val) {
      console.log(this.area)
      if (val.length === 1) {
        // 如果遍历到的省份就是选择的省份，同时该省份下的市没有插入，则插入这个省份的市
        this.options2.forEach(i => {
          if (i.value === val[0]) {
            if (i.children.length === 0) {
              // 按照省查询市
              this.$http.get('/api/getCity?provinceId=' + val[0]).then(ref => {
                if (ref.body.code === 1) {
                  let data = ref.body.data
                  // 将根据省份的id查询到的市包装插入
                  data.forEach(x => {
                    let opt = {
                      label: x.city,
                      value: x.cityid,
                      children: []
                    }
                    i.children.push(opt)
                  })
                } else {
                  this.$message({
                    showClose: true,
                    message: '服务器返回错误',
                    type: 'error'
                  })
                }
              })
            }
          }
        })
      } else if (val.length === 2) {
        this.options2.forEach(each => {
          // 找省
          if (each.value === val[0]) {
            each.children.forEach(t => {
              // 找市
              if (t.value === val[1]) {
                if (t.children.length === 0) {
                  this.$http.get('/api/getArea?cityId=' + val[1]).then(ref => {
                    if (ref.body.code === 1) {
                      let data = ref.body.data
                      data.forEach(x => {
                        let opt = {
                          label: x.area,
                          value: x.areaid
                        }
                        t.children.push(opt)
                      })
                    } else {
                      this.$message({
                        showClose: true,
                        message: '服务器返回错误',
                        type: 'error'
                      })
                    }
                  })
                }
              }
            })
          }
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
