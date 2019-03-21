<template>
  <div >
    <el-row>
      <br/>
      <el-col  :span="22" :offset="1">
        <el-card >
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{path:'/index'}" ><b style="cursor: pointer;color: goldenrod">&nbsp;&nbsp;首页</b><b> / 人员录入</b></el-breadcrumb-item>
          </el-breadcrumb>
        </el-card>
      </el-col>
      <br/>  <br/>  <br/> <br/>
      <el-col :span="22" :offset="1">
        <el-card >
      <el-form ref="originData" :model="originData" label-width="120px" size="medium ">
        <el-form-item label="用户名" prop="userName" required>
          <el-col :span="12">
            <el-input  placeholder="请输入用户名" v-model="originData.userName" clearable></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="密码" prop="password" required>
          <el-col :span="12">
            <el-input  placeholder="请输入密码" v-model="originData.password" clearable></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="管理权限" prop="isAdmin" required>
          <el-select v-model="originData.isAdmin" >
            <el-option
              v-for="item in isAdmin"
              :key="item.label"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核权限" prop="isAudit" required>
          <el-select v-model="originData.isAudit" >
            <el-option
              v-for="item in isAudit"
              :key="item.label"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-col><br/></el-col>
        <el-form-item>
          <el-button type="primary" @click="formSubmit()">提交</el-button>
          <el-button type="danger" @click="resetForm('originData')">重置</el-button>
        </el-form-item>
      </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'UserAdd',
  created () {
    this.admin = unescape(this.Cookie.getCookie('isAdmin'))
    if (this.admin !== '1') {
      this.$message.error('无管理员权限')
    }
  },
  data () {
    return {
      originData: {
        isAdmin: 0,
        isAudit: 0
      },
      id: '',
      admin: 2,
      isAdmin: [
        {
          label: '有',
          value: 1
        },
        {
          label: '无',
          value: 0
        }
      ],
      isAudit: [
        {
          label: '无',
          value: 0
        },
        {
          label: '有',
          value: 1
        }
      ]
    }
  },
  methods: {
    formSubmit () {
      if (this.admin === '1') {
        this.$http.post('/api/userAdd', this.originData).then(x => {
          if (x.body.code === 1) {
            this.$message.success('success')
          } else {
            this.$message.error('error')
          }
        })
      } else {
        this.$message.error('无管理员权限')
      }
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }

  }
}
</script>

<style scoped>

</style>
