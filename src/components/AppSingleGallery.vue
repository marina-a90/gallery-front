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

        <b-carousel
            id="carousel-1"
            v-model="slide"
            :interval="4000"
            controls
            indicators
            background="#ababab"
            img-width="1024"
            img-height="480"
            style="text-shadow: 1px 1px 2px #333;"
            @sliding-start="onSlideStart"
            @sliding-end="onSlideEnd"
            >
        
            <b-carousel-slide v-for="image in gallery.images" :key="image.id">
                <img slot="img"
                class="d-block img-fluid w-100"
                width="1024"
                height="480"
                alt="image slot"
                @click="newTab(image.imageURL)" 
                :src="image.imageURL" 
                >
            </b-carousel-slide>
        </b-carousel>

        <div class="comments container mt-3">
            <h4 class="mt-3 mb-3">Comments:</h4>
            <ul>
                <li v-for="(comment, index) in gallery.comments" :key="comment.id">
                    <div><b>Created by: {{ comment.user.first_name }} {{ comment.user.last_name }} at {{ comment.created_at }}</b></div>
                    <p>{{ comment.description }}</p>
                    <div>
                        <button v-if="userCreatedCommentCheck" type="submit" @click="OnDeleteComment(comment.id)">
                            Delete
                        </button>
                    </div>
                </li>
            </ul>
        </div>
        <div v-if="!gallery.comments.length">There are no comments for this post yet. Be the first to make one.</div>

        <button v-if="userCreatedGalleryCheck" @click.prevent="leadToEdit">Edit</button>

        <button v-if="userCreatedGalleryCheck" type="submit" @click="deleteGallery(gallery.id)">
            Delete
        </button>

        <form v-if="userLoggedInCheck" @submit.prevent>
            <div><label>Add Comment:</label></div>
            <div>
                <textarea type="textarea" 
                required 
                v-model="comment.description"
                placeholder="add comment"
                maxlength="1000"></textarea>
            </div>
            <button type="submit" @click="addComment">Add Comment</button>
        </form>
    </div>
</template>

<script>
import { galleriesService } from '@/services/Galleries'
import { commentsService } from '@/services/Comments'
import { mapActions, mapGetters } from 'vuex'

export default {
    data() {
        return {
            id: this.$route.params.id,
            gallery: {
                comments: []
            }, 
            comment: {
                description: '', 
                user_id: localStorage.getItem('user_id'),
                gallery_id: this.$route.params.id,
            }, 
            slide: 0,
            sliding: null
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
        ...mapActions(['fetchUserID', 'makeNewComment']), 

        leadToEdit () {
            this.$router.push(`/edit/${this.gallery.id}`);
        }, 

        addComment () {
            let comm = this.makeNewComment(this.comment)
            this.gallery.comments.unshift(comm)
            // location.reload()
        }, 

        onSlideStart(slide) {
            this.sliding = true
        },

        onSlideEnd(slide) {
            this.sliding = false
        },

        newTab(url) {
            var win = window.open(url, '_blank');
            win.focus();
        },

        async OnDeleteComment (id) {
            await commentsService.delete(id)
            // this.gallery.comments.splice(this.index, 1)
            location.reload()
        },

        deleteGallery (id){
            galleriesService.delete(id)
            this.$router.push('/my-galleries')
        }
    },

    computed: {
        ...mapGetters(['getUserID']), 

        userCreatedGalleryCheck () {
            return this.getUserID == this.gallery.user_id
        },

        userLoggedInCheck () {
            return this.getUserID !== null
        }, 

        userCreatedCommentCheck () {
            return this.getUserID == this.comment.user_id
        },
    }

}
</script>

<style scoped>
    .comments {
        background-color: lightgray;
    }
</style>