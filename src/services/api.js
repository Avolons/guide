/**
 * 2017.11.23
 * wzh
 * sevices管理器
 */

 'use strict';


import Vue from 'vue';
import axios from 'axios';

/* HTTP相关,使用Axios作为http库 */
Vue.prototype.$http = axios;


/* 默认最长响应时间 */
axios.defaults.timeout = 500;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
/* 默认的接口地址 */
/* axios.defaults.baseURL = 'http://192.168.0.103/api'; */



/* 返回一个Promise(发送post请求) */
function fetch(type, url, params) {
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

export const  follow={
  /**
   * 获取随访结果
   * @request data
   * 
   * userId //用户id
   * page //分页
   * pageNumber //每页显示的数量
   * 
   * @response data
   * 
   * state //状态 0：待开始 1：待处理 2：立即处理 
   * name //病人姓名
   * template //随访计划模板
   * frequency //随访次数
   * abnormal //是否指标异常 0：正常 1：异常
   * follow //是否关注 0：未关注 1：已关注
   * Diagnosis //诊断名称
   * id //数据id或者用户id
   * @returns 
   */
  result(data){
    return fetch("get",'/follow/getResult',data);
  },
  /**
   * 获取随访计划
   * @request data
   * 
   * userId //用户id
   * page //分页
   * pageNumber //每页显示的数量
   * 
   * @response data
   * 
   * name //病人姓名
   * template //随访计划模板
   * time //随访计划生成时间
   * Diagnosis //诊断名称
   * id //数据id或者用户id
   * countDown //倒计时
   * @returns 
   */
  plan(data){
    return fetch("get",'/follow/getPlan',data);
  },
};


export const  mine={
  /**
   * 获取随访结果
   * @request data
   * 
   * userId //用户id
   * page //分页
   * pageNumber //每页显示的数量
   * 
   * @response data
   * 
   * name //病人姓名
   * age//病人年龄
   * sex//病人性别
   * Diagnosis //诊断名称
   * id //数据id或者用户id
   * @returns 
   */
  result(data){
    return fetch("get",'/mine/patient',data);
  },
 
};
