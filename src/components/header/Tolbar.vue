
<template>
  <div>

   <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">ALJAND</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item @click="is_home_boolean(true)" :to="'/'">Home</b-nav-item>
        <b-nav-item @click="is_home_boolean(false)" :to="'/lista_videos'">Videos</b-nav-item>
        <b-nav-item v-if="admin" @click="portada_form(),is_home_boolean(false)" :to="'/portada'">Portada</b-nav-item>
        <b-nav-item @click="is_home_boolean(false)" :to="'/user'">User</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form v-if="!is_home_state" @submit.stop.prevent="buscar_video">
          <b-form-input size="sm" class="mr-sm-2" v-model="search_data" placeholder="Buscar..."></b-form-input>
          <b-button  size="sm" class="my-2 my-sm-0" type="submit">Buscar</b-button>
        </b-nav-form>
        <b-nav-form v-else @submit.stop.prevent="buscar_portada">
          <b-form-input size="sm" class="mr-sm-2" v-model="search_data" placeholder="Buscar..."></b-form-input>
          <b-button  size="sm" class="my-2 my-sm-0" type="submit">Buscar</b-button>
        </b-nav-form>         
        <li class="nav-item dropdown">
          <a v-on:click="click_list" class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Mostrar mas
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <div class="list-container" v-for="(list,index) of lista_reproduccion_vuex" :key="index">
              <div class="list-title">
                <a class="dropdown-item" @click="videos_lista(list.id)" >{{list.title}} </a>
              </div>
              <div class="button-list">
                <b-button @click="after_delete(list.id)" class="float-right" variant="light" size="sm" >
                  <b-icon icon="trash" variant="danger" ></b-icon> 
                </b-button>
              </div>
             
            </div>            
            <!-- <a class="dropdown-item" href="#">Another action</a> -->           
          </div>
        </li>

        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>
            <em>User</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
    
  </div>
</template>


<script>
  import { mapState } from 'vuex';
  import { mapMutations } from 'vuex'
  import { mapActions } from 'vuex'
  import { ruta } from '../../auth'
  var data_url = require('../../assets/p1.js')
  var admin_data  = require('../../assets/adminData.js')
  export default {
    data:() => ({
      url: data_url.default.url,
      lista_reproduccion:[],
      search_data:'',
      admin: admin_data.default.access
    }),
    methods:{
      ...mapMutations(['portada_c','is_home_boolean']),
      ...mapActions(['get_list_reproduccion_vuex','video_search','portada_search','delete_lista_reproduccion']),
      buscar_video(){
        this.video_search(this.search_data)
        //this.$router.push('/resultado')
        const path = `/resultado`
        if (this.$route.path !== path) this.$router.push(path)
      },
      buscar_portada(){
        this.portada_search(this.search_data);
        const path = '/'
        if (this.$route.path !== path) this.$router.push(path)
      },
      delete_lista(id_lista){
        this.delete_lista_reproduccion(id_lista);
        this.$swal('Eliminado', 'Se elimino', 'success')
      },
      click_list(){
        this.get_list_reproduccion_vuex();
      },
      portada_form(){
        this.portada_c(true)
      },
      after_delete(id_video){
        this.$swal({
        title: '¿Seguro que quieres elminar la lista de reproduccion?',
        text: 'No se puede revertir esta accion',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar',
        cancelButtonText: 'No, cancelar',
        showCloseButton: true,
        showLoaderOnConfirm: true
        }).then((result) => {
          if(result.value) {
              /* this.$swal('Deleted', 'You successfully deleted this file', 'success') */
            this.delete_lista(id_video)
          } else {
              this.$swal('Cancelado', 'El video no se elimino de la lista', 'info')
          }
        })
      },
      videos_lista(id){
        ruta('/Videos_listaR/'+id)
        window.location.replace('/Videos_listaR/'+id)
      }
    },
    computed:{
      ...mapState(['lista_reproduccion_vuex', 'is_home_state']),
    }
  }

</script>

<style  scoped>
  .list-container{
    display: flex;         
    position: relative;
  }
  .list-title{    
    width: 80%;
  }
  .button-list{
    padding-right: 5px;
  }

</style>