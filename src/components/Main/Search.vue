<style lang="scss">
.rsSearch {
    &_main {
        background-color: #f3f3f3;
        height: 100%;
        .weui-search-bar__cancel-btn{
                color: #f36837;
                font-size: 15px;
            }
            .weui-search-bar__box .weui-search-bar__input{
                color: #999;
            }
            .weui-search-bar{
                &:after{
                    display: none;
                }
            }
        .vux-search-box{
            position: fixed !important;
            width: 100%;
        }
    }
    &_search {
        width: 85%;
        border-radius: 5px;
        background-color: #f5f5f5;
        box-sizing: border-box;
        font-size: 14px;
        color: #6d6d6d;
        height: 30px;
        line-height: 30px;
        flex-grow: 1;
        display: flex;
        >i {
            float: left;
            font-size: 20px;
            color: #bfbfbf;
            margin-left: 10px;
        }
        >input {
            flex-grow: 1;
            background-color: #f5f5f5;
            border: none;
            border-radius: 5px;
        }
    }
    &_menu {
        width: 45px;
        flex-grow: 0;
        display: block;
        line-height: 30px;
        text-align: right;
        font-size: 15px;
        color: #313130;
    }
    &_history {
        padding-top: 44px;
        box-sizing: border-box;
        height: 100%;
        background-color: #fff;
        &_title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-sizing: border-box;
            padding: 0 15px;
            margin-top: 15px;
            >h2 {
                font-weight: 400;
                color: #333;
                font-size: 15px;
            }
            >button {
                border: none;
                background: transparent;
                color: #333;
                font-size: 15px;
            }
        }
        &_list {
            box-sizing: border-box;
            padding: 0 20px;
            >li {
                height: 30px;
                line-height: 30px;
                display: inline-block;
                margin-right: 10px;
                background-color: #fff;
                padding: 0 10px;
                font-size: 16px;
                margin-bottom: 10px;
                border-radius: 3px;
                text-align: center;
            }
        }
    }
}
</style>

<template lang="pug">
   div
    .rsSearch_main
        search(v-model="searchResult",:autoFixed="autoFixed",placeholder="请输入患者姓名")
        .rsSearch_history
            .rsSearch_history_title
                h2 历史搜索
                button(type='button', @click='cleanHistory()') 清空
            ul.rsSearch_history_list
                li(v-for='item in history', @click='historyrsSearch(item)') {{item}}
</template>

<script>
/** 
 * 搜索组件（冻结使用）
 * @module Search
 */
import BScroll from '../Common/scrollView.vue';
import { mapGetters } from 'vuex';
import { API } from '../../services';
import { Search } from 'vux';
export default {
     components: {
        BScroll,
        Search
    },
    data() {
        return {
            autoFixed:true,
            searchResult: "",
            /* 历史搜索记录 */
            history: [
                "haode",
                "shima"
            ],
        }
    },
    methods: {
        /**
         * 搜索函数
         * @function submit
         */
        submit() {
            this.rsSearchValue = this.rsSearchValue.trim();
            if (!this.rsSearchValue) {
                return false;
            }
            for (let item of this.history) {
                if (item == this.rsSearchValue) {
                    this.$router.push({
                        path: '/goodslist?goods_name=' + this.rsSearchValue
                    })
                    this.rsSearchValue = "";
                    return false;
                }
            }
            this.history.push(this.rsSearchValue);
            localStorage.setItem("zj_history", JSON.stringify(this.history));
            this.$router.push({
                path: '/goodslist?goods_name=' + this.rsSearchValue
            })
            window.localStorage.setItem("listReload", '11');
            this.rsSearchValue = "";
        },
        /*  */
        /**
         * 历史记录搜索
         * @function historyrsSearch
         * @param  {object} item 选中的历史搜索对象
         */
        historyrsSearch(item) {
            this.rsSearchValue = item;
            this.$router.push({
                path: '/goodslist?goods_name=' + this.rsSearchValue
            })

            window.localStorage.setItem("listReload", '11');
            this.rsSearchValue = "";
        },
        /**
         * 清空历史记录
         * @function cleanHistory
         */
        cleanHistory() {
            this.history = [];
            localStorage.setItem("zj_history", JSON.stringify(this.history));
        }
    },
    mounted() {
        /* 将搜索历史记录到本地存储中 */
        let history = JSON.parse(localStorage.getItem('zj_history'));
        if (!history) {
            history = [];
        }
        /* 搜索历史赋值 */
        this.history = history;
        console.log(this.$route.path);
    }
}
</script>
