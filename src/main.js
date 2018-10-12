// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueFire from 'vuefire'
import App from './App'
import router from './router'

import Firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import config from '@/../firebase.config'

Vue.config.productionTip = false
Vue.use(VueFire)

Firebase.initializeApp(config)

let app

/* eslint-disable no-new */
Firebase.auth().onAuthStateChanged((user) => {
  if (!app) {
    new Vue({
      el: '#app',
      router,
      components: { App },
      template: '<App/>'
    })
  }
})
