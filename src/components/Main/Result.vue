<style lang="scss">
    .rsRes{
        &_main{
            height: 100%;
            .weui-search-bar__cancel-btn{
                color: #666;
                font-size: 15px;
            }
            .weui-search-bar__box .weui-search-bar__input{
                color: #999;
            }
            .weui-search-bar{
                background-color: #f4f4f4;
                &:after{
                    display: none;
                }
            }
        }
        &_content{
            height: 100%;
            overflow-y: auto;
            &_search{
                height: 44px;
        }
        &_list{
            height: calc(100% - 44px);
        }
        &_{
            
        }
        }
        
    }
</style>




<template lang="pug">
    .rsRes
        .rsRes_main
            .rsRes_nodata(v-show="noData")
                i(class="iconfont")  &#xe724; 
                h3.rsRes_nodata_title 暂无相关随访结果
            .rsRes_content(v-show="!noData")
                .rsRes_content_search
                    search(v-model="searchResult",:autoFixed="autoFixed",placeholder="请输入患者姓名") 
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
                        list-compent(type=0,:list="list")
                       
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
    computed: {
        ...mapGetters([
            'getUserInfoUserId',
            'getUserInfoToken',
        ]),
    },
    data() {
        return {
            autoFixed:true,
            /* 上拉加载更多 */
            swiper_pullUp: false,//显示加载
            swiper_nodata: false,//没有更多数据
            list: [],
            page: 1,
            noData: false,//当前页面暂无数据
            searchResult:"",
        }
    }, 
    watch: {
        "selectResult":function(){
            this.itemChange();
        },
    },
    methods: {
        /**@argument
         * 列表刷新
         */
        listRefresh() {
            this.list=[];
            this.page=1;
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
