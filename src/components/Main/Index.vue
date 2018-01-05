
<style lang="scss" >
.rsIndex {
  &_header {
    box-sizing: border-box;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    padding-bottom: 0;
    &_avatar {
      height: 90px;
      width: 80px;
      overflow: hidden;
      position: relative;
      box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.09);
      border-radius: 4px;
      border: solid 1px rgba(255, 255, 255, 0.51);
      >img {
        display: block;
        height: 100%;
        width: 100%;
      }
      >span {
        height: 17.5px;
        line-height: 17.5px;
        text-align: center;
        background-color: rgba(0, 0, 0, 0.3);
        color: #fff;
        font-size: 12px;
        position: absolute;
        bottom: 0;
        left: 0;
        display: block;
        width: 100%;
      }
    }
    &_text {
      line-height: 23.5px;
      width: calc(100% - 100px);
      font-size: 13px;
      color: #666;
    }
  }

  &_middle {
    padding: 15px;
    box-sizing: border-box;
    &_content {
      box-sizing: border-box;
      padding: 15px 0;
      display: flex;
      box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.08);
      border-radius: 4px;
      border: solid 1px rgba(0, 0, 0, 0.09);
      background-color: #fff;
    }
    &_single {
      box-sizing: border-box;
      padding: 0 10px;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      &:nth-of-type(2) {
        &:after {
          content: "";
          display: block;
          width: 1px;
          height: 100%;
          background-color: #e5e5e5;
          position: absolute;
          left: 0;
          top: 0;
        }
        &:before {
          content: "";
          display: block;
          width: 1px;
          height: 100%;
          background-color: #e5e5e5;
          position: absolute;
          right: 0;
          top: 0;
        }
      }
      >p {
        font-size: 12px;
        line-height: 24px;
        text-align: center;
        color: #666666;
      }
      >h4 {
        text-align: center;
      }
      >span {
        display: block;
        text-align: center;
        font-size: 12px;
        color: #666;
        >a {
          color: #f36837;
          cursor: pointer;
        }
      }
    }
    &_number {}
  }
  &_chart {
    &_disease {
      background-color: #fff;
      margin-bottom: 10px;
    }
    &_drugs {
      background-color: #fff;
      margin-bottom: 10px;
    }
    &_disContent{
      display: flex;
      justify-content: space-between;
    }
    &_disChart {
      width: 200px;
      height: 200px;
      flex-grow: 0;
      flex-shrink: 0;      
    }
    &_indexList{
      flex: 1;
    }
    &_disChartLine{
      width: 100%;
    }
  }
  &_ {}
  &_ {}
}
</style>


<template lang="pug">
    //- 首页主体
    .rsIndex
        b-scroll(
          :data="dataList",
          pullup=true,
          pulldown=true,
          @pulldown="getIcon",
          @scrollToEnd="getData",
          ref="scollView",
          :swiper_pullUp="swiper_pullUp",
          :swiper_nodata="swiper_nodata"
          )
          //- 头部
          .rsIndex_header
            .rsIndex_header_avatar
              img(src="../../assets/img/common/logo.png")
              span 千里马
            p.rsIndex_header_text 早上好，何建一医生，小马已等候您128小时了。以下是您需要处理的内容。
          //- 中间部分
          .rsIndex_middle 
            .rsIndex_middle_content
              .rsIndex_middle_single
                p 已随访800人次共500位患者
              .rsIndex_middle_single
                h4.rsIndex_middle_number 156
                span 随访计划
                  router-link(to="") 待审核
              .rsIndex_middle_single
                h4.rsIndex_middle_number 45
                span 随访结果
                  router-link(to="") 待处理
          //- 图表插件 两个图表 ，折线图和环状图
          .rsIndex_chart
            //- 疾病分类情况
            .rsIndex_chart_disease
              group
                popup-radio(title="疾病分布情况" :options="timeOptions" v-model="dataList[0].timeSelect")
              .rsIndex_chart_disContent
                .rsIndex_chart_disChart
                  pie-example(:pieData="dataList[0].pieData")
                .rsIndex_chart_indexList
                  li.rsIndex_chart_indexSingle
            //- 用药依从性
            .rsIndex_chart_drugs
              group
                popup-radio(title="用药依从性" :options="timeOptions" v-model="dataList[0].timeSelect")
              .rsIndex_chart_disContent
                .rsIndex_chart_disChart
                  pie-example(:pieData="dataList[1].pieData")
                .rsIndex_chart_indexList
                  li.rsIndex_chart_indexSingle
            //- 随访数量统计
            .rsIndex_chart_drugs
              group
                popup-radio(title="随访数量统计" :options="timeOptions" v-model="dataList[0].timeSelect")
              .rsIndex_chart_disContent
                .rsIndex_chart_disChartLine
                  line-example(:lineData="dataList[2].lineData")
            
          
</template>

<script>
import { ButtonTab, ButtonTabItem, Group, PopupRadio } from 'vux';
import BScroll from '../Common/scrollView.vue';
import LineExample from './chart/line.vue';
import PieExample from './chart/pie.vue';
export default {
  components: {
    ButtonTab,
    ButtonTabItem,
    Group,
    PopupRadio,
    BScroll,
    LineExample,
    PieExample
  },
  data() {
    return {
      /* 上拉加载更多 */
      swiper_pullUp: false,//显示加载
      swiper_nodata: false,//没有更多数据
      page: 1,
      loading: false,
      timeOptions: ["7天", "30天", "3个月", "6个月", "1年"],
      dataList: [
        //疾病分布情况
        {
          timeSelect: "",
          pieData: {
            data: {
              columns: ['日期', '销售额-1季度', '销售额-2季度', '占比', '其他'],
              rows: [
                { '日期': '1月1日', '销售额-1季度': 1523, '销售额-2季度': 1523, '占比': 0.12, '其他': 100 },
                { '日期': '1月2日', '销售额-1季度': 1223, '销售额-2季度': 1523, '占比': 0.345, '其他': 100 },
                { '日期': '1月3日', '销售额-1季度': 2123, '销售额-2季度': 1523, '占比': 0.7, '其他': 100 },
                { '日期': '1月4日', '销售额-1季度': 4123, '销售额-2季度': 1523, '占比': 0.31, '其他': 100 },
                { '日期': '1月5日', '销售额-1季度': 3123, '销售额-2季度': 1523, '占比': 0.12, '其他': 100 },
                { '日期': '1月6日', '销售额-1季度': 7123, '销售额-2季度': 1523, '占比': 0.65, '其他': 100 }
              ]
            },
            setting: {
              offsetY:100,
              radius: ['60', '80'],
              label: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: false
                }
              }
            }
          }
        },
        //用药依从性
        {
          timeSelect: "",
          pieData: {
            data: {
              columns: ['日期', '销售额-1季度', '销售额-2季度', '占比', '其他'],
              rows: [
                { '日期': '1月1日', '销售额-1季度': 1523, '销售额-2季度': 1523, '占比': 0.12, '其他': 100 },
                { '日期': '1月2日', '销售额-1季度': 1223, '销售额-2季度': 1523, '占比': 0.345, '其他': 100 },
                { '日期': '1月3日', '销售额-1季度': 2123, '销售额-2季度': 1523, '占比': 0.7, '其他': 100 },
                { '日期': '1月4日', '销售额-1季度': 4123, '销售额-2季度': 1523, '占比': 0.31, '其他': 100 },
                { '日期': '1月5日', '销售额-1季度': 3123, '销售额-2季度': 1523, '占比': 0.12, '其他': 100 },
                { '日期': '1月6日', '销售额-1季度': 7123, '销售额-2季度': 1523, '占比': 0.65, '其他': 100 }
              ]
            },
            setting: {
              roseType: 'radius',
              offsetY:100,
              radius: ['10', '80'],
              label: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: false
                }
              }
            }
          }
        },
        //随访数量统计
        {
          timeSelect: "",
          lineData: {
            data: {
              columns: ['日期', '成本', '利润', '占比', '其他'],
              rows: [
                { '成本': 1523, '日期': '1月1日', '利润': 1523, '占比': 0.12, '其他': 100 },
                { '成本': 1223, '日期': '1月2日', '利润': 1523, '占比': 0.345, '其他': 100 },
                { '成本': 2123, '日期': '1月3日', '利润': 1523, '占比': 0.7, '其他': 100 },
                { '成本': 4123, '日期': '1月4日', '利润': 1523, '占比': 0.31, '其他': 100 },
                { '成本': 3123, '日期': '1月5日', '利润': 1523, '占比': 0.12, '其他': 100 },
                { '成本': 7123, '日期': '1月6日', '利润': 1523, '占比': 0.65, '其他': 100 }
              ]
            },
            setting: {
              roseType: 'radius'
            }
          }
        }
      ],//数据列表

    }
  },
  methods: {
    /**
     * 获取iconlist
     */
    getIcon() {
      this.page = 1;
      this.dataList = [];

    },
    /**
     * 获取首页推荐列表
     */
    getData() {
      if (this.loading) {
        return false;
      }
      this.loading = true;
      if (this.dataList.length >= 10) {
        this.swiper_pullUp = true;
        this.swiper_nodata = false;
      }
    },
    /**@argument
     * 滚动刷新
     */
    scollRefresh() {
      this.$refs.scollView.scroll.refresh();
    },
  },
  mounted() {

  },
  activated() {

  }
}
</script>
