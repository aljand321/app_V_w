<template>
  <div id="app">
    <Tolbar v-if ="bol"/>
    <!-- <UserBdNull/> -->
    <router-view v-if ="bol"/>   
  </div>
</template>

<script>
  import Tolbar from './components/header/Tolbar'
  import UserBdNull from './components/usuario/UserBdNull'

  export default {
    data : () => ({
      bol: true
    }),
      components:{
        Tolbar,
        UserBdNull
      }
  }
</script>

