import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
   
    component: () => import('../views/About.vue')
  },
  {
    path: '/portada',
    name: 'Portada',
   
    component: () => import( '../views/Portada.vue')
  },
  {
    path: '/portada/:id',
    name: 'Portada1',
    component: () => import( '../views/Portada.vue')
  },
  {
    path: '/add_music_video/:id',
    name: 'add_video',
    component: () => import( '../views/Video.vue')
  },
  {
    path: '/Video_album/:id',
    name: 'Video_album',
    component: () => import( '../views/VerAlbum.vue')
  },
  {
    path: '/lista_videos',
    name : 'Video_all',
    component: () => import( '../views/VideoAll.vue')
  },
  {
    path: '/ver_video/:id',
    name : 'Ver',
    component: () => import( '../views/Reproductor.vue')
  },
  {
    path: '/Videos_listaR/:id',
    name : 'ListaRvideos',
    component: () => import( '../views/ListaVideos.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
