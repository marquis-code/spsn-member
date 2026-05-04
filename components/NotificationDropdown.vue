<template>
  <div class="absolute right-0 mt-4 w-96 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-[100] animate-in fade-in zoom-in-95 duration-200 origin-top-right">
    <div class="p-6 border-b border-slate-50 flex items-center justify-between">
      <h3 class="text-base font-bold text-slate-800">Notifications</h3>
      <button @click="markAllAsRead" class="text-[10px] font-black uppercase tracking-widest text-brand-cyan hover:text-[#003366] transition-colors">Mark all as read</button>
    </div>
    
    <div class="max-h-[400px] overflow-y-auto custom-scrollbar-light">
      <div v-if="notifications.length === 0" class="p-12 text-center">
        <Icon name="lucide:bell-off" size="32" class="text-slate-200 mx-auto mb-3" />
        <p class="text-xs font-bold text-slate-400">No new notifications</p>
      </div>
      
      <div 
        v-for="notif in notifications" 
        :key="notif.id"
        @click="handleSelect(notif)"
        class="p-5 hover:bg-slate-50 cursor-pointer transition-colors border-b border-slate-50 last:border-none flex gap-4 items-start"
        :class="{ 'bg-blue-50/30': !notif.read }"
      >
        <div :class="[
          'w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border',
          notif.type === 'success' ? 'bg-emerald-50 text-emerald-500 border-emerald-100' :
          notif.type === 'warning' ? 'bg-amber-50 text-amber-500 border-amber-100' :
          notif.type === 'error' ? 'bg-rose-50 text-rose-500 border-rose-100' :
          'bg-blue-50 text-blue-500 border-blue-100'
        ]">
          <Icon :name="getIcon(notif.type)" size="18" />
        </div>
        <div class="space-y-1 flex-1">
          <div class="flex items-center justify-between">
            <h4 class="text-sm font-bold text-slate-800">{{ notif.title }}</h4>
            <span class="text-[10px] font-medium text-slate-400">{{ notif.time }}</span>
          </div>
          <p class="text-xs text-slate-500 leading-relaxed line-clamp-2">{{ notif.message }}</p>
        </div>
        <div v-if="!notif.read" class="w-2 h-2 bg-brand-cyan rounded-full mt-1.5 shrink-0"></div>
      </div>
    </div>
    
    <NuxtLink 
      to="/dashboard/notifications" 
      class="block p-4 text-center text-xs font-bold text-slate-500 hover:bg-slate-50 hover:text-[#003366] transition-all bg-slate-50/50"
      @click="$emit('close')"
    >
      View all notifications
    </NuxtLink>
  </div>
</template>

<script setup>
import { useNotifications } from '@/composables/useNotifications'

const emit = defineEmits(['close', 'select'])
const { notifications, markAsRead, markAllAsRead } = useNotifications()

const getIcon = (type) => {
  switch (type) {
    case 'success': return 'lucide:check-circle'
    case 'warning': return 'lucide:alert-triangle'
    case 'error': return 'lucide:x-circle'
    default: return 'lucide:info'
  }
}

const handleSelect = (notif) => {
  markAsRead(notif.id)
  emit('select', notif)
}
</script>

<style scoped>
.custom-scrollbar-light::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar-light::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar-light::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
}
</style>
