import { ref, computed } from 'vue'

export interface Notification {
  id: string
  title: string
  message: string
  time: string
  type: 'info' | 'success' | 'warning' | 'error'
  read: boolean
}

const notifications = ref<Notification[]>([
  {
    id: '1',
    title: 'Membership Renewal',
    message: 'Your membership for the 2026 cycle has been successfully validated.',
    time: '2 hours ago',
    type: 'success',
    read: false
  },
  {
    id: '2',
    title: 'Abstract Submission',
    message: 'Your research paper #AB-2045 is now under review by the scientific committee.',
    time: '5 hours ago',
    type: 'info',
    read: false
  },
  {
    id: '3',
    title: 'Payment Reminder',
    message: 'The early bird registration for the Winter Conference ends in 48 hours.',
    time: 'Yesterday',
    type: 'warning',
    read: true
  }
])

export const useNotifications = () => {
  const unreadCount = computed(() => notifications.value.filter(n => !n.read).length)

  const markAsRead = (id: string) => {
    const notification = notifications.value.find(n => n.id === id)
    if (notification) {
      notification.read = true
    }
  }

  const markAllAsRead = () => {
    notifications.value.forEach(n => n.read = true)
  }

  const addNotification = (notif: Omit<Notification, 'id' | 'read' | 'time'>) => {
    const newNotif: Notification = {
      ...notif,
      id: Math.random().toString(36).substring(7),
      read: false,
      time: 'Just now'
    }
    notifications.value.unshift(newNotif)
    playNotificationSound()
  }

  const playNotificationSound = () => {
    if (typeof window !== 'undefined') {
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3')
      audio.play().catch(e => console.error('Audio play failed', e))
    }
  }

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    addNotification,
    playNotificationSound
  }
}
