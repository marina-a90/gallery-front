import Vue from 'vue'
import VueRouter from 'vue-router'

// import Galleries from './components/AppGalleries'
// import Login from './components/AppLogin'
// import Register from './components/AppRegister'
// import SingleGallery from './components/AppSingleGallery'
// import AddGallery from './components/AppAddGallery'
// import MyGalleries from './components/AppMyGalleries'
// import UserGalleries from './components/AppUserGalleries'

const Galleries = () => import('./components/AppGalleries')
const Login = () => import('./components/AppLogin')
const Register = () => import('./components/AppRegister')
const SingleGallery = () => import('./components/AppSingleGallery')
const AddGallery = () => import('./components/AppAddGallery')
const MyGalleries = () => import('./components/AppMyGalleries')
const UserGalleries = () => import('./components/AppUserGalleries')

Vue.use(VueRouter)

const routes = [
    { path: '/login', name: 'login', component: Login },
    { path: '/register', name: 'register', component: Register },
    { path: '*', redirect: { name: 'galleries' } },
    { path: '/galleries', name: 'galleries', component: Galleries }, 
    { path: '/gallery/:id', name: 'single-gallery', component: SingleGallery 
    //, meta: { requiresAuth: true } 
    },
    { path: '/add-gallery', name: 'add-gallery', component: AddGallery 
    //, meta: { requiresAuth: true } 
    }, 
    { path: '/my-galleries/', name: 'my-galleries', component: MyGalleries 
    //, meta: { requiresAuth: true } 
    }, 
    { path: '/user-galleries/:id', name: 'user-galleries', component: UserGalleries 
    //, meta: { requiresAuth: true } 
    }
]

export const router = new VueRouter({
    routes, 
    mode: 'history'
})


// router.beforeEach((to, from, next) => {
//     const publicPages = [
//         '/login', 
//         '/register', 
//         '/galleries'
//     ];
//     const authRequired = !publicPages.includes(to.path);
//     const loggedIn = localStorage.getItem('user');
  
//     if (authRequired && !loggedIn) {
//       return next('/login');
//     }
  
//     next();
//   })