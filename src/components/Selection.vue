<template>
  <main>
    <ul>
      <li v-for="(item, index) in list" :key="index">
        {{ item }}
      </li>
    </ul>
    <button @click="randomPick">pick your santa</button>
    {{ myPick }}
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
      list: null,
      myPick: null
    }
  },
  created () {
    this.db.ref('users/').once('value', (snapshot) => {
      this.list = snapshot.val()
    })
  },
  methods: {
    logout () {
      Firebase.auth().signOut().then(() => {
        this.$router.replace('/login')
      })
    },
    randomPick () {
      let index
      const selection = Math.floor(Math.random() * this.list.length)

      this.myPick = this.list[selection]
      index = this.list.indexOf(this.myPick)
      this.list.splice(index, 1)

      this.db.ref('users/').set(this.list)
    }
  }
}
</script>
