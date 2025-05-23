<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: ''
  }
})

const isLoading = ref(true)
let debounceTimer = null

const handleImageLoad = () => {
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    isLoading.value = false
  }, 300)
}

const handleImageError = () => {
  isLoading.value = false
}

onMounted(() => {
  const img = new Image()
  img.src = props.src
  img.onload = handleImageLoad
})
</script>

<template>
  <div class="relative aspect-[48/27] w-full sm:w-80 rounded-2xl shrink-0 overflow-hidden">
    <div 
      v-if="isLoading"
      class="absolute inset-0 bg-gray-800 animate-pulse"
    >
      <div class="w-full h-full bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-shimmer"></div>
    </div>
    
    <img 
      v-if="src"
      :src="src"
      :alt="alt"
      class="object-cover rounded-2xl h-full w-full transition-opacity duration-300"
      :class="{ 'opacity-0': isLoading, 'opacity-100': !isLoading }"
      loading="lazy"
      @load="handleImageLoad"
      @error="handleImageError"
    />
    
    <div 
      v-else 
      class="bg-gray-800 h-full w-full rounded-2xl flex items-center justify-center"
    >
      <span class="text-gray-400">No image</span>
    </div>
  </div>
</template>

<style scoped>
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