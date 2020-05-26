import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
var url = require('../assets/p1.js')
export default new Vuex.Store({
  state: {
    portada_create:true,
    oneVideo:{ // estos datos son llenados en el componete listMusic
      id:'',
      album:'',
      nombre:'',
      artista:'',
      anio:'',
      genero:'',
      videoPath:'',
      estado:false
      
    },
    //esto es la lista de reproduccion
    lista_reproduccion_vuex:[],
    search_result:[],
    //esto es para el buscador  si es true buscara las portadas si es false buscara los videos
    is_home_state: true,
    // aqui se almacenara la busqueda de portada
    search_result_portada:[]
  },
  mutations: {
    portada_c(state, data){
      state.portada_create = data
    },
    video_one(state, data){
      //console.log(data, " este es el data de store <<<<<<<<<<<<")
      state.oneVideo.id = data.id
      state.oneVideo.album = data.album
      state.oneVideo.nombre = data.nombre
      state.oneVideo.artista = data.artista
      state.oneVideo.anio = data.anio
      state.oneVideo.genero = data.genero
      state.oneVideo.videoPath = data.video_data
      state.oneVideo.estado = data.estado
    },
    llenar_lista_reproducion(state, data_list){
      state.lista_reproduccion_vuex = data_list
    },
    inserte_video_serach(state, result){
      state.search_result = result
    },
    is_home_boolean(state, data){
      state.is_home_state = data
      state.search_result_portada = []
    },
    //funcion para añadir el resultado de la buscqueda de portada
    insert_result_search_portada(state, data){
      state.search_result_portada = data
    }
    
  },
  actions: {
    get_list_reproduccion_vuex: async function({commit}){
      const data = await fetch(url.default.url+'/lista_reproduccion')
      const get_data = await data.json();
      commit('llenar_lista_reproducion', get_data.data)
    },
    video_search: async function({commit},params ){
      const data = await fetch(url.default.url+'/buscador?nombre='+params)
      const resultado = await data.json()
      commit('inserte_video_serach', resultado)
    
    },
    portada_search: async function({commit},params){
      const data = await fetch(url.default.url+'/buscar_portada?title='+params)
      const res = await data.json()
      commit('insert_result_search_portada', res)
    }
  },  
  
  modules: {
  }
})
