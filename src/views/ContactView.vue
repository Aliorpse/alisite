<script setup>
import PageTitle from '../components/PageTitle.vue'
import { useUser } from '@clerk/vue'
import { ref, nextTick } from 'vue'

const { isSignedIn, user } = useUser()
const messageContent = ref('')
const maxLength = 500

const handleKeyDown = (event) => {
  if (event.key === 'Enter') {
    if (event.ctrlKey) {
      // 在光标位置插入换行符
      const start = event.target.selectionStart
      const end = event.target.selectionEnd
      messageContent.value = messageContent.value.substring(0, start) + '\n' + messageContent.value.substring(end)
      // 将光标位置移动到换行符后
      nextTick(() => {
        event.target.selectionStart = event.target.selectionEnd = start + 1
        adjustTextareaHeight(event.target)
      })
    } else {
      event.preventDefault()
      // TODO: 这里添加发送消息的逻辑
      console.log('发送消息:', messageContent.value)
    }
  }
}

const adjustTextareaHeight = (textarea) => {
  textarea.style.height = 'auto'
  textarea.style.height = textarea.scrollHeight + 'px'
}

const handleInput = (event) => {
  adjustTextareaHeight(event.target)
}

const messages = ref([
  {
    username: 'aliorpse1',
    avatar: 'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ2l0aHViL2ltZ18yd2RIS3pvZ1RPOTZuMHJMY3J2MDRybm5KdmsifQ',
    time: '17 days ago',
    content: '212121212121212121212121131223123131231231223123212121212121212121212121131223123131231231223123212121212121212121212121131223123131231231223123212121212121212121212121131223123131231231223123212121212121212121212121131223123131231231223123212121212121212121212121131223123131231231223123'
  },
  {
    username: 'aliorpse2',
    avatar: 'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ2l0aHViL2ltZ18yd2RIS3pvZ1RPOTZuMHJMY3J2MDRybm5KdmsifQ',
    time: '17 days ago',
    content: '21212121212121212121212113122312313123123122312321212121212121212121212113122312313123123'
  },
  {
    username: 'aliorpse2',
    avatar: 'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ2l0aHViL2ltZ18yd2RIS3pvZ1RPOTZuMHJMY3J2MDRybm5KdmsifQ',
    time: '17 days ago',
    content: 'test'
  },
])
</script>

<template>
  <div>
    <PageTitle title="留言" />
    
    <div class="mx-auto max-w-3xl px-4 py-8 min-h-screen">
      <div class="flex flex-col gap-8">
        <!-- 登录状态和留言框 -->
        <div class="space-y-4">
          <div v-if="!isSignedIn" class="flex items-center justify-start h-20 px-10 pr-2 text-sm rounded-lg bg-gray-800/50 text-gray-400">
            🔒 请登录后留言
          </div>
          <div v-else class="flex gap-2 rounded-md shadow-[0_0px_1.2px_rgb(140,140,140)] p-3 min-h-20">
            <div class="w-12 h-12 shrink-0">
              <img 
                :src="user?.imageUrl" 
                :alt="user?.username + ' profile image'"
                width="48"
                height="48"
                class="rounded-full"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div class="flex flex-col flex-grow gap-4 justify-between">
              <textarea 
                v-model="messageContent"
                class="message-input p-0 w-full text-sm bg-transparent border-none outline-none resize-none placeholder-gray-500 text-gray-300 disabled:opacity-50"
                placeholder="写下你的留言... (尚未完成)"
                name="message"
                :maxlength="maxLength"
                @keydown="handleKeyDown"
                @input="handleInput"
                style="min-height: 20px; max-height: 200px; overflow-y: auto;"
              ></textarea>
              <div class="opacity-100 transition-opacity duration-1000 text-xs text-gray-500 flex items-center justify-between gap-2">
                <span>{{ messageContent.length }}/{{ maxLength }}</span>
                <button 
                  type="submit" 
                  class="flex items-center justify-center gap-1.5 text-gray-400 hover:text-gray-300 transition-colors"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="15" 
                    height="15" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    stroke-width="2" 
                    stroke-linecap="round" 
                    stroke-linejoin="round"
                  >
                    <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"></path>
                    <path d="m21.854 2.147-10.94 10.939"></path>
                  </svg>
                  <span class="font-bold">发送</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 留言列表 -->
        <ul class="flex flex-col space-y-4">
          <li v-for="(message, index) in messages" :key="message.username" class="flex items-start gap-3 relative">
            <div class="flex flex-col items-center flex-shrink-0 gap-2">
              <img 
                :src="message.avatar" 
                :alt="message.username + ' profile image'"
                width="40"
                height="40"
                class="mb-1 rounded-full"
              />
              <div v-if="index !== messages.length - 1" class="absolute left-5 top-14 bottom-0 w-0.5 bg-gray-500/30"></div>
            </div>
            <div class="flex flex-col w-full">
              <div class="flex items-center gap-2">
                <p class="text-gray-300">{{ message.username }}</p>
                <span class="text-xs text-gray-500">{{ message.time }}</span>
              </div>
              <p class="mt-1 text-sm text-gray-400 break-words whitespace-pre-wrap max-w-[calc(100%-4rem)]">{{ message.content }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-secondary {
  background-color: var(--secondary);
}

.text-muted-foreground {
  color: var(--muted-foreground);
}

.bg-primary {
  background-color: var(--primary);
}

.text-primary-foreground {
  color: var(--primary-foreground);
}

.border-foreground {
  border-color: var(--foreground);
}

.message-input {
  caret-color: rgb(148, 163, 184) !important;
}

.message-input::selection {
  background-color: rgb(148, 163, 184);
  color: white;
}
</style>