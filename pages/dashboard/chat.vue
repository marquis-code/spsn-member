<template>
  <div class="h-full flex overflow-hidden font-body">

    <!-- ─── SIDEBAR ────────────────────────────────────────────── -->
    <aside class="w-80 lg:w-96 border-r border-slate-200 flex flex-col bg-white shrink-0">

      <!-- Sidebar header -->
      <div class="px-5 py-4 border-b border-slate-100 bg-white shrink-0 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-slate-100 overflow-hidden border border-slate-200">
            <img v-if="user?.avatar" :src="user.avatar" class="w-full h-full object-cover" />
            <div v-else class="w-full h-full flex items-center justify-center text-[12px] font-bold text-slate-500">
              {{ user?.fullName?.split(' ').map(n => n[0]).join('').substring(0, 2) || 'ME' }}
            </div>
          </div>
          <div>
            <p class="text-[13px] font-bold text-slate-800 leading-none">{{ user?.fullName?.split(' ')[0] || 'My' }} Chats</p>
            <p class="text-[11px] font-semibold text-blue-600 tracking-widest uppercase mt-0.5">SCPSN Network</p>
          </div>
        </div>
        <div class="flex items-center gap-1">
          <button class="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-all duration-200">
            <LucideUsers :size="16" />
          </button>
          <button class="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-all duration-200">
            <LucideMessageSquare :size="16" />
          </button>
          <button class="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-all duration-200">
            <LucideMoreVertical :size="16" />
          </button>
        </div>
      </div>

      <!-- Search -->
      <div class="px-4 py-3 border-b border-slate-100 bg-white">
        <div class="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 h-9 focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-50 transition-all duration-200">
          <LucideSearch :size="14" class="text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search conversations..."
            class="flex-1 bg-transparent text-[13px] text-slate-800 placeholder:text-slate-400 outline-none"
          />
        </div>
      </div>

      <!-- Chat list -->
      <div class="flex-1 overflow-y-auto custom-scrollbar">
        <div
          v-for="chat in chats"
          :key="chat.id"
          @click="selectChat(chat)"
          class="px-4 py-3 cursor-pointer transition-all duration-150 flex gap-3 items-center border-b border-slate-50"
          :class="activeChatId === chat.id ? 'bg-blue-50/60' : 'hover:bg-slate-50 bg-white'"
        >
          <!-- Avatar -->
          <div class="relative shrink-0">
            <div
              class="w-11 h-11 rounded-xl flex items-center justify-center font-bold text-[13px] overflow-hidden border"
              :class="activeChatId === chat.id ? 'border-blue-200 bg-blue-50 text-[#1d4e89]' : 'border-slate-200 bg-slate-100 text-slate-500'"
            >
              <img v-if="chat.avatar" :src="chat.avatar" class="w-full h-full object-cover" />
              <span v-else>{{ chat.name.split(' ').map(n => n[0]).join('').substring(0, 2) }}</span>
            </div>
            <span
              v-if="chat.status === 'online'"
              class="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-white rounded-full"
            ></span>
          </div>

          <!-- Meta -->
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between mb-0.5">
              <h4 class="text-[14px] font-bold text-slate-800 truncate"
                :class="activeChatId === chat.id ? 'text-[#1d4e89]' : ''">
                {{ chat.name }}
              </h4>
              <span class="text-[11px] font-medium text-slate-400 flex-shrink-0 ml-2">{{ chat.time }}</span>
            </div>
            <div class="flex items-center justify-between">
              <p class="text-[12px] text-slate-400 truncate">{{ chat.lastMessage }}</p>
              <div
                v-if="chat.unreadCount > 0 && activeChatId !== chat.id"
                class="w-5 h-5 bg-[#1d4e89] text-white text-[10px] font-bold rounded-full flex items-center justify-center shrink-0 ml-2"
              >
                {{ chat.unreadCount }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>


    <!-- ─── MAIN CHAT WINDOW ───────────────────────────────────── -->
    <main class="flex-1 flex flex-col bg-slate-50 relative overflow-hidden">
      <div v-if="activeChat" class="flex flex-col h-full">

        <!-- Chat header -->
        <header class="px-6 py-3.5 bg-white border-b border-slate-100 flex items-center justify-between shrink-0">
          <div class="flex items-center gap-3 cursor-pointer">
            <div class="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center font-bold text-[13px] text-[#1d4e89] overflow-hidden">
              <img v-if="activeChat.avatar" :src="activeChat.avatar" class="w-full h-full object-cover" />
              <span v-else>{{ activeChat.name.split(' ').map(n => n[0]).join('').substring(0, 2) }}</span>
            </div>
            <div>
              <h3 class="text-[14px] font-bold text-slate-800 leading-none">{{ activeChat.name }}</h3>
              <div class="flex items-center gap-1.5 mt-1">
                <span
                  class="w-1.5 h-1.5 rounded-full"
                  :class="activeChat.status === 'online' ? 'bg-emerald-400' : 'bg-slate-300'"
                ></span>
                <span class="text-[11px] font-semibold text-slate-400">
                  {{ activeChat.status === 'online' ? 'Online' : 'Offline' }}
                </span>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-1">
            <button class="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-all duration-200">
              <LucideVideo :size="16" />
            </button>
            <button class="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-all duration-200">
              <LucideSearch :size="16" />
            </button>
            <button class="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-all duration-200">
              <LucideMoreVertical :size="16" />
            </button>
          </div>
        </header>

        <!-- Messages viewport -->
        <div class="flex-1 overflow-y-auto px-6 lg:px-16 py-6 space-y-2 custom-scrollbar bg-slate-50">
          <div
            v-for="msg in activeChat.messages"
            :key="msg.id"
            class="flex w-full"
            :class="msg.isMe ? 'justify-end' : 'justify-start'"
          >
            <div
              class="max-w-[85%] lg:max-w-[60%] px-3 pt-2 pb-2 rounded-2xl relative text-[14px] shadow-sm"
              :class="msg.isMe
                ? 'bg-[#1d4e89] text-white rounded-tr-sm'
                : 'bg-white text-slate-800 border border-slate-100 rounded-tl-sm'"
            >
              <!-- Attachments -->
              <div v-if="msg.attachments && msg.attachments.length > 0" class="space-y-1.5 mb-1.5">
                <div v-for="(att, i) in msg.attachments" :key="i" class="rounded-xl overflow-hidden">
                  <div v-if="att.type === 'image'">
                    <img :src="att.url" class="w-full max-h-[260px] object-cover rounded-xl cursor-zoom-in" />
                  </div>
                  <div v-else class="flex items-center gap-3 p-3 rounded-xl"
                    :class="msg.isMe ? 'bg-white/10' : 'bg-slate-50 border border-slate-100'">
                    <div class="w-9 h-9 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <LucideFileText :size="16" class="text-white" />
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="text-[13px] font-semibold truncate" :class="msg.isMe ? 'text-white' : 'text-slate-800'">{{ att.name }}</p>
                      <p class="text-[11px] mt-0.5" :class="msg.isMe ? 'text-white/60' : 'text-slate-400'">{{ att.size || '1.2 MB' }} · {{ att.type }}</p>
                    </div>
                    <button class="transition-all" :class="msg.isMe ? 'text-white/70 hover:text-white' : 'text-slate-400 hover:text-slate-700'">
                      <LucideDownload :size="16" />
                    </button>
                  </div>
                </div>
              </div>

              <!-- Text -->
              <div v-if="msg.text" class="pr-14 leading-snug">
                <p>{{ msg.text }}</p>
              </div>

              <!-- Time + status -->
              <div class="absolute bottom-1.5 right-2.5 flex items-center gap-1 pointer-events-none">
                <span class="text-[10px] font-medium" :class="msg.isMe ? 'text-white/60' : 'text-slate-400'">{{ msg.time }}</span>
                <div v-if="msg.isMe" class="ml-0.5">
                  <LucideCheck v-if="msg.status === 'sent'" :size="12" class="text-white/60" />
                  <LucideCheckCheck v-else-if="msg.status === 'delivered'" :size="12" class="text-white/60" />
                  <LucideCheckCheck v-else-if="msg.status === 'read'" :size="12" class="text-blue-200" />
                </div>
              </div>
            </div>
          </div>
          <div ref="scrollAnchor"></div>
        </div>

        <!-- Input footer -->
        <footer class="px-5 py-3.5 bg-white border-t border-slate-100 flex items-end gap-3 relative shrink-0">

          <!-- Attachment popup -->
          <transition name="pop">
            <div v-if="showAttachmentMenu"
              class="absolute bottom-[68px] left-14 bg-white border border-slate-200 rounded-2xl shadow-sm py-2 px-2 flex flex-col gap-0.5 z-50 w-48">
              <button
                v-for="item in attachmentTypes"
                :key="item.label"
                @click="handleAttachmentClick(item.type)"
                class="flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 rounded-xl transition-all duration-150 group"
              >
                <div class="w-8 h-8 rounded-xl flex items-center justify-center text-white" :class="item.color">
                  <component :is="item.iconComponent" :size="15" />
                </div>
                <span class="text-[13px] font-semibold text-slate-700">{{ item.label }}</span>
              </button>
            </div>
          </transition>

          <!-- Left icons -->
          <div class="flex gap-1 mb-1.5">
            <button class="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-all duration-200">
              <LucideSmile :size="18" />
            </button>
            <button
              @click="showAttachmentMenu = !showAttachmentMenu"
              class="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-[#1d4e89] transition-all duration-200"
              :class="showAttachmentMenu ? 'bg-blue-50 text-[#1d4e89]' : ''"
            >
              <LucidePaperclip :size="18" :class="['transition-transform duration-300', showAttachmentMenu ? 'rotate-45' : '']" />
            </button>
          </div>

          <!-- Input -->
          <div class="flex-1 bg-slate-50 border border-slate-200 rounded-xl flex items-center overflow-hidden focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-50 transition-all duration-200 mb-1.5">
            <input
              v-model="newMessageText"
              @keyup.enter="handleSend"
              type="text"
              placeholder="Type a message..."
              class="flex-1 px-4 py-2.5 bg-transparent text-[14px] text-slate-800 placeholder:text-slate-400 outline-none"
            />
          </div>

          <!-- Send / mic -->
          <button
            @click="handleSend"
            class="w-9 h-9 rounded-xl mb-1.5 flex items-center justify-center transition-all duration-200 flex-shrink-0"
            :class="newMessageText.trim() ? 'bg-[#1d4e89] hover:bg-blue-800 text-white' : 'hover:bg-slate-100 text-slate-400 hover:text-slate-700'"
          >
            <LucideSend v-if="newMessageText.trim()" :size="16" />
            <LucideMic v-else :size="18" />
          </button>
        </footer>
      </div>

      <!-- Empty / waiting state -->
      <div v-else class="flex-1 flex flex-col items-center justify-center bg-slate-50">
        <div class="text-center max-w-sm space-y-5">
          <div class="w-16 h-16 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center mx-auto">
            <LucideMessageSquare :size="28" class="text-[#1d4e89]" />
          </div>
          <div>
            <p class="text-[11px] font-semibold text-blue-600 tracking-widest uppercase mb-2">SCPSN Messaging</p>
            <h2 class="text-[22px] font-bold text-slate-800 mb-2">Select a conversation</h2>
            <p class="text-[14px] text-slate-400 leading-relaxed">
              Choose a contact from the sidebar to start messaging members of the scientific network.
            </p>
          </div>
          <div class="inline-flex items-center gap-2 bg-slate-100 text-slate-500 text-[11px] font-semibold px-4 py-2 rounded-full">
            <LucideLock :size="11" />
            End-to-end encrypted
          </div>
        </div>
      </div>
    </main>

    <!-- Hidden file input -->
    <input type="file" ref="fileInput" class="hidden" @change="handleFileUpload" />
  </div>
</template>


<script setup>
import {
  LucideUsers,
  LucideMessageSquare,
  LucideMoreVertical,
  LucideSearch,
  LucideVideo,
  LucideCheck,
  LucideCheckCheck,
  LucideFileText,
  LucideDownload,
  LucideSmile,
  LucidePaperclip,
  LucideSend,
  LucideMic,
  LucideLock,
  LucideImage,
  LucideCamera,
} from 'lucide-vue-next'
import { ref, onMounted, nextTick, watch } from 'vue'
import { useChat } from '@/composables/useChat'
import { useUploadFile } from '@/composables/useUploadFile'
import { useUser } from '@/composables/modules/auth/user'

definePageMeta({ layout: 'chat', middleware: 'auth' })

const { chats, activeChatId, activeChat, sendMessage, markAsRead } = useChat()
const { uploadFile } = useUploadFile()
const { user } = useUser()

const newMessageText = ref('')
const scrollAnchor = ref(null)
const showAttachmentMenu = ref(false)
const fileInput = ref(null)
const currentUploadType = ref(null)

const attachmentTypes = [
  { type: 'image',    label: 'Photos & Videos', iconComponent: LucideImage,    color: 'bg-[#1d4e89]' },
  { type: 'pdf',      label: 'Document',         iconComponent: LucideFileText, color: 'bg-teal-600'   },
  { type: 'image',   label: 'Camera',            iconComponent: LucideCamera,   color: 'bg-rose-500'   },
]

const selectChat = (chat) => {
  activeChatId.value = chat.id
  markAsRead(chat.id)
  scrollToBottom()
}

const handleSend = () => {
  if (activeChatId.value && newMessageText.value.trim()) {
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
      url,
      size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
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

watch(activeChatId, () => { if (activeChatId.value) scrollToBottom() })
onMounted(() => { if (activeChatId.value) scrollToBottom() })
</script>


<style scoped>
.font-body {
  font-family: 'DM Sans', 'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif;
}

.pop-enter-active { animation: pop-in 0.25s cubic-bezier(0.16, 1, 0.3, 1); }
.pop-leave-active { animation: pop-in 0.15s cubic-bezier(0.16, 1, 0.3, 1) reverse; }

@keyframes pop-in {
  from { opacity: 0; transform: scale(0.85) translateY(12px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}

.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
</style>