<template>
  <el-card class="card">
    <div class="header">
      <el-row>
        <el-col :span="4">
          <img src="@/assets/logo.png" alt>
        </el-col>
        <el-col :span="19">
          <div class="title">电商后台管理系统</div>
        </el-col>
        <el-col :span="1">
          <div class="logout">
            <a @click="logout" href="#">退出</a>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    logout () {
      // 删除 token
      sessionStorage.removeItem('token')
      // 跳转至 登录页面
      this.$router.push('/login')
    }
  }
}
</script>

<!--
  Add "scoped" attribute to limit CSS to this component only
  添加“scoped”属性以仅将CSS限制到此组件
-->
<style scoped>
</style>
