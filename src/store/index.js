/**
 * 2017.11.21
 * wzh
 * 状态管理机
 */

 'use strict'

 
import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		// 保存登录信息
		userInfo : {
			
		},
	},
	actions: {
		/* 设置用户登录信息 */
		SetUserInfo({commit,state},userInfo){
			commit('SETUSERINFO',userInfo);
		},
		/* 退出登录 */
		SignOut({commit}){
			commit('SIGNOUT');
		},
	},
	mutations: {
		// 设置登录用户信息
		SETUSERINFO (state, userInfo) {
			state.userInfo={
				username:userInfo.username, //用户名  （需要缓存）
				pwd: userInfo.pwd,
				dateLogin: userInfo.dateLogin,//登陆日期
				ipLogin:userInfo.ipLogin,//登陆的id
				realname: userInfo.realname,//真是姓名
				mobile:userInfo.mobile,//手机号
				isLock: userInfo.isLock,//是否锁定
				type:userInfo.type,//用户类型 0管理员 1：医生
				defaultVisitTempleId: userInfo.defaultVisitTempleId,//默认随访模板
				departmentId: userInfo.departmentId,//部门
				id:userInfo.id,//id
			}
		},
		// 退出登录
		SIGNOUT (state) {
			/* 清空用户登录信息 */
			state={};
			/* window.location.href="/#/index/main"; */
		},
	},
	getters: {
		/* 返回用户信息 */
		getUserInfo (state) {
			return state.userInfo;
		},
		/* 返回用户id */
		getUserInfoUserId(state, getters) {
			return getters.getUserInfo.id;
		},
		/* 返回用户token */
		getUserInfoToken(state, getters) {
			return getters.getUserInfo.token;
		},
		/* 返回用户姓名 */
		getNamePhone(state){
			return state.addressData.address_name+" "+state.addressData.mobile;
		}
	}
})

export default store;