<template>
  <footer>
    <p>(c) Davide Vago 2018</p>
  </footer>
</template>

<style lang="scss">
  @import '@/assets/style/_common.scss';

  footer {
    padding: $spacing;
    height: 3rem;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;

    p {
      color: $white;
      text-align: center;
      margin: 0;
      font-size: $font-size--sm;
    }
  }
</style>
