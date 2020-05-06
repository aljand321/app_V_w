<template>
    <div class="mt-3">
        <b-row v-if="one_video_selected[5].estado == false">
                 
            <b-col cols="12" md="6" lg="6">
                <b-form @submit="post_video">
                    <div v-for="(input_list,index) in form_array" :key="index">
                        <b-form-group v-if="index < 5"                       
                            id="input-group-1"
                            :label="input_list.name"
                            :label-for="'input-'+index"
                                                
                        >
                        <b-form-input
                            :id="'input-'+index"
                            v-model="input_list.text"
                            type="text"
                            :state="estado(index)"
                            :placeholder="input_list.placeholder"
                            
                        ></b-form-input>
                    <!--  <input type="hidden" v-model="index"> -->
                    </b-form-group>  
                    </div>
                
                    <b-form-file     
                        @change="ver_video"             
                        :placeholder="form_array[5].name"
                        :state="estado(5)"
                        drop-placeholder="Archivo roto......"
                    ></b-form-file>
                
                                                    
                    
                    <div class="mt-3">
                        <b-button type="submit"  variant="primary">Submit</b-button>                    
                        <b-button type="reset" @click="buton_reset"  class="float-right" variant="danger">Reset</b-button>      
                    </div>                                 
                </b-form>
            </b-col>
            <b-col cols="12" md="6" lg="6">
                <b-container fluid class="p-1 bg-dark" v-if="form_array[5].text == ''">
                    <b-row>
                        <b-col>
                            <div >
                                <div  class="py-4 px-5">
                                    <b-img  thumbnail fluid :src="no_img"></b-img >
                                </div>
                                
                            </div>
                                                    
                        </b-col>
                    </b-row>
                </b-container> 
                <div v-else>                                       
                    <div class="player-container">                                  
                    <vue-core-video-player :autoplay="false" :src="form_array[5].text"></vue-core-video-player>  
                    </div> 
                </div>    
            </b-col>
        </b-row>
        <b-row v-else>
            <b-col cols="12" md="6" lg="6">
                <b-form @submit="update_video">
                    <div v-for="(input_list,index) in one_video_selected" :key="index">
                        <b-form-group v-if="index < 5"                       
                            id="input-group-1"
                            :label="input_list.name"
                            :label-for="'input-'+index"                                                
                        >
                        <b-form-input
                            :id="'input-'+index"
                            v-model="input_list.text"
                            type="text"
                            
                            :placeholder="input_list.placeholder"
                            
                        ></b-form-input>
                    <!--  <input type="hidden" v-model="index"> -->
                    </b-form-group>  
                    </div>
                    <div class="mt-3">
                        <b-button type="submit" variant="primary">Submit</b-button>                    
                        <b-button type="reset" @click="volver"  class="float-right" variant="danger">Volver</b-button>      
                    </div>                                 
                </b-form>
            </b-col>
            <b-col cols="12" md="6" lg="6">               
                <div>                                       
                    <div class="player-container">                                  
                        <vue-core-video-player :autoplay="false" :src="url+'/'+one_video_selected[5].video"></vue-core-video-player>  
                    </div>
                    <br>
                    <b-button type="reset" @click="eliminar_video(one_video_selected[5].id)"  class="float-right" variant="danger">Eliminar video</b-button> 
                </div>    
            </b-col>
        </b-row>
        <br>
        
        <b-row>
            <div class="news-cards">            
                    <div class="card esto" v-for="(list,index) in list_data" :key="index" 
                    @mouseover="hover(true, index)" @mouseleave="hover(false, index)">
                        <!-- <img class="card-img" src="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/bologna-3.jpg" alt="Bologna"> -->
                        <video  class="card-img" :src="url+'/'+list.video"></video> 
                        
                        <div  class="card-img-overlay text-white d-flex flex-column justify-content-center">
                            <h4 style="color: #42CED1;" class="card-title">{{list.artista}}</h4>                                                    
                            <h6 style="color: #42CED1;" class="card-subtitle mb-2">{{list.nombre}}</h6>
                            <div v-if="list.hover" class="link d-flex">
                                <b-button @click="mostrar_video(list.id)" variant="outline-info" class="mb-2">
                                    <b-icon icon="play" aria-hidden="true"></b-icon> 
                                </b-button>                                    
                            </div>
                            
                            
                        </div>
                    </div>   
            </div>
        </b-row>
        <!-- <b-card class="mt-3" header="Form Data Result">
            <pre class="m-0">{{ one_video_selected }}</pre>
        </b-card> -->
    </div>
</template>

<script>

import axios from 'axios';
var data_url = require('../../assets/p1.js')
import VueCoreVideoPlayer from 'vue-core-video-player';
var NO_image = require ('../../assets/noImage.png')
var video1 = require('../../assets/aoa.mp4')

export default {
    name:'addMusic',
    
    data:() => ({
        url: data_url.default.url,
        id_portada:'',
        file_data:'',
        form_array:[
            {name: 'Album', text:'', placeholder:'Inserte un nombre para album' , estado:null},
            {name: 'Nombre', text:'',placeholder:'Inserte un nombre', estado:null},
            {name: 'Artista', text:'', placeholder:'Inserte nombre del artista', estado:null},
            {name: 'Año', text:'', placeholder:'Año en que se publico este album', estado:null},
            {name: 'Genero', text:'', placeholder:'Genero de la musica', estado:null},
            {name: 'Selecione un video', text:'', estado:null }
        ],
        no_img:NO_image,

        video:video1,
        list_data:[], // esto es la lista de videos
        one_video_selected: [
            {name: 'Album', text:'', placeholder:'Inserte un nombre para album' , estado:null},
            {name: 'Nombre', text:'',placeholder:'Inserte un nombre', estado:null},
            {name: 'Artista', text:'', placeholder:'Inserte nombre del artista', estado:null},
            {name: 'Año', text:'', placeholder:'Año en que se publico este album', estado:null},
            {name: 'Genero', text:'', placeholder:'Genero de la musica', estado:null},
            {video:'', id: '', estado: false},
            
        ]
    }),
    created(){     
        this.id_portada = this.$route.params.id;
        this.get_list();
    },
    methods:{
        
        async update_video(e){
            e.preventDefault();
            var error = false
            try{
                var data = {
                    album: this.one_video_selected[0].text,
                    nombre:this.one_video_selected[1].text,
                    artista: this.one_video_selected[2].text,
                    anio: this.one_video_selected[3].text,
                    genero: this.one_video_selected[4].text,
                }
                var update_data = await this.axios.put(this.url+'/album/'+this.one_video_selected[5].id, data)
                if(update_data.data.success == true){
                   error = false 
                }else{
                    error = true
                }
            }catch(error){
                console.error(error)
            }finally{
                if(error == false){
                    this.get_list();
                    this.alert_success('Datos actualizados')
                }else{
                    this.alert_error('Algo sucedio no se pudo actualizar los datos')
                    error = false
                }
            }
        },
        volver(){
            for(var i = 0; i < this.one_video_selected.length; i++){
                this.one_video_selected[i].text = ''
            }
            this.one_video_selected[5].video = ''
            this.one_video_selected[5].id = ''
            this.one_video_selected[5].estado = ''


        },
        //para la lista
        /*
            <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
            <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< 
                                    lista de videos del album
            <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< 
            <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< 
         */
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
                    artista:lista.data[i].artista,
                    hover:false
                })
            }
            this.list_data = arr
        },
        async mostrar_video(id_video){    
            var error = false      
            try{
                var one_video = await this.axios.get(this.url+'/album/'+id_video)
                if(one_video.data.length > 0){                    
                    this.one_video_selected[0].text = one_video.data[0].album
                    this.one_video_selected[1].text = one_video.data[0].nombre
                    this.one_video_selected[2].text = one_video.data[0].artista
                    this.one_video_selected[3].text = one_video.data[0].anio
                    this.one_video_selected[4].text = one_video.data[0].genero
                    this.one_video_selected[5].video = one_video.data[0].videoPath
                    this.one_video_selected[5].id = one_video.data[0].id
                    this.one_video_selected[5].estado = true
                    error = false
                }else{
                    error = true
                }
               
            }catch(error){
                console.error(error)
            }finally{
                if(error == false){
                    console.log("a finalizado")
                }else{
                    console.log("ocurrio un error al traer los datos desde la base de datos")   
                    erro = false                  
                }
            }            
        },
        //para insertar datos
        buton_reset(){
            for(var i = 0; i < this.form_array.length; i++){
                this.form_array[i].text = ''
                this.form_array[i].estado = null
            }
        },
        ver_video(event){
            this.form_array[5].text = '';
            this.showAlert_video(500000*10)
            var video = event.target;
            if (video.files && video.files[0]){
                this.file_data = video.files[0]
                var reader = new FileReader();
                reader.onload = (e) => {
                    this.form_array[5].text =  e.target.result;    
                    this.showAlert_video(9000)           
                }                    
                reader.readAsDataURL(this.file_data)
            } 
        },
        async post_video(e){
            e.preventDefault(); 
            var error = false 
            for(var i = 0; i < this.form_array.length; i++){
                if(this.form_array[i].text == ''){
                    this.form_array[i].estado = false
                    error = true
                }
            }
            if(error == true){
                this.alert()
            }else{
                var error = false
                try{
                    this.showAlert(50000*10)
                    const data = new FormData();
                    data.append('album', this.form_array[0].text)
                    data.append('nombre', this.form_array[1].text)
                    data.append('artista', this.form_array[2].text)
                    data.append('anio', this.form_array[3].text)
                    data.append('genero', this.form_array[4].text)
                    data.append('vid', this.file_data)
                    var msg = await this.axios.post(this.url+'/album/'+this.id_portada,
                    data,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    if(msg.data.success == true){
                        error = false
                    }else{
                        error = true
                    }     
                    
                }catch(error){
                    console.error(error)
                }finally{
                    if(error == false){
                        
                        this.alert_success('Se insertaron los datos')
                        this.get_list();
                        for(var i = 0; i < this.form_array.length; i++){
                            this.form_array[i].text = ''
                            this.form_array[i].estado = null
                            this.file_data = ''
                        }
                    }else{
                        this.alert_error('Algo sucedio no se pudo insertar los datos')
                        error = false
                    }
                   
                }   
            }
                   
        },
        async eliminar_video(id){
            var error = false
            try{
                var data = await this.axios.delete(this.url+'/album/'+id)
                if(data.data.success != null){                 
                    error = false
                }else{
                    error = true
                }
            }catch(err){
                
                console.error(err);
                error = true               
                              
            }finally{
                if(error == false){
                    for(var i = 0; i < this.one_video_selected.length; i++){
                        this.one_video_selected[i].text = ''
                    }
                    this.one_video_selected[5].id = ''
                    this.one_video_selected[5].estado = false
                    this.one_video_selected[5].video = ''
                    this.alert_success('Se elimino el video');
                    this.get_list();
                }else{
                    this.alert_error('Algo sucedio no se pudo eliminar los datos')
                }
            }
        },
        estado(index){ // esta funcion verifica si el estado es false si lo es entonces se pinta de rojo el input si no lo pinta de verde
            if(this.form_array[index].estado == false){
                return this.form_array[index].text.length > 3 ? true :false
            }
        },
        alert(){
            this.$swal({
                icon: 'error',
                title: 'Oops...',
                text:  'Porfavor complete los campos marcados con rojo',
            })
        },
        alert_error(msg){
            this.$swal({
                icon: 'error',
                title: 'Oops...',
                text:  msg
            })
        },
        alert_success(msg){
            this.$swal({
                icon: 'success',
                title: 'Genial..',
                text: msg,
            })
        },
        showAlert(time) {                          
            this.$swal({ 
                title: 'Espere por favor',                 
                timer: time,
                timerProgressBar: true,
                onBeforeOpen: () => {
                    this.$swal.showLoading()             
                },                    
            })
        },
        showAlert_video(time){
            this.$swal({ 
                title: 'Cargando video',                 
                timer: time,
                timerProgressBar: true,
                onBeforeOpen: () => {
                    this.$swal.showLoading()             
                },                    
            })
        }
    },
    computed:{       
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