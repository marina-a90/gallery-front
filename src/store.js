import Vue from 'vue'
import Vuex from 'vuex'
import { authService } from '@/services/Auth'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        
    },
    getters: {
        
    },
    mutations: {
        
    }, 
    actions: {
        async login (context, credentials) {
            await authService.login(credentials)
        }, 

        logout (context) {
            authService.logout()
        }
    }
});