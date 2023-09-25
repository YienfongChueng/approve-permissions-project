<template>
  <div class="login-head">
    <div class="login-img"></div>
    <div class="about">
      <h3>流程审批权限管理系统</h3>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="loginRuleForm"
        label-width="100px"
        class="demo-ruleForm">
        <el-form-item label="用户名" prop="account">
          <el-input v-model="ruleForm.account" clearable placeholder="请输入用户名"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" clearable placeholder="请输入密码"></el-input>
        </el-form-item>

        <el-form-item class="submit-btn">
          <el-button type="primary" @click="submitForm('loginRuleForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import md5 from 'md5'
import { loginApi } from '@/api/modules/user'
import { setToken } from '@/utils/auth'
export default {
  data() {
    return {
      ruleForm: {
        account: '', // admin
        password: '' // admin@123
      },
      rules: {
          account: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 1, max: 8, message: '长度在 1 到 8 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 18, message: '长度在 3 到 18 个字符', trigger: 'blur' }
          ]
      }

    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          // 未通过
            console.log('error submit!!')
            return false
        }
        // 通过
        const user = Object.assign({}, this.ruleForm, { password: md5(this.ruleForm.password) })
        loginApi(user).then(res => {
          if (res.data.status) {
            // 登陆成功
            this.$message.success('登录成功！')
            // 保存token
            setToken(res.data.token)
            // 保存user信息
            localStorage.setItem('loginUser', JSON.stringify(res.data))
            // 跳转首页
            this.$router.push('/index')
          }
        })
      })
    }
  }

}
</script>
<style lang="scss" scoped>
.login-head {
  .login-img {
    width: 100%;
    height: 500px;
    background: url(../assets/img/bj-4.jpg) no-repeat center $whiteColor;
  }
  .about {
    width: 500px;
    background-color: $whiteColor;
    padding: $padding;
    position: relative;
    left: 50%;
    transform: translate(-50%, -70%);
    box-shadow: 0 3px 21px 2px rgba(0,0,0,.3);
    border-radius: 10px;
    text-align: center;
    &>h3 {
      margin: $padding 0;
    }
    &>.demo-ruleForm {
      text-align: center;
    }
  }
}
.submit-btn {
   ::v-deep .el-form-item__content {
      margin-left: 0 !important;
   }
   ::v-deep .el-button {
     width: 200px;
   }
}
</style>
