<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import PageTitle from '../components/PageTitle.vue'
import ArticleSearchBar from '../components/ArticleSearchBar.vue'
import ArticleImage from '../components/ArticleImage.vue'

const router = useRouter()
const articles = ref([])
const searchQuery = ref('')

const filteredArticles = computed(() => {
  if (!searchQuery.value) return articles.value
  
  const query = searchQuery.value.toLowerCase()
  return articles.value.filter(article => {
    const title = article.frontmatter.title?.toLowerCase() || ''
    const description = article.frontmatter.description?.toLowerCase() || ''
    const content = article.content?.toLowerCase() || ''
    const tags = article.frontmatter.tags?.join(' ').toLowerCase() || ''
    
    return title.includes(query) || 
           description.includes(query) || 
           content.includes(query) ||
           tags.includes(query)
  })
})

const handleSearch = (query) => {
  searchQuery.value = query
}

onMounted(async () => {
  const modules = import.meta.glob('/src/posts/*.md')
  
  const promises = []
  for (const path in modules) {
    promises.push(modules[path]().then(module => {
      const pathParts = path.split('/')
      const fileName = pathParts[pathParts.length - 1]
      const slug = fileName.replace('.md', '')
      
      return {
        path,
        slug,
        frontmatter: module.frontmatter || {},
        content: module.content || ''
      }
    }))
  }
  
  articles.value = await Promise.all(promises)

  articles.value.sort((a, b) => {
    return new Date(b.frontmatter.date || 0) - new Date(a.frontmatter.date || 0)
  })
})

const formatDate = (date) => {
  if (!date) return '未知日期'
  const d = new Date(date)
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
}

const truncateContent = (content) => {
  if (!content) return ''
  content = content.replace(/<[^>]*>/g, '')
  return content.length > 150 ? content.substring(0, 150) + '...' : content
}

const navigateToArticle = (article) => {
  router.push({ name: 'articleDetail', params: { slug: article.slug } })
}
</script>

<template>
  <div>
    <PageTitle title="文章">
      <template #right>
        <ArticleSearchBar @search="handleSearch" />
      </template>
    </PageTitle>
    
    <div class="mx-auto max-w-5xl px-4 py-8 min-h-screen">
      <div class="space-y-8">
        <TransitionGroup 
          name="article-list"
          tag="div"
          class="space-y-8"
        >
          <div 
            v-for="(article, index) in filteredArticles" 
            :key="article.path" 
            class="flex flex-col sm:flex-row w-full items-stretch gap-6 rounded-2xl sm:shadow-[0_0px_1.2px_rgb(140,140,140)] shadow-[0_0px_2px_rgb(140,140,140)] hover:shadow-[0_0px_2px_rgb(140,140,140)] p-3 opacity-90 hover:opacity-100 hover:bg-gray-900/30 transition-colors cursor-pointer"
            @click="navigateToArticle(article)"
            :style="{ '--delay': `${index * 0.1}s` }"
          >
            <ArticleImage 
              :src="article.frontmatter.image"
              :alt="article.frontmatter.title"
            />
            
            <div class="flex flex-col justify-between flex-grow p-4">
              <div>
                <h2 class="mb-2 font-bold text-lg">{{ article.frontmatter.title }}</h2>
                <p class="text-sm text-gray-400">{{ formatDate(article.frontmatter.date) }} | 
                  <span v-for="(tag, index) in article.frontmatter.tags" :key="tag">
                    {{ tag }}{{ index < article.frontmatter.tags.length - 1 ? ', ' : '' }}
                  </span>
                </p>
              </div>
              <p class="text-sm mt-2">{{ article.frontmatter.description || truncateContent(article.content) }}</p>
            </div>
          </div>
        </TransitionGroup>
      </div>
    </div>
  </div>
</template>

<style scoped>
.article-list-enter-active,
.article-list-leave-active {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.article-list-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.article-list-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.article-list-move {
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.article-list-enter-active {
  transition-delay: var(--delay);
}
</style>