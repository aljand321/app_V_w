<template>
  <div id="app">
    <Tolbar/>    
   
    
    <router-view v-if ="bol"/>
    
    
  </div>
</template>

<script>
  import Tolbar from './components/header/Tolbar'
  export default {
    data : () => ({
      bol: true
    }),
      components:{
        Tolbar
      }
  }
</script>

