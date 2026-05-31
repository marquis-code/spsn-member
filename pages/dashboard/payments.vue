<template>
  <div class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-slate-800 tracking-tight">{{ cmsConfig?.member?.pages?.payments?.title || 'Payments' }}</h1>
        <p class="text-slate-500 font-medium mt-1 text-base">{{ cmsConfig?.member?.pages?.payments?.subtitle || 'Manage your membership dues, conference tickets, and transaction history.' }}</p>
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
        <button class="px-5 py-2.5 bg-white border-2 border-brand-dark text-brand-dark rounded-full text-xs font-bold transition-all focus:ring-2 focus:ring-brand-dark/20">All Transactions</button>
        <button class="px-5 py-2.5 bg-white border border-slate-200 text-slate-500 rounded-full text-xs font-bold hover:border-slate-300 transition-all focus:ring-2 focus:ring-slate-200">Membership</button>
        <button class="px-5 py-2.5 bg-white border border-slate-200 text-slate-500 rounded-full text-xs font-bold hover:border-slate-300 transition-all focus:ring-2 focus:ring-slate-200">Events</button>
      </div>
    </div>

    <!-- Payments Table -->
    <div class="bg-white rounded-[2rem] border border-slate-200 overflow-hidden mt-8">
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
              v-for="tx in payments" 
              :key="tx._id"
              @click="openTransactionDrawer(tx)"
              class="hover:bg-slate-50/50 cursor-pointer transition-colors group"
            >
              <td class="px-8 py-5 text-xs font-semibold text-brand-dark group-hover:text-brand-cyan transition-colors">
                {{ tx.reference?.substring(0,10) }}
              </td>
              <td class="px-8 py-5">
                <p class="text-base font-bold text-slate-800">{{ tx.paymentType || 'Manual Payment' }}</p>
                <p class="text-[11px] font-medium text-slate-400 mt-0.5">Bank Transfer</p>
              </td>
              <td class="px-8 py-5 text-xs font-medium text-slate-500">{{ formatDate(tx.createdAt) }}</td>
              <td class="px-8 py-5 text-base font-bold text-slate-800">₦{{ tx.amount?.toLocaleString() }}</td>
              <td class="px-8 py-5">
                <span :class="[
                  'px-3 py-1 text-[10px] font-bold rounded-lg',
                  tx.status === 'Verified' || tx.status === 'success' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'
                ]">
                  {{ tx.status || 'Pending' }}
                </span>
              </td>
            </tr>
            <tr v-if="!fetching && payments.length === 0">
               <td colspan="5" class="py-12 text-center text-slate-500 font-medium text-base">
                  No transaction history found.
               </td>
            </tr>
            <tr v-if="fetching">
               <td colspan="5" class="py-12 text-center text-slate-500 font-medium text-base">
                  Loading transactions...
               </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Transaction Drawer -->
    <SideDrawer 
      :isOpen="isDrawerOpen" 
      title="transaction details" 
      :subtitle="selectedTransaction?.id"
      size="md"
      @close="isDrawerOpen = false"
    >
      <div v-if="selectedTransaction" class="space-y-8">
        <div class="bg-slate-50 p-6 rounded-2xl rounded-tl-none border border-slate-100">
          <p class="text-[10px] font-black text-slate-400 lowercase mb-2">amount paid</p>
          <h2 class="text-4xl font-extrabold text-[#003366] tracking-tight">${{ selectedTransaction.amount.toFixed(2) }}</h2>
          <div class="mt-4 inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-bold border border-emerald-100">
            <Icon name="lucide:check-circle" size="14" />
            successful payment
          </div>
        </div>

        <div class="space-y-6">
          <h4 class="text-base font-bold text-slate-800 border-b border-slate-100 pb-2 lowercase">invoice summary</h4>
          <div class="grid grid-cols-2 gap-y-4">
            <div>
              <p class="text-[10px] font-black text-slate-400 mb-1 lowercase">date</p>
              <p class="text-base font-bold text-slate-800">{{ selectedTransaction.date }}</p>
            </div>
            <div>
              <p class="text-[10px] font-black text-slate-400 mb-1 lowercase">payment method</p>
              <p class="text-base font-bold text-slate-800 flex items-center gap-2">
                <Icon name="lucide:credit-card" size="16" class="text-slate-400" />
                •••• {{ selectedTransaction.cardLast4 }}
              </p>
            </div>
            <div class="col-span-2">
              <p class="text-[10px] font-black text-slate-400 mb-1 lowercase">description</p>
              <p class="text-base font-bold text-slate-800">{{ selectedTransaction.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="flex gap-3">
          <button @click="isDrawerOpen = false" class="flex-1 py-3 bg-white border border-slate-200 hover:border-slate-300 text-slate-600 rounded-xl text-xs font-bold transition-all lowercase">close</button>
        </div>
      </template>
    </SideDrawer>

    <!-- New Payment Modal -->
    <div v-if="showPaymentModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" @click="showPaymentModal = false"></div>
      <div class="relative bg-white rounded-3xl w-full max-w-lg p-8 flex flex-col shadow-2xl">
        <h3 class="text-2xl font-bold text-slate-800 mb-2">Initiate Payment</h3>
        <p class="text-base text-slate-500 font-medium mb-6">Select payment type and upload your bank transfer receipt.</p>
        
        <div class="space-y-6">
           <div class="space-y-2">
              <label class="text-xs font-bold text-slate-800">Payment Type</label>
              <select v-model="newPayment.type" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-base font-bold text-slate-800 focus:outline-none focus:border-brand-dark">
                 <option value="Dues">Membership Dues</option>
                 <option value="Conference">Conference Registration</option>
              </select>
           </div>
           
           <div class="bg-brand-dark p-6 rounded-2xl text-white space-y-4">
              <p class="text-[10px] font-black tracking-widest text-brand-cyan">PAY INTO THIS ACCOUNT</p>
              <h4 class="text-xl font-bold">{{ activeAccount?.bankName || 'Loading...' }}</h4>
              <div class="flex justify-between items-end">
                 <div>
                    <p class="text-[10px] text-slate-400 font-bold mb-1">Account Number</p>
                    <p class="text-2xl font-mono tracking-wider font-bold">{{ activeAccount?.accountNumber || '---' }}</p>
                 </div>
              </div>
              <div>
                 <p class="text-[10px] text-slate-400 font-bold mb-1">Account Name</p>
                 <p class="text-base font-bold">{{ activeAccount?.accountName || '---' }}</p>
              </div>
           </div>

           <div class="space-y-2">
              <label class="text-xs font-bold text-slate-800">Amount Paid (NGN)</label>
              <input v-model="newPayment.amount" type="number" :disabled="newPayment.type === 'Dues'" :class="['w-full border border-slate-200 rounded-xl p-4 text-base font-bold text-slate-800 focus:outline-none focus:border-brand-dark', newPayment.type === 'Dues' ? 'bg-slate-100 text-slate-500 cursor-not-allowed' : 'bg-slate-50']" placeholder="e.g. 10000" />
              <p v-if="newPayment.type === 'Dues'" class="text-[10px] font-bold text-brand-cyan">
                 {{ hasPaidDues ? 'Annual Renewal Fee (₦10,000)' : 'First Time Registration Fee (₦20,000)' }}
              </p>
           </div>
           
           <div class="space-y-2">
              <label class="text-xs font-bold text-slate-800">Upload Payment Receipt</label>
              <div @click="$refs.receiptInput.click()" class="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center cursor-pointer hover:bg-slate-50 hover:border-brand-cyan transition-all group">
                 <div v-if="!newPayment.file">
                    <LucideUpload class="mx-auto text-slate-400 group-hover:text-brand-cyan mb-2" :size="24" />
                    <p class="text-xs font-bold text-slate-500">Click to select receipt image</p>
                 </div>
                 <div v-else class="flex flex-col items-center gap-2 text-brand-cyan">
                    <LucideFileCheck :size="24" />
                    <span class="text-xs font-bold max-w-full truncate">{{ newPayment.file.name }}</span>
                 </div>
              </div>
              <input type="file" ref="receiptInput" class="hidden" accept="image/*" @change="handleFileChange" />
           </div>
        </div>

        <div class="mt-8 flex gap-4">
           <button @click="showPaymentModal = false" class="flex-1 py-3.5 bg-slate-100 text-slate-600 rounded-xl text-base font-bold hover:bg-slate-200 transition-colors">Cancel</button>
           <button @click="submitPayment" :disabled="submitting || !newPayment.file || !newPayment.amount" class="flex-1 py-3.5 bg-brand-dark text-white rounded-xl text-base font-bold hover:bg-slate-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
              <LucideLoader2 v-if="submitting" class="animate-spin" :size="16" />
              Submit Payment
           </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useCustomToast } from '@/composables/core/useCustomToast'
import { useCMS } from '@/composables/useCMS'
import { usePayments } from '@/composables/modules/payments/usePayments'
import { useUploadFile } from '@/composables/useUploadFile'
import { useUser } from '@/composables/modules/auth/user'
import { LucideUpload, LucideFileCheck, LucideLoader2 } from 'lucide-vue-next'

const { cmsConfig, getCmsConfig } = useCMS()
const { fetching, payments, fetchMyPayments, createPayment } = usePayments()
const { uploadFile } = useUploadFile()
const { user } = useUser()
const { showToast } = useCustomToast()

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

const isDrawerOpen = ref(false)
const showPaymentModal = ref(false)
const selectedTransaction = ref(null)

const newPayment = ref({
  type: 'Dues',
  amount: 20000,
  file: null as File | null
})
const submitting = ref(false)

const hasPaidDues = computed(() => {
  return payments.value.some((p: any) => p.paymentType === 'Dues' && (p.status === 'Verified' || p.status === 'success'))
})

const calculatedDuesAmount = computed(() => {
  return hasPaidDues.value ? 10000 : 20000
})

watch(() => newPayment.value.type, (newType) => {
  if (newType === 'Dues') {
    newPayment.value.amount = calculatedDuesAmount.value
  } else {
    newPayment.value.amount = ''
  }
})

// Check when payments finish loading to pre-fill if Dues is default
watch(payments, () => {
  if (newPayment.value.type === 'Dues') {
    newPayment.value.amount = calculatedDuesAmount.value
  }
})

const activeAccount = computed(() => {
  if (newPayment.value.type === 'Dues') {
    return cmsConfig.value?.membershipSettings?.duesAccount
  }
  return cmsConfig.value?.membershipSettings?.conferenceAccount
})

const formatDate = (dateStr: string) => {
  if (!dateStr) return 'N/A'
  return new Date(dateStr).toLocaleDateString()
}

const handleFileChange = (e: any) => {
  const file = e.target.files[0]
  if (file) newPayment.value.file = file
}

const submitPayment = async () => {
  if (!newPayment.value.file || !newPayment.value.amount) return
  submitting.value = true
  
  try {
    // 1. Upload receipt
    const uploadData = await uploadFile(newPayment.value.file)
    const receiptUrl = uploadData.secure_url
    
    // 2. Submit payment
    const payload = {
      amount: Number(newPayment.value.amount),
      status: 'pending',
      paymentMethod: 'Bank Transfer',
      paymentType: newPayment.value.type,
      userEmail: user.value?.email,
      receiptUrl
    }
    
    const { error } = await createPayment(payload)
    if (!error) {
      showPaymentModal.value = false
      newPayment.value = { type: 'Dues', amount: calculatedDuesAmount.value, file: null }
      fetchMyPayments()
    }
  } catch (err: any) {
    // Error is handled by composables
  } finally {
    submitting.value = false
  }
}

const openTransactionDrawer = (tx: any) => {
  selectedTransaction.value = tx
  isDrawerOpen.value = true
}

onMounted(() => {
  getCmsConfig()
  fetchMyPayments()
})

</script>
