<style lang="scss">
.common_nodata{
    position: fixed;
    left: 0;
    top:0;
    width: 100%;
    height: 100%;
    z-index: 999;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    >i{
        font-size: 120px;
        color: #999;
        width: 120px;
        text-align: center;
        margin-top: 50%;
    }
    >h3{
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
.app_main_loading{
    position: fixed;
    z-index: 99999;
    top: 50%;
    left:50%;
    transform: translate(-50%,-50%);
    stroke:#4b8bf4 !important;
    fill:#4b8bf4 !important
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

<template>
    <div>
        <transition :name="transitionName" class="router">
        <keep-alive>
            <router-view class="Router" id="router-container"></router-view>
        </keep-alive>
        </transition>
        <spinner class="app_main_loading" type="bubbles" size="40px" v-show="isLoading"></spinner>
    </div>
    
</template>

<script>
import { Spinner} from 'vux'
import { mapState } from 'vuex'
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
   mounted () {
       
   }
}


</script>


