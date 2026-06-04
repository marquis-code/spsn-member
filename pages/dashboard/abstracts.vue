<template>
  <div class="space-y-8 pb-20 font-body">

    <!-- ─── PAGE HEADER ───────────────────────────────────────── -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <p class="text-[11px] font-semibold text-blue-600 tracking-widest uppercase mb-1">Research</p>
        <h1 class="text-[26px] font-bold text-slate-800 leading-snug">
          {{ cmsConfig?.member?.pages?.abstracts?.title || 'Abstracts' }}
        </h1>
        <p class="text-[14px] text-slate-400 font-medium mt-1">
          {{ cmsConfig?.member?.pages?.abstracts?.subtitle || 'Submit and manage your scientific papers and conference abstracts.' }}
        </p>
      </div>
      <button
        @click="openSubmitForm"
        class="inline-flex items-center gap-2 bg-[#1d4e89] hover:bg-blue-800 text-white text-[13px] font-semibold px-5 py-3 rounded-xl transition-colors duration-200 flex-shrink-0"
      >
        <LucidePlus :size="15" />
        New Submission
      </button>
    </div>


    <!-- ─── ABSTRACTS TABLE ────────────────────────────────────── -->
    <div class="bg-white border border-slate-200 rounded-2xl overflow-hidden">

      <!-- Table header bar -->
      <div class="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
        <p class="text-[11px] font-semibold text-slate-400 tracking-widest uppercase">Submission Archives</p>
        <div class="inline-flex items-center gap-2 bg-blue-50 text-[#1d4e89] text-[11px] font-semibold px-3 py-1.5 rounded-full border border-blue-100">
          <span class="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
          {{ cmsConfig?.member?.pages?.abstracts?.deadlineText || 'Call for Papers Open · May 2026' }}
        </div>
      </div>

      <div class="overflow-x-auto custom-scrollbar">
        <table class="w-full text-left">
          <thead>
            <tr class="border-b border-slate-100">
              <th class="px-6 py-4 text-[11px] font-semibold text-slate-400 tracking-widest uppercase">ID</th>
              <th class="px-6 py-4 text-[11px] font-semibold text-slate-400 tracking-widest uppercase">Scientific Title</th>
              <th class="px-6 py-4 text-[11px] font-semibold text-slate-400 tracking-widest uppercase">Date</th>
              <th class="px-6 py-4 text-[11px] font-semibold text-slate-400 tracking-widest uppercase">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
            <tr
              v-for="paper in abstracts"
              :key="paper.id"
              @click="openAbstractDrawer(paper)"
              class="hover:bg-slate-50/60 cursor-pointer transition-colors duration-150 group"
            >
              <td class="px-6 py-5 text-[13px] font-bold text-slate-400 group-hover:text-[#1d4e89] transition-colors duration-150">
                #{{ paper.id }}
              </td>
              <td class="px-6 py-5">
                <p class="text-[14px] font-bold text-slate-800 group-hover:text-[#1d4e89] transition-colors duration-150">{{ paper.title }}</p>
                <p class="text-[11px] font-medium text-slate-400 mt-0.5 line-clamp-1 max-w-xs">{{ paper.authors }}</p>
              </td>
              <td class="px-6 py-5 text-[13px] font-medium text-slate-500">{{ paper.date }}</td>
              <td class="px-6 py-5">
                <span :class="statusBadge(paper.status)" class="text-[11px] font-bold px-3 py-1 rounded-lg">
                  {{ paper.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Empty state -->
        <div v-if="abstracts.length === 0" class="py-16 text-center">
          <div class="w-14 h-14 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <LucideFileText :size="22" class="text-slate-400" />
          </div>
          <p class="text-[11px] font-semibold text-slate-400 tracking-widest uppercase mb-2">No submissions yet</p>
          <h4 class="text-[15px] font-bold text-slate-700 mb-1">No Submissions Found</h4>
          <p class="text-[13px] font-medium text-slate-400">You haven't submitted any abstracts yet.</p>
        </div>
      </div>
    </div>


    <!-- ─── DRAWER: VIEW ABSTRACT ──────────────────────────────── -->
    <SideDrawer
      :isOpen="isDrawerOpen"
      title="Abstract Details"
      :subtitle="'#' + selectedAbstract?.id"
      @close="isDrawerOpen = false"
    >
      <div v-if="selectedAbstract" class="p-7 space-y-7">

        <!-- Status + title -->
        <div>
          <span :class="statusBadge(selectedAbstract.status)" class="text-[11px] font-bold px-3 py-1 rounded-lg inline-block mb-4">
            {{ selectedAbstract.status }}
          </span>
          <h3 class="text-[18px] font-bold text-slate-800 leading-snug">{{ selectedAbstract.title }}</h3>
          <p class="text-[13px] font-semibold text-[#1d4e89] mt-2">{{ selectedAbstract.authors }}</p>
        </div>

        <!-- Full abstract -->
        <div class="space-y-3">
          <p class="text-[11px] font-semibold text-slate-400 tracking-widest uppercase border-b border-slate-100 pb-3">Full Abstract</p>
          <p class="text-[14px] text-slate-600 leading-relaxed">{{ selectedAbstract.content }}</p>
        </div>

        <!-- Reviewer feedback -->
        <div v-if="selectedAbstract.feedback" class="space-y-3">
          <p class="text-[11px] font-semibold text-slate-400 tracking-widest uppercase border-b border-slate-100 pb-3">Reviewer Feedback</p>
          <div class="bg-amber-50 border border-amber-100 rounded-2xl p-5">
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <LucideMessageSquare :size="14" class="text-amber-700" />
              </div>
              <p class="text-[13px] font-medium text-amber-800 leading-relaxed">"{{ selectedAbstract.feedback }}"</p>
            </div>
          </div>
        </div>

      </div>

      <template #footer>
        <div class="flex gap-3 p-5 border-t border-slate-100">
          <button
            @click="isDrawerOpen = false"
            class="flex-1 py-3 bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-600 rounded-xl text-[13px] font-semibold transition-all duration-200"
          >
            Close
          </button>
          <button
            v-if="selectedAbstract?.status !== 'Accepted'"
            @click="requestRetract"
            class="flex-1 py-3 bg-red-50 border border-red-100 hover:bg-red-100 hover:border-red-200 text-red-600 rounded-xl text-[13px] font-semibold transition-all duration-200 inline-flex items-center justify-center gap-2"
          >
            <LucideTrash2 :size="14" />
            Retract Submission
          </button>
        </div>
      </template>
    </SideDrawer>


    <!-- ─── DRAWER: NEW SUBMISSION ─────────────────────────────── -->
    <SideDrawer
      :isOpen="isSubmitDrawerOpen"
      title="New Abstract Submission"
      subtitle="Complete the form to submit your research"
      @close="isSubmitDrawerOpen = false"
    >
      <div class="p-7 space-y-5">

        <div class="space-y-1.5">
          <label class="text-[12px] font-semibold text-slate-500">Research Title</label>
          <input
            v-model="submissionForm.title"
            type="text"
            placeholder="e.g. Analysis of Cellular Morphologies..."
            class="field"
            required
          />
        </div>

        <div class="space-y-1.5">
          <label class="text-[12px] font-semibold text-slate-500">Authors</label>
          <input
            v-model="submissionForm.authors"
            type="text"
            placeholder="e.g. Dr. Jane Doe, Prof. Mark Smith"
            class="field"
            required
          />
        </div>

        <div class="space-y-1.5">
          <label class="text-[12px] font-semibold text-slate-500">Abstract Content</label>
          <textarea
            v-model="submissionForm.content"
            rows="10"
            placeholder="Paste your research abstract here..."
            class="field resize-none leading-relaxed"
            required
          ></textarea>
        </div>

        <!-- File upload -->
        <div
          @click="$refs.docInput.click()"
          class="border border-dashed border-slate-200 hover:border-[#1d4e89] hover:bg-blue-50/20 rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 group"
        >
          <div class="w-10 h-10 bg-slate-50 border border-slate-200 group-hover:bg-blue-50 group-hover:border-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3 transition-all duration-200">
            <LucideUploadCloud :size="18" class="text-slate-400 group-hover:text-[#1d4e89] transition-colors duration-200" />
          </div>
          <p class="text-[13px] font-semibold text-slate-700 mb-1">Attach Supplementary PDF</p>
          <p class="text-[11px] text-slate-400">Optional · Charts, graphs, or full paper · Max 10MB</p>
          <p v-if="submissionForm.fileName" class="text-[12px] font-bold text-[#1d4e89] mt-3">{{ submissionForm.fileName }}</p>
          <input type="file" ref="docInput" class="hidden" accept=".pdf" @change="handleFileChange" />
        </div>

      </div>

      <template #footer>
        <div class="flex gap-3 p-5 border-t border-slate-100">
          <button
            @click="isSubmitDrawerOpen = false"
            class="flex-1 py-3 bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-600 rounded-xl text-[13px] font-semibold transition-all duration-200"
          >
            Cancel
          </button>
          <button
            @click="submitAbstract"
            :disabled="isSubmitting"
            class="flex-1 py-3 bg-[#1d4e89] hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-[13px] font-semibold transition-all duration-200 inline-flex items-center justify-center gap-2"
          >
            <LucideLoader2 v-if="isSubmitting" :size="14" class="animate-spin" />
            <LucideSend v-else :size="14" />
            {{ isSubmitting ? 'Submitting...' : 'Submit Abstract' }}
          </button>
        </div>
      </template>
    </SideDrawer>


    <!-- ─── CONFIRM MODAL ─────────────────────────────────────── -->
    <ConfirmModal
      :isOpen="showRetractModal"
      title="Retract Submission"
      message="Are you sure you want to completely retract your abstract? This action cannot be undone."
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
import {
  LucidePlus,
  LucideFileText,
  LucideTrash2,
  LucideUploadCloud,
  LucideLoader2,
  LucideSend,
  LucideMessageSquare,
} from 'lucide-vue-next'
import { ref, reactive } from 'vue'
import { useCustomToast } from '@/composables/core/useCustomToast'
import { useCMS } from '@/composables/useCMS'

const { cmsConfig } = useCMS()

definePageMeta({ layout: 'dashboard', middleware: 'auth' })

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
  fileName: '',
})

const abstracts = ref([
  {
    id: 'AB-2045',
    title: 'Cellular Morphology Irregularities in Early Stage Type-2 Diabetes',
    authors: 'Dr. John Doe, Dr. Jane Smith',
    date: 'Feb 10, 2026',
    status: 'Under Review',
    content: 'We present a microscopic analysis evaluating cellular malformations typically undiagnosed in early onset T2D...',
    feedback: 'Fascinating approach. Please clarify the sample size selection criteria in section 2 before final approval.',
  },
  {
    id: 'AB-1092',
    title: 'Advancements in Cytodiagnostics: A Review',
    authors: 'Dr. John Doe',
    date: 'Aug 14, 2025',
    status: 'Accepted',
    content: 'A comprehensive review examining machine learning methodologies applied to traditional cytodiagnostics...',
    feedback: null,
  },
])

const statusBadge = (status) => {
  if (status === 'Accepted') return 'bg-emerald-50 text-emerald-700 border border-emerald-100'
  if (status === 'Under Review') return 'bg-blue-50 text-[#1d4e89] border border-blue-100'
  return 'bg-slate-100 text-slate-600 border border-slate-200'
}

const openSubmitForm = () => { isSubmitDrawerOpen.value = true }

const handleFileChange = (e) => {
  const file = e.target.files[0]
  if (file) { submissionForm.file = file; submissionForm.fileName = file.name }
}

const submitAbstract = async () => {
  if (!submissionForm.title || !submissionForm.authors || !submissionForm.content) {
    showToast({ title: 'Missing Fields', message: 'Please complete all required fields.', toastType: 'warning' })
    return
  }
  isSubmitting.value = true
  setTimeout(() => {
    abstracts.value.unshift({
      id: `AB-${Math.floor(1000 + Math.random() * 9000)}`,
      title: submissionForm.title,
      authors: submissionForm.authors,
      content: submissionForm.content,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      status: 'Under Review',
      feedback: null,
    })
    isSubmitting.value = false
    isSubmitDrawerOpen.value = false
    Object.assign(submissionForm, { title: '', authors: '', content: '', file: null, fileName: '' })
    showToast({ title: 'Success', message: 'Research abstract submitted successfully.', toastType: 'success' })
  }, 2000)
}

const openAbstractDrawer = (paper) => { selectedAbstract.value = paper; isDrawerOpen.value = true }
const requestRetract = () => { showRetractModal.value = true }
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
.font-body {
  font-family: 'DM Sans', 'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif;
}

.field {
  @apply w-full bg-slate-50 border border-slate-200 text-slate-800 placeholder:text-slate-400 text-[14px] px-4 py-3 rounded-xl focus:outline-none focus:border-blue-300 focus:bg-white focus:ring-2 focus:ring-blue-50 transition-all duration-200;
}

.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
</style>