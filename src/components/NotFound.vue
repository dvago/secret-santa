<template>
  <main class="notfound">
    <h1 class="notfound__title">Yay! this page doesn't exist</h1>
    <router-link :to="{ path: '/login' }">Go to the login page</router-link>
  </main>
</template>

<style lang="scss">
  @import '@/assets/style/_common.scss';

  .notfound {
    min-height: $stage-size;

    &__title {
      color: $tart;
      font-family: $font-family-sub;
    }
  }

</style>
