<template>
  <ve-line :data="lineData.chartData" :settings="lineData.chartSettings"></ve-line>
</template>

<script>
  export default  {
    props:{
        lineData:{
            type:Object
        }
    },
    created: function () {
      
    }
  }
</script>