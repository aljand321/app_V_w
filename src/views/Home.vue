<template>
  <div>
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div class="container-2">
        <b-row>        
            <b-col cols="12" md="3" v-for="(list, index) of list_portada" :key="index">
               <b-card
                    :title='list.title'
                    :img-src=" url +'/'+ list.imagePath"
                    img-alt="Image"
                    img-top
                    tag="article"
                    style="max-width: 20rem;"
                    class="mb-2 hover"                   
                >
                <b-card-text @click="selected(list.id)">
                    {{list.description}}
                </b-card-text>                   
                    <b-button @click="redirect(list.id)" variant="primary">Ver</b-button>
                    <b-button @click="after_delete(list.id)" variant="danger" class="float-right" >Eliminar</b-button>
                </b-card>
            </b-col>       

        </b-row>
    </div>
    
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
        },
        
        async selected(id_portada){
            var erro = false
            try{    
                var respuesta = await this.axios.get(this.url+'/album_portada/'+id_portada)
                console.log(respuesta.data.length, " esto es la respuesta", " id: ", id_portada)
                if(respuesta.data.length == 0){
                    erro = true
                }
            }catch(error){
                console.error(error)
            }finally{
                if(erro == false){
                    this.$router.push('/Video_album/'+id_portada)
                }else{
                    this.$router.push('/add_music_video/'+id_portada)
                }
            }
        }
        
    }
}
</script>

<style  scoped>
    .container-2{
        width: 100%;
        height: 100%;
        padding: 30px;
    }
    .hover:hover{
        box-shadow: 1px 2px 15px 0 rgb(46, 45, 45), 1px 2px 15px 0 rgb(46, 45, 45);        
    }
    
</style>
