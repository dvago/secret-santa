<template>
  <main>
    My current user: {{ currentName }}
    <ul>
      <li v-for="(item, index) in list" :key="index">
        {{ item }}
      </li>
    </ul>
    <button @click="randomPick" :disabled="list.length <= 0 || alreadySelected">pick your santa</button>
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
      myPick: null,
      alreadySelected: false,
      currentName: Firebase.auth().currentUser.email
    }
  },
  created () {
    this.currentName = this.cleanUpUserName()
    this.db.ref('users/').once('value', (snapshot) => {
      this.list = this.removeCurrentUserFromList(snapshot.val())
    })
  },
  methods: {
    logout () {
      Firebase.auth().signOut().then(() => {
        this.$router.replace('/login')
      })
    },
    cleanUpUserName () {
      return this.currentName.slice(0, this.currentName.indexOf('@')).toLowerCase()
    },
    removeCurrentUserFromList (list) {
      return list.filter(item => item !== this.currentName)
    },
    randomPick () {
      const selection = Math.floor(Math.random() * this.list.length)

      this.myPick = this.list[selection]
      this.list = this.list.filter(item => item !== this.myPick)
      this.db.ref('users/').set(this.list)
      this.disablePickButton()
    },
    disablePickButton () {
      this.alreadySelected = true
    }
  }
}
</script>

<style lang="scss">
  @import '@/assets/style/_common.scss';

</style>
