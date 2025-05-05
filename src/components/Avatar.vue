<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const showAvatar = ref(route.path !== '/')

watch(() => route.path, (newPath) => {
  showAvatar.value = newPath !== '/'
})
</script>

<template>
  <transition name="fade">
    <router-link 
      v-if="showAvatar" 
      to="/"
      class="avatar-container hidden sm:block"
    >
      <img 
        src="/assets/favicon.png" 
        alt="Avatar"
        class="w-15 h-15 rounded-full object-cover border-2 border-slate-500/30 transition-transform hover:scale-110"
      />
    </router-link>
  </transition>
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

@media (max-width: 640px) {
  .avatar-container {
    display: none;
  }
}
</style>