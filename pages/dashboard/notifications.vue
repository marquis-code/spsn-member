<template>
  <div class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-slate-800 tracking-tight">Notifications</h1>
        <p class="text-slate-500 font-medium mt-1 text-sm">Stay updated with the latest activity in the scientific network.</p>
      </div>
      <button @click="markAllAsRead" class="px-6 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:border-[#003366] hover:text-[#003366] transition-all">
        Mark all as read
      </button>
    </div>

    <div class="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm">
      <div class="divide-y divide-slate-50">
        <div v-if="notifications.length === 0" class="p-20 text-center">
           <div class="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
             <Icon name="lucide:bell-off" size="32" class="text-slate-200" />
           </div>
           <h3 class="text-lg font-bold text-slate-800">No Notifications Yet</h3>
           <p class="text-sm text-slate-400 mt-2">When you receive updates, they will appear here.</p>
        </div>

        <div 
          v-for="notif in notifications" 
          :key="notif.id"
          class="p-8 hover:bg-slate-50/50 transition-all flex gap-6 items-start group"
          :class="{ 'bg-blue-50/20': !notif.read }"
        >
          <div :class="[
            'w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border shadow-sm transition-transform group-hover:scale-110',
            notif.type === 'success' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
            notif.type === 'warning' ? 'bg-amber-50 text-amber-600 border-amber-100' :
            notif.type === 'error' ? 'bg-rose-50 text-rose-600 border-rose-100' :
            'bg-blue-50 text-blue-600 border-blue-100'
          ]">
            <Icon :name="getIcon(notif.type)" size="24" />
          </div>

          <div class="flex-1 space-y-2">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <h4 class="text-base font-bold text-slate-800">{{ notif.title }}</h4>
                <span v-if="!notif.read" class="px-2 py-0.5 bg-brand-cyan text-[#003366] text-[9px] font-black rounded-full tracking-widest">New</span>
              </div>
              <span class="text-xs font-medium text-slate-400">{{ notif.time }}</span>
            </div>
            <p class="text-sm text-slate-500 leading-relaxed max-w-3xl">{{ notif.message }}</p>
            
            <div class="pt-4 flex items-center gap-4">
               <button @click="markAsRead(notif.id)" v-if="!notif.read" class="text-[10px] font-black text-brand-cyan hover:underline">Mark as read</button>
               <button class="text-[10px] font-black text-slate-400 hover:text-slate-800 transition-colors">Archive</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useNotifications } from '@/composables/useNotifications'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

const { notifications, markAsRead, markAllAsRead } = useNotifications()

const getIcon = (type) => {
  switch (type) {
    case 'success': return 'lucide:check-circle'
    case 'warning': return 'lucide:alert-triangle'
    case 'error': return 'lucide:x-circle'
    default: return 'lucide:info'
  }
}
</script>

<style scoped>
.animate-in {
  animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
