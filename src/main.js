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
/* 引入css重置文件,基本的样式文件 */
import './assets/css/reset.css';
/* 调用vuex组件相关功能 */
import {
    LoadingPlugin,
    ConfirmPlugin,
    ToastPlugin,
    dateFormat,
    DatetimePlugin
} from 'vux';
/* import VCharts from 'v-charts';
Vue.use(VCharts); */

/* 快速点击，消除ios300ms的点击延迟情况 */
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function () {
        FastClick.attach(document.body);
    }, false);
}

/* 路由全局函数 */
/* Router.prototype.goBack = function () {
    if (history.length == 1) {
        window.location.href = '/';
    } else {
        this.isBack = true;
        window.history.go(-1);
    }
}; */

/* 登录跳转判断 */

router.afterEach(function (to) {
    store.commit('updateLoadingStatus', {
        isLoading: false
    });
});

/* 取出本地数据，赋值到store的state中 */
/* 主要用于赋值登录状态和认证状态 */
const userInfo = localStorage.getItem('userInfo');

if (userInfo) {
    store.dispatch('SetUserInfo', JSON.parse(userInfo));
}

/**
 * 全局loading监控
 */

Vue.use(LoadingPlugin);
Vue.use(ConfirmPlugin);
Vue.use(ToastPlugin);
Vue.use(DatetimePlugin);
Vue.prototype.dateFormat = dateFormat;

/* 时间格式化过滤器 */
Vue.filter('dataform', function (value) {
    return dateFormat(value, 'HH:mm');
});
/* 另一种时间格式化过滤器 */
Vue.filter('hourForm', function (value) {
    return dateFormat((new Date(value)).getTime(), 'HH:mm');
});

window.App = new Vue({
    template: '<App/>',
    router,
    store,
    components: {
        App
    }
}).$mount('#app');
