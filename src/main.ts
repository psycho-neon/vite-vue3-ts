// register vue composition api globally
import 'vue-global-api'
import { createApp } from 'vue'
import router from '~/router'
import App from './App.vue'

const app = createApp(App)

app.use(router)
app.mount('#app')
