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
      <el-form ref="originData" :model="originData"  label-width="120px" size="medium ">
        <el-form-item label="类别" prop="category"  required>
          <el-select v-model="originData.category" >
            <el-option
              v-for="item in category"
              :key="item.label"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="配送方式" prop="delivery"  required>
          <el-select v-model="originData.delivery" >
            <el-option
              v-for="item in delivery"
              :key="item.label"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商家名称" prop="spName" required>
          <el-col :span="12">
            <el-input  placeholder="请输入名称" v-model="originData.spName" clearable></el-input>
          </el-col>
        </el-form-item>
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
        <el-form-item label="商家负责人" prop="leader"  required>
          <el-col :span="8">
            <el-input  placeholder="请输入负责人" v-model="originData.leader" clearable></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="联系电话" prop="leaderPhone"  required>
          <el-col :span="10">
            <el-input  placeholder="请输入电话" v-model="originData.leaderPhone" type="telephone" clearable></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="客服电话" prop="cusPhone"  required>
          <el-col :span="10">
            <el-input  placeholder="请输入电话" v-model="originData.cusPhone" clearable></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="起送价" prop="deliPrice"  required>
          <el-col :span="10">
            <el-input  placeholder="请输入起送价" v-model="originData.deliPrice" clearable></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="配送费" prop="dispatch"  required>
          <el-col :span="10">
            <el-input  placeholder="请输入配送费" v-model="originData.dispatch" clearable></el-input>
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
        <el-form-item label="资质logo" prop="logo">
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
            :before-upload="handleBefore"
            :on-success="handPicSuccess">
            <i class="el-icon-plus"></i>
            <div class="el-upload__tip" slot="tip">只能上传jpg文件，且不超过500kb</div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
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
    let name = this.Cookie.getCookie('user')
    if (name) {
      this.originData.worker = unescape(name)
    }
  },
  data () {
    return {
      originData: {
        category: 1,
        isTradeMark: 0,
        delivery: 1,
        worker: ''
      },
      id: '',
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
      delivery: [
        {
          label: '商家自配',
          value: 1
        },
        {
          label: '美团专送',
          value: 2
        },
        {
          label: '美团快送',
          value: 3
        },
        {
          label: '混合送',
          value: 4
        }
      ],
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
      dialogImageUrl: '',
      dialogVisible: false,
      uploadUrl: '/api/pic',
      pictureList: [],
      uploadData: {name: '', id: '', user: ''},
      picSuccess: false,
      uploadUrlExcel: '/api/excel2',
      fileList: [],
      fileData: {name: '', id: '', user: ''},
      fileSuccess: false,
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
      let types = file.name.split('.')
      console.log(types)
      if (types[1] !== 'jpg') {
        this.$message.error('上传文件类型错误，已取消该文件上传')
        return false
      }
      this.uploadData.name = file.name
      this.uploadData.user = this.originData.worker
    },
    handleBeforeExcel (file) {
      console.log(file)
      let types = file.name.split('.')
      console.log(types)
      if (types[1] !== 'xls' && types[1] !== 'xlsx') {
        this.$message.error('上传文件类型错误，已取消该文件上传')
        return false
      }
      this.fileData.name = file.name
      this.fileData.user = this.originData.worker
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    handPicSuccess (response, file, fileList) {
      this.picSuccess = true
    },
    handExSuccess (response, file, fileList) {
      this.fileSuccess = true
    },
    formSubmit () {
      // 若已提交，但图片或文档格式错误，只重复提交图片或文档
      if (this.id) {
        // 提交图片
        console.log(this.id)
        if (!this.picSuccess) {
          this.uploadData.id = this.id
          this.$refs.newUpload.submit()
        }
        if (!this.fileSuccess && this.originData.isTradeMark === 1) {
          this.fileData.id = this.id
          this.$refs.excUpload.submit()
        }
      } else {
        // 将要提交的对象先复制一份，对复制后的对象进行处理后提交
        let str = ''
        // 深层复制
        let shop = JSON.parse(JSON.stringify(this.originData))
        if (shop.addressList) {
          shop.addressList.forEach(x => {
            console.log('x:', x)
            str += x + ','
          })
        }
        shop.addressList = str
        console.log(shop)
        // 首次提交门店信息
        this.$http.post('/api/shopAdd', shop).then(ref => {
          if (ref.body.code === 1) {
            this.$message({
              showClose: true,
              message: '提交成功',
              type: 'success'
            })
            // 再提交图片和excel
            if (ref.body.data) {
              this.id = ref.body.data
              this.uploadData.id = ref.body.data
              this.$refs.newUpload.submit()
              if (shop.isTradeMark === 1) {
                this.fileData.id = ref.body.data
                this.$refs.excUpload.submit()
              }
            }
          } else {
            this.$message({
              showClose: true,
              message: ref.body.message,
              type: 'error'
            })
          }
        })
      }
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.id = ''
    },
    handleItemChange (val) {
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
