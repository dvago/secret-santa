<template>
  <main>
    <h1>Welcome!</h1>
    <p>Use your provided user and password to login</p>
    <form action="" autocomplete="off">
      <input type="text" placeholder="Email" v-model="email">
      <input type="text" placeholder="Password" v-model="pwd">
      <button type="button" @click="login(email, pwd)">Login</button>
    </form>
    <p>{{ errorMessage }}</p>
  </main>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      pwd: '',
      errorMessage: null
    }
  },
  methods: {
    login (email, pwd) {
      firebase.auth().signInWithEmailAndPassword(email, pwd)
        .then((user) => {
          this.$router.replace('/secret-selection')
        })
        .catch((error) => {
          this.errorMessage = error.message
        })
    }
  }
}
</script>

<style lang="scss">
  @import '@/assets/style/_common.scss';

</style>
