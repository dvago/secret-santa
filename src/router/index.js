import Vue from 'vue'
import Router from 'vue-router'
import VueCookie from 'vue-cookie'

import firebase from 'firebase/app'
import 'firebase/auth'

import Login from '@/components/Login'
import Selection from '@/components/Selection'
import NotFound from '@/components/NotFound'

Vue.use(Router)
Vue.use(VueCookie)

const router = new Router({
  base: '/secret-santa/',
  mode: 'history',
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
      path: '*',
      name: 'NotFound',
      component: NotFound
    },
    {
      path: '/secret-selection',
      name: 'Selection',
      component: Selection,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const currenUser = firebase.auth().currentUser
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currenUser) {
    next('/login')
  } else if (!requiresAuth && currenUser) {
    next('/secret-selection')
  } else {
    next()
  }
})

export default router
