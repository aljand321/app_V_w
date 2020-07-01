<template>
    <div class="body-2">        
        <div class="card bg-dark text-white video-aljand">
            <video autoplay muted loop  :src="url+'/'+last_video.video"></video>
            <div class="card-img-overlay" >
                <table style="height: 100%;"  >
                    <tbody>
                        <tr>                      
                            <td class="align-middle">
                                <h1 >{{last_video.artista}} </h1>
                                <h4>{{last_video.name}}</h4>
                                <b-button @click="video_click(last_video.id)" variant="outline-secondary">
                                    <b-icon icon="play-fill"></b-icon> Reproducir
                                </b-button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="new-cards">
           <!-- para la paginacion remplazamos esto  
                <div class="card" v-for="(list,index) of video_list[selectded_page]" :key="index" > -->
            <div class="card" v-for="(list,index) of video_list" :key="index" >
                <img class="card-img" style=" width: 100%; height: 100%; " :src="url+'/'+list.albun.videoPath"> 
                
                <div  class="card-img-overlay text-white d-flex flex-column justify-content-center">
                    <h4 style="color: white;" class="card-title">{{list.albun.artista}}</h4>                                                    
                    <h6 style="color: white;" class="card-subtitle mb-2">{{list.albun.nombre}}</h6>
                    <div class="link d-flex">
                        <b-button @click="video_click(list.albun.id)"  variant="outline-dark" class="mb-2">
                            <b-icon icon="play" aria-hidden="true"></b-icon> 
                        </b-button>                                    
                    </div>
                </div>
            </div> 
            
        </div>
        <!-- esto es para la paginacion -->
        <!-- <div>
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li class="page-item"><a class="page-link" @click="paginacion(video_list,2)">Previous</a></li>
                    <li class="page-item" v-for="(num, i) in page_num" :key="i" @click="cambiar_pagina(i)"><a class="page-link" >{{i+1}}</a></li>
                   
                    <li class="page-item"><a class="page-link" href="#">Next</a></li>
                </ul>
            </nav>
        </div> -->
      
       
    </div>
</template>

<script>
var video = require('../assets/aoa.mp4')
var data_url = require('../assets/p1.js')
import axios from 'axios';
import Cookies from 'js-cookie'

export default {
    data:() => ({
        video,
        data_t: JSON.parse(Cookies.get('Tdata')),
        url: data_url.default.url,
        video_list:[],
        page_num:'',
        selectded_page:0,
        last_video:{
            artista:'',
            name:'',
            video:'',
            id:''
        }
    }),
    created(){
        this.get_list_videos()
        
        console.log(this.paginacion(this.video_list, 2), " easdasd")
    },
    methods:{
        /* hover(data){
            console.log(data, " esto es el hover <<<<<<<<<<<<<<<<<<<<<<<<")
            if(data == true){
                this.get_list_videos()                
            }
        }, */
        async get_list_videos(){
            console.log(this.data_t.Num, " id del usuario")
            try{
                var videos = await this.axios.get(this.url+'/album/'+this.data_t.Num,{
                    headers: {
                        'Authorization': this.data_t.tk
                    }
                })
                //console.log(videos.data, " esto es la respuesta <<<<<<<<<<")
                this.video_list = videos.data    
                //para la paginacion <<<<<<<<<<<<<<<<<  
                    /* this.video_list = this.paginacion(videos.data, 8)     
                    this.page_num = this.video_list.length     */
                //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
                var last_position = videos.data.length
                this.last_video.artista = videos.data[last_position-1].albun.artista
                this.last_video.name = videos.data[last_position-1].albun.nombre
                this.last_video.video = videos.data[last_position-1].video
                this.last_video.id = videos.data[last_position-1].albun.id
                console.log(last_position-1)
            }catch(err){
                console.error(err);
                
            }finally{
                
            }
        },
        video_click(id_video){
            console.log(id_video)
            this.$router.push('/ver_video/'+id_video)
        },
        //funciones para la paginacion
        paginacion(arr, size){
            return arr.reduce((acc, val, i) => {
                let idx = Math.floor(i / size)
                let page = acc[idx] || (acc[idx] = [])
                page.push(val)
                return acc
            }, [])
        },
        cambiar_pagina(pagina){
            this.selectded_page = pagina
            console.log(this.selectded_page)
        },
        //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        
    }
    
}
</script>

<style scoped>
    .body-2{
        background: rgb(31, 31, 31);
        height: 100%;
    }
    .video-aljand{       
        border-radius: 0;
    }
    .video-aljand video{
        width: 100%;
    }
    .align-middle{
        padding-left: 50px ;
        padding-top: 320px;
    }
    .new-cards{
        padding-left: 15px;
        padding-right: 15px ;
        display: grid;        
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;
        margin: -275px 0;
    }
    
    @media (max-width: 1700px){
        .new-cards{
            margin: -200px 0;
        }
    }
    @media (max-width: 1500px){
        .new-cards{
            margin: -150px 0;
        }
    }
    @media (max-width: 1350px){
        .new-cards{
            margin: -100px 0;
        }
    }
    @media (max-width: 1170px){
        .new-cards{
            margin: -70px 0;
        }
    }

    @media (max-width: 1070px){
        .new-cards{
            margin: -40px 0;
        }
    }
    
    @media (max-width: 930px){
        .align-middle{
            padding-left: 30px ;
            padding-top: 150px;
        }
    }
    @media (max-width: 850px){
        .align-middle{
            padding-left: 15px ;
            padding-top: 0px;
        }
        .new-cards{
            margin: -160px 0;
            grid-template-columns: repeat(2, 1fr);
        }
    }
    @media (max-width: 750px){
        .align-middle{
            padding-left: 30px ;
            padding-top: 150px;
        }
        .new-cards{
            margin: -25px 0;
            grid-template-columns: repeat(2, 1fr);
        }
    }
    @media (max-width: 700px){
        .align-middle{
            padding-left: 20px ;
            padding-top: 50px;
        }
        .new-cards{
            margin: -15px 0;
            grid-template-columns: repeat(1, 1fr);
        }
    }
   
</style>