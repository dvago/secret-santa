<template>
  <main class="login">
    <section class="login_wrap">
      <h1 class="login__title">Welcome <span>to</span></h1>
      <h2 class="login__subtitle">your very own <span>Secret Santa Party</span></h2>
      <p class="login__hint">Use your provided user and password to login</p>
      <form action="" class="login__form">
        <div class="login__outline">
          <input type="text" placeholder="User" class="login__field" v-model="user">
          <input type="password" placeholder="Password" autocomplete="off" class="login__field" v-model="pwd">
          <button type="button" @click="login(user, pwd)" class="login__button">Login</button>
        </div>
      </form>
      <p class="login__error" v-if="errorMessage !== null">
        <span>!</span>
        {{ errorMessage | polishedMessage}}
      </p>
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
      user: '',
      pwd: '',
      errorMessage: null
    }
  },
  methods: {
    login (user, pwd) {
      this.email = `${user}@santa.claus`
      firebase.auth().signInWithEmailAndPassword(this.email, pwd)
        .then((user) => {
          this.$router.replace('/secret-selection')
        })
        .catch((error) => {
          this.errorMessage = error.message
        })
    }
  },
  filters: {
    polishedMessage (val) {
      if (val.indexOf('email address') > 0) {
        return 'Your user does not exist'
      }

      return val
    }
  }
}
</script>

<style lang="scss">
  @import '@/assets/style/_common.scss';

  $ticket-dot-size: 3em;
  $ticket-h: 8em;
  $ticket-m-width: 24rem;

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
      color: $white;

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
      color: $white;
      line-height: .5;

      span {
        display: block;
        line-height: 1.2;
        font-family: $font-family-sub;
        margin-top: $spacing--sm;
      }
    }

    &__form {
      background: $white;
      padding: $spacing $spacing--lg;
      border-radius: $border-radius;
      min-height: $ticket-h;
      position: relative;

      @media (min-width: $screen-md) {
        margin: 0 auto;
        max-width: $ticket-m-width;
      }

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
      background: $yellow--light;
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
      background: $tangerine;
      padding: $spacing--sm $spacing;
      border-radius: $border-radius--lg;
      color: $white;
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
    &__outline {
      padding: 0 $spacing;
      margin: 0 $spacing--sm;
      border-left: 1px dashed $tart;
      border-right: 1px dashed $tart;
    }
    &__hint {
      color: $white;
      margin: $spacing--lg 0 $spacing;
    }

    &__error {
      color: $tart;
      background: $white;
      padding: $spacing--sm $spacing;
      border-radius: $border-radius;

      span {
        font-family: $font-family-sub;
        display: inline-block;
        background: $tart;
        color: $white;
        padding: $spacing--sm;
        border-radius: $border-round;
        width: 2em;
        margin-right: $spacing--sm;
      }
    }
  }

  %dot {
    content: '';
    display: block;
    width: $ticket-dot-size;
    height: $ticket-dot-size;
    background: $tart;
    border-radius: $border-round;
  }

</style>
