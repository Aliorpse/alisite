<script setup>
import { Icon } from '@iconify/vue'
import { ref, onMounted, onBeforeUnmount } from 'vue'

const socialLinks = [
  {
    name: 'github',
    url: 'https://github.com/Aliorpse/',
    icon: 'mdi:github'
  },
  {
    name: 'email',
    url: 'mailto:aliorpse@qq.com',
    icon: 'mdi:email-outline'
  },
  {
    name: 'bilibili',
    url: 'https://space.bilibili.com/1151049707',
    icon: 'mingcute:bilibili-fill'
  }
]

const titles = ['Student', 'Developer', 'Galgamer']
const currentTitle = ref('')
const currentIndex = ref(0)
const isDeleting = ref(false)
const typingSpeed = 110
const deletingSpeed = 120
const delayBetweenTitles = 1500
const delayBeforeNextTitle = 500

let typeWriterTimer = null

const typeWriter = () => {
  const currentWord = titles[currentIndex.value]
  
  if (isDeleting.value) {
    currentTitle.value = currentWord.substring(0, currentTitle.value.length - 1)
  } else {
    currentTitle.value = currentWord.substring(0, currentTitle.value.length + 1)
  }

  let typeSpeed = isDeleting.value ? deletingSpeed : typingSpeed

  if (!isDeleting.value && currentTitle.value === currentWord) {
    typeSpeed = delayBetweenTitles
    isDeleting.value = true
  } else if (isDeleting.value && currentTitle.value === '') {
    isDeleting.value = false
    currentIndex.value = (currentIndex.value + 1) % titles.length
    typeSpeed = delayBeforeNextTitle
  }

  typeWriterTimer = setTimeout(typeWriter, typeSpeed)
}

onMounted(() => {
  typeWriterTimer = setTimeout(typeWriter, typingSpeed)
})

onBeforeUnmount(() => {
  if (typeWriterTimer) {
    clearTimeout(typeWriterTimer)
  }
})
</script>

<template>
  <div class="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-20 min-h-screen flex flex-col items-center">
    <!-- 头像 -->
    <img 
      src="/assets/favicon.png" 
      alt="Avatar" 
      class="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 border-slate-500/30 object-cover shadow-lg backdrop-blur-sm mb-4 sm:mb-6"
      loading="eager"
      decoding="async"
    />

    <!-- 主标题 -->
    <h1 class="mb-6 sm:mb-8 font-semibold">
      <span class="bg-gradient-to-t from-slate-300 via-slate-400 to-slate-500 bg-clip-text text-[32px] sm:text-[40px] text-transparent sm:bg-gradient-to-r lg:text-[54px]">
        Hi, I'm Aliorpse
      </span>
    </h1>

    <!-- 动态标题 -->
    <div class="mb-8 sm:mb-10 h-8 sm:h-10">
      <p class="text-2xl sm:text-3xl sm:text-[42px]">
        <span class="bg-gradient-to-t from-slate-300 to-70% to-slate-400 bg-clip-text font-semibold text-transparent sm:bg-gradient-to-r">
          <span class="text-slate-400">&lt;</span>
          <span v-if="currentTitle">{{ currentTitle }}</span>
          <span class="text-slate-400 animate-pulse">_</span>
          <span class="text-slate-400">/&gt;</span>
        </span>
      </p>
    </div>

    <!-- 标签 -->
    <p class="mb-8 sm:mb-10 w-fit bg-gradient-to-r from-slate-400 via-slate-500 to-slate-600 bg-clip-text text-lg sm:text-xl opacity-90 sm:text-[26px]">
      #ud0d00 #al
    </p>

    <!-- 个人简介 -->
    <p class="mb-6 sm:mb-8 bg-gradient-to-b from-slate-300 to-slate-400 bg-clip-text text-xs sm:text-sm text-transparent sm:text-base text-center px-4">
      一名在读高中生。喜欢做一些有趣的前端小项目。
    </p>

    <!-- 社交链接 -->
    <div class="flex gap-4 sm:gap-6">
      <a 
        v-for="link in socialLinks" 
        :key="link.name"
        :href="link.url"
        target="_blank"
        rel="noopener noreferrer"
        class="group relative flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-slate-500/30 p-[6px] opacity-80 transition-all duration-500 hover:scale-110 hover:opacity-100 hover:border-slate-500 backdrop-blur-sm"
      >
        <Icon :icon="link.icon" class="text-slate-400 text-xl sm:text-2xl" />
        <span class="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800/80 text-slate-300 text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          {{ link.name }}
        </span>
      </a>
    </div>
  </div>
</template>