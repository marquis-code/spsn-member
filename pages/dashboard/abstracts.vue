<template>
  <div class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-slate-800 tracking-tight">Abstracts</h1>
        <p class="text-slate-500 font-medium mt-1 text-sm">Submit and manage your scientific papers and conference abstracts.</p>
      </div>
      <button @click="showSubmitModal = true" class="btn-premium flex items-center gap-2">
        <Icon name="lucide:upload" size="18" />
        New Submission
      </button>
    </div>

    <!-- Abstracts Table -->
    <div class="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden mt-8">
      <div class="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <h3 class="text-base font-bold text-slate-800 tracking-tight">My Submissions</h3>
        <div class="flex gap-2">
           <span class="w-2 h-2 rounded-full bg-emerald-500 border border-white mt-1"></span>
           <p class="text-xs font-semibold text-slate-500 line-clamp-1 max-w-[200px]">Call for Papers is Open until May 2026</p>
        </div>
      </div>
      <div class="overflow-x-auto custom-scrollbar">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50 border-b border-slate-100">
              <th class="px-8 py-5 text-xs font-bold text-slate-500">ID</th>
              <th class="px-8 py-5 text-xs font-bold text-slate-500">Title</th>
              <th class="px-8 py-5 text-xs font-bold text-slate-500">Submission Date</th>
              <th class="px-8 py-5 text-xs font-bold text-slate-500">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
            <tr 
              v-for="paper in abstracts" 
              :key="paper.id"
              @click="openAbstractDrawer(paper)"
              class="hover:bg-slate-50/50 cursor-pointer transition-colors group"
            >
              <td class="px-8 py-5 text-xs font-semibold text-brand-dark group-hover:text-brand-cyan transition-colors">
                #{{ paper.id }}
              </td>
              <td class="px-8 py-5">
                <p class="text-sm font-bold text-slate-800">{{ paper.title }}</p>
                <p class="text-[11px] font-medium text-slate-400 mt-0.5 line-clamp-1 w-64">{{ paper.authors }}</p>
              </td>
              <td class="px-8 py-5 text-xs font-medium text-slate-500">{{ paper.date }}</td>
              <td class="px-8 py-5">
                <span :class="[
                  'px-3 py-1 text-[10px] font-bold rounded-lg',
                  paper.status === 'Accepted' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                  paper.status === 'Under Review' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                  'bg-slate-100 text-slate-600 border border-slate-200'
                ]">
                  {{ paper.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        
        <div v-if="abstracts.length === 0" class="p-16 text-center">
            <div class="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="lucide:file-text" size="24" />
            </div>
            <h4 class="text-base font-bold text-slate-800">No Submissions Found</h4>
            <p class="text-sm font-medium text-slate-500 mt-1">You haven't submitted any abstracts yet.</p>
        </div>
      </div>
    </div>

    <!-- Side Drawer -->
    <SideDrawer 
      :isOpen="isDrawerOpen" 
      title="Abstract Details" 
      :subtitle="'#' + selectedAbstract?.id"
      @close="isDrawerOpen = false"
    >
      <div v-if="selectedAbstract" class="p-8 space-y-8">
        <div>
           <span :class="[
                  'px-3 py-1 text-[10px] font-bold rounded-lg inline-block mb-4',
                  selectedAbstract.status === 'Accepted' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                  selectedAbstract.status === 'Under Review' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                  'bg-slate-100 text-slate-600 border border-slate-200'
                ]">
                  Status: {{ selectedAbstract.status }}
           </span>
           <h3 class="text-xl font-bold text-slate-800 leading-snug">{{ selectedAbstract.title }}</h3>
           <p class="text-sm font-medium text-brand-cyan mt-2">{{ selectedAbstract.authors }}</p>
        </div>

        <div class="space-y-4">
           <h4 class="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2">Full Abstract</h4>
           <p class="text-sm text-slate-600 leading-relaxed indent-4">{{ selectedAbstract.content }}</p>
        </div>
        
        <div class="space-y-4" v-if="selectedAbstract.feedback">
           <h4 class="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2">Reviewer Feedback</h4>
           <div class="p-4 bg-amber-50 border border-amber-100 rounded-2xl text-sm font-medium text-amber-800">
              "{{ selectedAbstract.feedback }}"
           </div>
        </div>
      </div>

      <template #footer>
         <div class="flex gap-3">
            <button @click="isDrawerOpen = false" class="flex-1 py-3 bg-white border border-slate-200 hover:border-slate-300 text-slate-600 rounded-xl text-xs font-bold transition-all">Close</button>
            <button v-if="selectedAbstract?.status !== 'Accepted'" @click="requestRetract" class="flex-1 py-3 bg-rose-50 border border-rose-200 text-rose-600 rounded-xl text-xs font-bold hover:bg-rose-100 hover:border-rose-300 transition-all flex justify-center items-center gap-2">
               <Icon name="lucide:trash-2" size="16" />
               Retract Submission
            </button>
         </div>
      </template>
    </SideDrawer>

    <!-- Modals -->
    <ConfirmModal
      :isOpen="showRetractModal"
      title="Retract Submission"
      message="Are you sure you want to completely retract your abstract? You cannot undo this action."
      confirmText="Yes, retract it"
      cancelText="Keep it"
      confirmStyle="danger"
      icon="lucide:alert-triangle"
      @confirm="confirmRetract"
      @cancel="showRetractModal = false"
    />
    
    <ConfirmModal
      :isOpen="showSubmitModal"
      title="Upload System Unavailable"
      message="The abstract upload portal is currently closed for maintenance. Please try again in 24 hours."
      confirmText="Okay"
      cancelText="Close"
      confirmStyle="primary"
      icon="lucide:info"
      @confirm="showSubmitModal = false"
      @cancel="showSubmitModal = false"
    />
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

const isDrawerOpen = ref(false)
const showRetractModal = ref(false)
const showSubmitModal = ref(false)
const selectedAbstract = ref(null)

const abstracts = ref([
  { 
    id: 'AB-2045', 
    title: 'Cellular Morphology Irregularities in Early Stage Type-2 Diabetes', 
    authors: 'Dr. John Doe, Dr. Jane Smith', 
    date: 'Feb 10, 2026', 
    status: 'Under Review',
    content: 'We present a microscopic analysis evaluating cellular malformations typically undiagnosed in early onset T2D...',
    feedback: 'Fascinating approach. Please clarify the sample size selection criteria in section 2 before final approval.'
  },
  { 
    id: 'AB-1092', 
    title: 'Advancements in Cytodiagnostics: A Review', 
    authors: 'Dr. John Doe', 
    date: 'Aug 14, 2025', 
    status: 'Accepted',
    content: 'A comprehensive review examining machine learning methodologies applied to traditional cytodiagnostics...',
    feedback: null
  }
])

const openAbstractDrawer = (paper) => {
  selectedAbstract.value = paper
  isDrawerOpen.value = true
}

const requestRetract = () => {
  showRetractModal.value = true
}

const confirmRetract = () => {
  showRetractModal.value = false
  isDrawerOpen.value = false
  // filter it out simply
  if (selectedAbstract.value) {
     abstracts.value = abstracts.value.filter(a => a.id !== selectedAbstract.value.id)
  }
}
</script>
