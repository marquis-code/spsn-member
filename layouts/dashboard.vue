<template>
  <div class="min-h-screen bg-[#f0f4f8] font-body text-slate-900 flex overflow-hidden relative">

    <!-- Mobile Overlay -->
    <div
      v-if="isSidebarOpen"
      @click="isSidebarOpen = false"
      class="fixed inset-0 bg-[#0a1628]/60 backdrop-blur-sm z-[60] lg:hidden"
    />

    <!-- ══════════════════════════════════════════
         SIDEBAR
    ══════════════════════════════════════════ -->
    <aside
      :class="[
        'w-[268px] flex-shrink-0 flex flex-col h-screen fixed lg:sticky top-0 z-[70] transition-transform duration-300 ease-in-out lg:translate-x-0',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      ]"
      style="background: linear-gradient(175deg, #0d2d55 0%, #1d4e89 60%, #163d6e 100%);"
    >
      <!-- Subtle grid texture overlay -->
      <div class="absolute inset-0 pointer-events-none opacity-[0.04]"
        style="background-image: repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 32px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 32px);"
      />

      <!-- Gold top accent line -->
      <div class="absolute top-0 left-0 right-0 h-[3px] z-10"
        style="background: linear-gradient(90deg, transparent, #c9993f 30%, #e8c97a 60%, transparent);" />

      <!-- ── Logo Area ── -->
      <div class="relative z-10 px-7 pt-8 pb-6 border-b border-white/[0.07]">
        <div class="flex items-center gap-3.5">
          <div class="w-11 h-11 rounded-2xl overflow-hidden border-2 border-white/20 shadow-lg shadow-black/30 flex-shrink-0 bg-white/10 flex items-center justify-center">
            <img
              v-if="cmsConfig?.member?.portal?.sidebarLogo"
              :src="cmsConfig.member.portal.sidebarLogo"
              class="w-full h-full object-cover"
            />
            <span v-else class="text-white font-black text-sm tracking-wider">
              {{ cmsConfig?.member?.portal?.siteInitials || 'SC' }}
            </span>
          </div>
          <div class="min-w-0">
            <span class="font-extrabold text-white text-[13px] tracking-tight block leading-tight truncate">
              {{ cmsConfig?.member?.portal?.siteName || 'SCPSN' }}
            </span>
            <p class="text-[10px] font-semibold text-[#93c5fd] mt-0.5 tracking-[0.15em] uppercase">
              Member Portal
            </p>
          </div>
        </div>
      </div>

      <!-- ── Navigation ── -->
      <nav class="relative z-10 flex-1 overflow-y-auto py-6 px-4 space-y-0.5 sidebar-scroll">
        <p class="text-[9px] font-bold text-white/25 tracking-[0.2em] uppercase px-4 mb-3">Navigation</p>

        <NuxtLink
          v-for="item in menuItems"
          :key="item.label"
          :to="item.to"
          @click="isSidebarOpen = false"
          class="group flex items-center gap-3.5 px-4 py-3 rounded-xl text-[13px] font-semibold transition-all duration-200 relative"
          :class="route.path === item.to
            ? 'bg-white/[0.13] text-white shadow-md shadow-black/10'
            : 'text-white/45 hover:text-white/85 hover:bg-white/[0.06]'"
        >
          <!-- Active left pip -->
          <span
            v-if="route.path === item.to"
            class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full"
            style="background: linear-gradient(180deg,#e8c97a,#c9993f);"
          />

          <!-- Icon container -->
          <span
            class="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200"
            :class="route.path === item.to
              ? 'bg-white/15'
              : 'bg-transparent group-hover:bg-white/[0.07]'"
          >
            <Icon
              :name="item.icon"
              size="15"
              :class="route.path === item.to ? 'text-[#e8c97a]' : 'text-white/35 group-hover:text-white/65'"
            />
          </span>

          <span class="flex-1 truncate">{{ item.label }}</span>

          <!-- Badges -->
          <span
            v-if="item.label === 'Scientific Chat' && unreadChatCount > 0"
            class="ml-auto min-w-[18px] h-[18px] px-1 bg-[#c9993f] text-[#0d2d55] text-[9px] font-black rounded-full flex items-center justify-center"
          >{{ unreadChatCount }}</span>
          <span
            v-if="item.label === 'Notifications' && unreadCount > 0"
            class="ml-auto min-w-[18px] h-[18px] px-1 bg-rose-500 text-white text-[9px] font-black rounded-full flex items-center justify-center"
          >{{ unreadCount }}</span>
        </NuxtLink>
      </nav>

      <!-- ── User Card (Bottom) ── -->
      <div class="relative z-10 mx-4 mb-5 rounded-2xl overflow-hidden border border-white/[0.09]"
        style="background: linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%);">
        <div class="p-4">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-xl overflow-hidden border border-white/15 flex-shrink-0 bg-white/10 flex items-center justify-center text-white font-bold text-sm">
              <img v-if="user?.profilePicture" :src="user.profilePicture" class="w-full h-full object-cover" />
              <span v-else>{{ userInitials }}</span>
            </div>
            <div class="min-w-0 flex-1">
              <h4 class="text-[13px] font-bold text-white truncate leading-tight">{{ userName }}</h4>
              <div class="flex items-center gap-1.5 mt-0.5">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                <span class="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider truncate">{{ userStatus }}</span>
              </div>
            </div>
          </div>
          <button
            @click="showLogoutModal = true"
            class="w-full py-2.5 rounded-xl text-[12px] font-bold transition-all duration-200 flex items-center justify-center gap-2 border border-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white hover:border-rose-500"
          >
            <Icon name="lucide:log-out" size="13" />
            Sign Out
          </button>
        </div>
      </div>
    </aside>


    <!-- ══════════════════════════════════════════
         MAIN CONTENT
    ══════════════════════════════════════════ -->
    <main class="flex-1 flex flex-col h-screen overflow-hidden min-w-0">

      <!-- ── Top Header ── -->
      <header class="h-[68px] bg-white border-b border-slate-200/80 flex items-center justify-between px-5 lg:px-8 shrink-0 z-[50] shadow-sm shadow-slate-100">

        <!-- Left: toggle + title -->
        <div class="flex items-center gap-4">
          <button
            @click="isSidebarOpen = true"
            class="lg:hidden p-2 text-slate-500 hover:bg-slate-50 rounded-xl transition-colors"
          >
            <Icon name="lucide:menu" size="22" />
          </button>

          <div class="hidden sm:flex items-center gap-3">
            <div class="w-1.5 h-5 rounded-full" style="background:linear-gradient(180deg,#1d4e89,#c9993f);" />
            <h2 class="text-[15px] font-extrabold text-slate-800 tracking-tight uppercase">{{ pageTitle }}</h2>
          </div>

          <!-- Search -->
          <div class="hidden lg:flex items-center relative ml-2">
            <Icon name="lucide:search" size="13" class="absolute left-3.5 text-slate-400 pointer-events-none z-10" />
            <input
              type="text"
              placeholder="Search registry..."
              class="h-9 w-60 pl-9 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-[13px] font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#1d4e89]/30 focus:ring-2 focus:ring-[#1d4e89]/8 focus:bg-white transition-all"
            />
          </div>
        </div>

        <!-- Right: actions -->
        <div class="flex items-center gap-2 lg:gap-3">

          <!-- Cycle badge -->
          <div class="hidden sm:flex items-center gap-2 px-3.5 py-2 bg-[#f0f4f8] border border-slate-200 rounded-xl">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span class="text-[11px] font-bold text-[#1d4e89] tracking-wide uppercase">Cycle 2026</span>
          </div>

          <!-- Divider -->
          <div class="hidden sm:block h-6 w-px bg-slate-200 mx-1" />

          <!-- Language -->
          <button class="hidden sm:flex items-center gap-1.5 px-3 py-2 text-[12px] font-bold text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-xl transition-all">
            <Icon name="lucide:globe" size="14" />
            EN
          </button>

          <!-- Notifications -->
          <div class="relative">
            <button
              @click="toggleNotifications"
              class="relative w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-200"
              :class="isNotifOpen
                ? 'bg-[#1d4e89] text-white shadow-md shadow-[#1d4e89]/30'
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'"
            >
              <Icon name="lucide:bell" size="17" />
              <span
                v-if="unreadCount > 0"
                class="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 border-2 border-white rounded-full"
              />
            </button>
            <NotificationDropdown v-if="isNotifOpen" @close="isNotifOpen = false" @select="handleNotifSelect" />
          </div>

          <!-- Avatar chip -->
          <div class="flex items-center gap-2.5 pl-3 pr-1 py-1 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:border-[#1d4e89]/30 transition-all">
            <div class="text-right hidden sm:block">
              <p class="text-[11px] font-bold text-slate-700 leading-tight">{{ userName }}</p>
              <p class="text-[9px] font-semibold text-emerald-500 uppercase tracking-wider">Active</p>
            </div>
            <div class="w-7 h-7 rounded-lg overflow-hidden bg-[#1d4e89]/10 border border-[#1d4e89]/15 flex items-center justify-center text-[#1d4e89] font-bold text-[11px] flex-shrink-0">
              <img v-if="user?.profilePicture" :src="user.profilePicture" class="w-full h-full object-cover" />
              <span v-else>{{ userInitials }}</span>
            </div>
          </div>
        </div>
      </header>

      <!-- ── Page Content ── -->
      <div class="flex-1 overflow-y-auto p-4 lg:p-8 main-scroll bg-[#f0f4f8]">
        <slot />
      </div>

      <!-- ── Logout Confirm ── -->
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

const isSidebarOpen   = ref(false)
const isNotifOpen     = ref(false)
const showLogoutModal = ref(false)

onMounted(async () => {
  loadUser()
  await loadCMS()
  if (!user.value) {
    router.push('/login')
  } else {
    setTimeout(() => {
      if (notifications.value.length < 5) {
        addNotification({
          title: 'Welcome Back',
          message: `Welcome to the SCPSN Scientific Hub, ${user.value.fullName}. Your portal is synchronized.`,
          type: 'info',
        })
      }
    }, 2000)
  }
})

const unreadChatCount = computed(() =>
  chats.value.reduce((acc, c) => acc + c.unreadCount, 0)
)

const menuItems = [
  { label: 'Dashboard',         to: '/dashboard',                icon: 'lucide:layout-dashboard' },
  { label: 'Scientific Chat',   to: '/dashboard/chat',           icon: 'lucide:message-square'   },
  { label: 'Notifications',     to: '/dashboard/notifications',  icon: 'lucide:bell'             },
  { label: 'Profile Registry',  to: '/dashboard/portfolio',      icon: 'lucide:user-circle'      },
  { label: 'Scientific Library',to: '/dashboard/library',        icon: 'lucide:library'          },
  { label: 'Payments',          to: '/dashboard/payments',       icon: 'lucide:credit-card'      },
  { label: 'Abstracts',         to: '/dashboard/abstracts',      icon: 'lucide:file-text'        },
  { label: 'Support',           to: '/dashboard/support',        icon: 'lucide:help-circle'      },
]

const pageTitle = computed(() => {
  const current = menuItems.find(item => item.to === route.path)
  return current ? current.label : 'Scientific Portal'
})

const userName     = computed(() => user.value?.fullName || 'Practitioner')
const userStatus   = computed(() => user.value?.status  || 'Active Member')
const userInitials = computed(() => {
  if (!user.value?.fullName) return 'SC'
  return user.value.fullName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)
})

const toggleNotifications = () => { isNotifOpen.value = !isNotifOpen.value }

const handleNotifSelect = () => {
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
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;0,9..40,900;1,9..40,600&display=swap');

.font-body {
  font-family: 'DM Sans', ui-sans-serif, system-ui, sans-serif;
}

/* ── Sidebar scrollbar ── */
.sidebar-scroll::-webkit-scrollbar        { width: 3px; }
.sidebar-scroll::-webkit-scrollbar-track  { background: transparent; }
.sidebar-scroll::-webkit-scrollbar-thumb  { background: rgba(255,255,255,0.08); border-radius: 10px; }

/* ── Main scroll ── */
.main-scroll::-webkit-scrollbar        { width: 5px; }
.main-scroll::-webkit-scrollbar-track  { background: transparent; }
.main-scroll::-webkit-scrollbar-thumb  { background: rgba(0,0,0,0.06); border-radius: 10px; }

/* ── Active nav link (router-link-active override) ── */
.router-link-active {
  background: rgba(255, 255, 255, 0.12);
  color: #ffffff;
}
</style>