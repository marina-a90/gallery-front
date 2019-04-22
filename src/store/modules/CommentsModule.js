import { commentsService } from '@/services/Comments';

export const CommentsModule = {

    state: {
        comments: []
    },

    getters: {
        getComments (state) {
            return state.comments;
        }
    },

    mutations: {
        addNewComment(state, comment){
            state.comments.push(comment)
        },
    }, 

    actions: {
        async makeNewComment(context, newComment){
            const response = await commentsService.post(newComment)
            // context.commit('addNewComment', response.data)
        }
    }

}