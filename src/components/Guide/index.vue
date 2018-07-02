<style lang="scss">
.guide {
  height: 100%;
  &_header {
    background-color: #fff;
    height: 50px;
    box-sizing: border-box;
    padding: 0 10px;
    display: flex;
    align-items: center;
    display: flex;
    justify-content: space-between;
    box-shadow: 0 2px 3px 2px rgba(0, 0, 0, 0.1);
    .vux-selector {
      width: 30%;
      border: 1px solid #dadada;
      height: 30px;
      border-radius: 3px;
      .weui-select {
        height: 30px;
        line-height: 30px;
        font-size: 12px;
        text-align: center;
      }
    }
    .vux-popup-picker-select {
      text-align: center !important;
      font-size: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .vux-cell-box {
      width: 30%;
      border: 1px solid #dadada;
      height: 30px;
      border-radius: 3px;
      &:before {
        display: none;
      }
      .weui-cell {
        padding: 5px;
      }
    }
    .vux-cell-placeholder {
      text-align: center;
      width: 100%;
      display: block;
      font-size: 12px;
    }
  }
  &_floor {
    width: calc(100% - 10px);
    margin: 0 auto;
    margin-top: 10px;
    background-color: #fff;
    font-size: 14px;
    padding: 5px 0;
    text-indent: 10px;
  }
  &_asideOut {
    padding: 30px 0;
    width: calc(100% - 10px);
    margin: 0 auto;
    background: #dadada;
    margin-top: 10px;
    border-radius: 5px;
  }
  &_aside {
    background-color: #dadada;
    position: relative;
    &_popover {
      position: absolute;
      transform: translate(-50%, -100%);
      display: inline-block;
    }
    &_popoverContent {
      position: relative;
      background-color: #fff;
      border-radius: 3px;
      display: inline-block;
      padding: 5px;
      &:after {
        position: absolute;
        width: 0;
        height: 0;
        border: 8px solid transparent;
        border-top-color: #fff;
        content: "";
        display: block;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
      }
      > h3 {
        font-size: 13px;
        color: #f80;
        margin-bottom: 5px;
      }
      > p {
        font-size: 12px;
      }
    }
    &_info {
      padding: 5px;
    }
    &_title {
      width: calc(100% - 10px);
      margin: 0 auto;
      box-sizing: border-box;
      padding: 5px 0;
      border-bottom: 1px solid #dadada;
    }
    &_text {
      width: calc(100% - 10px);
      margin: 0 auto;
      box-sizing: border-box;
      padding: 5px 0;
      margin-top: 5px;
    }
    &_name {
      color: #f80;
      text-align: left;
      font-size: 14px;
      margin-bottom: 8px;
    }
    &_list {
      margin-bottom: 5px;
      text-align: left;
      box-sizing: border-box;
      padding-left: 5px;
    }
    &_param {
      font-size: 12px;
      color: #666;
      margin-bottom: 3px;
      color: #f80;
      span {
        font-size: 12px;
        display: inline-block;
        width: 90px;
        background-color: #f1f1f1;
        border-radius: 3px;
        text-align: left;
        text-indent: 5px;
        margin-right: 5px;
        color: #333;
      }
    }
    &_close {
      position: absolute;
      top: 5px;
      right: 5px;
    }
    &_img {
      display: block;
      width: 100%;
    }
    &_content {
    }
  }
}
</style>
<template lang="pug">
    .guide  
        .guide_header 
            popup-picker( :display-format="formatName" ,show-name=true ,:columns="departLevel",:data="departMentList", v-model="departMent",@on-change="departMentChange" ,placeholder="请选择科室")
            selector(:options="checkList", v-model="check",@on-change="checkChange" ,placeholder="请选择检查")
            selector(placeholder="选择楼层", :options="floorList", v-model="floor",@on-change="floorChange")
        h4.guide_floor {{floor}}
        .guide_asideOut
          .guide_aside
              img(src="./img/one.png",v-show="floor=='一楼'").guide_aside_img
              img(src="./img/two.png",v-show="floor=='二楼'").guide_aside_img
              img(src="./img/three.png",v-show="floor=='三楼'").guide_aside_img
              img(src="./img/four.png",v-show="floor=='四楼'").guide_aside_img
              img(src="./img/seven.png",v-show="floor=='住院部七楼'").guide_aside_img
              div(:style='`top:${popoverTop}%;left:${popoverLeft}%`',v-show="popoverShow").guide_aside_popover
                  .guide_aside_popoverContent(@click="showInfo")
                      h3 {{info.ksmc || info.yjjclx}}
                      p 当前等待:{{info.waitPeople || info.djzsl}}人
              div(v-transfer-dom='')
                  x-dialog.guide_aside_info(v-model='infoShow')
                      .guide_aside_title
                          h4.guide_aside_name {{info.ksmc || info.yjjclx}}
                          ul.guide_aside_list
                              li.guide_aside_param 
                                  span  {{!info.yjkslx?"待就诊人数":"待检查人数"}}: 
                                  |{{info.waitPeople || info.djzsl}}
                              li.guide_aside_param 
                                  span  {{!info.yjkslx?"当前就诊号码":"当前检查号码"}}:
                                  |{{info.presentno || info.dqjzhm}}
                              li.guide_aside_param 
                                  span  当前叫号时间: 
                                  |{{info.registtime || info.nowTime}}
                              li.guide_aside_param(v-if="info.pbys") 
                                  span  科室医生: 
                                  |{{info.pbys}}
                              li.guide_aside_param    
                                  span  {{!info.yjkslx?"就诊位置":"检查位置"}}: 
                                  |{{info.deptplace ||  info.kswz}}
                      .guide_aside_text(v-show="!info.yjkslx")
                          h4.guide_aside_name {{!info.yjkslx?"科室介绍":"检查内容"}}:
                          p.guide_aside_content  {{info.remark}}
                      div(@click='infoShow=false').guide_aside_close
                          x-icon(type="ios-close-empty")


</template>
<script>
import { mapGetters } from "vuex";
import { API } from "@/services";
import { depart } from "./data.js";
import {
  XButton,
  Picker,
  Selector,
  PopupPicker,
  Popover,
  XDialog,
  TransferDomDirective as TransferDom
} from "vux";
export default {
  directives: {
    TransferDom
  },
  components: {
    XButton,
    Picker,
    Selector,
    PopupPicker,
    Popover,
    XDialog
  },
  data() {
    return {
      departLevel: 2,
      popoverShow: false,
      popoverLeft: 50 /* 左侧相对距离 */,
      popoverTop: 50 /* 顶部相对距离 */,
      infoShow: false /* 当前科室排号详情显示 */,
      departMentList: [] /* 科室数据 */,
      departMent: [],
      checkList: [] /* 检查数据 */,
      check: "",
      floorList: ["一楼", "二楼", "三楼", "四楼", "住院部七楼"] /*楼层数据 */,
      floor: "一楼",
      info: {
        /* deptname:"",
        waitPeople:"",
        presentno:"",
        registtime:"",
        deptplace:"" */
      },
      currentImg: "" /* 当前图片 */,
      floorImgList: "" /* 楼层图片地址列表 */,
      useChange: 0 /* 手动触发  */
    };
  },
  methods: {
    /**
     * @function floorChange
     * @description 楼层切换触发函数
     * @param  {string} floor 楼层的value值
     * @return {type} 改变楼层切换图片地址
     */
    floorChange(floor) {
      if (this.useChange == 0) {
        this.popoverShow = false;
        this.departMent = [];
        this.check = "";
      }
    },
    /**
     * @function departMentChange
     * @description 科室切换触发函数
     * @param  {array} departMent  当前选中科室的数组列表
     * @return {type} 科室选中弹出位置框
     */
    async departMentChange(departMent) {
      if (departMent.length == 0) {
        return false;
      }
      let value = departMent[departMent.length - 1];
      if (!value) {
        value = departMent[0];
      }
      this.useChange = 1;
      for (const item of this.departMentList) {
        if (item.id == value) {
          try {
            let res = await API.common.getDepart({
              id: item.id
            });
            this.info = res.data;
            this.popoverLeft = item.addressX;
            this.popoverTop = item.addressY;
            setTimeout(() => {
              this.popoverShow = true;
              this.useChange = 0;
            }, 20);
            this.floor = item.floor;
            return false;
          } catch (error) {
            this.popoverShow = false;
            this.useChange = 0;
            return false;
          }
        }
      }
    },
    /**
     * @function checkChange
     * @description
     * @param  {array} check 当前选中的检查列表
     * @return {type} 选中后弹出检验科所在的位置框
     */
    async checkChange(check) {
      if (!check) {
        return false;
      }
      this.useChange = 1;
      try {
        let res = await API.common.getCheckInfo({
          yjjclx: check
        });
        this.info = res.data;
        this.popoverLeft = res.data.addressX;
        this.popoverTop = res.data.addressY;
        /* for (const item of this.checkList) {
          if (item.yjjclx == check) {
            this.floor = item.floor;
            break;
          }
        } */
        if(res.data.kswz!= "住院部七楼"){
          this.floor=res.data.kswz.substr(0, 2);
        }else{
          this.floor="住院部七楼";
        }
        setTimeout(() => {
          this.popoverShow = true;
          this.useChange = 0;
        }, 20);
      } catch (error) {
        this.popoverShow = false;
        this.useChange = 0;
        return false;
      }
    },
    showInfo() {
      this.infoShow = true;
    },
    /**
     * @function showInfo
     * @description 科室挂号详情展示
     * @return {type} 展示科室挂号详情
     */
    showDepart(id) {
      API.common.getDepart({
        id: id
      });
      /* .then(res => {
          this.info = res.data;
          return res.data;
        }).catch(err=>{
          return 1;
        }); */
    },
    showCheck(id) {
      API.common
        .getCheckInfo({
          yjjclx: id
        })
        .then(res => {});
    },
    getDepartMent(depttype = null) {
      API.common.getDepartMent().then(res => {
        this.departMentList = this.dataForm(res.data);
      });
    },
    /**
     * @function {function name}
     * @param  {type} depttype {description}
     * @return {type} {description}
     */
    getCheck(depttype = null) {
      API.common.getCheck().then(res => {
        for (const item of res.data) {
          item.value = item.yjjclx;
          item.key = item.yjjclx;
            if (item.kswz && item.kswz != "住院部七楼") {
              item.floor = item.kswz.substr(0, 2);
            }
        }
        this.checkList = res.data;
      });
    },
    /**
     * @function {function name}
     * @param  {type} value {description}
     * @param  {type} name  {description}
     * @return {type} {description}
     */
    formatName(value, name) {
      if (name.split(" ")[1]) {
        return name.split(" ")[1];
      } else {
        return name;
      }
    },
    dataForm(data) {
      for (let item of data) {
        /* if(item.depttype==0){
          item.value = item.id; 
        }else{
          item.value = item.depttype;
          
        } */
        item.value = item.id;
        if (item.deptplace != "住院部七楼" && item.depttype != 0) {
          item.floor = item.deptplace.substr(0, 2);
        }
        item.parent = item.depttype;
      }
      return data;
    }
  },
  mounted() {
    this.getDepartMent();
    this.getCheck();
  }
};
</script>
