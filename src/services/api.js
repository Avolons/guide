'use strict';

import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';

/* 默认请求axios */
Vue.prototype.$http = axios;

/* 默认请求地址 */

axios.defaults.baseURL = 'http://192.168.1.215:8088/';

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
     * 绑定手机号
     * @param phoneNum {string} 手机号码
     * @param smsCode {string} 验证码
     * @param userName {string} 用户名
     */
    bindingPhone (data) {
        return fetch('post', '/wechat/login/bindingPhone', data);
    },
    /**
     * 绑定AI头像
     * @param userId {string} 医生的iD
     * @param aiPictureCode {string} ai助手头像对应的code
     */
    bindAiPicture (data) {
        return fetch('post', '/wechat/center/bindAiPicture', data);
    },
    /**
     * 获取12生肖
     * @param adminId {string} 医生的id
     * @param fromsys {string} h5/web 1是pc 2是h5
     */
    findAiPictureList (data) {
        return fetch('post', '/wechat/center/findAiPictureList', data);
    },
    /**
     * 取消/添加关注
     * @param adminId {string} 医生的id
     * @param patientId {string} 患者的id
     * @param operateType {number} (操作类型 1:关注 0：取消关注) （必填）
     * @param operateTag {string} 关注的标签
     */
    updateGz (data) {
        return fetch('post', '/wechat/center/updateGz', data);
    },
    /*
     *修改密码/找回密码
     */
    /**
     * 登录
     * @param username {string} 用户名
     * @param password {string} 密码
     */
    editPassword (data) {
        return fetch('post', '/wechat/login/editPassword', data);
    },
    /*
     *随访结果model获取病人信息
     *phoneNum
     */
    /**
     * 登录
     * @param username {string} 用户名
     * @param password {string} 密码
     */
    getPatientRecord (data) {
        return fetch('post', '/wechat/patientRecord/getPatientRecord', data);
    },
    /**
     * 修改密码
     * @param adminId {string} 医生id
     * @param oldPassword {string} 老密码
     * @param newPassword {string} 新密码
     */
    pceditPassword (data) {
        return fetch('post', '/wechat/login/pceditPassword', data);
    },
    /**
     * 医生反馈意见
     * @param adminId {string} 医生的id
     * @param suggestion {string} 反馈的内容
     * @param fromsys {string} h5/web 1是pc 2是h5
     */
    sendMessage (data) {
        return fetch('post', '/wechat/center/sendMessage', data);
    }
};
