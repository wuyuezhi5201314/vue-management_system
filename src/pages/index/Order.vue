<template>
  <div class="main">
    <div class="content">
      <div class="input_box">
        <div>
          <p>订单号</p>
          <el-input placeholder="请输入内容" v-model="orderNo"></el-input>
        </div>
        <div>
          <p>收货人</p>
          <el-input placeholder="请输入内容" v-model="consignee"></el-input>
        </div>
        <div>
          <p>手机号</p>
          <el-input placeholder="请输入内容" v-model="phone"></el-input>
        </div>

        <div>
          <p>订单状态</p>
          <el-input placeholder="请输入内容" v-model="orderState"></el-input>
        </div>
      </div>

      <div class="block">
        <span class="demonstration">选择时间</span>
        <el-date-picker
          v-model="date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
        <el-button type="primary" icon="el-icon-search" class="serch_btn" @click="serch_btn">查询</el-button>
      </div>

      <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed prop="orderNo" label="订单号" width="100"></el-table-column>
        <el-table-column prop="orderTime" label="下单时间" width="170"></el-table-column>
        <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
        <el-table-column prop="consignee" label="收货人" width="120"></el-table-column>
        <el-table-column prop="deliverAddress" label="配送地址" width="250"></el-table-column>
        <el-table-column prop="deliveryTime" label="送达时间" width="170"></el-table-column>
        <el-table-column prop="remarks" label="用户备注" width="120"></el-table-column>
        <el-table-column prop="orderAmount" label="订单金额" width="120"></el-table-column>
        <el-table-column prop="orderState" label="订单状态" width="120"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small">查看</el-button>
            <el-button
              @click="handleClick(scope.row),dialogFormVisible = true"
              type="text"
              size="small"
            >编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="修改订单信息" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="订单号" :label-width="formLabelWidth">
            <el-input v-model="form.orderNo" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="收货人" :label-width="formLabelWidth">
            <el-input v-model="form.consignee" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机号" :label-width="formLabelWidth">
            <el-input v-model="form.phone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="下单时间" :label-width="formLabelWidth">
            <el-input v-model="form.orderTime" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="收货地址" :label-width="formLabelWidth">
            <el-input v-model="form.deliverAddress" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="送达时间" :label-width="formLabelWidth">
            <el-input v-model="form.deliveryTime" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="订单金额" :label-width="formLabelWidth">
            <el-input v-model="form.orderAmount" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="订单状态" :label-width="formLabelWidth">
            <el-input v-model="form.orderState" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input v-model="form.remarks" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleOK">确 定</el-button>
        </div>
      </el-dialog>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { API_OrderList, API_OrderEdit } from "@/api/apis";
export default {
  data() {
    return {
      tableData: [],
      //分页
      currentPage: 1, //当前页码
      pageSize: 10, //每页条数
      total: 100, //总条数
      orderNo: "", //订单号
      consignee: "", //收货人
      phone: "", //电话
      orderState: "", //订单状态
      // date:'',//时间范围
      date: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)], //时间选择器
      dialogFormVisible: false,
      formLabelWidth: "120px",
      form: {
        orderNo:'',
        consignee:'',
        phone:'',
        orderTime:'',
        deliverAddress:'',
        deliveryTime:'',
        orderAmount:'',
        orderState:'',
        remarks:''
      }
    };
  },
  methods: {
    //转日期的格式
    resolvingDate(date) {
      //date是传入的时间
      let d = new Date(date);
      let month =
        d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
      let day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
      let hours = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
      let min = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
      let sec = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();
      let times =
        d.getFullYear() +
        "-" +
        month +
        "-" +
        day +
        "" +
        hours +
        ":" +
        min +
        ":" +
        sec;
      return times;
    },
    // 点击打开修改模态框
    handleClick(row) {
      this.form = row;
    },
    //点击确定发送修改请求
    handleOK() {
      
      API_OrderEdit(
        this.form.id,
        this.form.orderNo,
        this.form.orderTime,
        this.form.phone,
        this.form.consignee,
        this.form.deliverAddress,
        this.form.deliveryTime,
        this.form.remarks,
        this.form.orderAmount,
        this.form.orderState
      ).then(res => {
        console.log(res);
      });
      this.dialogFormVisible = false;
    },
    //分页
    handleSizeChange(val) {
      this.OrderList(this.currentPage, val);
    },
    handleCurrentChange(val) {
      this.OrderList(val, this.pageSize);
    },
    //获取列表
    OrderList(currentPage, pageSize) {
      API_OrderList(currentPage, pageSize).then(res => {
        this.total = res.data.total;
        res.data.data.map(item => {
          item.orderTime = this.resolvingDate(item.orderTime);
          item.deliveryTime = this.resolvingDate(item.deliveryTime);
        });
        this.orderNo = res.data.data.orderNo;
        this.consignee = res.data.data.consignee;
        this.phone = res.data.data.phone;
        this.orderState = res.data.data.orderState;
        this.date = res.data.data.date;
        this.tableData = res.data.data;
      });
    },

    //点击查询
    serch_btn() {
      API_OrderList(
        this.currentPage,
        this.pageSize,
        this.orderNo,
        this.consignee,
        this.phone,
        this.orderState,
        this.date
      ).then(res => {
        res.data.data.map(item => {
          item.orderTime = this.resolvingDate(item.orderTime);
          item.deliveryTime = this.resolvingDate(item.deliveryTime);
        });
        this.tableData = res.data.data;
      });
    }
  },
  created() {
    this.OrderList(this.currentPage, this.pageSize);
  }
};
</script>

<style lang="less" scoped>
.main {
  display: flex;
  flex-direction: column;

  .content {
    background: #ffffff;
    .input_box {
      display: flex;
      margin-top: 20px;
      > div {
        display: flex;
        align-items: center;
        width: 250px;
        margin-left: 10px;
        input {
          width: 150px;
        }
        p {
          width: 100px;
          text-align: center;
        }
      }
    }
    .block {
      margin: 20px 0 50px 24px;
      .serch_btn {
        margin-left: 10px;
      }
      .demonstration {
        margin-right: 8px;
      }
    }
    .el-pagination {
      margin: 10px 0 100px 4px;
    }
  }
}
</style>