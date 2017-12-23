/**
 * 2017.11.22
 * wzh
 * 页面主入口函数
 */
'use strict';

import Vue from 'vue';
import store from './store';
import App from './App';
import Router from 'vue-router';
import router from './router';
import FastClick from 'fastclick';
import VCharts from 'v-charts';
Vue.use(VCharts);

/* 快速点击，消除ios300ms的点击延迟情况 */
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

/* 路由全局函数 */
Router.prototype.goBack = function () { 
	if(history.length==1){
		window.location.href="/";
	}else{
		this.isBack = true;
		　　window.history.go(-1);
	}
};


/* 登录跳转判断 */
router.beforeEach((to, from, next) => {
	// 判断该路由是否需要登录权限
	if (to.meta.requireAuth) {
		// 通过vuex state获取当前的token是否存在
		if(store.state.userInfo.token) {   
			next();
		}
		else { 
			next({
				path: '/login',
			   	query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
		   });
		}
	}
	else {
		next();
	}
	/* title重新赋值 */
	if(to.meta.title){
		document.title=to.meta.title;
		next();
	}
});


/* 取出本地数据，赋值到store的state中 */
/* 主要用于赋值登录状态和认证状态 */
const userInfo=localStorage.getItem("userInfo");
if(userInfo){
	store.state.userInfo= JSON.parse(userInfo);
}
const isCertify=localStorage.getItem("isCertify");
if(isCertify){
	store.state.isCertify= isCertify;
}


/* 调用vuex组件相关功能 */
import  { LoadingPlugin } from 'vux';
Vue.use(LoadingPlugin);
import { ConfirmPlugin } from 'vux';
Vue.use(ConfirmPlugin);
import  { ToastPlugin } from 'vux';
Vue.use(ToastPlugin);
import { dateFormat } from 'vux';
Vue.prototype.dateFormat=dateFormat;



/* 时间格式化过滤器 */
Vue.filter('dataform', function(value) {  
	return dateFormat(value*1000, 'YYYY.MM.DD');
});
/* 另一种时间格式化过滤器 */
Vue.filter('orderdata', function(value) {  
	if(value){
		return dateFormat(value*1000, 'YYYY-MM-DD HH:mm:ss');
	}
});


/* 引入css重置文件,基本的样式文件 */
import './assets/css/reset.css';

import './mock/mock.js';




window.Vue = Vue;


new Vue({
  	template: '<App/>',
	router,
  	store,
  	components: { App }
}).$mount('#app');


