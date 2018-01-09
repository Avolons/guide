<style lang="scss">
.rsAi {
    &_main {
        height: 100%;
        padding: 0 15px;
        background-color: #fff;
        box-sizing: border-box;
        overflow: hidden;
        &_title {
            margin: 25px;
            text-align: center;
            line-height: 20px;
            font-size: 14px;
            color: #333;
        }
        &_list {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
        }
        &_single {
            width: calc(25% - 10px);
            margin-bottom: 10px;
            border: solid 1px rgba(150, 150, 150, 0.5);
            box-sizing: border-box;
            position: relative;
            border-radius: 4px;
            >img {
                display: block;
                width: 100%;
            }
            >h4 {
                height: 22.5px;
                background-color: rgba(0, 0, 0, 0.5);
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                line-height: 22.5px;
                text-align: center;
                color: #fff;
                font-size: 13px;
            }
            &--select {
                border-color: #f36837;
            }
        }
        &_btn {
            margin-top: 40px;
            height: 45px;
            width: 100%;
            background-color: #f36837;
            border-radius: 4px;
            line-height: 45px;
            text-align: center;
            font-size: 16px;
            color: #fff;
        }
    }
}
</style>
<template lang="pug">
  .rsAi
    .rsAi_main
        .rsAi_main_title 请选择一个形象
            br
            | 作为您的AI虚拟助手吧！
        ul.rsAi_main_list
            li.rsAi_main_single(v-for="item,index in AiList",@click="chooseAi(index)",:class="{'rsAi_main_single--select':choseList[index]==1}")
                img(src="../../assets/img/common/logo.png")
                h4 {{item.remark}}

        button(type="button",@click="submitAi").rsAi_main_btn 确定
</template>
<script>
import { API } from '@/services';
export default {
    data() {
        return {
            choseIndex: -1,
            choseList: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            AiList: [],
        }
    },
    mounted() {
        this.getAiList();
    },
    methods: {
        /** 
         * 获取生肖列表
         */
        getAiList() {
            API.common.findAiPictureList().then((res) => {
                this.AiList = res.data.SysConfigLsit;
            }).catch((err) => {

            });
        },
        /** 
         * 选择ai助手
         */
        chooseAi(index) {
            let voidArry = [];
            for (let item of this.choseList) {
                voidArry.push(0);
            }
            this.choseList = voidArry;
            Vue.set(this.choseList, index, 1);
            this.choseIndex = index;
        },
        /** 
         * 提交ai
         */
        submitAi() {
            let flag = 0;
            for (const item of this.choseList) {
                if (item === 1) {
                    flag++;
                }
            }
            if (flag === 0) {
                this.$vux.toast.show({
                    text: '请选择合适的ai助手',
                    type: "text",
                    time: 1000
                });
            } else {
                /* this.$store.dispatch('setAiIndex', this.choseIndex);
                this.$router.push('/'); */
                API.common.bindAiPicture({
                    aiPictureCode:this.AiList[this.choseIndex].key
                }).then((res) => {
                    this.$vux.toast.show({
                        text: '选择成功',
                        type: "success"
                    });
                    setTimeout(() => {
                        this.$router.push('/');
                    }, 500);
                }).catch((err) => {

                });
            }

        }
    },
}
</script>
