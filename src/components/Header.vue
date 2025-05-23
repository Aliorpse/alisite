<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'

const route = useRoute()
const hoveredItem = ref(null)
const navItemsRefs = ref([])

const navItems = [
  { name: '首页', path: '/', icon: 'mdi:home', wide: true },
  { name: '文章', path: '/articles', icon: 'mdi:book-open-page-variant', wide: true },
  { name: '项目', path: '/projects', icon: 'ant-design:project-filled', wide: false },
  { name: '留言', path: '/contact', icon: 'material-symbols:mail', wide: false },
]

const updateBackgroundPosition = (path) => {
  const index = navItemsRefs.value.findIndex(item => item.__vnode.key === path)
  if (index === -1) return
  
  const item = navItemsRefs.value[index]
  const rect = item.getBoundingClientRect()
  const parentRect = item.parentElement.getBoundingClientRect()
  
  document.documentElement.style.setProperty('--item-width', `${rect.width}px`)
  document.documentElement.style.setProperty('--item-left', `${rect.left - parentRect.left}px`)
}

const isLinkActive = (path) => {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(path)
}

// 监听路由变化和悬停状态
watch(
  [() => route.path, hoveredItem],
  ([newPath, newHoveredItem]) => {
    const activePath = newHoveredItem || navItems.find(item => isLinkActive(item.path))?.path
    if (activePath) {
      updateBackgroundPosition(activePath)
    }
  },
  { immediate: true }
)

const handleMouseLeave = () => {
  hoveredItem.value = null
  const activePath = navItems.find(item => isLinkActive(item.path))?.path
  if (activePath) {
    updateBackgroundPosition(activePath)
  }
}
</script>

<template>
  <div class="flex justify-center items-center gap-4">
    <ul class="items-center justify-center bg-[#f2f2f21a] backdrop-blur-md rounded-full flex overflow-x-auto px-2 py-1 mx-4 sm:mx-0 w-auto scrollbar-none relative">
      <div 
        class="absolute top-0.5 bottom-0.5 bg-[#f2f2f20d] rounded-full transition-all duration-300 pointer-events-none"
        :style="{
          width: 'var(--item-width)',
          left: 'var(--item-left)',
          opacity: hoveredItem || isLinkActive(route.path) ? '1' : '0'
        }"
      />
      <li
        v-for="item in navItems"
        :key="item.path"
        class="relative flex-shrink-0"
        @mouseover="hoveredItem = item.path"
        @mouseleave="handleMouseLeave"
        ref="navItemsRefs"
      >
        <div 
          class="absolute left-1/4 w-1/2 mx-auto border-t-[3px] rounded-full shadow-[0_20px_100px_8px_#fff] transition-all duration-300 pointer-events-none"
          :class="{ 'opacity-100': isLinkActive(item.path), 'opacity-0': !isLinkActive(item.path) }"
        />
        <router-link
          :to="item.path"
          class="block"
        >
          <div
            class="px-2 sm:px-4 py-2 sm:py-3 rounded-full font-bold text-xs sm:text-sm flex items-center space-x-1 sm:space-x-2 transition-all duration-300"
            :class="[
              (isLinkActive(item.path) || hoveredItem === item.path) ? 'text-white' : 'text-gray-300',
              item.wide ? 'tracking-widest' : 'tracking-tight'
            ]"
          >
            <Icon :icon="item.icon" class="text-base sm:text-lg" />
            <span class="select-none">{{ item.name }}</span>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.scrollbar-none {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.scrollbar-none::-webkit-scrollbar {
  display: none;
}

@media (max-width: 640px) {
  ul {
    margin: 0 1rem;
  }
}
</style>