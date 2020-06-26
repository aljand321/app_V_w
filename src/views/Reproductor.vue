/* ESTE ES EL REPRODUCTOR DE TODOS LOS VIDEOS */
<template>
    <div style="width:100%; height: 100%; overflow-y: scroll;" class="container-2">
       <b-row>
           <b-col cols="12" md="8" lg="8">
               <div class="video-container">                   
                    <video class="video-aljand" controls autoplay  v-if="ver_video != ''"  :src="url+'/'+ver_video" @ended="video_end($event,video.id)"></video>
                    <!-- <div class="play-icon">
                        <b-icon class="iconP" icon="play-fill" ></b-icon>
                        <b-icon icon="play-fill" class="rounded-circle bg-dark p-2 iconP" variant="light"></b-icon>
                    </div> -->
                    <!-- <div class="icons-video">
                        <div class="next-play">
                            <b-icon style="width: 25px; margin-left:5px" icon="skip-start-fill" variant="light"></b-icon>
                            <b-icon style="width: 25px; margin-left:10px" icon="play-fill" variant="light"></b-icon>
                            <b-icon style="width: 25px; margin-left:10px" icon="skip-end-fill" variant="light"></b-icon>
                        </div>
                        <div class="full-midel float-right">
                            <b-icon style="width: 20px; margin-right:15px" icon="aspect-ratio" variant="light"></b-icon>
                            <b-icon style="width: 18px; margin-right:18px" icon="fullscreen" variant="light"></b-icon>
                        </div>
                    </div> -->
                   
               </div>
               <div class="title-video">
                   <h5> {{video.artista}} - {{video.nombre}} </h5>
                    <div class="check-button">   
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
                    </div>
               </div> 
           </b-col>
           <b-col  cols="12" md="4" lg="4">
                <div class="list-container">
                    <div class="title-album">
                        <h4>Videos</h4>
                        <b-button @click="video_aleatorio" style="margin-top: 4px; margin-right: 5px" size="sm" class="mb-2 btn-light float-right">
                            <b-icon icon="shuffle" aria-hidden="true"></b-icon>
                        </b-button>
                    </div>
                    <div  style="overflow-y: scroll;" class="list-card">
                        <!-- <div  v-for="(list,index) of list_video" :key="index" :borderColor="css(index)" class="card mb-3" style="width: 100%;" 
                           >
                            <div class="row no-gutters">
                                <div cols="4"  @click="video_click(index)">                                    
                                    <img style="width:100px; height: 100%;" :src="url+'/'+list.videoPath">
                                </div>
                                <div class="card-container" cols="8" @click="video_click(index)">
                                    <div class="card-body">
                                        <h6 lass="card-title" style="font-size: 100%">{{list.artista}} - {{list.nombre}}</h6>
                                        <p class="card-text"><small style="font-size: 100%" class="text-muted">{{list.album}}</small></p>
                                        
                                    </div>                           
                                </div>
                               
                                <div class="btn-group" role="group">
                                    <button @click="get_video_lista(list.id)" id="btnGroupDrop1" type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                       
                                    </button>
                                    
                                    <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                                        <b-form-checkbox class="goup-checkbox"
                                            v-for="(list1, index) in list_reproduccion"                                        
                                            :key="index"
                                            @change="video_add_lista($event, list1.id, index, list.id )"
                                            name="flavour-3a"
                                            :checked="list1.data"
                                        >
                                            {{ list1.title }}
                                        </b-form-checkbox>
                                        
      
                                        <div class="dropdown-divider"></div>
                                        <b-dropdown-item v-b-modal.modal-center>Crear nueva lista</b-dropdown-item>
                                    </div>
                                </div>
                            </div>
                        </div> -->
                        <div class="card1-container" :borderColor="css(index)" v-for="(list,index) of list_video" :key="index" >
                            <div class="card1-image"  @click="video_click(index)">                                
                                <img style="width:100%; height: 100%;" :src="url+'/'+list.videoPath">
                            </div>
                            <div class="card1-title"  @click="video_click(index)">
                                <p>{{list.artista}} - {{list.nombre}}</p>
                                <p>{{list.album}}</p>
                            </div>
                            <div class="btn-group" role="group">
                                    <button @click="get_video_lista(list.id)" id="btnGroupDrop1" type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                       
                                    </button>
                                    
                                    <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                                        <b-form-checkbox class="goup-checkbox"
                                            v-for="(list1, index) in list_reproduccion"                                        
                                            :key="index"
                                            @change="video_add_lista($event, list1.id, index, list.id )"
                                            name="flavour-3a"
                                            :checked="list1.data"
                                        >
                                            {{ list1.title }}
                                        </b-form-checkbox>
                                        <!-- <div style="margin-left: 15px" v-for="(list1, index) in list_reproduccion" :key="index" class="custom-control custom-checkbox">
                                            <template v-if="list1.data == true">
                                                <input @change="video_add_lista(true, list1.id, index, list.id )" type="checkbox" checked class="custom-control-input" id="customCheck1">
                                            </template>
                                            <template v-else>
                                                <input @change="video_add_lista(false, list1.id, index, list.id )" type="checkbox" class="custom-control-input" id="customCheck1">
                                            </template>
                                           
                                            <label class="custom-control-label" for="customCheck1">{{ list1.title }}</label>
                                        </div> -->

                                        <div class="dropdown-divider"></div>
                                        <b-dropdown-item v-b-modal.modal-center>Crear nueva lista</b-dropdown-item>
                                    </div>
                                </div>
                        </div>
                        
                        
                    </div>
                </div>
           </b-col>
       </b-row>
        <!-- <b-row>
           <b-col cols="4">
                <b-card class="mt-3" header="Form Data Result">
                    <pre class="m-0">{{ list_reproduccion }}</pre>
                </b-card>
           </b-col>
           <b-cols cols="7">
                <b-card class="mt-3" header="Form Data Result">
                    <pre class="m-0">{{ video_lista_data }}</pre>
                </b-card>
           </b-cols>
        </b-row> -->

    <br><br>
   
    <b-modal
      id="modal-center"
      centered
      ref="modal"
      title="Nueva lista"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          :state="nameState"
          label="Nombre"
          label-for="name-input"
          invalid-feedback="Name is required"
        >
          <b-form-input
            id="name-input"
            v-model="name"
            :state="nameState"
            placeholder="Escribe el nombre de la lista..."
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { mapActions } from 'vuex';
import Cookies from 'js-cookie'
var video = require('../assets/aoa.mp4');
var data_url = require('../assets/p1.js');
require('../assets/css/card.css')
//https://bootstrap-vue.org/docs/components/modal#modals
export default {
    data:() => ({
        video1:video,
        data_t: JSON.parse(Cookies.get('Tdata')),
        video:{},
        ver_video:'',
        url:data_url.default.url,
        id_video:'',
        list_video:[],

        name:'',
        nameState: null,
        list_reproduccion: [],
        video_lista_data:[],
        esto:false
    }),

    created(){
        this.id_video = this.$route.params.id;
        this.one_video();
        
        this.get_list_reproduccion();        
    },
    mounted(){
        this.get_video_lista();
    },
    methods:{
        ...mapActions(['get_list_reproduccion_vuex']),
        async one_video(){
            var id_portada
            try{
                var video_one = await this.axios.get(this.url+'/album/'+this.id_video,{
                    headers: {
                        'Authorization': this.data_t.tk
                    }
                })
                this.video = await video_one.data[0]
                this.ver_video = await video_one.data[0].video_albums[0].video
                id_portada = video_one.data[0].idPortada
                this.list_video.push(video_one.data[0])
            }catch(err){
                console.error(err)
            }finally{
                this.first_videos_lista(id_portada);                
            }
        },
        async first_videos_lista(id_portada){
            try{
                var album_videos = await this.axios.get(this.url+'/album_portada/'+id_portada,{
                    headers: {
                        'Authorization': this.data_t.tk
                    }
                })
                var position = 0;
                while(album_videos.data.length !== 0){
                    if(this.list_video[0].id != album_videos.data[position].id){
                        if(album_videos.data[position].video_albums.length > 0){
                            await this.list_video.push(album_videos.data[position])
                            await album_videos.data.splice(position,1)
                        }else{
                            await album_videos.data.splice(position,1)
                        }             
                    }else{
                        await album_videos.data.splice(position,1)
                    }
                }
            }catch(err){
                console.error(err);
                
            }finally{
                this.get_list_video();
                album_videos = {}
            }
            
        },
        
        async get_list_video(){
            try{
                var list = await this.axios.get(this.url+'/album',{
                    headers: {
                        'Authorization': this.data_t.tk
                    }
                })
                
                var p = 0, ver_delete=[];
                for(var i = 0; i < this.list_video.length ; i++){
                    for(var j = 0; j < list.data.length; j++){
                        if(this.list_video[i].id == list.data[j].id){
                            list.data.splice(j,1)
                        }
                    }                    
                }                
            }catch(err){
                console.error(err);                
            }finally{
                for(var i = 0; i < list.data.length; i++){
                    if (list.data[i].video_albums.length > 0){
                        this.list_video.push(list.data[i])
                    }
                    
                }
                list = {}
            } 
        },
        video_click(position){
            for(var i =0 ; i < this.list_video.length; i++){
                if (i == position){
                    this.video = this.list_video[i]
                    this.ver_video = this.list_video[i].video_albums[0].video
                    this.id_video = this.list_video[i].id
                }
            }
            this.get_video_lista();
        },
        css(index){
            if(this.list_video[index].videoPath == this.video.videoPath){
                return true
            }
        },
        video_end(data,id_video){
            var position = 0
            for(var i = 0 ; i < this.list_video.length; i++){
                if(this.list_video[i].id == id_video){
                    position = i+1
                    if(position < this.list_video.length){
                        this.video = this.list_video[position]
                        this.ver_video = this.list_video[position].video_albums[0].video
                        
                        this.id_video = this.list_video[position].id
                       
                    }else{
                        this.video = this.list_video[0]
                        this.ver_video = this.list_video[0].video_albums[0].video
                        this.get_video_lista(this.list_video[0].id)
                        this.id_video = this.list_video[0].id
                    }
                }
            }
        }, 
        // lista de reproduccion
        checkFormValidity() {
            const valid = this.$refs.form.checkValidity()
            this.nameState = valid
            return valid
        },
        resetModal() {
            this.name = ''
            this.nameState = null
        },
        handleOk(bvModalEvt) {
            // Prevent modal from closing
            bvModalEvt.preventDefault()
            // Trigger submit handler
            this.handleSubmit()
        },
        async handleSubmit() {
            // Exit when the form isn't valid
            console.log(this.data_t.tk)
            if (!this.checkFormValidity()) {
                return
            }
            // Push the name to submitted names
            var error = false
            var datas= { title:this.name }
            try{
                var data = await this.axios.post(this.url+'/lista_reproduccion/'+this.data_t.Num,
                datas,{
                    headers: {
                        'Authorization': this.data_t.tk
                    }
                })
                
                
            }catch(erro){
                console.error(erro);
                error = true
                
            }finally{
                if(error == false){
                    this.get_list_reproduccion();
                }else{
                    console.log("no se pudo insertar los datos")
                }
            }
            // Hide the modal manually
            this.$nextTick(() => {
            this.$bvModal.hide('modal-center')
            })
        },
        async get_list_reproduccion(){
            try{
                var list = await this.axios.get(this.url+'/lista_reproduccion',{
                    headers: {
                        'Authorization': this.data_t.tk
                    }
                })
                this.list_reproduccion = list.data.data
                
            }catch(erro){
                console.error(erro);                
            }finally{
               list.data = []
            }
        },
        //add video a la lista de reproduccion
        async add_lista_get(){
            try{
                var video_lista = await this.axios.get(this.url+'/video_lista',{
                    headers: {
                        'Authorization': this.data_t.tk
                    }
                })
                this.video_lista_data = await video_lista.data
            }catch(err){
                console.error(err);
                
            }finally{
                video_lista.data = []
            }
        },
        async video_add_lista(event, id_listaR, position, id_video_in_card_list){
            //console.log(event,id_listaR, position, id_video_in_card_list)
            if(event == true){
                var error = false
                if (isNaN(id_video_in_card_list)){
                    var datas = {
                        id_album:this.id_video,
                        id_lista:id_listaR
                    }
                }else{
                    var datas = {
                        id_album:id_video_in_card_list,
                        id_lista:id_listaR
                    }
                }
                
                try{
                    var data = await this.axios.post(this.url+'/video_lista',datas,{
                        headers: {
                            'Authorization': this.data_t.tk
                        }
                    })
                    this.add_lista_get();
                }catch(erro){
                    console.error(erro);
                    
                }finally{
                    console .log("finalizao");
                    this.list_reproduccion[position].data = true
                }
            }else{
                var id_video_in_lista
                if (isNaN(id_video_in_card_list)){
                    for(var i = 0; i < this.video_lista_data.length; i++){
                        if(this.video_lista_data[i].id_lista == id_listaR && this.video_lista_data[i].id_video == this.id_video){
                            id_video_in_lista = this.video_lista_data[i].id
                        }
                    }
                }else{
                    for(var i = 0; i < this.video_lista_data.length; i++){
                        if(this.video_lista_data[i].id_lista == id_listaR && this.video_lista_data[i].id_video == id_video_in_card_list){
                            id_video_in_lista = this.video_lista_data[i].id
                        }
                    }
                }
                try{                    
                    var eliminar = await this.axios.delete(this.url+'/video_lista/'+id_video_in_lista,{
                        headers: {
                            'Authorization': this.data_t.tk
                        }
                    })
                    this.add_lista_get();
                }catch(err){
                    console.error();                    
                }finally{
                    this.list_reproduccion[position].data = false
                } 
            } 
           
        },
        async get_video_lista(id_video_in_list_card){   
            this.get_list_reproduccion();
            try{
                var video_lista = await this.axios.get(this.url+'/video_lista',{
                    headers: {
                        'Authorization': this.data_t.tk
                    }
                })
                this.video_lista_data = await video_lista.data
            }catch(erro){
                console.error(erro);
            }finally{
                
                if(isNaN(id_video_in_list_card)){
                   
                    for(var i = 0; i < video_lista.data.length; i++ ){
                        if(video_lista.data[i].id_video == this.id_video  ){                     
                            this.check(video_lista.data[i].id_lista)
                        }
                    }
                }else{
                    
                    for(var i = 0; i < video_lista.data.length; i++ ){
                        if(video_lista.data[i].id_video == id_video_in_list_card ){                     
                            this.check(video_lista.data[i].id_lista)
                            /* for(var j = 0; j < this.list_reproduccion.length; j++){
                                if(this.list_reproduccion[j].id == video_lista.data[i].id_lista){
                                    this.list_reproduccion[j].data = true
                                }
                            } */
                        }
                    }
                }
                video_lista.data = []
            }                  
        },
        check(id_lista){
            for(var i = 0; i < this.list_reproduccion.length; i++){
                if(this.list_reproduccion[i].id == id_lista){
                    this.list_reproduccion[i].data = true
                }
            }
        },

        video_aleatorio(){     
            
            //https://medium.com/@fyoiza/how-to-randomize-an-array-in-javascript-8505942e452
            var arr = []
            
            while(this.list_video.length !== 0){
                var ramdom = Math.floor(Math.random()*this.list_video.length);
                arr.push(this.list_video[ramdom]);
                this.list_video.splice(ramdom,1)
            }
            this.list_video = arr
            this.video = arr[0]
            this.ver_video = arr[0].video_albums[0].video
            
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
        position: relative;
        padding: 5px;
        width: 100%;
    }
    .video-aljand{
        width:100%
    }
    .play-icon {
        transition: .5s ease;
        opacity: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        text-align: center;
       
    }
    .iconP{
        width: 60px;
        height: 50px;
    }
    
    /* .video-container:active .play-icon{
        opacity: 1;
    } */
    
    .video-container:active .iconP{
        transition: .5s ease;
        width: 100px; 
        height: 100px;
    }
    .icons-video{      
        width: 100%;
        position: absolute;
        opacity: 0;
        font-size: 2rem;
        margin-top: -50px;
        
    }
    .next-play{
        display: inline;
    }
    .full-midel{
        display: inline;
    }

    /* http://jsfiddle.net/trixta/VvmmC/
        https://stackoverflow.com/questions/29049718/how-to-add-button-overlay-in-video-tag
        https://codepen.io/artchibald/pen/zowLdR?editors=1010
        https://www.w3schools.com/howto/howto_css_image_overlay.asp
        https://thoughtbot.com/blog/positioning

        https://www.w3schools.com/howto/howto_css_fullscreen_video.asp
     */
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