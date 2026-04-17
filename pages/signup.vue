<template>
  <div class="h-screen bg-white flex flex-col lg:flex-row overflow-hidden font-sans">
    <!-- Left Section: Visual Branding (Image) -->
    <section class="hidden lg:flex lg:w-[45%] h-full relative overflow-hidden bg-[#003366] shrink-0">
      <img 
        src="https://images.unsplash.com/photo-1579154235828-451993319242?q=80&w=2070&auto=format&fit=crop" 
        class="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
        alt="Scientific Research"
      />
      <div class="absolute inset-0 bg-gradient-to-br from-[#003366]/80 to-transparent"></div>
      
      <div class="relative z-10 p-16 flex flex-col justify-between h-full text-white">
        <div>
          <div class="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#003366] font-bold mb-8 shadow-xl">
            SP
          </div>
          <h1 class="text-4xl font-extrabold tracking-tighter leading-tight mb-6">
            Pioneering the Future of <br/>
            <span class="text-brand-cyan">Cellular Science</span>.
          </h1>
          <p class="text-white/70 text-sm font-medium leading-relaxed max-w-sm">
            Join the elite network of practitioners dedicated to advancing diagnostic excellence across Nigeria.
          </p>
        </div>

        <div class="space-y-6">
          <div class="flex items-center gap-4 group">
            <div class="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/50 transition-colors">
              <LucideCheck :size="16" />
            </div>
            <p class="text-xs font-bold">Verified Credentials</p>
          </div>
          <div class="flex items-center gap-4 group">
            <div class="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/50 transition-colors">
              <LucideGlobe :size="16" />
            </div>
            <p class="text-xs font-bold">Global Recognition</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Right Section: Compact Signup Form -->
    <main class="flex-1 overflow-y-auto bg-slate-50 relative custom-scrollbar">
      <div class="p-6 md:p-12 lg:p-16 xl:p-20 max-w-2xl mx-auto">
        <!-- Header -->
        <header class="mb-10 space-y-2">
          <NuxtLink to="/" class="lg:hidden inline-flex items-center gap-2 mb-6 text-[#003366] font-bold text-sm">
            <LucideArrowLeft :size="14" />
            Main Site
          </NuxtLink>
          <div class="flex items-center justify-between">
            <h2 class="text-2xl font-bold text-slate-800 tracking-tight">Membership Enrollment</h2>
            <span class="text-xs font-bold text-slate-400">Step {{ step }} of 3</span>
          </div>
          <div class="h-1 w-full bg-slate-200 rounded-full overflow-hidden">
            <div 
              class="h-full bg-brand-cyan transition-all duration-700 ease-out" 
              :style="{ width: `${(step / 3) * 100}%` }"
            ></div>
          </div>
        </header>

        <!-- Form Form -->
        <form @submit.prevent="handleSubmit" class="space-y-6 bg-white p-8 lg:p-10 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100">
          
          <!-- Step 1: Practitioner Details -->
          <div v-if="step === 1" class="space-y-4 animate-fade-in">
            <div class="flex flex-col gap-4">
              <AnimatedInput 
                v-model="form.fullName" 
                label="Full Name & Rank" 
                placeholder="Dr. Jane Smith, FMCLS"
                required
                :error="errors.fullName"
              />
              <AnimatedInput 
                v-model="form.email" 
                type="email" 
                label="Scientific Email" 
                placeholder="jane@institution.edu.ng"
                required
                :error="errors.email"
              />
              <AnimatedInput 
                v-model="form.password" 
                type="password" 
                label="Create Access Password" 
                placeholder="Minimum 8 characters"
                required
                :error="errors.password"
              />
              <PhoneInput 
                v-model="form.phoneNumber" 
                label="Primary Contact" 
                placeholder="801 234 5678"
                required
                :error="errors.phoneNumber"
              />
              <AnimatedInput 
                v-model="form.organization" 
                label="Host Institution" 
                placeholder="University Teaching Hospital"
                required
                :error="errors.organization"
              />
              <SelectInput 
                v-model="form.category" 
                label="Membership Segment" 
                :options="categories"
                required
                :error="errors.category"
              />
            </div>
          </div>

          <!-- Step 2: Diagnostic Archive -->
          <div v-if="step === 2" class="space-y-6 animate-fade-in">
            <p class="text-xs text-slate-500 font-bold italic">Please upload clear, digital scans of your professional documents.</p>
            <div class="flex flex-col gap-6">
              <div v-for="doc in documentFields" :key="doc.key" class="space-y-3 p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
                <div class="flex items-center justify-between px-1">
                  <label class="text-xs font-bold text-slate-500">{{ doc.label }} <span class="text-red-500">*</span></label>
                  <span v-if="uploadStatuses[doc.key] === 'uploading'" class="text-xs font-bold text-amber-500 animate-pulse">Uploading...</span>
                  <span v-else-if="uploadStatuses[doc.key] === 'success'" class="text-xs font-bold text-green-500 flex items-center gap-1">
                    <LucideCheckCircle :size="10" /> Securely Stored
                  </span>
                </div>

                <div class="relative group">
                  <input type="file" @change="e => handleFileUpload(e, doc.key)" class="hidden" :ref="doc.key" accept=".jpg,.jpeg,.png,.pdf">
                  
                  <!-- Preview Area / Upload Trigger -->
                  <div class="relative overflow-hidden rounded-xl border border-slate-200 bg-white transition-all">
                    <!-- Preview Image/PDF -->
                    <div v-if="previews[doc.key]" class="h-36 w-full relative group bg-slate-100/50">
                      <!-- Image Preview -->
                      <img v-if="isImage(doc.key)" :src="previews[doc.key]" class="w-full h-full object-cover" />
                      
                      <!-- PDF Preview -->
                      <div v-else class="w-full h-full relative group/pdf">
                        <iframe 
                          :src="previews[doc.key] + '#toolbar=0&navpanes=0&scrollbar=0'" 
                          class="w-full h-full border-none pointer-events-none bg-white rounded-lg"
                        ></iframe>
                        
                        <!-- Overlay for View/Actions -->
                        <div class="absolute inset-0 bg-white/10 flex items-center justify-center opacity-0 group-hover/pdf:opacity-100 transition-opacity">
                           <a 
                            v-if="form.documents[doc.key]" 
                            :href="form.documents[doc.key]" 
                            target="_blank" 
                            class="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-[#003366] shadow-2xl flex items-center gap-2 hover:scale-105 transition-all pointer-events-auto"
                          >
                            <LucideGlobe :size="12" /> Inspect Document
                          </a>
                        </div>
                      </div>
                      
                      <!-- Overlay for change -->
                      <button 
                        type="button" 
                        @click="$refs[doc.key][0].click()" 
                        class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold backdrop-blur-md"
                      >
                        <div class="flex flex-col items-center gap-2">
                          <LucideUpload :size="20" />
                          Replace Document
                        </div>
                      </button>
                    </div>

                    <!-- Empty State -->
                    <button 
                      v-else
                      type="button" 
                      @click="$refs[doc.key][0].click()" 
                      :disabled="uploadStatuses[doc.key] === 'uploading'"
                      class="w-full flex items-center justify-center gap-4 py-8 border-2 border-dashed border-slate-200 hover:border-[#003366]/30 hover:bg-slate-50/50 transition-all rounded-xl group"
                    >
                      <div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#003366] group-hover:bg-white transition-all">
                        <LucideUpload :size="20" />
                      </div>
                      <div class="text-left">
                        <p class="text-xs font-bold text-slate-700">Select {{ doc.label }}</p>
                        <p class="text-xs text-slate-400 font-medium">PDF, JPG, or PNG (Max 5MB)</p>
                      </div>
                    </button>

                    <!-- Loading bar -->
                    <div v-if="uploadStatuses[doc.key] === 'uploading'" class="absolute bottom-0 left-0 h-1 bg-amber-400 animate-progress-indefinite w-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 3: Scientific Profile -->
          <div v-if="step === 3" class="space-y-6 animate-fade-in">
            <AnimatedInput 
              v-model="form.professionalProfile.bio" 
              type="textarea" 
              label="Professional Biography" 
              placeholder="Contextualize your research impact and institutional role..."
              :rows="4"
              required
              :error="errors.bio"
            />
            <AnimatedInput 
              v-model="form.refereeName" 
              label="Referee Full Name" 
              placeholder="Active Fellow or Full Member name"
              required
              :error="errors.refereeName"
            />
          </div>

          <!-- Navigation -->
          <div class="flex items-center justify-between pt-6 border-t border-slate-50">
            <button 
              v-if="step > 1" 
              type="button" 
              @click="handleBack" 
              class="text-sm font-bold text-[#003366] flex items-center gap-2 hover:translate-x-[-4px] transition-transform"
            >
              <LucideArrowLeft :size="16" /> Back
            </button>
            <div v-else></div>

            <button 
              v-if="step < 3" 
              type="button" 
              @click="handleNext"
              :disabled="Object.values(uploadStatuses).includes('uploading')"
              class="bg-[#003366] text-white px-8 py-3.5 rounded-xl text-sm font-bold shadow-lg shadow-[#003366]/20 flex items-center gap-2 hover:bg-[#004080] transition-all active:scale-95 disabled:opacity-50"
            >
              Next Step <LucideArrowRight :size="16" />
            </button>
            
            <button 
              v-else 
              type="submit" 
              :disabled="loading || Object.values(uploadStatuses).includes('uploading')" 
              class="bg-brand-cyan text-brand-dark px-10 py-4 rounded-xl text-sm font-bold shadow-lg shadow-brand-cyan/20 flex items-center gap-2 hover:scale-[1.02] transition-all active:scale-95 disabled:opacity-50"
            >
              <span v-if="loading" class="w-4 h-4 border-2 border-brand-dark/20 border-t-brand-dark rounded-full animate-spin"></span>
              <span v-else>Complete Enrollment</span>
            </button>
          </div>
        </form>

        <footer class="mt-12 text-center space-y-4">
          <p class="text-xs text-slate-500 font-medium">
            Already a registered practitioner? 
            <NuxtLink to="/login" class="text-[#003366] font-bold hover:underline">Sign In Here</NuxtLink>
          </p>
          <p class="text-xs text-slate-300 font-bold">
            &copy; 2026 Society for Cellular Pathology Scientists of Nigeria
          </p>
        </footer>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { 
  LucideUpload, 
  LucideCheck, 
  LucideArrowLeft, 
  LucideArrowRight,
  LucideCheckCircle,
  LucideGlobe,
  LucideFileText
} from 'lucide-vue-next'
import AnimatedInput from '@/components/AnimatedInput.vue'
import SelectInput from '@/components/SelectInput.vue'
import PhoneInput from '@/components/PhoneInput.vue'
import { useRegisterMember } from '@/composables/modules/members/useRegisterMember'
import { useUploadFile } from '@/composables/useUploadFile'
import { useFormValidation } from '@/composables/useFormValidation'
import { useRouter } from 'vue-router'

const step = ref(1)
const { loading, register } = useRegisterMember()
const { uploadFile } = useUploadFile()
const router = useRouter()

const previews = reactive({})
const fileTypes = reactive({}) // Track actual file types
const uploadStatuses = reactive({})

const categories = [
  { label: 'Student Affiliate', value: 'Student' },
  { label: 'Associate Researcher', value: 'Associate' },
  { label: 'Full Practitioner', value: 'Full' },
  { label: 'Distinguished Fellow', value: 'Fellow' }
]

const documentFields = [
  { key: 'passport', label: 'Clinical Passport' },
  { key: 'qualification', label: 'Academic Standing' },
  { key: 'license', label: 'Practice Authorization' },
  { key: 'cv', label: 'Professional Dossier' },
  { key: 'id', label: 'Strategic Identity' },
  { key: 'proofOfPayment', label: 'Financial Verification' }
]

const form = reactive({
  fullName: '',
  email: '',
  password: '',
  phoneNumber: '',
  organization: '',
  category: '',
  professionalProfile: {
    bio: ''
  },
  refereeName: '',
  documents: {} // Store Cloudinary URLs here
})

const { errors, validateStep } = useFormValidation(form)

const isImage = (key) => {
  const type = fileTypes[key]
  if (type) return type.startsWith('image/')
  const url = previews[key]
  if (!url) return false
  return url.toString().match(/\.(jpg|jpeg|png|webp|gif)/i)
}

const isPDF = (key) => {
  const type = fileTypes[key]
  if (type) return type === 'application/pdf'
  const url = form.documents[key]
  if (!url) return false
  return url.toString().match(/\.pdf/i)
}

const getFileFormat = (key) => {
  const type = fileTypes[key]
  if (type) {
    if (type.startsWith('image/')) return 'Image'
    if (type === 'application/pdf') return 'PDF'
  }
  const doc = form.documents[key]
  if (typeof doc === 'string') {
    if (doc.match(/\.pdf/i)) return 'PDF'
    if (doc.match(/\.(jpg|jpeg|png)/i)) return 'Image'
  }
  return null
}

const handleFileUpload = async (event, key) => {
  const file = event.target.files[0]
  if (!file) return

  // 1. Store type and create local preview
  fileTypes[key] = file.type
  previews[key] = URL.createObjectURL(file)
  uploadStatuses[key] = 'uploading'

  try {
    // 2. Upload to Cloudinary aggressively
    const res = await uploadFile(file)
    
    // 3. Update form specifically for this key
    form.documents[key] = res.url // Store the URL for the form submission
    uploadStatuses[key] = 'success'
  } catch (error) {
    uploadStatuses[key] = 'error'
    previews[key] = null
    fileTypes[key] = null
  }
}

const handleNext = () => {
  if (validateStep(step.value)) {
    step.value++
  }
}

const handleBack = () => {
  step.value--
}

const handleSubmit = async () => {
  if (!validateStep(3)) return
  
  const data = await register(form)
  if (data) {
    router.push('/login')
  }
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes progress-indefinite {
  0% { left: -100%; width: 100%; }
  100% { left: 100%; width: 100%; }
}

.animate-progress-indefinite {
  animation: progress-indefinite 1.5s infinite linear;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f8fafc;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #cbd5e1;
}
</style>
