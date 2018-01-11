<style lang="scss">
/* 自定义checkbox样式 */

@mixin checkedCon($fs:18px) {
    &:before {
        display: block;
        width: 60%;
        position: absolute;
        border-radius: 50%;
        height: 60%;
        background-color: #f36837;
        left: 20%;
        top: 20%;
        content: "";
        color: #FFFFFF;
        font-size: $fs;
    }
}

$duration: .4s;
.mui-checkbox {
    -webkit-appearance: none;
    position: relative;
    width: 25px;
    height: 25px;
    margin-right: 10px;
    background-color: #FFFFFF;
    border: solid 1px #999;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    background-clip: padding-box;
    display: inline-block;
    &:focus {
        outline: 0 none;
        outline-offset: -2px
    }
    &--select {
        @include checkedCon();
    }
    &:checked {
        @include checkedCon();
    }
    &:disabled {
        background-color: #d9d9d9;
        border: solid 1px #d9d9d9;
        @include checkedCon();
        &:before {
            background-color: #eee;
        }
    }
    &.checkbox-green:checked {
        background-color: #5cb85c;
    }
    &.checkbox-orange:checked {
        background-color: #f0ad4e;
    }
    &.checkbox-s {
        width: 19px;
        height: 19px;
        @include checkedCon(13px);
    }
}

.mui-checkbox-anim {
    //border等其他元素不做过渡效果，增加视觉差，更有动画效果
    transition: background-color ease $duration/2;
}








/* 默认状态下的展示样式 */

.common_type_default {
    .rsCommon {
        &_single {
            margin-bottom: 10px;
            background-color: #fff;
            padding: 15px 12px;
            box-sizing: border-box;
            position: relative;
            &_content {}
            &_title {
                font-size: 17px;
                color: #333;
                margin-bottom: 15px;
                &--abnormal {
                    color: #fa2525;
                }
                >span {
                    color: #fa2525;
                    margin-left: 10px;
                }
            }
            &_nameBox {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 10px;
                >p {
                    max-width: 80%;
                    line-height: 15px;
                    font-size: 13px;
                    color: #666;
                    transition: all 0.2s ease-in;
                }
                >i {
                    color: #c7c7c7;
                    font-size: 20px;
                    transform-origin: 50% 50%;
                    transform: rotate(180deg);
                    transition: all 0.2s ease-in;
                }
                &--maxHeight {
                    >p {
                        height: 15px;
                        white-space: nowrap;
                        overflow: hidden;
                        transition: all 0.2s ease-in;
                        text-overflow: ellipsis;
                    }
                    >i {
                        transform: rotate(0deg);
                    }
                }
            }
            &_template {
                line-height: 15px;
                font-size: 13px;
                color: #999;
                margin-bottom: 10px;
            }
            &_state {
                line-height: 15px;
                font-size: 13px;
                color: #999;
                >span {
                    margin-left: 10px;
                }
                >span[data-type='0'] {
                    color: #333;
                }
                >span[data-type='1'] {
                    color: #1aad19;
                }
                >span[data-type='2'] {
                    color: #fa2525;
                }
            }

            &_add {
                position: absolute;
                right: 12px;
                top: 15px;
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
                &--haveAdd {
                    color: #999999;
                    border-color: #999;
                }
            }
        }
    }
}









/* 第二分类展示样式 */

.common_type_else {
    .rsCommon {
        &_single {
            margin-bottom: 10px;
            background-color: #fff;
            padding: 15px 12px;
            box-sizing: border-box;
            position: relative;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            >input {
                height: 20px;
                width: 20px;
                flex-shrink: 0;
                margin-top: 2px;
            }
            &_content {
                width: calc(100% - 30px);
            }
            &_title {
                font-size: 15px;
                color: #333;
                margin-bottom: 10px;
                &--abnormal {
                    color: #fa2525;
                }
                >span {
                    color: #fa2525;
                    margin-left: 10px;
                }
            }
            &_nameBox {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 10px;
                width: 100%;
                >p {
                    max-width: 80%;
                    line-height: 15px;
                    font-size: 13px;
                    color: #666;
                    transition: all 0.2s ease-in;
                }
                >i {
                    color: #c7c7c7;
                    font-size: 20px;
                    transform-origin: 50% 50%;
                    transform: rotate(180deg);
                    transition: all 0.2s ease-in;
                }
                &--maxHeight {
                    >p {
                        height: 15px;
                        white-space: nowrap;
                        overflow: hidden;
                        transition: all 0.2s ease-in;
                        text-overflow: ellipsis;
                    }
                    >i {
                        transform: rotate(0deg);
                    }
                }
            }
            &_planTime {
                line-height: 15px;
                font-size: 13px;
                color: #999;
                margin-bottom: 10px;
            }
            &_countdown {
                font-size: 15px;
                color: #333;
                line-height: 15px;
                >span {
                    margin-left: 20px;
                    color: #999;
                    font-size: 11px;
                    line-height: 15px;
                }
            }
            &_template {
                line-height: 15px;
                font-size: 13px;
                color: #999;
                margin-bottom: 10px;
            }
            &_state {
                line-height: 15px;
                font-size: 13px;
                color: #999;
                >span {
                    margin-left: 10px;
                }
                >span[data-type='0'] {
                    color: #333;
                }
                >span[data-type='1'] {
                    color: #1aad19;
                }
                >span[data-type='2'] {
                    color: #fa2525;
                }
            }

            &_add {
                position: absolute;
                right: 12px;
                top: 15px;
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
                &--haveAdd {
                    color: #999999;
                    border-color: #999;
                }
            }
        }
    }
}








/* 最终分类展示形式 */

.common_type_last {
    .rsCommon {
        &_single {
            margin-bottom: 10px;
            background-color: #fff;
            padding: 15px 12px;
            box-sizing: border-box;
            position: relative;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            >input {
                height: 20px;
                width: 20px;
                flex-shrink: 0;
                margin-top: 2px;
            }
            &_content {
                width: calc(100% - 30px);
            }
            &_title {
                font-size: 15px;
                color: #333;
                margin-bottom: 10px;
                &--abnormal {
                    color: #fa2525;
                }
                >span {
                    color: #fa2525;
                    margin-left: 10px;
                }
            }
            &_nameBox {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 10px;
                width: 100%;
                >p {
                    max-width: 80%;
                    line-height: 15px;
                    font-size: 13px;
                    color: #666;
                    transition: all 0.2s ease-in;
                }
                >i {
                    color: #c7c7c7;
                    font-size: 20px;
                    transform-origin: 50% 50%;
                    transform: rotate(180deg);
                    transition: all 0.2s ease-in;
                }
                &--maxHeight {
                    >p {
                        height: 15px;
                        white-space: nowrap;
                        overflow: hidden;
                        transition: all 0.2s ease-in;
                        text-overflow: ellipsis;
                    }
                    >i {
                        transform: rotate(0deg);
                    }
                }
            }
            &_planTime {
                line-height: 15px;
                font-size: 13px;
                color: #999;
                margin-bottom: 10px;
            }
            &_countdown {
                font-size: 15px;
                color: #333;
                line-height: 15px;
                >span {
                    margin-left: 20px;
                    color: #999;
                    font-size: 11px;
                    line-height: 15px;
                }
            }
            &_template {
                line-height: 15px;
                font-size: 13px;
                color: #999;
                margin-bottom: 10px;
            }
            &_state {
                line-height: 15px;
                font-size: 13px;
                color: #999;
                >span {
                    margin-left: 10px;
                }
                >span[data-type='0'] {
                    color: #333;
                }
                >span[data-type='1'] {
                    color: #1aad19;
                }
                >span[data-type='2'] {
                    color: #fa2525;
                }
            }

            &_add {
                position: absolute;
                right: 12px;
                top: 15px;
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
                &--haveAdd {
                    color: #999999;
                    border-color: #999;
                }
            }
        }
    }
}

.rsCommon_single_base {
    font-size: 12px;
    color: #666;
    margin-left: 5px;
}

.rsCommon_single_tag {
    padding: 0 5px;
    background-color: #efefef;
    border-radius: 2px;
    font-size: 10px;
    margin-left: 10px;
    color: #666;
    font-style: normal;
}
.rsCommon_single_link{
    font-size: 12px;
    color: #999;
    float: right;
}
</style>
 <template lang="pug">
    //-列表大概会有三种状态，通过class来直接控制样式，不使用三个列表
    div(:class="{'common_type_default':type==0,'common_type_else':type==1,'common_type_last':type==2,}")
        .rsCommon_list
            .rsCommon_single(v-for="item,index in list",:key="item.id")
                input(@change="inputChange",v-show="type==1",type="checkbox",v-model="selectResult",:id='"check"+index',:value="item.id").mui-checkbox
                .rsCommon_single_content
                    //-患者姓名
                    h3.rsCommon_single_title(:class="{'rsCommon_single_title--abnormal':item.abnormal===1}") {{item.patientName}}
                        b.rsCommon_single_base {{item.sex || item.patientSex}}/{{item.patientAge}}
                        span(v-show="item.currentVisitError>0") 指标异常
                        i.rsCommon_single_tag(v-show="item.gzTag") {{item.gzTag}}
                        router-link(v-if="item.hzxxId",:to="'/main/main/mine/patInfo?id='+item.hzxxId").rsCommon_single_link 查看更多 >
                    .rsCommon_single_nameBox(@click="maxHeight(item,index)",:class="{'rsCommon_single_nameBox--maxHeight':!item.maxHeight}")
                        p 诊断名称：{{item.zdmc || item.icdName}}
                        i(v-show="overArray[index]==1").iconfont &#xe63e;
                    p.rsCommon_single_template 随访计划：{{item.visitProjectName || item.schemeName}}
                    p.rsCommon_single_state(v-show="type==0") 随访进度：{{item.currentVisitTime}}/{{item.visitCount}}
                        span(v-show="item.state==0",data-type=0) 待开始
                        span(v-show="item.state==1",data-type=1) 待处理
                        span(v-show="item.state==2",data-type=2) 立即处理
                    p(v-show="type>=1").rsCommon_single_planTime 随访计划生成时间：{{item.visitStartTime}}
                    p(v-show="type>=1").rsCommon_single_planTime 不通过原因：{{item.visitStartTime}}
                    .rsCommon_single_countdown(v-show="type==1") {{item.countDown}}
                        span 后自动通过审核
                    button(type="button",@click="addLike(item.hzxxId,0)",v-show="item.islike!=1&&type==0").rsCommon_single_add
                        i.iconfont &#xe61a;
                        | 关注
                    button(type="button",@click="addLike(item.hzxxId,1)",v-show="item.islike==1&&type==0").rsCommon_single_add.rsCommon_single_add--haveAdd 已关注
 </template>
 
 
 <script>
import { API } from '@/services';
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            selectResult: [],
            baseWidth: 0,//百分之80的宽度基础值
            overArray: []//专门用于存储当前数据是否有超出情况的集合 0：不超出 1：超过
        }
    },
    props: {
        list: Array,//列表数据
        type: String,//列表类型
    },
    computed: {
        ...mapGetters([
            'getUserInfoUserId',
            'getUserInfoToken',
        ]),
    },
    watch: {
        /* vue中严格禁止子组件修改父组件的实际数据 */
        /* 将超出显示下拉的逻辑直接放在子组件中，额外设定一个集合属性用于存放判断条件 */
        "list": function() {
            if (this.list.length > 0) {
                let overList = [];
                this.$nextTick(function() {
                    if (document.querySelector(".rsCommon_single_content")) {
                        this.baseWidth = document.querySelector(".rsCommon_single_content").offsetWidth * 0.8;
                    }
                    setTimeout(() => {
                        overList = document.querySelectorAll(".rsCommon_single_nameBox>p");
                        this.overArray = [];
                        for (const item of overList) {
                            if (item.offsetWidth < this.baseWidth) {
                                this.overArray.push(0);
                            } else {
                                this.overArray.push(1);
                            }
                        }
                    }, 20)
                });

            }
        }
    },
    methods: {
        /**@argument
         * input触发change触发自定义事件
         */
        inputChange() {
            this.$emit('itemChange');
        },
        /**@argument
         * 点击展开更多
         */
        maxHeight(ite, index) {
            let item = JSON.parse(JSON.stringify(ite));
            item.maxHeight = item.maxHeight || 0;
            item.maxHeight = 1 - item.maxHeight;
            Vue.set(this.list, index, item);
        },
        /** 
         * 添加关注
         */
        addLike(id, type) {
            if (type == 0) {
                const _this = this;
                this.$vux.confirm.prompt('', {
                    title: '添加关注标签',
                    placeholder: '不得超过5个字',
                    onConfirm(msg) {
                        API.common.updateGz(
                            {
                                patientId: id, //患者的id （必填）
                                operateTag: msg,
                                operateType: 1, //(操作类型 1:关注 0：取消关注) （必填）
                            }
                        ).then((res) => {
                            _this.$vux.toast.show({
                                text: '关注成功',
                                type: "success"
                            });
                            _this.$emit('dataReload');
                        }).catch((err) => {

                        });
                    }
                })
            } else {
                API.common.updateGz(
                    {
                        patientId: id, //患者的id （必填）
                        operateType: 0, //(操作类型 1:关注 0：取消关注) （必填）
                    }
                ).then((res) => {
                    this.$vux.toast.show({
                        text: '取消关注成功',
                        type: "success"
                    });
                    this.$emit('dataReload');
                }).catch((err) => {

                });
            }


        },
        /**@argument
         * 判断当前single是否超过了单行，用于控制单行显示的效果
         */
        isOver() {

        },
        getBaseWidth() {

        }
    },
    mounted() {

    },
    activated() {

    }
}
</script>
 
 