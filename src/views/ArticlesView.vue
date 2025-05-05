<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const articles = ref([])

onMounted(async () => {
  const modules = import.meta.glob('/src/posts/*.md')
  
  const promises = []
  for (const path in modules) {
    promises.push(modules[path]().then(module => {
      // Extract slug from the path
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
  
  // Sort articles by date (newest first)
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
  <div class="mx-auto max-w-4xl px-4 py-16 min-h-screen">
    <h1 class="text-3xl font-bold mb-8">文章</h1>
    
    <div class="space-y-8">
      <div 
        v-for="article in articles" 
        :key="article.path" 
        class="flex flex-col sm:flex-row w-full items-stretch gap-6 rounded-2xl sm:shadow-[0_0px_1.2px_rgb(140,140,140)] shadow-[0_0px_2px_rgb(140,140,140)] hover:shadow-[0_0px_2px_rgb(140,140,140)] p-3 opacity-90 hover:opacity-100 hover:bg-gray-900/30 transition-colors cursor-pointer"
        @click="navigateToArticle(article)"
      >
        <div class="relative aspect-[48/27] w-full sm:w-80 rounded-2xl shrink-0">
          <img 
            v-if="article.frontmatter.image" 
            :src="article.frontmatter.image" 
            :alt="article.frontmatter.title" 
            class="object-cover rounded-2xl h-full w-full" 
            loading="lazy"
          />
          <div v-else class="bg-gray-800 h-full w-full rounded-2xl flex items-center justify-center">
            <span class="text-gray-400">No image</span>
          </div>
        </div>
        
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
    </div>
  </div>
</template>