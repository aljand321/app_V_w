<template>
  <div class="mt-5">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <b-row class="mt-5">
       
            <b-col cols="12" md="4" v-for="(list, index) of list_portada" :key="index">
               <b-card
                    :title='list.title'
                    :img-src=" url +'/'+ list.imagePath"
                    img-alt="Image"
                    img-top
                    tag="article"
                    style="max-width: 20rem;"
                    class="mb-2"
                >
                <b-card-text>
                    {{list.description}}
                </b-card-text>

                    <b-button @click="redirect(list.id), portada_form()" variant="primary">Ver</b-button>
                </b-card>
            </b-col>       
        
    </b-row>
  </div>
</template>

<script>
// @ is an alias to /src
/* import HelloWorld from '@/components/HelloWorld.vue' */
import axios from 'axios';
import {mapMutations} from 'vuex'
var data_url = require('../assets/p1.js')
export default {
    name: 'Home',
    data: () => {
        return {
            url: data_url.default.url,
            list_portada:[]
        }
    },
    created(){
        this.get_list()       
    },
    methods:{
        ...mapMutations(['portada_c']),
        portada_form(){
            this.portada_c(false)
        },
        async get_list (){

            try{
                var getList = await this.axios.get(this.url+'/portada')
                this.list_portada = getList.data               
            }catch (error){
                console.log(error)
            }finally{
                console.log('finalizado')
            }
           
        },
        redirect(id){
            this.$router.push('/portada/'+id)
        }
        
    }
}
</script>
