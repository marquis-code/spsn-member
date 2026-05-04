<template>
  <div class="min-h-screen bg-white flex flex-col lg:flex-row overflow-hidden font-sans selection:bg-brand-cyan/20">
    <!-- Left: Strategic Narrative Side Panel -->
    <section class="hidden lg:flex lg:w-[40%] h-full relative overflow-hidden bg-brand-dark shrink-0">
      <img 
        src="/images/hero/2.png" 
        class="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay grayscale"
        alt="Scientific Network"
      />
      <div class="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-dark/80 to-transparent"></div>
      
      <div class="relative z-10 p-20 flex flex-col justify-between h-screen text-white">
        <div class="space-y-12 animate-in fade-in slide-in-from-bottom-12">
          <div @click="router.push('/')" class="w-16 h-16 flex items-center justify-center  font-black text-2xl shadow-2xl cursor-pointer hover:rotate-12 transition-transform">
           <img src="@/assets/img/logo.jpeg" alt="logo" class="rounded-3xl" />
          </div>
          <div class="space-y-6">
            <h1 class="text-5xl font-black tracking-tighter leading-[0.9]">
              Join the <br/>
              <span class="text-brand-cyan font-black">SCPSN</span> <br/>
              Community.
            </h1>
            <p class="text-white/50 text-base font-medium leading-relaxed max-w-sm italic">
              Create your professional account to join the Society for Cellular Pathology Scientists of Nigeria.
            </p>
          </div>
        </div>

        <div class="space-y-8 border-t border-white/10 pt-12">
          <div v-for="(feat, i) in ['Verified Credentials', 'Institutional Recognition', 'Research Collaboration']" :key="i" class="flex items-center gap-5 group">
            <div class="w-10 h-10 rounded-2xl border border-white/10 flex items-center justify-center group-hover:bg-brand-cyan group-hover:border-brand-cyan group-hover:text-brand-dark transition-all duration-500 shadow-xl">
              <Icon name="lucide:check" :size="16" />
            </div>
            <p class="text-sm font-semibold text-white/70">{{ feat }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Right: High-Performance Enrollment Console -->
    <main class="flex-1 overflow-y-auto bg-slate-50 relative custom-scrollbar h-screen">
      <div class="p-6 md:p-16 lg:p-24 max-w-3xl mx-auto">
        <!-- Progress Hierarchy -->
        <header class="mb-16 space-y-4">
          <div class="flex items-center justify-between">
            <div class="space-y-1">
               <h2 class="text-3xl font-black text-[#033958] tracking-tighter">Create Account</h2>
               <p class="text-sm font-semibold text-slate-400">Step {{ step }} of 3</p>
            </div>
            <NuxtLink to="/" class="text-sm font-bold text-brand-cyan hover:underline flex items-center gap-2">
               <Icon name="lucide:layout-grid" :size="14" />
               Go Back
            </NuxtLink>
          </div>
          <div class="h-2 w-full bg-slate-200 rounded-full overflow-hidden flex gap-1 p-0.5">
            <div 
              v-for="s in 3" :key="s"
              class="h-full rounded-full transition-all duration-1000 ease-out flex-1" 
              :class="s <= step ? 'bg-brand-cyan' : 'bg-slate-300 opacity-20'"
            ></div>
          </div>
        </header>

        <!-- Enrollment Matrix -->
        <form @submit.prevent="handleSubmit" class="space-y-10">
          
          <!-- Step 1: Biological & Institutional Multi-Input -->
          <div v-if="step === 1" class="space-y-8 animate-in fade-in slide-in-from-right-8">
            <div class="bg-white p-6 md:p-12 rounded-[40px] border border-slate-100 space-y-8">
               <div class="grid grid-cols-1 gap-8">
                  <div class="px-1">
                     <AnimatedInput v-model="form.fullName" type="text" label="Full Name" placeholder="e.g. Dr. Jane Smith" />
                  </div>
                  <div class="px-1">
                     <AnimatedInput v-model="form.email" type="email" label="Email Address" placeholder="jane@example.com" />
                  </div>
                  <div class="px-1">
                     <AnimatedInput v-model="form.password" type="password" label="Password" placeholder="••••••••••••" />
                  </div>
                  <div class="px-1">
                     <PhoneInput v-model="form.phoneNumber" label="Phone Number" placeholder="e.g. 080..." />
                  </div>
               </div>
               <div class="px-1 pt-4">
                  <AnimatedInput v-model="form.organization" type="text" label="Organization / Hospital" placeholder="e.g. University Teaching Hospital" />
               </div>
               <div class="px-1 pt-4">
                  <SelectInput v-model="form.category" :options="categories" label="Membership Category" />
               </div>
            </div>
          </div>

          <!-- Step 2: Upload Documents -->
          <div v-if="step === 2" class="space-y-8 animate-in fade-in slide-in-from-right-8">
             <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div v-for="doc in documentFields" :key="doc.key" class="bg-white p-6 rounded-3xl border border-slate-100 space-y-4 hover:border-brand-cyan transition-all group relative overflow-hidden">
                   <div v-if="uploadStatuses[doc.key] === 'success'" class="absolute top-2 right-2">
                      <Icon name="lucide:shield-check" :size="18" class="text-emerald-500" />
                   </div>
                   
                   <div class="space-y-0.5">
                      <h4 class="text-xs font-bold text-[#033958]">{{ doc.label }}</h4>
                      <p class="text-[10px] text-slate-400 font-medium italic">PDF, JPG or PNG</p>
                   </div>

                   <div 
                      @click="$refs[doc.key][0].click()" 
                      class="relative aspect-[4/3] rounded-xl bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center cursor-pointer hover:bg-brand-cyan/5 hover:border-brand-cyan transition-all overflow-hidden group"
                   >
                      <!-- Image Preview (including PDF thumbnails from Cloudinary) -->
                      <img v-if="getPreviewUrl(doc.key)" :src="getPreviewUrl(doc.key)" class="w-full h-full object-cover" />
                      
                      <!-- Non-image File Preview -->
                      <div v-else-if="previews[doc.key]" class="flex flex-col items-center gap-2 p-4 text-center w-full">
                         <div class="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center text-brand-cyan">
                            <Icon name="lucide:file-text" :size="24" />
                         </div>
                         <div class="space-y-1 w-full">
                            <p class="text-[10px] font-bold text-slate-700 truncate px-2">
                               {{ uploadMetadata[doc.key]?.original_name || 'Document Uploaded' }}
                            </p>
                            <p class="text-[9px] text-slate-400 font-medium">Click to change</p>
                         </div>
                      </div>

                      <!-- Empty State -->
                      <div v-else class="flex flex-col items-center gap-3 text-slate-300 group-hover:text-brand-cyan transition-colors">
                         <div class="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center">
                            <Icon name="lucide:upload" :size="20" />
                         </div>
                         <p class="text-[10px] font-bold">Choose File</p>
                      </div>

                      <!-- Loading Layer -->
                      <div v-if="uploadStatuses[doc.key] === 'uploading'" class="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                         <div class="w-8 h-8 border-4 border-slate-100 border-t-brand-cyan rounded-full animate-spin"></div>
                      </div>
                   </div>
                   <input type="file" :ref="doc.key" class="hidden" @change="e => handleFileUpload(e, doc.key)" accept=".jpg,.jpeg,.png,.pdf" />
                </div>
             </div>
          </div>

          <!-- Step 3: Philosophical Narrative -->
          <div v-if="step === 3" class="space-y-10 animate-in fade-in slide-in-from-right-8">
             <div class="bg-white p-6 md:p-12 rounded-[40px] space-y-10 border border-slate-100">
                <div class="space-y-3">
                   <AnimatedInput 
                     v-model="form.professionalProfile.bio" 
                     type="textarea"
                     label="Professional Summary"
                     placeholder="Tell us about your professional background and research..." 
                     class="min-h-[160px]"
                   />
                </div>
                <div class="space-y-3">
                   <AnimatedInput v-model="form.refereeName" type="text" label="Referee Name" placeholder="e.g. Bankole Julius" />
                   <p class="text-xs font-medium text-slate-400 ml-2 italic">Requires approval from an active SCPSN Fellow.</p>
                </div>
             </div>
          </div>

          <!-- Navigation Vectors -->
          <div class="flex items-center justify-between pt-10">
            <button 
              v-if="step > 1" 
              type="button" 
              @click="handleBack" 
              class="px-10 py-5 text-sm font-bold text-[#033958] flex items-center gap-3 hover:-translate-x-3 transition-transform"
            >
              <Icon name="lucide:arrow-left" :size="16" /> Previous Step
            </button>
            <div v-else></div>

            <button 
              v-if="step < 3" 
              type="button" 
              @click="handleNext"
              :disabled="Object.values(uploadStatuses).includes('uploading')"
              class="bg-[#033958] text-white px-12 py-3 rounded-2xl text-sm font-bold flex items-center gap-3 hover:scale-105 active:scale-95 transition-all"
            >
              Next Step <Icon name="lucide:arrow-right" :size="16" />
            </button>
            
            <button 
              v-else 
              type="submit" 
              :disabled="loading || Object.values(uploadStatuses).includes('uploading')" 
              class="bg-brand-cyan text-brand-dark px-14 py-3 rounded-2xl text-sm font-bold flex items-center gap-3 hover:rotate-2 hover:scale-110 active:scale-95 transition-all"
            >
              <span v-if="loading" class="w-5 h-5 border-2 border-brand-dark/30 border-t-brand-dark rounded-full animate-spin"></span>
              <span v-else>Complete Registration</span>
            </button>
          </div>
        </form>

        <footer class="mt-24 text-center space-y-6">
          <p class="text-xs font-semibold text-slate-400">
             We verify all credentials to maintain high professional standards.
          </p>
          <p class="text-xs font-semibold text-slate-300">
             © 2026 Society for Cellular Pathology Scientists of Nigeria
          </p>
        </footer>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
// Lucide icons are auto-imported by lucide-nuxt module
import { useRegisterMember } from '@/composables/modules/members/useRegisterMember'
import { useUploadFile } from '@/composables/useUploadFile'
import { useRouter } from 'vue-router'

const step = ref(1)
const { loading, register } = useRegisterMember()
const { uploadFile } = useUploadFile()
const router = useRouter()

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

const handleNext = () => step.value++
const handleBack = () => step.value--

const handleSubmit = async () => {
  const data = await register(form)
  if (data) {
    router.push('/login')
  }
}
</script>

<style scoped>
.form-matrix-input {
  @apply w-full bg-slate-50 border border-slate-100 rounded-3xl px-8 py-5 text-sm font-bold placeholder:text-slate-300 focus:bg-white focus:border-brand-cyan focus:ring-8 focus:ring-brand-cyan/5 transition-all outline-none;
}

.animate-in {
  animation: slideIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes slideIn {
  from { opacity: 0; transform: translateX(40px); }
  to { opacity: 1; transform: translateX(0); }
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}

::selection {
  background: #00b8d4;
  color: #033958;
}
</style>
