'use strict';
/**
 * @param  {type} import Vue from 'vue'; {description}
 * @return {type} {description}
 */
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

/* 添加该字段，表示进入这个路由是需要登录的
meta: {
  requireAuth: true,
}, */

/* 登录注册通用模块 */
const guide = () =>
  import ( /* webpackChunkName: "login" */ '../components/Guide/index.vue'); //登录


const routes = [{
    path: '/',
    component: guide,
    /* children: [{
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
    ] */
  },
];



export default new Router({
  mode: 'hash',
  routes
});
