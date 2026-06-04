<template>
  <div class="space-y-8 pb-20 font-body">

    <!-- ─── PAGE HEADER ─────────────────────────────────────── -->
    <section class="bg-white border-b rounded-lg border-slate-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">
        <div class="flex items-start justify-between gap-6">
          <div class="max-w-xl">
            <div class="inline-flex items-center gap-2 bg-blue-50 text-[#1d4e89] text-xs font-semibold px-4 py-2 rounded-full mb-5 border border-blue-100">
              <LucideReceiptText :size="13" />
              Financial Records
            </div>
            <h1 class="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight tracking-tight mb-2">
              {{ cmsConfig?.member?.pages?.payments?.title || 'Payments' }}
            </h1>
            <p class="text-[14px] text-slate-500 leading-relaxed">
              {{ cmsConfig?.member?.pages?.payments?.subtitle || 'Manage your membership dues, conference tickets, and transaction history.' }}
            </p>
          </div>

          <button
            @click="showPaymentModal = true"
            class="shrink-0 inline-flex items-center gap-2 bg-[#1d4e89] hover:bg-blue-800 text-white text-[13px] font-semibold px-5 py-2.5 rounded-xl transition-colors duration-200"
          >
            <LucidePlus :size="15" />
            New Payment
          </button>
        </div>
      </div>
    </section>


    <!-- ─── STATS STRIP ──────────────────────────────────────── -->
    <section class="bg-slate-50 border-b border-slate-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div class="grid sm:grid-cols-3 gap-4">

          <!-- Account status -->
          <div class="bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-200 hover:shadow-sm transition-all duration-300 flex items-start gap-4">
            <div class="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
              <LucideShieldCheck :size="18" class="text-emerald-600" />
            </div>
            <div>
              <p class="text-[11px] font-semibold text-emerald-600 tracking-widest uppercase mb-1">Account Status</p>
              <p class="text-[18px] font-bold text-slate-900">Active</p>
              <p class="text-[12px] text-slate-400 font-medium mt-0.5">Next renewal: Jan 2027</p>
            </div>
          </div>

          <!-- Total spent -->
          <div class="bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-200 hover:shadow-sm transition-all duration-300 flex items-start gap-4">
            <div class="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
              <LucideHistory :size="18" class="text-[#1d4e89]" />
            </div>
            <div>
              <p class="text-[11px] font-semibold text-blue-600 tracking-widest uppercase mb-1">Total Spent</p>
              <p class="text-[18px] font-bold text-slate-900">₦{{ totalSpent.toLocaleString() }}</p>
              <p class="text-[12px] text-slate-400 font-medium mt-0.5">Lifetime contribution</p>
            </div>
          </div>

          <!-- Transaction count -->
          <div class="bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-200 hover:shadow-sm transition-all duration-300 flex items-start gap-4">
            <div class="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
              <LucideFileText :size="18" class="text-amber-600" />
            </div>
            <div>
              <p class="text-[11px] font-semibold text-amber-600 tracking-widest uppercase mb-1">Transactions</p>
              <p class="text-[18px] font-bold text-slate-900">{{ payments.length }}</p>
              <p class="text-[12px] text-slate-400 font-medium mt-0.5">Total records</p>
            </div>
          </div>

        </div>
      </div>
    </section>


    <!-- ─── FILTER + TABLE ───────────────────────────────────── -->
    <section class="bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <!-- Filter pills -->
        <div class="flex items-center gap-2 mb-6 overflow-x-auto no-scrollbar">
          <button
            v-for="f in filters"
            :key="f.value"
            @click="activeFilter = f.value"
            :class="[
              'shrink-0 text-[12px] font-semibold px-4 py-2 rounded-lg transition-all duration-200',
              activeFilter === f.value
                ? 'bg-[#1d4e89] text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-500 hover:border-slate-300'
            ]"
          >
            {{ f.label }}
          </button>
        </div>

        <!-- Table card -->
        <div class="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left">
              <thead>
                <tr class="bg-slate-50 border-b border-slate-100">
                  <th class="px-6 py-4 text-[11px] font-semibold text-slate-400 tracking-widest uppercase">Reference</th>
                  <th class="px-6 py-4 text-[11px] font-semibold text-slate-400 tracking-widest uppercase">Description</th>
                  <th class="px-6 py-4 text-[11px] font-semibold text-slate-400 tracking-widest uppercase">Date</th>
                  <th class="px-6 py-4 text-[11px] font-semibold text-slate-400 tracking-widest uppercase">Amount</th>
                  <th class="px-6 py-4 text-[11px] font-semibold text-slate-400 tracking-widest uppercase">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-50">

                <!-- Loading -->
                <tr v-if="fetching">
                  <td colspan="5" class="py-16 text-center">
                    <div class="flex flex-col items-center gap-3">
                      <div class="w-6 h-6 border-2 border-[#1d4e89]/20 border-t-[#1d4e89] rounded-full animate-spin" />
                      <p class="text-[13px] text-slate-400 font-medium">Loading transactions…</p>
                    </div>
                  </td>
                </tr>

                <!-- Empty -->
                <tr v-else-if="filteredPayments.length === 0">
                  <td colspan="5" class="py-20 text-center">
                    <div class="flex flex-col items-center gap-3">
                      <div class="w-14 h-14 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center">
                        <LucideReceiptText :size="22" class="text-slate-300" />
                      </div>
                      <p class="text-[11px] font-semibold text-slate-400 tracking-widest uppercase">No records</p>
                      <p class="text-[13px] text-slate-400">No transaction history found.</p>
                    </div>
                  </td>
                </tr>

                <!-- Rows -->
                <tr
                  v-else
                  v-for="tx in filteredPayments"
                  :key="tx._id"
                  @click="openTransactionDrawer(tx)"
                  class="hover:bg-slate-50/60 cursor-pointer transition-colors group"
                >
                  <td class="px-6 py-5">
                    <span class="text-[13px] font-bold text-[#1d4e89] group-hover:underline font-mono">
                      {{ tx.reference?.substring(0, 10) }}…
                    </span>
                  </td>
                  <td class="px-6 py-5">
                    <p class="text-[14px] font-bold text-slate-800">{{ tx.paymentType || 'Manual Payment' }}</p>
                    <p class="text-[11px] font-medium text-slate-400 mt-0.5">Bank Transfer</p>
                  </td>
                  <td class="px-6 py-5 text-[13px] font-medium text-slate-500">{{ formatDate(tx.createdAt) }}</td>
                  <td class="px-6 py-5 text-[14px] font-bold text-slate-800">₦{{ tx.amount?.toLocaleString() }}</td>
                  <td class="px-6 py-5">
                    <span
                      :class="[
                        'text-[11px] font-bold px-3 py-1.5 rounded-lg border',
                        tx.status === 'Verified' || tx.status === 'success'
                          ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                          : 'bg-amber-50 text-amber-600 border-amber-100'
                      ]"
                    >
                      {{ tx.status || 'Pending' }}
                    </span>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>


    <!-- ─── TRANSACTION DRAWER ───────────────────────────────── -->
    <SideDrawer
      :isOpen="isDrawerOpen"
      title="Transaction Details"
      :subtitle="selectedTransaction?.reference?.substring(0, 10)"
      size="md"
      @close="isDrawerOpen = false"
    >
      <div v-if="selectedTransaction" class="space-y-7">

        <!-- Amount hero -->
        <div class="bg-[#1d4e89] rounded-2xl p-7 relative overflow-hidden">
          <LucideReceiptText
            :size="100"
            class="absolute -right-4 -bottom-4 opacity-[0.07] text-white pointer-events-none"
          />
          <p class="text-[11px] font-semibold text-blue-300 tracking-widest uppercase mb-2">Amount Paid</p>
          <h2 class="text-4xl font-bold text-white tracking-tight mb-4">
            ₦{{ selectedTransaction.amount?.toLocaleString() }}
          </h2>
          <span class="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-[12px] font-semibold px-3 py-1.5 rounded-lg">
            <LucideCheckCircle :size="13" />
            {{ selectedTransaction.status || 'Pending' }}
          </span>
        </div>

        <!-- Details grid -->
        <div class="bg-white border border-slate-200 rounded-2xl p-6 space-y-5">
          <p class="text-[11px] font-semibold text-slate-400 tracking-widest uppercase border-b border-slate-100 pb-3">Invoice Summary</p>
          <div class="grid grid-cols-2 gap-5">
            <div>
              <p class="text-[11px] font-semibold text-slate-400 tracking-widest uppercase mb-1.5">Date</p>
              <p class="text-[14px] font-bold text-slate-800">{{ formatDate(selectedTransaction.createdAt) }}</p>
            </div>
            <div>
              <p class="text-[11px] font-semibold text-slate-400 tracking-widest uppercase mb-1.5">Method</p>
              <p class="text-[14px] font-bold text-slate-800 flex items-center gap-1.5">
                <LucideCreditCard :size="14" class="text-slate-400" />
                Bank Transfer
              </p>
            </div>
            <div class="col-span-2">
              <p class="text-[11px] font-semibold text-slate-400 tracking-widest uppercase mb-1.5">Description</p>
              <p class="text-[14px] font-bold text-slate-800">{{ selectedTransaction.paymentType || 'Manual Payment' }}</p>
            </div>
            <div class="col-span-2">
              <p class="text-[11px] font-semibold text-slate-400 tracking-widests uppercase mb-1.5">Reference</p>
              <p class="text-[13px] font-bold text-[#1d4e89] font-mono">{{ selectedTransaction.reference }}</p>
            </div>
          </div>
        </div>

      </div>

      <template #footer>
        <button
          @click="isDrawerOpen = false"
          class="w-full py-3 bg-white border border-slate-200 hover:border-slate-300 text-slate-600 text-[13px] font-semibold rounded-xl transition-all"
        >
          Close
        </button>
      </template>
    </SideDrawer>


    <!-- ─── NEW PAYMENT MODAL ────────────────────────────────── -->
    <div v-if="showPaymentModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" @click="showPaymentModal = false" />

      <div class="relative bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">

        <!-- Modal header -->
        <div class="px-8 pt-8 pb-6 border-b border-slate-100">
          <div class="inline-flex items-center gap-2 bg-blue-50 text-[#1d4e89] text-[11px] font-semibold px-3 py-1.5 rounded-full border border-blue-100 mb-4">
            <LucidePlus :size="11" />
            New Payment
          </div>
          <h3 class="text-[20px] font-bold text-slate-800 leading-snug">Initiate Payment</h3>
          <p class="text-[13px] text-slate-500 mt-1">Select payment type and upload your bank transfer receipt.</p>
        </div>

        <!-- Modal body -->
        <div class="px-8 py-6 space-y-5 max-h-[60vh] overflow-y-auto">

          <!-- Payment type -->
          <div class="space-y-1.5">
            <label class="text-[12px] font-semibold text-slate-500">Payment Type</label>
            <div class="relative">
              <select
                v-model="newPayment.type"
                class="field appearance-none cursor-pointer pr-9"
              >
                <option value="Dues">Membership Dues</option>
                <option value="Conference">Conference Registration</option>
              </select>
              <LucideChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" :size="16" />
            </div>
          </div>

          <!-- Bank account card -->
          <div class="bg-[#1d4e89] rounded-2xl p-6 relative overflow-hidden">
            <LucideBanknote
              :size="90"
              class="absolute -right-3 -bottom-3 opacity-[0.07] text-white pointer-events-none"
            />
            <p class="text-[11px] font-semibold text-blue-300 tracking-widest uppercase mb-4">Pay Into This Account</p>
            <h4 class="text-[16px] font-bold text-white mb-4">{{ activeAccount?.bankName || 'Loading…' }}</h4>
            <div class="space-y-3">
              <div>
                <p class="text-[10px] font-semibold text-blue-300 tracking-widest uppercase mb-1">Account Number</p>
                <p class="text-2xl font-mono font-bold text-white tracking-wider">{{ activeAccount?.accountNumber || '— — —' }}</p>
              </div>
              <div>
                <p class="text-[10px] font-semibold text-blue-300 tracking-widest uppercase mb-1">Account Name</p>
                <p class="text-[14px] font-bold text-white">{{ activeAccount?.accountName || '—' }}</p>
              </div>
            </div>
          </div>

          <!-- Amount -->
          <div class="space-y-1.5">
            <label class="text-[12px] font-semibold text-slate-500">Amount Paid (NGN)</label>
            <input
              v-model="newPayment.amount"
              type="number"
              :disabled="newPayment.type === 'Dues'"
              :class="[
                'field',
                newPayment.type === 'Dues' ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : ''
              ]"
              placeholder="e.g. 10000"
            />
            <p v-if="newPayment.type === 'Dues'" class="text-[11px] font-semibold text-[#1d4e89]">
              {{ hasPaidDues ? 'Annual Renewal Fee (₦10,000)' : 'First Time Registration Fee (₦20,000)' }}
            </p>
          </div>

          <!-- Upload receipt -->
          <div class="space-y-1.5">
            <label class="text-[12px] font-semibold text-slate-500">Upload Payment Receipt</label>
            <div
              @click="$refs.receiptInput.click()"
              class="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center cursor-pointer hover:border-blue-300 hover:bg-blue-50/30 transition-all group"
            >
              <div v-if="!newPayment.file" class="flex flex-col items-center gap-2">
                <div class="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:border-blue-200 group-hover:bg-blue-50 transition-all">
                  <LucideUpload :size="18" class="text-slate-400 group-hover:text-[#1d4e89]" />
                </div>
                <p class="text-[13px] font-semibold text-slate-500 group-hover:text-[#1d4e89] transition-colors">Click to select receipt image</p>
                <p class="text-[11px] text-slate-400">PNG, JPG, or PDF</p>
              </div>
              <div v-else class="flex flex-col items-center gap-2">
                <div class="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center">
                  <LucideFileCheck :size="18" class="text-[#1d4e89]" />
                </div>
                <p class="text-[13px] font-bold text-[#1d4e89] max-w-full truncate px-4">{{ newPayment.file.name }}</p>
              </div>
            </div>
            <input type="file" ref="receiptInput" class="hidden" accept="image/*,.pdf" @change="handleFileChange" />
          </div>

        </div>

        <!-- Modal footer -->
        <div class="px-8 pb-8 pt-4 border-t border-slate-100 flex gap-3">
          <button
            @click="showPaymentModal = false"
            class="flex-1 py-3 bg-white border border-slate-200 hover:border-slate-300 text-slate-600 text-[13px] font-semibold rounded-xl transition-all"
          >
            Cancel
          </button>
          <button
            @click="submitPayment"
            :disabled="submitting || !newPayment.file || !newPayment.amount"
            class="flex-1 py-3 bg-[#1d4e89] hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed text-white text-[13px] font-semibold rounded-xl transition-colors duration-200 inline-flex items-center justify-center gap-2"
          >
            <div v-if="submitting" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>{{ submitting ? 'Submitting…' : 'Submit Payment' }}</span>
          </button>
        </div>

      </div>
    </div>

  </div>
</template>


<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import {
  LucideReceiptText,
  LucideShieldCheck,
  LucideHistory,
  LucideFileText,
  LucidePlus,
  LucideChevronDown,
  LucideCheckCircle,
  LucideCreditCard,
  LucideBanknote,
  LucideUpload,
  LucideFileCheck,
} from 'lucide-vue-next'
import { useCustomToast } from '@/composables/core/useCustomToast'
import { useCMS } from '@/composables/useCMS'
import { usePayments } from '@/composables/modules/payments/usePayments'
import { useUploadFile } from '@/composables/useUploadFile'
import { useUser } from '@/composables/modules/auth/user'

const { cmsConfig, getCmsConfig } = useCMS()
const { fetching, payments, fetchMyPayments, createPayment } = usePayments()
const { uploadFile } = useUploadFile()
const { user } = useUser()
const { showToast } = useCustomToast()

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

const isDrawerOpen    = ref(false)
const showPaymentModal = ref(false)
const selectedTransaction = ref(null)
const activeFilter    = ref('all')
const submitting      = ref(false)

const newPayment = ref({
  type: 'Dues',
  amount: 20000,
  file: null as File | null,
})

const filters = [
  { label: 'All Transactions', value: 'all'        },
  { label: 'Membership',       value: 'Dues'        },
  { label: 'Conference',       value: 'Conference'  },
  { label: 'Verified',         value: 'verified'    },
  { label: 'Pending',          value: 'pending'     },
]

const filteredPayments = computed(() => {
  if (activeFilter.value === 'all') return payments.value
  if (activeFilter.value === 'verified') return payments.value.filter((p: any) => p.status === 'Verified' || p.status === 'success')
  if (activeFilter.value === 'pending')  return payments.value.filter((p: any) => !p.status || p.status === 'pending')
  return payments.value.filter((p: any) => p.paymentType === activeFilter.value)
})

const totalSpent = computed(() =>
  payments.value.reduce((sum: number, p: any) => sum + (p.amount || 0), 0)
)

const hasPaidDues = computed(() =>
  payments.value.some((p: any) => p.paymentType === 'Dues' && (p.status === 'Verified' || p.status === 'success'))
)

const calculatedDuesAmount = computed(() => hasPaidDues.value ? 10000 : 20000)

const activeAccount = computed(() =>
  newPayment.value.type === 'Dues'
    ? cmsConfig.value?.membershipSettings?.duesAccount
    : cmsConfig.value?.membershipSettings?.conferenceAccount
)

watch(() => newPayment.value.type, (val) => {
  newPayment.value.amount = val === 'Dues' ? calculatedDuesAmount.value : ''
})

watch(payments, () => {
  if (newPayment.value.type === 'Dues') newPayment.value.amount = calculatedDuesAmount.value
})

const formatDate = (dateStr: string) => {
  if (!dateStr) return 'N/A'
  return new Date(dateStr).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })
}

const handleFileChange = (e: any) => {
  const file = e.target.files[0]
  if (file) newPayment.value.file = file
}

const submitPayment = async () => {
  if (!newPayment.value.file || !newPayment.value.amount) return
  submitting.value = true
  try {
    const uploadData  = await uploadFile(newPayment.value.file)
    const receiptUrl  = uploadData.secure_url
    const payload = {
      amount: Number(newPayment.value.amount),
      status: 'pending',
      paymentMethod: 'Bank Transfer',
      paymentType: newPayment.value.type,
      userEmail: user.value?.email,
      receiptUrl,
    }
    const { error } = await createPayment(payload)
    if (!error) {
      showPaymentModal.value = false
      newPayment.value = { type: 'Dues', amount: calculatedDuesAmount.value, file: null }
      fetchMyPayments()
    }
  } catch (_) {
    // handled by composables
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


<style scoped>
.font-body {
  font-family: 'DM Sans', 'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif;
}

.field {
  @apply w-full bg-slate-50 border border-slate-200 text-slate-800 placeholder:text-slate-400 text-[14px] px-4 py-3 rounded-xl focus:outline-none focus:border-blue-300 focus:bg-white focus:ring-2 focus:ring-blue-50 transition-all duration-200;
}

.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>