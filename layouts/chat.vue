<template>
  <div class="h-screen w-screen bg-[#f0f4f8] overflow-hidden flex flex-col font-body antialiased">

    <!-- ══════════════════════════════════════════
         TOP HEADER
    ══════════════════════════════════════════ -->
    <header
      class="h-[68px] shrink-0 flex items-center justify-between px-5 lg:px-8 z-[100] relative"
      style="background: linear-gradient(175deg, #0d2d55 0%, #1d4e89 60%, #163d6e 100%);"
    >
      <!-- Gold top accent -->
      <div class="absolute top-0 left-0 right-0 h-[3px] pointer-events-none"
        style="background: linear-gradient(90deg, transparent, #c9993f 30%, #e8c97a 60%, transparent);" />

      <!-- Subtle grid texture -->
      <div class="absolute inset-0 pointer-events-none opacity-[0.035]"
        style="background-image: repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 32px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 32px);" />

      <!-- ── Left: back + identity ── -->
      <div class="relative z-10 flex items-center gap-4">
        <NuxtLink
          to="/dashboard"
          class="w-9 h-9 flex items-center justify-center rounded-xl border border-white/15 bg-white/[0.08] hover:bg-white/[0.16] text-white/70 hover:text-white transition-all duration-200 group"
          title="Back to Dashboard"
        >
          <Icon name="lucide:arrow-left" size="16" class="group-hover:-translate-x-0.5 transition-transform duration-200" />
        </NuxtLink>

        <!-- Logo chip -->
        <div class="w-9 h-9 rounded-xl overflow-hidden border border-white/20 bg-white/10 flex items-center justify-center flex-shrink-0">
          <span class="font-black text-white text-[11px] tracking-wider">SC</span>
        </div>

        <div>
          <h1 class="text-[13px] font-extrabold text-white tracking-tight leading-tight">
            Scientific Communication Hub
          </h1>
          <div class="flex items-center gap-1.5 mt-0.5">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
            <p class="text-[10px] font-semibold text-emerald-400 tracking-[0.12em] uppercase">
              Encrypted · Online
            </p>
          </div>
        </div>
      </div>

      <!-- ── Right: shield + user ── -->
      <div class="relative z-10 flex items-center gap-2 lg:gap-3">

        <!-- Shield badge (md+) -->
        <div class="hidden md:flex items-center gap-2.5 px-3.5 py-2 rounded-xl border border-white/[0.1] bg-white/[0.07]">
          <Icon name="lucide:shield-check" size="14" class="text-[#93c5fd] flex-shrink-0" />
          <div class="text-right">
            <p class="text-[9px] font-bold text-[#93c5fd] tracking-[0.15em] uppercase leading-none">Network</p>
            <p class="text-[10px] font-semibold text-white/60 leading-none mt-0.5">Secure Registry</p>
          </div>
        </div>

        <!-- Divider -->
        <div class="hidden md:block h-6 w-px bg-white/10 mx-1" />

        <!-- User chip -->
        <NuxtLink
          to="/dashboard/portfolio"
          class="flex items-center gap-2.5 pl-3 pr-1 py-1 rounded-xl border border-white/[0.12] bg-white/[0.07] hover:bg-white/[0.13] transition-all duration-200 group"
        >
          <div class="text-right hidden sm:block">
            <p class="text-[12px] font-bold text-white leading-tight">{{ user?.fullName || 'Practitioner' }}</p>
            <p class="text-[9px] font-semibold text-white/45 uppercase tracking-wider">{{ user?.category || 'Member' }}</p>
          </div>
          <div class="w-7 h-7 rounded-lg overflow-hidden border border-white/20 bg-white/10 flex items-center justify-center text-white font-bold text-[11px] flex-shrink-0 group-hover:border-white/35 transition-all">
            <img v-if="user?.profilePicture" :src="user.profilePicture" class="w-full h-full object-cover" />
            <span v-else>{{ userInitials }}</span>
          </div>
        </NuxtLink>
      </div>
    </header>

    <!-- ══════════════════════════════════════════
         MAIN SLOT
    ══════════════════════════════════════════ -->
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
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,800;9..40,900&display=swap');

.font-body {
  font-family: 'DM Sans', ui-sans-serif, system-ui, sans-serif;
}

::selection {
  background: #c9993f;
  color: #0d2d55;
}
</style>