<template>
  <div id="app">
    <nav-bar/>
    <router-view/>
  </div>
</template>

<script>
import NavBar from '@/layout/NavBar.vue'

export default {
  name: 'app',
  components: {
    NavBar
  }
}
</script>
