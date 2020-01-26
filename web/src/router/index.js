import Vue from 'vue'
import Router from 'vue-router'
import SignUp from '@/components/SignUp'
import Login from '@/components/Login'
import Profile from '@/components/Profile'
import ListMovies from '@/components/ListMovies'
import Movies from '@/components/Movies'
import beforeEach from './beforeEach'
import 'materialize-css'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
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
    },
    {
      path: '/movies',
      name: 'Movies',
      component: Movies
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp
    }
  ]
})

router.beforeEach(beforeEach)
export default router
