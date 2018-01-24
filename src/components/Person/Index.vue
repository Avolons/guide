<style lang="scss">
.weui-cell {
    padding: 10px 15px;
    position: relative;
    display: flex;
    align-items: center;
}

.vux-popup-header-right {
    color: #f36837 !important;
}

.perInfo {
    &_main {
        .common_nodata {
            position: absolute;
            top: 0;
        }
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
        /* &_planGress{
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
        } */
        height: calc(100% - 50px);
        overflow-y: auto;
        &_tableBox {
            position: relative;
        }
        &_header {
            font-size: 14px;
            color: #666;
            box-sizing: border-box;
            padding: 0 15px;
            position: relative;
            >h4 {
                font-size: 10px;
                color: #666;
                margin-bottom: 10px;
            }
        }
        &_show {
            position: absolute;
            top: 45px;
            right: 35px;
        }
        &_headerBase {
            display: flex;
            margin: 15px 0;
            margin-top: 0px;
            align-items: center;
            position: relative;
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
            >button {
                position: absolute;
                right: 12px;
                top: 0;
                display: flex;
                justify-content: center;
                width: 50px;
                height: 23px;
                border-radius: 2px;
                border: solid 1px #f36837;
                font-size: 11px;
                color: #f36837;
                text-align: center;
                line-height: 23px;
            }
            >.haveAdd {
                color: #999999;
                border-color: #999;
            }
        }
        &_box {
            >h4 {
                font-size: 12px;
                color: #f36837;
                margin-bottom: 5px;
            }
        }
        &_headerTitle {
            font-size: 13px;
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
        &_headerSingle {
            font-size: 12px;
            font-weight: 400;
            margin-bottom: 5px;
            color: #999;
            >span {
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
            position: relative;
            >img {
                position: absolute;
                right: 15px;
                width: 50px;
            }
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
                    background-color: rgba(243, 104, 55, 0.8);
                }
                &:last-of-type {
                    background-color: #f36837;
                }
            }
        }
        &_result {
            box-sizing: border-box;
            padding: 15px;
            font-size: 13px;
            color: #333;
            position: relative;
            >h3 {
                font-size: 14px;
            }
            >h4 {
                margin: 5px 0;
            }
            >h5 {
                color: #999;
                margin-bottom: 15px;
            }
        }
        &_resultList {
            border-top: 1px solid #e5e5e5;
            box-sizing: border-box;
            padding: 10px 0;
            position: relative;
        }
        &_resultInfoList {
            position: relative;
        }
        &_resultSingle {
            font-size: 12px;
            color: #333;
            margin: 5px 0;
            >span {
                font-size: 12px;
                color: #999;
                margin-right: 2px;
            }
        }
        &_resultInfo {
            border-top: 1px solid #e5e5e5;
            background-color: #fff;
            >h4 {
                font-size: 14px;
                color: #f36837;
                margin: 5px 0;
            }
        }
        &_resultInfoList {
            background-color: #f7f7f7;
            border-radius: 2px;
            border: solid 1px rgba(0, 0, 0, 0.1);
            box-sizing: border-box;
            padding: 5px;
        }
        &_resultInfoAi {
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            >i {
                font-size: 15px;
                width: 15px;
                height: 15px;
                border-radius: 50%;
                border: 1px solid #999;
                margin-right: 5px;
                display: inline-block;
                flex-shrink: 0;
                flex-grow: 0;
                background-color: #fff;
            }
            >span {
                display: inline-block;
                padding: 5px;
                border-radius: 2px;
                background-color: #fff;
            }
        }
        &_getMore {
            position: absolute;
            top: 50%;
            right: 15px;
            transform: translateY(-50%);
        }
        &_resultInfoUser {
            margin-bottom: 10px;
            display: flex;
            justify-content: flex-end;
            flex-wrap: wrap;
            &_audio {
                width: 100%;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                >i {
                    font-size: 15px;
                    width: 15px;
                    height: 15px;
                    border-radius: 50%;
                    border: 1px solid #999;
                    margin-left: 5px;
                    display: block;
                    background-color: #fff;
                }
                >audio {
                    width: 50%;
                    display: inline-block;
                    padding: 5px;
                    border-radius: 2px;
                    background-color: #fff;
                }
            }
            &_text {
                background-color: #ffffff;
                border-radius: 3px;
                border: solid 1px rgba(5, 5, 5, 0.08);
                margin-top: 5px;
                padding: 5px;
                padding-right: 10px;
                margin-right: 20px;
                display: inline-block;
                >h4 {
                    font-size: 13px;
                    color: #fa2525;
                }
                >.normal {
                    color: #333;
                }
                >h5 {
                    font-size: 12px;
                    color: #333;
                    >span {
                        color: #999;
                    }
                }
            }
        }
    }
}
</style>




<template lang="pug">
    .perInfo
        .perInfo_main
            header-cop(:heder_title="title")
            .perInfo_content
                .perInfo_content_planBtn(v-show="currentTable==0&&planList.taskStatus==0")
                    button(type="button",@click="adopt(1)") 不通过
                    button(type="button",@click="adopt(2)") 通过
                actionsheet(@on-click-menu="passSelect",v-model="noPassReason" :menus="noPassList")
                    p(slot="header") 医生审核不通过原因
                b-scroll(
                    :data="list",
                    @scrollToEnd="listRefresh",
                    pullup=false,
                    pulldown=false,
                    ref="scollView",
                    :swiper_nodata="swiper_nodata"
                )
                    popup-picker(title="患者信息",:data="historyList", v-model="archives" ,@on-change="getHistoryData" ,placeholder="查看历史就诊档案")
                    .perInfo_content_header
                        x-icon(v-show="detailShow",@click="detailShow=!detailShow",type="ios-arrow-up",size="20").perInfo_content_show
                        x-icon(v-show="!detailShow",@click="detailShow=!detailShow",type="ios-arrow-down",size="20").perInfo_content_show
                        .perInfo_content_headerBase
                            h3 {{baseData.brxm}}
                            h5 {{baseData.brxb}}/{{baseData.brage}}岁 汉族
                            span(v-show="baseData.GzTag") {{baseData.GzTag}}
                            button(type="button",@click="addLike(0)",v-show="!baseData.GzTag")
                                i.iconfont &#xe61a;
                                | 关注
                            button(type="button",@click="addLike(1)",v-show="baseData.GzTag").haveAdd  已关注
                        h4 疾病类型：{{baseData.icdName}}
                        h4 联系电话：{{baseData.mobile}}
                        h4 就诊时间：{{baseData.diagnoseTime}}
                        //-具体就诊信息 隐藏
                        .perInfo_content_box(v-show="detailShow")
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
                                    template(v-if="ite.znjqrCfxx")
                                        ul.perInfo_content_headerContent
                                            li.perInfo_content_headerSingle
                                                span 科室：
                                                | {{ite.znjqrCfxx.ksmc}}
                                            li.perInfo_content_headerSingle
                                                span 医师：
                                                | {{ite.znjqrCfxx.ysxm}}
                                            li.perInfo_content_headerSingle
                                                span 用药类型：
                                                | {{ite.znjqrCfxx.cflx}}
                                            li.perInfo_content_headerSingle
                                                span 具体药品：
                                                template(v-for="ite in ite.znjqrCfmxList")
                                                    | {{ite.ypmc}},
                                        
                                        
                                   
                    .perInfo_content_table
                        span(:class="{'select':currentTable==0}",@click="tableSwitch(0)") 随访计划
                        i
                        span(:class="{'select':currentTable==1}",@click="tableSwitch(1)") 随访记录
                            //-无数据判断 
                    .perInfo_content_tableBox
                        .common_nodata(v-show="noData")
                            i(class="iconfont")  &#xe628;
                            h3.rsAct_nodata_title 暂无数据
                                //-随访方案
                        .perInfo_content_plan(v-show="currentTable==0")
                            .perInfo_content_planHeader
                                img(src="../../assets/img/common/nopass.png",v-show="planList.taskStatus==1")
                                h3 随访方案：{{planList.questionTempleName}}
                                span 随访计划生成时间：{{planList.visitTime}}
                                span 随访计划结束时间：{{planList.endTime}}
                                span 随访任务：10次
                                span(v-show="planList.taskStatus==2").perInfo_content_planGress 进度：{{planList.currentTime}}/{{planList.allCount}}
                                span(v-show="planList.taskStatus==1") 不通过原因：{{planList.notPassReason==1?"患者已死亡":planList.notPassReason==2?"患者不接受随访":planList.notPassReason==3?"方案重复":"方案不匹配"}}
                                span(v-show="planList.taskStatus==0")
                                    b {{planList.startDate}}
                                    | &nbsp;后自动通过审核
                            .perInfo_content_planList
                                li(v-for="item,index in planList.orderList" :key="index").perInfo_content_planSingle
                                    h4 第{{index+1}}次随访
                                        span {{item.statusStr}}
                                    span 计划随访时间：{{item.startDate}}
                                    p 采集指标：{{item.CollectionIndex}}
                            
                            //- 随访记录
                        .perInfo_content_result(v-show="currentTable==1")
                            h3 随访记录
                            h4 结果正常
                            h5 完成时间：2017-09-10 9：00
                            ul.perInfo_content_resultList
                                x-icon(@click="getMore",type="ios-arrow-right",size="30").perInfo_content_getMore
                                li(v-for="item,index in resultList",:key="index").perInfo_content_resultSingle
                                    span {{item.fieldName}}：
                                    | {{item.fieldValue}}
                            //- 随访记录详情
                            .perInfo_content_resultInfo
                                h4 记录详情
                                ul.perInfo_content_resultInfoList
                                    template(v-for="item,index in resultList")
                                        li.perInfo_content_resultInfoAi
                                            i.iconfont &#xe610;
                                            span {{item.question}}
                                        li.perInfo_content_resultInfoUser
                                            .perInfo_content_resultInfoUser_audio
                                                audio(controls="controls",:src="basesrc+item.audio")
                                                i.iconfont &#xe63d;
                                            .perInfo_content_resultInfoUser_text
                                                //- 记得加上class判断
                                                h4(:class="{'normal':item.isNormal}") 指标{{item.isNormal?"正常":"不正常"}}
                                                h5 
                                                span {{item.fieldName}}:
                                                | {{item.fieldValue}}




                    
</template>         

<script>
import HeaderCop from '../Common/Header.vue';
import ListCompent from '../Common/List.vue';//引入list列表组件
import BScroll from '../Common/scrollView.vue';
import { Search, PopupPicker, Group, Actionsheet } from 'vux';
import { mapGetters } from 'vuex';
import { API } from '@/services';
export default {
    components: {
        Actionsheet,
        Group,
        PopupPicker,
        BScroll,
        ListCompent,
        Search,
        HeaderCop
    },
    computed: {
        ...mapGetters([

        ])
    },
    data() {
        return {
            title:"患者详情",
            noData: false,
            taskId: '',
            detailShow: false,//是否显示患者诊断详情
            id: "",//患者id
            visitOrderId: "",
            basesrc: "",//基础语音前缀
            noPassReason: false,//不通过原因
            noPassList: [{ label: "患者已死亡", value: 1 }, { label: "患者不接受随访", value: 2 }, { label: "方案重复", value: 3 }, { label: "方案不匹配", value: 4 },],
            baseData: {},//用户基础数据
            currentTable: 0,
            archivesList: [],//患者就诊历史数据
            archives: [],//当前已经选择的就诊档案
            historyList: [],//患者档案历史
            copyHistory: [],//用于对比的历史数据
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
            planList: {},//随访计划列表
            resultList: [],//随访记录列表
        }
    },
    methods: {
        /** 
         * 进入指标详情页面
         */
        getMore() {
            this.$router.push({
                path: '/main/main/mine/patIndex',
                query: {
                    id: this.taskId,
                    hzxxId: this.id
                }
            })
        },
        /** 
         * 添加关注
         */
        addLike(type) {
            if (type == 0) {
                const _this = this;
                this.$vux.confirm.prompt('', {
                    title: '添加关注标签',
                    placeholder: '不得超过5个字',
                    onConfirm(msg) {
                        API.common.updateGz(
                            {
                                patientId: _this.id, //患者的id （必填）
                                operateTag: msg,
                                operateType: 1, //(操作类型 1:关注 0：取消关注) （必填）
                            }
                        ).then((res) => {
                            _this.$vux.toast.show({
                                text: '关注成功',
                                type: "success"
                            });
                            _this.getBaseData();
                            _this.$nextTick(() => {
                                this.scollRefresh();
                                this.$store.commit('updateLoadingStatus', { isLoading: false });
                            });
                        }).catch((err) => {

                        });
                    }
                })
            } else {
                API.common.updateGz(
                    {
                        patientId: this.id, //患者的id （必填）
                        operateType: 0, //(操作类型 1:关注 0：取消关注) （必填）
                    }
                ).then((res) => {
                    this.$vux.toast.show({
                        text: '取消关注成功',
                        type: "success"
                    });
                    this.getBaseData();
                }).catch((err) => {

                });
            }


        },
        /** 
         * 获取历史诊断数据
         */
        getHistoryData(value) {
            if (value) {
                /** 
                 * 日期判断
                 */
                let val = value[0];
                if (val.indexOf('临时随访') == -1) {
                    let taskId;
                    for (const item of this.copyHistory) {
                        if (item.diagnosetime == val) {
                            taskId = item.taskIds[0];
                            break;
                        }
                    }
                    this.taskId = taskId;
                    this.getList(val);
                } else {
                    this.archivesList = [];
                    let i = val.substring(1, 2);
                    console.log(i);
                    this.copyCurrent.forEach((vals, index) => {
                        if ((i-1) == index) {
                            this.taskId = vals.id;
                        }
                    });
                }

                /** 
                 * 获取数据
                 */
                if (this.taskId) {
                    this.getPlanList(this.taskId);
                    this.getPlanResult(this.taskId);
                } else {
                    this.noData = true;
                }

            }

        },
        /** 
         * 不通过计划
         */
        passSelect(menuKey, menuItem) {
            let self = this;
            this.$vux.confirm.show({
                content: "是否确定不通过该计划",
                onConfirm() {
                    API.followplan.editVisitProjectStatus({
                        operateType: 1, //操作类型（1：不通过 2：通过）   
                        isAll: 2,  //是否全部提交（(1:是 2：否)）
                        ids: self.taskId,   //要修改的随访方案Id （逗号分隔）
                        noPassReason: menuKey,
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
            if (type != 2) {
                this.noPassReason = true;
                return false;
            }
            let self = this;
            this.$vux.confirm.show({
                content: "确定要通过计划吗？",
                onConfirm() {
                    API.followplan.editVisitProjectStatus({
                        operateType: 2, //操作类型（1：不通过 2：通过）   
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
            this.noData = true;
            if (this.currentTable == 0) {
                if (this.planList.questionTempleName) {
                    this.noData = false;
                }
            } else {
                if (this.resultList.length > 0) {
                    this.noData = false;
                }
            }
        },
        /** 
         * 获取就诊历史记录时间表
         */
        getHistory() {
            API.patientList.getRecordDate(
                {
                    patientId: this.id //患者的id
                }
            ).then((res) => {
                /** 
                 * 数据格式化
                 */
                let arr = [];
                for (const item of res.data) {
                    arr.push({
                        name: `${item.diagnosetime}/${item.mzOrzy == 1 ? '门诊' : item.mzOrzy == 2 ? '住院' : '住院和门诊'}/${item.isHasVisit == 1 ? '有随访' : '无随访'}`,
                        value: item.diagnosetime
                    })
                }
                this.copyHistory = res.data;
                this.historyList = [arr];

                /** 
                 * 合并历史数据
                 */
                this.getTaskByHzId();

            }).catch((err) => {

            });
        },
        /** 
         * 获取所有的taskid
         */
        getTaskByHzId() {
            API.patientList.getTaskByHzId(
                {
                    patient: this.id //计划id
                }
            ).then((res) => {
                this.copyCurrent = res.data;
                (res.data).forEach((val, index) => {
                    let flag = 0;
                    for (const item of this.copyHistory) {
                        if (item.taskIds[0] == val.id) {
                            flag++;
                        }
                    }
                    if (flag == 0) {
                        this.historyList[0].push({
                            name: val.dateAdd + '/临时随访',
                            value: "第" + (index+1) + "临时随访"
                        });
                    }
                });
                if (this.$route.query.taskId) {
                    let id = this.$route.query.taskId;
                    this.copyCurrent.forEach((val, index) => {
                        if (id == val.id) {
                            this.archives = ["第" + (index+1) + "临时随访"];
                        }
                    });
                    for (const item of this.copyHistory) {
                        if (id == item.taskIds[0]) {
                            this.archives = [item.diagnosetime];
                        }
                    }
                } else {
                    this.archives = [this.historyList[0][0].value];
                }
                this.getHistoryData(this.archives);
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
                this.baseData = res.data;
                if (this.baseData.taskId) {
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
                    date: date,//选择的日期

                }
            ).then((res) => {
                this.archivesList = res.data;
                this.$nextTick(() => {
                    this.scollRefresh();
                    this.$store.commit('updateLoadingStatus', { isLoading: false });
                });
            }).catch((err) => {

            });
        },
        /** 
         * 根据id获取随访记录
         */
        getPlanResult(id) {
            API.followway.getVisistOrderResult(
                {
                    taskId: id //计划id
                }
            ).then((res) => {
                this.resultList = res.data || [];
                if (resultList.length > 0) {
                    this.noData = false;
                } else {
                    this.noData = true;
                }
                this.basesrc = res.AIVOICURL;
            }).catch((err) => {

            });
        },

        /** 
         * 获取随访计划列表
         */
        getPlanList(id) {
            API.followplan.getVisitOrderDetail(
                {
                    taskId: id //计划id
                }
            ).then((res) => {
                if (res.data.orderList.length > 0) {
                    this.planList = res.data;
                    this.noData = false;
                } else {
                    this.noData = true;
                }
                this.$nextTick(() => {
                    this.scollRefresh();
                    this.$store.commit('updateLoadingStatus', { isLoading: false });
                });
            }).catch((err) => {

            });
        },
        /**@argument
         * 列表刷新
         */
        listRefresh(date, id) {
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
        /** 
         * 获取id
         */
        this.id = this.$route.query.id;
        this.visitOrderId = this.$route.query.visitOrderId;
        this.listRefresh();
    },
    activated() {

    }
}
</script>
