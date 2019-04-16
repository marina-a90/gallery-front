import Vue from 'vue'
import VueRouter from 'vue-router'

import Galleries from './components/AppGalleries'
import AppLogin from './components/AppLogin'
import AppRegister from './components/AppRegister'

Vue.use(VueRouter)

const routes = [
    { path: '/login', name: 'login', component: AppLogin },
    { path: '/register', name: 'register', component: AppRegister },
    { path: '*', redirect: { name: 'galleries' }, meta: { requiresAuth: true } },
    { path: '/galleries', name: 'galleries', component: Galleries, meta: { requiresAuth: true } } 
]

export const router = new VueRouter({
    routes, 
    mode: 'history', 
    beforeEach (to, from, next) {    
        if (to.meta.requiresAuth && !authService.isAuthenticated) {
            next('/login')
        }
        else {
            next()
        }
    }
})