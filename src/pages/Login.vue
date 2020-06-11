<template>
  <div class="login-div">
    <div class="box">
      <h3>系统登录</h3>
      <p>
        <el-input v-model="input_user" placeholder="请输入用户名"></el-input>
      </p>
      <p>
        <el-input placeholder="请输入密码" v-model="input_pwd" show-password></el-input>
      </p>
      <el-button type="primary" @click="clickLogin">登录</el-button>
    </div>
  </div>
</template>

<script>
import { API_Login } from "@/api/apis.js";

export default {
  data() {
    return {
      input_user: "",
      input_pwd: "",
      logflag: true
    };
  },
  methods: {
    clickLogin() {
      if (this.logflag == false) return;
      API_Login(this.input_user, this.input_pwd).then(res => {
        if (res.data.code == 0) {
          console.log(res);
          
          this.$message("登录成功");
          localStorage.token=res.data.token;
          localStorage.acc = this.input_user;
          localStorage.id = res.data.id;
          localStorage.pwd = this.input_pwd;
          localStorage.role=res.data.role

          setTimeout(() => {
            this.$router.push("/index/home");
          }, 1000);
        } else {
          this.$message.error("用户名或密码错误,请重试");
        }
      });
      this.logflag = false;
      setTimeout(() => {
        this.logflag = true;
      }, 3000);
    }
  }
};
</script>

<style lang="less" scoped>
.login-div {
  background: #2d3a4b;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .box {
    width: 400px;
    text-align: center;
    h3 {
      color: #ffffff;
      margin-bottom: 20px;
    }
    p {
      margin-top: 15px;
    }
    .el-button {
      width: 100%;
    }
  }
}
</style>