<style lang="scss">
.rsAct {
    &_main {
        height: 100%;
        .common_nodata {
            top: 50px;
        }
        &_list {
            height: calc(100% - 50px);
        }
        &_actList {
            overflow: hidden;
        }
        &_actSingle {
            background-color: #fff;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 7.5px 15px;
            margin-top: 10px;
            box-sizing: border-box;
            &:first-of-type {
                margin-top: 0;
            }
            >i {
                font-size: 20px;
                color: #c7c7c7;
            }
        }
        &_singleTitle {
            display: flex;
            flex-direction: column;
            >time {
                color: #333;
                font-size: 15px;
            }
            >span {
                font-size: 12px;
                color: #888;
            }
        }
    }
}
</style>


<template lang="pug">
    .rsAct
        .rsAct_main
            header-cop(:heder_title="title")
            .common_nodata(v-show="noData")
                i(class="iconfont")  &#xe628;
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
                        li(@click="enterInfo(item)",v-for="item,index in list",:key="index").rsAct_main_actSingle.elementAct
                            h3.rsAct_main_singleTitle
                                time {{item.visitStartTime}}
                                span.nowarp {{item.taskName}}
                            i.iconfont &#xe633;

</template>

<script>
/** 
 * 活动列表组件
 * @module Activity
 */
import HeaderCop from '../Common/Header.vue';
import BScroll from '../Common/scrollView.vue';
import { mapGetters } from 'vuex';
import { API } from '../../services';
export default {
    components: {
        BScroll,
        HeaderCop
    },
    /* computed: {
        ...mapGetters([
            'getUserInfoUserId',
            'getUserInfoToken',
        ]),
    }, */
    data() {
        return {
            title: '活动列表',
            autoFixed: true,
            /* 上拉加载更多 */
            swiper_pullUp: false,//显示加载
            swiper_nodata: false,//没有更多数据
            list: [],
            page: 1,
            noData: false,//当前页面暂无数据
            searchResult: "",
            loading: false
        }
    },
    watch: {
        "selectResult": function() {
            this.itemChange();
        },
    },
    methods: {
        /**
         * 进入活动详情
         * @param  {object} item 具体活动对象
         * @function enterInfo
         */
        enterInfo(item) {
            this.$router.push({
                path: '/main/main/mine/actInfo',
                query: {
                    id: item.id,
                    all: item.visitCount,
                    no: item.activityCount
                }
            });
        },
        /**
         * 列表刷新
         * @function listRefresh
         */
        listRefresh() {
            this.list = [];
            this.page = 1;
            this.getList();
        },
        /**
         * 获取列表数据
         * @function getList
         */
        getList() {
            if (this.loading) {
                return false;
            }
            this.loading = true;
            if (this.list.length >= 20) {
                this.swiper_pullUp = true;
                this.swiper_nodata = false;
            }
            API.activityTo.list(
                {
                    pager: this.page,
                    limit: 20,
                }
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
                        if (this.list.length >= 20) {
                            this.swiper_nodata = true;
                        }
                    }
                    this.$nextTick(() => {
                        this.scollRefresh();
                        this.loading = false;
                    });
                    if (this.list.length == 0) {
                        this.noData = true;
                    } else {
                        this.noData = false;
                    }
                }, time);
            })
        },
        /**
         * 滚动实例重置（当前页面总高度发生变化是需要调用此函数）
         * @function scollRefresh
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
