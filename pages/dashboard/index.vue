<template>
  <div class="space-y-10 max-w-7xl mx-auto animate-fade-in">
    <!-- Hero / Status Banner -->
    <section class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div 
        class="lg:col-span-2 bg-gradient-to-br from-[#003366] to-[#004080] rounded-[2rem] p-6 lg:p-10 text-white relative overflow-hidden group border border-white/10"
        :style="cmsConfig?.member?.portal?.heroBg ? { backgroundImage: `url(${cmsConfig.member.portal.heroBg})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}"
      >
        <div v-if="!cmsConfig?.member?.portal?.heroBg" class="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700"></div>
        <div v-else class="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
        <div class="relative z-10 space-y-6">
          <div class="inline-flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/10">
            <span class="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
            <span class="text-xs font-bold lowercase">scientific network active</span>
          </div>
          <h1 class="text-4xl font-bold tracking-tight leading-none">
            {{ cmsConfig?.member?.portal?.welcomeTitle || 'Welcome Back,' }} <br/> <span class="text-brand-cyan">{{ user?.fullName?.split(' ')[0] || 'Practitioner' }}</span>
          </h1>
          <p class="text-white/80 text-sm font-medium max-w-md leading-relaxed">
            {{ cmsConfig?.member?.portal?.welcomeSubtitle || 'Your credentials have been re-validated for the current diagnostic cycle. You have access to the latest pathological archives.' }}
          </p>
          <div class="flex items-center gap-6 pt-4">
            <NuxtLink to="/dashboard/library" class="bg-brand-cyan text-[#003366] px-8 py-3 rounded-xl text-xs font-bold hover:scale-105 transition-all">Explore Archives</NuxtLink>
            <NuxtLink to="/dashboard/portfolio" class="text-xs font-bold text-white/80 hover:text-white transition-colors">Update Profile</NuxtLink>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-[2rem] border border-slate-200 p-6 lg:p-10 flex flex-col justify-between">
        <div class="space-y-4">
          <span class="text-xs font-bold text-slate-400 lowercase">membership identity</span>
          <div class="flex items-center justify-between">
            <h3 class="text-2xl font-bold text-[#003366] tracking-tight leading-none">{{ user?.category || 'Professional' }}</h3>
            <div :class="statusClass" class="px-3 py-1 rounded-lg text-xs font-bold">
              {{ user?.status || 'Active' }}
            </div>
          </div>
          <div class="pt-6 space-y-3">
             <div class="flex justify-between items-center text-xs font-bold">
               <span class="text-slate-400 lowercase">renewal date</span>
               <span class="text-slate-800">{{ renewalDate }}</span>
             </div>
             <div class="h-2 bg-slate-100 rounded-full overflow-hidden">
               <div :style="{ width: '75%' }" class="h-full bg-brand-cyan"></div>
             </div>
             <p class="text-xs text-slate-400 font-medium">75% of membership cycle remaining</p>
          </div>
        </div>
        <button 
          @click="downloadVirtualID" 
          :disabled="isDownloading"
          class="w-full mt-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-[#003366] hover:bg-slate-100 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
        >
          <Icon v-if="isDownloading" name="lucide:loader-2" class="animate-spin" size="18" />
          {{ isDownloading ? 'Generating ID...' : 'Download Virtual ID' }}
        </button>
      </div>
    </section>

    <!-- Metrics Grid -->
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div v-for="metric in metrics" :key="metric.label" class="bg-white p-8 rounded-[1.5rem] border border-slate-200 group hover:border-[#003366]/20 transition-all">
        <div class="flex justify-between items-start mb-4">
          <div class="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-[#003366] border border-slate-100 group-hover:bg-[#003366] group-hover:text-white transition-all duration-500">
            <Icon :name="metric.icon" size="20" />
          </div>
          <span class="text-xs font-bold text-emerald-500 leading-none">+{{ metric.growth }}%</span>
        </div>
        <p class="text-sm font-semibold text-slate-500">{{ metric.label }}</p>
        <h4 class="text-3xl font-bold text-slate-800 tracking-tight mt-1">{{ metric.value }}</h4>
      </div>
    </section>

    <!-- Content Split -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <!-- Recent Publications / Journals -->
      <div class="lg:col-span-2 space-y-6">
        <div class="flex items-center justify-between">
          <h3 class="text-xs font-black text-slate-400 lowercase">latest scientific publications</h3>
          <NuxtLink to="/dashboard/library" class="text-xs font-bold text-brand-cyan hover:underline lowercase">view all library</NuxtLink>
        </div>
        
        <div class="space-y-4">
          <div 
            v-for="pub in recentPublications" 
            :key="pub.id" 
            @click="openPublication(pub)"
            class="bg-white p-5 rounded-2xl border border-slate-200 transition-all cursor-pointer group flex items-center gap-6 hover:border-brand-cyan hover:shadow-xl hover:shadow-[#003366]/5"
          >
            <div class="w-14 h-16 bg-slate-50 rounded-xl flex-shrink-0 relative overflow-hidden flex items-center justify-center border border-slate-100 group-hover:bg-[#003366] group-hover:text-white transition-all duration-300">
               <Icon name="lucide:file-text" size="24" />
               <div class="absolute inset-x-0 bottom-0 h-1 bg-brand-cyan"></div>
            </div>
            
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-3">
                 <h4 class="text-base font-bold text-slate-800 tracking-tight truncate group-hover:text-brand-cyan transition-colors">{{ pub.title }}</h4>
                 <span class="px-2 py-0.5 rounded-md text-[8px] font-black bg-slate-100 text-slate-500 lowercase">{{ pub.category }}</span>
              </div>
              <p class="text-xs text-slate-500 font-medium leading-relaxed line-clamp-1 mt-1">{{ pub.desc }}</p>
              <div class="flex items-center gap-4 mt-2 text-[10px] font-bold text-slate-400 lowercase">
                 <span>{{ pub.date }}</span>
                 <div class="w-1 h-1 bg-slate-200 rounded-full"></div>
                 <span>{{ pub.size }}</span>
              </div>
            </div>
            
            <div class="p-3 text-slate-300 group-hover:text-brand-cyan transition-all group-hover:translate-x-1">
               <Icon name="lucide:chevron-right" size="20" />
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions / Support -->
      <div class="space-y-6">
        <h3 class="text-sm font-bold text-slate-500 lowercase">quick support</h3>
        <div class="bg-white p-6 lg:p-8 rounded-[2rem] border border-slate-200 space-y-6">
           <div class="space-y-2">
             <h4 class="text-sm font-bold text-[#003366]">{{ cmsConfig?.member?.portal?.announcementTitle || 'Scientific Abstract Due' }}</h4>
             <p class="text-xs text-slate-500 font-medium leading-relaxed">{{ cmsConfig?.member?.portal?.announcementText || 'The International Scientific Congress abstract submission is currently open for members.' }}</p>
           </div>
           <NuxtLink :to="cmsConfig?.member?.portal?.announcementLink || '/dashboard/abstracts'" class="block w-full text-center bg-[#003366] text-white py-4 rounded-xl text-sm font-bold hover:bg-[#004080] transition-all">Take Action</NuxtLink>
           <div class="h-[1px] bg-slate-100"></div>
           <div class="flex items-center gap-4 text-slate-500 hover:text-[#003366] cursor-pointer transition-colors">
              <div class="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100">
                <Icon name="lucide:help-circle" size="18" />
              </div>
              <span class="text-sm font-bold text-[#003366]">Enquiry Helpdesk</span>
           </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useLibrary } from '@/composables/useLibrary'
import { useCMS } from '@/composables/useCMS'

definePageMeta({
  layout: 'dashboard'
})

const { user } = useUser()
const { publications, trackRead } = useLibrary()
const { cmsConfig } = useCMS()

const statusClass = computed(() => {
  const status = user.value?.status?.toLowerCase() || 'active'
  return status === 'active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'
})

const renewalDate = computed(() => 'Dec 31, 2026')

const isDownloading = ref(false)

const downloadVirtualID = async () => {
  isDownloading.value = true
  const element = document.getElementById('virtual-id-card')
  if (!element) return

  try {
    const canvas = await html2canvas(element, {
      scale: 3, // High quality
      useCORS: true,
      backgroundColor: null
    })
    
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [400, 600]
    })
    
    pdf.addImage(imgData, 'PNG', 0, 0, 400, 600)
    pdf.save(`SCPSN_Virtual_ID_${user.value?.membershipId || 'Member'}.pdf`)
  } catch (err) {
    console.error('Download Error:', err)
  } finally {
    isDownloading.value = false
  }
}

const openPublication = (pub) => {
  // Navigation to library with specific pub
  navigateTo(`/dashboard/library?id=${pub.id}`)
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

::selection {
  background: #00b8d4;
  color: #003366;
}
</style>
