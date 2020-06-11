<template>
  <div>
    <ul>
      <li>管理员信息</li>
      <li>
        管理员ID:
        <span>{{id}}</span>
      </li>
      <li>
        账号:
        <span>{{account}}</span>
      </li>
      <li>
        用户组:
        <span>{{userGroup}}</span>
      </li>
      <li>
        创建时间:
        <span>{{ctime}}</span>
      </li>
      <li>
        管理员头像:
        <img :src="imgUrl" alt />
        <div>
          <el-upload
            class="avatar-uploader"
            action="http://127.0.0.1:5000/users/avatar_upload"
            :data="data"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { API_Accountinfo } from "@/api/apis.js";
export default {
  data() {
    return {
      id: localStorage.id,
      account: "",
      userGroup: "",
      ctime: "",
      imageUrl: "",
      data: { id: localStorage.id },
      imgUrl:""
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      window.location.reload()
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  },

  created() {
    API_Accountinfo(localStorage.id).then(res => {
      this.account = res.data.accountInfo.account;
      this.userGroup = res.data.accountInfo.userGroup;
      this.ctime = res.data.accountInfo.ctime;
      this.imgUrl = res.data.accountInfo.imgUrl;
    });
  }
};
</script>

<style lang="less" scoped>
ul {
  list-style: none;
  // width: 100%;
  // height: 100%;
  border: 1px solid #cccccc;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
  li {
    display: flex;
    padding: 20px 0;
    border-bottom: 1px solid #cccccc;
    span {
      margin-left: 10px;
    }
    img {
      width: 178px;
      vertical-align: middle;
      border: 1px dashed #d9d9d9;
      margin-left: 10px;
    }
  }
  li:last-child {
    border-bottom: none;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>