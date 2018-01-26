<style lang="less">
  .ve-line{
    margin: 0 auto;
  }
</style>

<template>
  <ve-line height="230px" width="100%" :legend-visible="false"  :yAxis="yAxis" :data="lineData.data" :settings="lineData.setting" :grid="grid">
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
        height: "150px",
        show: true,
        top: 50,
        left: 20,
        right:30,
        backgroundColor: '#f36837',
        borderColor: '#fff'
      },
      yAxis: {
        type: 'value',
        name:"数值",
        axisTick: {
            inside: true
        },
        axisLine:{
          lineStyle:{
            type:"dashed",
            color:"#666"
          }
        },
        axisTick:{
          lineStyle:{
            type:"dashed",
            color:"rgba(255,255,255,0.4)"
          }
        },
        nameTextStyle:{
          color:"#333"
        },
        splitLine: {
          lineStyle:{
            type:"dashed",
            color:"rgba(255,255,255,0.4)"
          }
          /* show: false */
        },
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