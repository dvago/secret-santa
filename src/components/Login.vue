<template>
  <main class="login">
    <section class="login_wrap">
      <h1 class="login__title">Welcome <span>to</span></h1>
      <h2 class="login__subtitle">your very own <span>Secret Santa Party</span></h2>
      <p>Use your provided user and password to login</p>
      <form action="" class="login__form">
        <input type="text" placeholder="Email" class="login__field" v-model="email">
        <input type="password" placeholder="Password" autocomplete="off" class="login__field" v-model="pwd">
        <button type="button" @click="login(email, pwd)" class="login__button">Login</button>
      </form>
      <p>{{ errorMessage }}</p>
    </section>
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

  $stage-size: 100vh;
  $ticket-dot-size: 3em;
  $ticket-h: 8em;

  .login {
    min-height: $stage-size;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-content: stretch;
    align-items: center;

    &__wrap {
      order: 0;
      flex: 0 1 auto;
      align-self: auto;
    }

    &__title {
      margin: 0;
      font-family: $font-family-title;
      font-size: $font-size--lg;
      color: $tart;

      span {
        display: block;
        margin: 0;
        font-family: $font-family-sub;
        font-size: $font-size--sm * .5;
        font-weight: bold;
        color: $yellow;
      }
    }

    &__subtitle {
      margin: 0;
      font-size: $font-size--lg * .7;
      font-family: $font-family-title;
      color: $tart;
      line-height: .5;

      span {
        display: block;
        line-height: 1.2;
        font-family: $font-family-sub;
        margin-top: $spacing--sm;
      }
    }

    &__form {
      background: $tart;
      padding: $spacing $spacing--lg;
      border-radius: $border-radius;
      min-height: $ticket-h;
      position: relative;

      &::before {
        @extend %dot;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateX(-50%) translateY(-50%);
      }

      &::after {
        @extend %dot;
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateX(50%) translateY(-50%);
      }
    }

    &__field {
      padding: $spacing--sm;
      border: 0;
      display: block;
      margin: 0 0 $spacing--sm;
      width: 100%;
      border-radius: $border-radius;
      font-family: $font-family-sub;
      color: $tart;

      &::placeholder {
        color: $tart;
      }
    }

    &__button {
      background: $yellow--light;
      padding: $spacing--sm $spacing;
      border-radius: $border-radius--lg;
      color: $tart;
      border: 0;
      display: block;
      width: 100%;
      margin-top: $spacing;
      font-weight: bold;
      font-family: $font-family-sub;
      cursor: pointer;
      transition: .25s background ease-in;

      &:hover {
        background: $yellow;
        transition: .25s background ease-in;
      }
    }
  }

  %dot {
    content: '';
    display: block;
    width: $ticket-dot-size;
    height: $ticket-dot-size;
    background: $white;
    border-radius: $border-round;
  }

</style>
