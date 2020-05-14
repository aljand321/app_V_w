
<template>
  <div>

   <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">ALJAND</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item :to="'/'">Home</b-nav-item>
        <b-nav-item :to="'/lista_videos'">Videos</b-nav-item>
        <b-nav-item  @click="portada_form" :to="'/portada'">Portada</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>        
        <li class="nav-item dropdown">
          <a v-on:click="click_list" class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Mostrar mas
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" v-for="(list,index) of lista_reproduccion_vuex" :key="index" :href="'/Videos_listaR/'+list.id" >{{list.title}}</a>
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
  var data_url = require('../../assets/p1.js')
  export default {
    data:() => ({
      url: data_url.default.url,
      lista_reproduccion:[],
    }),
    methods:{
      ...mapMutations(['portada_c']),
      ...mapActions(['get_list_reproduccion_vuex']),
      click_list(){
        this.get_list_reproduccion_vuex();
      },
      portada_form(){
        this.portada_c(true)
      }
    },
    computed:{
      ...mapState(['lista_reproduccion_vuex']),
    }
  }

</script>
