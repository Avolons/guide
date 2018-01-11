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
        &_box{

        }
        &_headerTitle{
            font-size: 14px;
            color: #f36837;
            margin-bottom: 5px;
        }
        &_headerContent {
            /* display: none; */
            border: 1px solid #e6e6e6;
            border-radius: 4px;
            margin-bottom: 5px;
            box-sizing: border-box;
            padding: 5px;
        }
        &_headerSingle{
            font-size: 12px;
            font-weight: 400;
            margin-bottom: 5px;
            color: #999;
            >span{
                font-size: 10px;
                color: #333;
            }
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
            z-index: 499;
            width: 100%;
            height: 45px;
            display: flex;
            background-color: #fff;
            >button {
                flex: 1;
                display: block;
                height: 100%;
                line-height: 45px;
                color: 15px;
                color: #fff;
                text-align: center;
                &:first-of-type {
                    background-color: rgba(243,104,55,0.8);
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
                .perInfo_content_planBtn(v-show="currentTable==0")
                    button(type="button",@click="adopt(1)") 不通过
                    button(type="button",@click="adopt(2)") 通过
                actionsheet(@on-click-menu="passSelect",v-model="noPassReason" :menus="noPassList")
                    p(slot="header") 医生审核不通过原因
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
                    popup-picker(title="患者信息",:data="historyList", v-model="archives" ,@on-change="getHistoryData" ,placeholder="查看历史就诊档案")
                    .perInfo_content_header
                        .perInfo_content_headerBase
                            h3 {{baseData.brxm}}
                            h5 {{baseData.brxb}}/{{baseData.brage}}岁 汉族
                            span(v-show="baseData.GzTag") {{baseData.GzTag}}
                        h4 疾病类型：{{baseData.icdName}}
                        h4 联系电话：{{baseData.mobile}}
                        h4 就诊时间：{{baseData.diagnoseTime}}
                        //-具体就诊信息 隐藏
                        .perInfo_content_box
                        template(v-for="ite in archivesList")
                            h3.perInfo_content_headerTitle 性质：{{ite.mzOrZy=="mz"?"门诊":"住院"}}
                            h4 疾病诊断：{{ite.adminPatientDiagnose.icdName}}
                            template(v-if="ite.mzOrZy=='zy'")
                                ul(v-for="item,index in ite.znjqrCyxjList",:key="index").perInfo_content_headerContent
                                    li.perInfo_content_headerSingle
                                        span 科室：
                                        | {{item.departname}}
                                    li.perInfo_content_headerSingle
                                        span 医师：
                                        | {{item.doctorname}}
                                    li.perInfo_content_headerSingle
                                        span 入院诊断：
                                        | {{item.admissiondiagnose}}
                                    li.perInfo_content_headerSingle
                                        span 出院诊断：
                                        | {{item.leavediagnose}}
                                    li.perInfo_content_headerSingle
                                        span 入院情况：
                                        | {{item.admissiondescription}}
                                    li.perInfo_content_headerSingle
                                        span 诊治经过：
                                        | {{item.cureprocess}}
                                    li.perInfo_content_headerSingle
                                        span 出院情况：
                                        | {{item.leavedescription}}
                                    li.perInfo_content_headerSingle
                                        span 出院医嘱 ：  
                                        | {{item.leavedoctorcharge}}
                                    li.perInfo_content_headerSingle
                                        span 入院时间：
                                        | {{item.admissiontime}}
                                    li.perInfo_content_headerSingle
                                        span 出院时间：
                                        | {{item.leavetime}}
                            template(v-else)
                                //-ul.perInfo_content_headerContent
                                    li.perInfo_content_headerSingle
                                        span 科室：
                                        | {{item.znjqrCfxx.ksmc}}
                                    li.perInfo_content_headerSingle
                                        span 医师：
                                        | {{item.znjqrCfxx.ysxm}}
                                    li.perInfo_content_headerSingle
                                        span 用药类型：
                                        | {{item.znjqrCfxx.cflx}}
                                    li.perInfo_content_headerSingle
                                        span 具体药品：
                                        //-template(v-for="ite in item.znjqrCfmxList")
                                            | {{ite.ypmc}}
                                    
                                        
                                   
                    .perInfo_content_table
                        span(:class="{'select':currentTable==0}",@click="tableSwitch(0)") 随访方案
                        i
                        span(:class="{'select':currentTable==1}",@click="tableSwitch(1)") 随访结果
                        //-随访方案
                    .perInfo_content_plan(v-show="currentTable==0")
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
                        
                        //- 随访结果
                    .perInfo_content_result(v-show="currentTable==1")
                        h3 随访结果
                        h4 结果正常
                        h5 完成时间：2017-09-10 9：00
                        ul.perInfo_content_resultList
                            li(v-for="item,index in resultList",:key="index").perInfo_content_resultSingle
                                h6 {{item.fieldName}}
                                | {{item.fieldValue}}
                        //- 随访记录详情
                        .perInfo_content_resultInfo
                            h4 记录详情
                            ul.perInfo_content_resultInfoList
                                template(v-for="item,index in resultList")
                                    li.perInfo_content_resultInfoAi
                                        i.iconfont &#xe607;
                                        span {{item.question}}
                                    li.perInfo_content_resultInfoUser
                                        i.iconfont &#xe601;
                                        audio(:src="basesrc+item.audio")
                                        .perInfo_content_resultInfoUser_text
                                            //- 记得加上class判断
                                            h4 指标{{item.isNormal?"正常":"不正常"}}
                                            h5 
                                             span {{item.fieldName}}
                                             | {{item.fieldValue}}




                    
</template>         

<script>
import ListCompent from '../Common/List.vue';//引入list列表组件
import BScroll from '../Common/scrollView.vue';
import { Search, PopupPicker,Group,Actionsheet } from 'vux'
import { mapGetters } from 'vuex';
import { API } from '@/services';
export default {
    components: {
        Actionsheet,
        Group,
        PopupPicker,
        BScroll,
        ListCompent,
        Search
    },
    computed: {
        ...mapGetters([

        ])
    },
    data() {
        return {
            basesrc:"",//基础语音前缀
            noPassReason:false,//不通过原因
            noPassList:["患者已死亡","方案重复","方案不匹配","不需要随访"],
            baseData:{},//用户基础数据
            currentTable: 0,
            archivesList:[],//患者就诊历史数据
            archives: [],//当前已经选择的就诊档案
            historyList: [],//患者档案历史
            copyHistory:[],//用于对比的历史数据
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
            planList:{},//随访计划列表
            resultList:[],//随访结果列表
        }
    },
    methods: {
        /** 
         * 获取历史诊断数据
         */
        getHistoryData(value){
            let taskId;
            for (const item of this.copyHistory) {
                if(item.diagnosetime==value){
                    taskId=item.taskIds[0];
                    break;
                }
            }  
            /** 
             * 获取数据
             */
            this.getList(value);
            this.getPlanList(taskId);
            this.getPlanResult(taskId);
        },
        /** 
         * 不通过计划
         */
        passSelect(menuKey,menuItem){
            let self = this;
            this.$vux.confirm.show({
                content:"是否确定不通过该计划",
                onConfirm() {
                    API.followplan.editVisitProjectStatus({
                        operateType:1 , //操作类型（1：不通过 2：通过）   
                        isAll: 2,  //是否全部提交（(1:是 2：否)）
                        ids: "",   //要修改的随访方案Id （逗号分隔）
                        noPassReason:menuItem,
                    }).then((res) => {
                        self.$vux.toast.show({
                            text: '不通过成功'
                        });
                        self.listRefresh();
                    });
                }
            });
        },
        /**@argument
         * 随访计划审核通过
         */
        adopt(type) {
            if(type!=2){
                this.noPassReason=true;
                return false;
            }
            let self = this;
            this.$vux.confirm.show({
                content:"确定要通过计划吗？",
                onConfirm() {
                    API.followplan.editVisitProjectStatus({
                        operateType:2, //操作类型（1：不通过 2：通过）   
                        isAll: 2,  //是否全部提交（(1:是 2：否)）
                        ids: "",   //要修改的随访方案Id （逗号分隔）
                    }).then((res) => {
                        self.$vux.toast.show({
                            text: '成功通过'
                        });
                        self.listRefresh();
                    });
                }
            });
        },
        /**@argument
         * table切换
         */
        tableSwitch(type) {
            this.currentTable = type;
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
                /** 
                 * 数据格式化
                 */
                let arr=[];
                for (const item of res.data) {
                    arr.push({
                    name:`${item.diagnosetime}/${item.mzOrzy==1?'门诊':item.mzOrzy==2?'住院':'住院和门诊'}/${item.isHasVisit==1?'有随访':'无随访'}`,
                    value:item.diagnosetime
                    })   
                }
                  this.historyList=[arr];
                  this.archives=[res.data[0].diagnosetime];
                  this.getHistoryData();
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
                if(this.baseData.taskId){
                this.getPlanList(this.baseData.taskId)
                    
                }
            }).catch((err) => {

            });
        },
        /**@argument
         * 获取诊断信息
         */
        getList(date) {
            API.patientList.getRecordByDate(
                {
                    patientId: this.id, //病人id
                    date: date[0],//选择的日期

                }
            ).then((res) => {
                this.archivesList=res.data;
            }).catch((err) => {

            });
        },
        /** 
         * 根据id获取随访结果
         */
        getPlanResult(id){
             API.followway.getVisistOrderResult(
                {
                 taskId:id //计划id
                }
            ).then((res) => {
                this.resultList=res.data;
                this.basesrc=res.AIVOICURL;
            }).catch((err) => {

            });
        },
        /** 
         * 获取随访计划列表
         */
        getPlanList(id){
            API.followplan.getVisitOrderDetail(
                {
                 taskId:id //计划id
                }
            ).then((res) => {

            }).catch((err) => {

            });
        },
        /**@argument
         * 列表刷新
         */
        listRefresh(date,id) {
            this.list = [];
            this.page = 1;
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
