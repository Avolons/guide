<style lang="scss" scoped>
.rsMine_mine_list {
    margin: 0;
    margin-top: 10px;
    .weui-cells {
        margin: 0;
    }
}

.rsMine_mine_single {
    height: 30px;
    .vux-label {
        font-size: 16px;
    }
}

.rsMine_header{
    padding: 30px 0 15px 0;
    background-color: #fff;
    >img{
        display: block;
        height: 84px;
        margin: 0 auto;
        margin-bottom: 16px;
        border-radius: 50%;
    }
    >h3{
        font-size: 15px;
        color: #333;
        text-align: center;
        margin-bottom: 6px;
    }
    >p{
        font-size: 12px;
        color: #666;
        text-align: center;
    }
}

</style>

<style lang="scss">
.vux-cell-bd .vux-label {
    font-size: 15px;
    color:#333;
    span{
        display: flex;
        align-items: center;
    }
    i{
        font-size:20px;
        margin-right:10px;
        color:#ffac74;
    }
}

.weui-cell__ft {
    font-size: 16px;
    
    }
</style>
<template lang="pug">
    //- 首页主体
    .rsMine
        .rsMine_header
            img(src="../../assets/img/mine/asset.png")
            h3 {{getRealname}}
            p {{getdepartment}}
        .rsMine_actionList
            group.rsMine_mine_list
                cell(:link="{path:'/main/main/mine/follow'}").rsMine_mine_single
                    span(slot="title")
                        i.iconfont &#xe600;
                        |特别关注
            group.rsMine_mine_list
                cell(:link="{path:'/main/main/mine/patient'}").rsMine_mine_single
                    span(slot="title")
                        i.iconfont &#xe748;
                        |我的患者
            group.rsMine_mine_list
                cell(:link="{path:'/main/main/mine/activity'}").rsMine_mine_single
                    span(slot="title")
                        i.iconfont &#xe634;
                        |活动通知
            group.rsMine_mine_list
                cell(:link="{path:'/main/main/mine/setting'}").rsMine_mine_single
                    span(slot="title")
                        i.iconfont &#xe638;
                        |设置
          
</template>

<script>
/** 
 * 个人中心组件
 * @module Mine
 */
import { mapGetters } from 'vuex'
import { API } from '../../services';
import { Cell, CellBox, CellFormPreview, Group } from 'vux';
export default {
    components: {
        Group,
        Cell,
        CellFormPreview,
        CellBox,
    },
    computed: {
        ...mapGetters([
            'getdepartment',
            'getRealname'
        ])
    },
    data() {
        return {

        }
    },
    methods: {

    },

}
</script>
