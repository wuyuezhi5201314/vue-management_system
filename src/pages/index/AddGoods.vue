<template>
  <div class="addgoods">
    <h3>商品添加</h3>

    <!-- 商品名称 -->
    <div class="input-box">
      <p>商品名称</p>
      <el-input class="goodname" v-model="goods_name"></el-input>
    </div>

    <!-- 商品分类 -->
    <div class="input-box">
      <p>商品分类</p>
      <el-select v-model="category" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.cateName"
          :label="item.cateName"
          :value="item.cateName"
        ></el-option>
      </el-select>
    </div>

    <!-- 商品价格 -->
    <div class="input-box">
      <p>商品价格</p>
      <el-input-number :min="1" :max="999" label="描述文字" v-model="price"></el-input-number>
    </div>
    <!-- 商品图片 -->
    <div class="input-box">
      <p>商品图片</p>
      <el-upload
        class="avatar-uploader"
        action="http://127.0.0.1:5000/goods/goods_img_upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>

    <!-- 商品描述 -->
    <div class="input-box">
      <p>商品描述</p>
      <el-input type="textarea" :rows="4" placeholder="请输入内容" class="textarea" v-model="goodsDesc"></el-input>
    </div>

    <!-- 按钮 -->
    <el-button type="primary" size="medium" @click="addgoods_btn">添加物品</el-button>
  </div>
</template>

<script>
import { API_CateGories,API_Goods_Add} from "@/api/apis";
export default {
  data() {
    return {
      // 商品分类
      options: [],
      imageUrl: "",//商品图片
      category:'',//商品分类
      goods_name:'',//商品名称
      price:'',//商品价格
      goodsDesc:'',//商品描述
      imgUrl:''
    };
  },
  methods: {
    //商品图片上传
    handleAvatarSuccess(res, file) {
      this.imgUrl=res.imgUrl
      this.imageUrl = URL.createObjectURL(file.raw);
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
    },
    //发送添加商品请求
    addgoods_btn(){
      API_Goods_Add(this.goods_name,this.category,JSON.stringify(this.price),this.imgUrl,this.goodsDesc).then((res)=>{
        if(res.data.code==0){
          this.$message({
          message: '添加商品成功',
          type: 'success'
        });
        }else{
          this.$message.error('添加失败,请重试');
        }
        window.location.reload()
        
      })
    }
  },
  created() {
    // 商品分类列表
    API_CateGories().then(res => {
      this.options = res.data.categories;
    });
  }
};
</script>

<style lang="less" scoped>
.addgoods {
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
    margin-left: 30px;
    margin-bottom: 18px;
    p {
      width: 100px;
      text-align: right;
      margin-right: 10px;
      line-height: 0;
    }
    .goodname {
      width: 400px;
    }
    .goodclass {
      width: 200px;
    }
    .el-select {
      width: 250px;
    }
    .textarea {
      width: 400px;
    }
  }
  .el-button {
    margin-left: 140px;
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
    border: 1px dashed #d9d9d9;
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