'use strict';
/**
 * 2017.11.23
 * wzh
 * 假数据模拟器
 */
import Mock from 'mockjs';

/* 拦截随访结果请求 */
const Random = Mock.Random;


const queryString=(url)=>{
    let str=url.split("?")[1];
    if(str){
        let items=str.split("&");
        let result={};
        for (const item of items) {
            let arr=item.split('=');
            result[arr[0]]=arr[1];
        }
      return result;
    }else{
        return {};
    }
    
}

/* 性别生成器 */
Random.extend({
    sex: function(date) {
        var sexlist = ["男","女"];
        return this.pick(sexlist);
    }
})
// mock一组数据
const result = function() {
    let data = [];
    for (let i = 0; i < 10; i++) {
        let newArticleObject = {
            state:Random.integer(0,2), //状态 0：待开始 1：待处理 2：立即处理 
            name: Random.cname(),//病人姓名
            template:Random.csentence( 4,14 ), //随访计划模板
            frequency:Random.integer(0,4),  //随访次数
            abnormal:Random.integer(0,1), //是否指标异常 0：正常 1：异常
            follow: Random.integer(0,1),//是否关注 0：未关注 1：已关注
            diagnosis:Random.cparagraph(1,3), //诊断名称
            id:Random.string(12) //用户id或者数据id
            };
        data.push(newArticleObject);
    }
 
    return {
        data: data
    };
};

const plan = function() {
    let data = [];
    for (let i = 0; i < 10; i++) {
        let newArticleObject = {
            name: Random.cname(),//病人姓名
            template:Random.csentence( 4,14 ), //随访计划模板
            diagnosis:Random.cparagraph(1,3), //诊断名称
            id:Random.string(12), //用户id或者数据id
            countDown:Random.time('HH:mm:ss'),  //倒计时
            time:Random.date(), //随访计划生成时间
            };
        data.push(newArticleObject);
    }
 
    return {
        data: data
    };
};

const patient = function(req) {
    let data = [];
    for (let i = 0; i < 10; i++) {
        let newArticleObject = {
            name: Random.cname(),//病人姓名
            sex:Random.sex(),//性别
            age:Random.integer(0,100),//年龄
            diagnosis:Random.cparagraph(1,3), //诊断名称
            id:Random.string(12), //用户id或者数据id
            };
        data.push(newArticleObject);
    }
    console.log(queryString(req.url));
    return {
        data: data
    };
};

 
/* 模拟获得我的随访结果 */
Mock.mock('/follow/getResult', 'get', result);
/* 模拟获得我的随访计划 */
Mock.mock('/follow/getPlan', 'get', plan);
/* 模拟我的患者列表数据 */
Mock.mock(/\/mine\/patient/, 'get', patient);

