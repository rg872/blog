import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import SignInUp from './views/SignInUp.vue'
import SignInUpAdmin from './views/SignInUpAdmin'
import Detail from './components/Detail'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: Home
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: About
    // }
    {
      path: '/',
      component: Home,
      children: [
        {
          path: 'detail/:article',
          name: 'detail',
          component: Detail
        }
      ]
    },
    {
      path: '/sign-user',
      name: 'sign-user',
      component: SignInUp
    },
    {
      path: '/sign-admin',
      name: 'sign-admin',
      component: SignInUpAdmin
    }
  ]
})
