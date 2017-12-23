<style  lang="scss">
/**
 * 2017.11.22
 * wzh
 * 找回密码第一步
 */
 .rsFor{
   &_main{
     padding: 0 30px;
     box-sizing: border-box;
     background-color: #fff;
     height: 100%;
     overflow: hidden;
     &_group{
       input {
        font-size: 14px;
        color: #999;
        background: transparent;
        text-indent: 10px;
      }
      .vux-x-input {
        height: 45px;
        box-sizing: border-box;
        width: 100%;
        border-radius: 4px;
        border: solid 1px #969696;
        margin-top: 15px;
      }
      i {
        font-size: 20px;
        color: #999;
      }
       .weui-cells {
         :after {
          display: none;
        }
        &:before {
          display: none;
        }
      }
      .weui-cell {
        &:after {
          display: none;
        }
        &:before {
          display: none;
        }
      }
     }
     &_codeList{
       display: flex; 
       justify-content: space-between;
     }
     .rsFor_main_btn{
        height: 45px;
        box-sizing: border-box;
        width: 100%;
        border-radius: 4px;
        background-color: #f36837;
        border-radius: 8px;
        color: #fff;
        text-align: center;
        line-height: 45px;
        font-size: 16px;
        display: block;
        margin: 0;
        margin-top: 35px;
     }
      &_code{
        width: 55% !important;
     }
      .rsFor_main_getCode{
        width: 42% !important;
        border: solid 1px #969696;
        background: transparent;
        color: #333;
        font-size: 16px;
        margin-top: 15px;
     }
      
   }
 }
</style>
<template lang="pug">
  .rsFor
    .rsFor_main
      group.rsFor_main_group
        x-input(placeholder="请输入手机号码",is-type="china-mobile",type="text",required,v-model="form.user_phone")
        .rsFor_main_codeList
          x-input(class="rsFor_main_code",placeholder="请输入验证码",required,type="text",v-model="form.code")
          x-button(class="rsFor_main_getCode rsFor_main_btn",:class="{'register_code--disable':isDisable}",required,@click.native="getcode") {{codeText}}
        x-button(class="rsFor_main_btn" @click.native="nextStep") 下一步
</template>
<script>
import { XInput, Group, XButton } from 'vux'
export default {
  data() {
    return {
      confrim: "",
      toast: false,
      state: true,
      form: {
        user_phone: "",
        code: "",
      },
      /* 验证码内容 */
      codeText: "获取验证码",
      isDisable: false,
    }
  },
  components: {
    XInput,
    Group,
    XButton,
  },
  mounted: function() {
  },
  methods: {
    /* 获取验证码 */
    getcode() {
      /* 判断手机号是否有值 */
      if (!this.form.user_phone) {
        this.confrim = "请输入手机号码";
        this.toast = true;
        return false;
      }
      if (!this.isDisable) {
        
      }
    },
    /**@argument
     * 进入下一步
     */
    nextStep() {
      /* 值判断 */
      if (!this.form.user_phone) {
        this.$vux.toast.show({
          text: '请输入手机号码',
          type:"text",
          time:2000,
        });
        return false;
      }
      if (!this.form.code) {
        this.$vux.toast.show({
          text: '请输入验证码',
          type:"text",
          time:2000,
        });
        return false;
      }
    },

  }
}
</script>