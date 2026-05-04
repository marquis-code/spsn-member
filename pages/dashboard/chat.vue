<template>
  <div class="h-full flex overflow-hidden">
    <!-- Chat Sidebar (Contacts) -->
    <aside class="w-80 lg:w-96 border-r border-slate-200 flex flex-col bg-white shrink-0">
      <div class="p-6 space-y-6">
        <div class="flex items-center justify-between">
          <h2 class="text-2xl font-black text-slate-800 tracking-tighter">Scientific chat</h2>
          <div class="flex gap-2">
            <button class="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 hover:text-[#003366] hover:border-[#003366] transition-all">
              <Icon name="lucide:users" size="18" />
            </button>
            <button class="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 hover:text-[#003366] hover:border-[#003366] transition-all">
              <Icon name="lucide:edit-3" size="18" />
            </button>
          </div>
        </div>
        
        <div class="relative group">
          <input 
            type="text" 
            placeholder="Search registry..." 
            class="w-full h-12 pl-12 pr-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold text-slate-700 outline-none focus:ring-2 focus:ring-[#003366]/5 focus:border-[#003366]/20 transition-all placeholder:text-slate-400 shadow-sm"
          />
          <Icon name="lucide:search" size="16" class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#003366] transition-colors" />
        </div>
      </div>

      <div class="flex-1 overflow-y-auto custom-scrollbar px-3 pb-6 space-y-1">
        <div 
          v-for="chat in chats" 
          :key="chat.id"
          @click="selectChat(chat)"
          :class="[
            'p-4 rounded-3xl cursor-pointer transition-all flex gap-4 items-center relative overflow-hidden group',
            activeChatId === chat.id ? 'bg-[#003366] text-white shadow-xl shadow-[#003366]/20' : 'hover:bg-slate-50 text-slate-600'
          ]"
        >
          <div class="relative shrink-0">
            <div :class="[
              'w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg border-2 shadow-sm',
              activeChatId === chat.id ? 'bg-white/10 border-white/20' : 'bg-slate-100 border-white text-slate-400'
            ]">
               <img v-if="chat.avatar" :src="chat.avatar" class="w-full h-full object-cover rounded-2xl" />
               <span v-else>{{ chat.name.split(' ').map(n => n[0]).join('').substring(0, 2) }}</span>
            </div>
            <span :class="[
              'absolute -bottom-1 -right-1 w-4 h-4 border-2 rounded-full transition-colors',
              activeChatId === chat.id ? 'border-[#003366]' : 'border-white',
              chat.status === 'online' ? 'bg-emerald-500' : 
              chat.status === 'away' ? 'bg-amber-500' : 'bg-slate-300'
            ]"></span>
          </div>

          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between mb-0.5">
              <h4 :class="['text-sm font-bold truncate', activeChatId === chat.id ? 'text-white' : 'text-slate-800']">{{ chat.name }}</h4>
              <span :class="['text-[10px] font-medium', activeChatId === chat.id ? 'text-white/60' : 'text-slate-400']">{{ chat.time }}</span>
            </div>
            <p :class="['text-[11px] font-medium truncate pr-4', activeChatId === chat.id ? 'text-white/60' : 'text-slate-500']">{{ chat.lastMessage }}</p>
          </div>

          <div v-if="chat.unreadCount > 0 && activeChatId !== chat.id" class="w-5 h-5 bg-brand-cyan text-[#003366] text-[10px] font-black rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-brand-cyan/20">
            {{ chat.unreadCount }}
          </div>
        </div>
      </div>
    </aside>

    <!-- Main Chat Window -->
    <main class="flex-1 flex flex-col bg-[#F0F2F5] relative overflow-hidden">
      <div v-if="activeChat" class="flex flex-col h-full">
        <!-- Chat Header -->
        <header class="p-6 bg-white/95 backdrop-blur-md border-b border-slate-200 flex items-center justify-between z-10 shadow-sm">
          <div class="flex items-center gap-4">
             <div class="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-600 border border-slate-200 shadow-sm">
                <img v-if="activeChat.avatar" :src="activeChat.avatar" class="w-full h-full object-cover rounded-xl" />
                <span v-else>{{ activeChat.name.split(' ').map(n => n[0]).join('').substring(0, 2) }}</span>
             </div>
             <div>
                <h3 class="text-base font-bold text-slate-800 leading-tight">{{ activeChat.name }}</h3>
                <div class="flex items-center gap-1.5 mt-0.5">
                   <span :class="['w-1.5 h-1.5 rounded-full', activeChat.status === 'online' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300']"></span>
                   <span class="text-[10px] font-bold text-slate-400 tracking-widest">{{ activeChat.status === 'online' ? 'Active in registry' : 'Offline' }}</span>
                </div>
             </div>
          </div>
          <div class="flex items-center gap-2">
             <button class="p-3 text-slate-400 hover:text-[#003366] hover:bg-slate-100 rounded-2xl transition-all"><Icon name="lucide:search" size="18" /></button>
             <button class="p-3 text-slate-400 hover:text-[#003366] hover:bg-slate-100 rounded-2xl transition-all"><Icon name="lucide:paperclip" size="18" /></button>
             <button class="p-3 text-slate-400 hover:text-[#003366] hover:bg-slate-100 rounded-2xl transition-all"><Icon name="lucide:more-vertical" size="18" /></button>
          </div>
        </header>

        <!-- Messages Viewport (WhatsApp Texture) -->
        <div class="flex-1 overflow-y-auto p-6 lg:p-10 space-y-6 custom-scrollbar bg-[url('https://w0.peakpx.com/wallpaper/580/650/HD-wallpaper-whatsapp-background-whatsapp-texture.jpg')] bg-repeat">
          <div 
            v-for="msg in activeChat.messages" 
            :key="msg.id"
            :class="['flex w-full animate-in fade-in slide-in-from-bottom-2', msg.isMe ? 'justify-end' : 'justify-start']"
          >
            <div :class="[
              'max-w-[85%] lg:max-w-[70%] rounded-3xl shadow-lg shadow-black/5 relative p-1 transition-all',
              msg.isMe ? 'bg-brand-cyan rounded-tr-none' : 'bg-white rounded-tl-none border border-slate-200'
            ]">
              <!-- Attachment Display -->
              <div v-if="msg.attachments && msg.attachments.length > 0" class="p-1 space-y-1">
                 <div v-for="(att, i) in msg.attachments" :key="i" class="rounded-2xl overflow-hidden bg-black/5">
                    <!-- Image -->
                    <div v-if="att.type === 'image'" class="relative group">
                       <img :src="att.url" class="w-full max-h-[400px] object-cover cursor-zoom-in" />
                       <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all"></div>
                    </div>
                    <!-- PDF / Document -->
                    <div v-else-if="att.type === 'pdf' || att.type === 'document'" class="p-4 flex items-center gap-4 bg-white/40 backdrop-blur-sm">
                       <div class="w-12 h-12 rounded-xl bg-[#003366] text-white flex items-center justify-center border-4 border-white/20 shadow-sm">
                          <Icon :name="att.type === 'pdf' ? 'lucide:file-text' : 'lucide:file'" size="20" />
                       </div>
                       <div class="flex-1 min-w-0">
                          <p class="text-xs font-bold text-slate-800 truncate">{{ att.name }}</p>
                          <p class="text-[10px] font-medium text-slate-400 mt-0.5 tracking-tighter">{{ att.size || 'Scientific file' }} • {{ att.type }}</p>
                       </div>
                       <button class="w-10 h-10 bg-white/60 hover:bg-white rounded-lg flex items-center justify-center text-[#003366] transition-all">
                          <Icon name="lucide:download" size="16" />
                       </button>
                    </div>
                 </div>
              </div>

              <!-- Message Text -->
              <div v-if="msg.text" class="px-5 py-4">
                 <p :class="['text-sm font-medium leading-relaxed', msg.isMe ? 'text-[#003366]' : 'text-slate-700']">{{ msg.text }}</p>
              </div>

              <!-- Status Footer -->
              <div class="px-4 pb-2 flex items-center justify-end gap-1.5 opacity-60">
                 <span class="text-[9px] font-black tracking-tighter">{{ msg.time }}</span>
                 <div v-if="msg.isMe" class="flex">
                    <Icon v-if="msg.status === 'sent'" name="lucide:check" size="12" />
                    <Icon v-else-if="msg.status === 'delivered'" name="lucide:check-check" size="12" />
                    <Icon v-else-if="msg.status === 'read'" name="lucide:check-check" size="12" class="text-blue-600" />
                 </div>
              </div>

              <!-- WhatsApp Tails -->
              <div v-if="msg.isMe" class="absolute top-0 -right-2 w-4 h-4 bg-brand-cyan clip-path-bubble-right"></div>
              <div v-else class="absolute top-0 -left-2 w-4 h-4 bg-white border-l border-t border-slate-200 clip-path-bubble-left"></div>
            </div>
          </div>
          <div ref="scrollAnchor"></div>
        </div>

        <!-- Robust Input Footer (WhatsApp Style) -->
        <footer class="p-6 bg-[#F0F2F5] z-10">
           <!-- Attachment Menu Popup -->
           <transition name="pop">
              <div v-if="showAttachmentMenu" class="absolute bottom-28 left-8 w-48 bg-white rounded-[2rem] shadow-2xl border border-slate-100 p-3 grid grid-cols-2 gap-2 z-50">
                 <button v-for="item in attachmentTypes" :key="item.label" @click="handleAttachmentClick(item.type)" class="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl hover:bg-slate-50 transition-all group">
                    <div :class="['w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110', item.color]">
                       <Icon :name="item.icon" size="18" />
                    </div>
                    <span class="text-[10px] font-black text-slate-400 tracking-widest">{{ item.label }}</span>
                 </button>
              </div>
           </transition>

           <div class="flex items-center gap-4">
              <div class="flex-1 bg-white p-2 pl-4 lg:pl-6 rounded-[2.5rem] flex items-center gap-4 shadow-sm border border-slate-200 focus-within:ring-4 focus-within:ring-[#003366]/5 transition-all">
                 <button @click="showAttachmentMenu = !showAttachmentMenu" class="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-[#003366] transition-colors">
                    <Icon name="lucide:plus" size="24" :class="['transition-transform duration-300', showAttachmentMenu ? 'rotate-45 text-rose-500' : '']" />
                 </button>
                 <input 
                   v-model="newMessageText"
                   @keyup.enter="handleSend"
                   type="text" 
                   placeholder="Type scientific message..." 
                   class="flex-1 h-12 bg-transparent text-sm font-medium text-slate-700 outline-none placeholder:text-slate-300"
                 />
                 <div class="flex items-center gap-1 pr-2">
                    <button class="p-2 text-slate-400 hover:text-brand-cyan transition-colors"><Icon name="lucide:smile" size="20" /></button>
                    <button class="p-2 text-slate-400 hover:text-brand-cyan transition-colors"><Icon name="lucide:camera" size="20" /></button>
                 </div>
              </div>
              
              <button 
                @click="handleSend"
                class="w-14 h-14 bg-[#003366] text-white rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[#003366]/20 group"
              >
                 <Icon v-if="newMessageText.trim()" name="lucide:send" size="22" class="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                 <Icon v-else name="lucide:mic" size="22" />
              </button>
           </div>
        </footer>
      </div>

      <!-- High-End Registry Waiting State -->
      <div v-else class="flex-1 flex flex-col items-center justify-center p-20 text-center space-y-8 bg-white">
         <div class="relative">
            <div class="w-48 h-48 bg-slate-50 rounded-full flex items-center justify-center shadow-inner">
               <Icon name="lucide:messages-square" size="64" class="text-slate-200" />
            </div>
            <div class="absolute -bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-brand-cyan text-[#003366] rounded-full text-[10px] font-black tracking-widest shadow-xl">
               Registry network
            </div>
         </div>
         <div class="space-y-3 max-w-sm">
            <h3 class="text-2xl font-black text-slate-800 tracking-tight">Society chat</h3>
            <p class="text-sm text-slate-500 font-medium leading-relaxed">Select a practitioner, research group, or administrator to start a secure end-to-end encrypted scientific conversation.</p>
         </div>
         <div class="p-6 border border-slate-100 rounded-3xl bg-slate-50/50 text-[10px] font-bold text-slate-400 tracking-widest flex items-center gap-3">
            <Icon name="lucide:lock" size="14" class="text-emerald-500" />
            End-to-End encrypted registry
         </div>
      </div>
    </main>

    <!-- Hidden File Input -->
    <input type="file" ref="fileInput" class="hidden" @change="handleFileUpload" />
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from 'vue'
import { useChat } from '@/composables/useChat'
import { useUploadFile } from '@/composables/useUploadFile'

definePageMeta({
  layout: 'chat',
  middleware: 'auth'
})

const { chats, activeChatId, activeChat, sendMessage, markAsRead } = useChat()
const { uploadFile } = useUploadFile()

const newMessageText = ref('')
const scrollAnchor = ref(null)
const showAttachmentMenu = ref(false)
const fileInput = ref(null)
const currentUploadType = ref(null)

const attachmentTypes = [
  { type: 'pdf', label: 'Document', icon: 'lucide:file-text', color: 'bg-indigo-500' },
  { type: 'image', label: 'Camera', icon: 'lucide:camera', color: 'bg-rose-500' },
  { type: 'image', label: 'Gallery', icon: 'lucide:image', color: 'bg-emerald-500' },
  { type: 'audio', label: 'Audio', icon: 'lucide:headphones', color: 'bg-amber-500' }
]

const selectChat = (chat) => {
  activeChatId.value = chat.id
  markAsRead(chat.id)
  scrollToBottom()
}

const handleSend = () => {
  if (activeChatId.value && (newMessageText.value.trim())) {
    sendMessage(activeChatId.value, newMessageText.value)
    newMessageText.value = ''
    scrollToBottom()
  }
}

const handleAttachmentClick = (type) => {
  currentUploadType.value = type
  showAttachmentMenu.value = false
  fileInput.value.click()
}

const handleFileUpload = async (event) => {
  const file = event.target.files[0]
  if (!file || !activeChatId.value) return

  try {
    const url = await uploadFile(file)
    const attachment = {
      type: currentUploadType.value,
      name: file.name,
      url: url,
      size: (file.size / (1024 * 1024)).toFixed(1) + ' MB'
    }
    sendMessage(activeChatId.value, '', [attachment])
    scrollToBottom()
  } catch (err) {
    console.error('Upload failed', err)
  }
}

const scrollToBottom = async () => {
  await nextTick()
  scrollAnchor.value?.scrollIntoView({ behavior: 'smooth' })
}

watch(activeChatId, () => {
  if (activeChatId.value) scrollToBottom()
})

onMounted(() => {
  if (activeChatId.value) scrollToBottom()
})
</script>

<style scoped>
.animate-in {
  animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.pop-enter-active {
  animation: pop-in 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.pop-leave-active {
  animation: pop-in 0.2s cubic-bezier(0.16, 1, 0.3, 1) reverse;
}

@keyframes pop-in {
  from { opacity: 0; transform: scale(0.5) translateY(20px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.clip-path-bubble-right {
  clip-path: polygon(0 0, 0% 100%, 100% 0);
}
.clip-path-bubble-left {
  clip-path: polygon(100% 0, 0 0, 100% 100%);
}

::selection {
  background: #00b8d4;
  color: #003366;
}
</style>
