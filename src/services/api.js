'use strict';

import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';

/* 默认请求axios */
Vue.prototype.$http = axios;

/* 默认请求地址 */

/* axios.defaults.baseURL = 'http://192.168.1.215:8088/'; */
axios.defaults.baseURL = 'http://61.153.232.58:19999/';
/* axios.defaults.baseURL = 'http://219.233.167.145:6018/'; */

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
/**
 * 首页相关接口
 * @class  homePage
 */
export const homePage = {
    /**
     * 查询顶部信息
     * @param adminId {string} 医生的id
     */
    adminInfo (data) {
        return fetch('post', '/wechat/index/adminInfo', data);
    },
    /**
     * 我关注的患者
     * @param adminId {string} 医生的id
     * @param pager {number} 页码
     * @param limit {number} 一页显示的数量
     */
    getSpecialLike (data) {
        return fetch('post', '/wechat/center/getSpecialLike', data);
    },
    /**
     * 用药依从性统计
     * @param adminId {string} 医生的id
     * @param dateType {number} 时间类型(0:全部 1:一周 2:一个月 3:3个月 4:6个月 5:一年)
     */
    getUseEatInfo (data) {
        return fetch('post', '/wechat/index/getUseEatInfo', data);
    },
    /**
     * 疾病分类信息统计
     * @param adminId {string} 医生的id
     * @param dateType {number} 时间类型(0:全部 1:一周 2:一个月 3:3个月 4:6个月 5:一年)
     */
    diagnoseInfo (data) {
        return fetch('post', '/wechat/index/diagnoseInfo', data);
    },
    /**
     * 随访结果处理结果统计
     * @param adminId {string} 医生的id
     * @param dateType {number} 时间类型(0:全部 1:一周 2:一个月 3:3个月 4:6个月 5:一年)
     */
    visitOrderInfo (data) {
        return fetch('post', '/wechat/index/visitOrderInfo', data);
    },
    /**
     * 随访次数统计
     * @param adminId {string} 医生的id
     * @param dateType {number} 时间类型(1:近7天 2:近30天)
     */
    visitCountInfo (data) {
        return fetch('post', '/wechat/index/visitCountInfo', data);
    }
};
/**
 * 随访记录相关接口
 * @class  followway
 */
export const followway = {
    /**
     * 获取随翻记录列表
     * @param adminId {string} 医生的id
     * @param sex {number} 性别
     * @param fromAge {number} 开始年龄
     * @param endAge {number} 结束年龄
     * @param patientName {string} 病人名称
     * @param icdName {string} 疾病名称
     * @param gz {number} 是否关注(0不关注  1关注)
     * @param vetStatus {number} 是否处理(1未处理，11已处理)
     * @param pager {number} 页码
     * @param limit {number} 每页显示数量
     */
    list (data) {
        return fetch('post', '/wechat/VisitResult/getVisistOrder', data);
    },
    /**
     * 根据随访计划查询就诊档案
     * @param adminId {string} 医生的id
     * @param visitOrderId {string} 记录id
     * @param patientId {string} 患者的id
     */
    getPatientRecord (data) {
        return fetch('post', '/wechat/patientRecord/getPatientRecord', data);
    },
    /**
     * 获取模态框随访结果
     * @param taskId {string} 执行任务的id
     * @param num {number} 第几次
     */
    getVisistOrderResult (data) {
        return fetch('post', '/wechat/VisitResult/getVisistOrderResult', data);
    },
    /**
     * 根据传入的hzxx_id 和 指标名称查询统计信息
     * @param hzxxId {string} 患者的id
     * @param fieldName {string} 指标名称
     */
    getChartData (data) {
        return fetch('post', '/wechat/VisitResult/getChartData', data);
    },
    /**
     * 随访结果页面弹框的处理意见接口
     * @param visitOrderId {string} 记录id
     * @param diseaseInfo {number} 处理意见(0:病情稳定 1:通知就诊 2:自行处理)
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

/**
 * 随访计划相关接口
 * @class  followplan
 */
export const followplan = {
    /**
     * 随访计划列表
     * @param adminId {string} 医生的id
     * @param sex {string} 性别
     * @param fromAge {number} 开始年龄
     * @param endAge {number} 结束年龄
     * @param patientName {string} 病人名称
     * @param status {number} (1:已通过 2:未通过 3:已审核 4:未审核)
     * @param pager {number} 页码
     * @param limit {number} 每页显示数量
     */
    list (data) {
        return fetch('post', '/wechat/flowUp/visitProject', data);
    },
    /**
     * 随访计划审核
     * @param adminId {string} 医生id
     * @param operateType {string} 操作类型（1：不通过 2：通过）
     * @param isAll {string} 是否全部提交（(1:是 2：否)）
     * @param ids {string} 要修改的随访方案Id （逗号分隔）
     * @param noPassReason {string} 不通过的原因
     */
    editVisitProjectStatus (data) {
        return fetch('post', '/wechat/flowUp/editVisitProjectStatus', data);
    },
    /**
     * 获取模态框随访结果
     * @param taskId {string} 计划id
     */
    getVisitOrderDetail (data) {
        return fetch('post', '/wechat/flowUp/getVisitOrderDetail', data);
    }
};

/**
 * 患者列表相关接口
 * @class  patientList
 */
export const patientList = {
    /**
     * 我的患者列表查询
     * @param adminId {string} 医生的id
     * @param sex {number} 性别
     * @param fromAge {number} 开始年龄
     * @param endAge {number} 结束年龄
     * @param patientName {string} 病人名称
     * @param icdName {string} 疾病名称
     * @param gz {number} 是否关注(0不关注  1关注)
     * @param startDate {number} 就诊时间的开始时间
     * @param endDate {number} 就诊时间的结束时间
     * @param sort {number} 0:就诊时间从最近到以前; 1:就诊时间从晚到早
     */
    list (data) {
        return fetch('post', '/wechat/center/getMyPatient', data);
    },
    /**
     * 查询就诊档案历史时间列表接口
     * @param adminId {string} 医生的id
     * @param patientId {string} 患者id
     */
    getRecordDate (data) {
        return fetch('post', '/wechat/patientRecord/getRecordDate', data);
    },
    /**
     * 获取诊断档案时间对应的就诊信息
     * @param adminId {string} 医生的id
     * @param patientId {string} 患者id
     * @param date {string} 选择的日期
     */
    getRecordByDate (data) {
        return fetch('post', '/wechat/patientRecord/getRecordByDate', data);
    },
    /**
     * 根据患者信息查询所有的task
     * @param patient {string} 患者id
     */
    getTaskByHzId (data) {
        return fetch('post', '/wechat/flowUp/getTaskByHzId', data);
    }

};
/**
 * 活动通知相关接口
 * @class  activityTo
 */
export const activityTo = {
    /**
     * 获取活动通知列表
     * @param adminId {string} 医生的id
     * @param schemeName {string} 活动通知名称
     */
    list (data) {
        return fetch('post', '/wechat/center/myActivity', data);
    },
    /**
     * 活动详情接口
     * @param taskId {string} 活动id
     */
    info (data) {
        return fetch('post', '/wechat/center/activityDetail', data);
    }
};
