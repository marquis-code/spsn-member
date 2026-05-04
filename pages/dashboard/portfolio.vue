<template>
  <div class="space-y-10 max-w-7xl mx-auto animate-fade-in pb-20">
    <!-- Profile Header -->
    <header class="bg-white rounded-[2rem] p-6 lg:p-10 border border-slate-200 relative overflow-hidden">
      <div class="absolute top-0 right-0 w-96 h-96 bg-brand-cyan/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div class="flex flex-col md:flex-row gap-10 items-center relative z-10">
        <!-- Profile Picture Section -->
        <div class="relative group">
          <div class="w-32 h-32 rounded-3xl bg-[#003366] text-white flex items-center justify-center text-5xl font-black border-4 border-white relative overflow-hidden shadow-2xl">
             <img v-if="user?.profilePicture" :src="user.profilePicture" :key="user.profilePicture" class="w-full h-full object-cover" />
             <span v-else>{{ userInitials }}</span>
             
             <!-- Upload Overlay / Loading State -->
             <div 
               class="absolute inset-0 bg-black/40 flex items-center justify-center transition-all cursor-pointer"
               :class="uploading ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'"
               @click="!uploading && $refs.fileInput.click()"
             >
                <div v-if="uploading" class="flex flex-col items-center gap-2">
                   <Icon name="lucide:loader-2" size="24" class="text-brand-cyan animate-spin" />
                   <span class="text-[8px] font-black lowercase text-brand-cyan">uploading...</span>
                </div>
                <Icon v-else name="lucide:camera" size="24" class="text-white" />
             </div>
          </div>
          <button 
            @click="!uploading && $refs.fileInput.click()" 
            class="absolute -bottom-2 -right-2 w-10 h-10 bg-brand-cyan text-[#003366] rounded-xl flex items-center justify-center hover:scale-110 transition-all border-4 border-white shadow-lg z-20"
            :class="{ 'opacity-50 cursor-not-allowed': uploading }"
          >
            <Icon v-if="uploading" name="lucide:loader-2" class="animate-spin" size="16" />
            <Icon v-else name="lucide:plus" size="16" />
          </button>
          <input type="file" ref="fileInput" class="hidden" accept="image/*" @change="handleImageUpload" />
        </div>

        <div class="flex-1 text-center md:text-left space-y-2">
          <div class="flex flex-wrap items-center gap-4 justify-center md:justify-start">
             <h1 class="text-4xl font-bold text-slate-800 tracking-tight leading-none">{{ user?.fullName || 'Scientific Practitioner' }}</h1>
             <span class="px-3 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-lg text-xs font-bold mt-1">Verified Practitioner</span>
          </div>
          <p class="text-sm font-semibold text-slate-400">{{ user?.category || 'General' }} Member • Registry ID: {{ user?.membershipId || 'SC-PENDING' }}</p>
          <p class="text-sm font-medium text-slate-500 max-w-xl leading-relaxed italic">"{{ profileData.bio || cmsConfig?.member?.pages?.portfolio?.subtitle || 'Scientific bio not yet provided. Update your profile to showcase your expertise.' }}"</p>
        </div>

        <div class="flex flex-col gap-3 min-w-[200px]">
           <button @click="savePortfolio" :disabled="isSaving" class="w-full bg-[#003366] text-white px-8 py-4 rounded-xl text-xs font-bold hover:bg-[#002244] transition-all disabled:opacity-50 flex items-center justify-center gap-2">
             <Icon v-if="isSaving" name="lucide:loader-2" class="animate-spin" size="16" />
             <Icon v-else name="lucide:refresh-cw" size="16" />
             {{ isSaving ? 'Syncing...' : 'Sync Portfolio' }}
           </button>
           <button @click="exportCV" class="w-full bg-white border border-slate-200 text-slate-600 px-8 py-4 rounded-xl text-xs font-bold hover:border-slate-800 hover:text-slate-800 transition-all flex items-center justify-center gap-2">
             <Icon name="lucide:download" size="16" />
             Export CV
           </button>
        </div>
      </div>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <!-- Main Content: Bio & Exp -->
      <div class="lg:col-span-2 space-y-10">
        <!-- Bio Editor -->
        <div class="bg-white rounded-[2rem] border border-slate-200 p-6 lg:p-10 space-y-8">
           <div class="flex items-center justify-between">
              <h3 class="text-xs font-black text-slate-400 lowercase">scientific background</h3>
              <div class="flex items-center gap-2">
                 <span class="text-[10px] font-bold text-slate-400 lowercase">last synced: {{ lastSynced }}</span>
                 <Icon name="lucide:file-edit" size="16" class="text-brand-cyan" />
              </div>
           </div>
           
           <div class="space-y-10">
             <div class="space-y-4">
               <label class="text-[10px] font-black text-slate-400 lowercase ml-1">professional biography</label>
               <AnimatedInput 
                 v-model="profileData.bio"
                 type="textarea"
                 label=""
                 placeholder="Enter your scientific background, research priorities, and professional goals..."
                 :rows="5"
               />
             </div>

             <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
               <!-- Education Section -->
               <div class="space-y-6">
                 <div class="flex items-center justify-between border-b border-slate-100 pb-3">
                    <label class="text-[10px] font-black text-[#003366] lowercase">education history</label>
                    <button @click="addItem('education')" class="text-brand-cyan hover:scale-110 transition-transform">
                      <Icon name="lucide:plus-circle" size="20" />
                    </button>
                 </div>
                 <div class="space-y-4">
                   <div v-for="(edu, i) in profileData.education" :key="i" class="flex items-start gap-3 group animate-in slide-in-from-left-4">
                      <div class="flex-1">
                        <AnimatedInput 
                          v-model="profileData.education[i]" 
                          label="Qualification & Institution"
                          placeholder="e.g. BSc. Cellular Pathology - Univ. of Lagos"
                        />
                      </div>
                      <button @click="removeItem('education', i)" class="mt-4 p-2 text-rose-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all">
                        <Icon name="lucide:trash-2" size="16" />
                      </button>
                   </div>
                   <div v-if="profileData.education.length === 0" class="py-10 text-center border-2 border-dashed border-slate-100 rounded-3xl">
                      <p class="text-xs font-bold text-slate-300">No education records added</p>
                   </div>
                 </div>
               </div>

               <!-- Experience Section -->
               <div class="space-y-6">
                 <div class="flex items-center justify-between border-b border-slate-100 pb-3">
                    <label class="text-[10px] font-black text-[#003366] lowercase">clinical experience</label>
                    <button @click="addItem('experience')" class="text-brand-cyan hover:scale-110 transition-transform">
                      <Icon name="lucide:plus-circle" size="20" />
                    </button>
                 </div>
                 <div class="space-y-4">
                   <div v-for="(exp, i) in profileData.experience" :key="i" class="flex items-start gap-3 group animate-in slide-in-from-right-4">
                      <div class="flex-1">
                        <AnimatedInput 
                          v-model="profileData.experience[i]" 
                          label="Position & Organization"
                          placeholder="e.g. Senior Pathologist - General Hospital"
                        />
                      </div>
                      <button @click="removeItem('experience', i)" class="mt-4 p-2 text-rose-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all">
                        <Icon name="lucide:trash-2" size="16" />
                      </button>
                   </div>
                   <div v-if="profileData.experience.length === 0" class="py-10 text-center border-2 border-dashed border-slate-100 rounded-3xl">
                      <p class="text-xs font-bold text-slate-300">No experience records added</p>
                   </div>
                 </div>
               </div>
             </div>
           </div>
        </div>
      </div>

      <!-- Right Column: Document Registry -->
      <div class="space-y-10">
        <div class="bg-white rounded-[2rem] border border-slate-200 p-8 space-y-8 h-full">
           <div class="flex items-center justify-between">
              <h3 class="text-xs font-black text-slate-400 lowercase">validated documents</h3>
              <Icon name="lucide:shield-check" size="18" class="text-brand-cyan" />
           </div>

           <!-- Cleaned Up Document Grid -->
           <!-- List-Based Document Registry -->
           <div class="space-y-3">
              <div 
                v-for="(status, name) in documentStatus" 
                :key="name" 
                class="p-4 bg-white border border-slate-100 rounded-2xl flex items-center justify-between transition-all hover:border-[#003366]/10 group shadow-sm"
              >
                <div class="flex items-center gap-4">
                  <div :class="[
                    'w-10 h-10 rounded-xl flex items-center justify-center border transition-all',
                    status === 'verified' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-50 text-slate-300 border-slate-100 group-hover:bg-[#003366] group-hover:text-white group-hover:border-[#003366]'
                  ]">
                    <Icon :name="status === 'verified' ? 'lucide:file-check' : 'lucide:file-text'" size="18" />
                  </div>
                  <div>
                    <h5 class="text-xs font-bold text-slate-800">{{ name }}</h5>
                    <div class="flex items-center gap-1.5 mt-0.5">
                       <span :class="['w-1 h-1 rounded-full', status === 'verified' ? 'bg-emerald-500' : 'bg-slate-300']"></span>
                       <p class="text-[9px] font-bold text-slate-400 lowercase">
                         {{ status === 'verified' ? 'system validated' : 'action required' }}
                       </p>
                    </div>
                  </div>
                </div>
                
                <button 
                  @click="triggerDocumentUpload(name)"
                  :class="[
                    'px-4 py-2 rounded-lg text-[10px] font-black lowercase transition-all',
                    status === 'verified' ? 'text-emerald-600 bg-emerald-50 opacity-0 group-hover:opacity-100 hover:bg-emerald-100' : 'text-white bg-[#003366] hover:bg-brand-cyan hover:text-[#003366]'
                  ]"
                >
                  {{ status === 'verified' ? 'replace' : 'upload' }}
                </button>
              </div>
           </div>

           <div class="p-6 bg-[#003366] text-white rounded-3xl space-y-4 text-center relative overflow-hidden group">
              <div class="absolute inset-0 bg-brand-cyan opacity-0 group-hover:opacity-5 transition-opacity"></div>
              <Icon name="lucide:fingerprint" size="32" class="text-brand-cyan mx-auto animate-pulse" />
              <div class="space-y-1">
                 <p class="text-xs font-black lowercase text-brand-cyan">vault encrypted</p>
                 <p class="text-[11px] font-medium text-white/70 leading-relaxed">Your professional data is validated by the SCPSN registry protocol.</p>
              </div>
           </div>
        </div>
      </div>
    </div>

    <!-- Hidden CV Input -->
    <input type="file" ref="cvInput" class="hidden" accept=".pdf,.doc,.docx" @change="handleDocumentUpload" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useUploadFile } from '@/composables/useUploadFile'
import { useCustomToast } from '@/composables/core/useCustomToast'
import { members_api } from '@/api_factory/modules/members'
import { media_api } from '@/api_factory/modules/media'
import { useCMS } from '@/composables/useCMS'

const { cmsConfig } = useCMS()

definePageMeta({
  layout: 'dashboard'
})

const { user, token: userToken, setUser } = useUser()
const { uploadFile, uploading } = useUploadFile()
const { showToast } = useCustomToast()

const isSaving = ref(false)
const lastSynced = ref(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
const activeUploadType = ref(null)

const profileData = ref({
  bio: user.value?.professionalProfile?.bio || '',
  education: user.value?.professionalProfile?.education || [],
  experience: user.value?.professionalProfile?.experience || []
})

const documentStatus = computed(() => ({
  'Practicing License': user.value?.documents?.license ? 'verified' : 'missing',
  'Scientific BSc/MSc': user.value?.documents?.qualification ? 'verified' : 'missing',
  'National Passport': user.value?.documents?.passport ? 'verified' : 'missing',
  'Professional CV': user.value?.documents?.cv ? 'verified' : 'missing'
}))

const userInitials = computed(() => {
  if (!user.value?.fullName) return 'SC'
  return user.value.fullName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)
})

const addItem = (type) => {
  profileData.value[type].push('')
}

const removeItem = (type, index) => {
  profileData.value[type].splice(index, 1)
}

const handleImageUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  try {
    const res = await uploadFile(file)
    // The res should contain the url
    const url = res.secure_url || res.url || res
    await syncProfileUpdate({ profilePicture: url })
    showToast({ title: 'success', message: 'profile picture updated in registry', toastType: 'success' })
  } catch (err) {
    showToast({ title: 'error', message: 'failed to upload scientific asset', toastType: 'error' })
  }
}

const triggerDocumentUpload = (name) => {
  activeUploadType.value = name
  // Fallback if refs are not working as expected across components
  const cvInput = document.createElement('input')
  cvInput.type = 'file'
  cvInput.accept = name === 'Professional CV' ? '.pdf,.doc,.docx' : 'image/*,.pdf'
  cvInput.onchange = (e) => handleDocumentUpload(e, name)
  cvInput.click()
}

const handleDocumentUpload = async (event, name) => {
  const file = event.target.files[0]
  if (!file) return

  try {
    const res = await uploadFile(file)
    const url = res.url || res
    const docKey = getDocKey(name)
    await syncProfileUpdate({ 
      documents: { 
        ...user.value.documents,
        [docKey]: url 
      } 
    })
    showToast({ title: 'Success', message: `${name} uploaded successfully`, toastType: 'success' })
  } catch (err) {
    showToast({ title: 'Error', message: `Failed to upload ${name}`, toastType: 'error' })
  }
}

const getDocKey = (name) => {
  const map = {
    'Practicing License': 'license',
    'Scientific BSc/MSc': 'qualification',
    'National Passport': 'passport',
    'Professional CV': 'cv'
  }
  return map[name]
}

const syncProfileUpdate = async (update) => {
  if (!user.value?.id) {
    // If no ID, maybe the backend uses /profile
    const config = useRuntimeConfig()
    const apiBase = config.public.apiBase || 'http://localhost:3000/api'
    const response = await $fetch(`${apiBase}/members/profile`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${userToken.value}` },
      body: update
    })
    setUser(response, userToken.value)
    return
  }
  
  const response = await members_api.updateProfile(user.value.id, update)
  setUser(response.data, userToken.value)
}

const savePortfolio = async () => {
  isSaving.value = true
  try {
    await syncProfileUpdate({
      professionalProfile: {
        bio: profileData.value.bio,
        education: profileData.value.education.filter(e => e.trim()),
        experience: profileData.value.experience.filter(e => e.trim())
      }
    })
    lastSynced.value = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    showToast({ title: 'Success', message: 'Portfolio synced with registry', toastType: 'success' })
  } catch (err) {
    showToast({ title: 'Error', message: 'Registry sync failed', toastType: 'error' })
  } finally {
    isSaving.value = false
  }
}

const exportCV = () => {
  showToast({ title: 'Exporting', message: 'Preparing your scientific CV...', toastType: 'info' })
  setTimeout(() => {
    window.print()
  }, 1000)
}

onMounted(() => {
  if (!user.value) {
    // router.push('/login')
  }
})
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
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
  color: #003366;
}
</style>
