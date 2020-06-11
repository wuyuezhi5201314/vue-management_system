<template>
  <div>
    <div class="content">
      <div>
        <img src="../../assets/imgs/1.png" alt />
        <div>
          <p>总订单</p>
          <p>{{totalOrder}}</p>
        </div>
      </div>
      <div>
        <img src="../../assets/imgs/2.png" alt />
        <div>
          <p>总销售额</p>
          <p>{{totalAmount}}</p>
        </div>
      </div>
      <div>
        <img src="../../assets/imgs/3.png" alt />
        <div>
          <p>今日订单数</p>
          <p>{{todayOrder}}</p>
        </div>
      </div>
      <div>
        <img src="../../assets/imgs/4.png" alt />
        <div>
          <p>今日销售额</p>
          <p>{{totayAmount}}</p>
        </div>
      </div>
    </div>
    <div id="echarts_box"></div>
  </div>
</template>

<script>
import { API_TotalData } from "@/api/apis";
import echarts from "echarts";
export default {
  data(){
    return{
      totalOrder:0,//总订单
      totalAmount:0,//总销售额
      todayOrder:0,//今日订单
      totayAmount:0//今日销售额
    }
  },
  mounted() {
    API_TotalData().then(res => {
      let {amountData,orderData,todayOrder,totalAmount,totalOrder,totayAmount,xData}=res.data
      this.totalOrder=totalOrder
      this.totalAmount=totalAmount
      this.todayOrder=todayOrder
      this.totayAmount=totayAmount
      

      var myecharts = echarts.init(document.getElementById("echarts_box"));
      let option = {
        title: {
          text: "数据统计"
        },
        tooltip: {
          trigger: "axis"
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data:xData //x轴数据
        },
        yAxis: {
          type: "value"
        },
        series: [//订单数据
          {
            name: "订单数据",
            type: "line",
            stack: "总量",
            data: orderData//订单数据
          },
          {
            name: "金额数据",
            type: "line",
            stack: "总量",
            data: amountData//金额数据
          }
        ]
      };

      myecharts.setOption(option);
    });
  }
};
</script>

<style lang="less" scoped>
.content {
  display: flex;
  justify-content: space-between;
  > div {
    padding: 10px;
    width: 250px;
    height: 60px;
    background: #ffffff;
    display: flex;
    align-items: center;
    border-radius: 10px;
    img {
      width: 50px;
      height: 50px;
      margin-left: 20px;
    }
    div {
      display: flex;
      flex-direction: column;
      margin-left: 80px;
      text-align: center;
      line-height: 5px;
      p:nth-child(1) {
        color: #cccccc;
        margin-bottom: 5px;
      }
      p:nth-child(2) {
        font-weight: bold;
      }
    }
  }
}
#echarts_box {
  width: 100%;
  height: 500px;
  background: #ffffff;
  margin-top: 20px;
  border-radius: 10px;
}
</style>