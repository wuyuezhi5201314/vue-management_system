import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/Login'
import {API_Checktoken} from '@/api/apis'
const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
const router=new VueRouter({
    routes:[
        {
            path:'/',
            name:'Login',
            component:Login
        },{
            path:'/index',
            name:'index',
            component:()=>import('../pages/Index'),
            children:[
                {
                    path:'/index/home',
                    name:'home',
                    component:()=>import('../pages/index/Home')
                },{
                    path:'/index/sale',
                    name:'sale',
                    component:()=>import('../pages/index/Sale')
                },
                {
                    path:'/index/saletwo',
                    name:'saletwo',
                    component:()=>import('../pages/index/Saletwo')
                },{
                    path:'/index/account',
                    name:'account',
                    component:()=>import('../pages/index/Account')
                },{
                    path:'/index/addacc',
                    name:'addacc',
                    component:()=>import('../pages/index/Addacc')
                },{
                    path:'/index/changeacc',
                    name:'changeacc',
                    component:()=>import('../pages/index/ChangeAcc')
                },{
                    path:'/index/goods',
                    name:'goods',
                    component:()=>import('../pages/index/Goods')
                },{
                    path:'/index/addgoods',
                    name:'addgoods',
                    component:()=>import('../pages/index/AddGoods')
                },{
                    path:'/index/classgoods',
                    name:'classgoods',
                    component:()=>import('../pages/index/ClassGoods')
                },{
                    path:'/index/shop',
                    name:'shop',
                    component:()=>import('../pages/index/Shop')
                },{
                    path:'/index/order',
                    name:'order',
                    component:()=>import('../pages/index/Order')
                },{
                    path:'/index/personal',
                    name:'personal',
                    component:()=>import('../pages/index/Personal')
                }
            ]
        }
       
        
    ]
})

Vue.use(VueRouter)



//添加路由前置守卫
router.beforeEach((to,from,next)=>{
    from
    if(to.path !='/'){
        API_Checktoken(localStorage.token).then((res)=>{
            if(res.data.code==0){
                next()
            }else{
                next('/')
            }
        })
    }else{
        next()
    }
})
export default router




