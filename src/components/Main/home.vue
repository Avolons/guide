<style  lang="scss">

.book_router{
    position: fixed;
    height: calc(100% - 53px);
    top:0;
    background-color: #f1f1f1;
    overflow-y: auto;
}
.index_tabbar {
    background-color: #fff;
}
.slide-left-enter,
.slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
}

.slide-left-leave-active,
.slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-100%, 0);
    transform: translate(-100% 0);
}

.weui-bar__item_on {
    .weui-tabbar__icon {
        color: #f36837 !important;
        .iconfont {
            color: #f36837 !important;
        }
    }
    .weui-tabbar__label {
        color: #f36837 !important;
    }
}
</style>
<template>
    <div class="index_container">
        <!-- 路由缓存 -->
        <transition :name="transitionName" class="book_router">
            <keep-alive>
                <router-view class="router-view Router book_router"></router-view>
            </keep-alive>
        </transition>
        <tabbar class="index_tabbar">
            <tabbar-item :selected="this.$route.fullPath=='/main/main'" :link="{path:'/main/main'}">
                <i  class="iconfont" slot="icon">&#xe603;</i>
                <span slot="label">首页</span>
            </tabbar-item>
            <tabbar-item :selected="this.$route.fullPath=='/main/main/plan'" :link="{path:'/main/main/plan'}">
                <i  class="iconfont" slot="icon">&#xe60c;</i>
                <span slot="label">随访计划</span>
            </tabbar-item>
            <tabbar-item :selected="this.$route.fullPath=='/main/main/result'" :link="{path:'/main/main/result'}">
                <i  class="iconfont" slot="icon">&#xe608;</i>
                <span slot="label">随访记录</span>
            </tabbar-item>
            <tabbar-item :selected="this.$route.fullPath=='/main/main/mine'" :link="{path:'/main/main/mine'}">
                <i  class="iconfont" slot="icon">&#xe6d9;</i>
                <span slot="label">我的</span>
            </tabbar-item>
        </tabbar>
    </div>
</template>
<script>
import { Tabbar, TabbarItem } from 'vux';
export default {
    data() {
        return {
            transitionName: 'slide-right', // 默认动态路由变化为slide-right
        }
    },
    components: {
        Tabbar,
        TabbarItem,
    },
    computed: {

    },
    watch: {
        /* 监听路由，使用过度效果 */
        '$route' (to, from) {
            const toDepth = to.path.split('/').length
            const fromDepth = from.path.split('/').length
            this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
        }
    },
    mounted: function() {
        
    },
    methods: {
      
    }
}

</script>