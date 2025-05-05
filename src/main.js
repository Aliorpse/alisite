import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router.js'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

const app = createApp(App)

// 全局注册 highlight.js
app.directive('highlight', {
  mounted(el) {
    const blocks = el.querySelectorAll('pre code')
    blocks.forEach((block) => {
      hljs.highlightElement(block)
    })
  }
})

app.use(router).mount('#app')
