<style  lang="scss">
.rsChange {
  &_main {
    background-color: #fff;
    height: 100%;
    overflow: hidden;
    &_group {
      padding: 0 30px;
      padding-top: 2px;
      box-sizing: border-box;
      input {
        font-size: 13px;
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
    .rsChange_main_btn {
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
    &_confrim {
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
      //-header-cop(:heder_title="title")
      group.rsChange_main_group
        x-input(placeholder="请输入旧密码",type="text",required,v-model="form.oldPassword")
        x-input(placeholder="请输入新密码",type="text",required,v-model="form.newPassword")
        x-input(placeholder="请确认新密码",required,type="text",v-model="checkPassWord")
        p.rsChange_main_confrim 提示：密码可由数字和字母组成，长度不少于6位字符，不超过16位字符
        x-button(class="rsChange_main_btn" @click.native="nextStep") 确认
</template>
<script>
/** 
 * 密码修改组件
 * @module Change
 */
import HeaderCop from '../Common/Header.vue';
import { XInput, Group, XButton } from 'vux';
import { API } from '@/services'
export default {
  data() {
    return {
      /**
       * 密码内容
       */
      form: {
        oldPassword: "",
        newPassword: "",
      },
      title:"修改密码",
      checkPassWord: '',
    }
  },
  components: {
    XInput,
    Group,
    XButton,
    HeaderCop
  },
  mounted: function() {
  },
  methods: {
    /**
     * 确认修改密码
     * @function nextStep
     */
    nextStep() {
      /* 值判断 */
      if (!this.form.oldPassword) {
        this.$vux.toast.show({
          text: '请输入旧密码',
          type: "text",
          time: 1000,
        });
        return false;
      }
      if (!this.form.newPassword) {
        this.$vux.toast.show({
          text: '请输入新密码',
          type: "text",
          time: 1000,
        });
        return false;
      }
      if (this.form.newPassword != this.checkPassWord) {
        this.$vux.toast.show({
          text: '两次密码输入不同',
          type: "text",
          time: 1000,
        });
        return false;
      }
      API.common.pceditPassword(this.form).then((res) => {
        this.$vux.toast.show({
          text: '密码修改成功,请重新登录',
          time: 500,
        });
        /**
         * 清空操作
         */
        this.form = {
          oldPassword: "",
          newPassword: ""
        };
        this.checkPassWord = "";
        localStorage.setItem("userInfo", '');
        this.$store.dispatch('SignOut');
        setTimeout(() => {
          this.$router.push("/login");
        }, 800);

      }).catch((err) => {

      });
    },

  }
}
</script>
