<template>
  <div class="space-y-8 pb-20 font-body">

    <!-- ─── PAGE HEADER ─────────────────────────────────────── -->
    <section class="bg-white border-b rounded-lg border-slate-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">
        <div class="flex items-start justify-between gap-6 flex-wrap">
          <div class="max-w-xl">
            <div class="inline-flex items-center gap-2 bg-blue-50 text-[#1d4e89] text-xs font-semibold px-4 py-2 rounded-full mb-5 border border-blue-100">
              <LucideLifeBuoy :size="13" />
              Help Center
            </div>
            <h1 class="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight tracking-tight mb-2">
              Support Tickets
            </h1>
            <p class="text-[14px] text-slate-500 leading-relaxed">
              {{ cmsConfig?.member?.portal?.announcementText || 'Need help? Open a ticket to reach our administrative or technical teams.' }}
            </p>
          </div>

          <button
            @click="openNewTicket"
            class="shrink-0 inline-flex items-center gap-2 bg-[#1d4e89] hover:bg-blue-800 text-white text-[13px] font-semibold px-5 py-2.5 rounded-xl transition-colors duration-200"
          >
            <LucideLifeBuoy :size="15" />
            New Request
          </button>
        </div>
      </div>
    </section>


    <!-- ─── STATS STRIP ──────────────────────────────────────── -->
    <section class="bg-slate-50 border-b border-slate-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="grid sm:grid-cols-3 gap-4">

          <div class="bg-white border border-slate-200 rounded-2xl p-5 hover:border-blue-200 hover:shadow-sm transition-all duration-300 flex items-center gap-4">
            <div class="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
              <LucideTicket :size="17" class="text-[#1d4e89]" />
            </div>
            <div>
              <p class="text-[11px] font-semibold text-blue-600 tracking-widest uppercase mb-0.5">Total Tickets</p>
              <p class="text-[18px] font-bold text-slate-900">{{ tickets.length }}</p>
            </div>
          </div>

          <div class="bg-white border border-slate-200 rounded-2xl p-5 hover:border-blue-200 hover:shadow-sm transition-all duration-300 flex items-center gap-4">
            <div class="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
              <LucideCircleDot :size="17" class="text-[#1d4e89]" />
            </div>
            <div>
              <p class="text-[11px] font-semibold text-blue-600 tracking-widests uppercase mb-0.5">Open</p>
              <p class="text-[18px] font-bold text-slate-900">{{ tickets.filter(t => t.status === 'Open').length }}</p>
            </div>
          </div>

          <div class="bg-white border border-slate-200 rounded-2xl p-5 hover:border-blue-200 hover:shadow-sm transition-all duration-300 flex items-center gap-4">
            <div class="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
              <LucideCheckCircle :size="17" class="text-emerald-600" />
            </div>
            <div>
              <p class="text-[11px] font-semibold text-emerald-600 tracking-widest uppercase mb-0.5">Resolved</p>
              <p class="text-[18px] font-bold text-slate-900">{{ tickets.filter(t => t.status === 'Resolved').length }}</p>
            </div>
          </div>

        </div>
      </div>
    </section>


    <!-- ─── TICKETS TABLE ────────────────────────────────────── -->
    <section class="bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <div class="bg-white border border-slate-200 rounded-2xl overflow-hidden">

          <!-- Table header bar -->
          <div class="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-100">
            <div>
              <p class="text-[11px] font-semibold text-slate-400 tracking-widest uppercase mb-0.5">Records</p>
              <h3 class="text-[15px] font-bold text-slate-800">Support History</h3>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-[#1d4e89] animate-pulse" />
              <p class="text-[11px] font-semibold text-slate-400 tracking-widest uppercase">Active Tickets</p>
            </div>
          </div>

          <!-- Empty state -->
          <div v-if="tickets.length === 0" class="py-20 text-center">
            <div class="w-14 h-14 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <LucideLifeBuoy :size="22" class="text-slate-300" />
            </div>
            <p class="text-[11px] font-semibold text-slate-400 tracking-widest uppercase mb-2">All clear</p>
            <h4 class="text-[16px] font-bold text-slate-800 mb-1">No Support Requests</h4>
            <p class="text-[13px] text-slate-400">Everything looks clear in your help center.</p>
          </div>

          <!-- Table -->
          <div v-else class="overflow-x-auto">
            <table class="w-full text-left">
              <thead>
                <tr class="border-b border-slate-100">
                  <th class="px-6 py-4 text-[11px] font-semibold text-slate-400 tracking-widest uppercase">Ticket ID</th>
                  <th class="px-6 py-4 text-[11px] font-semibold text-slate-400 tracking-widest uppercase">Subject</th>
                  <th class="px-6 py-4 text-[11px] font-semibold text-slate-400 tracking-widest uppercase">Priority</th>
                  <th class="px-6 py-4 text-[11px] font-semibold text-slate-400 tracking-widest uppercase">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-50">
                <tr
                  v-for="ticket in tickets"
                  :key="ticket.id"
                  @click="openTicketDrawer(ticket)"
                  class="group hover:bg-slate-50/60 cursor-pointer transition-colors"
                >
                  <td class="px-6 py-5">
                    <span class="text-[13px] font-bold text-[#1d4e89] font-mono group-hover:underline">#{{ ticket.id }}</span>
                  </td>
                  <td class="px-6 py-5">
                    <p class="text-[14px] font-bold text-slate-800">{{ ticket.subject }}</p>
                    <div class="flex items-center gap-2 mt-0.5">
                      <p class="text-[11px] font-semibold text-slate-400">{{ ticket.category }}</p>
                      <span class="text-slate-300 text-xs">•</span>
                      <p class="text-[11px] font-medium text-slate-400">{{ ticket.date }}</p>
                    </div>
                  </td>
                  <td class="px-6 py-5">
                    <div
                      class="inline-flex items-center gap-1.5 text-[11px] font-bold"
                      :class="ticket.priority === 'High' ? 'text-rose-500' : 'text-slate-400'"
                    >
                      <LucideAlertCircle v-if="ticket.priority === 'High'" :size="13" />
                      <LucideMinus v-else :size="13" />
                      {{ ticket.priority }}
                    </div>
                  </td>
                  <td class="px-6 py-5">
                    <span
                      :class="[
                        'inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1.5 rounded-lg border',
                        ticket.status === 'Resolved'
                          ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                          : ticket.status === 'Open'
                          ? 'bg-blue-50 text-[#1d4e89] border-blue-100'
                          : 'bg-slate-100 text-slate-500 border-slate-200'
                      ]"
                    >
                      <span v-if="ticket.status === 'Open'" class="w-1.5 h-1.5 rounded-full bg-[#1d4e89] animate-pulse" />
                      {{ ticket.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </section>


    <!-- ─── DRAWER: VIEW TICKET ──────────────────────────────── -->
    <SideDrawer
      :isOpen="isDrawerOpen"
      title="Support Conversation"
      :subtitle="'#' + selectedTicket?.id"
      @close="isDrawerOpen = false"
    >
      <div v-if="selectedTicket" class="space-y-6">

        <!-- Ticket meta -->
        <div class="bg-white border border-slate-200 rounded-2xl p-6 flex items-start justify-between gap-4">
          <div>
            <p class="text-[11px] font-semibold text-blue-600 tracking-widest uppercase mb-1">Category</p>
            <h3 class="text-[15px] font-bold text-slate-800">{{ selectedTicket.category }}</h3>
            <p class="text-[12px] text-slate-400 font-medium mt-0.5">Opened on {{ selectedTicket.date }}</p>
          </div>
          <span
            :class="[
              'text-[11px] font-bold px-3 py-1.5 rounded-lg border shrink-0',
              selectedTicket.status === 'Resolved'
                ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                : 'bg-blue-50 text-[#1d4e89] border-blue-100'
            ]"
          >
            {{ selectedTicket.status }}
          </span>
        </div>

        <!-- User message -->
        <div class="space-y-3">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-[#1d4e89] text-white rounded-xl flex items-center justify-center font-bold text-[12px]">SC</div>
            <p class="text-[11px] font-semibold text-slate-400 tracking-widest uppercase">Inquiry Message</p>
          </div>
          <div class="bg-slate-50 border border-slate-100 rounded-2xl p-6">
            <h4 class="text-[14px] font-bold text-slate-800 mb-2">{{ selectedTicket.subject }}</h4>
            <p class="text-[13px] text-slate-500 leading-relaxed">{{ selectedTicket.content }}</p>
          </div>
        </div>

        <!-- Admin response -->
        <div v-if="selectedTicket.response" class="space-y-3">
          <div class="flex items-center justify-end gap-3">
            <p class="text-[11px] font-semibold text-slate-400 tracking-widest uppercase">Administrative Response</p>
            <div class="w-8 h-8 bg-blue-50 border border-blue-100 text-[#1d4e89] rounded-xl flex items-center justify-center">
              <LucideShieldCheck :size="14" />
            </div>
          </div>
          <div class="bg-blue-50/40 border border-blue-100 rounded-2xl p-6 ml-6">
            <p class="text-[13px] font-semibold text-slate-700 leading-relaxed">{{ selectedTicket.response }}</p>
          </div>
        </div>

        <!-- Resolved note -->
        <div v-if="selectedTicket.status === 'Resolved'" class="bg-emerald-50 border border-emerald-100 rounded-xl p-4 text-center">
          <p class="text-[11px] font-bold text-emerald-600 tracking-widest uppercase">Ticket Resolved & Archived</p>
        </div>

      </div>

      <template #footer>
        <div class="flex gap-3">
          <button
            @click="isDrawerOpen = false"
            class="flex-1 py-3 bg-white border border-slate-200 hover:border-slate-300 text-slate-600 text-[13px] font-semibold rounded-xl transition-all"
          >
            Close
          </button>
          <button
            v-if="selectedTicket?.status === 'Open'"
            @click="requestCancel"
            class="flex-1 py-3 bg-white border border-slate-200 text-slate-600 text-[13px] font-semibold rounded-xl hover:bg-rose-50 hover:border-rose-100 hover:text-rose-600 transition-all inline-flex items-center justify-center gap-2"
          >
            <LucideLock :size="13" />
            Mark as Resolved
          </button>
        </div>
      </template>
    </SideDrawer>


    <!-- ─── DRAWER: NEW TICKET ───────────────────────────────── -->
    <SideDrawer
      :isOpen="isNewTicketDrawerOpen"
      title="Open Support Ticket"
      subtitle="How can we assist you today?"
      @close="isNewTicketDrawerOpen = false"
    >
      <div class="space-y-5">

        <!-- Strategic note -->
        <div class="bg-[#1d4e89] rounded-2xl p-6 relative overflow-hidden">
          <LucideLifeBuoy
            :size="90"
            class="absolute -right-4 -bottom-4 opacity-[0.07] text-white pointer-events-none"
          />
          <p class="text-[11px] font-semibold text-blue-300 tracking-widest uppercase mb-2">Support Request</p>
          <p class="text-[13px] text-blue-100 leading-relaxed">
            Provide as much detail as possible. Our team will respond within 24–48 hours.
          </p>
        </div>

        <div class="space-y-1.5">
          <label class="text-[12px] font-semibold text-slate-500">Subject</label>
          <input
            v-model="ticketForm.subject"
            type="text"
            placeholder="Brief summary of your inquiry…"
            class="field"
          />
        </div>

        <div class="space-y-1.5">
          <label class="text-[12px] font-semibold text-slate-500">Department / Category</label>
          <div class="relative">
            <select v-model="ticketForm.category" class="field appearance-none cursor-pointer pr-9">
              <option>Technical Support</option>
              <option>Billing</option>
              <option>Membership</option>
              <option>Events</option>
            </select>
            <LucideChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" :size="16" />
          </div>
        </div>

        <div class="space-y-1.5">
          <label class="text-[12px] font-semibold text-slate-500">Priority Level</label>
          <div class="relative">
            <select v-model="ticketForm.priority" class="field appearance-none cursor-pointer pr-9">
              <option>Normal</option>
              <option>High</option>
            </select>
            <LucideChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" :size="16" />
          </div>
        </div>

        <div class="space-y-1.5">
          <label class="text-[12px] font-semibold text-slate-500">Detailed Description</label>
          <textarea
            v-model="ticketForm.content"
            rows="6"
            placeholder="Please provide as much detail as possible to help us assist you faster…"
            class="field resize-none leading-relaxed"
          />
        </div>

      </div>

      <template #footer>
        <div class="flex gap-3">
          <button
            @click="isNewTicketDrawerOpen = false"
            class="flex-1 py-3 bg-white border border-slate-200 hover:border-slate-300 text-slate-600 text-[13px] font-semibold rounded-xl transition-all"
          >
            Cancel
          </button>
          <button
            @click="createTicket"
            :disabled="isCreating"
            class="flex-1 py-3 bg-[#1d4e89] hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed text-white text-[13px] font-semibold rounded-xl transition-colors duration-200 inline-flex items-center justify-center gap-2"
          >
            <div v-if="isCreating" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <LucidePlus v-else :size="14" />
            {{ isCreating ? 'Opening…' : 'Open Ticket' }}
          </button>
        </div>
      </template>
    </SideDrawer>


    <!-- ─── CONFIRM MODAL ────────────────────────────────────── -->
    <ConfirmModal
      :isOpen="showCancelModal"
      title="Resolve Ticket"
      message="This will mark the ticket as resolved and archive the conversation. Proceed?"
      confirmText="Yes, resolve it"
      cancelText="Keep open"
      confirmStyle="primary"
      icon="lucide:check-circle"
      @confirm="confirmCancel"
      @cancel="showCancelModal = false"
    />

  </div>
</template>


<script setup>
import { ref, reactive } from 'vue'
import {
  LucideLifeBuoy,
  LucideTicket,
  LucideCircleDot,
  LucideCheckCircle,
  LucideAlertCircle,
  LucideMinus,
  LucideShieldCheck,
  LucideLock,
  LucidePlus,
  LucideChevronDown,
} from 'lucide-vue-next'
import { useCustomToast } from '@/composables/core/useCustomToast'
import { useCMS } from '@/composables/useCMS'

const { cmsConfig } = useCMS()

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

const { showToast } = useCustomToast()

const isDrawerOpen        = ref(false)
const isNewTicketDrawerOpen = ref(false)
const isCreating          = ref(false)
const showCancelModal     = ref(false)
const selectedTicket      = ref(null)

const ticketForm = reactive({
  subject:  '',
  category: 'Technical Support',
  priority: 'Normal',
  content:  '',
})

const tickets = ref([
  {
    id: 'TKT-9912',
    subject: 'Cannot upload multiple abstract documents',
    category: 'Technical Support',
    date: 'Apr 07, 2026',
    priority: 'Normal',
    status: 'Open',
    content: 'When I try to upload my PDF along with the images, the system says the payload is too large. What is the limit?',
    response: null,
  },
  {
    id: 'TKT-8451',
    subject: 'Membership fee discrepancy',
    category: 'Billing',
    date: 'Jan 10, 2026',
    priority: 'High',
    status: 'Resolved',
    content: 'My credit card was charged $350 but the invoice says $300.',
    response: 'Apologies for the confusion. The additional $50 was the late penalty as outlined in the invoice footer. We have waived it for you and issued a refund.',
  },
])

const openNewTicket = () => { isNewTicketDrawerOpen.value = true }

const createTicket = async () => {
  if (!ticketForm.subject || !ticketForm.content) {
    showToast({ title: 'Missing Info', message: 'Please provide a subject and description.', toastType: 'warning' })
    return
  }
  isCreating.value = true
  setTimeout(() => {
    tickets.value.unshift({
      id: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
      subject:  ticketForm.subject,
      category: ticketForm.category,
      date:     new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      priority: ticketForm.priority,
      status:   'Open',
      content:  ticketForm.content,
      response: null,
    })
    isCreating.value = false
    isNewTicketDrawerOpen.value = false
    ticketForm.subject  = ''
    ticketForm.category = 'Technical Support'
    ticketForm.priority = 'Normal'
    ticketForm.content  = ''
    showToast({ title: 'Ticket Opened', message: 'Your support request has been queued.', toastType: 'success' })
  }, 1500)
}

const openTicketDrawer = (t) => { selectedTicket.value = t; isDrawerOpen.value = true }
const requestCancel    = () => { showCancelModal.value = true }
const confirmCancel    = () => {
  showCancelModal.value = false
  isDrawerOpen.value   = false
  if (selectedTicket.value) {
    selectedTicket.value.status = 'Resolved'
    showToast({ title: 'Ticket Resolved', message: 'The ticket has been archived.', toastType: 'info' })
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
</style>