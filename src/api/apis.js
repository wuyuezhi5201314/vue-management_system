import axios from 'axios'  //引入axios
axios.defaults.baseURL = 'http://localhost:5000' //统一的IP加端口封装

//登录接口
export const API_Login=(account,password)=>axios.post('/users/checkLogin',{account,password})
//注册接口
export const API_Addacc=(account,password,userGroup)=>axios.post('/users/add',{account,password,userGroup})
//获取账号列表
export const API_AccList=(currentPage,pageSize)=>axios.get('/users/list',{params:{currentPage,pageSize}})
//删除数据
export const API_AccDel=(id,code,msg)=>axios.get('/users/del',{params:{id,code,msg}})
//批量删除账号
export const API_batchdel=(ids)=>axios.get('/users/batchdel',{params:{ids}})
//修改账号名
export const API_Edituser=(id,account,userGroup)=>axios.post('/users/edit',{id,account,userGroup})
//个人中心信息
export const API_Accountinfo=(id)=>axios.get('/users/accountinfo',{params:{id}})
// 验证token是否过期
export const API_Checktoken=(token)=>axios.get('/users/checktoken',{params:{token}})
// 检查旧密码是否正确
export const API_CheckOldPwd=(oldPwd,id)=>axios.get('/users/checkoldpwd',{params:{oldPwd,id}})
//修改密码
export const API_EditPwd=(newPwd,id)=>axios.post('/users/editpwd',{newPwd,id})
// 添加商品分类
// state：是否启用   cateName：分类名称
export const API_AddCate=(cateName,state)=>axios.post('/goods/addcate',{cateName,state})
// 获取分类currentPage：当前页  pageSize：每页条数
export const API_CateList=(currentPage,pageSize)=>axios.get('/goods/catelist',{params:{currentPage,pageSize}})
//删除商品分类
export const API_DelCate=(id)=>axios.get('/goods/delcate',{params:{id}})
//15.修改分类
export const API_EditCate=(id,cateName,state)=>axios.post('/goods/editcate',{id,cateName,state})
// 16.查询所有分类名称
export const API_CateGories=()=>axios.get('/goods/categories',{params:{}})
// 18.添加商品 name商品名称   category商品分类   price商品价格   imgUrl商品图片地址   goodsDesc商品描述
export const API_Goods_Add=(name,category,price,imgUrl,goodsDesc)=>axios.post('/goods/add',{name,category,price,imgUrl,goodsDesc})
// 19.获取商品列表 currentPage当前页码  pageSize每页条数
export const API_GoodsList=(currentPage,pageSize)=>axios.get('/goods/list',{params:{currentPage,pageSize}})
// 29.首页报表接口
export const API_TotalData=()=>axios.get('/order/totaldata',{params:{}})
// 20.删除商品
export const API_DelGoods=(id)=>axios.get('/goods/del',{params:{id}})
// 21.修改商品  name商品名称  category商品分类 price商品价格 imgUrl商品图片地址 goodsDesc商品描述   id商品ID
export const API_GoodsEdit=(name,category,price,imgUrl,goodsDesc,id)=>axios.post('/goods/edit',{name,category,price,imgUrl,goodsDesc,id})
// 22.获取订单列表(带查询功能)
export const API_OrderList=(currentPage,pageSize,orderNo,consignee,phone,orderState,date)=>axios.get('/order/list',{params:{currentPage,pageSize,orderNo,consignee,phone,orderState,date}})
// 24.获取订单详情
export const API_OrderDetail=(id)=>axios.get('/order/detail',{params:{id}})
// 25.修改订单
export const API_OrderEdit=(id,orderNo,orderTime,phone,consignee,deliverAddress,deliveryTime,remarks,orderAmount,orderState)=>axios.post('/order/edit',{id,orderNo,orderTime,phone,consignee,deliverAddress,deliveryTime,remarks,orderAmount,orderState})
// 26.获取店铺详情
export const API_ShopInfo=()=>axios.get('/shop/info',{params:{}})
// 30.订单报表接口
export const API_OrderTotal=(date)=>axios.get('/order/ordertotal',{params:{date}})












