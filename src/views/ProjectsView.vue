<script setup>
import { Icon } from '@iconify/vue'

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
  <div class="mx-auto max-w-5xl px-4 py-16 min-h-screen">
    <h1 class="text-3xl font-bold mb-8">项目</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
      <div
        v-for="project in projects"
        :key="project.name"
        class="group relative flex flex-col items-start justify-between gap-6 p-5 border border-dashed border-gray-500/30 rounded-2xl hover:bg-gray-800/50 transition-all duration-300 h-full"
      >
        <a :href="project.link" target="_blank" class="absolute inset-0 z-10"></a>
        <div class="relative flex items-center justify-center w-12 h-12 rounded-full mb-4">
          <img
            :alt="project.name"
            :src="project.avatar"
            class="w-full h-full object-cover rounded-full"
          />
        </div>
        <h2 class="mb-2 font-semibold text-lg">{{ project.name }}</h2>
        <p class="text-sm text-gray-400">{{ project.description }}</p>
        <a
          :href="'https://' + project.domain"
          target="_blank"
          class="flex items-center gap-2 text-sm text-gray-400 group-hover:text-gray-300 transition-colors relative z-20"
        >
          <span>{{ project.domain }}</span>
          <Icon icon="lucide:external-link" class="w-4 h-4" />
        </a>
      </div>
    </div>
  </div>
</template>