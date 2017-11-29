<style lang="scss">
.rsAct {
    &_main {
        height: 100%;
        &_list {
            height: 100%;
        }
        &_actList{
        overflow: hidden;
    }
    &_actSingle{
        background-color: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 7.5px 15px;
        margin-top: 15px;
        box-sizing: border-box;
        >i{
            font-size: 20px;
            color: #c7c7c7;
        }
        
    }
    &_singleTitle{
        display: flex;
        flex-direction: column;
        >time{
            color: #000;
            font-size: 17px;
        }
        >span{
            font-size: 13px;
            color: #888;
        }
    }
    }
}
</style>


<template lang="pug">
    .rsAct
        .rsAct_main
            .rsAct_nodata(v-show="noData")
                i(class="iconfont")  &#xe724; 
                h3.rsAct_nodata_title 暂无相关活动通知
            .rsAct_main_list
                b-scroll(
                    :data="list",
                    @pulldown="listRefresh",
                    @scrollToEnd="getList",
                    pullup=true,
                    pulldown=true,
                    ref="scollView",
                    :swiper_pullUp="swiper_pullUp",
                    :swiper_nodata="swiper_nodata"
                )
                    ul.rsAct_main_actList
                        li.rsAct_main_actSingle.elementAct
                            h3.rsAct_main_singleTitle
                                time 2017-11-18
                                span.nowarp 关于二形糖尿病公益活动的通知
                            i.iconfont &#xe633;
                       
</template>         

<script>
import BScroll from '../Common/scrollView.vue';
import { mapGetters } from 'vuex';
import { API } from '../../services';
export default {
    components: {
        BScroll,
    },
    computed: {
        ...mapGetters([
            'getUserInfoUserId',
            'getUserInfoToken',
        ]),
    },
    data() {
        return {
            autoFixed: true,
            /* 上拉加载更多 */
            swiper_pullUp: false,//显示加载
            swiper_nodata: false,//没有更多数据
            list: [],
            page: 1,
            noData: false,//当前页面暂无数据
            searchResult: "",
        }
    },
    watch: {
        "selectResult": function() {
            this.itemChange();
        },
    },
    methods: {
        /**@argument
         * 列表刷新
         */
        listRefresh() {
            this.list = [];
            this.page = 1;
            this.getList();
        },
        /**@argument
         * 获取列表数据
         */
        getList() {
            if (this.list.length >= 10) {
                this.swiper_pullUp = true;
                this.swiper_nodata = false;
            }
            API.follow.result(
                /* {
                page: this.page,
                pageNumber: 10,
                userId: this.getUserInfoUserId,
                 } */
            ).then((res) => {
                let time = 0;
                if (this.list.length != 0) {
                    time = 500;
                }
                setTimeout(() => {
                    if (res.data.length > 0 || this.page == 1) {
                        this.swiper_pullUp = false;
                        this.list = this.list.concat(res.data);
                        this.page++;
                    } else {
                        this.swiper_pullUp = false;
                        if (this.list.length >= 10) {
                            this.swiper_nodata = true;
                        }
                    }
                    this.$nextTick(() => {
                        this.scollRefresh();
                    });
                    if (this.list.length == 0) {
                        this.noData = true;
                    } else {
                        this.noData = false;
                    }
                }, time);
            })
        },
        /**@argument
         * 滚动列表重置刷新
         */
        scollRefresh() {
            this.$refs.scollView.scroll.refresh();
        },
    },
    mounted() {
        this.listRefresh();
    },
    activated() {

    }
}
</script>
