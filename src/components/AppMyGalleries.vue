<template>
    <div class="container">

        <h1 class="mb-3">My Galleries</h1>
        <!-- <h3>galleries from user {{ getUserID }}</h3> -->

        <!-- searchInput : {{ searchInput }} -->
        
        <div v-if="galleries.length">

                <form @submit.prevent="onSearchInput(searchInput)">
                    <input placeholder="Search" v-model="searchInput">
                    <button type="submit">Search</button>
                </form>

                <ul>
                    <li v-for="gallery in galleries" :key="gallery.index">
                        <!-- <div>gallery user id {{ gallery.user_id }}</div> -->
                            <h4>
                                <router-link :to="{ name: 'single-gallery', params: { id: gallery.id }}">
                                    {{ gallery.title }}
                                </router-link>
                            </h4>
                            <div>
                                <b>Creted by: </b>
                                <router-link :to="{ name: 'user-galleries', params: { id: gallery.user_id }}">
                                    {{ gallery.user.first_name }} {{ gallery.user.last_name }}
                                </router-link>
                            </div>
                            <div><b>Creted at: </b>{{ gallery.created_at }}</div>
                            <img :src="gallery.images[0] ? gallery.images[0].imageURL : ''"> 
                    </li>
                </ul>


                <paginator v-if="page !== last_page" @loadMore="loadMoreGalleries"/>

            
        </div>
        <div v-else class="alert alert-primary">
            <p>You haven't created any galleries yet. Make one now!</p>
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
            id: null,
            galleries: [],
            searchInput: '',
            page: 1,
            last_page: null
        }
    },

    methods: {
        ...mapActions(['fetchUserID', 'fetchMyGalleries']), 

        onSearchInput (searchInput) {
            console.log('search')
            this.page = 1
            this.searchInput = searchInput
            galleriesService.getMyGalleries(localStorage.getItem('user_id'), this.page, this.searchInput)
                .then(galleries => {
                    // this.id = localStorage.getItem('user_id')
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
            vm.id = localStorage.getItem('user_id')
            console.log(vm.id)
            galleriesService.getMyGalleries(vm.id, vm.page, vm.term)
                .then(galleries => {
                    vm.galleries = galleries.data
                    vm.last_page = galleries.last_page
                })
        })
    },

    computed: {
        ...mapGetters(['getUserID', 
        // 'galleries'
        ]), 

        filteredGalleriesbyUserID () {
            let filtered = this.galleries.filter(g => g.user_id === 1);
            return filtered;
        } 
    }
}
</script>