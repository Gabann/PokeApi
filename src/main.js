import './assets/main.css'

import {createApp} from 'vue'
import {createPinia} from 'pinia'
import {createVfm} from 'vue-final-modal'

import App from './App.vue'
import router from './router/index.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

const app = createApp(App)
const vfm = createVfm()


app.use(createPinia())
app.use(vfm)
app.use(router)

app.mount('#app')
