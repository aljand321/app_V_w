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
                            v-model="form_data.title123"
                            type="text"
                            required
                            placeholder="Inserte un titutlo"
                        ></b-form-input>
                    </b-form-group>                    
                    <b-form-group id="textarea" label="Descripcion" label-for="textarea">
                       <b-form-textarea
                        id="textarea"
                        v-model="form_data.description"
                        placeholder="Inserte una descripcion del video...."
                        rows="3"
                        max-rows="6"
                        ></b-form-textarea>
                    </b-form-group>
                    <b-form-file
                    @change="ver"
                    placeholder="Choose a file or drop it here..."
                    drop-placeholder="Drop file here..."
                    ></b-form-file>
                    <div class="mt-3">Selected file: {{ data_image ? data_image.name : '' }}</div>
                    <b-button type="submit"  variant="primary">Submit</b-button>
                    
                    <b-button type="reset" variant="danger">Reset</b-button>                    
                </b-form>
            </b-col>
            <b-col cols="12" md="6" lg="6">
               <b-container fluid class="p-1 bg-dark">
                    <b-row>
                        <b-col>
                            <div v-if="file == ''">
                                <div  class="py-3 px-4">
                                    <b-img  thumbnail fluid :src="noImg" alt="Image 1"></b-img>                    
                                </div>
                                
                            </div>
                            <div  v-b-hover="hover_m" v-else-if="file.length > 0">
                                <div v-if="isHovered" class="py-3 px-4">
                                    <b-img  thumbnail fluid :src="file" alt="Image 1"></b-img>                    
                                </div>
                                <div v-else class="py-4 px-5">
                                    <b-img  thumbnail fluid :src="file" alt="Image 1"></b-img>                    
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
    var NO_image = require ('../../assets/noImage.png')
    export default {
        data:() => ({
            isHovered: false,
            file:'',
            data_image : '',
            noImg:NO_image,
            form_data:{
                
                title123:'',
                description:''
            }
        }),
        methods:{
            hover_m(data){
                //console.log(data)
                this.isHovered = data
            },
            async post_metod(e){
                e.preventDefault();                
                const params_data = new FormData();
                params_data.append('title', this.form_data.title123)
                params_data.append('description', this.form_data.description)
                params_data.append('music', this.data_image)
                try{
                    var enviar = await this.axios.post('http://localhost:3000/portada',
                    params_data,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })

                    console.log(enviar, " esto es la respuesta que queiro ver ")
                }catch (error){
                    console.log(error)
                }finally{
                    console.log('finalizo')
                }                
                
            },
            async ver (event) { // esta funcion es para poder leer  una imagen y mostrarlo en pantalla
               var img = event.target;
                if (img.files && img.files[0]){

                    this.data_image = img.files[0]

                    var reader = new FileReader();
                    reader.onload = (e) => {
                        this.file =  e.target.result;
                        
                        console.log(img.files)
                    }
                    //reader.readAsDataURL(img.files[0])
                    reader.readAsDataURL(this.data_image)
                }
               
            },

            esto(){
                console.log(this.file)
            }
        }
    }
</script>