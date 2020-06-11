<template>
  <el-container>
    <el-aside width="200px" class="aside-main">
      <h3>外卖商家中心</h3>

      <!-- 左侧树状菜单数据 -->
      <el-menu
        :default-active="defaultActive"
        class="el-menu-vertical-demo"
        background-color="#304156"
        text-color="#fff"
        active-text-color="#409EFF"
        unique-opened
        router
      >
        <div v-for="item in newmenuList" :key="item.index">
          <!-- 带二级菜单的展示栏 -->
          <el-submenu v-if="item.children" :index="item.index">
            <template slot="title">
              <i :class="item.icls"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item-group v-for="child in item.children" :key="child.index">
              <el-menu-item :index="child.index">{{child.title}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- 不带展开的菜单 -->
          <el-menu-item v-else :index="item.index">
            <i :class="item.icls"></i>
            <span slot="title">{{item.title}}</span>
          </el-menu-item>
        </div>
      </el-menu>
    </el-aside>
    <el-container>
      <!-- 顶部结构 -->
      <el-header class="links">
        <div>
          <!-- 面包屑导航 -->
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-for="item in breadList" :key="item">{{item}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="user-title">
          <p><span v-html="username"></span></p>
          <div @click="$router.push('/index/personal')">
            <img
              :src="imgUrl"
              alt
            />
          </div>
        </div>
      </el-header>

      <!-- 主体结构 -->
      <el-main class="main-content">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import {API_Checktoken,API_Accountinfo} from '@/api/apis'
export default {
  data() {
    return {
      // 左侧树状菜单数据  index：hash跳转值   icls：图标
      menuList: [
        { index: "/index/home", icls: "el-icon-menu", title: "后台首页",role:["super","normal"] },
        { index: "/index/order", icls: "el-icon-document", title: "订单管理" ,role:["super","normal"] },
        {
          index: "3",
          icls: "el-icon-location",
          title: "商品管理",
          role:["super","normal"],
          children: [
            { index: "/index/goods", title: "商品列表" },
            { index: "/index/addgoods", title: "商品添加" },
            { index: "/index/classgoods", title: "商品分类" }
          ]
        },
        { index: "/index/shop", icls: "el-icon-setting", title: "店铺管理",role:["super"]  },
        {
          index: "5",
          icls: "el-icon-location",
          title: "账号管理",
          role:["super"],
          children: [
            { index: "/index/account", title: "账号列表" },
            { index: "/index/addacc", title: "添加账号" },
            { index: "/index/changeacc", title: "修改密码" }
          ]
        },
        {
          index: "6",
          icls: "el-icon-location",
          title: "销量统计",
          role:["super"],
          children: [
            { index: "/index/sale", title: "商品统计" },
            { index: "/index/saletwo", title: "订单统计" }
          ]
        }
      ],
      // 面包屑导航数据
      breadList: ["首页"],
      // 树菜单默认选中
      defaultActive: "",
      username:'',
      role:localStorage.role,
      imgUrl:"imgUrl"//用户头像
    };
  },

  methods: {
    //面包屑导航根据hash值改变效果
    changeBredList(hash) {
      let arr = [];
      switch (hash) {
        case "/index/home":
          arr = ["首页"];
          break;
        case "/index/order":
          arr = ["订单管理"];
          break;
        case "/index/goods":
          arr = ["商品管理", "商品列表"];
          break;
        case "/index/addgoods":
          arr = ["商品管理", "商品添加"];
          break;
        case "/index/classgoods":
          arr = ["商品管理", "商品分类"];
          break;
        case "/index/shop":
          arr = ["商品管理", "店铺管理"];
          break;
        case "/index/account":
          arr = ["账号管理", "账号列表"];
          break;
        case "/index/addacc":
          arr = ["账号管理", "添加账号"];
          break;
        case "/index/changeacc":
          arr = ["账号管理", "修改密码"];
          break;
        case "/index/sale":
          arr = ["销量统计", "商品统计"];
          break;
        case "/index/saletwo":
          arr = ["账号管理", "订单统计"];
          break;
          case "/index/personal":
          arr = ["首页", "个人中心"];
          break;
      }
      this.breadList = arr;
    }
  },

// 计算属性
  computed:{
    newmenuList(){
      return this.menuList.filter(item=>item.role.includes(this.role))
    }
  },

  //watch监听某个值（hash）的变化
  watch: {
    //监听路由的变化。val是当前路由，val.path就是当前hash值
    $route: {
      handler: function(val) {
        // console.log(val,oldVal);
        // 监听了才能调用的到函数
        this.changeBredList(val.path)
      }
    },
    // 深度观察
    deep: true
  },

  // 生命周期里的创建初始化，页面刷新时都会创建初始化一次
  created() {
    // console.log('页面刷新时的',this.$route);
    // 刷新时的默认选中导航
    this.defaultActive = this.$route.path;
    // 刷新时的默认选中面包屑
    this.changeBredList(this.$route.path);
    // 验证token是否过期
    API_Checktoken(localStorage.token).then((res)=>{
        // console.log(res);
        if(res.data.code==0){
          this.username='<span>欢迎你!&nbsp;</span>'+localStorage.acc
        }else{
          this.username="<a href='#/' class='user_link'>您还没有登录哦!</a>"
        } 
    }),
    // 获取个人信息头像
    API_Accountinfo(localStorage.id).then(res => {
      this.imgUrl = res.data.accountInfo.imgUrl;
    });
  }
};
</script>

<style lang='less'>
@basecolor: #f0f2f5;
.user_link{
  color: red;
  text-decoration: none;
  &:hover{
    font-weight: bold;
  }
}
.el-container {
  height: 100%;
  .aside-main {
    background: #304156;
    h3 {
      color: #ffffff;
      text-indent: 30px;
      margin: 20px 0 10px 0;
    }
    a {
      color: #ffffff !important;
      text-decoration: none;
    }
    .el-menu {
      border-right: none;
    }
  }

  .main-content {
    background: @basecolor;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    height: 50px !important;
    background: #ffffff;
    width: 100%;
    line-height: 50px;
     .el-breadcrumb{
       margin-top: 20px;
       font-weight: bold;
     }
    .user-title {
      display: flex;
      margin-right: 20px;
      p {
        margin-top: 0;
        margin-right: 10px;
      }
      div {
        width: 45px;
        height: 45px;
        margin-top: 2px;
        border-radius: 30px;
        overflow: hidden;
        cursor: pointer;

        img {
          width: 100%;
        }
      }
    }
  }
}
</style>