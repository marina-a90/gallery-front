<template>
    <div class="mt-3 mb-3">
        <form @input="onSearch">
            <input type="search" placeholder="Search" v-model="searchInput">
            <button type="submit">Search</button>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                searchInput: ''
            }
        },
        methods: {
            onSearch() {
                this.$emit('search', this.searchInput)
            }
        }
    }
</script>