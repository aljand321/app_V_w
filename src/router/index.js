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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
