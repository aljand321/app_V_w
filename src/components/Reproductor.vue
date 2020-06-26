<template>
    <div style="width:100%; height: 100%; overflow-y: scroll;" class="container-2">
        <b-row v-if="list_video[0]">
            <b-col cols="12" md="8" lg="8">
               <div class="video-container">                   
                    <video  controls autoplay muted v-if="video != {}" style="width:100%" :src="url+'/'+video.video_data" @ended="video_end($event,video.id)"></video>
               </div>
               <div class="title-video">
                   <h5> {{video.artista}} - {{video.nombre}} </h5>
                    <div class="check-button">   
                        <div class="btn-group">
                            <button @click="get_video_lista(video.id_video)" type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Guardar
                            </button>
                            <div class="dropdown-menu">
                                <b-form-checkbox class="goup-checkbox"
                                    v-for="(list, index) in list_reproduccion"
                                    
                                    :key="index"
                                    @change="video_add_lista($event,list.id,video.id_video)"
                                    name="flavour-3a"
                                    :checked="list.data"
                                >
                                  {{list.id}} - {{ list.title }}
                                </b-form-checkbox>
                                <div class="dropdown-divider"></div>
                                <b-dropdown-item v-b-modal.modal-center>Crear nueva lista</b-dropdown-item>
                            </div>
                        </div>                 
                    </div>
               </div> 
           </b-col>
           <b-col  cols="12" md="4" lg="4">
                <div class="list-container">
                    <div class="title-album">
                        <h4>Videos</h4>
                    </div>
                    <div  style="overflow-y: scroll;" class="list-card">
                        <div class="card1-container" :borderColor="css(index)" v-for="(list,index) of list_video" :key="index" >
                            <div class="card1-image"  @click="video_click(index)">                                
                                <img style="width:100%; height: 100%;" :src="url+'/'+list.portada">
                            </div>
                            <div class="card1-title"  @click="video_click(index)">
                                <p>{{list.artista}} - {{list.nombre}}</p>
                                <p>{{list.album}}</p>
                            </div>
                            <b-button @click="after_delete(list.id)" variant="light" size="sm" >
                                <b-icon icon="trash" variant="danger" ></b-icon> 
                            </b-button>
                        </div>
                    </div>
                </div>
           </b-col>
        </b-row>
        <b-row v-else>
            <h1>No hay videos en esta lista</h1>
        </b-row>
         <!-- <b-card class="mt-3" header="Form Data Result">
            <pre class="m-0">{{ video }}</pre>
        </b-card>
        <b-card class="mt-3" header="Form Data Result">
            <pre class="m-0">{{ list_video }}</pre>
        </b-card> -->
    </div>
</template>
<script>
var data_url = require('../assets/p1.js')
require('../assets/css/card.css')
import Cookies from 'js-cookie'
export default {
    name:"Reproductor",
    data:()=>({
        url:data_url.default.url,
        video:{},
        list_video:[],
        list_reproduccion :[],
        data_t: JSON.parse(Cookies.get('Tdata'))
        
    }),
    created(){
        this.get_video_list();
    },
    
    methods:{
        get_video_list(){
            this.axios.get(this.url+'/video_lista/'+this.$route.params.id,{
                headers: {
                    'Authorization': this.data_t.tk
                }
            })
            .then(videos => {                
                this.list_video = videos.data
                this.video = videos.data[0]
               
            })
            .catch( erro => console.error(erro))
        },
        css(index){
            if(this.list_video[index].portada == this.video.portada){
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
        video_end(data, id_video){
           
            var position = 0
            for(var i = 0; i < this.list_video.length; i++){
                if (this.list_video[i].id == id_video){
                    position = i+1
                    if(position < this.list_video.length){
                        this.video = this.list_video[position]
                    }else{
                        this.video = this.list_video[0]
                    }          
                }
            }
            
        },
        async get_video_lista(id_video){            
            try{
                var data = await this.axios.get(this.url+'/videos_of_lista/'+id_video,{
                    headers: {
                        'Authorization': this.data_t.tk
                    }
                })
                this.list_reproduccion = data.data                
            }catch(err){  
                console.error(err)      
            }
            finally{
                data.data = []
            }
        },
        async video_add_lista (event,id_listaR,id_video ){
            if (event == true){
                try{
                    var datas = {
                        id_album:id_video,
                        id_lista:id_listaR
                    }  
                    var data = await this.axios.post(this.url+'/video_lista',datas,{
                        headers: {
                            'Authorization': this.data_t.tk
                        }
                    })  
                    console.log(data)            
                }catch(err){
                    console.error(err)
                }finally{
                    this.get_video_lista(id_video)
                }
            }else{
                try{                    
                    var eliminar = await this.axios.delete(this.url+'/del_video_list/'+id_video+'/'+id_listaR,{
                        headers: {
                            'Authorization': this.data_t.tk
                        }
                    })
                    console,log(eliminar)
                }catch(err){
                    console.error(err);                    
                }finally{
                    this.get_video_lista(id_video);
                    if(id_listaR == this.$route.params.id ){
                        this.get_video_list();
                    }
                    
                }
            }
            
        },
        after_delete(id_video){
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
               this.delete_video_lista(id_video)
            } else {
                this.$swal('Cancelado', 'El video no se elimino de la lista', 'info')
            }
            })
        },
        async delete_video_lista(id_video){
            var erro = false
            try{                    
                var eliminar = await this.axios.delete(this.url+'/video_lista/'+id_video,{
                    headers: {
                        'Authorization': this.data_t.tk
                    }
                })
                console.log(eliminar)
            }catch(err){
                console.error(err);   
                erro = true               
            }finally{      
                if(erro == false){
                    this.$swal('Eliminado', 'Se elimino', 'success')
                    this.get_video_list();   
                }else{
                    this.$swal({
                        icon: 'error',
                        title: 'Error',
                        text: 'No se pudo elminar los datos'                   
                    })  
                }      
            }
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
    @media (max-width: 470px){
        .list-card h6{
           
            font-size: 2vw;
        }
        .list-card p{
            
            font-size: 3vw;
        }
       
    }

</style>