<style lang="scss">
.rsActInfo {
    &_main {
        height: 100%;
       &_content{
           overflow: hidden;
           height: 100%;
       }
       &_header{
           margin: 15px auto;
           width: calc(100% - 30px);
           box-shadow: 0px 0px 8px 2px 
                rgba(0, 0, 0, 0.08);
            border-radius: 4px;
            border: solid 1px rgba(0, 0, 0, 0.09); 
            box-sizing: border-box;
            padding: 15px 10px;
            display: flex;
            flex-direction:column;
            >h3{
                font-size: 18px;
                color: #333;
            }
            >h4{
                font-size: 14px;
                color: #333;
            }
       }
       &_progress{
            display: flex;
            align-items: flex-end;
          >span{
              color: #333;
              font-size: 11px;
              margin-right: 15px;
          } 
       }
       &_mes{
           width: 70%;
          flex-grow: 1; 
          >span{
              display: block;
              text-align: center;
              font-size: 11px;
              color: #333;
          }
       }
       &_line{
           width: 100%;
            height: 10px;
            background-color: #d7d7d7;
            border-radius: 10px;
            display: block;
            border: solid 1px rgba(51, 51, 51, 0.09);
            position: relative;
            &:after{
                content:"";
                display: block;
                height: 100%;
                background-color: #10caff;
                border-radius: 10px;
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
            }
       }
        &_textList{
           
       }
        &_single{
           
       }
    }
}
</style>


<template lang="pug">
    .rsActInfo
        .rsActInfo_main
            .rsActInfo_main_content
                b-scroll(
                    :data="list",
                    @pulldown="listRefresh",
                    pulldown=true,
                    ref="scollView",
                    :swiper_pullUp="swiper_pullUp",
                    :swiper_nodata="swiper_nodata"
                )
                    .rsActInfo_main_header
                        h3 通知情况
                        h4 通知人数
                        .rsActInfo_main_progress
                            span 进度
                            .rsActInfo_main_mes
                                span 50人
                                i.rsActInfo_main_line
                    ul.rsActInfo_main_textList
                        li.rsActInfo_main_single
                            h3  关于二型糖尿病公益活动的通知
                            p 

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
            /* 上拉加载更多 */
            swiper_pullUp: false,//显示加载
            swiper_nodata: false,//没有更多数据
            list: [],
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
