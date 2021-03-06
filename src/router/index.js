import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Home = ()=> import('views/home/Home')
const Projects = ()=> import('views/projects/Projects')
const BackEnd = ()=> import('views/backend/BackEnd')

const routes = [
  {
    path: '/',
    redirect:'/home'
  },{
    path: '/home',
    component: Home
  },{
    path: '/projects',
    component: Projects
  },{
    path: '/backend',
    component: BackEnd
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
