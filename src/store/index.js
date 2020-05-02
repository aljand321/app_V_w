import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    portada_create:true
  },
  mutations: {
    portada_c(state, data){
      state.portada_create = data
    }
  },
  actions: {
  },
  modules: {
  }
})
