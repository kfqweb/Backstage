<template>
  <el-container class="container">
    <el-header class="header">
      <Headers></Headers>
    </el-header>
    <el-container>
      <el-aside width="200px" class="aside">
        <Aside></Aside>
      </el-aside>
      <el-container>
        <el-main class="main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script type='text/ecmascript-6'>
import Headers from '@/components/Headers.vue'
import Aside from '@/views/aside/Aside.vue'
export default {
  beforeCreate() {
    // 判断是否登录，token
    var token = sessionStorage.getItem('token')
    if (!token) {
      // 提示
      this.$message.warning('请先登录')
      // 没有token，跳转到登录页面
      this.$router.push('/login')
    }
  },
  data() {
    return {}
  },
  components: {
    Headers,
    Aside
  }
}
</script>

<style type='text/css'>
.container {
  height: 100%;
}
.header {
  background-color: #b3c0d1;
  padding: 0;
}
.header .title {
  text-align: center;
  color: white;
  font-size: 24px;
  line-height: 60px;
}
.header .logout {
  line-height: 60px;
}
.header .logout a {
  color: orange;
  text-decoration: none;
}
.aside {
  background-color: #d3dce6;
}
.el-menu-vertical-demo {
  height: 100%;
}
.main {
  overflow: hidden;
  background-color: #e9eef3;
}
</style>
