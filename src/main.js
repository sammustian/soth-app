import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { firestorePlugin } from 'vuefire'
import VueCompositionAPI from '@vue/composition-api'
import store from './store'

Vue.use(VueCompositionAPI)
Vue.use(firestorePlugin)

Vue.config.productionTip = false

new Vue({
    router,
    vuetify,
    store,
    render: (h) => h(App)
}).$mount('#app')