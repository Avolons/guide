/**
 * 2017.8.30
 * wzh
 * 页面主入口函数
 */
'use strict';

import Vue from 'vue';
import store from './store';
import App from './App';
import Axios from 'axios';
import VueResource from 'vue-resource';
import Router from 'vue-router';
import router from './router';
import FastClick from 'fastclick';

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

/* 过滤器注册,直接抄的的1.0中的货币过滤器 */
Vue.filter('currency', function(value, _currency, decimals) {  
    value = parseFloat(value);  
    if (!isFinite(value) || !value && value !== 0) return '';  
    _currency = _currency != null ? _currency : '$';  
    decimals = decimals != null ? decimals : 2;  
    var stringified = Math.abs(value).toFixed(decimals);  
    var _int = decimals ? stringified.slice(0, -1 - decimals) : stringified;  
    var i = _int.length % 3;  
    var head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? ',' : '') : '';  
    var _float = decimals ? stringified.slice(-1 - decimals) : '';  
    var sign = value < 0 ? '-' : '';  
    var digitsRE = /(\d{3})(?=\d)/g;  
    return sign + _currency + head + _int.slice(i).replace(digitsRE, '$1,') + _float;  
}); 


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


//引入css重置文件,基本的样式文件
require('./assets/css/reset.css');


// HTTP相关
Vue.use(Axios);
Vue.http.options.emulateJSON = true;// = headers: {'Content-Type': 'application/x-www-form-urlencoded'}
Vue.http.options.emulateHTTP = true;
Vue.http.options.crossOrigin = true;
Vue.http.options.xhr = {withCredentials: true};




window.Vue = Vue;


new Vue({
  	template: '<App/>',
	router,
  	store,
  	components: { App }
}).$mount('#app');


