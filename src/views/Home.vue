<template>
  <div v-if="search_result_portada == 0">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div class="container-2" v-if="!phone">
        <div class="new-cards">
            <b-card  v-for="(list, index) of list_portada" :key="index"
                :title='list.title'
                :img-src=" url +'/'+ list.imagePath"
                img-alt="Image"
                img-top
                tag="article"
                style="max-width: 20rem;"
                class="mb-2 hover tamanio"                   
            >
            <b-card-text class="text-description" @click="selected(list.id)">
                {{list.description}}
            </b-card-text>                   
                <b-button  @click="redirect(list.id)" variant="primary">Ver</b-button>
                <b-button v-if="admin" @click="after_delete(list.id)" variant="danger" class="float-right" >Eliminar</b-button>
            </b-card>
            
        </div>
    </div>
    <div v-else class="card-horizontal">
        <div class="item" v-for="(list, index) of list_portada" :key="index">
            <div class="card" style="width: 18rem;">
                <img @click="selected(list.id)" class="card-img-top" :src="url +'/'+ list.imagePath" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">{{list.title}}</h5>
                    <p @click="selected(list.id)" class="card-text">{{list.description}}</p>
                    <b-button  @click="redirect(list.id)" variant="primary">Ver</b-button>
                    <b-button v-if="admin" @click="after_delete(list.id)" variant="danger" class="float-right" >Eliminar</b-button>
                </div>
            </div>
        </div>
           
    </div>
    
  </div>
  <div v-else>
      <div class="container-2" v-if="!phone">
        <div class="new-cards">
            <b-card  v-for="(list, index) of search_result_portada" :key="index"
                :title='list.title'
                :img-src=" url +'/'+ list.imagePath"
                img-alt="Image"
                img-top
                tag="article"
                style="max-width: 20rem;"
                class="mb-2 hover tamanio"                   
            >
            <b-card-text class="text-description" @click="selected(list.id)">
                {{list.description}}
            </b-card-text>                   
                <b-button  @click="redirect(list.id)" variant="primary">Ver</b-button>
                <b-button v-if="admin" @click="after_delete(list.id)" variant="danger" class="float-right" >Eliminar</b-button>
            </b-card>
            
        </div>
    </div>
    <div v-else class="card-horizontal">
        <div class="item" v-for="(list, index) of search_result_portada" :key="index">
            <div class="card" style="width: 18rem;">
                <img @click="selected(list.id)" class="card-img-top" :src="url +'/'+ list.imagePath" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">{{list.title}}</h5>
                    <p @click="selected(list.id)" class="card-text">{{list.description}}</p>
                    <b-button  @click="redirect(list.id)" variant="primary">Ver</b-button>
                    <b-button v-if="admin" @click="after_delete(list.id)" variant="danger" class="float-right" >Eliminar</b-button>
                </div>
            </div>
        </div>
           
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
/* import HelloWorld from '@/components/HelloWorld.vue' */
import axios from 'axios';
import { mapState } from 'vuex';
import {mapMutations} from 'vuex'
var data_url = require('../assets/p1.js')
var admin_data  = require('../assets/adminData.js')
export default {
    name: 'Home',
    data: () => {
        return {
            phone:false,
            url: data_url.default.url,
            list_portada:[],
            admin:  admin_data.default.access
        }
    },
    created(){
        this.get_list()  
        this.winWidth()
    },
    methods:{
        ...mapMutations(['portada_c']),

        //define below method first.
        winWidth: function () {
            var w = window.innerWidth;
             console.log(w, "esto es ")
            if ( w <= 450){
               
                this.phone = true
            }
            /* setInterval(() => {
                
            }, 100); */
        },

        
        async get_list (){

            try{
                var getList = await this.axios.get(this.url+'/portada',{
                    /* headers: {
                        'Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlciI6ImFsamFuZCIsImVtYWlsIjoiYWxqYW5kMzIxQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJG9IVHhpcDIzSXkxTHZyNW1JZHNOa09aeDNrMmIvN3ZOWlovYTA3OG5INmVZQnV1RmNKdFJ1IiwiY3JlYXRlZEF0IjoiMjAyMC0wNi0wMlQxODowMTowNi4yMDhaIiwidXBkYXRlZEF0IjoiMjAyMC0wNi0wMlQxODowMTowNi4yMDhaIiwiaWF0IjoxNTkxMTQyNjI0LCJleHAiOjE1OTM3MzQ2MjR9.SDL0Kk6Qtko6bkkuR6BK8vT1PFZzNAbcUZ3ttOwGjSI'
                    } */
                })
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
        
    },
    computed:{
        ...mapState(['search_result_portada'])
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
    .new-cards{
        padding-left: 15px;
        padding-right: 15px ;
        display: grid;        
        grid-template-columns: repeat(5, 1fr);
        gap: 10px;  
        margin: auto;      
    }
    @media (max-width: 1370px){
        .new-cards{
            grid-template-columns: repeat(4, 1fr);
        }
        .text-description{
            font-size: 14px;
        }
    }
    @media (max-width: 1100px){
        .new-cards{
            grid-template-columns: repeat(3, 1fr);
        }
        .text-description{
            font-size: 14px;
        }
    }
    @media (max-width: 850px){
        .new-cards{
            grid-template-columns: repeat(2, 1fr);
        }
        .text-description{
            font-size: 14px;
        }
    }
    @media (max-width: 670px){
        .new-cards{
            grid-template-columns: repeat(2, 1fr);
        }
        .text-description{
            font-size: 14px;
        }
        
    }
    @media (max-width: 580px){
        .new-cards{
            grid-template-columns: repeat(1, 1fr);
            
        }
        .text-description{
            font-size: 13px;
        }
        
    }
    .card-horizontal{
        margin-top: 30px ;
        display:flex;
        overflow-x: auto;
    }
    .card-horizontal::-webkit-scrollbar{
        display: none;
    }
    .card-horizontal .item{
        display: flex;
        background: blue;
        margin: 5px;
    }

    
    
</style>
