<template>
  <div class="account">
    <h3>商品列表</h3>
    <!-- 表格 -->
    <el-table :data="goodsList" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品ID">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="所属分类">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="商品图片">
              <!-- <span>{{ props.row.id }}</span> -->
              <el-image :src="props.row.imgUrl" style="width:100px;height:100px"></el-image>
            </el-form-item>
            <el-form-item label="商品评价">
              <span>{{ props.row.ratings }}</span>
            </el-form-item>
            <el-form-item label="商品描述">
              <span>{{ props.row.goodsDesc }}</span>
            </el-form-item>
            <el-form-item label="商品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="商品价格">
              <span>{{ props.row.price }}</span>
            </el-form-item>
            <el-form-item label="创建时间">
              <span>{{ props.row.ctime}}</span>
            </el-form-item>
            <el-form-item label="商品销量">
              <span>{{ props.row.rating }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" prop="name"></el-table-column>
      <el-table-column label="所属分类" prop="category"></el-table-column>
      <el-table-column label="商品价格" prop="price"></el-table-column>
      <el-table-column label="商品图片">
        <template slot-scope="scope">
          <el-image :src="goodsList[scope.$index].imgUrl" style="width:100px;height:100px"></el-image>
        </template>
      </el-table-column>
      <el-table-column label="商品描述" prop="goodsDesc"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row),dialogFormVisible = true">编辑</el-button>

          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
              <el-dialog title="修改商品信息" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <el-form-item label="商品名称" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="商品分类" :label-width="formLabelWidth">
                <el-select v-model="form.category" placeholder="请选择活动区域">
                  <el-option
                    v-for="item in options"
                    :key="item.cateName"
                    :label="item.cateName"
                    :value="item.cateName"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="商品价格" :label-width="formLabelWidth">
                <el-input v-model="form.price" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="图片上传" :label-width="formLabelWidth">
                <el-upload
                  class="avatar-uploader"
                  action="http://127.0.0.1:5000/goods/goods_img_upload"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="form.imgUrl" :src="form.imgUrl" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="商品描述" :label-width="formLabelWidth">
                <el-input v-model="form.goodsDesc" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="handleD">确 定</el-button>
            </div>
          </el-dialog>

    <!-- 分页 -->
    <div class="block">
      <el-pagination
        layout="prev, pager, next"
        :total="1000"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pagesize"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import {
  API_GoodsList,
  API_DelGoods,
  API_CateGories,
  API_GoodsEdit
} from "@/api/apis"; //,API_GoodsEdit
export default {
  data() {
    return {
      goodsList: [], //商品列表
      total: "",
      currentPage: 1, //当前页码
      pagesize: 10,
      ctime: "", //创建时间
      goodsDesc: "", //商品描述
      ratings: [], //商品评价
      category: "", //所属分类
      name: "", //商品名称
      price: "", //商品价格
      rating: "", //商品销量
      formLabelWidth: "120px",
      dialogFormVisible: false,
      form: {},
      options: [], //商品分类
    };
  },
  methods: {
    handleSizeChange(val) {
      this.goodsClass(this.currentPage, val);
    },
    handleCurrentChange(val) {
      this.goodsClass(val, this.pagesize);
    },
    //获取商品列表
    goodsClass(currentPage, pagesize) {
      API_GoodsList(currentPage, pagesize).then(res => {
        this.goodsList = res.data.data;
        for (let obj of this.goodsList) {
          obj.imgUrl =
            "http://127.0.0.1:5000//upload/imgs/goods_img/" + obj.imgUrl;
        }
        this.goodsList.category = res.data.data.category;
        this.goodsList.rating = res.data.data.rating;
        this.ctime = res.data.data.ctime;
        this.goodsDesc = res.data.data.goodsDesc;
        this.ratings = res.data.data.ratings;
        this.goodsList.name = res.data.data.name;
        this.goodsList.price = res.data.data.price;
      });
    },
    //删除商品
    handleDelete(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          API_DelGoods(row.id).then(res => {
            if (res.data.code == 0) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.goodsClass(this.currentPage, this.pagesize);
            } else {
              this.$message({
                message: "删除失败!请重试"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //点击编辑打开模态框
    handleEdit(row) {
      this.form = row;
      // console.log(row.imgUrl);
      this.newUrl = row.imgUrl.substr(row.imgUrl.lastIndexOf("/") + 1);
      // console.log(this.newUrl);
      
    },
    //点击提交修改商品信息
    handleD() {
      API_GoodsEdit(
        this.form.name,
        this.form.category,
        this.form.price,
        this.newUrl,
        this.form.goodsDesc,
        this.form.id
      ).then(res => {
        if (res.data.code == 0) {
          this.$message({
            type: "success",
            message: "修改成功!"
          });
        } else {
          this.$message({
            message: "修改失败!请重试"
          });
        }
      });
      this.dialogFormVisible = false;
    },
    //图片上传成功
    handleAvatarSuccess(res, file) {
      this.form.imgUrl = URL.createObjectURL(file.raw);
      this.newUrl = res.imgUrl; 
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
    this.goodsClass(this.currentPage, this.pagesize);
    // 商品分类列表
    API_CateGories().then(res => {
      this.options = res.data.categories;
    });
  }
};
</script>

<style lang="less" scoped>
.account {
  background-color: #ffffff;
  padding-bottom: 30px;
  h3 {
    border-bottom: 1px solid #cccccc;
    margin-top: 0;
    line-height: 40px;
    text-indent: 20px;
  }
  .block {
    margin: 20px 10px;
  }

  //   表格样式
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
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