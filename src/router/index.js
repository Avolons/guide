'use strict'


/**
 * 2017.11.27
 * wzh
 * 路由控制器
 */


import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

/* 添加该字段，表示进入这个路由是需要登录的
meta: {
  requireAuth: true,
}, */

/* 登录注册通用模块 */
const Login = () =>
  import ( /* webpackChunkName: "login" */ '../components/Login/Login.vue'); //登录
const Forget = () =>
  import ( /* webpackChunkName: "Forget" */ '../components/Login/Forget.vue'); //忘记密码
const Change = () =>
  import ( /* webpackChunkName: "Change" */ '../components/Login/Change.vue'); //修改密码
const Register = () =>
  import ( /* webpackChunkName: "Register" */ '../components/Login/Register.vue'); //绑定手机号码
const ChoseAi = () =>
  import ( /* webpackChunkName: "ChoseAi" */ '../components/Login/ChoseAi.vue'); //绑定手机号码

/* 四个table页面以及其父页面 */
const Index = () =>
  import ( /* webpackChunkName: "Index" */ '../components/Main/Index.vue'); //首页
const Home = () =>
  import ( /* webpackChunkName: "Home" */ '../components/Main/Home.vue'); //父页面
const Plan = () =>
  import ( /* webpackChunkName: "Plan" */ '../components/Main/Plan.vue'); //随访计划
const Result = () =>
  import ( /* webpackChunkName: "Result" */ '../components/Main/Result.vue'); //随访结果
const Mine = () =>
  import ( /* webpackChunkName: "Mine" */ '../components/Main/Mine.vue'); //个人中心
const Search = () =>
  import ( /* webpackChunkName: "Search" */ '../components/Main/Search.vue'); //搜索

/* 个人中心相关页面 */
const Setting = () =>
  import ( /* webpackChunkName: "Setting" */ '../components/Mine/Setting.vue'); //设置
const Follow = () =>
  import ( /* webpackChunkName: "Follow" */ '../components/Mine/Follow.vue'); //特别关注
const Opinion = () =>
  import ( /* webpackChunkName: "Opinion" */ '../components/Mine/Opinion.vue'); //建议反馈
const Patient = () =>
  import ( /* webpackChunkName: "Patient" */ '../components/Mine/Patient.vue'); //我的患者
const ActInfo = () =>
  import ( /* webpackChunkName: "ActInfo" */ '../components/Mine/ActInfo.vue'); //活动通知详情
const Activity = () =>
  import ( /* webpackChunkName: "Activity" */ '../components/Mine/Activity.vue'); //活动通知

 /* 患者详情相关页面 */ 
const PatInfo = () =>
  import ( /* webpackChunkName: "PatInfo" */ '../components/Person/Index.vue'); //患者详情
const PatIndex = () =>
  import ( /* webpackChunkName: "PatIndex" */ '../components/Person/Result.vue'); //患者详情

const routes = [{
    path: '/main/:id',
    component: Home,
    children: [{
        path: "",
        meta: {
          title: "认识医生",
          requireAuth:true,
        },
        component: Index,
      },
      {
        path: "plan",
        meta: {
          title: "随访计划",
          requireAuth:true,
          keepAlive: true // 需要被缓存
        },
        component: Plan
      },
      {
        path: "result",
        meta: {
          title: "随访记录",
          requireAuth:true,
          keepAlive: true // 需要被缓存
        },
        component: Result
      },
      {
        path: "mine",
        meta: {
          title: "个人中心",
          requireAuth:true,
          keepAlive: true // 需要被缓存
        },
        component: Mine
      },
    ]
  },
  {
    path: '/',
    redirect: '/main/main',
    component: Index
  },
  {
    path: '/main/main/search',
    component: Search,
    meta: {
      title: "搜索"
    }
  },
  {
    path: '/login',
    component: Login,
    meta: {
      title: "登录"
    }
  },
  {
    path: '/forget',
    component: Forget,
    meta: {
      title: "找回密码",
      requireAuth:true,
    }
  },
  {
    path: '/change',
    component: Change,
    meta: {
      title: "修改密码",
      requireAuth:true,
    }
  },
  {
    path: '/choseAi',
    component: ChoseAi,
    meta: {
      title: "选择AI助手",
      requireAuth:true,
    }
  },
  {
    path: '/register',
    component: Register,
    meta: {
      title: "绑定手机号码",
      requireAuth:true,
    }
  },
  {
    path: '/main/main/mine/setting',
    component: Setting,
    meta: {
      title: "设置",
      requireAuth:true,
      keepAlive: true // 需要被缓存
    }
  },
  {
    path: '/main/main/mine/follow',
    component: Follow,
    meta: {
      title: "特别关注",
      requireAuth:true,
      keepAlive: true // 需要被缓存
    }
  },
  {
    path: '/main/main/mine/setting/opinion',
    component: Opinion,
    meta: {
      title: "意见反馈",
      requireAuth:true,
      keepAlive: false // 需要被缓存
    }
  },
  {
    path: '/main/main/mine/patient',
    component: Patient,
    meta: {
      title: "我的患者",
      requireAuth:true,
      keepAlive: true // 需要被缓存
    }
  },
  {
    path: '/main/main/mine/activity',
    component: Activity,
    meta: {
      title: "活动通知",
      requireAuth:true,
      keepAlive: true // 需要被缓存
    }
  },
  {
    path: '/main/main/mine/actInfo',
    component: ActInfo,
    meta: {
      title: "活动详情",
      requireAuth:true,
      keepAlive: false // 需要被缓存
    }
  },
  {
    path: '/main/main/mine/patInfo',
    component: PatInfo,
    meta: {
      title: "患者详情",
      requireAuth:true,
      keepAlive: false // 需要被缓存
    }
  },
  {
    path: '/main/main/mine/patIndex',
    component: PatIndex,
    meta: {
      title: "指标统计",
      requireAuth:true,
      keepAlive: false // 需要被缓存
    }
  },
];



export default new Router({
  mode: 'hash',
  routes
});
