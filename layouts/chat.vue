<template>
  <div class="h-screen w-screen bg-[#F0F2F5] overflow-hidden flex flex-col font-sans antialiased">
    <!-- Top Action Bar (WhatsApp Style) -->
    <header class="h-16 bg-[#003366] text-white flex items-center justify-between px-6 shrink-0 shadow-lg z-[100]">
      <div class="flex items-center gap-4">
        <NuxtLink 
          to="/dashboard" 
          class="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all group"
          title="Back to Dashboard"
        >
          <Icon name="lucide:arrow-left" size="20" class="group-hover:-translate-x-1 transition-transform" />
        </NuxtLink>
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#003366] font-black">
            SC
          </div>
          <div>
            <h1 class="text-sm font-bold tracking-tight">Scientific Communication Hub</h1>
            <p class="text-[10px] text-white/60 font-medium">Secure registry network</p>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-6">
        <div class="hidden md:flex items-center gap-6 pr-6 border-r border-white/10">
           <div class="text-right">
              <p class="text-[10px] font-bold text-brand-cyan">Network status</p>
              <p class="text-[11px] font-medium text-emerald-400">Encrypted & Online</p>
           </div>
           <div class="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/10">
              <Icon name="lucide:shield-check" size="20" class="text-brand-cyan" />
           </div>
        </div>
        <NuxtLink to="/dashboard/portfolio" class="flex items-center gap-3 hover:opacity-80 transition-opacity">
           <div class="text-right hidden sm:block">
              <p class="text-xs font-bold">{{ user?.fullName || 'Practitioner' }}</p>
              <p class="text-[10px] text-white/50">{{ user?.category || 'Member' }}</p>
           </div>
           <div class="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden">
              <img v-if="user?.profilePicture" :src="user.profilePicture" class="w-full h-full object-cover" />
              <span v-else class="font-bold text-xs">{{ userInitials }}</span>
           </div>
        </NuxtLink>
      </div>
    </header>

    <!-- Main Content (Full Screen) -->
    <main class="flex-1 relative overflow-hidden">
      <slot />
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const { user } = useUser()

const userInitials = computed(() => {
  if (!user.value?.fullName) return 'SC'
  return user.value.fullName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)
})
</script>

<style scoped>
::selection {
  background: #00b8d4;
  color: #003366;
}
</style>
