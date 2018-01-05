<template>
  <ve-line :data="lineData.data" :settings="lineData.setting"></ve-line>
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