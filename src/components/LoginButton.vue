<script setup>
import { ref, onMounted } from 'vue'
import { Clerk } from '@clerk/clerk-js'
import { Icon } from '@iconify/vue'

const clerk = ref(null)
const isSignedIn = ref(false)
const userImageUrl = ref('')

onMounted(async () => {
  const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
  if (!publishableKey) {
    console.error('Missing Clerk publishable key')
    return
  }
  
  clerk.value = new Clerk(publishableKey, {
  appearance: {
    baseTheme: 'dark',
  }
})
  await clerk.value.load()

  clerk.value.addListener(({ user }) => {
    isSignedIn.value = !!user
    if (user) {
      userImageUrl.value = user.imageUrl
    }
  })
})

const handleSignIn = () => {
  if (clerk.value) {
    clerk.value.openSignIn()
  }
}

const handleUserMenu = () => {
  if (clerk.value) {
    clerk.value.openUserProfile()
  }
}
</script>

<template>
  <div class="fixed top-8 right-4 sm:right-40 z-40">
    <button
      v-if="!isSignedIn"
      @click="handleSignIn"
      class="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-slate-500/20 hover:bg-slate-500/30 rounded-full text-white transition-all duration-300 backdrop-blur-sm"
    >
      <Icon icon="mdi:account-circle" class="text-xl" />
    </button>
    <div v-else class="relative group">
      <img
        :src="userImageUrl"
        alt="用户头像"
        class="w-8 h-8 sm:w-10 sm:h-10 rounded-full cursor-pointer border-2 border-slate-500/30 transition-transform hover:scale-110"
        @click="handleUserMenu"
      />
    </div>
  </div>
</template> 