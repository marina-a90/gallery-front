import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { router } from './router'
import Vuex from 'vuex';
import { store } from './store'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(Vuex)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
