<template>
    <b-container>   
    <div class="mt-5">
       
        <b-row v-if="portada_create == true">
            <b-col cols="12" md="6" lg="6">
                <b-form  @submit="post_metod">
                    <b-form-group
                        id="input-group-1"
                        label="Title"
                        label-for="input-1"                        
                    >
                        <b-form-input
                            id="input-1"
                            v-model="form_data1[0].text"
                            type="text"
                            :state="text_state1"
                            placeholder="Inserte un titutlo"
                        ></b-form-input>
                    </b-form-group>                    
                    <b-form-group id="textarea" :label="form_data1[1].name" label-for="textarea">
                       <b-form-textarea
                        id="textarea"
                         :state="text_state2"
                        v-model="form_data1[1].text"
                        placeholder="Inserte una descripcion del video...."
                        rows="3"
                        max-rows="6"
                        ></b-form-textarea>
                    </b-form-group>
                    <b-form-file
                    @change="ver"
                     :state="text_state3"
                    :placeholder="form_data1[2].name"
                    drop-placeholder="Archivo roto......"
                    ></b-form-file>
                    <div class="mt-3">
                        <b-button type="submit"  variant="primary">Submit</b-button>                    
                        <b-button type="reset"  class="float-right" variant="danger">Reset</b-button>      
                    </div>                                 
                </b-form>
            </b-col>
            <b-col cols="12" md="6" lg="6">
               <b-container fluid class="p-1 bg-dark">
                    <b-row>
                        <b-col>
                            <div v-if="form_data1[2].text == ''">
                                <div  class="py-3 px-4">
                                    <b-img  thumbnail fluid :src="noImg" alt="Image 1"></b-img>                    
                                </div>
                                
                            </div>
                            <div  v-b-hover="hover_m" v-else-if="form_data1[2].text.length > 0">
                                <div v-if="isHovered" class="py-3 px-4">
                                    <b-img  thumbnail fluid :src="form_data1[2].text" alt="Image 1"></b-img> 
                                  <!--   <vue-core-video-player :src="file"></vue-core-video-player>   -->                 
                                </div>
                                <div v-else class="py-4 px-5">
                                    <b-img  thumbnail fluid :src="form_data1[2].text" alt="Image 1"></b-img>
                                    <!-- <vue-core-video-player :src="file"></vue-core-video-player>  -->               
                                </div>
                            </div>                            
                        </b-col>
                    </b-row>
                </b-container>    
            </b-col>
        </b-row>   
         <b-row v-else>
            <b-col cols="12" md="6" lg="6">
                <b-form @submit="update_portada">
                    <b-form-group
                        id="input-group-1"
                        label="Title"
                        label-for="input-1"                        
                    >
                        <b-form-input
                            id="input-1"
                            v-model="get_one_p.title"
                            type="text"
                            :state="text_state1"
                            placeholder="Inserte un titutlo"
                        ></b-form-input>
                    </b-form-group>                    
                    <b-form-group id="textarea" :label="form_data1[1].name" label-for="textarea">
                       <b-form-textarea
                        id="textarea"
                        :state="text_state2"
                        v-model="get_one_p.description"
                        placeholder="Inserte una descripcion del video...."
                        rows="3"
                        max-rows="6"
                        ></b-form-textarea>
                    </b-form-group>
                    
                    <div class="mt-3">
                        <b-button type="submit"  variant="primary">Actualizar</b-button>                    
                        <b-button type="reset"  class="float-right" variant="danger">Reset</b-button>      
                    </div>                                 
                </b-form>
            </b-col>
            <b-col cols="12" md="6" lg="6">
               <b-container fluid class="p-1 bg-dark">
                    <b-row>
                        <b-col>                            
                            <div  v-b-hover="hover_m">
                                <div v-if="isHovered" class="py-3 px-4">
                                    <b-img  thumbnail fluid :src="url+'/'+ get_one_p.imagePath" alt="Image 1"></b-img> 
                                  <!--   <vue-core-video-player :src="file"></vue-core-video-player>   -->                 
                                </div>
                                <div v-else class="py-4 px-5">
                                    <b-img  thumbnail fluid :src="url+'/'+ get_one_p.imagePath" alt="Image 1"></b-img>
                                    <!-- <vue-core-video-player :src="file"></vue-core-video-player>  -->               
                                </div>
                            </div>                            
                        </b-col>
                    </b-row>
                </b-container>    
            </b-col>
         </b-row> 
    </div>
    </b-container>   
</template>
<script>
    import axios from 'axios';
    
    import {mapState} from 'vuex';
    import {mapMutations} from 'vuex';
    import Cookies from 'js-cookie'
    var data_url = require('../../assets/p1.js')
    var NO_image = require ('../../assets/noImage.png')
    var video = require ('../../assets/aoa.mp4')
    export default {
        name: 'post',          
        data:() => ({
            url: data_url.default.url,
            data_t: JSON.parse(Cookies.get('Tdata')),
            video: video,
            isHovered: false,
            file:'',
            data_image : '',
            noImg:NO_image,            
            form_data1:[
                {name:'title', text:'', state:null},
                {name:'Descripcion', text:'', state:null},
                {name:'Selecione imagen.......', text:'', state:null}
            ],
            id_params: '',
            get_one_p:{},
            respuesta_post:{
                success: false,
                id_respuesta:''
            }
            //ver_estado:this.portada_create
        }),
        created(){           
        },
        mounted(){            
            var num = this.$route.params.id
            if(!isNaN(num)){
                this.portada_form();
                this.id_params = num; 
                this.get_one_portada();              
            }else{
                 this.id_params = ''; 
                 this.get_one_p = {}
            }
        },
        methods:{
             ...mapMutations(['portada_c']),
            portada_form(){
                this.portada_c(false)
            },

            async get_one_portada(){
                try{
                    this.showAlert(10000*5)
                    var one_portada = await this.axios.get(this.url + '/portada/' + this.id_params,{
                        headers: {
                            'Authorization': this.data_t.tk
                        }
                    } )
                    this.get_one_p = one_portada.data.data[0]
                    console.log(this.get_one_p, " esto es  <<<<<<<<<<<<")   
                }catch(erro){
                    console.log(error)
                }finally{
                    this.showAlert(500)
                    
                }
                             
            },
            alert_update(){
                this.$swal({
                    icon: 'success',
                    text: 'Se actualizaron los datos correctamente',
                })
            },
            //actualizar datos
            async update_portada(e){
                e.preventDefault();  
                try{  
                    this.showAlert(10000*5)                  
                    var upadte = {
                        title:this.get_one_p.title,
                        description:this.get_one_p.description
                    }
                    var upadte_data = await this.axios.put(this.url + '/portada/' + this.$route.params.id,
                    {
                        headers: {
                            'Authorization': this.data_t.tk
                        }, 
                    },
                    upadte)
                    
                }catch(erro){
                    console.log(erro)
                }finally{                     
                    this.alert_update()
                    console.log(" finalizado ")
                }
            },

            hover_m(data){
                ///console.log(data)
                this.isHovered = data               
            },
            async post_metod(e){
                e.preventDefault();  
                var error = false  
                for(var i = 0; i < this.form_data1.length; i++){
                    if(this.form_data1[i].text.length == 0){
                        error = true
                        this.form_data1[i].state = false
                    }
                } 
                if (error == true){
                    this.alert()
                }else{
                    const params_data = new FormData();
                    params_data.append('title', this.form_data1[0].text)
                    params_data.append('description', this.form_data1[1].text)
                    params_data.append('music', this.data_image)
                    try{
                        this.showAlert(10000*5)
                        var enviar = await this.axios.post(this.url+'/portada/'+this.data_t.Num,
                        params_data,
                        {
                            headers: {
                                'Authorization': this.data_t.tk
                            }
                        }) 

                        if(enviar.data.success == true){
                            this.respuesta_post.id_respuesta = enviar.data.data.id
                            this.respuesta_post.success = enviar.data.success
                        }
                        console.log(enviar.data, "  xzzzzzzzzzzzzzzzz")                   
                    }catch (error){
                        console.log(error)
                    }finally{
                        this.showAlert(1000)

                        for (let index = 0; index < this.form_data1.length; index++) {                           
                            this.form_data1[index].text = ''
                            this.form_data1[index].state = null
                        }
                        if(this.respuesta_post.success == true){                 
                            this.$router.push('/add_music_video/'+this.respuesta_post.id_respuesta)
                        }else{
                            this.alert1()
                        }
                        //
                        error = false                       
                    } 
                }
   
            },            
            ver (event) { // esta funcion es para poder leer  una imagen y mostrarlo en pantalla
                var img = event.target;
                if (img.files && img.files[0]){
                    this.data_image = img.files[0]
                    var reader = new FileReader();
                    reader.onload = (e) => {
                        this.form_data1[2].text =  e.target.result;                  
                    }                    
                    reader.readAsDataURL(this.data_image)
                }               
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
            alert(){
                this.$swal({
                    icon: 'error',
                    title: 'Oops...',
                    text:  'Todos los campos son obligatorios',
                })
            },
             alert1(){
                this.$swal({
                    icon: 'error',
                    title: 'Oops...',
                    text:  'No se pudo insertar los datos',
                })
            },
        },
        computed:{
            ...mapState(['portada_create']),
            text_state1(){                
                if(this.form_data1[0].state != null){
                    return this.form_data1[0].text.length > 3 ? true :false
                }                                
            },
            text_state2(){                
                if(this.form_data1[1].state != null){
                    return this.form_data1[1].text.length > 3 ? true :false
                }                
            },
            text_state3(){                
                if(this.form_data1[2].state != null){
                    return this.form_data1[2].text.length > 1 ? true :false
                }                
            }
        }
    }
</script>