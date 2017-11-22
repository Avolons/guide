
 'use strict';
/* 网上抄的query解析函数，在路劲中包含#的时候会出现根本解析不出来的情况，慎用 */
var getQuery ={
	getQueryString(name) { 
		  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
          var r = window.location.search.substr(1).match(reg);  //匹配目标参数
          if (r != null) return unescape(r[2]); return null; //返回参数值
	  },
	 getJsonLength(jsonData){  
    	var jsonLength = 0;  
    	for(var item in jsonData){  
        	jsonLength++;  
    	}  
    	return jsonLength;  
	  }  	
    }
module.exports = getQuery;