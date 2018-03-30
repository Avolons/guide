<style lang="scss">
.rsPlan {
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
    &_fixed {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 45px;
        width: 100%;
        z-index: 9999;
        background: #fff;
        border-top: 1px solid #e5e5e5;
        display: flex;
        justify-content: space-around;
        box-sizing: border-box;
        padding-left: 15px;
        align-items: center;
        &_allCheck {
            display: flex;
            height: 100%;
            align-items: center;
            >input {
                height: 20px;
                width: 20px;
            }
            font-size: 11px;
            color: #333;
        }
        &_haveSel {
            width: 85px;
            height: 100%;
            padding: 0 35px 0 10px;
            display: flex;
            align-items: center;
            font-size: 12px;
            color: #333;
        }
        &_btnList {
            height: 100%;
            flex-grow: 1;
            display: flex;
        }
        &_ok {
            width: 100%;
            height: 44px;
            line-height: 44px;
            text-align: center;
            background-color: #fa9f7f;
            text-align: center;
            display: block;
            font-size: 15px;
            color: #fff;
            border-radius: 0;
        }
    }
    &_content {
        height: 100%;
        &_search {
            height: 44px;
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
        &_list {
            height: calc(100% - 98px);
        }
    }
}
</style>




<template lang="pug">
    .rsPlan
        .rsPlan_main
            .rsPlan_fixed(v-show="currentTable==0")
                .rsPlan_fixed_allCheck
                    input(@change="allCheck",type="checkbox",v-model="selectAll",value=1).mui-checkbox
                    span 全选
                .rsPlan_fixed_haveSel 条数
                    span （{{selectNumber}}/{{list.length}}）
                .rsPlan_fixed_btnList
                    button(type="button",@click="adopt").rsPlan_fixed_ok   通过
            .rsPlan_nodata(v-show="noData")
                i(class="iconfont")  &#xe628;
                h3.rsPlan_nodata_title 没有相关随访计划
            .rsPlan_content
                .rsPlan_content_search
                    search(@on-cancel="searchData", @on-submit="searchData",v-model="searchParams.patientName",:autoFixed="autoFixed",placeholder="请输入患者姓名")
                .rsPlan_content_table
                    span(:class="{'select':currentTable==0}",@click="tableSwitch(0)") 待审核({{tableNumber[0]}})
                    i
                    span(:class="{'select':currentTable==1}",@click="tableSwitch(1)") 已通过({{tableNumber[1]}})
                    i
                    span(:class="{'select':currentTable==2}",@click="tableSwitch(2)") 未通过({{tableNumber[2]}})
                .rsPlan_content_list
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
                        list-compent(:type="listType",:list="list",ref="listplan",@itemChange="itemChange")
</template>

<script>
/** 
 * 随访计划组件
 * @module Plan
 */
import ListCompent from '../Common/List.vue';//引入list列表组件
import BScroll from '../Common/scrollView.vue';
import { mapGetters,mapState } from 'vuex';
import { API } from '../../services';
import { Search } from 'vux';
export default {
    components: {
        BScroll,
        ListCompent,
        Search
    },
    computed: {
        ...mapState({
            isLoading: state => state.isLoading
        })
    },
    data() {
        return {
            listType: '1',//列表样式类型
            tableNumber: [0, 0, 0],
            currentTable: 0,//当前的table
            autoFixed: true,
            /* 上拉加载更多 */
            swiper_pullUp: false,//显示加载
            swiper_nodata: false,//没有更多数据
            list: [],
            // 搜索数据集合
            searchParams: {
                patientName: "", //患者名称
                sex: "",  // （性别传中文（男 or 女 ））
                fromAge: 0, //开始年龄
                endAge: 100,  //结束年龄
                status: 4,    //(1:已通过 2:未通过 3:已审核 4:未审核)
                pager: 1,      //可不传（默认1）
                limit: 20     //可不传 （默认100）
            },
            //没有数据
            noData: false,
            selectAll: [],//全选
            searchResult: "",
            selectNumber: 0,
            loading:false,
            inter:null,
        }
    },
    methods: {
        /**
         * table切换（待审核，已通过，未通过）
         * @function tableSwitch
         * @param  {number} type table切换类型
         */
        tableSwitch(type) {
            this.currentTable = type;
            this.$refs.listplan.selectResult=[];
            this.searchParams.pager = 1;
            if (type == 0) {
                this.searchParams.limit = 20;
                this.searchParams.status = 4;
                this.listType='1';
            } else if (type == 1) {
                this.searchParams.limit = 20;
                this.searchParams.status = 1;
                this.listType='2';
            } else {
                this.searchParams.limit = 20;
                this.searchParams.status = 2;
                this.listType='2';
            }
            this.list = [];
            this.$store.commit('updateLoadingStatus', {isLoading: true});
            this.getList();
        },
        /**
         * 搜索函数
         * @function searchData
         */
        searchData(){
            this.list = [];
            this.searchParams.pager = 1;
            this.getList();
        },
        /**
         * 获取列表数据
         * @function getList
         */
        getList() {
            if(this.loading){
                return false;
            }
            this.loading=true;
            if (this.list.length >= 20) {
                this.swiper_pullUp = true;
                this.swiper_nodata = false;
            }
            API.followplan.list(
                this.searchParams
            ).then((res) => {
                let time = 0;
                if (this.list.length != 0) {
                    time = 500;
                }
                setTimeout(() => {
                    if (res.data.length > 0 || this.searchParams.pager == 1) {
                        this.swiper_pullUp = false;
                        for (const item of res.data) {
                            let current=new Date(item.visitStartTime).getTime()+24*60*60*1000;
                            let afterTime=(new Date(res.currentTime)).getTime();
                            item.interTime=current-afterTime;
                        }
                        this.list = this.list.concat(res.data);
                        if(this.searchParams.pager == 1){
                            this.tableNumber[0] = res.unExamineCount;
                            this.tableNumber[1] = res.passCount;
                            this.tableNumber[2] = res.noPassCount;
                        }
                        this.selectAll = [];
                        this.searchParams.pager++;
                    } else {
                        this.swiper_pullUp = false;
                        if (this.list.length >= 20) {
                            this.swiper_nodata = true;
                        }
                    }
                    this.$nextTick(() => {
                        this.scollRefresh();
                        this.loading=false;
                         clearTimeout(this.inter);
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
        /**
         * 随访计划审核
         * @function adopt
         */
        adopt() {
            if(this.$refs.listplan.selectResult.length==0){
                return false;
            }
            let ids = JSON.parse(JSON.stringify(this.$refs.listplan.selectResult)).join(",");
            let self = this;
            this.$vux.confirm.show({
                content: '确定要通过这些计划吗？',
                onConfirm() {
                    API.followplan.editVisitProjectStatus({
                        operateType: 2, //操作类型（1：不通过 2：通过）
                        isAll: 2,  //是否全部提交（(1:是 2：否)）
                        ids: ids   //要修改的随访方案Id （逗号分隔）
                    }).then((res) => {
                        self.$vux.toast.show({
                            text: '审核成功'
                        });
                        self.$refs.listplan.selectResult=[];
                        self.listRefresh();
                    });
                }
            });
        },
        /**
         * checkbox变化触发选择数组变动
         * @function itemChange
         */
        itemChange() {
            setTimeout(() => {
                if (this.$refs.listplan.selectResult.length == this.list.length && this.$refs.listplan.selectResult.length != 0) {
                    this.selectAll = [1];
                } else {
                    this.selectAll = [];
                }
            }, 20);
            this.selectNumber = this.$refs.listplan.selectResult.length;
        },
        /**
         * 随访计划全选函数
         * @function allCheck
         */
        allCheck() {
            if (this.selectAll.length == 0) {
                this.$refs.listplan.selectResult = [];
            } else {
                this.$refs.listplan.selectResult = [];
                for (const item of this.list) {
                    this.$refs.listplan.selectResult.push(item.id);
                }
            }
            this.selectNumber = this.$refs.listplan.selectResult.length;
        },
        /**
         * 列表刷新
         * @function listRefresh
         */
        listRefresh() {
            this.list = [];
            this.selectNumber = 0;
            this.searchParams.pager = 1;
            this.selectAll = [];
            this.getList();
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
        this.inter=setTimeout(()=> {
            this.$store.commit('updateLoadingStatus', {isLoading: true});
        }, 1500);
        this.listRefresh();
    },
    activated() {

    }
}
</script>
