<template>
  <div class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-slate-800 tracking-tight">Support Tickets</h1>
        <p class="text-slate-500 font-medium mt-1 text-sm">Need help? Open a ticket to reach our administrative or technical teams.</p>
      </div>
      <button @click="showNewTicketModal = true" class="btn-premium flex items-center gap-2">
        <Icon name="lucide:life-buoy" size="18" />
        New Request
      </button>
    </div>

    <!-- Tickets Table -->
    <div class="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden mt-8">
      <div class="overflow-x-auto custom-scrollbar">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50 border-b border-slate-100">
              <th class="px-8 py-5 text-xs font-bold text-slate-500">Ticket ID</th>
              <th class="px-8 py-5 text-xs font-bold text-slate-500">Subject</th>
              <th class="px-8 py-5 text-xs font-bold text-slate-500">Last Updated</th>
              <th class="px-8 py-5 text-xs font-bold text-slate-500">Priority</th>
              <th class="px-8 py-5 text-xs font-bold text-slate-500">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
            <tr 
              v-for="ticket in tickets" 
              :key="ticket.id"
              @click="openTicketDrawer(ticket)"
              class="hover:bg-slate-50/50 cursor-pointer transition-colors group"
            >
              <td class="px-8 py-5 text-xs font-semibold text-brand-dark group-hover:text-brand-cyan transition-colors">
                #{{ ticket.id }}
              </td>
              <td class="px-8 py-5">
                <p class="text-sm font-bold text-slate-800">{{ ticket.subject }}</p>
                <p class="text-[11px] font-medium text-slate-400 mt-0.5">{{ ticket.category }}</p>
              </td>
              <td class="px-8 py-5 text-xs font-medium text-slate-500">{{ ticket.date }}</td>
              <td class="px-8 py-5">
                 <span class="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                    <Icon v-if="ticket.priority === 'High'" name="lucide:chevron-up" class="text-rose-500" size="14" />
                    <Icon v-else-if="ticket.priority === 'Normal'" name="lucide:minus" class="text-slate-400" size="14" />
                    {{ ticket.priority }}
                 </span>
              </td>
              <td class="px-8 py-5">
                <span :class="[
                  'px-3 py-1 text-[10px] font-bold rounded-lg inline-flex items-center gap-1.5',
                  ticket.status === 'Resolved' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                  ticket.status === 'Open' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                  'bg-slate-100 text-slate-600 border border-slate-200'
                ]">
                  <span v-if="ticket.status === 'Open'" class="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                  {{ ticket.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Support Drawer -->
    <SideDrawer 
      :isOpen="isDrawerOpen" 
      title="Ticket Conversation" 
      :subtitle="'#' + selectedTicket?.id"
      @close="isDrawerOpen = false"
    >
      <div v-if="selectedTicket" class="p-8 space-y-6">
         <!-- Original Inquiry -->
         <div class="space-y-3">
             <div class="flex items-center gap-3 mb-2">
                 <div class="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 font-bold text-xs">Me</div>
                 <p class="text-xs font-bold text-slate-500">{{ selectedTicket.date }}</p>
             </div>
             <div class="bg-slate-50 p-5 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm">
                <h4 class="text-sm font-bold text-slate-800 mb-2 border-b border-slate-200 pb-2">{{ selectedTicket.subject }}</h4>
                <p class="text-sm font-medium text-slate-600">{{ selectedTicket.content }}</p>
             </div>
         </div>

         <!-- Response -->
         <div class="space-y-3" v-if="selectedTicket.response">
             <div class="flex items-center justify-end gap-3 mb-2">
                 <p class="text-xs font-bold text-slate-500">Support Admin</p>
                 <div class="w-8 h-8 bg-brand-cyan text-brand-dark rounded-full flex items-center justify-center font-bold text-xs"><Icon name="lucide:bot" size="14" /></div>
             </div>
             <div class="bg-brand-cyan/10 p-5 rounded-2xl rounded-tr-none border border-brand-cyan/20 shadow-sm ml-8">
                <p class="text-sm font-medium text-brand-dark">{{ selectedTicket.response }}</p>
             </div>
         </div>

         <div v-if="selectedTicket.status === 'Resolved'" class="text-center py-6">
             <span class="text-xs font-bold text-slate-400">This ticket has been marked as resolved and is locked.</span>
         </div>
      </div>

      <template #footer>
         <div class="flex gap-3">
            <button @click="isDrawerOpen = false" class="flex-1 py-3 bg-white border border-slate-200 hover:border-slate-300 text-slate-600 rounded-xl text-xs font-bold transition-all">Close</button>
            <button v-if="selectedTicket?.status === 'Open'" @click="requestCancel" class="flex-1 py-3 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-200 transition-all flex justify-center items-center gap-2">
               <Icon name="lucide:x-circle" size="16" />
               Cancel Request
            </button>
         </div>
      </template>
    </SideDrawer>

    <!-- Modals -->
    <ConfirmModal
      :isOpen="showCancelModal"
      title="Close Ticket"
      message="Are you sure you want to close this ticket? It will be marked as resolved."
      confirmText="Yes, close it"
      cancelText="Keep open"
      confirmStyle="primary"
      icon="lucide:info"
      @confirm="confirmCancel"
      @cancel="showCancelModal = false"
    />
    
    <ConfirmModal
      :isOpen="showNewTicketModal"
      title="Create New Ticket"
      message="The direct messaging gateway is currently routing traffic. Please use the AI Chat Widget in the bottom right corner for immediate assistance."
      confirmText="Understood"
      cancelText="Close"
      confirmStyle="primary"
      icon="lucide:help-circle"
      @confirm="showNewTicketModal = false"
      @cancel="showNewTicketModal = false"
    />
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

const isDrawerOpen = ref(false)
const showCancelModal = ref(false)
const showNewTicketModal = ref(false)
const selectedTicket = ref(null)

const tickets = ref([
  { 
    id: 'TKT-9912', 
    subject: 'Cannot upload multiple abstract documents', 
    category: 'Technical Support', 
    date: 'Apr 07, 2026', 
    priority: 'Normal',
    status: 'Open',
    content: 'When I try to upload my PDF along with the images, the system says the payload is too large. What is the limit?',
    response: null
  },
  { 
    id: 'TKT-8451', 
    subject: 'Membership fee discrepancy', 
    category: 'Billing', 
    date: 'Jan 10, 2026', 
    priority: 'High',
    status: 'Resolved',
    content: 'My credit card was charged $350 but the invoice says $300.',
    response: 'Apologies for the confusion. The additional $50 was the late penalty as outlined in the invoice footer. We have waived it for you and issued a refund.'
  }
])

const openTicketDrawer = (t) => {
  selectedTicket.value = t
  isDrawerOpen.value = true
}

const requestCancel = () => {
  showCancelModal.value = true
}

const confirmCancel = () => {
  showCancelModal.value = false
  isDrawerOpen.value = false
  if (selectedTicket.value) {
     selectedTicket.value.status = 'Resolved'
  }
}
</script>
