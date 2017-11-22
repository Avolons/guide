/**
 * 2017.8.30
 * wzh
 * sevices管理器
 */

 'use strict';


import Vue from 'vue';
import axios from 'axios';

/* 默认最长响应时间 */
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
/* 默认的接口地址 */
axios.defaults.baseURL = '你的接口地址';



/* POST传参序列化(添加请求拦截器) */
axios.interceptors.request.use((config) => {
  //在发送请求之前做某件事
  if(config.method === 'post') {
    config.data = JSON.stringify(config.data);
  }
  return config;
}, (error) => {
  _.toast("错误的传参", 'fail');
  return Promise.reject(error);
});


/* 返回状态判断(添加响应拦截器) */
axios.interceptors.response.use((res) => {
  //对响应数据做些事
  if (!res.data.success) {
    // _.toast(res.data.msg);
    return Promise.reject(res);
  }
  return res;
}, (error) => {
  _.toast("网络异常", 'fail');
  return Promise.reject(error);
});

/* 返回一个Promise(发送post请求) */
export function fetch(type, url, params) {
  return new Promise((resolve, reject) => {
    if (type === "get") {
      axios.get(url, {params:params})
        .then(response => {
          resolve(response.data);
        }, err => {
          reject(err);
        })
        .catch((error) => {
          reject(error);
        });
    } else {
      axios.post(url, params)
        .then(response => {
          resolve(response.data);
        }, err => {
          reject(err);
        })
        .catch((error) => {
          reject(error);
        });
    }
  });
}

/* 使用 axios来做为http请求库 */


