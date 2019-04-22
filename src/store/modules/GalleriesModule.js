import { galleriesService } from '@/services/Galleries';

export const GalleriesModule = {

    state: {
        galleries: []
    },

    getters: {
        galleries (state) {
            return state.galleries;
        }
    },

    mutations: {
        setGalleries (state, gallery) {
            state.galleries = gallery;
        }, 

        addNewGallery(state, gallery){
            state.galleries.push(gallery)
        },
    }, 

    actions: {
        fetchGalleries (state) {
            galleriesService.getAll()
                .then(response => {
                    let galleries = response.data
                    return state.commit('setGalleries', galleries);
                })
                .catch(err => {
                    console.log(err);
                });
        }, 
        
        async fetchMyGalleries (state) {
            const response = await galleriesService.getMyGalleries()
            state.commit('setGalleries', response)
        }, 

        async makeNewGallery(context, gallery){
            const response = await galleriesService.post(gallery)
            context.commit('addNewGallery', response.data)
        },
    }

}