<template>
  <div class="changeacc">
    <h3>修改密码</h3>
    <div class="input-box">
      <p>原密码</p>
      <el-input v-model="oldpwd"></el-input>
      <span v-show="error">您的原始密码不正确</span>
    </div>

    <div class="input-box">
      <p>新密码</p>
      <el-input show-password v-model="newpwd"></el-input>
    </div>

    <div class="input-box">
      <p>确认密码</p>
      <el-input show-password></el-input>
    </div>

    <el-button type="primary" size="medium" @click="changePwd">提交</el-button>
    <el-button plain size="medium">重置</el-button>
  </div>
</template>

<script>
import { API_CheckOldPwd, API_EditPwd } from "@/api/apis";
export default {
  data() {
    return {
      oldpwd: "",
      error: false,
      newpwd: ""
    };
  },
  methods: {
    //点击提交修改密码
    changePwd() {
      //发送请求先验证旧密码
      API_CheckOldPwd(this.oldpwd, localStorage.id).then(res => {
        // 验证旧密码
        if (res.data.code == 0) {
          this.error = false;
          // 旧密码验证成功发送修改密码请求
          API_EditPwd(this.newpwd, localStorage.id).then(res => {
            // 修改密码成功
            if (res.data.code == 0) {
              this.$message({
                message:
                  "恭喜你,密码修改成功,即将为您跳转到登录页面....请稍等",
                type: "success"
              });
              setTimeout(()=>{
                this.$router.push("/#")
              },1500)
            }
          });
        } else {
          this.error = true;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.changeacc {
  background-color: #ffffff;
  padding-bottom: 30px;
  h3 {
    border-bottom: 1px solid #cccccc;
    margin-top: 0;
    line-height: 40px;
    text-indent: 20px;
  }
  .input-box {
    display: flex;
    width: 600px;
    margin-left: 30px;
    margin-bottom: 18px;
    p {
      width: 100px;
      text-align: right;
      margin-right: 10px;
      line-height: 0;
    }
    .el-input {
      width: 300px;
    }
    span {
      font-size: 12px;
      color: tomato;
      line-height: 40px;
      margin-left: 5px;
    }
  }
  .el-button:nth-of-type(1) {
    margin-left: 120px;
  }
}
</style>