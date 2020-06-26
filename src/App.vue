<template>
  <div id="app">
    <Tolbar v-if ="is_logged"/>
    <UserBdNull v-if="firts_user_null"/>
    <router-view v-if ="bol"/>   
  </div>
</template>

<script>
  import Tolbar from './components/header/Tolbar'
  import UserBdNull from './components/usuario/UserBdNull'
  import Cookies from 'js-cookie'
 
  var auth = require ('../src/auth');

  var data_url = require('../src/assets/p1.js')
  export default {
    data : () => ({
      url: data_url.default.url,
      is_logged: '',
      bol: null,
      firts_user_null: null
    }),
    components:{
      Tolbar,
      UserBdNull
    },
    created(){
      this.verifi_first_user()
      console.log(this.is_logged, " esto es ")
    },
    methods:{
      async verifi_first_user(){
        try{
          var data = await this.axios.get(this.url+'/user_length')
          this.firts_user_null = await data.data.success
        }catch(err){
          console.error(err);
        }finally{
          if(this.firts_user_null == true){
            this.bol = false
          }else{
            this.bol = true
            var C = Cookies.get('Tdata')
            if (C == undefined){
              const path = '/login'
              if (this.$route.path !== path) this.$router.push(path)
            }else{
              var Tdata = JSON.parse(Cookies.get('Tdata'))
              this.is_logged = Tdata.is_logged
              const path = '/'
              if (this.$route.path !== path) this.$router.push(path)
            }            
          }
        }
      },
      
    },
    computed:{
    }
  }
</script>

