<template>
    <div class="container">
        <h1 class="mb-3">{{ gallery.title }}</h1>
        <div><b>Created by: {{ gallery.user ? gallery.user.first_name + ' ' + gallery.user.last_name : '' }}</b></div>
        <div class="mb-3"><i>Created at: {{ gallery.created_at }}</i></div>
        <div>{{ gallery.description }}</div>
        <div v-for="image in gallery.images" :key="image.id">
              <img :src="image.imageURL" alt="image">
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
    </div>
</template>

<script>
import { galleriesService } from '@/services/Galleries'

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
        } catch (error) {
            console.log(error);
        }
    },

}
</script>

<style scoped>
    .comments {
        background-color: lightgray;
    }
</style>