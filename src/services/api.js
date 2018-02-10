/*
 *2017-12-13
 *徐鸡
 *请求管理
 */

'use strict';

import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';

/* 默认请求axios */
Vue.prototype.$http = axios;

/* 默认请求地址 */

axios.defaults.baseURL = 'http://192.168.1.215:8088/';
/* axios.defaults.baseURL = 'http://61.153.232.58:19999/'; */

/* axios.defaults.baseURL = 'http://192.168.1.52:8080/'; */

/* axios.defaults.baseURL = 'http://192.168.1.100:8888/'; */
/* axios.defaults.baseURL = 'http://192.168.1.32:8080/'; */

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

let eventObj = {
    '/wechat/login/check': '登录',
    '/wechat/login/getSmsCode': '获取验证码',
    '/wechat/center/bindAiPicture': '绑定AI头像',
    '/wechat/center/updateGz': '取消/添加关注',
    '/wechat/login/editPassword': '修改密码/找回密码',
    '/wechat/login/pceditPassword': '修改密码',
    '/wechat/patientRecord/getPatientRecord': '随访结果model获取病人信息',
    '/wechat/center/sendMessage': '医生反馈意见',
    '/wechat/VisitResult/updateDiseaseInfo': '随访记录处理',
    '/wechat/flowUp/editVisitProjectStatus': '随访计划审核',
    '/wechat/patientRecord/getRecordByDate': '切换就诊档案'
};

/* 返回一个Promise(发送post请求) */
function fetch (type, url, params = {}) {
    let adminNmae = '';
    if (localStorage.getItem('userInfo')) {
        params.adminId = JSON.parse(localStorage.getItem('userInfo')).data.id;
        adminNmae = JSON.parse(localStorage.getItem('userInfo')).data.username;
    }
    if (eventObj[url] && adminNmae) {
        TDAPP.onEvent(adminNmae, '功能使用_' + eventObj[url]);
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

/* 通用相关相关接口 *****/
export const common = {
  /*
   *登录
   *username
   *password
   */
    login (data) {
        return fetch('post', '/wechat/login/check', data);
    },
  /*
   *获取验证码
   *phoneNum
   */
    regPhone (data) {
        return fetch('post', '/wechat/login/getSmsCode', data);
    },
  /*
   *绑定手机号
   *phoneNum
   *smsCode
   *userName
   */
    bindingPhone (data) {
        return fetch('post', '/wechat/login/bindingPhone', data);
    },
  /*
   *绑定AI头像
   *userId//医生的iD
   **aiPictureCode:AiPicture_qlm //ai助手头像对应的code
   */
    bindAiPicture (data) {
        return fetch('post', '/wechat/center/bindAiPicture', data);
    },
  /*
   *获取12生肖
   */
    findAiPictureList (data) {
        return fetch('post', '/wechat/center/findAiPictureList', data);
    },
  /*
   *取消/添加关注
   */
    updateGz (data) {
        return fetch('post', '/wechat/center/updateGz', data);
    },
  /*
   *修改密码/找回密码
   */
    editPassword (data) {
        return fetch('post', '/wechat/login/editPassword', data);
    },
  /*
   *随访结果model获取病人信息
   *phoneNum
   */
    getPatientRecord (data) {
        return fetch('post', '/wechat/patientRecord/getPatientRecord', data);
    },
  /*
   *修改密码
   adminId:108 //医生id
   oldPassword:123456789
   newPassword:123456   //新密码

   */
    pceditPassword (data) {
        return fetch('post', '/wechat/login/pceditPassword', data);
    },
  /*
   *医生反馈意见
   */
    sendMessage (data) {
        return fetch('post', '/wechat/center/sendMessage', data);
    }
};
/** ******首页********/
export const homePage = {
  /*
   *查询顶部信息
   */
    adminInfo (data) {
        return fetch('post', '/wechat/index/adminInfo', data);
    },
  /*
   *我关注的患者
   */
    getSpecialLike (data) {
        return fetch('post', '/wechat/center/getSpecialLike', data);
    },
  /*
   *用药依从性统计
   */
    getUseEatInfo (data) {
        return fetch('post', '/wechat/index/getUseEatInfo', data);
    },
  /*
   *疾病分类信息统计
   */
    diagnoseInfo (data) {
        return fetch('post', '/wechat/index/diagnoseInfo', data);
    },
  /*
   *随访结果处理结果统计
   */
    visitOrderInfo (data) {
        return fetch('post', '/wechat/index/visitOrderInfo', data);
    },
  /*
   *随访次数统计
   */
    visitCountInfo (data) {
        return fetch('post', '/wechat/index/visitCountInfo', data);
    }
};
/* 随访结果 *****/
export const followway = {
  /*
   *获取列表
   */
    list (data) {
        return fetch('post', '/wechat/VisitResult/getVisistOrder', data);
    },
  /*
   *随访结果model获取病人信息
   *phoneNum
   */
    getPatientRecord (data) {
        return fetch('post', '/wechat/patientRecord/getPatientRecord', data);
    },
  /*
   *获取模态框随访结果
   */
    getVisistOrderResult (data) {
        return fetch('post', '/wechat/VisitResult/getVisistOrderResult', data);
    },
  /*
   *指标折线图
   */
    getChartData (data) {
        return fetch('post', '/wechat/VisitResult/getChartData', data);
    },
  /*
   *处理意见
   */
    updateDiseaseInfo (data) {
        return fetch('post', '/wechat/VisitResult/updateDiseaseInfo', data);
    },
    /*
   *处理意见
   */
    DiseaseType (data) {
        return fetch('post', '/wechat/VisitResult/getDiseaseInfo', data);
    }

};
/* 随访计划 *****/
export const followplan = {
  /*
   *获取列表
   */
    list (data) {
        return fetch('post', '/wechat/flowUp/visitProject', data);
    },
  /*
   *随访计划审核
   */
    editVisitProjectStatus (data) {
        return fetch('post', '/wechat/flowUp/editVisitProjectStatus', data);
    },
  /*
   *获取模态框随访结果
   */
    getVisitOrderDetail (data) {
        return fetch('post', '/wechat/flowUp/getVisitOrderDetail', data);
    }
  /*
   *获取
   */
};
/* 患者列表 *****/
export const patientList = {
  /*
  *获取列表
  adminId:288,//医生的id
  patientName:, //病人名称
  icdName:,  //所患疾病名称
  sex:,  //男 or 女
  fromAge:,//起始年龄
  endAge:,  //结束年龄
  gz:, //0:不关注 1：关注
  startDate:,   //就诊时间的开始时间
  endDate:,//就诊时间的结束时间
  sort:0//0:就诊时间从最近到以前; 1:就诊时间从晚到早
  */
    list (data) {
        return fetch('post', '/wechat/center/getMyPatient', data);
    },
  /*
   *获取模态框住院/门诊/随访信息
   */
  // getVisistOrderResult (data) {
  //   return fetch('post', '/wechat/VisitResult/getVisistOrderResult', data);
  // },
  /*
   *获取诊断档案时间
   */
    getRecordDate (data) {
        return fetch('post', '/wechat/patientRecord/getRecordDate', data);
    },
  /*
   *获取诊断档案时间对应的就诊信息
   */
    getRecordByDate (data) {
        return fetch('post', '/wechat/patientRecord/getRecordByDate', data);
    },
    /*
   * 获取所有taskid
   * patient:'af9338f6-138d-4d43-8fa6-2d86038fc11c' //患者id
   */
    getTaskByHzId (data) {
        return fetch('post', '/wechat/flowUp/getTaskByHzId', data);
    }

}; /* 活动通知 *****/
export const activityTo = {
  /*
   *获取列表
   */
    list (data) {
        return fetch('post', '/wechat/center/myActivity', data);
    },
  /*
   *获取通知详情
   */
    info (data) {
        return fetch('post', '/wechat/center/activityDetail', data);
    }

};
