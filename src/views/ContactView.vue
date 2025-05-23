<script setup>
import PageTitle from '../components/PageTitle.vue'
import { useUser } from '@clerk/vue'
import { ref, nextTick, onMounted, watch } from 'vue'
import { Icon } from '@iconify/vue'

const { isSignedIn, user } = useUser()
const messageContent = ref('')
const maxLength = 500
const messages = ref([])
const API_BASE_URL = 'https://comments.aliorpse.tech/api'
const loadingState = ref({ sending: false, loading: true, deleting: false, deleteId: null })

// 格式化时间
const formatTime = (timestamp) => {
  const now = Math.floor(Date.now() / 1000)
  const diff = now - timestamp
  
  if (diff < 60) return '刚刚'
  if (diff < 3600) return `${Math.floor(diff / 60)}分钟前`
  if (diff < 86400) return `${Math.floor(diff / 3600)}小时前`
  if (diff < 2592000) return `${Math.floor(diff / 86400)}天前`
  if (diff < 31536000) return `${Math.floor(diff / 2592000)}个月前`
  return `${Math.floor(diff / 31536000)}年前`
}

// 更新评论中的用户信息
const updateUserInfo = (comments) => {
  return comments.map(comment => {
    if (comment.userId === user.value?.id) {
      return {
        ...comment,
        username: user.value.username || user.value.primaryEmailAddress.emailAddress,
        avatar: user.value.imageUrl
      }
    }
    return comment
  })
}

// 获取评论列表
const fetchComments = async () => {
  loadingState.value.loading = true
  try {
    const response = await fetch(`${API_BASE_URL}/comments`)
    const data = await response.json()
    messages.value = updateUserInfo(data)
  } catch (error) {
    console.error('获取评论失败:', error)
  } finally {
    loadingState.value.loading = false
  }
}

// 发送评论
const sendComment = async () => {
  if (!messageContent.value.trim() || loadingState.value.sending) return
  
  loadingState.value.sending = true
  try {
    const response = await fetch(`${API_BASE_URL}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: user.value.id,
        username: user.value.username || user.value.primaryEmailAddress.emailAddress,
        avatar: user.value.imageUrl,
        content: messageContent.value,
      }),
    })
    
    const newComment = await response.json()
    messages.value.unshift(newComment)
    messageContent.value = ''
  } catch (error) {
    console.error('发送评论失败:', error)
  } finally {
    loadingState.value.sending = false
  }
}

// 删除评论
const deleteComment = async (timestamp) => {
  if (!confirm('确定要删除这条评论吗？此操作不可恢复。')) return
  
  loadingState.value.deleting = true
  loadingState.value.deleteId = timestamp
  
  try {
    const response = await fetch(`${API_BASE_URL}/comments/${timestamp}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.value.id }),
    })
    
    if (response.ok) {
      messages.value = messages.value.filter(msg => msg.time !== timestamp)
    } else {
      const error = await response.json()
      alert(error.error || '删除评论失败')
    }
  } catch (error) {
    console.error('删除评论失败:', error)
    alert('删除评论失败，请稍后重试')
  } finally {
    loadingState.value.deleting = false
    loadingState.value.deleteId = null
  }
}

// 处理文本区域高度
const adjustTextareaHeight = (textarea) => {
  textarea.style.height = 'auto'
  textarea.style.height = textarea.scrollHeight + 'px'
}

// 处理键盘事件
const handleKeyDown = (event) => {
  if (event.key === 'Enter') {
    if (event.ctrlKey || event.shiftKey) {
      event.preventDefault()
      const start = event.target.selectionStart
      const end = event.target.selectionEnd
      messageContent.value = messageContent.value.substring(0, start) + '\n' + messageContent.value.substring(end)
      nextTick(() => {
        event.target.selectionStart = event.target.selectionEnd = start + 1
        adjustTextareaHeight(event.target)
      })
    } else {
      event.preventDefault()
      sendComment()
    }
  }
}

// 监听用户信息变化
watch(() => user.value, (newUser) => {
  if (newUser) {
    messages.value = updateUserInfo(messages.value)
  }
}, { deep: true })

onMounted(fetchComments)
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
                placeholder="写下你的留言..."
                name="message"
                :maxlength="maxLength"
                @keydown="handleKeyDown"
                @input="e => adjustTextareaHeight(e.target)"
                style="min-height: 20px; max-height: 200px; overflow-y: auto;"
              ></textarea>
              <div class="opacity-100 transition-opacity duration-1000 text-xs text-gray-500 flex items-center justify-between gap-2">
                <span>{{ messageContent.length }}/{{ maxLength }}</span>
                <button 
                  type="submit" 
                  class="flex items-center justify-center gap-1.5 text-gray-400 hover:text-gray-300 transition-colors"
                  @click="sendComment"
                  :disabled="loadingState.sending"
                >
                  <Icon 
                    :icon="loadingState.sending ? 'mdi:loading' : 'mingcute:send-line'" 
                    class="w-4 h-4"
                    :class="{ 'animate-spin': loadingState.sending }"
                  />
                  <span class="font-bold">{{ loadingState.sending ? '发送中...' : '发送' }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 留言列表 -->
        <div v-if="loadingState.loading" class="flex justify-center items-center py-8">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400"></div>
        </div>
        <ul v-else class="flex flex-col space-y-4">
          <li v-for="(message, index) in messages" :key="message.time" class="flex items-start gap-3 relative">
            <div class="flex flex-col items-center flex-shrink-0 gap-2">
              <img 
                :src="message.avatar" 
                :alt="message.username + ' profile image'"
                width="40"
                height="40"
                class="mb-1 rounded-full"
                loading="lazy"
                decoding="async"
              />
              <div v-if="index !== messages.length - 1" class="absolute left-5 top-14 bottom-0 w-0.5 bg-gray-500/30"></div>
            </div>
            <div class="flex flex-col w-full">
              <div class="flex items-center gap-2">
                <p class="text-gray-300">{{ message.username }}</p>
                <span class="text-xs text-gray-500">{{ formatTime(message.time) }}</span>
                <button 
                  v-if="isSignedIn && message.userId === user?.id"
                  @click="deleteComment(message.time)"
                  class="ml-2 text-xs text-gray-500 hover:text-red-400 transition-colors flex items-center gap-1"
                  :disabled="loadingState.deleting && loadingState.deleteId === message.time"
                >
                  <Icon 
                    v-if="loadingState.deleting && loadingState.deleteId === message.time"
                    icon="mdi:loading"
                    class="animate-spin h-3 w-3"
                  />
                  <span>{{ loadingState.deleting && loadingState.deleteId === message.time ? '删除中...' : '删除' }}</span>
                </button>
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
.message-input {
  caret-color: rgb(148, 163, 184) !important;
}

.message-input::selection {
  background-color: rgb(148, 163, 184);
  color: white;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>