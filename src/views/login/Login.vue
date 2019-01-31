<template>
  <div class="bgc">
    <el-form
      label-position="top"
      class="forms"
      label-width="80px"
      :model="formData"
      status-icon
      :rules="rules"
      ref="ruleForm">
      <el-form-item
        label="账号"
        prop="username">
        <el-input
          v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item
        label="密码"
        prop="password">
        <el-input
          v-model="formData.password"
          @blur="submitForm"
          @keyup.enter="submitForm"></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="24">
          <el-button
            class='login-botton'
            type="primary"
            @click="submitForm"
            @keyup.enter="submitForm">登录</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  data () {
    return {
      formData: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '账号不能为空', trigger: 'blur' },
          { min: 3, max: 5, message: '账号必须为五位以上', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 5, max: 8, message: '密码必须为 5 -- 8 位以上', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async submitForm() {
      this.$refs['ruleForm'].validate(async (valid) => {
        if (valid) {
          // 验证成功
          // 发送验证请求
          const response = await this.axios.post(`/login`, {
            'username': this.formData.username,
            'password': this.formData.password
          })
          const { data, meta: { status, msg } } = response.data
          if (status === 200) {
            // 存储 token
            window.sessionStorage.setItem('token', data.token)
            // 登录成功提示
            this.$message.success(msg)
            // 跳转页面
            this.$router.push('/home')
          } else {
            this.$message.error(msg)
          }
        } else {
          // 验证失败
          this.$message.error('验证规则不符合要求！！')
          return false
        }
      })
    },
    resetForm() {
      this.$refs['ruleForm'].resetFields()
    }
  }
}
</script>

<style type='text/css' scoped>
.bgc {
    background-color: #324152;
    height: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}
.forms {
    padding: 40px;
    width: 500px;
    border-radius: 5px;
    background-color: #fff;
}
.el-col-24 .login-botton {
    width: 100%;
    text-align: center;
}
</style>
