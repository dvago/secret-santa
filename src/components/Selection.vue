<template>
  <main>
    <p v-if="gotMySanta">
      Hey you! I already gave you a Santa.
      Please be kind choosing the present for him/her!
    </p>
    <div v-else>
      <button @click="randomPick" :disabled="noListAvailable || alreadySelected">pick your santa</button>
      <p>
        {{ myPick }}
      </p>
    </div>
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
      gotMySanta: false,
      alreadySelected: false,
      noListAvailable: true,
      currentName: Firebase.auth().currentUser.email
    }
  },
  created () {
    this.currentName = this.cleanUpUserName()
    this.checkUser()
    this.gotMySanta = this.alreadySelected

    this.db.ref('users/').once('value', (snapshot) => {
      this.list = snapshot.val()
      this.noListAvailable = false
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
    checkUser () {
      if (this.$cookie.get('santaSelected') === '1') {
        this.disablePickButton()
      }
    },
    removeItemFromList (list, pick) {
      return list.filter(item => item !== pick)
    },
    randomPick () {
      let selection = this.list[this.getRandomNumber(this.list)]

      if (this.list.length <= 1) {
        return this.disablePickButton()
      }

      while (selection === this.currentName) {
        selection = this.list[this.getRandomNumber(this.list)]
      }

      this.myPick = selection
      this.list = this.removeItemFromList(this.list, this.myPick)

      this.updateDBList(this.list)
    },
    getRandomNumber (list) {
      return Math.floor(Math.random() * list.length)
    },
    disablePickButton () {
      this.alreadySelected = true
    },
    updateDBList (list) {
      return this.db.ref('users/').set(list, (err) => {
        if (!err) {
          this.$cookie.set('santaSelected', 1)
          this.disablePickButton()
        }
      })
    }
  }
}
</script>

<style lang="scss">
  @import '@/assets/style/_common.scss';

</style>
