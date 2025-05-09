import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router.js'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
import { clerkPlugin } from '@clerk/vue'
import { dark } from '@clerk/themes'

const app = createApp(App)

app.directive('highlight', {
  mounted() {
    hljs.highlightAll()
  }
})

app.use(clerkPlugin, {
  publishableKey: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
  appearance: {
    baseTheme: dark,
  }
})

app.use(router).mount('#app')
