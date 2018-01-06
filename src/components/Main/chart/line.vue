<template>
  <ve-line 
    :legend-visible="false" 
    :data="lineData.data"
    :settings="lineData.setting"
    ></ve-line>
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