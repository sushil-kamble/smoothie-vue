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
    path: '/profile/:user_id',
    name: 'Profile',
    component: () => import('../components/Profile.vue')
  },
  {
    path: '/add-smoothie',
    name: 'AddSmoothie',
    component: () => import('../views/AddSmoothie.vue')
  },
  {
    path: '/edit-smoothie/:smoothie_slug',
    name: 'EditSmoothie',
    component: () => import('../views/EditSmoothie.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
