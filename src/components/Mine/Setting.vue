<style lang="scss" >
.rsSetting_mine_list {
    margin: 0;
    margin-top: 10px;
    .weui-cells {
        margin: 0;
    }
}

.rsSetting_mine_single {
    height: 30px;
    .vux-label {
        font-size: 16px;
    }
}

.rsSetting_mine_singout{
    margin: 30px 0;
    display: block;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 16px;
    color: #333;
    background-color: #fff;
    width: 100%;
}
.weui-dialog__btn_primary{
    color: #f36837;
}
</style>


<template lang="pug">
    
    .rsSetting
        .rsSetting_actionList
            group.rsSetting_mine_list
                cell(:link="{path:'/change'}",title="修改密码").rsSetting_mine_single
                   
            group.rsSetting_mine_list
                cell(:link="{path:'/main/main/mine/setting/opinion'}",title="意见反馈").rsSetting_mine_single
                   
            button(type="button",@click="signOut").rsSetting_mine_singout 退出登录
</template>

<script>
import { Cell,Group} from 'vux';
export default {
    components: {
        Group,
        Cell,
    },
    data() {
        return {

        }
    },
    methods: {
        signOut(){
          let self=this;
          this.$vux.confirm.show({
            content: '确定要退出吗',
            onConfirm () {
                let userInfo={
                    loginname : "",
                    avatar : "",
                    id : "",
                    token : "",
                };
            /** 
             * 清除本地所有信息
             */
            localStorage.setItem("userInfo",'');
            self.$store.dispatch('SignOut');
            /** 
             * 返回登录页面
             */
            self.$router.push("/login");
            }
        })
         
      }
    },

}
</script>
