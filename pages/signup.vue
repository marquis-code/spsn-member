<template>
  <div class="min-h-screen bg-slate-50 font-body flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">

    <div class="w-full max-w-2xl">

      <!-- Top bar -->
      <div class="flex items-center justify-between mb-6">
        <div @click="router.push('/')" class="cursor-pointer hover:opacity-75 transition-opacity flex items-center gap-2.5">
          <div class="w-9 h-9 rounded-xl overflow-hidden border border-slate-200">
            <img src="@/assets/img/logo.jpeg" alt="SCPSN" class="w-full h-full object-cover" />
          </div>
          <span class="text-[13px] font-bold text-slate-700 hidden sm:block">SCPSN</span>
        </div>
        <div v-if="step < 4" class="inline-flex items-center gap-2 bg-blue-50 text-[#1d4e89] text-[11px] font-semibold px-4 py-1.5 rounded-full border border-blue-100">
          Step {{ step }} of 3
        </div>
      </div>

      <!-- Main card -->
      <div class="bg-white border border-slate-200 rounded-2xl overflow-hidden">

        <!-- Progress bar -->
        <div v-if="step < 4" class="h-1 w-full bg-slate-100">
          <div
            class="h-full bg-[#1d4e89] transition-all duration-700 ease-out rounded-full"
            :style="{ width: `${(step / 3) * 100}%` }"
          ></div>
        </div>

        <div class="p-7 lg:p-10">

          <!-- Step header -->
          <div v-if="step < 4" class="mb-8">
            <p class="text-[11px] font-semibold text-blue-600 tracking-widest uppercase mb-1.5">{{ stepMeta[step - 1].label }}</p>
            <h2 class="text-[22px] font-bold text-slate-800 leading-snug">{{ stepMeta[step - 1].title }}</h2>
            <p class="text-[14px] text-slate-400 mt-1">{{ stepMeta[step - 1].subtitle }}</p>
          </div>

          <form @submit.prevent="handleSubmit">

            <!-- ── Step 1: Personal Details ── -->
            <div v-if="step === 1" class="space-y-5">
              <div class="grid sm:grid-cols-2 gap-5">
                <div class="space-y-1.5">
                  <label class="text-[12px] font-semibold text-slate-500">Full Name</label>
                  <input v-model="form.fullName" type="text" placeholder="Dr. Jane Smith, MLS" class="field" required />
                </div>
                <div class="space-y-1.5">
                  <label class="text-[12px] font-semibold text-slate-500">Email Address</label>
                  <input v-model="form.email" type="email" placeholder="jane@example.com" class="field" required />
                </div>
                <div class="space-y-1.5">
                  <label class="text-[12px] font-semibold text-slate-500">Password</label>
                  <input v-model="form.password" type="password" placeholder="••••••••••••" class="field" required />
                </div>
                <div class="space-y-1.5">
                  <label class="text-[12px] font-semibold text-slate-500">Phone Number</label>
                  <PhoneInput v-model="form.phoneNumber" placeholder="e.g. 0801 234 5678" class="field" />
                </div>
                <div class="space-y-1.5">
                  <label class="text-[12px] font-semibold text-slate-500">RA / RF Number <span class="text-[#1d4e89]">*</span></label>
                  <input v-model="form.membershipId" type="text" placeholder="e.g. RF-12345" class="field" required />
                </div>
                <div class="space-y-1.5">
                  <label class="text-[12px] font-semibold text-slate-500">Membership Category</label>
                  <div class="relative">
                    <select v-model="form.category" class="field appearance-none cursor-pointer pr-9" required>
                      <option value="" disabled>Select category</option>
                      <option v-for="c in categories" :key="c.value" :value="c.value">{{ c.label }}</option>
                    </select>
                    <LucideChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" :size="16" />
                  </div>
                </div>
              </div>
              <div class="space-y-1.5">
                <label class="text-[12px] font-semibold text-slate-500">Organization / Hospital</label>
                <input v-model="form.organization" type="text" placeholder="e.g. University Teaching Hospital, Abuja" class="field" />
              </div>
            </div>


            <!-- ── Step 2: Documents ── -->
            <div v-if="step === 2" class="space-y-5">
              <div class="grid sm:grid-cols-2 gap-4">
                <div
                  v-for="doc in documentFields"
                  :key="doc.key"
                  class="bg-slate-50 border border-slate-200 rounded-2xl p-4 hover:border-blue-200 transition-all duration-200 relative"
                  :class="uploadStatuses[doc.key] === 'success' ? 'border-emerald-200 bg-emerald-50/30' : ''"
                >
                  <!-- Success badge -->
                  <div v-if="uploadStatuses[doc.key] === 'success'"
                    class="absolute top-3 right-3 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                    <LucideCheckCircle :size="12" class="text-emerald-600" />
                  </div>

                  <p class="text-[12px] font-bold text-slate-700 mb-3">{{ doc.label }}</p>

                  <div
                    @click="$refs[doc.key][0].click()"
                    class="h-20 rounded-xl bg-white border border-dashed border-slate-300 hover:border-[#1d4e89] hover:bg-blue-50/30 flex items-center justify-center cursor-pointer transition-all duration-200 overflow-hidden relative"
                  >
                    <img v-if="getPreviewUrl(doc.key)" :src="getPreviewUrl(doc.key)" class="w-full h-full object-cover" />

                    <div v-else-if="previews[doc.key]" class="flex flex-col items-center gap-1">
                      <LucideFileText :size="18" class="text-[#1d4e89]" />
                      <p class="text-[10px] font-semibold text-slate-600 truncate px-3 max-w-full">
                        {{ uploadMetadata[doc.key]?.original_name || 'Uploaded' }}
                      </p>
                    </div>

                    <div v-else class="flex flex-col items-center gap-1.5 text-slate-400">
                      <LucideUploadCloud :size="18" />
                      <p class="text-[11px] font-semibold">Click to upload</p>
                    </div>

                    <div v-if="uploadStatuses[doc.key] === 'uploading'"
                      class="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                      <div class="w-5 h-5 border-2 border-slate-200 border-t-[#1d4e89] rounded-full animate-spin"></div>
                    </div>
                  </div>

                  <input type="file" :ref="doc.key" class="hidden" @change="e => handleFileUpload(e, doc.key)" accept=".jpg,.jpeg,.png,.pdf" />
                </div>
              </div>
            </div>


            <!-- ── Step 3: Bio & Referee ── -->
            <div v-if="step === 3" class="space-y-5">
              <div class="space-y-1.5">
                <label class="text-[12px] font-semibold text-slate-500">Professional Summary <span class="text-slate-400 font-normal">(Optional)</span></label>
                <textarea
                  v-model="form.professionalProfile.bio"
                  rows="5"
                  placeholder="Briefly describe your professional background and areas of expertise..."
                  class="field resize-none leading-relaxed"
                ></textarea>
              </div>
              <div class="space-y-1.5">
                <label class="text-[12px] font-semibold text-slate-500">Referee Name <span class="text-slate-400 font-normal">(Optional)</span></label>
                <input v-model="form.refereeName" type="text" placeholder="e.g. Dr. Bankole Julius, Fellow SCPSN" class="field" />
                <p class="text-[11px] text-slate-400 mt-1 ml-0.5">Helps expedite approval if verified by an active SCPSN Fellow.</p>
              </div>

              <!-- Info card -->
              <div class="bg-blue-50 border border-blue-100 rounded-2xl p-5 flex items-start gap-3">
                <div class="w-8 h-8 bg-[#1d4e89]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <LucideInfo :size="15" class="text-[#1d4e89]" />
                </div>
                <div>
                  <p class="text-[12px] font-bold text-[#1d4e89] mb-1">Almost there</p>
                  <p class="text-[12px] text-blue-700/70 leading-relaxed">After submitting, we'll send a 6-digit OTP to your email address for verification.</p>
                </div>
              </div>
            </div>


            <!-- ── Footer actions ── -->
            <div v-if="step < 4" class="flex items-center justify-between pt-8 mt-8 border-t border-slate-100">
              <button
                v-if="step > 1"
                type="button"
                @click="handleBack"
                class="inline-flex items-center gap-1.5 text-[13px] font-semibold text-slate-500 hover:text-slate-800 transition-colors duration-200"
              >
                <LucideArrowLeft :size="14" /> Back
              </button>
              <NuxtLink v-else to="/login"
                class="text-[13px] font-semibold text-[#1d4e89] hover:underline">
                Already have an account?
              </NuxtLink>

              <div class="flex items-center gap-3">
                <button
                  v-if="step === 2"
                  type="button"
                  @click="handleNext"
                  :disabled="Object.values(uploadStatuses).includes('uploading')"
                  class="text-[13px] font-semibold text-slate-400 hover:text-slate-700 transition-colors duration-200"
                >
                  Skip for now
                </button>

                <!-- Steps 1 & 2 next -->
                <button
                  v-if="step < 3"
                  type="button"
                  @click="handleNext"
                  :disabled="Object.values(uploadStatuses).includes('uploading')"
                  class="inline-flex items-center gap-2 bg-[#1d4e89] hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed text-white text-[14px] font-semibold px-6 py-3 rounded-xl transition-colors duration-200"
                >
                  Continue
                  <LucideArrowRight :size="14" />
                </button>

                <!-- Step 3 submit -->
                <button
                  v-else-if="step === 3"
                  type="button"
                  @click="handleInitialSubmit"
                  :disabled="loading || Object.values(uploadStatuses).includes('uploading')"
                  class="inline-flex items-center gap-2 bg-[#1d4e89] hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed text-white text-[14px] font-semibold px-6 py-3 rounded-xl transition-colors duration-200"
                >
                  <div v-if="loading" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span v-if="loading">Submitting...</span>
                  <span v-else class="flex items-center gap-2">Continue <LucideArrowRight :size="14" /></span>
                </button>
              </div>
            </div>

          </form>
        </div>

        <!-- Card footer -->
        <div class="bg-slate-50 border-t border-slate-100 px-7 lg:px-10 py-4 flex items-center justify-between">
          <p class="text-[11px] font-medium text-slate-400">© {{ new Date().getFullYear() }} Society for Cellular Pathology Scientists of Nigeria</p>
          <div class="flex items-center gap-1.5">
            <div class="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
            <p class="text-[11px] font-semibold text-slate-400">Secure Registration</p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>


<script setup>
import {
  LucideArrowRight,
  LucideArrowLeft,
  LucideChevronDown,
  LucideCheckCircle,
  LucideUploadCloud,
  LucideFileText,
  LucideInfo,
} from 'lucide-vue-next'
import { ref, reactive, onUnmounted } from 'vue'
import { useRegisterMember } from '@/composables/modules/members/useRegisterMember'
import { useUploadFile } from '@/composables/useUploadFile'
import { useUser } from '@/composables/modules/auth/user'
import { useRouter } from 'vue-router'

const step = ref(1)
const { loading, register } = useRegisterMember()
const { uploadFile } = useUploadFile()
const router = useRouter()

const stepMeta = [
  { label: 'Personal Details', title: 'Create your account', subtitle: 'Fill in your professional information to get started.' },
  { label: 'Documents', title: 'Upload your documents', subtitle: 'Professional credentials — you can also complete this later.' },
  { label: 'Profile', title: 'Tell us about yourself', subtitle: 'A brief background helps the committee review your application.' }
]

const previews = reactive({})
const fileTypes = reactive({})
const uploadStatuses = reactive({})
const uploadMetadata = reactive({})

const categories = [
  { label: 'Student', value: 'Student' },
  { label: 'Associate', value: 'Associate' },
  { label: 'Full Member', value: 'Full' },
  { label: 'Fellow', value: 'Fellow' },
]

const documentFields = [
  { key: 'passport', label: 'Passport Photograph' },
  { key: 'qualification', label: 'Academic Certificates' },
  { key: 'license', label: 'Practicing License' },
  { key: 'cv', label: 'Curriculum Vitae (CV)' },
  { key: 'id', label: 'National ID / Voter Card' },
  { key: 'proofOfPayment', label: 'Proof of Payment' },
]

const form = reactive({
  fullName: '',
  email: '',
  password: '',
  phoneNumber: '',
  organization: '',
  category: '',
  membershipId: '',
  professionalProfile: { bio: '' },
  refereeName: '',
  documents: {},
})

const isImage = (key) => {
  const type = fileTypes[key]
  if (type) return type.startsWith('image/')
  const metadata = uploadMetadata[key]
  if (metadata?.format) return ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(metadata.format.toLowerCase())
  return false
}

const getPreviewUrl = (key) => {
  const preview = previews[key]
  if (!preview) return null
  const metadata = uploadMetadata[key]
  if (metadata?.format === 'pdf' && metadata?.url) return metadata.url.replace('.pdf', '.jpg')
  if (isImage(key)) return preview
  return null
}

const handleFileUpload = async (event, key) => {
  const file = event.target.files[0]
  if (!file) return
  fileTypes[key] = file.type
  previews[key] = URL.createObjectURL(file)
  uploadStatuses[key] = 'uploading'
  try {
    const res = await uploadFile(file)
    form.documents[key] = res.url
    uploadMetadata[key] = res
    uploadStatuses[key] = 'success'
  } catch {
    uploadStatuses[key] = 'error'
    previews[key] = null
  }
}

const handleNext = () => {
  if (step.value === 1) {
    if (!form.fullName || !form.email || !form.membershipId) {
      alert('Please fill in all required fields (Name, Email, RA/RF Number).')
      return
    }
  }
  step.value++
}

const handleBack = () => step.value--

const handleInitialSubmit = async () => {
  const data = await register(form)
  if (data?.requiresOtp) {
    router.push({ path: '/verify-email', query: { email: form.email } })
  } else if (data) {
    router.push('/login')
  }
}

const handleSubmit = async () => {
  if (step.value === 3) { await handleInitialSubmit(); return }
}

definePageMeta({ layout: 'auth' })
</script>


<style scoped>
.font-body {
  font-family: 'DM Sans', 'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif;
}

.field {
  @apply w-full bg-slate-50 border border-slate-200 text-slate-800 placeholder:text-slate-400 text-[14px] px-4 py-3 rounded-xl focus:outline-none focus:border-blue-300 focus:bg-white focus:ring-2 focus:ring-blue-50 transition-all duration-200;
}

</style>