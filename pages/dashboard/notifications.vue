<template>
  <div class="space-y-8 pb-20 font-body">

    <!-- ─── PAGE HEADER ─────────────────────────────────────── -->
    <section class="border-b border-slate-100">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">
        <div class="flex items-start justify-between gap-6">
          <div class="max-w-xl">
            <div class="inline-flex items-center gap-2 bg-blue-50 text-[#1d4e89] text-xs font-semibold px-4 py-2 rounded-full mb-5 border border-blue-100">
              <LucideBell :size="13" />
              Activity Feed
            </div>
            <h1 class="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight tracking-tight mb-2">
              Notifications
            </h1>
            <p class="text-[14px] text-slate-500 leading-relaxed">
              Stay updated with the latest activity in the scientific network.
            </p>
          </div>

          <div class="flex items-center gap-3 shrink-0 pt-2">
            <span
              v-if="unreadCount > 0"
              class="inline-flex items-center gap-1.5 bg-blue-50 text-[#1d4e89] text-[11px] font-bold px-3 py-1.5 rounded-full border border-blue-100"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-[#1d4e89] animate-pulse" />
              {{ unreadCount }} unread
            </span>
            <button
              @click="markAllAsRead"
              class="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-600 text-[13px] font-semibold px-5 py-2.5 rounded-xl hover:border-[#1d4e89] hover:text-[#1d4e89] transition-all duration-200"
            >
              <LucideCheckCheck :size="14" />
              Mark all read
            </button>
          </div>
        </div>
      </div>
    </section>


    <!-- ─── FILTER STRIP ─────────────────────────────────────── -->
    <section class="bg-slate-50 border-b border-slate-100 sticky top-0 z-10">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div class="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            v-for="f in filters"
            :key="f.value"
            @click="activeFilter = f.value"
            :class="[
              'shrink-0 inline-flex items-center gap-1.5 text-[12px] font-semibold px-4 py-2 rounded-lg transition-all duration-200',
              activeFilter === f.value
                ? 'bg-white text-[#1d4e89] border border-blue-200 shadow-sm'
                : 'text-slate-400 hover:text-slate-600'
            ]"
          >
            <component :is="f.icon" :size="12" />
            {{ f.label }}
          </button>
        </div>
      </div>
    </section>


    <!-- ─── NOTIFICATION LIST ─────────────────────────────────── -->
    <section class="bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <!-- Empty state -->
        <div
          v-if="filteredNotifications.length === 0"
          class="bg-white border border-slate-200 rounded-2xl p-20 text-center"
        >
          <div class="w-16 h-16 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <LucideBellOff :size="26" class="text-slate-300" />
          </div>
          <p class="text-[11px] font-semibold text-slate-400 tracking-widest uppercase mb-2">All clear</p>
          <h3 class="text-[18px] font-bold text-slate-800 mb-2">No notifications</h3>
          <p class="text-[13px] text-slate-400">When you receive updates, they will appear here.</p>
        </div>

        <!-- List -->
        <div
          v-else
          class="bg-white border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100"
        >
          <div
            v-for="notif in filteredNotifications"
            :key="notif.id"
            class="group flex items-start gap-5 p-6 hover:bg-slate-50/60 transition-all duration-200"
            :class="{ 'bg-blue-50/20': !notif.read }"
          >
            <!-- Unread dot -->
            <div class="shrink-0 pt-1">
              <span
                class="block w-2 h-2 rounded-full transition-all"
                :class="notif.read ? 'bg-transparent' : 'bg-[#1d4e89]'"
              />
            </div>

            <!-- Icon -->
            <div
              class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-transform duration-200 group-hover:scale-105"
              :class="iconColors(notif.type).wrapper"
            >
              <component :is="getIcon(notif.type)" :size="17" :class="iconColors(notif.type).icon" />
            </div>

            <!-- Content -->
            <div class="flex-1 min-w-0">
              <div class="flex items-start justify-between gap-4 mb-1">
                <div class="flex items-center gap-2 flex-wrap">
                  <h4 class="text-[14px] font-bold text-slate-800">{{ notif.title }}</h4>
                  <span
                    v-if="!notif.read"
                    class="text-[9px] font-black tracking-widest uppercase bg-[#1d4e89] text-white px-2 py-0.5 rounded-full"
                  >
                    New
                  </span>
                </div>
                <span class="text-[11px] font-medium text-slate-400 shrink-0">{{ notif.time }}</span>
              </div>

              <p class="text-[13px] text-slate-500 leading-relaxed mb-3">{{ notif.message }}</p>

              <div class="flex items-center gap-4">
                <button
                  v-if="!notif.read"
                  @click="markAsRead(notif.id)"
                  class="text-[11px] font-bold text-[#1d4e89] hover:underline"
                >
                  Mark as read
                </button>
                <button class="text-[11px] font-bold text-slate-400 hover:text-slate-700 transition-colors">
                  Archive
                </button>
                <div
                  v-if="!notif.read"
                  class="text-[10px] font-semibold px-2 py-0.5 rounded-md border"
                  :class="iconColors(notif.type).badge"
                >
                  {{ notif.type }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer note -->
        <p class="text-center text-[11px] text-slate-400 font-medium mt-6">
          Showing {{ filteredNotifications.length }} of {{ notifications.length }} notifications
        </p>
      </div>
    </section>

  </div>
</template>


<script setup>
import {
  LucideBell,
  LucideBellOff,
  LucideCheckCheck,
  LucideCheckCircle,
  LucideAlertTriangle,
  LucideXCircle,
  LucideInfo,
  LucideFilter,
  LucideInbox,
  LucideAlertCircle,
  LucideShieldCheck,
} from 'lucide-vue-next'
import { ref, computed } from 'vue'
import { useNotifications } from '@/composables/useNotifications'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

const { notifications, markAsRead, markAllAsRead } = useNotifications()

const activeFilter = ref('all')

const filters = [
  { label: 'All',     value: 'all',     icon: LucideInbox        },
  { label: 'Unread',  value: 'unread',  icon: LucideBell         },
  { label: 'Success', value: 'success', icon: LucideCheckCircle  },
  { label: 'Warning', value: 'warning', icon: LucideAlertTriangle },
  { label: 'Error',   value: 'error',   icon: LucideXCircle      },
  { label: 'Info',    value: 'info',    icon: LucideInfo         },
]

const filteredNotifications = computed(() => {
  if (activeFilter.value === 'all') return notifications.value
  if (activeFilter.value === 'unread') return notifications.value.filter(n => !n.read)
  return notifications.value.filter(n => n.type === activeFilter.value)
})

const unreadCount = computed(() => notifications.value.filter(n => !n.read).length)

const getIcon = (type) => {
  switch (type) {
    case 'success': return LucideCheckCircle
    case 'warning': return LucideAlertTriangle
    case 'error':   return LucideXCircle
    default:        return LucideInfo
  }
}

const iconColors = (type) => {
  switch (type) {
    case 'success':
      return {
        wrapper: 'bg-emerald-50 border-emerald-100',
        icon: 'text-emerald-600',
        badge: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      }
    case 'warning':
      return {
        wrapper: 'bg-amber-50 border-amber-100',
        icon: 'text-amber-600',
        badge: 'bg-amber-50 text-amber-600 border-amber-100',
      }
    case 'error':
      return {
        wrapper: 'bg-rose-50 border-rose-100',
        icon: 'text-rose-600',
        badge: 'bg-rose-50 text-rose-600 border-rose-100',
      }
    default:
      return {
        wrapper: 'bg-blue-50 border-blue-100',
        icon: 'text-[#1d4e89]',
        badge: 'bg-blue-50 text-[#1d4e89] border-blue-100',
      }
  }
}
</script>


<style scoped>
.font-body {
  font-family: 'DM Sans', 'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif;
}

.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>