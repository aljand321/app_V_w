import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

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
    }
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
    
  },
  actions: {
  },
  modules: {
  }
})
