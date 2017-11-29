<style  lang="scss">
/**
 * 2017.11.22
 * wzh
 * 注册页面
 */
 .rsReg{
   &_main{
     padding: 0 30px;
     box-sizing: border-box;
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
     .rsReg_main_btn{
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
      .rsReg_main_getCode{
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
  .rsReg
    .rsReg_main
      group.rsReg_main_group
        x-input(placeholder="请输入手机号码",is-type="china-mobile",type="text",required,v-model="form.user_phone")
          i(class="iconfont",slot="label") &#xe666;
        .rsReg_main_codeList
          x-input(class="rsReg_main_code",placeholder="请输入验证码",required,type="text",v-model="form.code")
            i(class="iconfont",slot="label") &#xe601;
          x-button(class="rsReg_main_getCode rsReg_main_btn",:class="{'register_code--disable':isDisable}",required,@click.native="getcode") {{codeText}}
        x-button(class="rsReg_main_btn" @click.native="register") 确定
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
        user_password: ""
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
    /* 密码修改 */
    register() {
      /* 值判断 */
      if (!this.form.user_phone) {
        this.confrim = "请输入手机号码";
        this.toast = true;
        return false;
      }
      if (!this.form.code) {
        this.confrim = "请输入验证码";
        this.toast = true;
        return false;
      }
      if (!this.form.user_password) {
        this.confrim = "请输入新密码";
        this.toast = true;
        return false;
      }
      API.login.register(this.form).then((Response) => {
        if (Response.body.code == 200) {
          Response = Response.body.data;
          /* 触发vuex登录状态更改操作 */
          let token = Response.token;
          let userInfo = {
            loginname: Response.nickname,
            avatar: Response.face,
            id: Response.user_id,
            token: token,
          };
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
          this.$store.dispatch('SetUserInfo', userInfo);
          this.$router.push({
            path: '/index/main'
          })
        } else {
          this.confrim = Response.body.msg;
          this.toast = true;
        }
      });
    },

  }
}
</script>