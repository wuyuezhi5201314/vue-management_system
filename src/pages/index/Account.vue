<template>
  <div class="account">
    <h3>账号列表</h3>
    <!-- 表格 -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="account" label="账号" width="200"></el-table-column>
      <el-table-column prop="userGroup" label="用户组" width="200"></el-table-column>
      <el-table-column prop="ctime" label="创建时间" width="200"></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row.id,scope.row.account,scope.row.userGroup,dialogFormVisible = true)"
          >编辑</el-button>
          <el-button
            @click.native.prevent="deleteRow(scope.$index,scope.row)"
            type="danger"
            size="small"
            slot="reference"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

      <!-- 修改用户名弹出框 -->
    <el-dialog title="用户名修改" :visible.sync="dialogFormVisible" center width="40%">
      <el-form :model="form">
        <el-form-item label="用户ID" :label-width="formLabelWidth">
          <el-input v-model="form.id" autocomplete="off" disabled style="width:100px"></el-input>
        </el-form-item>
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.account" autocomplete="off" style="width:250px"></el-input>
        </el-form-item>
        <el-form-item label="用户组" :label-width="formLabelWidth">
          <el-select v-model="form.userGroup" placeholder="请选择分组" style="width:250px">
            <el-option label="超级管理员" value="超级管理员"></el-option>
            <el-option label="普通管理员" value="普通管理员"></el-option>
          </el-select>
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
        @size-change="handleSizeChange($event)"
        @current-change="handleCurrentChange($event)"
        :current-page="currentPage4"
        :page-sizes="[5, 10]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>

    <!-- 按钮 -->
    <el-button type="danger" @click="delusers">批量删除</el-button>
    <el-button type="primary" @click="toggleSelection()">取消选择</el-button>
  </div>
</template>

<script>
import { API_AccList } from "@/api/apis.js";
import { API_AccDel } from "@/api/apis.js";
import { API_batchdel } from "@/api/apis.js";
import { API_Edituser } from "@/api/apis.js";

export default {
  data() {
    return {
      rrentPage4: 4,
      // 当前页码
      currentPage4: 1,
      //  每页显示条目个数
      pagesize: 5,
      //总页数
      total: 1,
      // 表格内容数据
      tableData: [],
      //当前选中的id
      batchdel_user: [],

      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      // 弹出框需要修改的值
      form: {
        id: "",
        account: "",
        userGroup: ""
      },
    };
  },
  methods: {
    // 当前页面改变时值改变
    handleSizeChange(val) {
      API_AccList(this.currentPage4, val).then(res => {
        this.tableData = res.data.data;
      });
    },
    // 当前页面改变每页显示条目个数
    handleCurrentChange(val) {
      API_AccList(val, this.pagesize).then(res => {
        this.tableData = res.data.data;
      });
    },
    //删除当前行的账号
    deleteRow(index, row) {
      this.$confirm("此操作将永久删除该账号, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          API_AccDel(row.id).then(res => {
            console.log(res);
          });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          // 重新获取一次当前用户列表
          this.acclist();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 获取用户列表
    acclist() {
      API_AccList(this.currentPage4, this.pagesize).then(res => {
        this.tableData = res.data.data;
        for(let obj of this.tableData){
          console.log(obj.ctime);
          
        }
        
        this.total = res.data.total;
      });
    },
    //点击多选获取当前选中用户
    handleSelectionChange(val) {
      this.multipleSelection = val;
      for (let v of val) {
        this.batchdel_user.push(v.id);
      }
    },
    //点击批量删除发送删除请求
    delusers() {
      if (this.batchdel_user.length == 0) {
        this.$message({
          showClose: true,
          message: "请选择需要删除的账号!",
          type: "warning"
        });
        return;
      }

      this.$confirm("此操作将永久删除该账号, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let user = JSON.stringify(this.batchdel_user);
          API_batchdel(user).then(res => {
            if (res.data.code == 0) {
              console.log("ok");
            } else {
              console.log("删除失败");
            }
          });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          // 重新获取一次当前用户列表
          this.acclist();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //点击取消，取消多选
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },

    //点击编辑打开修改面板
    handleEdit(id, account, userGroup) {
      //  console.log(id,account,userGroup);
      this.form = { id, account, userGroup };
      console.log(this.from);
    },
    //点击提交发送修改用户名请求
    handleD() {
      console.log(this.form.account);
      API_Edituser(this.form.id, this.form.account, this.form.userGroup).then(
        res => {
          console.log(res);
        }
      );
      this.acclist();
      this.dialogFormVisible = false;
    }
  },

  //页面加载完成生命周期
  created() {
    // 获取账号列表
    this.acclist();
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
  .el-button:first-of-type {
    margin-left: 20px;
  }
}
</style>