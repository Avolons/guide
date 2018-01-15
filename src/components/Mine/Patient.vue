<style lang="scss">
.rsPat {
    height: 100%;
    &_main {
        .common_nodata{
            top:44px;
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
        }
        height: 100%;
        background-color: #fff;
        &_search {
            height: 44px;
            margin-bottom: 45px;
        }
        &_list {
            height: calc(100% - 99px);
        }
        &_check {
            /* height: calc(100% - 44px); */
            position: fixed;
            top: 44px;
            width: 100%;
            background-color: rgba(0, 0, 0, 0.3);
            z-index: 998;
        }
        &_sort {
            display: flex;
            align-items: center;
            font-size: 13px;
            height: 100%;
            >span {
                margin-right: 3px;
            }
        }
        &_sortList {
            position: absolute;
            top: 100%;
            width: 100%;
            font-size: 13px;
            box-sizing: border-box;
            background-color: #e6e6e6;
            padding: 0 15px;
            left: 0;
            >li {
                line-height: 35px;
            }
        }
        &_checkTitle {
            position: relative;
            height: 45px;
            background-color: #e6e6e6;
            display: flex;
            align-items: center;
            justify-content: space-between;
            box-sizing: border-box;
            padding: 0 15px;
            >div {
                width: 200px;
            }
            >span {
                font-size: 13px;
            }
        }
        &_btnList {
            height: 45px;
            display: flex;
            margin-top: 20px;
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
        &_checkContent {
            background-color: #f8f8f8;
            box-sizing: border-box;
            padding-top: 10px;
            font-size: 13px;
            input {
                width: 90px;
                height: 30px;
                background-color: #ffffff;
                border-radius: 2px;
                border: solid 1px rgba(5, 5, 5, 0.49);
                opacity: 0.36;
                box-sizing: border-box;
                padding: 0 5px;
                font-size: 12px;
            }
            >li {
                height: 45px;
                box-sizing: border-box;
                padding: 7.5px 15px;
                display: flex;
                align-items: center;
                span {
                    width: 75px;
                    display: block;
                }
                i {
                    display: block;
                    width: 50px;
                    height: 30px;
                    background-color: #e5e5e5;
                    border-radius: 2px;
                    border: solid 1px rgba(5, 5, 5, 0.1);
                    opacity: 0.36;
                    line-height: 30px;
                    text-align: center;
                    font-style: normal;
                    margin-right: 15px;
                }
                .select {
                    background-color: #f36837;
                    color: #fff;
                }
            }
        }
        &_title {
            background-color: #f7f7f7;
            height: 44px;
            line-height: 44px;
            font-size: 13px;
            color: #666;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            box-sizing: border-box;
            padding: 0 15px;
            >span {
                &:nth-of-type(1) {
                    width: 60px;
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
            .common_nodata(v-show="noData")
                i(class="iconfont")  &#xe628;
                h3.rsAct_nodata_title 暂无患者
            .rsPat_main_search
                search(@on-submit="searchData",v-model="searchParams.patientName",:autoFixed="autoFixed",placeholder="请输入患者姓名")
            //-.rsPat_main_title
                span 姓名
                span 性别/年龄
                span 疾病类型
            .rsPat_main_check
                .rsPat_main_checkTitle
                    .rsPat_main_sort(@click="checkShow(0)")
                        span {{searchParams.sort==-1?"综合排序":searchParams.sort==0?"就诊时间从早到晚":"就诊时间从晚到早"}}
                        x-icon(type="ios-arrow-down",size="12")
                    ul(v-show="sortShow").rsPat_main_sortList
                        li(v-for="item in options",@click="chooseSort(item.key)") {{item.value}}
                    span(@click="checkShow(1)") 筛选
                ul(v-show="doubleShow").rsPat_main_checkContent
                    li.rsPat_main_checkSingle
                        span 性  别：
                        i(:class="{'select':searchParams.sex=='男'}",@click="chooseSex('男')") 男
                        i(:class="{'select':searchParams.sex=='女'}",@click="chooseSex('女')") 女
                    li.rsPat_main_checkSingle
                        span 年  龄：
                        input(type="number",min="0",v-model="searchParams.fromAge")
                        |&nbsp; - &nbsp;
                        input(type="number",min="0",v-model="searchParams.endAge")
                    li.rsPat_main_checkSingle
                        span 就诊时间：
                        input(@click="chooseTime(0)",type="text",readonly="readonly" ,v-model="searchParams.startDate")
                        |&nbsp; - &nbsp;
                        input(@click="chooseTime(1)",type="text",readonly="readonly",v-model="searchParams.endDate")
                    .rsPat_main_btnList
                        button(type="button",@click="reset") 重置
                        button(type="button",@click="searchData") 完成

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
import { API } from '@/services';
import { Search, Group, Selector } from 'vux';
export default {
    components: {
        BScroll,
        ListCompent,
        Search,
        Group,
        Selector
    },
    data() {
        return {
            autoFixed: true,
            /* 上拉加载更多 */
            swiper_pullUp: false,//显示加载
            swiper_nodata: false,//没有更多数据
            list: [],
            page: 1,
            sortShow: false,//排序显示
            doubleShow: false,//多类筛选
            options: [{
                value: "综合排序",
                key: -1
            }, {
                value: "就诊时间从早到晚",
                key: 0
            }, {
                value: "就诊时间从晚到早",
                key: 1
            }],
            searchParams: {
                limit: 20,
                pager: 1,
                patientName: '',  //病人名称
                icdName: '',     //所患疾病名称
                sex: '',         //男 or 女
                fromAge: '',     //起始年龄
                endAge: '',     //结束年龄
                gz: '',     //0:不关注 1：关注 
                startDate: '',   //就诊时间的开始时间
                endDate: '',//就诊时间的结束时间
                sort: -1//0:就诊时间从最近到以前; 1:就诊时间从晚到早 
            },
            noData: false,
            searchResult: "",
        }
    },
    /* computed: {
        ...mapGetters([
            'getUserInfoUserId',
            'getUserInfoToken',
        ]),
    }, */
    methods: {
        /** 
         * 切换显示
         */
        checkShow(type) {
            if (type == 0) {
                this.doubleShow = false;
                this.sortShow = !this.sortShow;
                return false;
            }
            this.sortShow = false;
            this.doubleShow = !this.doubleShow;
        },
        /** 
         * 重置所有属性
         */
        reset() {
            this.searchParams.sex = "";
            this.searchParams.fromAge = "";
            this.searchParams.endAge = "";
            this.searchParams.startDate = "";
            this.searchParams.endDate = "";
        },
        /** 
         * 选择排序
         */
        chooseSort(val) {
            this.searchParams.sort = val;
            this.searchData();
        },
        /** 
         * 选择时间
         */
        chooseTime(type) {
            let flag;
            let self=this;
            if(type==0){
                if(this.searchParams.endDate){
                    flag=this.searchParams.endDate;
                }
                else{
                    flag="2020-12-30";
                }
            }else{
                if(this.searchParams.startDate){
                    flag=this.searchParams.startDate;
                }
                else{
                    flag="2000-01-01";
                }
            }
            this.$vux.datetime.show({
                value: '', // 其他参数同 props
                minYear:2000,
                maxYear:2020,
                confirmText:'确定',
                cancelText:'取消',
                startDate:type==1?flag:'2000-01-01',
                endDate:type==0?flag:'2020-12-30',
                onConfirm(){
                    let value=this.value;
                    type==0?self.searchParams.startDate=value:self.searchParams.endDate=value ;
                }
            })
        },
        /** 
         * 选择性别
         */
        chooseSex(type) {
            if (this.searchParams.sex == type) {
                this.searchParams.sex = "";
            } else {
                this.searchParams.sex = type;
            }
        },
        /**@argument
        * 列表刷新
        */
        listRefresh() {
            this.list = [];
            this.searchParams.pager = 1;
            /** 
             * 分页置为1
             */
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
            API.patientList.list(
                this.searchParams
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
        /* 滚动列表重置刷新 */
        scollRefresh() {
            this.$refs.scollView.scroll.refresh();
        },
        /** 
         * 数据搜索
         */
        searchData() {
            this.searchParams.pager = 1;
            this.list=[];
            this.doubleShow = false;
            this.sortShow = false;
            this.getList();
        }
    },
    activated () {
        this.$vux.datetime.hide();
    },
    mounted() {
        this.listRefresh();
    }
}
</script>
