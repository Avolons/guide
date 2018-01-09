<style lang="scss">
.rsOpin_main {
    overflow: hidden;
    height: 100%;
    background-color: #fff;
    box-sizing: border-box;
    padding: 0 15px;
    padding-top: 15px;
    .weui-cells {
        &:before {
            display: none;
        }
        &:after {
            display: none;
        }
    }
    .weui-cell{
       &:before {
            display: none;
        }
        &:after {
            display: none;
        }  
    }
    &_textarea {
        border: 1px solid #dadada;
        border-radius: 4px;
    }
    &_title {
        font-weight: 400;
        font-size: 14px;
        color: #272727;
        margin-top: 30px;
        margin-bottom: 10px;
    }
    &_input {
        border-radius: 4px;
        height: 40px;
        width: 100%;
        line-height: 40px;
        border: none;
        border: 1px solid #dadada;
        box-sizing: border-box;
        font-size: 13px;
        padding: 5px;
        margin-top: 20px;
    }
    &_btn {
        height: 40px;
        width: 100%;
        text-align: center;
        line-height: 40px;
        font-size: 15px;
        color: #fff;
        background-color: #f36837;
        border-radius: 5px;
        display: block;
        margin: 0 auto;
        margin-top: 20px;
    }
}
</style>

<template lang="pug">
  .rsOpin
    .rsOpin_main
        group
        x-textarea.rsOpin_main_textarea(:max='100', v-model='content')
        input.rsOpin_main_input(v-model='contact', type='text', placeholder='您的邮箱或者手机号')
        h3.rsOpin_main_title 或通过以下方式联系我们:
            br
            |微信公众号：集医智能
            br
            |邮箱：renshi@myaidoctor.com
        button.rsOpin_main_btn(@click='sendOption', type='button') 提交

</template>
<script>
import { XHeader, Group, XButton, XTextarea } from 'vux'
import { mapGetters } from 'vuex'
import { API } from '@/services'

export default {
    components: {
        XHeader,
        Group,
        XButton,
        XTextarea,
    },
    data() {
        return {
            content: "",//内容
            contact: ""//联系方式
        }
    },
   /*  computed: {
        ...mapGetters([
            'getUserInfoUserId',
            'getUserInfoToken',
        ])
    }, */
    methods: {
        /**@argument
         * 提交评价
         */
        sendOption() {
            if (!this.content) {
                this.$vux.toast.show({
                    text: '请输入您的评价',
                    time: 1000,
                });
                return false;
            }
            if (!this.contact) {
                this.$vux.toast.show({
                    text: '请输入您的联系方式',
                    time: 1000,
                });
                return false;
            }
            API.common.sendMessage({
                fromSys:2,
                suggestion: this.content,
                contactWay: this.contact
            }).then((res) => {
                    this.$vux.toast.show({
                        text: '感谢您的评价',
                        time: 500,
                    });
                    this.content = "";
                    this.contact = "";
                    setTimeout(() =>{
                      this.$router. back(-1);
                    }, 800);
               
            }).catch((err)=>{

            });
        }
    }
}
</script>