<template>
  <div class="login">
    <div class="login-form">
      <div class="login-form__title" >后台管理系统</div>
      <el-form :model="loginForm" :rules="rules" ref="loginForm">
        <el-form-item prop="userName">
          <el-input v-model="loginForm.userName" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" round @click="handleLogin" :loading="loading">登录</el-button>
    </div>
  </div>
</template>

<script>
import {
  getLocalToken,
  setLocalToken,
  removeLocalToken,
} from '@/utils/auth';

export default {
  name: 'login',
  data() {
    return {
      loading: false,
      loginForm: {
        userName: '',
        password: '',
      },
      rules: {
        userName: [
          { required: true, message: '请输入用户名！', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码！', trigger: 'blur' }
        ],
      }
    };
  },
  computed: {

  },
  created() {
    if (getLocalToken()) {
      removeLocalToken(); // 移出Token
      location.reload();
    }
  },
  mounted() {

  },
  methods: {
    async handleLogin() {
      try {
        const loginForm = this.$refs.loginForm;
        loginForm && await loginForm.validate();
        this.loading = true;
        const params = {
          userName: this.loginForm.userName,
          password: this.loginForm.password,
        };
        const { code, token } = await this.$api.app.getToken(params);
        if (code === 0) {
          setLocalToken(token);
          this.$message({
            message: '登录成功！',
            type: 'success'
          });
          const {
            redirect,
          } = this.$route.query || {};
          if (redirect) {
            this.$router.push({
              path: redirect,
            }).catch(() => {});
          } else {
            this.$router.push({
              path: '/',
            }).catch(() => {});
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/var.scss";
.login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background: url(../../assets/img/login-bg.jpg) no-repeat top center;
  background-size: cover;
}
.login-form {
  width: 260px;
  padding: 40px;
  border-radius: 10px;
  background-color: #fff;
  &__title {
    text-align: center;
    margin-bottom: 30px;
    font-size: 24px;
  }
}
.el-button {
  width: 100%;
}
</style>
