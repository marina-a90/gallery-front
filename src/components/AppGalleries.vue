<template>
    <div class="container">
        <h1>All Galleries</h1>
        <ul>
            <li v-for="gallery in galleries" :key="gallery.id">
                {{ gallery.title }}
                
                <div v-for="image in gallery.images" :key="image.id">                    
                    <img :src=image.imageURL>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { galleriesService } from '../services/Galleries.js'

export default {
    data() {
        return {
            galleries: []
        }
    },

    async created() {
        try {
            const response = await galleriesService.getAll();
            console.log(response);
            this.galleries = response.data;
        } catch (error) {
            console.log(error);
        }
    }
}
</script>