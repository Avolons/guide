<style lang="scss">

</style>
<template lang="pug">
    .guide  
        .guide_header 
            XButton()   选择科室
            XButton()   选择检查
            XButton()   选择楼层
        .guide_aside
            .guide_aside_depart
                XButton() 取消
                XButton() 确认

            .guide_aside_check
                XButton() 取消
                XButton() 确认
                
            .guide_aside_floor
                XButton() 取消
                XButton() 确认

</template>
<script>
import { mapGetters } from 'vuex';
import { API } from '@/services';
import { XButton,Picker } from 'vux';
export default {
    components: {
        XButton,
        Picker
    },
    data() {
        return {
            departMentList:[],/* 科室数据 */
            checkList:[],/* 检查数据 */
            floorList:[],/*楼层数据 */
        }
    },
    methods: {
       
    },
    mounted() {
    }
}
</script>
