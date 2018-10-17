<template>
  <main class="selection">
    <div v-if="gotMySanta" class="selection__info">
      <h2>Hey you!</h2>
      <p>I already gave you a Santa.</p>
      <p>Please be kind choosing the present for him/her!</p>
    </div>
    <div v-else class="selection__box">
      <h1 class="selection__title">Santa's name picker</h1>
      <p class="selection__intro">Click the button to randomly select your Santa</p>
      <button @click="randomPick" :disabled="noListAvailable || alreadySelected" class="selection__button">Pick me a name!</button>
      <p class="selection__pick" v-if="myPick">
        {{ myPick }}
      </p>
    </div>
    <div>
      <button @click="logout" class="selection__logout">See you at the party!</button>
    </div>
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
  $stage-size: 100vh;

  .selection {
    min-height: $stage-size;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-content: stretch;
    align-items: center;

    &__box {
      background: $yellow;
      padding: $spacing--lg;
      border-radius: $border-radius;
    }

    &__title {
      color: $white;
      font-family: $font-family-title;
      margin: 0;
    }

    &__intro {
      color: $white;
      margin: $spacing--lg 0 $spacing;
    }

    &__button {
      color: $white;
      background: $tart;
      border-radius: $border-round;
      border: 4px solid $yellow--light;
      width: 8em;
      height: 8em;
      padding: $spacing;
      font-family: $font-family-sub;

      &:disabled {
        background: $yellow--light;
        opacity: .5;
      }
    }

    &__logout {
      margin: $spacing--lg 0;
      background: $electro;
      color: $white;
      padding: $spacing--sm $spacing;
      border: 0;
      border-radius: $border-radius--lg;
    }

    &__pick {
      padding: $spacing--sm;
      border: 10px dashed $tart;
      font-family: $font-family-sub;
      font-size: $font-size--lg;
      color: $white;
      margin: $spacing 0 0;
    }

    &__info {
      color: $tart;
      line-height: 1.2;

      h2 {
        font-family: $font-family-title;
        font-size: $font-size--lg;
        margin: 0;
      }

      p:first-of-type {
        font-family: $font-family-sub;
        font-size: $font-size--md;
        margin: $spacing 0 0;
      }
    }
  }
</style>
