<template>
  <div class="space-y-10 max-w-7xl mx-auto animate-fade-in">
    <!-- Hero / Status Banner -->
    <section class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2 bg-gradient-to-br from-[#003366] to-[#004080] rounded-[2rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-[#003366]/20 group">
        <div class="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700"></div>
        <div class="relative z-10 space-y-6">
          <div class="inline-flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/10">
            <span class="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
            <span class="text-xs font-bold">Scientific Network Active</span>
          </div>
          <h1 class="text-4xl font-bold tracking-tight leading-none">
            Welcome Back, <br/> <span class="text-brand-cyan">{{ user?.fullName?.split(' ')[0] || 'Practitioner' }}</span>
          </h1>
          <p class="text-white/80 text-sm font-medium max-w-md leading-relaxed">
            Your credentials have been re-validated for the 2026 diagnostic cycle. You have access to the latest pathological archives.
          </p>
          <div class="flex items-center gap-6 pt-4">
            <NuxtLink to="/dashboard/library" class="bg-brand-cyan text-[#003366] px-8 py-3 rounded-xl text-xs font-bold hover:scale-105 transition-all">Explore Archives</NuxtLink>
            <NuxtLink to="/dashboard/portfolio" class="text-xs font-bold text-white/80 hover:text-white transition-colors">Update Profile</NuxtLink>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-[2rem] border border-slate-200 p-10 flex flex-col justify-between shadow-xl shadow-slate-200/50">
        <div class="space-y-4">
          <span class="text-xs font-bold text-slate-400">Membership Identity</span>
          <div class="flex items-center justify-between">
            <h3 class="text-2xl font-bold text-[#003366] tracking-tight leading-none">{{ user?.category || 'Professional' }}</h3>
            <div :class="statusClass" class="px-3 py-1 rounded-lg text-xs font-bold">
              {{ user?.status || 'Active' }}
            </div>
          </div>
          <div class="pt-6 space-y-3">
             <div class="flex justify-between items-center text-xs font-bold">
               <span class="text-slate-400">Renewal Date</span>
               <span class="text-slate-800">{{ renewalDate }}</span>
             </div>
             <div class="h-2 bg-slate-100 rounded-full overflow-hidden">
               <div :style="{ width: '75%' }" class="h-full bg-brand-cyan"></div>
             </div>
             <p class="text-xs text-slate-400 font-medium">75% of membership cycle remaining</p>
          </div>
        </div>
        <button class="w-full mt-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-[#003366] hover:bg-slate-100 transition-all">Download Virtual ID</button>
      </div>
    </section>

    <!-- Metrics Grid -->
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div v-for="metric in metrics" :key="metric.label" class="bg-white p-8 rounded-[1.5rem] border border-slate-200 shadow-lg shadow-slate-200/20 group hover:border-[#003366]/20 transition-all">
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
          <h3 class="text-sm font-bold text-slate-500">Latest Scientific Publications</h3>
          <NuxtLink to="/dashboard/library" class="text-xs font-bold text-brand-cyan hover:underline">View All Library</NuxtLink>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-for="pub in publications" :key="pub.title" class="bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-xl transition-all cursor-pointer group">
            <div class="flex items-start gap-5">
              <div class="w-16 h-20 bg-slate-100 rounded-lg flex-shrink-0 relative overflow-hidden group-hover:scale-105 transition-transform">
                 <Icon name="lucide:file-text" size="24" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-300" />
              </div>
              <div class="flex-1 min-w-0">
                <span class="text-xs font-bold text-brand-cyan">{{ pub.category }}</span>
                <h4 class="text-sm font-bold text-slate-800 tracking-tight truncate mt-1">{{ pub.title }}</h4>
                <p class="text-xs text-slate-500 font-medium leading-relaxed line-clamp-2 mt-2">{{ pub.desc }}</p>
                <div class="flex items-center gap-4 mt-4 text-xs font-medium text-slate-400">
                   <span>{{ pub.date }}</span>
                   <div class="w-1 h-1 bg-slate-200 rounded-full"></div>
                   <span>{{ pub.size }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions / Support -->
      <div class="space-y-6">
        <h3 class="text-sm font-bold text-slate-500">Quick Support</h3>
        <div class="bg-white p-8 rounded-[2rem] border border-slate-200 space-y-6 shadow-xl shadow-slate-200/30">
           <div class="space-y-2">
             <h4 class="text-sm font-bold text-[#003366]">Scientific Abstract Due</h4>
             <p class="text-xs text-slate-500 font-medium leading-relaxed">The International Scientific Congress abstract submission closes in 14 days.</p>
           </div>
           <NuxtLink to="/dashboard/abstracts" class="block w-full text-center bg-[#003366] text-white py-4 rounded-xl text-sm font-bold hover:bg-[#004080] transition-all shadow-lg shadow-[#003366]/20">Submit Abstract Now</NuxtLink>
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
definePageMeta({
  layout: 'dashboard'
})

const { user } = useUser()

const statusClass = computed(() => {
  const status = user.value?.status || 'Active'
  switch (status) {
    case 'Active': return 'bg-emerald-50 text-emerald-600 border border-emerald-100'
    case 'Pending': return 'bg-amber-50 text-amber-600 border border-amber-100'
    case 'Expired': return 'bg-rose-50 text-rose-600 border border-rose-100'
    default: return 'bg-slate-50 text-slate-600 border border-slate-100'
  }
})

const renewalDate = computed(() => {
  if (user.value?.expiryDate) return new Date(user.value.expiryDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
  return 'Dec 31, 2026'
})

const metrics = [
  { label: 'Publications Read', value: '24', icon: 'lucide:book-open', growth: '12' },
  { label: 'Conference Points', value: '450', icon: 'lucide:award', growth: '8' },
  { label: 'Global Rank', value: '#128', icon: 'lucide:trending-up', growth: '3' },
  { label: 'Abstracts', value: '03', icon: 'lucide:file-text', growth: '0' }
]

const publications = [
  { title: 'Cytopathology National Journal v4', desc: 'Case studies on cellular variance in West African pathology diagnostic modules.', category: 'Journal', date: 'Mar 2026', size: '4.2 MB' },
  { title: 'Lab Safety Protocol 2026', desc: 'Revised national standards for safety in cellular science laboratories.', category: 'Guidelines', date: 'Feb 2026', size: '1.8 MB' },
  { title: 'Annual Scientific Digest', desc: 'A collection of the most significant research papers from last years congress.', category: 'Digest', date: 'Jan 2026', size: '8.4 MB' },
  { title: 'Histology Research Paper', desc: 'Advancements in molecular markers for early detection techniques.', category: 'Research', date: 'Dec 2025', size: '2.1 MB' }
]
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
