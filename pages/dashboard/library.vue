<template>
  <div class="space-y-8 pb-20 font-body">

    <!-- ─── PAGE HEADER ───────────────────────────────────────── -->
    <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
      <div>
        <p class="text-[11px] font-semibold text-blue-600 tracking-widest uppercase mb-1">Archive</p>
        <h1 class="text-[26px] font-bold text-slate-800 leading-snug">
          {{ cmsConfig?.member?.pages?.library?.title || 'Scientific Library' }}
        </h1>
        <p class="text-[14px] text-slate-400 font-medium mt-1">
          {{ cmsConfig?.member?.pages?.library?.subtitle || 'Access the national archive of journals, protocols, and research papers.' }}
        </p>
      </div>

      <!-- Search -->
      <div class="relative min-w-[280px]">
        <LucideSearch :size="15" class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search publications..."
          class="w-full h-11 pl-10 pr-4 bg-white border border-slate-200 rounded-xl text-[14px] text-slate-700 placeholder:text-slate-400 outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-50 transition-all duration-200"
        />
      </div>
    </div>


    <!-- ─── CATEGORY TABS ──────────────────────────────────────── -->
    <div class="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
      <button
        v-for="cat in categories"
        :key="cat"
        @click="activeCategory = cat"
        class="px-5 py-2 rounded-xl text-[12px] font-semibold transition-all duration-200 border shrink-0"
        :class="activeCategory === cat
          ? 'bg-[#1d4e89] text-white border-[#1d4e89]'
          : 'bg-white text-slate-500 border-slate-200 hover:border-blue-200 hover:text-[#1d4e89]'"
      >
        {{ cat }}
      </button>
    </div>


    <!-- ─── CONTINUE READING ───────────────────────────────────── -->
    <section v-if="recentReads.length > 0" class="space-y-4">
      <div class="flex items-center gap-2">
        <LucideHistory :size="14" class="text-[#1d4e89]" />
        <p class="text-[11px] font-semibold text-slate-400 tracking-widest uppercase">Continue Reading</p>
      </div>

      <div class="space-y-3">
        <div
          v-for="pub in recentReads"
          :key="'recent-' + pub.id"
          @click="openReader(pub)"
          class="bg-white border border-slate-200 rounded-2xl p-4 hover:border-blue-200 hover:shadow-sm transition-all duration-200 cursor-pointer group flex items-center gap-5"
        >
          <div class="w-10 h-12 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-[#1d4e89] group-hover:border-[#1d4e89] transition-all duration-300 relative overflow-hidden">
            <LucideFileText :size="16" class="text-slate-400 group-hover:text-white transition-colors duration-300" />
            <div class="absolute bottom-0 inset-x-0 h-0.5 bg-[#1d4e89] group-hover:bg-blue-200"></div>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-1">
              <h4 class="text-[14px] font-bold text-slate-800 line-clamp-1 group-hover:text-[#1d4e89] transition-colors duration-200">{{ pub.title }}</h4>
              <span :class="categoryBadge(pub.category)" class="text-[10px] font-bold px-2 py-0.5 rounded-md flex-shrink-0">{{ pub.category }}</span>
            </div>
            <p class="text-[11px] font-medium text-slate-400">Last opened {{ pub.date }} · {{ pub.pages }} pages</p>
          </div>
          <div class="text-[11px] font-semibold text-slate-400 group-hover:text-[#1d4e89] bg-slate-50 group-hover:bg-blue-50 border border-slate-200 group-hover:border-blue-200 px-3 py-1.5 rounded-lg transition-all duration-200 flex-shrink-0">
            Resume
          </div>
        </div>
      </div>
    </section>


    <!-- ─── MAIN LIBRARY TABLE ─────────────────────────────────── -->
    <div class="bg-white border border-slate-200 rounded-2xl overflow-hidden">

      <!-- Table bar -->
      <div class="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
        <p class="text-[11px] font-semibold text-slate-400 tracking-widest uppercase">All Publications</p>
        <p class="text-[12px] font-semibold text-slate-400">{{ filteredPublications.length }} results</p>
      </div>

      <div class="overflow-x-auto custom-scrollbar">
        <table class="w-full text-left">
          <thead>
            <tr class="border-b border-slate-100">
              <th class="px-6 py-4 text-[11px] font-semibold text-slate-400 tracking-widest uppercase">Scientific Title</th>
              <th class="px-6 py-4 text-[11px] font-semibold text-slate-400 tracking-widest uppercase">Category</th>
              <th class="px-6 py-4 text-[11px] font-semibold text-slate-400 tracking-widest uppercase">Authors</th>
              <th class="px-6 py-4 text-[11px] font-semibold text-slate-400 tracking-widest uppercase">Engagement</th>
              <th class="px-6 py-4 text-[11px] font-semibold text-slate-400 tracking-widest uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
            <tr
              v-for="pub in filteredPublications"
              :key="pub.id"
              class="hover:bg-slate-50/60 transition-colors duration-150 group"
            >
              <td class="px-6 py-5">
                <div class="flex items-center gap-4">
                  <div class="w-9 h-11 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-[#1d4e89] group-hover:border-[#1d4e89] transition-all duration-300 relative overflow-hidden">
                    <LucideFileText :size="15" class="text-slate-400 group-hover:text-white transition-colors duration-300" />
                    <div class="absolute bottom-0 inset-x-0 h-0.5 bg-[#1d4e89] group-hover:bg-blue-200"></div>
                  </div>
                  <div class="min-w-0">
                    <h4 class="text-[14px] font-bold text-slate-800 group-hover:text-[#1d4e89] transition-colors duration-150 truncate max-w-xs lg:max-w-md">{{ pub.title }}</h4>
                    <p class="text-[11px] font-medium text-slate-400 mt-0.5">{{ pub.date }} · {{ pub.size }}</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-5">
                <span :class="categoryBadge(pub.category)" class="text-[10px] font-bold px-3 py-1 rounded-lg whitespace-nowrap">
                  {{ pub.category }}
                </span>
              </td>
              <td class="px-6 py-5">
                <p class="text-[13px] font-medium text-slate-500 truncate max-w-[180px]">{{ pub.authors }}</p>
              </td>
              <td class="px-6 py-5">
                <div class="flex items-center gap-4 text-[12px] font-semibold text-slate-400">
                  <div class="flex items-center gap-1.5">
                    <LucideBookOpen :size="13" class="text-slate-300" />
                    {{ pub.pages }}p
                  </div>
                  <div class="flex items-center gap-1.5">
                    <LucideEye :size="13" class="text-slate-300" />
                    {{ pub.readCount }}
                  </div>
                </div>
              </td>
              <td class="px-6 py-5">
                <div class="flex items-center justify-end gap-2">
                  <button
                    @click="openReader(pub)"
                    class="inline-flex items-center gap-1.5 bg-[#1d4e89] hover:bg-blue-800 text-white text-[12px] font-semibold px-4 py-2 rounded-xl transition-colors duration-200"
                  >
                    <LucideGlasses :size="13" />
                    Read
                  </button>
                  <button class="w-9 h-9 bg-white border border-slate-200 hover:border-blue-200 hover:bg-blue-50 rounded-xl flex items-center justify-center text-slate-400 hover:text-[#1d4e89] transition-all duration-200">
                    <LucideDownload :size="14" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Empty state -->
        <div v-if="filteredPublications.length === 0" class="py-16 text-center">
          <div class="w-14 h-14 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <LucideSearchX :size="22" class="text-slate-400" />
          </div>
          <p class="text-[11px] font-semibold text-slate-400 tracking-widest uppercase mb-2">No Results</p>
          <p class="text-[14px] font-semibold text-slate-600">No publications match your search criteria.</p>
        </div>
      </div>
    </div>


    <!-- ─── READER DRAWER ──────────────────────────────────────── -->
    <SideDrawer
      :isOpen="isReaderOpen"
      :title="selectedPub?.title"
      :subtitle="selectedPub?.category + ' · ' + selectedPub?.authors"
      @close="isReaderOpen = false"
    >
      <div v-if="selectedPub" class="p-7 space-y-7 pb-20">

        <!-- Stats strip -->
        <div class="grid grid-cols-4 gap-3">
          <div
            v-for="(val, lab) in { Pages: selectedPub.pages, Size: selectedPub.size, Date: selectedPub.date, Reads: selectedPub.readCount }"
            :key="lab"
            class="bg-slate-50 border border-slate-200 rounded-2xl p-3 text-center hover:border-blue-200 transition-colors duration-200"
          >
            <p class="text-[10px] font-semibold text-slate-400 tracking-widest uppercase mb-1">{{ lab }}</p>
            <p class="text-[13px] font-bold text-[#1d4e89]">{{ val }}</p>
          </div>
        </div>

        <!-- Executive summary -->
        <div class="space-y-3">
          <div class="flex items-center gap-2">
            <LucideInfo :size="13" class="text-[#1d4e89]" />
            <p class="text-[11px] font-semibold text-slate-400 tracking-widest uppercase">Executive Summary</p>
          </div>
          <div class="bg-blue-50 border border-blue-100 rounded-2xl p-6">
            <p class="text-[14px] text-slate-700 leading-relaxed italic">
              "{{ selectedPub.desc }} This document provides a comprehensive analysis for practitioners in the field of cellular pathology. It covers the latest diagnostic frameworks and standardizes the reporting protocols as of {{ selectedPub.date }}."
            </p>
          </div>
        </div>

        <!-- Content simulator + lock -->
        <div class="bg-slate-50 border border-slate-200 rounded-2xl p-6 relative overflow-hidden">
          <!-- Skeleton lines -->
          <div class="space-y-6 opacity-30">
            <div v-for="i in 4" :key="i" class="space-y-2">
              <div class="h-3 bg-slate-200 rounded-full w-1/3"></div>
              <div class="h-2 bg-slate-200 rounded-full w-full"></div>
              <div class="h-2 bg-slate-200 rounded-full w-5/6"></div>
              <div class="h-2 bg-slate-200 rounded-full w-4/6"></div>
            </div>
          </div>

          <!-- Lock overlay -->
          <div class="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center p-8">
            <div class="text-center space-y-4 max-w-xs">
              <div class="w-12 h-12 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center mx-auto">
                <LucideLock :size="20" class="text-[#1d4e89]" />
              </div>
              <div>
                <p class="text-[11px] font-semibold text-blue-600 tracking-widest uppercase mb-1.5">Secure Document</p>
                <h4 class="text-[16px] font-bold text-slate-800 mb-2">Secure Document Viewer</h4>
                <p class="text-[13px] text-slate-500 leading-relaxed">Full documents are available in PDF format for verified practitioners only.</p>
              </div>
              <button class="w-full inline-flex items-center justify-center gap-2 bg-[#1d4e89] hover:bg-blue-800 text-white text-[13px] font-semibold py-3 rounded-xl transition-colors duration-200">
                <LucideFileDown :size="14" />
                Download Full Paper
              </button>
            </div>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="flex gap-3 p-5 border-t border-slate-100">
          <button
            @click="isReaderOpen = false"
            class="flex-1 py-3 bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-600 rounded-xl text-[13px] font-semibold transition-all duration-200"
          >
            Close Reader
          </button>
          <button
            class="flex-1 py-3 bg-[#1d4e89] hover:bg-blue-800 text-white rounded-xl text-[13px] font-semibold transition-colors duration-200 inline-flex items-center justify-center gap-2"
          >
            <LucideShare2 :size="14" />
            Share Archive
          </button>
        </div>
      </template>
    </SideDrawer>

  </div>
</template>


<script setup>
import {
  LucideSearch,
  LucideSearchX,
  LucideHistory,
  LucideFileText,
  LucideBookOpen,
  LucideEye,
  LucideGlasses,
  LucideDownload,
  LucideInfo,
  LucideLock,
  LucideFileDown,
  LucideShare2,
} from 'lucide-vue-next'
import { ref, computed } from 'vue'
import { useLibrary } from '@/composables/useLibrary'
import { useCMS } from '@/composables/useCMS'

const { cmsConfig } = useCMS()

definePageMeta({ layout: 'dashboard', middleware: 'auth' })

const { publications, recentReads, trackRead } = useLibrary()

const searchQuery = ref('')
const activeCategory = ref('All')
const isReaderOpen = ref(false)
const selectedPub = ref(null)

const categories = ['All', 'Journal', 'Research', 'Digest', 'Guidelines']

const categoryBadge = (cat) => {
  if (cat === 'Journal')    return 'bg-blue-50 text-[#1d4e89] border border-blue-100'
  if (cat === 'Research')   return 'bg-emerald-50 text-emerald-700 border border-emerald-100'
  if (cat === 'Guidelines') return 'bg-red-50 text-red-600 border border-red-100'
  return 'bg-amber-50 text-amber-700 border border-amber-100'
}

const filteredPublications = computed(() =>
  publications.value.filter(pub => {
    const matchesSearch =
      pub.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      pub.authors.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory = activeCategory.value === 'All' || pub.category === activeCategory.value
    return matchesSearch && matchesCategory
  })
)

const openReader = (pub) => {
  selectedPub.value = pub
  isReaderOpen.value = true
  trackRead(pub)
}
</script>


<style scoped>
.font-body {
  font-family: 'DM Sans', 'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif;
}

.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
</style>