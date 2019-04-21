<template>
    <div class="container">

        <!-- searchInput : {{ searchInput }} -->
        <div v-if="galleries.length">
            <h1 class="mb-3">
                Galleries by: {{ galleries[0].user ? 
                galleries[0].user.first_name + ' ' + 
                galleries[0].user.last_name : '' }}
            </h1>

            <form @submit.prevent="onSearchInput(searchInput)">
                <input placeholder="Search" v-model="searchInput">
                <button type="submit">Search</button>
            </form>

            <ul>
                <li v-for="gallery in galleries" :key="gallery.index">
                    <h4>
                        <router-link :to="{ name: 'single-gallery', params: { id: gallery.id }}">
                            {{ gallery.title }}
                        </router-link>
                    </h4>
                    <div><b>Creted by: </b>{{ gallery.user.first_name }} {{ gallery.user.last_name }}</div>
                    <div><b>Creted at: </b>{{ gallery.created_at }}</div>
                    <img :src="gallery.images[0] ? gallery.images[0].imageURL : ''"> 
                </li>
            </ul>

            <paginator v-if="page !== last_page" @loadMore="loadMoreGalleries"/>

        </div>
        <div v-else class="alert alert-primary">
            <p>There are currently no galleries made by this user.</p>
        </div>
    </div>
</template>

<script>
import { store } from '@/store/store'
import { mapActions, mapGetters } from 'vuex'
import { galleriesService } from '@/services/Galleries'
import Paginator from '@/layout/Paginator'

export default {
    components: {
        Paginator
    },

    data() {
        return {
            galleries: [],
            searchInput: '',
            page: 1,
            last_page: null, 
            id: null
        }
    },

    methods: {
        ...mapActions(['fetchUserID']),

        onSearchInput (searchInput) {
            console.log('search')
            this.page = 1
            this.searchInput = searchInput
            galleriesService.getMyGalleries(this.id, this.page, this.searchInput)
                .then(galleries => {
                    this.galleries = galleries.data
                    this.last_page = galleries.last_page
                }
            )
        },

        loadMoreGalleries () {
            console.log('load more')
            this.currentPage++
            galleriesService.getMyGalleries(this.id, this.currentPage, this.searchInput)
                .then(galleries => {     
                    this.galleries.push(...galleries.data)
                    this.last_page = galleries.last_page
                }
            )
        }
    },

    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.id = Number(to.params.id)
            console.log('pre funkc id')
            console.log(vm.id)
            galleriesService.getUserGalleries(vm.id, vm.page, vm.searchInput)
                .then(galleries => {
                    vm.id = Number(to.params.id)
                    console.log(vm.id)
                    console.log(galleries)
                    vm.galleries = galleries.data
                    console.log(galleries.data)
                    vm.last_page = galleries.last_page
                    console.log(galleries.last_page)
                })
        })
    },
}
</script>