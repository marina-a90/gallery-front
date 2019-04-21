<template>
    <div class="container">
        <h1 class="mb-3">{{ gallery.title }}</h1>
        <div>
            <b>Creted by: </b>
            <router-link :to="{ name: 'user-galleries', params: { id: gallery.user_id }}">
                {{ gallery.user ? gallery.user.first_name + ' ' + gallery.user.last_name : '' }}
            </router-link>
        </div>
        <div class="mb-3"><i>Created at: {{ gallery.created_at }}</i></div>
        <div v-if="gallery.description">{{ gallery.description }}</div>
        <div v-for="image in gallery.images" :key="image.id">
            <a href="image.imageURL" target="blank"> 
                <!-- doraditi -->
                <img :src="image.imageURL" alt="image">
            </a>
        </div>

        <div class="comments container mt-3">
            <h4 class="mt-3 mb-3">Comments:</h4>
            <ul>
                <li v-for="comment in gallery.comments" :key="comment.id">
                    <div><b>Created by: {{ comment.user.first_name }} {{ comment.user.last_name }} at {{ comment.created_at }}</b></div>
                    <p>{{ comment.description }}</p>
                </li>
            </ul>
        </div>
        <div v-if="!gallery.comments.length">There are no comments for this post yet. Be the first to make one.</div>

        <button v-if="userCreatedCheck" @click.prevent="leadToEdit">Edit</button>
    </div>
</template>

<script>
import { galleriesService } from '@/services/Galleries'
import { mapActions, mapGetters } from 'vuex'

export default {
    data() {
        return {
            id: this.$route.params.id,
            gallery: {}
        }
    },

    async created() {
        try {
            const response = await galleriesService.show(this.id);
            console.log(response.data);
            this.gallery = response.data;
            console.log('get u id')
            console.log(this.getUserID)
            console.log('g u id')
            console.log(this.gallery.user_id)
        } catch (error) {
            console.log(error);
        }
    },

    methods: {
        ...mapActions(['fetchUserID']), 

        leadToEdit () {
            this.$router.push(`/edit/${this.gallery.id}`);
        }
    },

    computed: {
        ...mapGetters(['getUserID']), 

        userCreatedCheck () {
            return this.getUserID == this.gallery.user_id
        }
    }

}
</script>

<style scoped>
    .comments {
        background-color: lightgray;
    }
</style>