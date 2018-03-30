<style lang="scss">
.common_result{
    &_main{
        background-color: #fff;
    }
    &_list{
        box-sizing: border-box;
        padding-left: 12px;
    }
    &_single{
        font-size: 14px;
        color: #333;
        height: 45px;
        line-height: 45px;
        display: flex;
        box-sizing: border-box;
        padding: 0 15px;
        padding-left: 0;
        border-bottom: 1px solid #e5e5e5;
        >span{
            display: block;
            &:nth-of-type(1){
                width: 65px;
                flex-shrink: 0;
            }
            &:nth-of-type(2){
                width: 80px;
                text-align: center;
                flex-shrink: 0;
            }
            &:nth-of-type(3){
                flex-grow: 1;
                flex-shrink: 1;
            }
            &:nth-of-type(4){
                width: 80px;
                flex-shrink: 0;
                text-align: center;
                display: flex;
                justify-content: center;
                align-items: center;
                i{
                    height: 22.5px;
                    padding: 0 5px;
                    border-radius: 4px;
                    background-color: #e5e5e5;
                    font-size: 10px;
                    color: #666;
                    line-height: 22.5px;
                    display: block;
                    font-style: normal;
                }
            }
        }
        >i{
            width: 10px;
            flex-shrink: 0;
            flex-grow: 0;
            display: block;
            height: 100%;
            font-size: 20px;
            font-style: normal;
            color: #c7c7c7;
        }
    }
}

</style>
 <template lang="pug">
    .common_result
        .common_result_main
            ul.common_result_list
                li.common_result_single(v-for="item,index in list",:key="index",@click="goToInfo(item.hzxxId)")
                    span.nowarp {{index+1}}.{{item.patientName}}
                    span {{item.patientSex}}/{{item.patientAge}}
                    span.nowarp {{item.icdName}}
                    span(v-show="item.gzTag")
                        i {{item.gzTag}}
                    i.iconfont &#xe633;
 </template>


 <script>
 /**
  * 患者列表组件
  * @module Result
  */
export default {
    data() {
        return {
        }
    },
    props: {
        list: Array,//列表数据
    },
    methods: {
        /**
         * 查看患者详情（携带患者身份id跳转到通用患者详情页）
         * @function goToInfo
         * @param  {string} id 患者身份标识id
         */
        goToInfo(id){
            this.$router.push({
                path:'/main/main/mine/patInfo',
                query:{
                    id:id
                }
            })
        }
    },
    mounted () {

    },
    activated() {

    }
}
</script>
