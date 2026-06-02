<template>
  <div class="min-h-screen bg-slate-50 flex flex-col justify-center items-center font-sans py-12 px-4 sm:px-6 lg:px-8 selection:bg-brand-cyan/20">
    <!-- Centered Card Container -->
    <div class="w-full max-w-2xl bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
      <div class="p-8 md:p-12">
        <!-- Header -->
        <div class="flex justify-between items-center mb-10">
          <div @click="router.push('/')" class="cursor-pointer hover:opacity-80 transition-opacity">
            <img src="@/assets/img/logo.jpeg" alt="logo" class="h-12 w-auto rounded-xl" />
          </div>
          <div class="text-right">
             <h2 class="text-2xl font-black text-[#033958] tracking-tight">Create Account</h2>
             <p v-if="step < 5" class="text-sm font-semibold text-slate-400 mt-1">Step {{ step }} of 4</p>
          </div>
        </div>

        <!-- Progress Bar -->
        <div v-if="step < 5" class="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden flex mb-10">
          <div 
            class="h-full bg-brand-cyan transition-all duration-700 ease-out" 
            :style="{ width: `${(step / 4) * 100}%` }"
          ></div>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="space-y-8">
          
          <!-- Step 1: Details -->
          <div v-if="step === 1" class="space-y-6 animate-in fade-in slide-in-from-right-4">
             <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatedInput v-model="form.fullName" type="text" label="Full Name" placeholder="e.g. Dr. Jane Smith" />
                <AnimatedInput v-model="form.email" type="email" label="Email Address" placeholder="jane@example.com" />
                <AnimatedInput v-model="form.password" type="password" label="Password" placeholder="••••••••••••" />
                <PhoneInput v-model="form.phoneNumber" label="Phone Number" placeholder="e.g. 080..." />
                <!-- RA/RF Number added here -->
                <AnimatedInput v-model="form.membershipId" type="text" label="RA/RF Number *" placeholder="e.g. RF-12345" required />
                <SelectInput v-model="form.category" :options="categories" label="Membership Category" />
             </div>
             <AnimatedInput v-model="form.organization" type="text" label="Organization / Hospital" placeholder="e.g. University Teaching Hospital" />
          </div>

          <!-- Step 2: Upload Documents -->
          <div v-if="step === 2" class="space-y-6 animate-in fade-in slide-in-from-right-4">
             <div class="mb-4">
               <h3 class="text-lg font-bold text-[#033958]">Professional Documents <span class="text-slate-400 text-sm font-normal">(Optional)</span></h3>
               <p class="text-sm text-slate-500 mt-1">You can upload these now or provide them later in your dashboard.</p>
             </div>
             <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div v-for="doc in documentFields" :key="doc.key" class="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3 hover:border-brand-cyan transition-all group relative">
                   <div v-if="uploadStatuses[doc.key] === 'success'" class="absolute top-3 right-3">
                      <Icon name="lucide:shield-check" :size="16" class="text-emerald-500" />
                   </div>
                   
                   <div class="space-y-0.5">
                      <h4 class="text-sm font-bold text-[#033958]">{{ doc.label }}</h4>
                   </div>

                   <div 
                      @click="$refs[doc.key][0].click()" 
                      class="relative h-24 rounded-xl bg-white border border-dashed border-slate-300 flex items-center justify-center cursor-pointer hover:bg-brand-cyan/5 hover:border-brand-cyan transition-all overflow-hidden group"
                   >
                      <img v-if="getPreviewUrl(doc.key)" :src="getPreviewUrl(doc.key)" class="w-full h-full object-cover" />
                      
                      <div v-else-if="previews[doc.key]" class="flex flex-col items-center gap-1 p-2 text-center w-full">
                         <Icon name="lucide:file-text" :size="20" class="text-brand-cyan" />
                         <p class="text-[10px] font-bold text-slate-700 truncate px-2 w-full">
                            {{ uploadMetadata[doc.key]?.original_name || 'Uploaded' }}
                         </p>
                      </div>

                      <div v-else class="flex flex-col items-center gap-2 text-slate-400 group-hover:text-brand-cyan transition-colors">
                         <Icon name="lucide:upload-cloud" :size="20" />
                         <p class="text-sm font-semibold">Upload</p>
                      </div>

                      <div v-if="uploadStatuses[doc.key] === 'uploading'" class="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                         <div class="w-6 h-6 border-2 border-slate-200 border-t-brand-cyan rounded-full animate-spin"></div>
                      </div>
                   </div>
                   <input type="file" :ref="doc.key" class="hidden" @change="e => handleFileUpload(e, doc.key)" accept=".jpg,.jpeg,.png,.pdf" />
                </div>
             </div>
          </div>

          <!-- Step 3: Bio -->
          <div v-if="step === 3" class="space-y-6 animate-in fade-in slide-in-from-right-4">
             <AnimatedInput 
               v-model="form.professionalProfile.bio" 
               type="textarea"
               label="Professional Summary (Optional)"
               placeholder="Briefly describe your professional background..." 
               class="min-h-[140px]"
             />
             <div class="space-y-2">
                <AnimatedInput v-model="form.refereeName" type="text" label="Referee Name (Optional)" placeholder="e.g. Bankole Julius" />
                <p class="text-[11px] text-slate-400 ml-1">Helps expedite approval if verified by an active SCPSN Fellow.</p>
             </div>
          </div>

          <!-- Step 4: OTP Verification -->
          <div v-if="step === 4" class="space-y-6 animate-in fade-in slide-in-from-right-4 text-center py-6">
             <div class="w-20 h-20 bg-brand-cyan/10 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-cyan">
               <Icon name="lucide:mail" :size="32" />
             </div>
             <h3 class="text-2xl font-bold text-[#033958]">Verify your email</h3>
             <p class="text-slate-500 font-medium">We've sent a 6-digit verification code to <span class="text-[#033958] font-bold">{{ form.email }}</span>. Please enter it below to complete your registration.</p>
             
             <div class="max-w-xs mx-auto mt-8">
               <AnimatedInput v-model="otpCode" type="text" label="Verification Code" placeholder="e.g. 123456" class="text-center tracking-widest text-lg font-bold" />
             </div>

             <div class="mt-8">
               <p v-if="resendTimer > 0" class="text-sm text-slate-400 font-medium">
                 You can request a new code in {{ resendTimer }}s
               </p>
               <button 
                 v-else 
                 type="button" 
                 @click="handleResendOTP" 
                 :disabled="loading"
                 class="text-sm font-bold text-brand-cyan hover:underline transition-all"
               >
                 Resend Verification Code
               </button>
             </div>
          </div>

          <!-- Step 5: Congratulations -->
          <div v-if="step === 5" class="space-y-6 animate-in fade-in slide-in-from-right-4 text-center py-10">
             <div class="relative w-24 h-24 mx-auto mb-6">
                <!-- Outer glowing ring -->
                <div class="absolute inset-0 bg-emerald-100 rounded-full animate-ping opacity-75"></div>
                <!-- Inner solid icon container -->
                <div class="relative flex items-center justify-center w-full h-full bg-emerald-500 rounded-full shadow-xl shadow-emerald-500/30">
                  <Icon name="lucide:check" :size="48" class="text-white" />
                </div>
             </div>
             <h3 class="text-3xl font-black text-[#033958] mb-2">Congratulations!</h3>
             <p class="text-slate-500 font-medium max-w-md mx-auto">
               You are officially a member of the Society for Cellular Pathology Scientists of Nigeria. 
               We've securely emailed your <span class="font-bold text-[#033958]">Certificate of Joining</span>.
             </p>
             
             <div class="pt-8">
               <NuxtLink 
                 to="/login"
                 class="inline-flex items-center gap-2 bg-[#033958] text-white px-10 py-4 rounded-xl text-lg font-black hover:bg-[#022a42] transition-colors"
               >
                 Proceed to Login <Icon name="lucide:arrow-right" :size="20" />
               </NuxtLink>
             </div>
          </div>

          <!-- Footer Actions -->
          <div v-if="step < 5" class="flex items-center justify-between pt-6 border-t border-slate-100">
             <button 
               v-if="step > 1" 
               type="button" 
               @click="handleBack" 
               class="text-sm font-bold text-slate-500 hover:text-[#033958] flex items-center gap-2 transition-colors"
             >
               <Icon name="lucide:arrow-left" :size="16" /> Back
             </button>
             <div v-else>
                <NuxtLink to="/login" class="text-sm font-bold text-brand-cyan hover:underline">Already have an account?</NuxtLink>
             </div>

            <div class="flex items-center gap-4">
               <button 
                 v-if="step === 2" 
                 type="button" 
                 @click="handleNext"
                 :disabled="Object.values(uploadStatuses).includes('uploading')"
                 class="text-sm font-bold text-slate-500 hover:text-[#033958] transition-colors"
               >
                 Skip for now
               </button>

               <button 
                 v-if="step < 3" 
                 type="button" 
                 @click="handleNext"
                 :disabled="Object.values(uploadStatuses).includes('uploading')"
                 class="bg-[#033958] text-white px-8 py-3 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-[#022a42] transition-colors disabled:opacity-50"
               >
                 Continue <Icon name="lucide:arrow-right" :size="16" />
               </button>
               
               <button 
                 v-else-if="step === 3" 
                 type="button" 
                 @click="handleInitialSubmit" 
                 :disabled="loading || Object.values(uploadStatuses).includes('uploading')" 
                 class="bg-brand-cyan text-[#033958] px-8 py-3 rounded-xl text-sm font-black flex items-center gap-2 hover:bg-[#00a0b8] transition-colors disabled:opacity-50"
               >
                 <span v-if="loading" class="w-4 h-4 border-2 border-[#033958]/30 border-t-[#033958] rounded-full animate-spin"></span>
                 <span v-else>Continue</span>
               </button>

               <button 
                 v-else-if="step === 4" 
                 type="submit" 
                 :disabled="loading || otpCode.length < 5" 
                 class="bg-brand-cyan text-[#033958] px-8 py-3 rounded-xl text-sm font-black flex items-center gap-2 hover:bg-[#00a0b8] transition-colors disabled:opacity-50"
               >
                 <span v-if="loading" class="w-4 h-4 border-2 border-[#033958]/30 border-t-[#033958] rounded-full animate-spin"></span>
                 <span v-else>Verify & Create Account</span>
               </button>
            </div>
          </div>
        </form>
      </div>
      
      <!-- Footer Note -->
      <div class="bg-slate-50 p-6 text-center border-t border-slate-100">
        <p class="text-sm font-semibold text-slate-400">
           © {{ new Date().getFullYear() }} Society for Cellular Pathology Scientists of Nigeria
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onUnmounted } from 'vue'
import { useRegisterMember } from '@/composables/modules/members/useRegisterMember'
import { useUploadFile } from '@/composables/useUploadFile'
import { useRouter } from 'vue-router'

const step = ref(1)
const { loading, register, verifyRegistration, resendOTP } = useRegisterMember()
const { uploadFile } = useUploadFile()
const router = useRouter()

const otpCode = ref('')
const resendTimer = ref(0)
let timerInterval = null

const startTimer = () => {
  resendTimer.value = 60
  if (timerInterval) clearInterval(timerInterval)
  timerInterval = setInterval(() => {
    if (resendTimer.value > 0) resendTimer.value--
    else clearInterval(timerInterval)
  }, 1000)
}

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval)
})

const previews = reactive({})
const fileTypes = reactive({})
const uploadStatuses = reactive({})
const uploadMetadata = reactive({})

const categories = [
  { label: 'Student', value: 'Student' },
  { label: 'Associate', value: 'Associate' },
  { label: 'Full Member', value: 'Full' },
  { label: 'Fellow', value: 'Fellow' }
]

const documentFields = [
  { key: 'passport', label: 'Passport Photograph' },
  { key: 'qualification', label: 'Academic Certificates' },
  { key: 'license', label: 'Practicing License' },
  { key: 'cv', label: 'Curriculum Vitae (CV)' },
  { key: 'id', label: 'National ID / Voter Card' },
  { key: 'proofOfPayment', label: 'Proof of Payment' }
]

const form = reactive({
  fullName: '',
  email: '',
  password: '',
  phoneNumber: '',
  organization: '',
  category: '',
  membershipId: '',
  professionalProfile: {
    bio: ''
  },
  refereeName: '',
  documents: {}
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
  
  // If it's a PDF already uploaded to Cloudinary, we can show a thumbnail
  if (metadata?.format === 'pdf' && metadata?.url) {
    return metadata.url.replace('.pdf', '.jpg')
  }
  
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
    uploadMetadata[key] = res // Store full response metadata
    uploadStatuses[key] = 'success'
  } catch (error) {
    uploadStatuses[key] = 'error'
    previews[key] = null
  }
}

const handleNext = () => {
  if (step.value === 1) {
    if (!form.fullName || !form.email || !form.membershipId) {
      // Basic validation for required fields
      alert("Please fill in all required fields (Name, Email, RA/RF Number).")
      return;
    }
  }
  step.value++
}

const handleBack = () => step.value--

const handleInitialSubmit = async () => {
  const data = await register(form)
  if (data?.requiresOtp) {
    step.value = 4
    startTimer()
  } else if (data) {
    // Fallback if OTP is skipped by backend somehow
    router.push('/login')
  }
}

const handleResendOTP = async () => {
  const res = await resendOTP(form.email)
  if (res) {
    startTimer()
  }
}

const handleSubmit = async () => {
  if (step.value === 3) {
    await handleInitialSubmit()
    return
  }
  
  if (step.value === 4) {
    const data = await verifyRegistration({ email: form.email, otp: otpCode.value.trim() })
    if (data) {
      step.value = 5 // Transition to Congratulations UI
    }
  }
}

definePageMeta({
  layout: 'auth'
})
</script>

<style scoped>
.animate-in {
  animation: slideIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes slideIn {
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
}

::selection {
  background: #00b8d4;
  color: #033958;
}
</style>
