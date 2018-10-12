<template>
  <main>
    <ul>
      <li v-for="(item, index) in list" :key="index">
        {{ item }}
      </li>
    </ul>
    <button @click="logout">See you at the party!</button>
  </main>
</template>

<script>
import Firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

export default {
  name: 'Selection',
  data () {
    return {
      db: Firebase.database(),
      list: null
    }
  },
  created () {
    this.db.ref('users/').once('value', (snapshot) => {
      this.list = JSON.parse(snapshot.val().replace(/'/g, '"'))
    })
  },
  methods: {
    logout () {
      Firebase.auth().signOut().then(() => {
        this.$router.replace('/login')
      })
    }
  }
}
</script>
