<template>
    <div style="width:100%; height: 100%; overflow-y: scroll;" class="container-2">
       <b-row>
           <b-col cols="12" md="8" lg="8">
               <div class="video-container">                   
                    <video  controls autoplay v-if="video != {}" style="width:100%" :src="url+'/'+video.videoPath" @ended="video_end($event,video.id)"></video>
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
                    </div>
                    <div  style="overflow-y: scroll;" class="list-card">
                        <div  v-for="(list,index) of list_video" :key="index" :borderColor="css(index)" class="card mb-3" style="width: 100%;" 
                            @click="video_click(index)" >
                            <div class="row no-gutters">
                                <div cols="4">                                    
                                    <video style="width:100px; height: 100%;" :src="url+'/'+list.videoPath"></video>
                                </div>
                                <div cols="8">
                                    <div class="card-body">
                                        <h6 lass="card-title" style="font-size: 100%">{{list.artista}} - {{list.nombre}}</h6>
                                        <p class="card-text"><small style="font-size: 100%" class="text-muted">{{list.album}}</small></p>
                                    </div>
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
    <button @click="check(1)" >ver {{id_video}}</button>
    <b-modal
      id="modal-center"
      centered
      ref="modal"
      title="Submit Your Name"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          :state="nameState"
          label="Name"
          label-for="name-input"
          invalid-feedback="Name is required"
        >
          <b-form-input
            id="name-input"
            v-model="name"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
    </div>
</template>

<script>
var video = require('../assets/aoa.mp4')
var data_url = require('../assets/p1.js')
//https://bootstrap-vue.org/docs/components/modal#modals
export default {
    data:() => ({
        video1:video,
        video:{},
        url:data_url.default.url,
        id_video:'',
        list_video:[],

        name:'',
        nameState: null,
        list_reproduccion: [],
        video_lista_data:[]
    }),
    created(){
        this.id_video = this.$route.params.id;
        this.one_video();
        this.get_list_video();
        this.get_list_reproduccion();        
    },
    mounted(){
        this.get_video_lista();
    },
    methods:{
        async one_video(){
            try{
                var video_one = await this.axios.get(this.url+'/album/'+this.id_video)
                this.video = video_one.data[0]
            }catch(err){
                console.error(err)
            }finally{
            
            }
        },
        async get_list_video(){
            try{
                var list = await this.axios.get(this.url+'/album')
                this.list_video = list.data
            }catch(err){
                console.error(err);
                
            }finally{
                //console.log('se trajo todos los archivos')
            }
        },
        video_click(position){
            for(var i =0 ; i < this.list_video.length; i++){
                if (i == position){
                    this.video = this.list_video[i]
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
                    }else{
                        this.video = this.list_video[0]
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
            if (!this.checkFormValidity()) {
                return
            }
            // Push the name to submitted names
            var error = false
            var datas= { title:this.name }
            try{
                var data = await this.axios.post(this.url+'/lista_reproduccion',datas)
                
            }catch(erro){
                console.error(erro);
                error = true
                
            }finally{
                if(error == false){
                    this.get_list_reproduccion()            
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
                var list = await this.axios.get(this.url+'/lista_reproduccion')
                this.list_reproduccion = list.data.data
                
            }catch(erro){
                console.error(erro);                
            }finally{
               
            }
        },
        //add video a la lista de reproduccion
        async video_add_lista(event, id_listaR, position){
            if(event == true){
                var error = false
                var datas = {
                    id_album:this.id_video,
                    id_lista:id_listaR
                }
                try{
                    var data = await this.axios.post(this.url+'/video_lista',datas)
                    var video_lista = await this.axios.get(this.url+'/video_lista')
                    this.video_lista_data = video_lista.data
                }catch(erro){
                    console.error(erro);
                    
                }finally{
                    console .log("finalizao");
                    this.list_reproduccion[position].data = true
                }
            }else{
                var id_video_in_lista
                for(var i = 0; i < this.video_lista_data.length; i++){
                    if(this.video_lista_data[i].id_lista == id_listaR && this.video_lista_data[i].id_video == this.id_video){
                        id_video_in_lista = this.video_lista_data[i].id
                    }
                }
                try{                    
                    var eliminar = await this.axios.delete(this.url+'/video_lista/'+id_video_in_lista)
                    var video_lista = await this.axios.get(this.url+'/video_lista')
                    this.video_lista_data = video_lista.data
                }catch(err){
                    console.error();                    
                }finally{
                    this.list_reproduccion[position].data = false
                } 
            } 
           
        },
        async get_video_lista(){   
            this.get_list_reproduccion();
            try{
                var video_lista = await this.axios.get(this.url+'/video_lista')
                this.video_lista_data = video_lista.data
            }catch(erro){
                console.error(erro);
            }finally{
                for(var i = 0; i < video_lista.data.length; i++ ){
                    if(video_lista.data[i].id_video == this.id_video  ){                     
                        this.check(video_lista.data[i].id_lista)
                    }
                }
            }                  
        },
        check(id_lista){
            for(var i = 0; i < this.list_reproduccion.length; i++){
                if(this.list_reproduccion[i].id == id_lista){
                    this.list_reproduccion[i].data = true
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
    [borderColor]{
        background: rgb(196, 196, 196);
        border-left-color: red;
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

</style>