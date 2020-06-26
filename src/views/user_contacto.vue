<template>
  <div class="container1">    

    <div v-if="contacto_data == false" class="card-contend">
      
      <div class="user-data">       
        <b-form  @submit="post_contact">
          <b-form-group
            id="input-group-1"
            :label="form_data[0].nombre"
            label-for="input-1"                       
          >
            <b-form-input
              id="input-1"
              v-model="form_data[0].text"
              type="text"
              :state="state('0')"
              
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            :label="form_data[1].nombre"
            label-for="input-2"                       
          >
            <b-form-input
              id="input-2"   
              v-model="form_data[1].text"           
              type="text"
              :state="state('1')"               
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-3"
            :label="form_data[2].nombre"
            label-for="input-3"                       
          >
            <b-form-input
              id="input-3"
              v-model="form_data[2].text"
              type="text"
              :state="state('2')"  
               
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="input-group-4"
            label="Imagen de perfil:"
          >
          <b-form-file
            @change="ver"   
                
            placeholder="Selecione una imagen"
            :state="state('3')"     
            drop-placeholder="Archivo roto......"
          ></b-form-file>
          </b-form-group>
          
          <div class="mt-3">
            <b-button type="submit"  variant="primary">Submit</b-button>                    
            <b-button type="reset"  class="float-right" variant="danger">Reset</b-button>      
          </div>  
        </b-form>       
      </div>
      <div class="imagen">
        <img v-if="form_data[3].text == ''" :src="fondo" alt="">
        <img v-else :src="form_data[3].text" alt="">
      </div>
    </div>  
    <div v-else class="card-contend">
      <div class="user-data">    
        <h4>Actualizar formulario</h4>   
        <b-form @submit="update_contacto">
          <b-form-group
            id="input-group-1"
            :label="form_data[0].nombre"
            label-for="input-1"                       
          >
            <b-form-input
              id="input-1"
              v-model="form_data[0].text"
              type="text"
              :state="state('0')"
              
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            :label="form_data[1].nombre"
            label-for="input-2"                       
          >
            <b-form-input
              id="input-2"   
              v-model="form_data[1].text"           
              type="text"
              :state="state('1')"               
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-3"
            :label="form_data[2].nombre"
            label-for="input-3"                       
          >
            <b-form-input
              id="input-3"
              v-model="form_data[2].text"
              type="text"
              :state="state('2')"  
               
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="input-group-4"
            label="Imagen de perfil:"
          >
          <b-form-file
            @change="ver"          
            placeholder="Selecione una imagen"
            drop-placeholder="Archivo roto......"
          ></b-form-file>
          </b-form-group>
          
          <div class="mt-3">
            <b-button type="submit"  variant="primary">Submit</b-button>                    
            <b-button type="reset"  class="float-right" variant="danger">Reset</b-button>      
          </div>  
        </b-form>       
      </div>
      <div class="imagen">
        <img v-if='form_data[3].text == ""' :src="url+'/'+read_img" alt="">
        <img v-else :src="form_data[3].text" alt="">
      </div>
      
    </div>  
  </div>
</template>
<script>
var fondo = require('../assets/color.jpg')
import axios from 'axios';
import Cookies from 'js-cookie'
var data_url = require('../assets/p1.js')
export default {
  name : 'user_contacto',
  data :() => ({
    url: data_url.default.url,
    data_t: JSON.parse(Cookies.get('Tdata')),
    fondo,
    data_image: '',
    read_img: '',
    form_data: [
      { nombre: 'Nombres:', text:'', state: null },
      { nombre: 'Apeliidos:', text:'', state: null },
      { nombre: 'N° de telefono:', text:'', state: null },
      { nombre: 'Imagen de perfil:', text:'', state: null }      
    ],
    contacto_data:false
  }),
  created(){           
    this.get_contacto();
  },
  methods:{
    ver (event) { // esta funcion es para poder leer  una imagen y mostrarlo en pantalla
      var img = event.target;
      if (img.files && img.files[0]){
          this.data_image = img.files[0]
          var reader = new FileReader();
          reader.onload = (e) => {
              this.form_data[3].text =  e.target.result;            
          }                    
          reader.readAsDataURL(this.data_image)
      }               
    },
    state (possition){
      if(this.form_data[possition].state == false){
        if (possition == 2 && isNaN(this.form_data[2].text)){
          return false
        }
        return this.form_data[possition].text.length > 5 ? true :false
      }
    },
    async post_contact(e){
      e.preventDefault();
      var err = false
      for(var i = 0 ; i < this.form_data.length; i++){
        if(this.form_data[i].text == ''){
          this.form_data[i].state = false 
          this.alert("Todos los campos son obligatorios", false)
          err = true
        }
      }
      if(isNaN (this.form_data[2].text)){
        this.form_data[2].state = false 
        err = true
        this.alert("Telefono solo puede contener numeros", false)
      }
      if(err == false){
        try{
          const params_data = new FormData();
          params_data.append('nombres', this.form_data[0].text);
          params_data.append('apellidos', this.form_data[1].text);
          params_data.append('telefono', this.form_data[2].text);
          params_data.append('img_user', this.data_image);

          var data = await this.axios.post(this.url+'/contacto/'+this.data_t.Num,
          params_data,{
            headers: {
              'Authorization': this.data_t.tk
            }
          })
        }catch(erro){
          console.error(erro);
          
        }finally{
          console.log("finalizado.....")
          this.alert("Se insertaron los datos", true)
          this.get_contacto();
        }
      }else{
        console.log("no se puede insertar los datos")
      }
    },
    async get_contacto(){
      var erro = null
      try{
        var data = await this.axios.get(this.url+'/contacto/'+this.data_t.Num,{
          headers: {
            'Authorization': this.data_t.tk
          }
        })
        
        this.contacto_data = await data.data.successs
        this.form_data[0].text = await data.data.data.nombres
        this.form_data[1].text = await data.data.data.apellidos
        this.form_data[2].text = await data.data.data.telefono
        this.read_img= await data.data.data.imagen_perfil
        
        console.log(data.data, " esto es la respuesta")
      }catch(err){
        console.error(err);
        if(erro){
          erro = true
        }
      }finally{
        if(erro == false){
          console.log("termino de traer el contacto del usario")
          data = []
           this.contacto_data = true
        }else if(erro == true){
          this.contacto_data = false
        }
       
      }
    },
    async update_contacto(e){
      e.preventDefault();
      var err = false
      for(var i = 0 ; i < 3; i++){
        if(this.form_data[i].text == ''){
          this.form_data[i].state = false 
          err = true
        }
      }
      if(isNaN (this.form_data[2].text)){
        this.form_data[2].state = false 
        err = true
        this.alert("Telefono solo puede contener numeros", false)
      }
      if(err == false){
        try{
          if (this.data_image == ''){
            var dataC = {
              nombres : this.form_data[0].text,
              apellidos: this.form_data[1].text,
              telefono: this.form_data[2].text,
            }
            var data = await this.axios.put(this.url+'/contacto1/'+this.data_t.Num,
            dataC,{
              headers: {
                'Authorization': this.data_t.tk
              }
            })
            console.log(data.data.update_data)
          }else{
            const params_data = new FormData();
            params_data.append('nombres', this.form_data[0].text);
            params_data.append('apellidos', this.form_data[1].text);
            params_data.append('telefono', this.form_data[2].text);
            params_data.append('img_user', this.data_image);
            var data = await this.axios.put(this.url+'/contacto/'+this.data_t.Num,
            params_data,{
              headers: {
                'Authorization': this.data_t.tk
              }
            })
            console.log(data.data)
          }

        }catch(erro){
          console.error(erro)
        }finally{
          console.log("se termino de procezar")
          this.alert("Se actualizaron los datos", true)
        }

      }
      
    },
    alert(msg, success){
      if(success == true){
        this.$swal({
          icon: 'success',
          title: 'Genial',
          text:  msg,
        })
      }else{
        this.$swal({
          icon: 'error',
          title: 'Oops...',
          text:  msg,
        })
      }
      
    },
  }
  
}
</script>

<style scoped>
  .container1{
    
    height: 100vh ;    
    width: 100%;    
  }
  .card-contend{
    background: rgb(49, 108, 110);
    width: 800px;
    position: absolute;
    display: flex;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    border-radius: 10px;
  }
  .user-data{
    background: rgb(49, 108, 110);
    padding: 10px;
    width: 400px;
    position: relative;
    
  }
  .imagen{
    position: relative;
    width: 50%;
  }
  
  .imagen img {
    padding: 10px;
    width: 100%;
    height: 100%;
  }
  
  
</style>