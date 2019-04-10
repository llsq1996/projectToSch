<template>
  <div>
    <br/>
    <el-row >
      <el-col :span="24" >
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{path:'/index'}" ><b style="cursor: pointer">&nbsp;&nbsp;首页</b></el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <hr/>
    <br/>
    <el-col :span="1" :offset="1">
      <b>welcome</b>
    </el-col>

  </div>
</template>

<script>
export default {
  created () {

  },
  data () {
    return {

    }
  },
  methods: {
  }
}
</script>
