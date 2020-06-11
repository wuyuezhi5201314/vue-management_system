<template>
  <div class="addacc">
    <h3>添加账号</h3>
    <div class="input-box">
      <p>账号</p>
      <el-input placeholder="用户名" v-model="user"></el-input>
    </div>

    <div class="input-box">
      <p>密码</p>
      <el-input placeholder="请输入密码" v-model="pwd" show-password></el-input>
    </div>

    <div class="input-box">
      <p>用户组</p>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>

    <el-button type="primary" size="medium" @click="add_btn">添加</el-button>
    <el-button plain size="medium">重置</el-button>
  </div>
</template>

<script>
import { API_Addacc } from "@/api/apis.js";
export default {
  data() {
    return {
      options: [
        {
          value: "超级管理员",
          label: "超级管理员"
        },
        {
          value: "普通管理员",
          label: "普通管理员"
        }
      ],
      value: "",
      user: "",
      pwd: "",
      error_add: true
    };
  },
  methods: {
    // 注册接口
    add_btn() {
      if (this.error_add == false) return;
      API_Addacc(this.user, this.pwd, this.value).then(res => {
        if (res.data.code == 0) {
          this.$message({
            message: "恭喜您,注册成功!!",
            center: true,
            type: "success"
          });
          setTimeout(() => {
            (this.user = ""), (this.pwd = ""), (this.value = "");
          }, 1000);
        } else {
          this.$message({
            message: "注册失败,请重试",
            center: true,
            type: "error"
          });
        }
      });
      this.error_add = false;
      setTimeout(() => {
        this.error_add = true;
      }, 3000);
    }
  }
};
</script>

<style lang="less" scoped>
.addacc {
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
    width: 400px;
    margin-left: 30px;
    margin-bottom: 18px;
    p {
      width: 100px;
      text-align: right;
      margin-right: 10px;
      line-height: 0;
    }
    input {
      width: 300px;
    }
    .el-select {
      width: 400px;
    }
  }
  .el-button:nth-of-type(1) {
    margin-left: 120px;
  }
}
</style>