<style lang="scss">
.rsRes {
    &_nodata {
        position: fixed;
        left: 0;
        top: 99px;
        width: 100%;
        height: calc(100% - 152px);
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
    &_main {
        height: 100%;
        .weui-search-bar__cancel-btn {
            color: #666;
            font-size: 15px;
        }
        .weui-search-bar__box .weui-search-bar__input {
            color: #999;
        }
        .weui-search-bar {
            background-color: #f4f4f4;
            &:after {
                display: none;
            }
        }
    }
    &_content {
        height: 100%;
        overflow-y: auto;
        &_search {
            height: 44px;
        }
        &_list {
            height: calc(100% - 44px);
        }
        &_table {
            height: 45px;
            background-color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            >span {
                display: block;
                height: 100%;
                line-height: 45px;
                text-align: center;
                font-size: 14px;
                color: #999;
                width: calc(50% - 0.5px);
            }
            >.select {
                color: #f36837;
            }
            >i {
                height: 50%;
                width: 1px;
                background-color: #999;
                display: block;
                flex-shrink: 0;
            }
            margin-bottom: 10px;
        }
    }
}
</style>




<template lang="pug">
    .rsRes
        .rsRes_main
            .rsRes_nodata(v-show="noData")
                i(class="iconfont")  &#xe628; 
                h3.rsRes_nodata_title 暂无相关随访结果
            .rsRes_content
                .rsRes_content_search
                    search(v-model="searchResult",:autoFixed="autoFixed",placeholder="请输入患者姓名") 
                .rsRes_content_table
                    span(:class="{'select':currentTable==0}",@click="tableSwitch(0)") 待处理
                    i
                    span(:class="{'select':currentTable==1}",@click="tableSwitch(1)") 已处理
                .rsRes_content_list
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
                        list-compent(type=0,:list="list",@dataReload="listRefresh")
                       
</template>         

<script>
import ListCompent from '../Common/List.vue';//引入list列表组件
import BScroll from '../Common/scrollView.vue';
import { Search } from 'vux'
import { mapGetters } from 'vuex';
import { API } from '../../services';
export default {
    components: {
        BScroll,
        ListCompent,
        Search
    },
    data() {
        return {
            currentTable: 0,//当前的table
            tableNumber: [0, 0],
            autoFixed: true,
            /* 上拉加载更多 */
            swiper_pullUp: false,//显示加载
            swiper_nodata: false,//没有更多数据
            list: [],
            //筛选字段集合
            searchParams: {
                patientName:'', //病人名称
                vetStatus:1,    //1未处理，11已处理
                pager: 1 , //默认1
                limit: 20   //默认100

            },
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
        tableSwitch(type) {
            this.currentTable = type;
            this.searchParams.pager = 1;
            if (type == 0) {
                this.searchParams.vetStatus = 1;
            } else {
                this.searchParams.vetStatus = 11;
            }
            this.list = [];
            this.getList();
        },
        /**@argument
         * 列表刷新
         */
        listRefresh() {
            this.list = [];
            this.searchParams.pager = 1;
            this.getList();
        },
        /**@argument
         * 获取列表数据
         */
        getList() {
            if (this.list.length >= 20) {
                this.swiper_pullUp = true;
                this.swiper_nodata = false;
            }
            this.$store.commit('updateLoadingStatus', {isLoading: true});
            API.followway.list(
                this.searchParams
            ).then((res) => {
                let time = 0;
                if (this.list.length != 0) {
                    time = 500;
                }
                setTimeout(() => {
                    if (res.data.length > 0 || this.searchParams.pager == 1) {
                        this.swiper_pullUp = false;
                        this.list = this.list.concat(res.data);
                        this.searchParams.pager++;
                    } else {
                        this.swiper_pullUp = false;
                        if (this.list.length >= 20) {
                            this.swiper_nodata = true;
                        }
                    }
                    this.$nextTick(() => {
                        this.scollRefresh();
                        this.$store.commit('updateLoadingStatus', {isLoading: false});
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
