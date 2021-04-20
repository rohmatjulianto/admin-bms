import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Hotel from '../views/Hotel.vue';
import Destination from '../views/Destination.vue';
import Desa from '../views/Desa.vue';
import Art from '../views/Art.vue';
import Culinary from '../views/Culinary.vue';
import Culture from '../views/Culture.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/destination',
    name: 'Tourist Destination',
    component: Destination
  },
  {
    path: '/hotel',
    name: 'Accomodation',
    component: Hotel
  },
  {
    path: '/desa',
    name: 'Tourism Village',
    component: Desa
  },
  {
    path: '/art',
    name: 'Art',
    component: Art
  },
  {
    path: '/culinary',
    name: 'Culinary',
    component: Culinary
  },
  {
    path: '/culture',
    name: 'Culture',
    component: Culture
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
