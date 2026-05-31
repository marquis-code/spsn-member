<template>
  <div class="h-full flex overflow-hidden">
    <!-- Chat Sidebar (Contacts) -->
    <aside class="w-80 lg:w-96 border-r border-slate-200 flex flex-col bg-white shrink-0">
      <!-- WhatsApp Web style Header -->
      <div class="p-3 bg-[#f0f2f5] border-b border-slate-200 shrink-0 flex items-center justify-between">
        <div class="w-10 h-10 rounded-full bg-slate-300 overflow-hidden">
          <img v-if="user?.avatar" :src="user.avatar" class="w-full h-full object-cover" />
          <Icon v-else name="lucide:user" size="24" class="text-slate-500 m-2" />
        </div>
        <div class="flex gap-4 text-[#54656f]">
          <button class="transition-colors hover:text-slate-800"><Icon name="lucide:users" size="20" /></button>
          <button class="transition-colors hover:text-slate-800"><Icon name="lucide:message-square" size="20" /></button>
          <button class="transition-colors hover:text-slate-800"><Icon name="lucide:more-vertical" size="20" /></button>
        </div>
      </div>
      
      <div class="p-2 border-b border-slate-200 bg-white">
        <div class="relative group bg-[#f0f2f5] rounded-lg overflow-hidden flex items-center px-3">
          <Icon name="lucide:search" size="16" class="text-[#54656f] shrink-0" />
          <input 
            type="text" 
            placeholder="Search or start new chat" 
            class="w-full h-9 pl-4 bg-transparent text-[14px] text-[#111b21] outline-none placeholder:text-[#54656f]"
          />
        </div>
      </div>

      <div class="flex-1 overflow-y-auto custom-scrollbar bg-white">
        <div 
          v-for="chat in chats" 
          :key="chat.id"
          @click="selectChat(chat)"
          :class="[
            'px-3 py-3 cursor-pointer transition-all flex gap-3 items-center relative group',
            activeChatId === chat.id ? 'bg-[#f0f2f5]' : 'hover:bg-[#f5f6f6] bg-white'
          ]"
        >
          <div class="relative shrink-0 ml-1">
            <div class="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg bg-slate-200 text-slate-500 overflow-hidden">
               <img v-if="chat.avatar" :src="chat.avatar" class="w-full h-full object-cover" />
               <span v-else>{{ chat.name.split(' ').map(n => n[0]).join('').substring(0, 2) }}</span>
            </div>
          </div>

          <div class="flex-1 min-w-0 border-b border-[#f0f2f5] pb-3 pt-1">
            <div class="flex items-center justify-between mb-0.5">
              <h4 class="text-[17px] text-[#111b21] truncate">{{ chat.name }}</h4>
              <span class="text-[12px] text-[#667781]">{{ chat.time }}</span>
            </div>
            <div class="flex items-center justify-between">
              <p class="text-[14px] text-[#667781] truncate pr-4">{{ chat.lastMessage }}</p>
              <div v-if="chat.unreadCount > 0 && activeChatId !== chat.id" class="w-5 h-5 bg-[#25D366] text-white text-[10px] font-bold rounded-full flex items-center justify-center shrink-0">
                {{ chat.unreadCount }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main Chat Window -->
    <main class="flex-1 flex flex-col bg-[#F0F2F5] relative overflow-hidden">
      <div v-if="activeChat" class="flex flex-col h-full">
        <!-- Chat Header -->
        <header class="px-4 py-2.5 bg-[#f0f2f5] flex items-center justify-between z-20 shrink-0">
          <div class="flex items-center gap-4 cursor-pointer">
             <div class="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500 overflow-hidden">
                <img v-if="activeChat.avatar" :src="activeChat.avatar" class="w-full h-full object-cover" />
                <span v-else>{{ activeChat.name.split(' ').map(n => n[0]).join('').substring(0, 2) }}</span>
             </div>
             <div>
                <h3 class="text-[16px] text-[#111b21]">{{ activeChat.name }}</h3>
                <div class="text-[13px] text-[#667781] -wide mt-0.5">{{ activeChat.status === 'online' ? 'online' : 'offline' }}</div>
             </div>
          </div>
          <div class="flex items-center gap-5 text-[#54656f]">
             <button class="hover:text-slate-800 transition-all"><Icon name="lucide:video" size="20" /></button>
             <button class="hover:text-slate-800 transition-all"><Icon name="lucide:search" size="20" /></button>
             <button class="hover:text-slate-800 transition-all"><Icon name="lucide:more-vertical" size="20" /></button>
          </div>
        </header>

        <!-- Messages Viewport (WhatsApp Texture) -->
        <div class="flex-1 overflow-y-auto px-16 py-8 space-y-2 custom-scrollbar bg-[#efeae2] bg-[url('https://static.whatsapp.net/rsrc.php/v3/yl/r/17vXoB8fKIE.png')] bg-repeat relative z-10">
          <div class="absolute inset-0 bg-white/40 pointer-events-none"></div>
          <div 
            v-for="msg in activeChat.messages" 
            :key="msg.id"
            :class="['flex w-full relative z-10', msg.isMe ? 'justify-end' : 'justify-start']"
          >
            <div :class="[
              'max-w-[85%] lg:max-w-[65%] px-2 pt-1.5 pb-2 rounded-lg shadow-sm relative text-[14.2px]',
              msg.isMe ? 'bg-[#dcf8c6] rounded-tr-none' : 'bg-white rounded-tl-none'
            ]">
              <!-- Attachment Display -->
              <div v-if="msg.attachments && msg.attachments.length > 0" class="p-1 space-y-1">
                 <div v-for="(att, i) in msg.attachments" :key="i" class="rounded-lg overflow-hidden bg-black/5">
                    <!-- Image -->
                    <div v-if="att.type === 'image'" class="relative group">
                       <img :src="att.url" class="w-full max-h-[300px] object-cover cursor-zoom-in" />
                    </div>
                    <!-- PDF / Document -->
                    <div v-else-if="att.type === 'pdf' || att.type === 'document'" class="p-3 flex items-center gap-3 bg-white/40 backdrop-blur-sm">
                       <div class="w-10 h-10 bg-[#ea4335] text-white flex items-center justify-center rounded">
                          <Icon :name="att.type === 'pdf' ? 'lucide:file-text' : 'lucide:file'" size="20" />
                       </div>
                       <div class="flex-1 min-w-0">
                          <p class="text-[14px] text-slate-800 truncate">{{ att.name }}</p>
                          <p class="text-[12px] text-slate-500 mt-0.5 -tighter">{{ att.size || '1.2 MB' }} • {{ att.type }}</p>
                       </div>
                       <button class="text-slate-500 hover:text-slate-800 transition-all">
                          <Icon name="lucide:download" size="20" />
                       </button>
                    </div>
                 </div>
              </div>

              <!-- Message Text -->
              <div v-if="msg.text" class="px-1 pr-14 relative">
                 <p class="leading-snug text-[#111b21]">{{ msg.text }}</p>
              </div>

              <!-- Status Footer -->
              <div class="absolute bottom-[2px] right-2 flex items-center justify-end gap-1 text-[#667781] bg-transparent pointer-events-none">
                 <span class="text-[11px] font-medium leading-none mt-1">{{ msg.time }}</span>
                 <div v-if="msg.isMe" class="flex ml-0.5 mt-0.5">
                    <Icon v-if="msg.status === 'sent'" name="lucide:check" size="14" />
                    <Icon v-else-if="msg.status === 'delivered'" name="lucide:check-check" size="14" />
                    <Icon v-else-if="msg.status === 'read'" name="lucide:check-check" size="14" class="text-[#53bDEB]" />
                 </div>
              </div>

              <!-- WhatsApp Tails -->
              <div v-if="msg.isMe" class="absolute top-0 -right-2 w-2 h-3 bg-[#dcf8c6] clip-path-bubble-right"></div>
              <div v-else class="absolute top-0 -left-2 w-2 h-3 bg-white clip-path-bubble-left"></div>
            </div>
          </div>
          <div ref="scrollAnchor"></div>
        </div>

        <!-- Robust Input Footer (WhatsApp Style) -->
        <footer class="px-4 py-2.5 bg-[#f0f2f5] z-20 flex items-end gap-3 relative min-h-[62px]">
           <!-- Attachment Menu Popup -->
           <transition name="pop">
              <div v-if="showAttachmentMenu" class="absolute bottom-[60px] left-14 w-52 bg-white rounded-2xl shadow-[0_2px_5px_0_rgba(11,20,26,.26)] py-3 px-4 flex flex-col gap-1 z-50">
                 <button v-for="item in attachmentTypes" :key="item.label" @click="handleAttachmentClick(item.type)" class="flex items-center gap-3 p-2 hover:bg-[#f5f6f6] rounded-lg transition-all group">
                    <div :class="['w-8 h-8 rounded-full flex items-center justify-center text-white shadow-sm', item.color]">
                       <Icon :name="item.icon" size="16" />
                    </div>
                    <span class="text-[15px] text-[#111b21]">{{ item.label }}</span>
                 </button>
              </div>
           </transition>

           <div class="flex gap-2 mb-2 text-[#54656f]">
             <button class="p-1 hover:text-slate-700 transition-all"><Icon name="lucide:smile" size="26" /></button>
             <button @click="showAttachmentMenu = !showAttachmentMenu" class="p-1 hover:text-slate-700 transition-all">
                <Icon name="lucide:paperclip" size="24" :class="['transition-transform duration-300', showAttachmentMenu ? 'rotate-45' : '']" />
             </button>
           </div>
           
           <div class="flex-1 bg-white rounded-lg flex items-center overflow-hidden mb-1.5 shadow-sm border border-transparent">
              <input 
                v-model="newMessageText"
                @keyup.enter="handleSend"
                type="text" 
                placeholder="Type a message" 
                class="flex-1 px-4 py-2 bg-white text-[15px] text-[#111b21] outline-none placeholder:text-[#8696a0]"
              />
           </div>
           
           <div class="mb-2 text-[#54656f]">
             <button 
               @click="handleSend"
               class="p-1 hover:text-slate-700 transition-all"
             >
                <Icon v-if="newMessageText.trim()" name="lucide:send" size="24" class="ml-1" />
                <Icon v-else name="lucide:mic" size="24" />
             </button>
           </div>
        </footer>
      </div>

      <!-- High-End Registry Waiting State -->
      <div v-else class="flex-1 flex flex-col items-center justify-center bg-[#F8F9FA] border-b-[6px] border-[#25D366]">
        <div class="p-8 text-center max-w-lg space-y-6">
          <div class="w-72 mx-auto">
             <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" class="w-20 h-20 mx-auto opacity-20 grayscale mb-6" />
          </div>
          <div class="space-y-3">
            <h2 class="text-[32px] font-light text-[#41525d]">WhatsApp Web</h2>
            <p class="text-[#8696a0] text-base leading-relaxed">
              Send and receive messages without keeping your phone online.<br/>
              Use WhatsApp on up to 4 linked devices and 1 phone at the same time.
            </p>
          </div>
          <div class="flex flex-col items-center gap-3 pt-10">
            <div class="flex items-center gap-1.5 px-6 py-3">
               <Icon name="lucide:lock" size="12" class="text-[#8696a0]" />
               <span class="text-xs text-[#8696a0]">End-to-end encrypted</span>
            </div>
          </div>
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
import { useUser } from '@/composables/modules/auth/user'

definePageMeta({
  layout: 'chat',
  middleware: 'auth'
})

const { chats, activeChatId, activeChat, sendMessage, markAsRead } = useChat()
const { uploadFile } = useUploadFile()
const { user } = useUser()

const newMessageText = ref('')
const scrollAnchor = ref(null)
const showAttachmentMenu = ref(false)
const fileInput = ref(null)
const currentUploadType = ref(null)

const attachmentTypes = [
  { type: 'image', label: 'Photos & videos', icon: 'lucide:image', color: 'bg-blue-500' },
  { type: 'pdf', label: 'Document', icon: 'lucide:file-text', color: 'bg-indigo-500' },
  { type: 'image', label: 'Camera', icon: 'lucide:camera', color: 'bg-rose-500' },
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
