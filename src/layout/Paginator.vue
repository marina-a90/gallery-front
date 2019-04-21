<template>
  <div>
      <button @click="loadMore">Load More (10)</button>
  </div>
</template>

<script>
    export default {
        methods: {
            loadMore () {
                this.$emit('loadMore')
            }
        }
    }
</script>