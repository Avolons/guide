<style lang="scss" >
.book_common {
    .vux-header .vux-header-left {
        >i {
            color: #333 !important;
        }
    }
    >.vux-header {
        height: 50px;
        box-sizing: border-box;
        background-color: #fff!important;
        box-shadow: 0 1px 1px 0px rgba(0, 0, 0, 0.2);
        border-bottom: 1px solid #eee;
        .vux-header-title {
            color: #333;
            font-size: 18px;
        }
    }
    .vux-header .vux-header-left a,
    .vux-header .vux-header-left button,
    .vux-header .vux-header-right a,
    .vux-header .vux-header-right button {
        color: #333;
        font-size: 13px;
    }
    .vux-header .vux-header-left .left-arrow:before {
        border-color: #333;
    }
}

body {
    .vux-actionsheet-menu-default {
        color: #2196f3;
    }
}
</style>

<template lang="pug">
    .book_common.
        <x-header   :left-options={preventGoBack:true} @on-click-back="goBack" :right-options="{showMore:true}" @on-click-more="showMenus = true">{{heder_title}}
        <i  @click="goBack" class="iconfont" style="font-size:24px;color:#fff" slot="overwrite-left" >&#xe617;</i>
        </x-header>
            <div v-transfer-dom>
                <actionsheet @on-click-menu="goHome" :menus="menus" v-model="showMenus" show-cancel></actionsheet>
            </div>
</template>

<script>
/**
 * 通用头部组件
 * @module Header
 */
import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux';
export default {
    directives: {
        TransferDom
    },
    props: ['heder_title'],
    components: {
        XHeader,
        Actionsheet,
        ButtonTab,
        ButtonTabItem
    },
    data() {
        return {

            menus:
            {
                menu1: "返回首页",
            },
            showMenus: false
        }
    },
    methods: {
        /** 
         * 路由回退 
         * @function goBack
         */
        goBack() {
            this.$router.goBack();
        },
        /**
         * 跳转到首页
         * @function goHome
         * @param  {string} key  组件返回去的key值
         * @param  {object} item 组件返回的item值
         * @return {}      无返回值
         */
        goHome(key, item) {
            this.$router.push({
                path: "/"
            });
        },

    }
}
</script>
