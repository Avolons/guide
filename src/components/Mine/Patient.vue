<style lang="scss">
.rsPat {
    height: 100%;
    &_main {
        .weui-search-bar__cancel-btn{
                color: #f36837;
                font-size: 15px;
            }
            .weui-search-bar__box .weui-search-bar__input{
                color: #999;
            }
            .weui-search-bar{
                &:after{
                    display: none;
                }
            }
        .vux-search-box{
            position: fixed !important;
            width: 100%;
        }
        height: 100%;
        background-color: #fff;
        &_list {
           height: calc(100% - 84px); 
        }
        &_title {
            background-color: #f7f7f7;
            height: 40px;
            line-height: 40px;
            font-size: 13px;
            color: #666;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            box-sizing: border-box;
            padding: 0 15px;
            >span {
                &:nth-of-type(1){
                width: 60px;
                flex-shrink: 0;
                text-indent: 10px;
            }
            &:nth-of-type(2){
                width: 80px;
                text-align: center;
                flex-shrink: 0;
            }
            &:nth-of-type(3){
                flex-grow: 1;
                flex-shrink: 1;
            }
            }
        }
    }
}
</style>
<template lang="pug">
    .rsPat
        .rsPat_main
            .rsPat_main_search
                search(v-model="searchResult",:autoFixed="autoFixed",placeholder="请输入患者姓名")
            .rsPat_main_title
                span 姓名
                span 性别/年龄
                span 疾病类型
            .rsPat_main_list
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
import ListCompent from '../Common/Result.vue';//引入list列表组件
import BScroll from '../Common/scrollView.vue';
import { mapGetters } from 'vuex';
import { API } from '../../services';
import { Search } from 'vux';
export default {
    components: {
        BScroll,
        ListCompent,
        Search
    },
    data() {
        return {
            autoFixed: true,
            /* 上拉加载更多 */
            swiper_pullUp: false,//显示加载
            swiper_nodata: false,//没有更多数据
            list: [],
            page: 1,
            noData: false,
            searchResult: "",
        }
    },
    computed: {
        ...mapGetters([
            'getUserInfoUserId',
            'getUserInfoToken',
        ]),
    },
    methods: {
        /**@argument
        * 列表刷新
        */
        listRefresh() {
            this.list = [];
            this.selectNumber = 0;
            this.page = 1;
            this.selectAll = [];
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
            API.mine.result(
                {
                    page: this.page,
                    pageNumber: 10,
                    userId: this.getUserInfoUserId,
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
        /* 滚动列表重置刷新 */
        scollRefresh() {
            this.$refs.scollView.scroll.refresh();
        },
    },
    mounted() {
        this.listRefresh();
    }
}
</script>
