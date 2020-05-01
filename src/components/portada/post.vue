<template>
    <div class="mt-5">
       
        <b-row>
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
                    
                        <b-button type="reset" variant="danger">Reset</b-button>      
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
    </div>
</template>
<script>
    import axios from 'axios';
    import VueCoreVideoPlayer from 'vue-core-video-player';
   
    var NO_image = require ('../../assets/noImage.png')
    var video = require ('../../assets/aoa.mp4')
    export default {
        name: 'post',
        components:{            
        },        
        data:() => ({
            video: video,
            isHovered: false,
            file:'',
            data_image : '',
            noImg:NO_image,
            form_data:{                
                title123:'',
                description:'',
                title_statate: null,
                description_statate: null
            },
            form_data1:[
                {name:'title', text:'', state:null},
                {name:'Descripcion', text:'', state:null},
                {name:'Selecione imagen.......', text:'', state:null}

            ]
        }),
        methods:{
            hover_m(data){
                //console.log(data)
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
                        var enviar = await this.axios.post('http://localhost:3000/portada',
                        params_data,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        })
                        console.log (enviar)

                        console.log(enviar, " esto es la respuesta que queiro ver ")
                    }catch (error){
                        console.log(error)
                    }finally{
                        this.showAlert(1000)
                        for (let index = 0; index < this.form_data1.length; index++) {                           
                            this.form_data1[index].text = ''
                            this.form_data1[index].state = null
                        }
                       
                        error = false
                        console.log('finalizo')
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
                        
                        console.log(img.files)
                    }
                    //reader.readAsDataURL(img.files[0])
                    reader.readAsDataURL(this.data_image)
                }
               
            },

           showAlert(time) {
                // Use sweetalert2
               // this.$swal('Hello Vue world!!!');               
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
            }
        },
        computed:{
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