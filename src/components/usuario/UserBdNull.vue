<template>
    <div :style="{ backgroundImage: 'url(' + fondo + ')' }" class="container1">
        
        
        <transition  name="show-alert" v-if="show.erro">
            <transition-group  tag="li"  >
                <b-alert v-for="(list, index) of msg_error" :key="index"  class="alert" show variant="danger">Ya se creo el rol {{list.nombre}}</b-alert> 
            </transition-group>
        </transition>     
        <transition name="slide-fade">
            <div class="contact-form" v-if="show.role">
                <h3>Creacion de roles</h3>
                <p>Estos son los relos que se va a crear</p>
                <div class="text">
                    <h3> Administrado</h3>
                </div>
                <div class="text">
                    <h3>Usuario</h3>
                </div>  
                <br>   
                <b-button @click="create_roles()" class="float-right" variant="light">Continuar</b-button>  
            
            </div>  
        </transition>
        <transition name="slide-fade">
            <div class="contact-form" v-if="show.form_user">
                <h3>Registrar Usuario administrador</h3>
                 <b-form @submit="register_user">
                        <b-form-group
                           id="input-group-1"
                           label="Usuario:"
                           label-for="input-1"                       
                         >
                           <b-form-input
                             id="input-1"
                             v-model="usuario_data[0].text"
                             type="text"
                             required
                             :state="usuario_data[0].success"
                             :placeholder="usuario_data[0].placeholder"
                           ></b-form-input>
                        </b-form-group>
                        <b-form-group
                            id="input-group-2"
                            label="Email:"
                            label-for="input-2"                        
                        >
                            <b-form-input
                              id="input-2"
                              v-model="usuario_data[1].text"
                              type="email"
                              required
                              :state="usuario_data[1].success"
                              :placeholder="usuario_data[1].placeholder"
                            ></b-form-input>
                        </b-form-group>
                        <b-form-group
                           id="input-group-3"
                           label="Contraceña:"
                           label-for="input-3"                       
                         >
                           <b-form-input
                             id="input-3"
                             v-model="usuario_data[2].text"
                             type="password"
                             :state="state()"
                             :placeholder="usuario_data[2].placeholder"
                           ></b-form-input>
                        </b-form-group>
                        <b-form-group
                           id="input-group-4"
                           label="Repita contraceña:"
                           label-for="input-4"                       
                         >
                           <b-form-input
                             id="input-4"
                             v-model="usuario_data[3].text"
                             type="password"
                             :state="state()"
                             :placeholder="usuario_data[3].placeholder"
                           ></b-form-input>
                        </b-form-group>                      

                      <b-button type="submit" variant="primary">Submit</b-button>
                      <b-button type="reset" variant="danger">Reset</b-button>
                    </b-form>

            </div>  
        </transition>
        
    </div>
</template>

<script>
var fondo = require('../../assets/color.jpg')
var data_url = require('../../assets/p1.js')
export default {
    
    name:'UserBdNull',
    data:() => ({
        url: data_url.default.url,
        show:{
            role:true,
            form_user:false,
            erro:false      
        },
        fondo:fondo,
        msg_error:[],
        usuario_data:[
            { nombre: 'user', text: "", placeholder: "Inserte un nombre de usario", success:null },
            { nombre: 'email', text: "", placeholder: "Inserte su email", success:null},
            { nombre: 'password', text: "", placeholder: "Inserte su contraceña", success:null },
            { nombre: 'password_compare', text: "", placeholder: "Repita la contraceña por favor", success:null },
        ]
    }),
    methods:{
        clickbutton(data){
            if(data == 'role'){
                this.show.role = false
                this.show.form_user = true
            }else{
                this.show.role = true
                this.show.form_user = false
            }            
        },
        async create_roles(){
            try{ 
                var data = [
                    {nombre: 'administrador'},
                    {nombre: 'usuraio'}
                ], erro = []
                for (var i = 0; i < data.length; i++){
                    var resp = await this.axios.post(this.url+'/role', data[i])                    
                    if(resp.data.success == false){
                        erro.push({position: i, error: true, nombre:data[i].nombre})
                    }
                }
            }catch(err){
                console.error(err);               
            }finally{                
                var arr = []
                for(var i = 0; i < erro.length; i++){
                    if(erro[i].error == true){
                        arr.push(erro[i]) 
                    }
                }
                /* console.log(arr.length) */
                if(arr.length > 0){
                    this.msg_error = arr  
                    this.show.erro = true 
                    this.error_finally()
                    this.clickbutton('role')                
                }else{
                    this.clickbutton('role')
                }
            }            
        },
        error_finally(){
            const selft = this            
            setTimeout( function(){ 
                selft.show.erro = false 
            }, 3000);
            
        },
        async register_user(e){
            e.preventDefault();
            var error = false
            
            for(var i = 0; i < this.usuario_data.length; i++){
                if(this.usuario_data[i].text == "" ){
                    this.usuario_data[i].success = false
                    error = true                   
                }
            }
            if(this.usuario_data[2].text != this.usuario_data[3].text){
               /*  
                this.usuario_data[2].success = false */
                this.usuario_data[3].success = false
                error = true
                console.log("no son iguales")
            }
            if(error == false){
                var params = {
                    user: this.usuario_data[0].text,
                    email: this.usuario_data[1].text,
                    password: this.usuario_data[2].text,
                    password2: this.usuario_data[3].text
                }, id_user, erro_post = false;
                try{
                    var data = await this.axios.post(this.url+'/register', params)
                    console.log(data.data)
                    id_user = data.data.data.id
                }catch(err){
                    console.error(err);  
                    if(err){
                        erro_post = true
                    }              
                }finally{
                    if (erro_post == false){
                        this.add_role_user(id_user)
                    }else{
                        console.log("no se pudo insertar los datos")
                    }
                }
            }            
        },
        async add_role_user(id){
            console.log(id, " esto es ")
            var erro = false
            try{
                var data = await this.axios.post(this.url+'/user_role',{
                    user_id: id,
                    role_id: '1'
                })
            }catch(err){
                console.error(err);
                if(err){
                    erro = true;
                }                
            }finally{
                if(erro == false){
                    console.log("El usario creado tiene el rol de administrador")
                    window.location.replace('/login')
                }else{
                    console.log("no se pudo insertar el rol")
                }
            }
        },
        state(){      
            if(this.usuario_data[3].success == false || this.usuario_data[3].text.length > 0){
                if(this.usuario_data[2].text.length > 0 && this.usuario_data[3].text.length > 0) {                    
                    if (this.usuario_data[2].text == this.usuario_data[3].text ){
                        return true
                    }else{
                        return false
                    }
                }else{
                    return false
                }
                        
            }           
        }         
    },
    computed:{  
    }
}
</script>

<style scoped>
    .container1{       
        height: 100vh; 
        background-size:cover ;
    }
    .alert{
        width: 300px;
        margin: auto;
        top: 10%;
        margin-top: 10px;
        text-align: center;
    }
    .show-alert-enter-active{
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .show-alert-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .show-alert-enter, .show-alert-leave-to {        
        opacity: 0;
    }
    /* .show-alert1-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .show-alert1-leave-to {        
        opacity: 0;
    } */
    

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

    .slide-fade-enter-active {
        /* transition: all .4s ease; */
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    /* .slide-fade-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    } */
    .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active below version 2.1.8 */ {
        
        opacity: 0;
    }
    
    
    
</style>