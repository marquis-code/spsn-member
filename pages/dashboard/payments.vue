<template>
  <div class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-slate-800 tracking-tight">Payments</h1>
        <p class="text-slate-500 font-medium mt-1 text-sm">Manage your membership dues, conference tickets, and transaction history.</p>
      </div>
      <button @click="showPaymentModal = true" class="btn-premium flex items-center gap-2">
        <Icon name="lucide:plus" size="18" />
        New Payment
      </button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="stat-glass">
        <div class="flex items-center gap-3 mb-2">
          <div class="w-10 h-10 rounded-full bg-brand-cyan/10 flex items-center justify-center text-brand-cyan">
             <Icon name="lucide:check-circle" size="20" />
          </div>
          <span class="text-xs font-bold text-slate-500">Account Status</span>
        </div>
        <h3 class="text-2xl font-bold text-brand-dark">Active</h3>
        <p class="text-[11px] font-medium text-emerald-500">Next renewal: Jan 2027</p>
      </div>
      <div class="stat-glass">
        <div class="flex items-center gap-3 mb-2">
          <div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
             <Icon name="lucide:history" size="20" />
          </div>
          <span class="text-xs font-bold text-slate-500">Total Spent</span>
        </div>
        <h3 class="text-2xl font-bold text-brand-dark">$450.00</h3>
        <p class="text-[11px] font-medium text-slate-400">Lifetime contribution</p>
      </div>
    </div>

    <!-- Filter & Search -->
    <div class="flex flex-wrap gap-4 items-center justify-between mt-8">
      <div class="flex items-center gap-2">
        <button class="px-5 py-2.5 bg-white border-2 border-brand-dark text-brand-dark rounded-full text-xs font-bold shadow-sm transition-all focus:ring-2 focus:ring-brand-dark/20">All Transactions</button>
        <button class="px-5 py-2.5 bg-white border border-slate-200 text-slate-500 rounded-full text-xs font-bold hover:border-slate-300 transition-all focus:ring-2 focus:ring-slate-200">Membership</button>
        <button class="px-5 py-2.5 bg-white border border-slate-200 text-slate-500 rounded-full text-xs font-bold hover:border-slate-300 transition-all focus:ring-2 focus:ring-slate-200">Events</button>
      </div>
    </div>

    <!-- Payments Table -->
    <div class="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
      <div class="overflow-x-auto custom-scrollbar">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50 border-b border-slate-100">
              <th class="px-8 py-5 text-xs font-bold text-slate-500">Reference ID</th>
              <th class="px-8 py-5 text-xs font-bold text-slate-500">Description</th>
              <th class="px-8 py-5 text-xs font-bold text-slate-500">Date</th>
              <th class="px-8 py-5 text-xs font-bold text-slate-500">Amount</th>
              <th class="px-8 py-5 text-xs font-bold text-slate-500">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
            <tr 
              v-for="tx in transactions" 
              :key="tx.id"
              @click="openTransactionDrawer(tx)"
              class="hover:bg-slate-50/50 cursor-pointer transition-colors group"
            >
              <td class="px-8 py-5 text-xs font-semibold text-brand-dark group-hover:text-brand-cyan transition-colors">
                {{ tx.id }}
              </td>
              <td class="px-8 py-5">
                <p class="text-sm font-bold text-slate-800">{{ tx.description }}</p>
                <p class="text-[11px] font-medium text-slate-400 mt-0.5">{{ tx.type }}</p>
              </td>
              <td class="px-8 py-5 text-xs font-medium text-slate-500">{{ tx.date }}</td>
              <td class="px-8 py-5 text-sm font-bold text-slate-800">${{ tx.amount.toFixed(2) }}</td>
              <td class="px-8 py-5">
                <span :class="[
                  'px-3 py-1 text-[10px] font-bold rounded-lg',
                  tx.status === 'Paid' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'
                ]">
                  {{ tx.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Transaction Drawer -->
    <SideDrawer 
      :isOpen="isDrawerOpen" 
      title="Transaction Details" 
      :subtitle="selectedTransaction?.id"
      @close="isDrawerOpen = false"
    >
      <div v-if="selectedTransaction" class="p-8 space-y-8">
        <div class="text-center p-8 bg-slate-50 rounded-3xl border border-slate-100">
          <p class="text-xs font-bold text-slate-500 mb-2">Amount Paid</p>
          <h2 class="text-4xl font-extrabold text-brand-dark tracking-tight">${{ selectedTransaction.amount.toFixed(2) }}</h2>
          <div class="mt-4 inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-bold border border-emerald-100">
            <Icon name="lucide:check-circle" size="14" />
            Successful Payment
          </div>
        </div>

        <div class="space-y-6">
          <h4 class="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2">Invoice Summary</h4>
          <div class="grid grid-cols-2 gap-y-4">
            <div>
              <p class="text-xs font-semibold text-slate-400 mb-1">Date</p>
              <p class="text-sm font-bold text-slate-800">{{ selectedTransaction.date }}</p>
            </div>
            <div>
              <p class="text-xs font-semibold text-slate-400 mb-1">Payment Method</p>
              <p class="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Icon name="lucide:credit-card" size="16" class="text-slate-400" />
                •••• {{ selectedTransaction.cardLast4 }}
              </p>
            </div>
            <div class="col-span-2">
              <p class="text-xs font-semibold text-slate-400 mb-1">Description</p>
              <p class="text-sm font-bold text-slate-800">{{ selectedTransaction.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="flex gap-3">
          <button @click="isDrawerOpen = false" class="flex-1 py-3 bg-white border border-slate-200 hover:border-slate-300 text-slate-600 rounded-xl text-xs font-bold transition-all">Close</button>
          <button class="flex-1 py-3 bg-brand-dark text-white rounded-xl text-xs font-bold shadow-lg hover:bg-[#002244] transition-all flex justify-center items-center gap-2">
             <Icon name="lucide:download" size="16" />
             Download Receipt
          </button>
        </div>
      </template>
    </SideDrawer>

    <!-- New Payment Mock Modal -->
    <ConfirmModal
      :isOpen="showPaymentModal"
      title="Initiate Payment"
      message="This will open the secure gateway to process your new invoice. Proceed?"
      confirmText="Continue to Gateway"
      cancelText="Cancel"
      confirmStyle="primary"
      icon="lucide:credit-card"
      @confirm="showPaymentModal = false"
      @cancel="showPaymentModal = false"
    />
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

const isDrawerOpen = ref(false)
const showPaymentModal = ref(false)
const selectedTransaction = ref(null)

const transactions = ref([
  { id: 'TXN-0012A', description: 'Annual Membership Renewal', type: 'Membership', date: 'Jan 15, 2026', amount: 350.00, status: 'Paid', cardLast4: '4242' },
  { id: 'TXN-0098F', description: 'Winter Conference Registration', type: 'Events', date: 'Dec 02, 2025', amount: 100.00, status: 'Paid', cardLast4: '4242' }
])

const openTransactionDrawer = (tx) => {
  selectedTransaction.value = tx
  isDrawerOpen.value = true
}
</script>
