<template>
    <div style="width:100%; height: 100%; overflow-y: scroll;" class="container-2">
       <b-row>
           <b-col cols="12" md="8" lg="8">
               <div class="video-container">                   
                    <video style="width:100%"  controls v-if="video != ''" autoplay :src="url+'/'+video"  @ended="video_finish($event,position_video)"></video>
               </div>
               <div class="title-video">
                   <h5> {{name_video}} - {{artista_video_name}} </h5>
               </div>     
           </b-col>
           <b-col  cols="12" md="4" lg="4">
               
                <div class="list-container">
                    <div class="title-album">
                        <h4>{{artista_video_name}}</h4>
                        <!-- <b-button class="float-right" variant="outline-info">Dark</b-button> -->
                         <b-button @click="add_new_video(id_portada)" class="float-right" variant="dark" title="Align right">
                            <b-icon  icon="plus-square" aria-hidden="true"></b-icon>
                        </b-button>
                    </div>
                    <div style="overflow-y: scroll;" class="list-card">
                        <div v-for="(list,index) of videos_list" :key="index" class="card mb-3" :borderColor="css(index)" style="width: 100%;" @click="video_selected(index)" >
                            <div class="row no-gutters">
                                <div cols="4">
                                    <!-- <img  src="https://channel-korea.com/wp-content/uploads/2018/12/officiallykmusic.jpg" class="card-img" alt="..."> -->
                                    <video style="width:100px; height: 100%;" :src="url+'/'+list.videoPath"></video>
                                </div>
                                <div cols="8">
                                    <div class="card-body">
                                        <h6 lass="card-title">{{list.artista}} - {{list.nombre}}</h6>
                                        <p class="card-text"><small class="text-muted">{{list.album}}</small></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
           </b-col>
       </b-row>
        
    <br><br>
    </div>
</template>
<script>
var video2 = require('../assets/aoa.mp4')
var data_url = require('../assets/p1.js')
export default {
    data:()=> ({
        video:'',
        position_video:'',
        name_video:'',
        artista_video_name:'',
        url:data_url.default.url,
        id_portada: '',
        videos_list:[]        
    }),
    created(){
        this.id_portada = this.$route.params.id
       
        this.list_video()
    },
    methods:{
        css(index){
           
            
            if( this.videos_list[index].videoPath == this.video ){
                return true
            }
            
           
        },
        async list_video(){

            try{
                var videos = await this.axios.get(this.url+'/album_portada/'+this.id_portada)
                this.videos_list = videos.data
                this.video = videos.data[0].videoPath
                this.name_video = videos.data[0].nombre
                this.artista_video_name = videos.data[0].artista
                this.position_video = 0
                
            }catch(err){
                console.error(err);                
            }finally{
                console.log("finalizo....")
            }
        },
        video_selected(index){
           
            for(var i = 0; i < this.videos_list.length; i++){
                if( i == index ){
                    this.video = this.videos_list[i].videoPath
                    this.position_video = i
                    this.name_video = this.videos_list[i].nombre
                    this.artista_video_name = this.videos_list[i].artista

                }
            }
        },
        video_finish(data, position){
            var i = position + 1 
            if(i < this.videos_list.length ){
                this.video_selected(i)            

            }
        },
        add_new_video(id_portada){
            console.log(id_portada, " esto es el click ")
            this.$router.push('/add_music_video/'+id_portada)

        }
        
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