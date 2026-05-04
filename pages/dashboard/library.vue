<template>
  <div class="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
    <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
      <div>
        <h1 class="text-4xl font-black text-slate-800 tracking-tight">{{ cmsConfig?.member?.pages?.library?.title || 'Scientific Library' }}</h1>
        <p class="text-slate-500 font-medium mt-1">{{ cmsConfig?.member?.pages?.library?.subtitle || 'Access the national archive of journals, protocols, and research papers.' }}</p>
      </div>
      
      <div class="flex items-center gap-4">
        <div class="relative group min-w-[300px]">
          <input 
            type="text" 
            v-model="searchQuery"
            placeholder="Search publications..." 
            class="w-full h-12 pl-12 pr-4 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-[#003366]/5 focus:border-[#003366]/20 transition-all shadow-sm"
          />
          <Icon name="lucide:search" size="18" class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#003366] transition-colors" />
        </div>
      </div>
    </div>

    <!-- Categories Tab -->
    <div class="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
       <button 
         v-for="cat in ['All', 'Journal', 'Research', 'Digest', 'Guidelines']" 
         :key="cat"
         @click="activeCategory = cat"
         :class="[
           'px-6 py-2.5 rounded-xl text-xs font-black transition-all border shrink-0',
           activeCategory === cat ? 'bg-[#003366] text-white border-[#003366] shadow-lg shadow-[#003366]/20' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-300'
         ]"
       >
         {{ cat }}
       </button>
    </div>

    <!-- Recent Reads Section (List Format) -->
    <section v-if="recentReads.length > 0" class="space-y-6">
       <div class="flex items-center gap-3">
          <Icon name="lucide:history" size="18" class="text-brand-cyan" />
          <h3 class="text-xs font-black text-slate-400">Continue reading</h3>
       </div>
       <div class="space-y-3">
          <div 
            v-for="pub in recentReads" 
            :key="'recent-'+pub.id"
            @click="openReader(pub)"
            class="bg-white p-4 rounded-2xl border border-slate-100 hover:border-brand-cyan transition-all cursor-pointer group shadow-sm flex items-center gap-6"
          >
             <div class="w-12 h-14 bg-slate-50 rounded-xl relative overflow-hidden flex items-center justify-center shrink-0 border border-slate-100 group-hover:bg-[#003366] group-hover:text-white transition-all duration-300">
                <Icon name="lucide:file-text" size="20" />
                <div class="absolute inset-x-0 bottom-0 h-1.5 bg-brand-cyan"></div>
             </div>
             <div class="flex-1 min-w-0">
                <div class="flex items-center gap-3">
                   <h4 class="text-sm font-bold text-slate-800 line-clamp-1 group-hover:text-brand-cyan transition-colors">{{ pub.title }}</h4>
                   <span class="px-2 py-0.5 rounded-md text-[8px] font-black bg-slate-100 text-slate-500">{{ pub.category }}</span>
                </div>
                <p class="text-[10px] font-medium text-slate-400 mt-0.5">Last opened on {{ pub.date }} • {{ pub.pages }} pages</p>
             </div>
             <div class="px-4 py-2 bg-slate-50 rounded-xl text-[10px] font-black text-slate-400 group-hover:text-[#003366] transition-colors">
                Resume Reading
             </div>
          </div>
       </div>
    </section>

    <!-- Main Library Table -->
    <div class="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm">
      <div class="overflow-x-auto custom-scrollbar-light">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50/50 border-b border-slate-100">
              <th class="px-8 py-6 text-[10px] font-black text-slate-400">Scientific title</th>
              <th class="px-8 py-6 text-[10px] font-black text-slate-400">Category</th>
              <th class="px-8 py-6 text-[10px] font-black text-slate-400">Authors</th>
              <th class="px-8 py-6 text-[10px] font-black text-slate-400">Engagement</th>
              <th class="px-8 py-6 text-[10px] font-black text-slate-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
            <tr 
              v-for="pub in filteredPublications" 
              :key="pub.id"
              class="hover:bg-slate-50/50 transition-all group"
            >
              <td class="px-8 py-6">
                <div class="flex items-center gap-4">
                   <div class="w-10 h-12 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100 group-hover:bg-[#003366] group-hover:text-white transition-all duration-300">
                      <Icon name="lucide:file-text" size="18" />
                   </div>
                   <div class="min-w-0">
                      <h4 class="text-sm font-bold text-slate-800 tracking-tight group-hover:text-brand-cyan transition-colors truncate max-w-md">{{ pub.title }}</h4>
                      <p class="text-[11px] font-medium text-slate-400 mt-0.5">{{ pub.date }} • {{ pub.size }}</p>
                   </div>
                </div>
              </td>
              <td class="px-8 py-6">
                <span :class="[
                  'px-3 py-1 rounded-lg text-[9px] font-black border whitespace-nowrap',
                  pub.category === 'Journal' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                  pub.category === 'Research' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                  pub.category === 'Guidelines' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                  'bg-amber-50 text-amber-600 border-amber-100'
                ]">
                  {{ pub.category }}
                </span>
              </td>
              <td class="px-8 py-6">
                <p class="text-xs font-semibold text-slate-500 truncate max-w-[200px]">{{ pub.authors }}</p>
              </td>
              <td class="px-8 py-6">
                <div class="flex items-center gap-4 text-[10px] font-black text-slate-400">
                   <div class="flex items-center gap-1.5">
                      <Icon name="lucide:book-open" size="14" class="text-slate-300" />
                      {{ pub.pages }} p
                   </div>
                   <div class="flex items-center gap-1.5">
                      <Icon name="lucide:eye" size="14" class="text-slate-300" />
                      {{ pub.readCount }}
                   </div>
                </div>
              </td>
              <td class="px-8 py-6">
                <div class="flex items-center justify-end gap-2">
                   <button 
                     @click="openReader(pub)"
                     class="px-4 py-2 bg-[#003366] text-white rounded-lg text-[10px] font-black hover:bg-[#002244] transition-all flex items-center gap-2"
                   >
                      <Icon name="lucide:glasses" size="14" />
                      Read
                   </button>
                   <button class="w-10 h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-slate-400 hover:text-brand-cyan hover:border-brand-cyan transition-all">
                      <Icon name="lucide:download" size="16" />
                   </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        
        <div v-if="filteredPublications.length === 0" class="p-20 text-center">
           <Icon name="lucide:search-x" size="48" class="text-slate-200 mx-auto mb-4" />
           <p class="text-sm font-bold text-slate-400">No publications match your search criteria.</p>
        </div>
      </div>
    </div>

    <!-- Scientific Reader Overlay -->
    <SideDrawer 
      :isOpen="isReaderOpen" 
      :title="selectedPub?.title" 
      :subtitle="selectedPub?.category + ' • ' + selectedPub?.authors"
      @close="isReaderOpen = false"
    >
      <div v-if="selectedPub" class="space-y-12 pb-20">
         <!-- Document Stats -->
         <div class="grid grid-cols-4 gap-4">
            <div v-for="(val, lab) in { Pages: selectedPub.pages, Size: selectedPub.size, Date: selectedPub.date, Reads: selectedPub.readCount }" :key="lab" class="p-4 bg-white border border-slate-100 rounded-2xl text-center">
               <p class="text-[10px] font-black text-slate-400">{{ lab }}</p>
               <p class="text-xs font-bold text-[#003366] mt-1">{{ val }}</p>
            </div>
         </div>

         <!-- Abstract / Summary -->
         <div class="space-y-4">
            <h4 class="text-xs font-black text-slate-400 flex items-center gap-2">
               <Icon name="lucide:info" size="14" class="text-brand-cyan" />
               Executive Summary
            </h4>
            <div class="bg-blue-50/30 p-8 rounded-[2rem] border border-blue-100/50">
               <p class="text-base text-slate-700 leading-relaxed italic font-serif">
                  "{{ selectedPub.desc }} This document provides a comprehensive analysis for practitioners in the field of cellular pathology. It covers the latest diagnostic frameworks and standardizes the reporting protocols as of {{ selectedPub.date }}."
               </p>
            </div>
         </div>

         <!-- Content Simulator -->
         <div class="space-y-8 bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden">
            <div class="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -z-10"></div>
            <div class="space-y-6">
               <div v-for="i in 5" :key="i" class="space-y-3">
                  <div class="h-4 bg-slate-100 rounded-full w-1/3"></div>
                  <div class="space-y-2">
                     <div class="h-2.5 bg-slate-50 rounded-full w-full"></div>
                     <div class="h-2.5 bg-slate-50 rounded-full w-5/6"></div>
                     <div class="h-2.5 bg-slate-50 rounded-full w-4/6"></div>
                  </div>
               </div>
            </div>
            <!-- Immersive Warning -->
            <div class="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center p-12 text-center">
               <div class="max-w-xs space-y-4">
                  <Icon name="lucide:lock" size="32" class="text-[#003366] mx-auto" />
                  <h4 class="text-lg font-bold text-slate-800">Secure Document Viewer</h4>
                  <p class="text-sm text-slate-500 font-medium">To maintain scientific integrity, full documents are available in PDF format for verified practitioners.</p>
                  <button class="w-full bg-[#003366] text-white py-4 rounded-xl text-xs font-bold hover:bg-[#002244] transition-all flex items-center justify-center gap-2">
                     <Icon name="lucide:file-down" size="16" />
                     Download Full Paper
                  </button>
               </div>
            </div>
         </div>
      </div>
      
      <template #footer>
         <div class="flex gap-3">
            <button @click="isReaderOpen = false" class="flex-1 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-bold">Close Reader</button>
            <button class="flex-1 py-3 bg-brand-cyan text-[#003366] rounded-xl text-xs font-bold hover:scale-[1.02] transition-all flex justify-center items-center gap-2">
               <Icon name="lucide:share-2" size="16" />
               Share Archive
            </button>
         </div>
      </template>
    </SideDrawer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useLibrary } from '@/composables/useLibrary'
import { useCMS } from '@/composables/useCMS'

const { cmsConfig } = useCMS()

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

const { publications, recentReads, trackRead } = useLibrary()
const searchQuery = ref('')
const activeCategory = ref('All')
const isReaderOpen = ref(false)
const selectedPub = ref(null)

const filteredPublications = computed(() => {
  return publications.value.filter(pub => {
    const matchesSearch = pub.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                         pub.authors.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory = activeCategory.value === 'All' || pub.category === activeCategory.value
    return matchesSearch && matchesCategory
  })
})

const openReader = (pub) => {
  selectedPub.value = pub
  isReaderOpen.value = true
  trackRead(pub)
}
</script>

<style scoped>
.animate-in {
  animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
