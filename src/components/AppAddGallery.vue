<template>
    <div class="container">
        <h1>Add gallery</h1>
        <form>
            <div class="mt-3">
                <label>Title</label>
                <input 
                    v-model="gallery.title"
                    type="text" 
                    class="form-control" 
                    placeholder="Title"
                    minlength="2"
                    maxlength="255"
                    required="required"
                >
            </div>

            <div class="mt-3">
                <label>Description</label>
                <textarea 
                v-model="gallery.description"                    
                type="text" 
                class="form-control" 
                placeholder="Description"
                maxlength="1000"
                >
                </textarea>
            </div>

            <div class="mt-3">
                <label class="mr-3">Add images</label>
                <div v-for="(image, i) in addImageDivNumber" :key="i">
                    <input 
                    v-model="gallery.images[i]"
                    type="url"
                    placeholder="Image URL"
                    pattern="https?://.+(png|jpg|jpeg)"
                    required
                    ><br>
                </div>
                <button type="button" @click.prevent="addImage" class="mt-3 ml-1">Add image</button>
            </div>

            <div><button @click.prevent="addGallery" class="mt-3">Add Gallery</button></div>
        </form>
    </div>
</template>

<script>
import { galleriesService } from '@/services/Galleries'
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            gallery: {
                title: '',
                description: '',
                images: []
            },
            addImageDivNumber: 1
        }
    },

    created() {
        this.$route.params.id && galleriesService.get(this.$route.params.id)
        .then((response) => {
            console.log(response.data)
            this.gallery = response.data;
        })
    },

    methods: {
        addGallery () {
            galleriesService.post(this.gallery);
            this.$router.push("{ name: 'galleries' }");
        }, 

        addImage () {
            this.addImageDivNumber++;
            this.gallery.images.push();
        }
    },

    computed: {
        ...mapGetters(['galleries'])
    }
}
</script>