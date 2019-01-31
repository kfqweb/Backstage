<template>
  <el-row>
    <el-col :span="24">
      <el-breadcrumb class="crumbs" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/home' }">用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
  </el-row>
</template>

<script type='text/ecmascript-6'>
export default {
  data() {
    return {}
  }
}
</script>

<style type='text/css'>
.crumbs {
  height: 40px;
  line-height: 40px;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}
</style>
