<template>
  <div class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-slate-800 tracking-tight">Abstracts</h1>
        <p class="text-slate-500 font-medium mt-1 text-sm">Submit and manage your scientific papers and conference abstracts.</p>
      </div>
      <button @click="openSubmitForm" class="btn-premium flex items-center gap-2 px-8 py-4">
        <Icon name="lucide:plus" size="18" />
        New Submission
      </button>
    </div>

    <!-- Abstracts Table -->
    <div class="bg-white rounded-[2rem] border border-slate-200 overflow-hidden mt-8">
      <div class="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <h3 class="text-xs font-black text-slate-400 lowercase">submission archives</h3>
        <div class="flex gap-2">
           <span class="w-2 h-2 rounded-full bg-emerald-500 border border-white mt-1"></span>
           <p class="text-xs font-semibold text-slate-500 line-clamp-1 max-w-[200px]">Call for Papers is Open until May 2026</p>
        </div>
      </div>
      <div class="overflow-x-auto custom-scrollbar">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50 border-b border-slate-100">
              <th class="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">ID</th>
              <th class="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">Scientific Title</th>
              <th class="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">Date</th>
              <th class="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
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

    <!-- Side Drawer: View Details -->
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

    <!-- Side Drawer: New Submission -->
    <SideDrawer 
      :isOpen="isSubmitDrawerOpen" 
      title="New Abstract Submission" 
      subtitle="Complete the form to submit your research"
      @close="isSubmitDrawerOpen = false"
    >
      <div class="p-8 space-y-8">
        <div class="space-y-6">
           <AnimatedInput 
             v-model="submissionForm.title"
             label="Research Title"
             placeholder="e.g. Analysis of Cellular Morphologies..."
             required
           />
           <AnimatedInput 
             v-model="submissionForm.authors"
             label="Authors"
             placeholder="e.g. Dr. Jane Doe, Prof. Mark Smith"
             required
           />
           <AnimatedInput 
             v-model="submissionForm.content"
             type="textarea"
             label="Abstract Content"
             placeholder="Paste your research abstract here..."
             :rows="10"
             required
           />
           
           <div class="p-6 border-2 border-dashed border-slate-200 rounded-3xl text-center space-y-3 group hover:border-brand-cyan transition-all cursor-pointer" @click="$refs.docInput.click()">
              <Icon name="lucide:upload-cloud" size="32" class="text-slate-300 group-hover:text-brand-cyan transition-colors mx-auto" />
              <div class="space-y-1">
                 <p class="text-xs font-bold text-slate-700">Attach Supplementary PDF</p>
                 <p class="text-[10px] text-slate-400">Optional: Charts, graphs, or full paper (Max 10MB)</p>
              </div>
              <input type="file" ref="docInput" class="hidden" accept=".pdf" @change="handleFileChange" />
              <p v-if="submissionForm.fileName" class="text-xs font-bold text-brand-cyan mt-2">{{ submissionForm.fileName }}</p>
           </div>
        </div>
      </div>

      <template #footer>
         <div class="flex gap-3">
            <button @click="isSubmitDrawerOpen = false" class="flex-1 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-bold">Cancel</button>
            <button @click="submitAbstract" :disabled="isSubmitting" class="flex-1 py-3 bg-brand-dark text-white rounded-xl text-xs font-bold hover:bg-[#002244] transition-all flex justify-center items-center gap-2 disabled:opacity-50">
               <Icon v-if="isSubmitting" name="lucide:loader-2" class="animate-spin" size="16" />
               <Icon v-else name="lucide:send" size="16" />
               Submit Abstract
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
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useCustomToast } from '@/composables/core/useCustomToast'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

const { showToast } = useCustomToast()
const isDrawerOpen = ref(false)
const isSubmitDrawerOpen = ref(false)
const isSubmitting = ref(false)
const showRetractModal = ref(false)
const selectedAbstract = ref(null)

const submissionForm = reactive({
  title: '',
  authors: '',
  content: '',
  file: null,
  fileName: ''
})

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

const openSubmitForm = () => {
  isSubmitDrawerOpen.value = true
}

const handleFileChange = (e) => {
  const file = e.target.files[0]
  if (file) {
    submissionForm.file = file
    submissionForm.fileName = file.name
  }
}

const submitAbstract = async () => {
  if (!submissionForm.title || !submissionForm.authors || !submissionForm.content) {
    showToast({ title: 'Missing Fields', message: 'Please complete all required fields.', toastType: 'warning' })
    return
  }

  isSubmitting.value = true
  
  // Mock API call
  setTimeout(() => {
    const newAbstract = {
      id: `AB-${Math.floor(1000 + Math.random() * 9000)}`,
      title: submissionForm.title,
      authors: submissionForm.authors,
      content: submissionForm.content,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      status: 'Under Review',
      feedback: null
    }
    
    abstracts.value.unshift(newAbstract)
    isSubmitting.value = false
    isSubmitDrawerOpen.value = false
    
    // Reset form
    submissionForm.title = ''
    submissionForm.authors = ''
    submissionForm.content = ''
    submissionForm.file = null
    submissionForm.fileName = ''
    
    showToast({ title: 'Success', message: 'Research abstract submitted successfully.', toastType: 'success' })
  }, 2000)
}

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
  if (selectedAbstract.value) {
     abstracts.value = abstracts.value.filter(a => a.id !== selectedAbstract.value.id)
     showToast({ title: 'Retracted', message: 'Submission has been removed.', toastType: 'info' })
  }
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

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}
</style>
