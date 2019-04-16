<template>
  <div id="app">
    <nav-bar/>
    <galleries/>
  </div>
</template>

<script>
import NavBar from '@/layout/NavBar.vue'
import Galleries from '@/components/AppGalleries.vue'

export default {
  name: 'app',
  components: {
    NavBar, 
    Galleries
  }
}
</script>
