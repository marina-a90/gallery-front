import Vue from 'vue'
import VueRouter from 'vue-router'

import Galleries from './components/AppGalleries'
import AppLogin from './components/AppLogin'
import AppRegister from './components/AppRegister'
import AppSingleGallery from './components/AppSingleGallery'
import AppAddGallery from './components/AppAddGallery'

Vue.use(VueRouter)

const routes = [
    { path: '/login', name: 'login', component: AppLogin },
    { path: '/register', name: 'register', component: AppRegister },
    { path: '*', redirect: { name: 'galleries' }, meta: { guest: true } },
    { path: '/galleries', name: 'galleries', component: Galleries, meta: { guest: true } }, 
    { path: '/galleries/:id', name: 'single-gallery', component: AppSingleGallery, meta: { requiresAuth: true } },
    { path: '/add-gallery', name: 'add-gallery', component: AppAddGallery, meta: { requiresAuth: true } }
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