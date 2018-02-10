<style lang="scss">
.common_nodata {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    >i {
        font-size: 120px;
        color: #999;
        width: 120px;
        text-align: center;
        margin-top: 50%;
    }
    >h3 {
        margin-top: 10px;
        font-size: 13px;
        text-align: center;
    }
}

.Router {
    position: absolute;
    width: 100%;
    transition: all .4s ease;
    top: 0;
    height: 100%;
    background-color: #f4f4f4;
}

.app_main_loading {
    position: fixed;
    z-index: 99999;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    stroke: #FFAC74 !important;
    fill: #FFAC74 !important
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
</style>

<style>
* {
    margin: 0;
    padding: 0;
}
</style>

<template>
    <div>
        <transition :name="transitionName" class="router">
            <keep-alive v-if="$route.meta.keepAlive">
                <router-view class="Router" id="router-container"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive" class="Router" id="router-container"></router-view>
        </transition>
        <spinner class="app_main_loading" type="bubbles" size="40px" v-show="isLoading"></spinner>
    </div>
</template>

<script>
import { Spinner } from 'vux';
import { mapState } from 'vuex';
export default {
    data() {
        return {
            transitionName: 'slide-right'  // 默认动态路由变化为slide-right
        }
    },
    components: {
        Spinner
    },
    computed: {
        ...mapState({
            isLoading: state => state.isLoading
        })
    },
    watch: {
        '$route'(to, from) {
            let isBack = this.$router.isBack  //  监听路由变化时的状态为前进还是后退
            if (isBack) {
                this.transitionName = 'slide-right'
            } else {
                this.transitionName = 'slide-left'
            }
            this.$router.isBack = false
        }
    },
    mounted() {
        /* function isWeiXin() {
            var ua = window.navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                return true;
            } else {
                return false;
            }
        }
        if (isWeiXin()) {
            function getQueryString(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                var r = location.search.substr(1).match(reg);
                if (r != null)
                    return unescape(decodeURI(r[2]));
                return null;
            }

            let openId = localStorage.getItem("openId");
            var access_code = getQueryString('code');
            if (!openId) {
                if (access_code == null) {
                    var fromurl = location.href;//获取授权code的回调地址，获取到code，直接返回到当前页  
                    var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd2d03971acd3bbf3&redirect_uri=' + location.href + '&response_type=code&scope=snsapi_base&state=0#wechat_redirect';
                    location.href = url;
                } else {
                    if (!openId) {
                        localStorage.setItem("openId", access_code);
                    }

                }
            }
        } */

    }
}


</script>


