<template>
    <div :style="{ backgroundImage: 'url(' + fondo + ')' }" class="container1">
        <!-- https://codingpotions.com/vue-login -->
      <div v-if="form_register" class="contact-form">
        <h3>Login</h3>
        <b-form @submit="login">
          <b-form-group
              id="input-group-5"
              label="Usuario:"
              label-for="input-5"                       
            >
              <b-form-input
                id="input-5"
                v-model="data_login.user"
                type="text"
                required
                 
              ></b-form-input>
          </b-form-group>
           
          <b-form-group
             id="input-group-6"
             label="Contraceña:"
             label-for="input-6"                       
           >
             <b-form-input
               id="input-6"
               v-model="data_login.password"
               type="password"
               required
             ></b-form-input>
          </b-form-group>
                               
          <b-button type="submit" variant="primary">Submit</b-button>
          <!--  <b-button type="reset" variant="danger">Reset</b-button> -->
          <hr>
          <a @click="form_register = !form_register">Registrar Usuario</a>

        </b-form>

      </div>  
      <div v-else class="contact-form">
        <h3>Registrar usuario</h3>
        <b-form @submit="create_user">
          <b-form-group
              id="input-group-1"
              :label="usuario_data[0].nombre"
              label-for="input-1" 
              :description="usuario_data[0].msg"                      
            >
              <b-form-input
                id="input-1"
                v-model="usuario_data[0].text"
                type="text"
                :placeholder="usuario_data[0].placeholder"
                :state="usuario_data[0].state"
                
                 
              ></b-form-input>
          </b-form-group>

          <b-form-group
              id="input-group-2"
              :label="usuario_data[1].nombre"
              label-for="input-2"  
              :description="usuario_data[1].msg"                            
            >
              <b-form-input
                id="input-2"
                v-model="usuario_data[1].text"
                type="email"
                :placeholder="usuario_data[1].placeholder"
                :state="usuario_data[1].state"
                 
              ></b-form-input>
          </b-form-group>
           
          <b-form-group
             id="input-group-3"
             :label="usuario_data[2].nombre"
             label-for="input-3" 
             :description="usuario_data[2].msg"                             
           >
             <b-form-input
               id="input-3"
               v-model="usuario_data[2].text"
               type="password"
               :placeholder="usuario_data[2].placeholder"
               :state="usuario_data[2].state"
               
             ></b-form-input>
          </b-form-group>

          <b-form-group
             id="input-group-4"
             :label="usuario_data[3].nombre"
             label-for="input-4" 
             :description="usuario_data[3].msg"    
                                      
           >
             <b-form-input
               id="input-4"
               v-model="usuario_data[3].text"
               type="password"
               :placeholder="usuario_data[3].placeholder"
               :state="usuario_data[3].state"
               
             ></b-form-input>
          </b-form-group>
                               
          <b-button type="submit" variant="primary">Submit</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
          <hr>
          <a @click="form_register = !form_register">Iniciar secion</a>

        </b-form>

      </div>  
    </div>
</template>
<script>
var fondo = require('../assets/color.jpg')
var data_url = require('../assets/p1.js')
import Cookies from 'js-cookie'

import { login } from '../auth'
var auth = require ('../auth');
export default {
    data:() => ({
        url: data_url.default.url,
        fondo: fondo,
        data_login:{
          user:'',
          password:''
        },
        usuario_data:[
          { nombre: 'Usuario', text: "", placeholder: "Inserte un nombre de usario", state:null,msg:"" },
          { nombre: 'email', text: "", placeholder: "Inserte su email", state:null,msg:""},
          { nombre: 'Contraceña', text: "", placeholder: "Inserte su contraceña", state:null,msg:"" },
          { nombre: 'Repita su contraceña por favor', text: "", placeholder: "Repita la contraceña por favor", state:null,msg:"" },
        ],
        form_register : true
    }),
    created(){
      console.log(name)
    },
    methods:{
      async login(e){
        e.preventDefault();
        var err = false
        if (!this.data_login.user || !this.data_login.password){
          console.log("inserte login o usario")
        }else{
          try {
            var data = await this.axios.post(this.url+'/login', this.data_login)    
            //console.log(data.data.data.id, " esto es la respuesta del login <<<<<<<<<<<<<") 
          } catch (error) {
            console.error(error)
            if(error){
              err = true
            }
          }finally{
            if(err == false){
              login(data.data.token,data.data.data.id);
            }
          }
        }        
      },
      estado(p){
        if(this.usuario_data[p].state == false){
          this.usuario_data[p].state = this.usuario_data[p].text.length > 4 ? true : false
          this.usuario_data[p].msg = this.usuario_data[p].text.length > 4 ? '' : 'Minimo 4 caracteres'
        }           
      },
      async create_user(e){
        e.preventDefault();
        var error = false
        for (var i = 0; i < this.usuario_data.length; i++){
          if (this.usuario_data[i].text == '' || this.usuario_data[i].text.length < 4){
            if(this.usuario_data[i].text == ''){
              this.usuario_data[i].state = false
              this.usuario_data[i].msg = "Este campo es obligatorio"
              error = true
            }else if(this.usuario_data[i].text.length < 4){
              this.usuario_data[i].state = false
              this.estado(i)
              error = true
            }
            this.alert('Todos los campos marcados con rojo son obligatorios', false)
          }else{
            this.estado(i)
          }
        }
        if (this.usuario_data[2].text != this.usuario_data[3].text){
          this.usuario_data[2].state = false
          this.usuario_data[3].state = false
          this.alert('las contraceñas no coinciden', false)
          error = true
        }
        
        if(error == false){
          try{ 
            var params = {
              user: this.usuario_data[0].text,
              email: this.usuario_data[1].text,
              password: this.usuario_data[2].text,
              password2: this.usuario_data[3].text
            }
            var data = await this.axios.post(this.url+'/register', params)          
            
          }catch(erro){
            console.error(erro);
          }finally{
            if(data.data.success == false ){
              this.alert(data.data.msg, false)
            }else if (data.data.success == true ){
              this.alert(data.data.msg, true)
              this.role_user(data.data.data.id)
            }            
          }
        }     
      },
      async role_user(id_user){
        console.log(id_user)
        try {
          var data = await this.axios.post(this.url+'/user_role',{
            user_id : id_user,
            role_id : '2'
          }) 
          console.log(data, " esto es la respuesta ")
        } catch (error) {
          console.error(error);          
        }finally{
          console.log(" Se creo rol de usuario ")
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
    height: 100vh; 
    background-size:cover ;
}
.contact-form{        
        width: 85%;
        max-width: 600px;
        background: rgb(255, 255, 255);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        padding: 15px;
        box-sizing: border-box;
        border-radius: 8px;
        
    }
    [boder]{
        border: 1px solid rgb(192, 0, 0);
    }
    .text{
        background: rgb(255, 255, 255);
        
        width: 200px;
        padding: 10px;
        border: 1px solid rgb(146, 145, 145);
        border-radius: 8px;
        text-align: center;
        margin: auto;
        margin-top: 10px;
    }
</style>