<style lang="less">
  .ve-line{
    margin: 0 auto;
  }
</style>

<template>
  <ve-line height="230px" width="95%" :legend-visible="false" :yAxis="yAxis" :data="lineData.data" :settings="lineData.setting" :grid="grid">
  </ve-line>
</template>

<script>
export default {
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
        splitLine: {
          show: false
        },
      },
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