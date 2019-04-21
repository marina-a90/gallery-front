<template>
    <div class="container">
        <h1 class="mb-3">All Galleries</h1>
        <!-- searchInput : {{ searchInput }} -->
        <div v-if="galleries.length">

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
            <p>There are currently no galleries. Be the first to make one!</p>
        </div>
    </div>
</template>

<script>
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
            last_page: null
        }
    },

    methods: {
        onSearchInput (searchInput) {
            console.log('search')
            this.page = 1
            this.searchInput = searchInput
            galleriesService.getAll(this.page, this.searchInput)
                .then(galleries => {
                    this.galleries = galleries.data
                    this.last_page = galleries.last_page
                }
            )
        },

        loadMoreGalleries () {
            console.log('load more')
            this.currentPage++
            galleriesService.getAll(this.currentPage, this.searchInput)
                .then(galleries => {     
                    this.galleries.push(...galleries.data)
                    this.last_page = galleries.last_page
                }
            )
        }
    },

    beforeRouteEnter (to, from, next) {
        galleriesService.getAll()
            .then(galleries => next( vm => {
                console.log(vm)
                vm.galleries = galleries.data
                console.log(galleries.data)
                vm.last_page = galleries.last_page
                console.log(galleries.last_page)
                }
            )
        );
    }, 

    // async created() {
    //     try {
    //         const response = await galleriesService.getAll()
    //         console.log(response.data)
    //         this.galleries = response.data;
    //         console.log(this.galleries.data)
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
}
</script>