<template>
    <div class="container">
        <h1>Add gallery</h1>
        <form @submit.prevent>
            <div class="mt-3">
                <label>Title</label>
                <input 
                    v-model="gallery.title"
                    name="title"
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
                name="description"                 
                type="text" 
                class="form-control" 
                placeholder="Description"
                maxlength="1000"
                >
                </textarea>
            </div>

            <div><button type="submit" @click="editGallery" :disabled="disabledAdd" class="mt-3">Edit Gallery</button></div>
            <div v-if="disabledAdd"><i>You need to add at least one image to the gallery!</i></div>
        </form>

        <button type="button" @click.prevent="cancel">Cancel</button>

        <form @submit.prevent>
            <div class="mt-3">
                <label class="mr-3">Add images</label>

                    <input 
                    v-model="newImage"
                    name="imageURL"
                    type="url"
                    placeholder="Image URL"
                    pattern="https?://.+(png|jpg|jpeg)"
                    required
                    ><br>

                <button type="submit" @click="addImage" class="mt-3 ml-1">Add image</button>
                
            </div>
        </form>

            <ul>
                <li v-for="(image, index) in gallery.images" :key="image.index">
                    <img :src="image" height="100px">
                    <button @click="moveUp(index)">Move Up</button>
                    <button @click="moveDown(index)">Move Down</button>
                    <button :disabled="disabledButton" @click="remove(index)">Remove</button>
                </li>
            </ul>
    </div>
</template>

<script>
import { galleriesService } from '@/services/Galleries'
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            gallery: {
                title: '',
                description: '',
                images: [], 
                user_id: localStorage.getItem('user_id')
            }, 
            image: {
                imageURL: ''
            }, 
            newImage: '',
        }
    },

    created() {
        this.$route.params.id && galleriesService.get(this.$route.params.id)
        .then((response) => {
            this.gallery = response.data;
        })
    },

    methods: {
        editGallery () {
            galleriesService.update(this.$route.params.id, this.gallery);
            this.$router.push("/my-galleries");
        }, 

        addImage () {
            this.gallery.images.push(this.newImage);
        }, 

        moveUp (index) {
            if (index > 0 ) {
                this.gallery.images.splice( index - 1, 0, this.gallery.images.splice( index, 1 ) )
            }
        }, 

        moveDown (index) {
            if (index < this.gallery.images.length - 1 ) {
                this.gallery.images.splice( index + 1, 0, this.gallery.images.splice( index, 1 ) )
            }
        }, 

        remove (index) {
            this.gallery.images.splice( index, 1 )
        },

        cancel () {
            this.$router.push("/my-galleries")
        }
    },

    computed: {
        ...mapGetters(['galleries']), 

        disabledButton() {
            return this.gallery.images.length > 1 ? false : true;
        }, 

        disabledAdd() {
            return this.gallery.images.length > 0 ? false : true;
        },
    }, 

    async created() {
        try {
            const response = await galleriesService.show(this.$route.params.id);
            this.gallery = response.data;
            let arr = []
            for (let i=0; i<response.data.images.length; i++) {
                let rImg = response.data.images[i]
                arr.push(rImg.imageURL)
            }
            this.gallery.images = arr;
        } catch (error) {
            console.log(error);
        }
    },
}
</script>