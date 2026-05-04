<template>
  <div class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-slate-800 tracking-tight">Support Tickets</h1>
        <p class="text-slate-500 font-medium mt-1 text-sm">{{ cmsConfig?.member?.portal?.announcementText || 'Need help? Open a ticket to reach our administrative or technical teams.' }}</p>
      </div>
      <button @click="openNewTicket" class="btn-premium flex items-center gap-2 px-8 py-4">
        <Icon name="lucide:life-buoy" size="18" />
        New Request
      </button>
    </div>

    <!-- Tickets Table -->
    <div class="bg-white rounded-[2rem] border border-slate-200 overflow-hidden mt-8">
      <div class="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <h3 class="text-base font-bold text-slate-800 tracking-tight">Support History</h3>
        <div class="flex items-center gap-4">
           <div class="flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-blue-500"></span>
              <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Tickets</p>
           </div>
        </div>
      </div>
      <div class="overflow-x-auto custom-scrollbar">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50 border-b border-slate-100">
              <th class="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">Ticket ID</th>
              <th class="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">Subject</th>
              <th class="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">Priority</th>
              <th class="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
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
                <div class="flex items-center gap-2 mt-0.5">
                   <p class="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{{ ticket.category }}</p>
                   <span class="text-[10px] text-slate-300">•</span>
                   <p class="text-[10px] font-medium text-slate-400">{{ ticket.date }}</p>
                </div>
              </td>
              <td class="px-8 py-5">
                 <span class="text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5" :class="ticket.priority === 'High' ? 'text-rose-500' : 'text-slate-400'">
                    <Icon v-if="ticket.priority === 'High'" name="lucide:alert-circle" size="14" />
                    <Icon v-else name="lucide:minus" size="14" />
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
        
        <div v-if="tickets.length === 0" class="p-16 text-center">
            <div class="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="lucide:life-buoy" size="24" />
            </div>
            <h4 class="text-base font-bold text-slate-800">No Support Requests</h4>
            <p class="text-sm font-medium text-slate-500 mt-1">Everything looks clear in your help center.</p>
        </div>
      </div>
    </div>

    <!-- Side Drawer: Ticket Conversation -->
    <SideDrawer 
      :isOpen="isDrawerOpen" 
      title="Support Conversation" 
      :subtitle="'#' + selectedTicket?.id"
      @close="isDrawerOpen = false"
    >
      <div v-if="selectedTicket" class="p-8 space-y-8">
         <div class="flex items-center justify-between border-b border-slate-100 pb-4">
            <div class="space-y-1">
               <h3 class="text-sm font-black text-[#033958] uppercase tracking-widest">{{ selectedTicket.category }}</h3>
               <p class="text-xs font-bold text-slate-400">Opened on {{ selectedTicket.date }}</p>
            </div>
            <span :class="[
                  'px-3 py-1 text-[10px] font-bold rounded-lg',
                  selectedTicket.status === 'Resolved' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-blue-50 text-blue-600 border border-blue-100'
                ]">
                  {{ selectedTicket.status }}
            </span>
         </div>

         <!-- Messages -->
         <div class="space-y-10">
            <!-- User Message -->
            <div class="space-y-3">
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 bg-[#033958] text-white rounded-full flex items-center justify-center font-bold text-xs">SC</div>
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Inquiry Message</p>
                </div>
                <div class="bg-slate-50 p-6 rounded-3xl rounded-tl-none border border-slate-100">
                   <h4 class="text-sm font-bold text-[#033958] mb-2">{{ selectedTicket.subject }}</h4>
                   <p class="text-sm font-medium text-slate-600 leading-relaxed">{{ selectedTicket.content }}</p>
                </div>
            </div>

            <!-- Admin Response -->
            <div class="space-y-3" v-if="selectedTicket.response">
                <div class="flex items-center justify-end gap-3">
                    <p class="text-[10px] font-bold text-brand-cyan uppercase tracking-widest">Administrative Response</p>
                    <div class="w-8 h-8 bg-brand-cyan text-[#033958] rounded-full flex items-center justify-center font-bold text-xs"><Icon name="lucide:shield-check" size="14" /></div>
                </div>
                <div class="bg-brand-cyan/5 p-6 rounded-3xl rounded-tr-none border border-brand-cyan/10 ml-10">
                   <p class="text-sm font-bold text-[#033958] leading-relaxed">{{ selectedTicket.response }}</p>
                </div>
            </div>
         </div>

         <div v-if="selectedTicket.status === 'Resolved'" class="bg-slate-50 p-4 rounded-2xl text-center">
             <p class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Ticket Resolved & Archived</p>
         </div>
      </div>

      <template #footer>
         <div class="flex gap-3">
            <button @click="isDrawerOpen = false" class="flex-1 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-bold transition-all">Close Viewer</button>
            <button v-if="selectedTicket?.status === 'Open'" @click="requestCancel" class="flex-1 py-3 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold hover:bg-rose-50 hover:text-rose-600 transition-all flex justify-center items-center gap-2">
               <Icon name="lucide:lock" size="16" />
               Mark as Resolved
            </button>
         </div>
      </template>
    </SideDrawer>

    <!-- Side Drawer: New Ticket -->
    <SideDrawer 
      :isOpen="isNewTicketDrawerOpen" 
      title="Open Support Ticket" 
      subtitle="How can we assist you today?"
      @close="isNewTicketDrawerOpen = false"
    >
      <div class="p-8 space-y-8">
        <div class="space-y-6">
           <AnimatedInput 
             v-model="ticketForm.subject"
             label="Subject"
             placeholder="Brief summary of your inquiry..."
             required
           />
           <div class="space-y-6">
              <SelectInput 
                v-model="ticketForm.category"
                label="department / category"
                :options="['Technical Support', 'Billing', 'Membership', 'Events']"
              />
              
              <SelectInput 
                v-model="ticketForm.priority"
                label="priority level"
                :options="['Normal', 'High']"
              />
           </div>

           <AnimatedInput 
             v-model="ticketForm.content"
             type="textarea"
             label="Detailed Description"
             placeholder="Please provide as much detail as possible to help us assist you faster..."
             :rows="6"
             required
           />
        </div>
      </div>

      <template #footer>
         <div class="flex gap-3">
            <button @click="isNewTicketDrawerOpen = false" class="flex-1 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-bold">Cancel</button>
            <button @click="createTicket" :disabled="isCreating" class="flex-1 py-3 bg-brand-dark text-white rounded-xl text-xs font-bold hover:bg-[#002244] transition-all flex justify-center items-center gap-2 disabled:opacity-50">
               <Icon v-if="isCreating" name="lucide:loader-2" class="animate-spin" size="16" />
               <Icon v-else name="lucide:plus" size="16" />
               Open Ticket
            </button>
         </div>
      </template>
    </SideDrawer>

    <!-- Modals -->
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
import { useCustomToast } from '@/composables/core/useCustomToast'
import { useCMS } from '@/composables/useCMS'

const { cmsConfig } = useCMS()

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

const { showToast } = useCustomToast()
const isDrawerOpen = ref(false)
const isNewTicketDrawerOpen = ref(false)
const isCreating = ref(false)
const showCancelModal = ref(false)
const selectedTicket = ref(null)

const ticketForm = reactive({
  subject: '',
  category: 'Technical Support',
  priority: 'Normal',
  content: ''
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

const openNewTicket = () => {
  isNewTicketDrawerOpen.value = true
}

const createTicket = async () => {
  if (!ticketForm.subject || !ticketForm.content) {
    showToast({ title: 'Missing Info', message: 'Please provide a subject and description.', toastType: 'warning' })
    return
  }

  isCreating.value = true
  
  // Mock API call
  setTimeout(() => {
    const newTicket = {
      id: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
      subject: ticketForm.subject,
      category: ticketForm.category,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      priority: ticketForm.priority,
      status: 'Open',
      content: ticketForm.content,
      response: null
    }
    
    tickets.value.unshift(newTicket)
    isCreating.value = false
    isNewTicketDrawerOpen.value = false
    
    // Reset form
    ticketForm.subject = ''
    ticketForm.category = 'Technical Support'
    ticketForm.priority = 'Normal'
    ticketForm.content = ''
    
    showToast({ title: 'Ticket Opened', message: 'Your support request has been queued.', toastType: 'success' })
  }, 1500)
}

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
     showToast({ title: 'Ticket Resolved', message: 'The ticket has been archived.', toastType: 'info' })
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

::selection {
  background: #00b8d4;
  color: #033958;
}
</style>
