<script setup>
import { Icon } from '@iconify/vue'
import { useClerk, useUser } from '@clerk/vue'

const clerk = useClerk()

const openSignIn = () => clerk.value.openSignIn()
const openUserProfile = () => clerk.value.openUserProfile()

const { isSignedIn, user } = useUser()
</script>

<template>
  <div class="fixed top-8 right-4 sm:right-40 z-40">
    <!-- 未登录状态 -->
    <button
      v-if="!isSignedIn"
      @click="openSignIn"
      class="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-slate-500/20 hover:bg-slate-500/30 rounded-full text-white transition-all duration-300 backdrop-blur-sm"
    >
      <Icon icon="mdi:account-circle" class="text-xl" />
    </button>

    <!-- 已登录状态 -->
    <button
      v-else
      @click="openUserProfile"
      class="group relative"
    >
      <img
        :src="user?.imageUrl"
        :alt="user?.username || '用户头像'"
        class="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-slate-500/30 transition-all duration-300 hover:scale-110 hover:border-slate-500/50"
      />
      <span class="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800/80 text-slate-300 text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        {{ user?.username || '个人中心' }}
      </span>
    </button>
  </div>
</template> 