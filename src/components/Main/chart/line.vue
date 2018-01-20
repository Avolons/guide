<style lang="less">
  .ve-line{
    margin: 0 auto;
  }
</style>

<template>
  <ve-line height="230px" width="95%" :legend-visible="false"  :yAxis="yAxis" :data="lineData.data" :settings="lineData.setting" :grid="grid">
  </ve-line>
</template>

<script>
import VeLine from 'v-charts/lib/line';
export default {
  components: {
		VeLine	
	},
  data() {
    return {
      grid: {
        height: "150px"
      },
      yAxis: {
        type: 'value',
        name:"数值",
        axisTick: {
            inside: true
        },
        /* splitLine: {
          show: false
        }, */
      },
      /* xAxis:{
        type: 'time',
        name:"日期",
       
      } */
    }
  },
  props: {
    lineData: {
      type: Object
    }
  },
  created: function() {

  }
}
</script>