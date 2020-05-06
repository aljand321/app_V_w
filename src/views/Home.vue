<template>
  <div class="mt-3">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <b-row>
       
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
                    <b-button @click="redirect(list.id)" variant="primary">Ver</b-button>

                    <b-button @click="after_delete(list.id)" variant="danger" class="float-right" >Eliminar</b-button>
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
             this.portada_c(false)
        },

        delete_portada(id){                       
            this.axios.delete(this.url+'/portada/'+id)
            .then(data  => {
                console.log(data.data, " esto es el error que quiero ver")
                if (data.data.success == true){
                    this.$swal('Eliminado', 'Se elimino', 'success')
                    this.get_list();
                }
                
            })
            .catch(error => {
                if(error){
                  this.$swal({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo elminar los datos'                   
                })  
                }
            })
        },
        
        after_delete(id){
            this.$swal({
            title: '¿Seguro que quieres elminar?',
            text: 'No se puede revertir esta accion',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'No, cancelar',
            showCloseButton: true,
            showLoaderOnConfirm: true
            }).then((result) => {
            if(result.value) {
                /* this.$swal('Deleted', 'You successfully deleted this file', 'success') */
               this.delete_portada(id)
            } else {
                this.$swal('Cancelado', 'Su Album sigue activo', 'info')
            }
            })
        }
        
    }
}
</script>
