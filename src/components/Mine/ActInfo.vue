<style lang="scss">
.rsActInfo {
    &_main {
        height: 100%;
        background-color: #fff;
        &_content {
            overflow: hidden;
            height: 100%;
        }
        &_header {
            margin: 15px auto;
            width: calc(100% - 30px);
            box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.08);
            border-radius: 4px;
            border: solid 1px rgba(0, 0, 0, 0.09);
            box-sizing: border-box;
            padding: 15px 10px;
            display: flex;
            flex-direction: column;
            >h3 {
                font-size: 15px;
                color: #333;
                margin-bottom: 5px;
            }
            >h4 {
                font-size: 13px;
                color: #333;
            }
        }
        &_progress {
            display: flex;
            align-items: flex-end;
            >span {
                color: #333;
                font-size: 11px;
                margin-right: 15px;
            }
        }
        &_mes {
            width: 70%;
            flex-grow: 1;
            >span {
                display: block;
                text-align: center;
                font-size: 11px;
                color: #333;
            }
        }
        &_line {
            width: 100%;
            height: 10px;
            background-color: #d7d7d7;
            border-radius: 10px;
            display: block;
            border: solid 1px rgba(51, 51, 51, 0.09);
            position: relative;
            &:after {
                content: "";
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
        &_textList {}
        &_single {}
    }
}

@for $i from 0 through 100 {
    .rsActInfo_main_line[range='#{$i}']:after {
        width: $i/100*100%
    }
}
</style>


<template lang="pug">
    .rsActInfo
        .rsActInfo_main
            .rsActInfo_main_content
                b-scroll(
                    :data="[infoData]",
                    @pulldown="getData",
                    pulldown=true,
                    ref="scollView",
                    :swiper_pullUp="swiper_pullUp",
                    :swiper_nodata="swiper_nodata"
                )
                    .rsActInfo_main_header
                        h4 通知人数: {{infoData.visitCount}}
                        .rsActInfo_main_progress
                            span 进度
                            .rsActInfo_main_mes
                                span {{infoData.visitCount}}
                                i(:range="infoData.visitCount").rsActInfo_main_line
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
    /* computed: {
        ...mapGetters([
            'getUserInfoUserId',
            'getUserInfoToken',
        ]),
    }, */
    data() {
        return {
            /* 上拉加载更多 */
            swiper_pullUp: false,//显示加载
            swiper_nodata: false,//没有更多数据
            infoData: {},
        }
    },
    methods: {
        /**@argument
         * 获取列表数据
         */
        getData() {
            API.activityTo.info(
                {
                    taskId: this.id
                }
            ).then((res) => {
                this.infoData = res.data;
                this.$nextTick(() => {
                    this.scollRefresh();
                });
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

    },
    activated() {
        this.id = this.$route.query.id;
        this.getData();
    }
}
</script>
