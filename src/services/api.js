'use strict';

import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';

/* 默认请求axios */
Vue.prototype.$http = axios;

/* 默认请求地址 */

/* axios.defaults.baseURL = 'http://61.153.232.58:8088/'; */

/* 默认最长响应时间 */
axios.defaults.timeout = 35000;

/* 添加请求拦截器 */
axios.interceptors.request.use(function (config) {
    config.data = qs.stringify(config.data);
    // 在发送请求之前做些什么
    config.headers = {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    };
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

/* 返回一个Promise(发送post请求) */
function fetch (type, url, params = {}) {
    if (localStorage.getItem('userInfo')) {
        params.adminId = JSON.parse(localStorage.getItem('userInfo')).data.id;
    }
    return new Promise((resolve, reject) => {
        if (type === 'get') {
            axios.get(url, {
                params: params
            })
                .then(response => {
                    let code = JSON.parse(response.data).code;
                    if (code === 2 || code === 21) {
                        Vue.$router.push('/login');
                    } else if (code === 0) {
                        resolve(JSON.parse(response.data));
                    } else {
                        Vue.$vux.toast.show({
                            text: JSON.parse(response.data).message,
                            type: 'cancel'
                        });
                        reject(new Error('数据错误'));
                    }
                }, err => {
                    reject(err);
                })
                .catch((error) => {
                    reject(error);
                });
        } else {
            axios.post(url, params)
                .then(response => {
                    let code = JSON.parse(response.data).code;
                    if (code === 2 || code === 21) {
                        Vue.$router.push('/login');
                    } else if (code === 0) {
                        resolve(JSON.parse(response.data));
                    } else {
                        Vue.$vux.toast.show({
                            text: JSON.parse(response.data).message,
                            type: 'cancel'
                        });
                        reject(new Error('数据错误'));
                    }
                }, err => {
                    reject(err);
                })
                .catch((error) => {
                    reject(error);
                });
        }
    });
}
/**
 * 通用相关接口
 * @class  common
 */
export const common = {
    /**
     * 登录
     * @param username {string} 用户名
     * @param password {string} 密码
     */
    login (data) {
        return fetch('post', '/wechat/login/check', data);
    },
    /**
     * 获取验证码
     * @param phoneNum {string} 手机号码
     */
    regPhone (data) {
        return fetch('post', '/wechat/login/getSmsCode', data);
    },
    /**
     * 获取验证码
     * @param phoneNum {string} 手机号码
     */
    getDepartMent (data) {
        return fetch('get', '/hospital/departments', data);
    },
    /**
     * 获取验证码
     * @param phoneNum {string} 手机号码
     */
    getCheck (data) {
        return fetch('get', '/hospital/checks', data);
    },
    /**
     * 获取验证码
     * @param phoneNum {string} 手机号码
     */
    getCheckInfo (data) {
        return fetch('post', '/hospital/checkDetail ', data);
    },
    /**
     * 获取验证码
     * @param phoneNum {string} 手机号码
     */
    getDepart (data) {
        return fetch('post', '/hospital/registerDetail', data);
    }
};
