<template>
  <el-card class="card">
    <Crumbs></Crumbs>
    <el-row class="search">
      <el-col :span="7">
        <el-input placeholder="请输入内容">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col class="btn" :span="3">
        <el-button type="success" plain @click="handleShowAdd = true">添加</el-button>
      </el-col>
    </el-row>
    <el-table :data="usersList" style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column prop="create_time" label="时间"></el-table-column>
      <el-table-column  label="用户状态">
        <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle></el-button>
          <el-button type="success" icon="el-icon-check" circle></el-button>
          <el-button type="danger" icon="el-icon-delete" circle @click="handleDelete(scope.row.id)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加对话框 -->
    <el-dialog
      title="收货地址"
      :visible.sync="handleShowAdd">
      <el-form
        label-width="80px"
        :model="formData"
        :rules="rules"
        ref="ruleForm">
        <el-form-item
          label="用户名"
          prop="username">
          <el-input
            v-model="formData.username"
            autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password">
          <el-input
            v-model="formData.password"
            autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input
            v-model="formData.email"
            autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input
            v-model="formData.mobile"
            autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancelUsers">取 消</el-button>
        <el-button type="primary" @click="handleAddUsers">确 定</el-button>
      </div>
   </el-dialog>
   <!-- 编辑对话框 -->
  </el-card>
</template>

<script type='text/ecmascript-6'>
import Crumbs from '@/components/Crumbs.vue'
export default {
  data() {
    return {
      usersList: [],
      query: '',
      pagenum: 1,
      pagesize: 10,
      // 显示添加对话框
      handleShowAdd: false,
      // 添加用户的数据存储
      formData: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 添加用户验证
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 5, message: '用户名必须为五位以上', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 5, max: 8, message: '密码必须为 5 -- 8 位以上', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getAll()
  },
  methods: {
    async getAll () {
      const response = await this.axios.get(`users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
      const { data, meta: { status } } = response.data
      if (status === 200) {
        // this.$message.success(msg)
        this.usersList = data.users
      }
    },
    // 删除数据
    async handleDelete (id) {
      const response = await this.axios.delete(`users/${id}`)
      const { meta: { msg, status } } = response.data
      if (status === 200) {
        this.$message.success(msg)
        this.getAll()
      } else {
        this.$error.success(msg)
      }
    },
    // 取消编辑handleCancelUsers
    handleCancelUsers () {
      // 这样不好，会在内存中重复开空间。所以尽量不要使用这样的方式
      // this.formData = {}
      for (var key in this.formData) {
        this.formData[key] = ''
      }
    },
    // 确认编辑
    handleAddUsers () {
      this.$refs['ruleForm'].validate(async (valid) => {
        if (valid) {
          // 验证成功
          // 发送验证请求
          const response = await this.axios.post(`/users`, {
            username: this.formData.username,
            password: this.formData.password,
            email: this.formData.email,
            mobile: this.formData.mobile
          })
          const { meta: { msg, status } } = response.data
          if (status === 201) {
            this.$message.success(msg)
            this.handleShowAdd = false
            this.getAll()
          } else {
            this.$message.error(msg)
          }
        } else {
          // 验证失败
          this.$message.error('验证规则不符合要求！！')
          return false
        }
      })
      this.handleCancelUsers()
    }
  },
  components: {
    Crumbs
  }
}
</script>

<style type='text/css' scoped>
.card {
  padding: 10px;
}
.card .search {
  margin-top: 10px;
}
.btn {
  margin-left: 10px;
}
</style>
