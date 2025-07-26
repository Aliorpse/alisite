<script setup>
import { Icon } from '@iconify/vue'
import PageTitle from '../components/PageTitle.vue'
import { computed } from 'vue'

const projects = [
  {
    name: 'aliorpse.tech',
    description: '使用 Vue 3 和 Tailwind CSS 构建的个人博客网站',
    link: 'https://aliorpse.tech',
    tech: ['Vue 3', 'Tailwind CSS']
  },
  {
    name: 'api.aliorpse.tech',
    description: '基于 Spring Boot 的个人 API 服务',
    link: 'https://api.aliorpse.tech',
    tech: ['SpringBoot', 'Kotlin', 'Redis']
  },
  {
    name: 'karin-plugins-alijs',
    description: '基于 Karin 框架的 App 插件仓库',
    link: 'https://github.com/Aliorpse/karin-plugins-alijs',
    tech: ['Node.js', 'Karin']
  },
  {
    name: 'kotlin-mcutils',
    description: '使用 kotlin 开发的 Minecraft 请求库',
    link: 'https://github.com/Aliorpse/kotlin-mcutils',
    tech: ['Kotlin', 'Moshi', "Retrofit"]
  }
]

// 从链接中提取域名
const getDomain = (url) => {
  try {
    const domain = new URL(url).hostname
    return domain.startsWith('www.') ? domain.slice(4) : domain
  } catch {
    return url
  }
}
const projectsWithDomain = computed(() => {
  return projects.map(project => ({
    ...project,
    domain: getDomain(project.link)
  }))
})
</script>

<template>
  <div>
    <PageTitle title="项目" />
    
    <div class="mx-auto max-w-5xl px-4 py-8 min-h-screen">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
        <div
          v-for="project in projectsWithDomain"
          :key="project.name"
          class="group relative flex flex-col items-start justify-between gap-6 p-6 border border-gray-500/30 rounded-2xl hover:bg-gray-800/50 transition-all duration-300 h-full overflow-hidden"
        >
          <!-- 背景渐变 -->
          <div 
            class="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 from-slate-500/20 to-slate-600/20"
          ></div>
          
          <a 
            :href="project.link" 
            target="_blank" 
            rel="noopener noreferrer"
            class="absolute inset-0 z-10"
          ></a>

          <!-- 项目内容 -->
          <div class="relative flex flex-col flex-grow w-full">
            <div class="flex items-center justify-between mb-4">
              <h2 class="font-semibold text-lg group-hover:text-slate-300 transition-colors duration-300">
                {{ project.name }}
              </h2>
            </div>
            
            <p class="text-sm font-light text-gray-400 mb-4 min-h-[40px]">
              {{ project.description }}
            </p>

            <!-- 技术栈标签 -->
            <div class="flex flex-wrap gap-2 mb-4 min-h-[28px]">
              <span 
                v-for="tech in project.tech" 
                :key="tech"
                class="inline-flex items-center justify-center px-2 py-1 text-xs rounded-full bg-gray-800/50 text-gray-300"
              >
                {{ tech }}
              </span>
            </div>
          </div>

          <!-- 域名信息 -->
          <div class="relative flex items-center gap-2 text-sm text-gray-400 group-hover:text-sky-300 transition-colors duration-300">
            <span class="font-mono">{{ project.domain }}</span>
            <Icon 
              icon="lucide:external-link" 
              class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" 
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>