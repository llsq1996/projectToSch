<template>
  <div >
    <el-row>
      <el-col>
        <br/>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{path:'/index'}" ><b style="cursor: pointer">&nbsp;&nbsp;首页</b><b> / 人员录入</b></el-breadcrumb-item>
        </el-breadcrumb>
        <hr/>
        <br/>
      </el-col>
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
        <el-form-item label="管理权限" pror="isAdmin" required>
          <el-select v-model="originData.isAdmin" >
            <el-option
              v-for="item in isAdmin"
              :key="item.label"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核权限" pror="isAudit" required>
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
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'UserAdd',
  created () {

  },
  data () {
    return {
      originData: {
        isAdmin: 1,
        isAudit: 0
      },
      id: '',
      isAdmin: [
        {
          label: '是',
          value: 1
        },
        {
          label: '否',
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
      this.$http.post('/api/userAdd', this.originData).then(x => {
        if (x.body.code === 1) {
          this.$message.success('success')
        } else {
          this.$message.error('error')
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }

  }
}
</script>

<style scoped>

</style>
