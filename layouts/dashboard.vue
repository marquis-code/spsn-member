<template>
  <div class="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 flex overflow-hidden relative">
    <!-- Mobile Sidebar Overlay -->
    <div 
      v-if="isSidebarOpen" 
      @click="isSidebarOpen = false" 
      class="fixed inset-0 bg-brand-dark/40 backdrop-blur-sm z-[60] lg:hidden transition-opacity duration-300"
    ></div>

    <!-- Sidebar -->
    <aside 
      :class="[
        'w-72 bg-[#003366] text-white flex-shrink-0 flex flex-col h-screen fixed lg:sticky top-0 z-[70] transition-transform duration-300 ease-in-out lg:translate-x-0',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      ]"
    >
      <!-- Logo Area -->
      <div class="p-8 border-b border-white/5">
        <div class="flex items-center gap-4">
          <div class="h-10 w-10 bg-white rounded-xl flex items-center justify-center text-[#003366] font-black overflow-hidden">
            <img v-if="cmsConfig?.member?.portal?.sidebarLogo" :src="cmsConfig.member.portal.sidebarLogo" class="w-full h-full object-cover" />
            <span v-else>{{ cmsConfig?.member?.portal?.siteInitials || 'SC' }}</span>
          </div>
          <div>
            <span class="font-bold text-white text-xs block uppercase tracking-widest">{{ cmsConfig?.member?.portal?.siteName || 'Scientific Hub' }}</span>
            <p class="text-[10px] text-white/60 font-medium mt-0.5">{{ cmsConfig?.member?.portal?.siteName ? 'Member Portal' : 'Society for Cellular Pathology' }}</p>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 overflow-y-auto py-8 px-4 space-y-1.5 custom-scrollbar">
        <NuxtLink 
          v-for="item in menuItems" 
          :key="item.label"
          :to="item.to"
          @click="isSidebarOpen = false"
          class="flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold transition-all group relative overflow-hidden"
          :class="route.path === item.to ? 'bg-white/10 text-white shadow-lg shadow-black/10' : 'text-white/50 hover:text-white hover:bg-white/5'"
        >
          <div v-if="route.path === item.to" class="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-brand-cyan rounded-r-full"></div>
          <Icon :name="item.icon" size="18" :class="route.path === item.to ? 'text-brand-cyan' : 'text-white/20 group-hover:text-white/60'" />
          {{ item.label }}
          
          <!-- Badge for Chat/Notif if needed -->
          <span v-if="item.label === 'Chat' && unreadChatCount > 0" class="ml-auto w-5 h-5 bg-brand-cyan text-[#003366] text-[10px] font-black rounded-full flex items-center justify-center">
            {{ unreadChatCount }}
          </span>
          <span v-if="item.label === 'Notifications' && unreadCount > 0" class="ml-auto w-5 h-5 bg-rose-500 text-white text-[10px] font-black rounded-full flex items-center justify-center">
            {{ unreadCount }}
          </span>
        </NuxtLink>
      </nav>

      <!-- User Profile Summary (Sticky Bottom) -->
      <div class="p-6 border-t border-white/5 bg-black/10">
        <div class="flex items-center gap-4 mb-4">
          <div class="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center font-bold text-white border border-white/5">
             <img v-if="user?.profilePicture" :src="user.profilePicture" class="w-full h-full object-cover rounded-xl" />
             <span v-else>{{ userInitials }}</span>
          </div>
          <div class="min-w-0">
            <h4 class="text-sm font-bold tracking-tight truncate">{{ userName }}</h4>
            <span class="text-xs font-semibold text-emerald-400 block mt-0.5 uppercase tracking-tighter">{{ userStatus }}</span>
          </div>
        </div>
        <button @click="showLogoutModal = true" class="w-full py-3 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white rounded-xl text-xs font-bold transition-all border border-rose-500/20 flex items-center justify-center gap-2">
          <Icon name="lucide:log-out" size="14" />
          Logout
        </button>
      </div>
    </aside>

    <!-- Main Content Area -->
    <main class="flex-1 flex flex-col h-screen overflow-hidden w-full relative">
      <!-- Top Header -->
      <header class="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 lg:px-10 shrink-0 z-[50]">
        <div class="flex items-center gap-4 lg:gap-8">
          <!-- Mobile Menu Toggle -->
          <button @click="isSidebarOpen = true" class="lg:hidden p-2 text-slate-500 hover:bg-slate-50 rounded-lg transition-colors">
            <Icon name="lucide:menu" size="24" />
          </button>
          
          <div class="hidden sm:block">
            <h2 class="text-lg lg:text-xl font-black text-slate-800 tracking-tighter uppercase">{{ pageTitle }}</h2>
          </div>

          <!-- Tidy Search Bar -->
          <div class="hidden lg:block w-64 group relative">
            <input 
              type="text" 
              placeholder="Search registry..." 
              class="w-full h-10 pl-10 pr-4 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-700 focus:bg-white focus:ring-2 focus:ring-[#003366]/5 focus:border-[#003366]/20 outline-none transition-all placeholder:text-slate-400"
            />
            <Icon name="lucide:search" size="14" class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#003366] transition-colors" />
          </div>
        </div>

        <div class="flex items-center gap-2 lg:gap-6">
          <!-- Notification Button -->
          <div class="relative">
            <button 
              @click="toggleNotifications"
              class="relative p-2.5 text-slate-400 hover:text-[#003366] hover:bg-slate-50 rounded-xl transition-all"
              :class="{ 'bg-slate-50 text-[#003366]': isNotifOpen }"
            >
              <Icon name="lucide:bell" size="20" />
              <span v-if="unreadCount > 0" class="absolute top-2 right-2 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full"></span>
            </button>
            
            <NotificationDropdown v-if="isNotifOpen" @close="isNotifOpen = false" @select="handleNotifSelect" />
          </div>

          <div class="hidden sm:block h-8 w-[1px] bg-slate-100 mx-2"></div>
          
          <div class="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
            <div class="text-right hidden sm:block">
              <p class="text-[10px] font-black text-[#003366] leading-none uppercase tracking-widest">Cycle 2026</p>
              <span class="text-[9px] font-bold text-emerald-500 uppercase mt-1 block">Active Registry</span>
            </div>
          </div>
        </div>
      </header>

      <!-- Scrollable Viewport -->
      <div class="flex-1 overflow-y-auto p-4 lg:p-10 custom-scrollbar-light bg-[#F8FAFC]">
        <slot />
      </div>

      <ConfirmModal
        :isOpen="showLogoutModal"
        title="Secure Logout"
        message="Are you sure you want to end your current session? You will need to re-authenticate to access the registry."
        confirmText="Logout"
        confirmStyle="danger"
        icon="lucide:log-out"
        @confirm="confirmLogout"
        @cancel="showLogoutModal = false"
      />
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useNotifications } from '@/composables/useNotifications'
import { useChat } from '@/composables/useChat'
import { useCMS } from '@/composables/useCMS'

const route = useRoute()
const router = useRouter()
const { user, logOut: logOutUser, loadUser } = useUser()
const { notifications, unreadCount, addNotification } = useNotifications()
const { chats } = useChat()
const { cmsConfig, loadCMS } = useCMS()

const isSidebarOpen = ref(false)
const isNotifOpen = ref(false)
const showLogoutModal = ref(false)

// Rehydrate user state
onMounted(async () => {
  loadUser()
  await loadCMS()
  if (!user.value) {
    router.push('/login')
  } else {
    // Trigger welcome notification
    setTimeout(() => {
      if (notifications.value.length < 5) {
        addNotification({
          title: 'Welcome Back',
          message: `Welcome to the SCPSN Scientific Hub, ${user.value.fullName}. Your portal is synchronized.`,
          type: 'info'
        })
      }
    }, 2000)
  }
})

const unreadChatCount = computed(() => chats.value.reduce((acc, c) => acc + c.unreadCount, 0))

const menuItems = [
  { label: 'Dashboard', to: '/dashboard', icon: 'lucide:layout-dashboard' },
  { label: 'Scientific Chat', to: '/dashboard/chat', icon: 'lucide:message-square' },
  { label: 'Notifications', to: '/dashboard/notifications', icon: 'lucide:bell' },
  { label: 'Profile Registry', to: '/dashboard/portfolio', icon: 'lucide:user-circle' },
  { label: 'Scientific Library', to: '/dashboard/library', icon: 'lucide:library' },
  { label: 'Payments', to: '/dashboard/payments', icon: 'lucide:credit-card' },
  { label: 'Abstracts', to: '/dashboard/abstracts', icon: 'lucide:file-text' },
  { label: 'Support', to: '/dashboard/support', icon: 'lucide:help-circle' }
]

const pageTitle = computed(() => {
  const current = menuItems.find(item => item.to === route.path)
  return current ? current.label : 'Scientific Portal'
})

const userName = computed(() => user.value?.fullName || 'Practitioner')
const userStatus = computed(() => user.value?.status || 'Active Member')
const userInitials = computed(() => {
  if (!user.value?.fullName) return 'SC'
  return user.value.fullName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)
})

const toggleNotifications = () => {
  isNotifOpen.value = !isNotifOpen.value
}

const handleNotifSelect = (notif) => {
  isNotifOpen.value = false
  router.push('/dashboard/notifications')
}

const confirmLogout = () => {
  showLogoutModal.value = false
  logOutUser()
  router.push('/login')
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

.custom-scrollbar-light::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar-light::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar-light::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
}

.router-link-active {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}
</style>
