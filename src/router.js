import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import ProjectsView from './views/ProjectsView.vue'
import ArticlesView from './views/ArticlesView.vue'
import ContactView from './views/ContactView.vue'
import ArticleDetailView from './views/ArticleDetailView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/projects',
    name: 'projects',
    component: ProjectsView
  },
  {
    path: '/articles',
    name: 'articles',
    component: ArticlesView
  },
  {
    path: '/articles/:slug',
    name: 'articleDetail',
    component: ArticleDetailView,
    props: true
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.afterEach(() => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
})

export default router
