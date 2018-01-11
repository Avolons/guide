<style lang="scss">
.perInfo {
    &_main {
        background-color: #fff;
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
        &_header {
            font-size: 14px;
            color: #666;
            box-sizing: border-box;
            padding: 0 15px;
            >h4 {
                font-size: 10px;
                color: #666;
                margin-bottom: 10px;
            }
        }
        &_headerBase {
            display: flex;
            margin: 15px 0;
            align-items: center;
            >h3 {
                font-size: 16px;
                color: #333;
                margin-right: 10px;
            }
            >h5 {
                color: #999;
                font-size: 10px;
            }
            span {
                display: inline-block;
                padding: 0 5px;
                height: 22.5px;
                line-height: 22.5px;
                background-color: #e5e5e5;
                border-radius: 4px;
                border: solid 1px rgba(5, 5, 5, 0.1);
                opacity: 0.36;
                font-size: 10px;
                color: #666;
                margin-left: 10px;
            }
        }
        &_headerContent {
            display: none;
        }
        &_table {
            height: 45px;
            border: 1px solid #e5e5e5;
            border-left: none;
            border-right: none;
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
        }
        &_plan {
            box-sizing: border-box;
            padding: 15px;
            position: relative;
        }
        &_planHeader {
            border-bottom: 1px solid #e5e5e5;
            padding-bottom: 10px;
            >h3 {
                font-size: 13px;
                color: #333;
            }
            >span {
                display: block;
                font-size: 12px;
                color: #999;
                margin-top: 5px;
                >b {
                    color: #333;
                }
            }
        }
        &_planSingle {
            >h4 {
                font-size: 13px;
                color: #333;
                margin-bottom: 5px;
            }
            >span {
                display: block;
                font-size: 12px;
                margin-bottom: 5px;
                color: #999
            }
            >p {
                font-size: 12px;
                color: #666
            }
            box-sizing: border-box;
            padding: 10px 0;
            border-bottom: 1px solid #e5e5e5;
        }
        &_planBtn {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 45px;
            display: flex;
            >button {
                flex: 1;
                display: block;
                height: 100%;
                line-height: 45px;
                color: 15px;
                color: #fff;
                text-align: center;
                &:first-of-type {
                    background-color: #f36837;
                    opacity: 0.8;
                }
                &:last-of-type {
                    background-color: #f36837;
                }
            }
        }
    }
}
</style>




<template lang="pug">
    .perInfo
        .perInfo_main
            .perInfo_content
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
                    popup-picker(title="患者信息",:data="historyList", v-model="archives" ,@on-change="listRefresh" ,placeholder="查看历史就诊档案")
                    .perInfo_content_header
                        .perInfo_content_headerBase
                            h3 {{baseData.brxm}}
                            h5 {{baseData.brxb}}/{{baseData.brage}}岁 汉族
                            span(v-show="baseData.GzTag") {{baseData.GzTag}}
                        h4 疾病类型：{{baseData.icdName}}
                        h4 联系电话：{{baseData.mobile}}
                        h4 就诊时间：{{baseData.diagnoseTime}}
                        //-具体就诊信息 隐藏
                        ul.perInfo_content_headerContent
                            li.perInfo_content_headerSingle
                                span 科室
                                |
                            li.perInfo_content_headerSingle
                                span 医师
                                |
                            li.perInfo_content_headerSingle
                                span 科室
                                |
                            li.perInfo_content_headerSingle
                                span 科室
                                |
                            li.perInfo_content_headerSingle
                                span 科室
                                |
                            li.perInfo_content_headerSingle
                                span 科室
                                |
                            li.perInfo_content_headerSingle
                                span 科室
                                |
                            li.perInfo_content_headerSingle
                                span 科室
                                |
                            li.perInfo_content_headerSingle
                                span 科室
                                |
                            li.perInfo_content_headerSingle
                                span 科室
                                |
                            li.perInfo_content_headerSingle
                                span 科室
                                |
                    .perInfo_content_table
                        span(:class="{'select':currentTable==0}",@click="tableSwitch(0)") 随访方案
                        i
                        span(:class="{'select':currentTable==1}",@click="tableSwitch(1)") 随访结果
                        //-随访方案
                    .perInfo_content_plan
                        .perInfo_content_planHeader
                            h3 随访方案：糖尿病稳定一
                            span 随访计划生成时间：2017年11月6日
                            span 随访计划结束时间：2018年11月
                            span 随访计划生成时间：10次
                            span 
                                b 23：59：59
                                | 后自动通过审核
                        .perInfo_content_planList
                            li.perInfo_content_planSingle
                                h4 第一次随访
                                span 计划随访时间：2017年11月6日
                                p 采集指标 
                        .perInfo_content_planBtn
                            button(type="button") 不通过
                            button(type="button") 通过
                        //- 随访结果
                    .perInfo_content_result


                    

                    
</template>         

<script>
import ListCompent from '../Common/List.vue';//引入list列表组件
import BScroll from '../Common/scrollView.vue';
import { Search, PopupPicker, Group } from 'vux'
import { mapGetters } from 'vuex';
import { API } from '../../services';
export default {
    components: {
        Group,
        PopupPicker,
        BScroll,
        ListCompent,
        Search
    },
    data() {
        return {
            baseData:{},//用户基础数据
            currentTable: 0,
            archives: [],//当前已经选择的就诊档案
            historyList: [],//患者档案历史
            autoFixed: true,
            /* 上拉加载更多 */
            swiper_pullUp: false,//显示加载
            swiper_nodata: false,//没有更多数据
            list: [],
            //筛选字段集合
            searchParams: {
                pager: 1,
                limit: 20,
            },
            noData: false,//当前页面暂无数据
            searchResult: "",
        }
    },
    methods: {
        /**@argument
         * table切换
         */
        tableSwitch(type) {
            this.currentTable = type;
            this.searchParams.pager = 1;
            if (type == 0) {
                this.searchParams.limit = 20;
                this.searchParams.status = 4;
                this.listType = '1';
            } else if (type == 1) {
                this.searchParams.limit = 20;
                this.searchParams.status = 1;
                this.listType = '2';
            } else {
                this.searchParams.limit = 20;
                this.searchParams.status = 2;
                this.listType = '2';
            }
            this.list = [];
            this.getList();
        },
        /** 
         * 获取就诊历史记录时间表
         */
        getHistory(){
            API.patientList.getRecordDate(
                {
                    patientId: this.id //患者的id
                }
            ).then((res) => {
                  this.historyList=res.data;
            }).catch((err) => {

            });
        },
        /** 
         * 获取患者基本信息
         */
        getBaseData() {
            API.common.getPatientRecord(
                {
                    visitOrderId: this.visitOrderId, //visitOrder的id //有orderid就传
                    patientId: this.id //患者的id

                }
            ).then((res) => {
                this.baseData=res.data;
            }).catch((err) => {

            });
        },
        /**@argument
         * 获取诊断信息
         */
        getList() {
            API.patientList.getRecordByDate(
                {
                    patientId: 114850, //病人id
                    date: '2016-09-14',//选择的日期

                }
            ).then((res) => {
                console.log(JSON.stringify(res.data));
            }).catch((err) => {

            });
        },
        /** 
         * 获取随访计划列表
         */
        getPlanList(){
            API.followplan.getVisitOrderDetail(
                {
                 taskId:"" //计划id
                }
            ).then((res) => {
                console.log(res.data);
            }).catch((err) => {

            });
        },
        /**@argument
         * 列表刷新
         */
        listRefresh() {
            this.list = [];
            this.page = 1;
            this.getList();
            this.getBaseData();
            this.getHistory();
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
        /** 
         * 获取id
         */
        this.id = this.$route.query.id;
        this.visitOrderId = this.$route.query.visitOrderId;
        this.listRefresh();
    }
}
</script>
