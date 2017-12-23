
<style lang="scss" >

</style>


<template lang="pug">
    //- 首页主体
    .rsIndex
        b-scroll(
          :data="bookList",
          pullup=true,
          pulldown=true,
          @pulldown="getIcon",
          @scrollToEnd="getBookList",
          ref="scollView",
          :swiper_pullUp="swiper_pullUp",
          :swiper_nodata="swiper_nodata"
          )
          //- 图表插件 两个图表 ，折线图和环状图
          .rsIndex_chart
            line-example(:lineData="lineData")
            pie-example
          
</template>

<script>
import { ButtonTab, ButtonTabItem } from 'vux';
import BScroll from '../Common/scrollView.vue';
import LineExample from './chart/line.vue';
import PieExample from './chart/pie.vue';
export default {
  components: {
    ButtonTab,
    ButtonTabItem,
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
      bookList: [],
      lineData: {
        chartData: {
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
        chartSettings: {
          metrics: ['成本', '利润'],
          dimension: ['日期']
        }
      }
    }
  },
  methods: {
    /**
     * 获取iconlist
     */
    getIcon() {
      this.page = 1;
      this.bookList = [];

    },
    /**
     * 获取首页推荐列表
     */
    getBookList() {
      if (this.loading) {
        return false;
      }
      this.loading = true;
      if (this.bookList.length >= 10) {
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
