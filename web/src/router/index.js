import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Profile from '@/components/Profile'
import ListMovies from '@/components/ListMovies'
import 'materialize-css'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/profiles',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/list-movies',
      name: 'ListMovies',
      component: ListMovies
    }
  ]
})