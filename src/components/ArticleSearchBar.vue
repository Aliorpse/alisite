<script setup>
import { ref, watch } from 'vue'
import { Icon } from '@iconify/vue'

const searchQuery = ref('')
const emit = defineEmits(['search'])

let debounceTimer = null

watch(searchQuery, (newValue) => {
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    emit('search', newValue)
  }, 300)
})
</script>

<template>
  <div class="w-full max-w-xl">
    <div class="relative">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="搜索文章..."
        class="w-full px-4 py-3 pl-12 bg-slate-500/10 border border-slate-500/30 rounded-xl focus:outline-none focus:border-slate-500/50 transition-colors duration-300 [caret-color:rgb(148,163,184)] backdrop-blur-sm"
      />
      <Icon 
        icon="mdi:magnify"
        class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl"
      />
    </div>
  </div>
</template> 