<style lang="scss">
    .rsPlan{
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
        &_fixed{
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
            &_allCheck{
                display: flex;
                height: 100%;
                align-items: center;
                >input{
                    height: 20px;
                    width: 20px;
                }
                font-size: 11px;
                color: #333;
            }
            &_haveSel{
                width: 85px;
                height: 100%;
                padding: 0 35px 0 10px;
                display: flex;
                align-items: center;
                font-size: 12px;
                color: #333;
            }
            &_btnList{
                height: 100%;
                flex-grow: 1;
                display: flex;
            }
            &_ok{
                width: 50%;
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
            &_del{
                width: 50%;
                height: 44px;
                line-height: 44px;
                text-align: center;
                background-color: #f36837;
                text-align: center;
                display: block;
                font-size: 15px;
                color: #fff;
                border-radius: 0;
            }
        } 
        &_content{
            height: 100%;
            &_search{
                height: 44px;
            }
            &_table{
                height: 45px;
                background-color: #fff;
                display: flex;
                justify-content: center;
                align-items: center;
                >span{
                    display: block;
                    height: 100%;
                    line-height: 45px;
                    text-align: center;
                    font-size: 15px;
                    color: #999;
                    width: calc(50% - 0.5px);
                }
                >{
                    i{
                        height: 50%;
                        width: 1px;
                        background-color: #999;
                        display: block;
                    }
                }
                margin-bottom: 10px;
            }
            &_list{
                height: calc(100% - 143px);
            }
        }
    }
</style>




<template lang="pug">
    .rsPlan
        .rsPlan_main
            .rsPlan_fixed(v-show="!noData")
                .rsPlan_fixed_allCheck
                    input(@change="allCheck",type="checkbox",v-model="selectAll",value=1).mui-checkbox    
                    span 全选
                .rsPlan_fixed_haveSel 条数
                    span （{{selectNumber}}/{{list.length}}）
                .rsPlan_fixed_btnList
                    button(type="button",@click="notPass").rsPlan_fixed_ok  不通过
                    button(type="button",@click="adopt").rsPlan_fixed_del   通过
            .rsPlan_nodata(v-show="noData")
                i(class="iconfont")  &#xe724; 
                h3.rsPlan_nodata_title 没有搜索到相关随访计划
            .rsPlan_content(v-show="!noData")
                .rsPlan_content_search
                    search(v-model="searchResult",:autoFixed="autoFixed",placeholder="请输入患者姓名")
                .rsPlan_content_table
                    span 待审核(110)
                    i
                    span 已审核(99)
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
                        list-compent(type=1,:list="list",ref="listplan",@itemChange="itemChange") 
</template>         

<script>
import ListCompent from '../Common/List.vue';//引入list列表组件
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
            noData: false,
            selectAll: [],//全选
            searchResult:"",
            selectNumber:0, 
        }
    }, 
    methods: {
        /**@argument
         * 随访计划审核通过
         */
        adopt(){
            let self = this;
            this.$vux.confirm.show({
                content: '确定要通过这些计划吗？',
                onConfirm() {
                    API.order.orderDel({
                        userId: self.getUserInfoUserId,
                        token: self.getUserInfoToken,
                        orderId: id,
                    }).then((res) => {
                            self.loading = true;
                            self.confrim = "删除成功";
                            self.toast = true;
                            self.orderList[self.currentType] = [];
                            self.currentPage = 1;
                            self.haveData = true;
                            self.getTypeData(self.currentType);
                    });
                }
            });
        },
        /**@argument
         * 随访计划审核不通过
         */
        notPass(){
            let self = this;
            this.$vux.confirm.show({
                content: '确定不通过这些计划吗？',
                onConfirm() {
                    API.order.orderDel({
                        userId: self.getUserInfoUserId,
                        token: self.getUserInfoToken,
                        orderId: id,
                    }).then((res) => {
                            
                            self.getTypeData(self.currentType);
                    });
                }
            });
        },
        /**@argument
         * table切换
         */
        tableSwitch(){

        },
        /* checkbox变化 */
        itemChange() {
            setTimeout(()=> {
                if (this.$refs.listplan.selectResult.length == this.list.length&&this.$refs.listplan.selectResult.length!=0) {
                this.selectAll = [1];
                } else {
                    this.selectAll =[] ;
                }    
            }, 20);
            this.selectNumber=this.$refs.listplan.selectResult.length;
        },
        /* 全选 */
        allCheck() {
            if (this.selectAll.length==0) {
                this.$refs.listplan.selectResult = [];
            } else {
                this.$refs.listplan.selectResult = [];
                for (const item of this.list) {
                    this.$refs.listplan.selectResult.push(item.id);
                }
            }
            this.selectNumber=this.$refs.listplan.selectResult.length;
        },
        /**@argument
         * 列表刷新
         */
        listRefresh() {
            this.list=[];
            this.selectNumber=0;
            this.page=1;
            this.selectAll =[] ;
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
            API.follow.plan(
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
                            this.selectAll =[] ;
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
    },
    activated() {
        
    }
}
</script>
