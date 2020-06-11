<template>
  <div class="classaccount">
    <div class="title">
      <h3>商品分类</h3>
      <el-button
        type="primary"
        size="small"
        @click="dialogFormVisible = true"
        class="addcate_btn"
      >添加分类</el-button>

      <el-dialog title="添加分类" :visible.sync="dialogFormVisible" width="40%">
        <el-form :model="form">
          <el-form-item label="分类名称" :label-width="formLabelWidth">
            <el-input v-model="cateName" placeholder="分类名称"></el-input>
          </el-form-item>
          <el-form-item label="是否启用" :label-width="formLabelWidth">
            <el-switch v-model="valueadd" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addcate">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <el-table :data="cateList" style="width: 100%">
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column prop="cateName" label="分类名称" width="180"></el-table-column>
      <el-table-column label="是否启用" width="180">
        <el-switch
          v-model="value"
          active-color="#13ce66"
          inactive-color="#ff4949"
          @change="changeStatus"
        ></el-switch>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit_EditCate( scope.row),dialogFormVisible2 = true">编辑</el-button>
          <el-dialog title="修改分类信息" :visible.sync="dialogFormVisible2" width="30%">
            <el-form :model="form">
              <el-form-item label="商品分类" :label-width="formLabelWidth">
                <el-input v-model="form.cateName" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="是否启用" :label-width="formLabelWidth">
                <el-switch v-model="value1" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible2 = false">取 消</el-button>
              <el-button type="primary" @click="handleD_EditCate">确 定</el-button>
            </div>
          </el-dialog>
          <el-popconfirm title="确定删除此分类吗?" @onConfirm="handleDelete(scope.row)">
            <el-button size="mini" type="danger" slot="reference">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-size="pagesize"
      :current-page="currentPage"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import {
  API_CateList,
  API_AddCate,
  API_DelCate,
  API_EditCate
} from "@/api/apis";

export default {
  data() {
    return {
      cateList: [],
      value: true,
      value1: true,
      pagesize: 8, //每页显示条目个数
      total: 20, //总条数
      currentPage: 1, //当前页
      dialogFormVisible: false, //点击取消关闭添加商品模态框
      dialogFormVisible2: false,//点击取消关闭编辑商品模态框
      formLabelWidth: "120px",
      valueadd: true,
      cateName: "",
      form: {
        id: "",
        cateName: "",
        state: ""
      }
    };
  },
  methods: {
    changeStatus(data) {
      console.log(data);
    },
    //编辑
    handleEdit_EditCate(row) {
      this.form = row;
    },
    //点击编辑里面的确定发送请求并关闭模态框
    handleD_EditCate() {
      API_EditCate(
        this.form.id,
        this.form.cateName,
        (this.form.state = this.value1)
      ).then(res => {
        if (res.data.code == 0) {
          this.$message({
            message: "修改成功",
            type: "success"
          });
        } else {
          this.$message.error("修改失败,请重试");
        }
      });
      this.dialogFormVisible2 = false;
      this.catelist()
    },
    // 删除
    handleDelete(row) {
      API_DelCate(row.id).then(res => {
        if (res.data.code == 0) {
          this.$message({
            message: "删除成功",
            type: "success"
          });
        } else {
          this.$message.error("删除失败,请重试");
        }
      });
      this.catelist();
    },
    handleSizeChange(val) {
      API_CateList(this.currentPage, val).then(res => {
        this.cateList = res.data.data;
      });
    },
    handleCurrentChange(val) {
      API_CateList(val, this.pagesize).then(res => {
        this.cateList = res.data.data;
      });
    },
    // 添加分类
    addcate() {
      API_AddCate(this.cateName, this.valueadd).then(res => {
        if (res.data.code == 0) {
          this.$message({
            message: "添加成功",
            type: "success"
          });
        } else {
          this.$message.error("添加失败,请重试");
        }
      });
      this.catelist();
      this.dialogFormVisible = false;
    },
    //获取商品分类列表
    catelist() {
      API_CateList(this.currentPage, this.pagesize).then(res => {
        this.cateList = res.data.data;
        this.total = res.data.total;
      });
    }
  },
  created() {
    // 获取商品分类列表
    this.catelist();
  }
};
</script>

<style lang="less" scoped>
.classaccount {
  .title {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #cccccc;
    margin-top: 0;
    .addcate_btn {
      height: 30px;
      margin: 20px 20px 2px 0;
    }
    h3 {
      text-indent: 20px;
      margin: 10px 0;
    }
  }
  background-color: #ffffff;
  padding-bottom: 30px;
}
</style>