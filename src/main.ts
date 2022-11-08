import { createApp } from 'vue-termui'
import { createPinia } from 'pinia'
import App from './App.vue'
const pinia = createPinia()
const app = createApp(App, { swapScreens: process.env.NODE_ENV === 'production' })
app.use(pinia)
app.mount()

process.on('exit', () => {
  app.unmount()
})
