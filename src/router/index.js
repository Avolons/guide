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
    redirect: '/guide',
    component: guide,
  },
  {
    path: '/guide',
    component: guide,
   
  },
  
];



export default new Router({
  mode: 'hash',
  routes
});
