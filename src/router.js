import Vue from 'vue'
import VueRouter from 'vue-router'

import Galleries from './components/AppGalleries'

Vue.use(VueRouter)

const routes = [
    { path: '*', redirect: { name: 'galleries' } },
    { path: '/galleries', name: 'galleries', component: Galleries } 
]

export const router = new VueRouter({
    routes, 
    mode: 'history'
})