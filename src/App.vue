<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import LoginButton from './components/LoginButton.vue'
import { ref, onMounted } from 'vue'

const isLoading = ref(true)

onMounted(() => {
  const waitForLoad = new Promise(resolve => {
    if (document.readyState === 'complete') {
      resolve()
    } else {
      window.addEventListener('load', resolve)
    }
  })
  const waitForTime = new Promise(resolve => {
    setTimeout(resolve, 1000)
  })
  Promise.all([waitForLoad, waitForTime]).then(() => {
    isLoading.value = false
  })
})
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- 加载动画 -->
    <transition name="fade">
      <div 
        v-if="isLoading"
        class="fixed inset-0 flex items-center justify-center bg-[#06100F] z-50"
      >
        <div class="relative w-20 h-1">
          <div class="absolute inset-0 bg-slate-400/20 rounded-full overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-slate-400 to-transparent animate-shimmer"></div>
          </div>
        </div>
      </div>
    </transition>

    <Header class="fixed top-8 w-full z-40" />
    <LoginButton />
    <main class="flex-grow pt-8">
      <router-view v-slot="{ Component }">
        <transition 
          name="fade" 
          mode="out-in"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <Footer />
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.animate-shimmer {
  animation: shimmer 1.5s ease-in-out infinite;
}
</style>