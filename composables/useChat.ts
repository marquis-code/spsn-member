import { ref, computed } from 'vue'

export type AttachmentType = 'image' | 'video' | 'audio' | 'pdf' | 'document'

export interface Attachment {
  type: AttachmentType
  url: string
  name: string
  size?: string
}

export interface Message {
  id: string
  senderId: string
  text?: string
  time: string
  isMe: boolean
  attachments?: Attachment[]
  status: 'sent' | 'delivered' | 'read'
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
    id: 'admin-1',
    name: 'Scientific Admin',
    avatar: '',
    lastMessage: 'Your credentials have been verified.',
    time: '10:45 AM',
    unreadCount: 1,
    status: 'online',
    messages: [
      { id: 'm1', senderId: 'admin-1', text: 'Hello! Welcome to the SCPSN member portal.', time: '09:00 AM', isMe: false, status: 'read' },
      { id: 'm2', senderId: 'me', text: 'Thank you! I have some questions about my abstract.', time: '10:00 AM', isMe: true, status: 'read' },
      { 
        id: 'm3', 
        senderId: 'admin-1', 
        text: 'Your credentials have been verified. Please see the attached guidelines.', 
        time: '10:45 AM', 
        isMe: false, 
        status: 'read',
        attachments: [
          { type: 'pdf', name: 'Registration_Guidelines_2026.pdf', url: '#', size: '1.2MB' }
        ]
      }
    ]
  },
  {
    id: 'member-2',
    name: 'Dr. Sarah Johnson',
    avatar: '',
    lastMessage: 'Are you attending the conference?',
    time: 'Yesterday',
    unreadCount: 0,
    status: 'away',
    messages: [
      { id: 'm4', senderId: 'member-2', text: 'Hi! Are you attending the conference?', time: 'Yesterday', isMe: false, status: 'read' }
    ]
  },
  {
    id: 'group-1',
    name: 'Cytopathology Research Group',
    avatar: '',
    lastMessage: 'New research assets uploaded.',
    time: 'Mon',
    unreadCount: 3,
    status: 'online',
    messages: [
      { id: 'm5', senderId: 'member-3', text: 'Check out these morphology samples.', time: 'Mon', isMe: false, status: 'read',
        attachments: [
          { type: 'image', name: 'cell_sample_01.jpg', url: 'https://images.unsplash.com/photo-1579154273821-3968303d8d51?q=80&w=2070&auto=format&fit=crop' }
        ]
      }
    ]
  }
])

const activeChatId = ref<string | null>(null)

export const useChat = () => {
  const activeChat = computed(() => chats.value.find(c => c.id === activeChatId.value))

  const sendMessage = (chatId: string, text?: string, attachments?: Attachment[]) => {
    const chat = chats.value.find(c => c.id === chatId)
    if (chat && (text?.trim() || (attachments && attachments.length > 0))) {
      const newMessage: Message = {
        id: Date.now().toString(),
        senderId: 'me',
        text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: true,
        attachments,
        status: 'sent'
      }
      chat.messages.push(newMessage)
      chat.lastMessage = text || (attachments ? `Sent ${attachments[0].type}` : '')
      chat.time = newMessage.time
      
      // Simulate delivery/read
      setTimeout(() => { newMessage.status = 'delivered' }, 1000)
      setTimeout(() => { newMessage.status = 'read' }, 3000)
    }
  }

  const markAsRead = (chatId: string) => {
    const chat = chats.value.find(c => c.id === chatId)
    if (chat) {
      chat.unreadCount = 0
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
