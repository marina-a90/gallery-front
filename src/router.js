import Vue from 'vue'
import VueRouter from 'vue-router'

const Galleries = () => import('./components/AppGalleries')
const Login = () => import('./components/AppLogin')
const Register = () => import('./components/AppRegister')
const SingleGallery = () => import('./components/AppSingleGallery')
const AddGallery = () => import('./components/AppAddGallery')
const MyGalleries = () => import('./components/AppMyGalleries')
const UserGalleries = () => import('./components/AppUserGalleries')
const Edit = () => import('./components/AppEdit')

Vue.use(VueRouter)

const routes = [
    { path: '/login', name: 'login', component: Login 
    , meta: { auth: false, guest: true } 
    },
    { path: '/register', name: 'register', component: Register 
    , meta: { auth: false, guest: true } },
    { path: '*', redirect: { name: 'galleries' } },
    { path: '/galleries', name: 'galleries', component: Galleries }, 
    { path: '/gallery/:id', name: 'single-gallery', component: SingleGallery 
    , meta: { guest: false, auth: true } 
    },
    { path: '/create', name: 'add-gallery', component: AddGallery 
    , meta: { guest: false }
    }, 
    { path: '/my-galleries/', name: 'my-galleries', component: MyGalleries 
    , meta: { guest: false } 
    }, 
    { path: '/user-galleries/:id', name: 'user-galleries', component: UserGalleries 
    , meta: { guest: false }  
    },
    { path: '/edit/:id', name: 'edit', component: Edit
    , meta: { guest: false } 
    }
]

export const router = new VueRouter({
    routes, 
    mode: 'history'
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!authService.isAuthenticated()) {
        next({
          path: '/login',
        })
      } 
      else {
        next({ path: '/galleries' })
      }
    } 
    else {
      next() 
    }
})