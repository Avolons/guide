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
            li.rsAi_main_single(v-for="item,index in nameList",@click="chooseAi(index)",:class="{'rsAi_main_single--select':choseList[index]==1}")
                img(src="../../assets/img/common/logo.png")
                h4 {{item}}

        button(type="button",@click="submitAi").rsAi_main_btn 确定
</template>
<script>
import { API } from '../../services';
export default {
    data() {
        return {
            choseIndex:-1,
            choseList: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            nameList: ["吉庆鼠", "孺子牛", "霹雳虎", "可爱兔", "旺福龙", "远足蛇", "千里马", "喜洋羊", "旋风猴", "金喜鸡", "福禄狗", "招财猪"],
        }
    },
    methods: {
        chooseAi(index) {
            let voidArry = [];
            for (let item of this.choseList) {
                voidArry.push(0);
            }
            this.choseList = voidArry;
            Vue.set(this.choseList, index, 1);
            this.choseIndex=index;
        },
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
                    time: 1500
                });
            } else {
                this.$store.dispatch('setAiIndex',this.choseIndex);
                this.$router.push('/');
            }
        }
    },
}
</script>
