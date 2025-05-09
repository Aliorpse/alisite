<script setup>
import { Icon } from '@iconify/vue'
import PageTitle from '../components/PageTitle.vue'

const projects = [
  {
    name: 'aliorpse.tech',
    description: '使用 Vue 3 和 Tailwind CSS 构建的个人博客网站',
    avatar: '/assets/favicon.png',
    link: 'https://aliorpse.tech',
    domain: 'aliorpse.tech'
  },
  {
    name: 'api.aliorpse.tech',
    description: '基于 Express 的个人 API 服务',
    avatar: 'https://avatars.githubusercontent.com/u/5658226?s=200&v=4',
    link: 'https://docs.api.aliorpse.tech',
    domain: 'docs.api.aliorpse.tech'
  },
  {
    name: 'karin-plugins-alijs',
    description: '基于 Karin 框架的 App 插件仓库',
    avatar: 'https://karin.fun/images/logo-2.png',
    link: 'https://github.com/Aliorpse/karin-plugins-alijs',
    domain: 'github.com'
  }
]
</script>

<template>
  <div>
    <PageTitle title="项目" />
    
    <div class="mx-auto max-w-5xl px-4 py-8 min-h-screen">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
        <div
          v-for="project in projects"
          :key="project.name"
          class="relative flex flex-col items-start justify-between gap-6 p-5 border border-gray-500/30 rounded-2xl hover:bg-gray-800/50 transition-all duration-300 h-full"
        >
          <a :href="project.link" target="_blank" class="absolute inset-0 z-10"></a>
          <div class="relative flex items-center justify-center w-12 h-12 overflow-hidden rounded-full">
            <img
              :alt="project.name"
              :src="project.avatar"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="flex flex-col flex-grow">
            <h2 class="mb-4 font-semibold text-lg">{{ project.name }}</h2>
            <p class="text-sm font-light text-gray-400">{{ project.description }}</p>
          </div>
          <div class="flex items-center gap-2 text-sm text-gray-400">
            <span>{{ project.domain }}</span>
            <Icon icon="lucide:external-link" class="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>