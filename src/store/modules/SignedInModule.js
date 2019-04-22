import { authService } from '@/services/Auth';

export const SignedInModule = {
    state: {
        isSignedIn: authService.isAuthenticated(), 
        UserID: authService.getUserIDFromLS() 
    },

    getters: {
        isSignedInCheck (state) {
            return state.isSignedIn
        },

        getUserID (state) {
            return state.UserID;
        }
    },

    mutations: {
        isSignedInChange (state, value) {
            state.isSignedIn = value;
        }, 

        setUserID (state, ID) {
            state.UserID = ID;
        }
    },

    actions: {
        signedInStatusChange(context) {
            const currentStatus = authService.isAuthenticated()
            context.commit("isSignedInChange", currentStatus);
        },

        fetchUserID (context) {
            const currentUserID = authService.getUserIDFromLS()
            context.commit('setUserID', currentUserID);
        }
    }
}