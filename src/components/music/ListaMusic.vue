<template>
    <div class="mt-5">
        
        <!-- <div class="contenedor">
           
            <img class="image" src="https://htmlcolorcodes.com/assets/images/html-color-codes-color-tutorials-hero-00e10b1f.jpg" alt="">
           
        </div> -->

        <div class="news-cards">
            
            <div class="card esto" v-for="(list,index) in list_data" :key="index" 
            @mouseover="hover(true, index)" @mouseleave="hover(false, index)" @click="mostrar_video(list.id)">
                <!-- <img class="card-img" src="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/bologna-3.jpg" alt="Bologna"> -->
                <video class="card-img" :src="url+'/'+list.video"></video> 
                <div v-if="list.hover" class="card-img-overlay text-white d-flex flex-column justify-content-center">
                <h4 class="card-title">Bologna</h4>
                <h6 class="card-subtitle mb-2">Emilia-Romagna Region, Italy</h6>
                <div class="link d-flex">
                    
                    <b-button variant="outline-danger" class="mb-2">
                        <b-icon icon="x-octagon" aria-hidden="true"></b-icon> 
                    </b-button>
                </div>
                </div>
            </div>
           
            
        </div>

        
    </div>

    
</template>

<script>
import {mapMutations} from 'vuex'

import axios from 'axios';
var data_url = require('../../assets/p1.js')
var video1 = require('../../assets/aoa.mp4')
export default {
    name:'ListaMusic',
    
    data:() => ({
        url: data_url.default.url,
        video:video1,
        id_portada:'',
        list_data:[]
    }),
    created(){
        console.log(this.$route.params.id, " desde lista ")
        this.id_portada = this.$route.params.id
        this.get_list()
    },
    methods:{
        ...mapMutations(['video_one']),
        insert_data_video_one(data){
            console.log(data, " esto es lo que queiro ver")
            this.video_one(
                {
                    id:data.id, 
                    album:data.album, 
                    genero:data.genero, 
                    artista: data.artista,
                    anio: data.anio,
                    genero: data.genero,
                    video_data:data.videoPath, 
                    estado:true
                })
        },
        hover(event, index){
            if(event == true){
                for(var i = 0; i < this.list_data.length; i++){
                    if(i == index){
                        this.list_data[i].hover = true                       
                    }
                   
                }
            }else{
                 for(var i = 0; i < this.list_data.length; i++){
                   if(i == index){
                        this.list_data[i].hover = false
                    }
                }
            }
            
        },
        async get_list(){
            var lista = await this.axios.get(this.url+'/album_portada/'+this.id_portada)
            var arr = []
            for(var i = 0; i < lista.data.length; i++){
                arr.push({
                    id:lista.data[i].id,
                    video:lista.data[i].videoPath,
                    album:lista.data[i].album,
                    nombre:lista.data[i].nombre,
                    hover:false
                })
            }
            this.list_data = arr
            console.log(lista)
        },
        async mostrar_video(id_video){    
            var error = false      
            try{
                var one_video = await this.axios.get(this.url+'/album/'+id_video)
                if(one_video.data.length > 0){                    
                    this.insert_data_video_one(one_video.data[0])
                    error = false
                }else{
                    error = true
                }
               
            }catch(error){
                console.log(error)
            }finally{
                if(error == false){
                    console.log("a finalizado")
                }else{
                    console.log("ocurrio un error al traer los datos desde la base de datos")                    
                }
            }            
        }
        
    }
}
</script>

<style  scoped>
.news-cards{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 20px;
}
.news-cards img{
    width: 100%;
    height: 250px;
}
.card-t{
    width: 100%;
    height: 250px;
}
.zoom { 
  
  transition: transform .2s; /* Animation */
  
}
.zoom:hover {
  transform: scale(1.5); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
}


</style>