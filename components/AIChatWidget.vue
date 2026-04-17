<template>
  <div class="fixed bottom-6 right-6 z-[100] font-sans">
    <!-- WhatsApp-style Toggle Button -->
    <button 
      @click="toggleChat"
      class="w-16 h-16 bg-[#25D366] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 relative group"
      aria-label="Open Chat"
    >
      <div v-if="unreadCount > 0" class="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-white animate-bounce">
        {{ unreadCount }}
      </div>
      <Icon v-if="!isOpen" name="logos:whatsapp-icon" size="32" />
      <Icon v-else name="lucide:x" size="28" />
      <!-- Tooltip -->
      <span class="absolute right-20 bg-white text-slate-800 px-4 py-2 rounded-xl text-xs font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-slate-100">
        Chat with us!
      </span>
    </button>

    <!-- WhatsApp-style Chat Window -->
    <transition
      enter-active-class="transition duration-400 cubic-bezier(0.175, 0.885, 0.32, 1.275)"
      enter-from-class="transform translate-y-20 opacity-0 scale-90"
      enter-to-class="transform translate-y-0 opacity-100 scale-100"
      leave-active-class="transition duration-300 ease-in"
      leave-from-class="transform translate-y-0 opacity-100 scale-100"
      leave-to-class="transform translate-y-20 opacity-0 scale-90"
    >
      <div v-if="isOpen" class="absolute bottom-20 right-0 w-[350px] sm:w-[400px] h-[550px] bg-[#E5DDD5] rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] flex flex-col overflow-hidden border border-white/20">
        <!-- Background Pattern -->
        <div class="absolute inset-0 opacity-[0.06] pointer-events-none bg-[url('https://w0.peakpx.com/wallpaper/508/606/HD-wallpaper-whatsapp-l-light-patron-patrones.jpg')] bg-repeat"></div>

        <!-- Header -->
        <div class="bg-[#075E54] p-4 text-white flex items-center justify-between z-10 shadow-lg">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center border border-white/10">
              <Icon name="lucide:bot" size="20" />
            </div>
            <div>
              <h4 class="font-bold text-sm leading-tight">SCPSN Assistant</h4>
              <p class="text-[10px] text-white/70 flex items-center gap-1.5 font-bold uppercase tracking-wider">
                <span class="w-2 h-2 bg-[#25D366] rounded-full animate-pulse"></span>
                Online & Secure
              </p>
            </div>
          </div>
          <div class="flex gap-2">
            <button class="p-2 hover:bg-white/10 rounded-full transition-colors"><Icon name="lucide:video" size="18" /></button>
            <button class="p-2 hover:bg-white/10 rounded-full transition-colors"><Icon name="lucide:phone" size="18" /></button>
            <button @click="isOpen = false" class="p-2 hover:bg-white/10 rounded-full transition-colors"><Icon name="lucide:more-vertical" size="18" /></button>
          </div>
        </div>

        <!-- Messages Area -->
        <div class="flex-grow overflow-y-auto p-4 space-y-3 z-10 scrollbar-thin" ref="messageArea">
          <div class="flex justify-center my-4">
             <span class="bg-[#D1E9FF] text-[9px] font-black text-[#075E54] px-3 py-1 rounded-lg uppercase tracking-[0.2em] shadow-sm">
               Today
             </span>
          </div>

          <div 
            v-for="(msg, i) in messages" 
            :key="i"
            :class="[
              'max-w-[85%] p-3 rounded-xl text-[13px] leading-relaxed relative shadow-md group animate-in fade-in slide-in-from-bottom-2 duration-300', 
              msg.sender === 'user' 
                ? 'ml-auto bg-[#DCF8C6] text-slate-800 rounded-tr-none' 
                : 'mr-auto bg-white text-slate-800 rounded-tl-none'
            ]"
          >
             <!-- Message Tail -->
             <div v-if="msg.sender === 'user'" class="absolute -top-0 -right-2 w-4 h-4 text-[#DCF8C6] fill-current">
                <svg viewBox="0 0 16 16"><path d="M16 0H0v16L16 0z"/></svg>
              </div>
              <div v-else class="absolute -top-0 -left-2 w-4 h-4 text-white fill-current">
                <svg viewBox="0 0 16 16"><path d="M0 0h16v16L0 0z"/></svg>
              </div>

            <div v-if="msg.sender !== 'user'" class="text-[9px] font-black text-[#075E54]/60 uppercase tracking-widest mb-1 flex items-center gap-1">
               <Icon v-if="msg.sender === 'ai'" name="lucide:bot" size="10" />
               {{ msg.senderName || 'Assistant' }}
            </div>

            <p class="font-medium whitespace-pre-wrap">{{ msg.text }}</p>

            <div class="flex items-center justify-end gap-1 mt-1 opacity-70">
              <span class="text-[9px] font-bold uppercase">{{ formatTime(msg.createdAt) }}</span>
              <div v-if="msg.sender === 'user'" class="flex items-center">
                 <Icon v-if="msg.status === 'read'" name="lucide:check-check" size="12" class="text-sky-500" />
                 <Icon v-else-if="msg.status === 'delivered'" name="lucide:check-check" size="12" class="text-slate-400" />
                 <Icon v-else name="lucide:check" size="12" class="text-slate-400" />
              </div>
            </div>
          </div>
        </div>

        <!-- Input Area -->
        <div class="p-3 bg-[#F0F2F5] flex items-center gap-2 z-10 border-t border-black/5">
          <button class="p-2 hover:bg-black/5 rounded-full text-slate-500 transition-colors">
            <Icon name="lucide:smile" size="24" />
          </button>
          <button class="p-2 hover:bg-black/5 rounded-full text-slate-500 transition-colors">
            <Icon name="lucide:paperclip" size="24" />
          </button>
          
          <div class="flex-grow">
            <input 
              v-model="input"
              @keyup.enter="send"
              type="text" 
              placeholder="Type a message"
              class="w-full px-5 py-3 bg-white border-none rounded-2xl text-sm font-medium focus:ring-0 outline-none shadow-sm"
            />
          </div>

          <button 
            @click="send"
            :disabled="!input.trim()"
            class="w-12 h-12 bg-[#075E54] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#128C7E] transition-all active:scale-90 disabled:opacity-50 disabled:scale-100"
          >
            <Icon v-if="input.trim()" name="lucide:send" size="20" class="ml-0.5" />
            <Icon v-else name="lucide:mic" size="20" />
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted, onUnmounted, watch } from 'vue'
import { io } from 'socket.io-client'

const isOpen = ref(false)
const input = ref('')
const messageArea = ref(null)
const socket = ref(null)
const unreadCount = ref(0)
const roomId = useCookie('chat_room_id', { default: () => `guest_${Date.now()}` })

const config = useRuntimeConfig()
const apiBase = config.public.apiBase || 'http://localhost:3001'

const messages = ref([])

onMounted(() => {
  const baseUrl = apiBase.replace('/api', '')
  socket.value = io(`${baseUrl}/chat`, {
    transports: ['websocket', 'polling'],
  })

  socket.value.on('connect', () => {
    socket.value.emit('userJoin', { roomId: roomId.value, userName: 'Guest' })
  })

  socket.value.on('roomHistory', ({ messages: history }) => {
    messages.value = history
    scrollToBottom()
  })

  socket.value.on('messageReceived', (msg) => {
    messages.value.push(msg)
    scrollToBottom()
    if (!isOpen.value) unreadCount.value++
    else {
      // If open, mark as read
      socket.value.emit('messageRead', { messageId: msg._id, roomId: roomId.value })
    }
  })

  socket.value.on('statusUpdated', ({ messageId, status }) => {
    const msg = messages.value.find(m => m._id === messageId)
    if (msg) msg.status = status
  })
})

onUnmounted(() => {
  if (socket.value) socket.value.disconnect()
})

const scrollToBottom = () => {
  nextTick(() => {
    if (messageArea.value) {
      messageArea.value.scrollTop = messageArea.value.scrollHeight
    }
  })
}

const toggleChat = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    unreadCount.value = 0
    scrollToBottom()
    // Mark all as read when opening
    messages.value.forEach(m => {
      if (m.sender !== 'user' && m.status !== 'read') {
        socket.value.emit('messageRead', { messageId: m._id, roomId: roomId.value })
      }
    })
  }
}

const formatTime = (ts) => {
  if (!ts) return ''
  return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const send = async () => {
  if (!input.value.trim()) return
  
  socket.value?.emit('sendMessage', {
    roomId: roomId.value,
    message: input.value,
    userName: 'Guest',
  })
  
  input.value = ''
}
</script>

<style scoped>
.scrollbar-thin::-webkit-scrollbar {
  width: 5px;
}
.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background: rgba(0,0,0,0.1);
  border-radius: 10px;
}
</style>
