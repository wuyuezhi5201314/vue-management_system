<template>
  <div class="shop-box">
    <p class="tit">店铺管理</p>
    <div>
      <p>店铺名称:</p>
      <el-input placeholder="请输入店铺名称" v-model="name"></el-input>
    </div>
    <div>
      <p>店铺公告:</p>
      <el-input type="textarea" :rows="4" placeholder="请输入公告" v-model="bulletin"></el-input>
    </div>

    <div>
      <p>店铺头像:</p>
      <img :src="avatar" alt />
      <!-- <el-upload
        class="avatar-uploader"
        action="http://127.0.0.1:5000/shop/upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>-->
    </div>

    <div class="shop-img">
      <p>店铺图片:</p>
      <div>
        <img :src="pics" alt />
      </div>
      <div>
        <img :src="pics" alt />
      </div>
      <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog>
        <img width="100%" src="#" alt />
      </el-dialog>
    </div>

    <div>
      <p>配送费:</p>
      <el-input v-model="deliveryPrice"></el-input>
    </div>

    <div>
      <p>配送时间:</p>
      <el-input v-model="deliveryTime"></el-input>
    </div>

    <div>
      <p>配送描述:</p>
      <el-input v-model="description"></el-input>
    </div>

    <div>
      <p>店铺评分:</p>
      <el-input v-model="score"></el-input>
    </div>

    <div>
      <p>销量:</p>
      <el-input v-model="sellCount"></el-input>
    </div>

    <div>
      <p>活动</p>
      <el-checkbox-group v-model="supports">
        <el-checkbox label="单人精彩套餐"></el-checkbox>
        <el-checkbox label="VC无限橙果汁全场8折"></el-checkbox>
      </el-checkbox-group>
    </div>

    <div>
      <p>营业时间:</p>
      <div class="block">
        <el-date-picker
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </div>
    </div>
  </div>
</template>

<script>
import { API_ShopInfo } from "@/api/apis";
export default {
  //
  data() {
    return {
      // 复选框
      checkList: ["1", "2", "3"],
      // 上传头像
      imageUrl: "",
      name: "", //店铺名称
      bulletin: "", //店铺公告
      avatar: "", //店铺头像
      deliveryPrice: "", //配送费
      deliveryTime: "", //送达时间
      description: "", //描述
      score: "", //评分
      sellCount: "", //销量
      supports: [], //活动
      pics: "", //店铺图片
      date: "", //date
      minPrice: "" //起送价格
    };
  },
  methods: {
    // 头像上传
    // handleAvatarSuccess(res, file) {
    //   this.imageUrl = URL.createObjectURL(file.raw);
    // },
    // beforeAvatarUpload(file) {
    //   const isJPG = file.type === "image/jpeg";
    //   const isLt2M = file.size / 1024 / 1024 < 2;
    //   if (!isJPG) {
    //     this.$message.error("上传头像图片只能是 JPG 格式!");
    //   }
    //   if (!isLt2M) {
    //     this.$message.error("上传头像图片大小不能超过 2MB!");
    //   }
    //   return isJPG && isLt2M;
    // }
  },
  created() {
    API_ShopInfo().then(res => {
      this.name = res.data.data.name;
      this.bulletin = res.data.data.bulletin;
      this.avatar = "http://127.0.0.1:5000/upload/shop/" + res.data.data.avatar;
      let newPic = res.data.data.pics;//店铺图片
      newPic.forEach(item => {
        newPic="http://127.0.0.1:5000/upload/shop/" +item;
      });
      this.pics = newPic;

      this.deliveryPrice = res.data.data.deliveryPrice;
      this.deliveryTime = res.data.data.deliveryTime;
      this.description = res.data.data.description;
      this.score = res.data.data.score;
      this.sellCount = res.data.data.sellCount;
      this.supports = res.data.data.supports;

      // data:
      // data:
      // avatar: "1590473180839.webp"
      // bulletin: "尊敬的客官，六一攻略：
      // ↵①6月1日当天在评价区分享童年趣事赠6元无门槛红包
      // ↵②下单时在订单备注处填写【六一儿童节快乐】随机赠送“回忆杀爆款玩具”，数量有限，送完即止。
      // ↵提前预祝大小宝宝节日开心。"
      // date: (2) ["1970-01-01 08:00:00", "1970-01-01 22:30:00"]
      // deliveryPrice: 4
      // deliveryTime: 38
      // description: "蜂鸟专送"
      // id: 1
      // minPrice: 20
      // name: "乡村基(高新金融店)"
      // pics: (4) ["1590480883773.webp", "1590480886706.webp", "1590480889717.webp", "1590482092433.webp"]
      // score: 4.5
      // sellCount: 100
      // supports: Array(2)
      // 0: "单人精彩套餐"
      // 1: "VC无限橙果汁全场8折"
      // length: 2
    });
  }
};
</script>

<style lang="less" scoped>
.shop-box {
  background: #ffffff;
  border-radius: 5px;
  padding-bottom: 30px;

  > .tit {
    margin-top: 0;
    border-bottom: 1px solid #cccccc;
    line-height: 40px;
    text-indent: 10px;
  }
  > div {
    display: flex;
    width: 500px;
    margin-left: 30px;
    margin-bottom: 18px;
    p {
      width: 100px;
      text-align: right;
      margin-right: 8px;
      line-height: 0;
    }
  }
  .shop-img {
    width: 500px;
    flex-wrap: wrap;
    div:nth-child(2),
    div:nth-child(3) {
      width: 150px;
      height: 150px;
      margin-left: 10px;
      border: 1px solid #cccccc;
      border-radius: 5px;
      overflow: hidden;
      .el-upload-list {
        margin-left: 100px !important;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
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