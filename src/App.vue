<template>
  <div id="app">
    <Tolbar/>    
   
    <b-container>
      <router-view v-if ="bol"/>
    </b-container>   
    <br>
    <br>
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

