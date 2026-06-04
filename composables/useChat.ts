import { ref, computed, onMounted, onUnmounted } from 'vue'
import { io, Socket } from 'socket.io-client'
import { useRuntimeConfig } from '#app'
import { useUser } from '@/composables/useUser'

export type AttachmentType = 'image' | 'video' | 'audio' | 'pdf' | 'document'

export interface Attachment {
  type: AttachmentType
  url: string
  name: string
  size?: string
}

export interface Message {
  id: string
  _id?: string
  senderId: string
  text?: string
  time: string
  isMe: boolean
  attachments?: Attachment[]
  status: 'sent' | 'delivered' | 'read'
  createdAt?: string
}

export interface Chat {
  id: string
  name: string
  avatar: string
  lastMessage: string
  time: string
  unreadCount: number
  status: 'online' | 'offline' | 'away'
  messages: Message[]
}

const chats = ref<Chat[]>([
  {
    id: 'support-nexus',
    name: 'SCPSN Support Nexus',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg',
    lastMessage: 'Connecting securely to the registry...',
    time: '',
    unreadCount: 0,
    status: 'online',
    messages: []
  }
])

const activeChatId = ref<string | null>(null)
let socket: Socket | null = null

export const useChat = () => {
  const config = useRuntimeConfig()
  const { user } = useUser()
  const apiBase = config.public.apiBase || 'https://spsn-backend.onrender.com/api'
  
  const activeChat = computed(() => chats.value.find(c => c.id === activeChatId.value))

  const formatTime = (timestamp?: string) => {
    if (!timestamp) return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  onMounted(() => {
    if (socket) return // Already connected
    
    // Ensure we have a user
    const roomId = user.value?._id || 'guest-' + Math.random().toString(36).substring(7)
    const senderName = user.value ? `${user.value.firstName} ${user.value.lastName}` : 'Guest User'
    const userEmail = user.value?.email || 'guest@example.com'

    // Configure Socket
    const baseUrl = apiBase.replace('/api', '')
    socket = io(`${baseUrl}/chat`, {
      transports: ['websocket', 'polling']
    })

    socket.on('connect', () => {
      // User joins their specific room
      socket?.emit('userJoin', {
        roomId: roomId,
        senderName: senderName,
        email: userEmail
      })
    })

    socket.on('roomHistory', ({ messages: msgs }) => {
      const nexusChat = chats.value.find(c => c.id === 'support-nexus')
      if (nexusChat && msgs && Array.isArray(msgs)) {
        nexusChat.messages = msgs.map((m: any) => ({
          id: m._id,
          _id: m._id,
          senderId: m.sender === 'user' ? 'me' : 'admin',
          text: m.text,
          time: formatTime(m.createdAt),
          isMe: m.sender === 'user',
          attachments: m.attachments,
          status: m.status || 'sent',
          createdAt: m.createdAt
        }))
        
        if (nexusChat.messages.length > 0) {
          const lastM = nexusChat.messages[nexusChat.messages.length - 1]
          nexusChat.lastMessage = lastM.text || (lastM.attachments?.length ? 'Attachment' : '')
          nexusChat.time = formatTime(lastM.createdAt)
        } else {
          nexusChat.lastMessage = 'You are securely connected.'
        }
      }
    })

    socket.on('messageReceived', (msg: any) => {
      const nexusChat = chats.value.find(c => c.id === 'support-nexus')
      if (nexusChat && msg.roomId === roomId) {
        nexusChat.messages.push({
          id: msg._id,
          _id: msg._id,
          senderId: msg.sender === 'user' ? 'me' : 'admin',
          text: msg.text,
          time: formatTime(msg.createdAt),
          isMe: msg.sender === 'user',
          attachments: msg.attachments,
          status: msg.status || 'sent',
          createdAt: msg.createdAt
        })
        nexusChat.lastMessage = msg.text || 'Attachment'
        nexusChat.time = formatTime(msg.createdAt)
        
        if (activeChatId.value !== 'support-nexus') {
          nexusChat.unreadCount++
        } else {
          // If active, tell admin we read it
          socket?.emit('messageRead', { messageId: msg._id, roomId })
        }
      }
    })

    socket.on('statusUpdated', ({ messageId, status }) => {
      const nexusChat = chats.value.find(c => c.id === 'support-nexus')
      if (nexusChat) {
        const msg = nexusChat.messages.find(m => m.id === messageId || m._id === messageId)
        if (msg) msg.status = status
      }
    })
  })

  onUnmounted(() => {
    // Only disconnect if we are leaving the whole app, but typically SPA keeps it alive.
    // For now we leave it persistent or handle it globally.
  })

  const sendMessage = (chatId: string, text?: string, attachments?: Attachment[]) => {
    const chat = chats.value.find(c => c.id === chatId)
    const roomId = user.value?._id || 'guest-room'
    const senderName = user.value ? `${user.value.firstName} ${user.value.lastName}` : 'Guest User'
    
    if (chat && (text?.trim() || (attachments && attachments.length > 0))) {
      socket?.emit('userMessage', {
        roomId: roomId,
        message: text || '',
        senderName: senderName,
        attachments: attachments || [],
        email: user.value?.email || 'guest@example.com'
      })
    }
  }

  const markAsRead = (chatId: string) => {
    const chat = chats.value.find(c => c.id === chatId)
    if (chat) {
      chat.unreadCount = 0
      const roomId = user.value?._id || 'guest-room'
      socket?.emit('markRoomAsRead', { roomId })
    }
  }

  return {
    chats,
    activeChatId,
    activeChat,
    sendMessage,
    markAsRead
  }
}
