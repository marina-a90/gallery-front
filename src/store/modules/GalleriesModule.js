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
        }
    }, 

    actions: {
        fetchGalleries (state) {
            galleriesService.getAll()
                .then(response => {
                    let galleries = response.data
                    console.log(galleries)
                    return state.commit('setGalleries', galleries);
                })
                .catch(err => {
                    console.log(err);
                });
        }, 
        
        async fetchMyGalleries (state) {
            const response = await galleriesService.getMyGalleries()
            console.log(response)
            state.commit('setGalleries', response)
        }
    }

}