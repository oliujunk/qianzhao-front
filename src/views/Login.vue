<template>
  <el-container>
    <el-header>
    </el-header>
    <el-main>
      <div>
        <div class="title">
          <h3>系统登录</h3>
        </div>
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
          <el-form-item>
            <el-input
              ref="username"
              v-model="loginForm.username"
              prefix-icon="el-icon-user"
              placeholder="用户名"
              autocomplete="on"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-tooltip
              v-model="capsTooltip"
              content="大写锁定"
              placement="right" manual
            >
              <el-input
                ref="password"
                v-model="loginForm.password"
                prefix-icon="el-icon-key"
                placeholder="密码"
                autocomplete="on"
                show-password
                @keyup.native="checkCapsLock"
                @blur="capsTooltip = false"
                @keyup.enter.native="handleLogin"
              ></el-input>
            </el-tooltip>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              style="width: 520px; height: 47px; font-size: 1.2em;"
              @click="handleLogin"
            >登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
    <el-footer>Copyright© 2020 武汉新普惠科技有限公司</el-footer>
  </el-container>
</template>

<script>
import { validUsername } from '@/utils/validate';

export default {
  name: 'Login',

  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: '',
        password: '',
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
      },
      capsTooltip: false,
      loginLoading: false,
    };
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus();
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus();
    }
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loginLoading = true;
          this.$http.post('/login', {
            username: this.loginForm.username,
            password: this.loginForm.password,
          })
            .then((response) => {
              if (response.status === 200 && response.data) {
                sessionStorage.setItem('username', this.loginForm.username);
                this.$router.push('/data');
              } else {
                this.$message.error('登录失败');
              }
            })
            .catch((error) => {
              console.log(error);
              this.$message.error('登录失败');
            });
          return true;
        }
        return false;
      });
    },
    checkCapsLock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if (shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z')) {
          this.capsTooltip = true;
        } else {
          this.capsTooltip = false;
        }
      }
      if (key === 'CapsLock' && this.capsTooltip === true) {
        this.capsTooltip = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.el-container {
  background-color: #2d3a4b;
  height: 100%;
}

.el-header {
  text-align: right;
  margin-top: 20px;
  margin-right: 20px;
}

.title {
  font-size: 26px;
  color: #eee;
  margin: 120px auto 60px auto;
  text-align: center;
  font-weight: bold;
}

.login-form {
  width: 520px;
  max-width: 100%;
  margin: 0 auto;
  overflow: hidden;
}

.el-input::v-deep .el-input__inner {
  background: transparent;
  color: #ddd;
  caret-color: #ddd;
  border: 2px solid rgba(255, 255, 255, 0.1);
  height: 47px;
}

.el-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.5em;
  background-color: rgba(0,0,0,0.2);
  color: white;
}
</style>
