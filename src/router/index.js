import { createRouter, createWebHashHistory } from 'vue-router'
// import {auth} from '@/firebase'

const routes = [
  {
    path: "/",
    name: "Index",
    component: () =>
      import(/* webpackChunkName: "index" */ '../views/index.vue')
  },
  {
    path: '/register',
    name: 'Register',
    meta: {
      layout: "auth-layout",
    },
    component: () => 
      import(/* webpackChunkName: "register" */ '../views/Register.vue')
  },
  {
    path: '/login',
    name: 'LogIn',
    meta: {
      layout: "auth-layout",
    },
    component: () => 
      import(/* webpackChunkName: "login" */ '../views/LogIn.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => 
      import(/* webpackChunkName: "home" */ '../views/Home.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
