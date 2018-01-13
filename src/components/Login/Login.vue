<style lang="scss">
.rsLogin {
  &_main {
    box-sizing: border-box;
    padding: 0 30px;
    background-color: #fff;
    overflow: hidden;
    height: 100%;
    &_asset {
      display: block;
      margin-top: 55px;
      margin-bottom: 12.5px;
      height: 91px;
      >img {
        display: block;
        margin: 0 auto;
        height: 100%;
      }
    }
    &_title {
      height: 45px;
      margin-bottom: 30px;
      >img {
        display: block;
        margin: 0 auto;
        height: 100%;
      }
    }
    &_group {
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
        margin-bottom: 15px;
      }
      i {
        font-size: 20px;
        color: #999;
      }
    }
    .rsLogin_main_button {
      margin-top: 15px;
      height: 45px;
      background-color: #f36837;
      text-align: center;
      line-height: 45px;
      border-radius: 4px;
      font-size: 16px;
      color: #fff;
      display: block;
    }
    &_select {
      font-size: 11px;
      color: #999;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .weui-icon-success:before {
        color: #f36837 !important;
      }
    }
    &_remember {}
    &_forget {
      font-size: 11px;
      color: #999;
    }
  }
}
</style>
<template lang="pug">
  .rsLogin
    .rsLogin_main
      //- svg图标
      .rsLogin_main_asset
        img(src="../../assets/img/common/logo.png")
      .rsLogin_main_title
        img(src="../../assets/img/common/title.png")
      group.rsLogin_main_group
        x-input(placeholder="请输入账号",type="text",v-model="form.user_phone",required) 
          i(class="iconfont",slot="label") &#xe6ac;
        x-input(placeholder="请输入密码",type="password",v-model="form.user_password",required)
          i(class="iconfont" slot="label") &#xe65e;
        .rsLogin_main_select
          check-icon(:value.sync="remember").rsLogin_main_remember 记住密码
          //- router-link(to="/forget").rsLogin_main_forget 忘记密码
        x-button(@click.native="login").rsLogin_main_button 登录
</template>
<script>
import { XInput, Group, XButton, CheckIcon } from 'vux';
import { API } from '@/services';
export default {
  data() {
    return {
      /* 登录信息 */
      form: {
        user_phone: "ddddd4444",
        user_password: "123456"
      },
      remember: true
    }
  },
  components: {
    XInput,
    Group,
    XButton,
    CheckIcon
  },
  methods: {
    login() {
      /* 用户名格式检验 */
      if (this.form.user_phone == '') {
        this.$vux.toast.show({
          text: '请输入正确的用户名',
          type: "cancel"
        })
        return false;
      }
      /* 用户密码格式校验 */
      if (this.form.user_password == '') {
        this.$vux.toast.show({
          text: '请输入正确的用户密码',
          type: "cancel"
        })
        return false;
      }
      API.common.login({
        username: this.form.user_phone,
        password: this.form.user_password
      }).then((res) => {
        this.$vux.toast.show({
          text: '登录成功',
          type: "success"
        });
        this.$store.dispatch('SetUserInfo', res);
        localStorage.setItem("userInfo", JSON.stringify(res));
        setTimeout(()=> {
          /** 
           *  判断是否已经选择智能ai助手
           *  选择了之后直接转到首页，没有则让其选择ai助手
           */
          if(!res.data.aiPictureCode){
            this.$router.push('/choseAi');
          }else{
            this.$router.push('/');
          }
        }, 500);
      }).catch((err) => {

      });
    },
  },
}
</script>
