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
  import ( /* webpackChunkName: "login" */ '../components/Login/Forget.vue'); //忘记密码
const Change = () =>
  import ( /* webpackChunkName: "login" */ '../components/Login/Change.vue'); //修改密码
const Register = () =>
  import ( /* webpackChunkName: "login" */ '../components/Login/Register.vue'); //绑定手机号码
const ChoseAi = () =>
  import ( /* webpackChunkName: "login" */ '../components/Login/ChoseAi.vue'); //绑定手机号码

/* 四个table页面以及其父页面 */
const Index = () =>
  import ( /* webpackChunkName: "main" */ '../components/Main/Index.vue'); //首页
const Home = () =>
  import ( /* webpackChunkName: "main" */ '../components/Main/Home.vue'); //父页面
const Plan = () =>
  import ( /* webpackChunkName: "main" */ '../components/Main/Plan.vue'); //随访计划
const Result = () =>
  import ( /* webpackChunkName: "main" */ '../components/Main/Result.vue'); //随访结果
const Mine = () =>
  import ( /* webpackChunkName: "main" */ '../components/Main/Mine.vue'); //个人中心
const Search = () =>
  import ( /* webpackChunkName: "main" */ '../components/Main/Search.vue'); //搜索

/* 个人中心相关页面 */
const Setting = () =>
  import ( /* webpackChunkName: "mine" */ '../components/Mine/Setting.vue'); //设置
const Follow = () =>
  import ( /* webpackChunkName: "mine" */ '../components/Mine/Follow.vue'); //特别关注
const Opinion = () =>
  import ( /* webpackChunkName: "mine" */ '../components/Mine/Opinion.vue'); //建议反馈
const Patient = () =>
  import ( /* webpackChunkName: "mine" */ '../components/Mine/Patient.vue'); //我的患者
const ActInfo = () =>
  import ( /* webpackChunkName: "mine" */ '../components/Mine/ActInfo.vue'); //活动通知详情
const Activity = () =>
  import ( /* webpackChunkName: "mine" */ '../components/Mine/Activity.vue'); //活动通知

 /* 患者详情相关页面 */ 
const PatInfo = () =>
  import ( /* webpackChunkName: "pat" */ '../components/Person/Index.vue'); //患者详情
const PatIndex = () =>
  import ( /* webpackChunkName: "pat" */ '../components/Person/Result.vue'); //患者详情

const routes = [{
    path: '/main/:id',
    component: Home,
    children: [{
        path: "",
        meta: {
          title: "首页"
        },
        component: Index,
      },
      {
        path: "plan",
        meta: {
          title: "随访计划",
          keepAlive: true // 需要被缓存
        },
        component: Plan
      },
      {
        path: "result",
        meta: {
          title: "随访结果",
          keepAlive: true // 需要被缓存
        },
        component: Result
      },
      {
        path: "mine",
        meta: {
          title: "个人中心",
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
      title: "找回密码"
    }
  },
  {
    path: '/change',
    component: Change,
    meta: {
      title: "修改密码"
    }
  },
  {
    path: '/choseAi',
    component: ChoseAi,
    meta: {
      title: "选择AI助手"
    }
  },
  {
    path: '/register',
    component: Register,
    meta: {
      title: "绑定手机号码"
    }
  },
  {
    path: '/main/main/mine/setting',
    component: Setting,
    meta: {
      title: "设置",
      keepAlive: true // 需要被缓存
    }
  },
  {
    path: '/main/main/mine/follow',
    component: Follow,
    meta: {
      title: "特别关注",
      keepAlive: true // 需要被缓存
    }
  },
  {
    path: '/main/main/mine/setting/opinion',
    component: Opinion,
    meta: {
      title: "意见反馈",
      keepAlive: false // 需要被缓存
    }
  },
  {
    path: '/main/main/mine/patient',
    component: Patient,
    meta: {
      title: "我的患者",
      keepAlive: true // 需要被缓存
    }
  },
  {
    path: '/main/main/mine/activity',
    component: Activity,
    meta: {
      title: "活动通知",
      keepAlive: true // 需要被缓存
    }
  },
  {
    path: '/main/main/mine/actInfo',
    component: ActInfo,
    meta: {
      title: "活动详情",
      keepAlive: false // 需要被缓存
    }
  },
  {
    path: '/main/main/mine/patInfo',
    component: PatInfo,
    meta: {
      title: "患者详情",
      keepAlive: false // 需要被缓存
    }
  },
  {
    path: '/main/main/mine/patIndex',
    component: PatIndex,
    meta: {
      title: "指标统计",
      keepAlive: false // 需要被缓存
    }
  },
];



export default new Router({
  mode: 'history',
  routes
});
