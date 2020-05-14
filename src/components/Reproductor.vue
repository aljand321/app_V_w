<template>
    <div style="width:100%; height: 100%; overflow-y: scroll;" class="container-2">
        <b-row v-if="list_video[0]">
            <b-col cols="12" md="8" lg="8">
               <div class="video-container">                   
                    <video  controls autoplay muted v-if="video != {}" style="width:100%" :src="url+'/'+video.videoPath" @ended="video_end($event,video.id)"></video>
               </div>
               <div class="title-video">
                   <h5> {{video.artista}} - {{video.nombre}} </h5>
                    <!-- <div class="check-button">   
                        <div class="btn-group">
                            <button @click="get_video_lista" type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Guardar
                            </button>
                            <div class="dropdown-menu">
                                <b-form-checkbox class="goup-checkbox"
                                    v-for="(list, index) in list_reproduccion"
                                    
                                    :key="index"
                                    @change="video_add_lista($event, list.id, index)"
                                    name="flavour-3a"
                                    :checked="list.data"
                                >
                                    {{ list.title }}
                                </b-form-checkbox>
                                <div class="dropdown-divider"></div>
                                <b-dropdown-item v-b-modal.modal-center>Crear nueva lista</b-dropdown-item>
                            </div>
                        </div>                 
                    </div> -->
               </div> 
           </b-col>
           <b-col  cols="12" md="4" lg="4">
                <div class="list-container">
                    <div class="title-album">
                        <h4>Videos</h4>
                    </div>
                    <div  style="overflow-y: scroll;" class="list-card">
                        <div  v-for="(list,index) of list_video" :key="index" :borderColor="css(index)" class="card mb-3" style="width: 100%;" 
                            @click="video_click(index)" >
                            <div class="row no-gutters">
                                <div cols="4">                                    
                                    <video style="width:100px; height: 100%;" :src="url+'/'+list.videoPath"></video>
                                </div>
                                <div cols="8">
                                    <div class="card-body">
                                        <h6 lass="card-title" style="font-size: 100%">{{list.artista}} - {{list.nombre}}</h6>
                                        <p class="card-text"><small style="font-size: 100%" class="text-muted">{{list.album}}</small></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
           </b-col>
        </b-row>
        <b-row v-else>
            <h1>No hay videos en esta lista</h1>
        </b-row>
    </div>
</template>
<script>
var data_url = require('../assets/p1.js')
export default {
    name:"Reproductor",
    data:()=>({
        url:data_url.default.url,
        video:{},
        list_video:[],
        
    }),
    created(){
        this.get_video_list();
    },
    
    methods:{
        get_video_list(){
            this.axios.get(this.url+'/video_lista/'+this.$route.params.id)
            .then(videos => {                
                this.list_video = videos.data
                this.video = videos.data[0]
                console.log(this.list_video, " esto son los videos")
            })
            .catch( erro => console.error(erro))
        },
        css(index){
            if(this.list_video[index].videoPath == this.video.videoPath){
                return true
            }
        },
        video_click(position){
            for(var i =0 ; i < this.list_video.length; i++){
                if (i == position){
                    this.video = this.list_video[i]
                    //this.id_video = this.list_video[i].id
                }
            }
        },
    }
    
}
</script>

<style scoped>
    .container-2{          
        position: fixed ;
        width: 100%;
        height: 100%;
        padding: 30px;               
    }
    [borderColor]{
        background: rgb(196, 196, 196);
        border-left-color: red;
    }
    .title-video{ 
        padding-left: 10px;
        height: 40px;
    }
    .title-video h5{
        display: inline;
    }
    .check-button{        
        float:right;
    }
    .goup-checkbox{        
        padding-left: 40px;
    }
    .card:hover{
        border-color: rgb(82, 0, 0);
    }
    .video-container{
       
        padding: 5px;
        width: 100%;
    }
    .view-video{
              
        width: 100%;
    }
    .list-container{
        background: rgb(48, 47, 47);  
        height: 600px;
    }
    .title-album{
        background: rgb(18, 19, 20);
        text-align: center;
        color: white;       
        height: 40px;
        margin-bottom:10px ;
    }
    .title-album h4 {
        display: inline;
    }
    
    .list-card{
        padding-left: 10px;
        padding-right: 10px;
        height: 87%;
    }
    .list-card::-webkit-scrollbar {
    -webkit-appearance: none;
    }

    .list-card::-webkit-scrollbar:vertical {
        width:10px;
    }

    .list-card::-webkit-scrollbar-button:increment,.list-card::-webkit-scrollbar-button {
        display: none;
    } 

    .list-card::-webkit-scrollbar:horizontal {
        height: 10px;
    }

    .list-card::-webkit-scrollbar-thumb {
        background-color: #797979;
        border-radius: 20px;
        border: 2px solid #f1f2f3;
    }

    .list-card::-webkit-scrollbar-track {
        border-radius: 10px;  
    }

</style>