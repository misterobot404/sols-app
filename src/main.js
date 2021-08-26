import Vue from 'vue'
import App from './App'
import router from './routes'
import store from './store'
import vuetify from "./plugins/vuetify"
import "./plugins/axios"
import "./styles.css"
// import html editor
import {TiptapVuetifyPlugin} from 'tiptap-vuetify'
import 'tiptap-vuetify/dist/main.css'

Vue.use(TiptapVuetifyPlugin, {
    vuetify,
    iconsGroup: 'md'
})

new Vue({
    vuetify,
    store,
    router,
    render: h => h(App)
}).$mount('#app');