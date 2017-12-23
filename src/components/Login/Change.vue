<style  lang="scss">
/**
 * 2017.11.22
 * wzh
 * 找回密码第一步
 */
 .rsChange{
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
     .rsChange_main_btn{
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
     }
     &_confrim{
         margin-bottom: 23px;
         margin-top: 8px;
         font-size: 11px;
         color: #999;
         box-sizing: border-box;
         padding: 0 8px;
     }
   }
 }
</style>
<template lang="pug">
  .rsChange
    .rsChange_main
      group.rsChange_main_group
        x-input(placeholder="请输入新密码",is-type="china-mobile",type="text",required,v-model="form.password")
        x-input(placeholder="确认新密码",required,type="text",v-model="form.passwordAgain")
        p.rsChange_main_confrim 提示：密码可由数字和字母组成，长度不少于6位字符，不超过16位字符
        x-button(class="rsChange_main_btn" @click.native="nextStep") 确认
</template>
<script>
import { XInput, Group, XButton } from 'vux'
export default {
  data() {
    return {
      form: {
        password: "",
        passwordAgain: "",
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
    /**@argument
     * 确认修改密码
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