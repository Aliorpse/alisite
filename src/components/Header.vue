<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'

const route = useRoute()
const hoveredItem = ref(null)

const navItems = [
  { name: '首页', path: '/', icon: 'mdi:home', wide: true },
  { name: '文章', path: '/articles', icon: 'mdi:book-open-page-variant', wide: true },
  { name: '项目', path: '/projects', icon: 'ant-design:project-filled', wide: false },
  { name: '留言', path: '/contact', icon: 'material-symbols:mail', wide: false },
]

const isLinkActive = (path) => {
  return path === '/' ? route.path === '/' : route.path.startsWith(path)
}
</script>

<template>
  <div class="flex justify-center items-center gap-4">
    <ul class="items-center justify-center bg-[#f2f2f21a] backdrop-blur-md rounded-full flex overflow-x-auto px-2 py-1 mx-4 sm:mx-0 w-auto">
      <li
        v-for="item in navItems"
        :key="item.path"
        class="relative flex-shrink-0"
        @mouseover="hoveredItem = item.path"
        @mouseleave="hoveredItem = null"
      >
        <div 
          class="absolute left-1/4 w-1/2 mx-auto border-t-[3px] rounded-full shadow-[0_20px_100px_8px_#fff] transition-opacity duration-300 pointer-events-none"
          :class="[ isLinkActive(item.path) ? 'opacity-100' : 'opacity-0' ]"
        />
        <div 
          class="absolute top-0.5 bottom-0.5 w-full bg-[#f2f2f20d] rounded-full transition-opacity duration-300 pointer-events-none"
          :class="[ (isLinkActive(item.path) || hoveredItem === item.path) ? 'opacity-100' : 'opacity-0' ]"
        />
        <router-link
          :to="item.path"
          class="block"
        >
          <div
            class="px-2 sm:px-4 py-2 sm:py-3 rounded-full font-bold text-xs sm:text-sm flex items-center space-x-1 sm:space-x-2 transition-all duration-300"
            :class="[
              isLinkActive(item.path) || hoveredItem === item.path 
              ? 'text-white' 
              : 'text-gray-300',
              item.wide ? 'tracking-widest' : 'tracking-tight'
            ]"
          >
            <Icon 
              :icon="item.icon" 
              class="text-base sm:text-lg"
            />
            <span class="select-none">{{ item.name }}</span>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 隐藏滚动条但保持滚动功能 */
ul::-webkit-scrollbar {
  display: none;
}

ul {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

@media (max-width: 640px) {
  ul {
    margin-left: 1rem;
    margin-right: 1rem;
  }
}
</style>