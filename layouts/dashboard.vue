<template>
  <div class="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 flex overflow-hidden">
    <!-- Sidebar -->
    <aside class="w-72 bg-[#003366] text-white flex-shrink-0 flex flex-col h-screen sticky top-0 z-50 transition-all duration-300">
      <!-- Logo Area -->
      <div class="p-8 border-b border-white/5">
        <div class="flex items-center gap-4">
          <div class="h-10 w-10 bg-white rounded-xl flex items-center justify-center text-[#003366] font-black shadow-lg">
            SC
          </div>
          <div>
            <span class="font-bold text-white text-xs block">Scientific Hub</span>
            <p class="text-[10px] text-white/60 font-medium mt-0.5">Society for Cellular Pathology</p>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 overflow-y-auto py-8 px-4 space-y-2 custom-scrollbar">
        <NuxtLink 
          v-for="item in menuItems" 
          :key="item.label"
          :to="item.to"
          class="flex items-center gap-4 px-6 py-4 rounded-xl text-sm font-bold transition-all group"
          :class="route.path === item.to ? 'bg-white/10 text-white shadow-lg' : 'text-white/60 hover:text-white hover:bg-white/5'"
        >
          <Icon :name="item.icon" size="18" :class="route.path === item.to ? 'text-brand-cyan' : 'text-white/20 group-hover:text-white/60'" />
          {{ item.label }}
        </NuxtLink>
      </nav>

      <!-- User Profile Summary (Sticky Bottom) -->
      <div class="p-6 border-t border-white/5 bg-black/10">
        <div class="flex items-center gap-4 mb-4">
          <div class="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center font-bold text-white border border-white/5">
            {{ userInitials }}
          </div>
          <div class="min-w-0">
            <h4 class="text-sm font-bold tracking-tight truncate">{{ userName }}</h4>
            <span class="text-xs font-semibold text-emerald-400 block mt-0.5">{{ userStatus }}</span>
          </div>
        </div>
        <button @click="showLogoutModal = true" class="w-full py-3 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white rounded-xl text-xs font-bold transition-all border border-rose-500/20">
          Secure Logout
        </button>
      </div>
    </aside>

    <!-- Main Content Area -->
    <main class="flex-1 flex flex-col h-screen overflow-hidden">
      <!-- Top Header -->
      <header class="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-10 shrink-0">
        <div class="flex items-center gap-10">
          <h2 class="text-2xl font-bold text-slate-800 tracking-tight">{{ pageTitle }}</h2>
          <div class="hidden md:flex items-center gap-4 px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-full">
            <Icon name="lucide:search" size="16" class="text-slate-400" />
            <input placeholder="Search scientific journals..." class="bg-transparent text-xs font-medium outline-none w-64 text-slate-600" />
          </div>
        </div>

        <div class="flex items-center gap-6">
          <button class="relative p-2 text-slate-400 hover:text-[#003366] transition-colors">
            <Icon name="lucide:bell" size="20" />
            <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 border-2 border-white rounded-full"></span>
          </button>
          <div class="h-8 w-[1px] bg-slate-200"></div>
          <div class="flex items-center gap-3">
            <div class="text-right hidden sm:block">
              <p class="text-xs font-bold text-slate-800 leading-none">Cycle 2026</p>
              <span class="text-[11px] font-medium text-slate-500">Enrollment Active</span>
            </div>
          </div>
        </div>
      </header>

      <!-- Scrollable Viewport -->
      <div class="flex-1 overflow-y-auto p-10 custom-scrollbar-light bg-[#F8FAFC]">
        <slot />
      </div>

      <ConfirmModal
        :isOpen="showLogoutModal"
        title="Secure Logout"
        message="Are you sure you want to end your current session?"
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
const route = useRoute()
const router = useRouter()
const { user, logOut: logOutUser, loadUser } = useUser()

// Rehydrate user state from localStorage on page load/refresh
onMounted(() => {
  loadUser()
  if (!user.value) {
    router.push('/login')
  }
})

const showLogoutModal = ref(false)

const menuItems = [
  { label: 'Dashboard', to: '/dashboard', icon: 'lucide:layout-dashboard' },
  { label: 'Profile', to: '/dashboard/portfolio', icon: 'lucide:user-circle' },
  { label: 'Library', to: '/dashboard/library', icon: 'lucide:library' },
  { label: 'Payments', to: '/dashboard/payments', icon: 'lucide:credit-card' },
  { label: 'Abstracts', to: '/dashboard/abstracts', icon: 'lucide:file-text' },
  { label: 'Support', to: '/dashboard/support', icon: 'lucide:help-circle' }
]

const pageTitle = computed(() => {
  const current = menuItems.find(item => item.to === route.path)
  return current ? current.label : 'Society Portal'
})

const userName = computed(() => user.value?.fullName || 'Member')
const userStatus = computed(() => user.value?.status || 'Active Member')
const userInitials = computed(() => {
  if (!user.value?.fullName) return 'M'
  return user.value.fullName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)
})

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
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
}
</style>
