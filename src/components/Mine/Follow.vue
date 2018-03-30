<style lang="scss">
.rsFollow {
    &_main {
        .common_nodata {
            top: 44px;
        }
        .weui-search-bar__cancel-btn {
            color: #f36837;
            font-size: 15px;
        }
        .weui-search-bar__box .weui-search-bar__input {
            color: #999;
        }
        .weui-search-bar {
            &:after {
                display: none;
            }
        }
        .vux-search-box {
            position: fixed !important;
            width: 100%;
            /* top: 50px !important; */
        }
        height: 100%;
        background-color: #fff;
        &_list {
            height: 100%;
        }
        &_title {
            background-color: #f7f7f7;
            height: 44px;
            line-height: 44px;
            font-size: 12px;
            color: #666;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            box-sizing: border-box;
            padding: 0 15px;
            >span {
                &:nth-of-type(1) {
                    width: 65px;
                    flex-shrink: 0;
                    text-indent: 10px;
                }
                &:nth-of-type(2) {
                    width: 80px;
                    text-align: center;
                    flex-shrink: 0;
                }
                &:nth-of-type(3) {
                    flex-grow: 1;
                    text-align: center;
                    flex-shrink: 1;
                }
                &:nth-of-type(4) {
                    width: 80px;
                    text-align: center;
                    flex-shrink: 0;
                }
            }
        }
    }
}
</style>
<template lang="pug">
    .rsFollow
        .rsFollow_main
            //-header-cop(:heder_title="title")
            .common_nodata(v-show="noData")
                i(class="iconfont")  &#xe628;
                h3.rsAct_nodata_title 暂无关注患者
            .rsFollow_main_title
                span 姓名
                span 性别/年龄
                span 疾病诊断
                span 关注原因
            .rsFollow_main_list
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
                    list-compent(:list="list")
</template>
<script>
/** 
 * 特别关注患者组件
 * @module Follow
 */
import HeaderCop from '../Common/Header.vue';
import ListCompent from '../Common/Result.vue';//引入list列表组件
import BScroll from '../Common/scrollView.vue';
import { mapGetters } from 'vuex';
import { API } from '@/services';
import { Search } from 'vux';
export default {
    components: {
        BScroll,
        ListCompent,
        Search,
        HeaderCop
    },
    data() {
        return {
            title: "特别关注",
            autoFixed: true,
            /* 上拉加载更多 */
            swiper_pullUp: false,//显示加载
            swiper_nodata: false,//没有更多数据
            list: [],
            page: 1,
            noData: false,
            searchResult: "",
            loading: false
        }
    },
    methods: {
        /**
         * 列表刷新
         * @function  listRefresh
         */
        listRefresh() {
            this.list = [];
            this.selectNumber = 0;
            this.page = 1;
            this.selectAll = [];
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
            API.patientList.list(
                {
                    pager: this.page,
                    limit: 20,
                    gz: 1,
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
                        this.selectAll = [];
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
    }
}
</script>
