<template>
  <div class="space-y-10 max-w-7xl mx-auto animate-fade-in">
    <!-- Search and Filter Header -->
    <header class="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-xl shadow-slate-200/20 flex flex-col md:flex-row gap-8 items-center justify-between">
      <div class="flex-1 min-w-0">
        <h1 class="text-3xl font-bold text-slate-800 tracking-tight leading-none">Digital Library</h1>
        <p class="text-sm font-semibold text-slate-400 mt-2">Authenticated Access to SCPSN Scientific Archives</p>
      </div>
      
      <div class="flex items-center gap-4 w-full md:w-auto">
        <div class="relative flex-1 md:w-80 group">
          <input 
            v-model="searchQuery"
            placeholder="Search publications..."
            class="w-full bg-slate-50 border border-slate-100 py-4 pl-12 pr-6 rounded-2xl text-[11px] font-bold text-slate-600 focus:ring-4 focus:ring-brand-cyan/5 focus:border-brand-cyan/20 outline-none transition-all placeholder:text-slate-300"
          />
          <Icon name="lucide:search" size="18" class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-cyan transition-colors" />
        </div>
        
        <select v-model="selectedCategory" class="bg-slate-50 border border-slate-100 px-6 py-4 rounded-2xl text-xs font-bold text-[#003366] outline-none hover:border-brand-cyan/20 transition-all cursor-pointer">
          <option value="all">All Categories</option>
          <option value="journal">Scientific Journals</option>
          <option value="guidelines">Clinical Guidelines</option>
          <option value="monograph">Monographs</option>
          <option value="digest">Congress Digests</option>
        </select>
      </div>
    </header>

    <!-- Restricted Access Message (If Pending) -->
    <div v-if="user?.status !== 'Active'" class="bg-amber-50 border border-amber-200 rounded-2xl p-8 flex items-center gap-8 shadow-lg shadow-amber-500/5">
       <div class="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-amber-500 shadow-sm shrink-0 border border-amber-100">
         <Icon name="lucide:lock" size="28" />
       </div>
       <div class="space-y-1">
          <h4 class="text-sm font-bold text-amber-900">Access Restricted • Verification Required</h4>
          <p class="text-xs text-amber-700/80 font-medium leading-relaxed">Full access to the digital library is exclusive to active members. Your status is currently <span class="font-bold text-amber-900">Pending</span>. Please complete your registration documents to unlock the archives.</p>
       </div>
       <NuxtLink to="/dashboard/portfolio" class="ml-auto bg-amber-500 text-white px-8 py-3 rounded-xl text-xs font-bold hover:bg-amber-600 transition-all whitespace-nowrap">Verify Status</NuxtLink>
    </div>

    <!-- Library Grid -->
    <div v-if="filteredPublications.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
       <div 
        v-for="pub in filteredPublications" 
        :key="pub.title"
        class="bg-white rounded-[2rem] border border-slate-200 p-8 flex flex-col group hover:border-brand-cyan/20 hover:shadow-2xl transition-all relative"
        :class="user?.status !== 'Active' ? 'opacity-50 grayscale pointer-events-none' : 'cursor-pointer'"
       >
         <!-- Category Tag -->
         <div class="mb-6 flex justify-between items-start">
            <span class="px-3 py-1 bg-slate-50 border border-slate-100 rounded-lg text-[8px] font-black text-brand-cyan uppercase tracking-widest">{{ pub.category }}</span>
            <button class="p-2 text-slate-300 hover:text-[#003366] transition-colors"><Icon name="lucide:bookmark" size="18" /></button>
         </div>

         <!-- Thumbnail / Icon -->
         <div class="w-full aspect-[4/5] bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 mb-8 relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500 shadow-inner">
            <Icon name="lucide:book-marked" size="48" class="text-slate-200" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>
         </div>

         <!-- Meta -->
         <div class="space-y-3 flex-grow">
            <h3 class="text-sm font-bold text-slate-800 tracking-tight leading-tight line-clamp-2 group-hover:text-[#003366] transition-colors">{{ pub.title }}</h3>
            <p class="text-[10px] text-slate-400 font-medium leading-relaxed line-clamp-3 italic">"{{ pub.description }}"</p>
         </div>

         <div class="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
            <div class="text-[8px] font-bold text-slate-400 uppercase tracking-widest">
              {{ pub.publishDate }}
            </div>
            <button 
              @click="download(pub)"
              class="flex items-center gap-3 text-[9px] font-black text-[#003366] uppercase tracking-widest group-hover:text-brand-cyan transition-colors"
            >
              Secure Link
              <Icon name="lucide:external-link" size="14" />
            </button>
         </div>
       </div>
    </div>

    <!-- Empty State -->
    <div v-else class="py-40 text-center flex flex-col items-center justify-center bg-white rounded-[4rem] border border-slate-100 shadow-inner group">
       <div class="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center border border-slate-100 mb-8 group-hover:rotate-12 transition-transform duration-500">
         <Icon name="lucide:file-search" size="32" class="text-slate-200" />
       </div>
       <h3 class="text-lg font-bold text-slate-800 tracking-tight mb-2">No scientific matches found</h3>
       <p class="text-xs text-slate-400 font-medium max-w-xs mx-auto leading-relaxed">Adjust your search parameters or filter by a different scientific category.</p>
       <button @click="resetFilters" class="mt-8 text-sm font-bold text-brand-cyan hover:underline">Reset Diagnostic Filter</button>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'dashboard'
})

const { user } = useUser()

const searchQuery = ref('')
const selectedCategory = ref('all')
const publications = ref([])

onMounted(async () => {
  try {
    const config = useRuntimeConfig()
    const apiBase = config.public.apiBase || 'http://localhost:3000/api'
    const siteConfig = await $fetch(`${apiBase}/cms/config`)
    publications.value = siteConfig.publications || [
      { 
        title: 'Cytopathology National Journal v4', 
        description: 'Comprehensive analysis of diagnostic variances in tropical cellular pathology.', 
        category: 'journal', 
        publishDate: 'Mar 2026',
        fileUrl: '#'
      },
      { 
        title: 'Diagnostic Safety Standards 2026', 
        description: 'New safety protocols for laboratory practitioners across Nigeria.', 
        category: 'guidelines', 
        publishDate: 'Feb 2026',
        fileUrl: '#'
      },
      { 
        title: 'SCPSN Scientific Digest', 
        description: 'Key highlights and abstracts from the 2025 International Congress.', 
        category: 'digest', 
        publishDate: 'Jan 2026',
        fileUrl: '#'
      },
      { 
        title: 'Advanced Microscopy Monograph', 
        description: 'A deep dive into electron microscopy advancements in cellular science.', 
        category: 'monograph', 
        publishDate: 'Dec 2025',
        fileUrl: '#'
      }
    ]
  } catch (err) {
    console.error('Library fetch error:', err)
  }
})

const filteredPublications = computed(() => {
  return publications.value.filter(pub => {
    const matchesSearch = pub.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          pub.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory = selectedCategory.value === 'all' || pub.category === selectedCategory.value
    return matchesSearch && matchesCategory
  })
})

const resetFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = 'all'
}

const download = (pub) => {
  if (user.value?.status !== 'Active') {
    alert('Full access is restricted. Please complete your registration verification.')
    return
  }
  // Logic to open/download PDF would go here
  if (pub.fileUrl !== '#') window.open(pub.fileUrl, '_blank')
  else alert('Scientific Link not yet active for this publication. Please check back shortly.')
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
