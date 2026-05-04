<template>
  <div id="virtual-id-card" class="fixed -left-[2000px] top-0">
    <div class="w-[400px] h-[600px] bg-white rounded-[2rem] overflow-hidden shadow-2xl flex flex-col border border-slate-200 relative">
      <!-- Background Patterns -->
      <div class="absolute top-0 right-0 w-64 h-64 bg-brand-cyan/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div class="absolute bottom-0 left-0 w-48 h-48 bg-[#003366]/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
      
      <!-- Header -->
      <div class="bg-[#003366] p-8 text-white flex items-center gap-4 relative z-10">
        <div class="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
           <Icon name="lucide:layers" size="24" class="text-brand-cyan" />
        </div>
        <div>
          <h2 class="text-lg font-black tracking-tighter">SCPSN</h2>
          <p class="text-[10px] font-bold text-brand-cyan uppercase tracking-widest">Scientific Registry</p>
        </div>
      </div>
      
      <!-- Profile Content -->
      <div class="flex-1 p-8 flex flex-col items-center text-center space-y-6 pt-12 relative z-10">
        <div class="w-32 h-32 rounded-3xl bg-slate-50 border-4 border-[#003366]/10 p-1 overflow-hidden shadow-lg">
           <img v-if="user?.profilePicture" :src="user.profilePicture" class="w-full h-full object-cover rounded-2xl" />
           <div v-else class="w-full h-full bg-[#003366] text-white flex items-center justify-center text-4xl font-black rounded-2xl">
              {{ userInitials }}
           </div>
        </div>
        
        <div>
          <h3 class="text-2xl font-black text-slate-800 tracking-tight leading-none">{{ user?.fullName }}</h3>
          <p class="text-sm font-bold text-brand-cyan mt-2 uppercase tracking-widest">{{ user?.category }} Member</p>
        </div>
        
        <div class="w-full grid grid-cols-2 gap-4 pt-4 text-left">
           <div class="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <p class="text-[8px] font-black text-slate-400 uppercase tracking-widest">Registry ID</p>
              <p class="text-xs font-bold text-[#003366] mt-1">{{ user?.membershipId || 'SC-PENDING' }}</p>
           </div>
           <div class="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <p class="text-[8px] font-black text-slate-400 uppercase tracking-widest">Valid Until</p>
              <p class="text-xs font-bold text-slate-800 mt-1">Dec 2026</p>
           </div>
        </div>
        
        <div class="pt-6 w-full flex flex-col items-center gap-3">
           <div class="w-full h-12 bg-slate-100 rounded-xl flex items-center justify-center border border-slate-200">
              <!-- Mock Barcode -->
              <div class="flex gap-1 h-6">
                 <div v-for="i in 20" :key="i" class="w-[2px] bg-slate-400" :style="{ height: Math.random() * 100 + '%' }"></div>
              </div>
           </div>
           <p class="text-[8px] font-black text-slate-300 uppercase tracking-[0.4em]">Validation Protocol 2.0</p>
        </div>
      </div>
      
      <!-- Footer -->
      <div class="p-6 border-t border-slate-100 text-center relative z-10">
        <p class="text-[9px] font-medium text-slate-400">Society for Cellular Pathology Scientists of Nigeria</p>
      </div>
    </div>
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
