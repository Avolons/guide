<template>
  <ve-ring 
    :legend-visible="false" 
    :data="pieData.data" 
    :settings="pieData.setting"
    :tooltip-visible="false"
    height="200px"
    :colors="['#f36837','#59d0bd','#f8df94','#5d98e3','#5d64e3']"
   ></ve-ring>
</template>

<script>
export default  {
    props:{
        pieData:{
            type:Object
        }
    },
    created: function () {
      
    }
  }
</script>