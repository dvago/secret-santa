<template>
  <div id="app">
    <router-view/>
    <ss-footer/>
  </div>
</template>

<script>
import Footer from '@/components/Footer'

export default {
  name: 'App',
  components: {
    'ss-footer': Footer
  }
}
</script>
