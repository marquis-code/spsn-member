<template>
  <div class="space-y-10 max-w-7xl mx-auto animate-fade-in">
    <!-- Profile Header -->
    <header class="bg-white rounded-[2rem] p-10 border border-slate-200 shadow-xl shadow-slate-200/40 relative overflow-hidden">
      <div class="absolute top-0 right-0 w-96 h-96 bg-brand-cyan/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div class="flex flex-col md:flex-row gap-10 items-center relative z-10">
        <div class="w-32 h-32 rounded-3xl bg-[#003366] text-white flex items-center justify-center text-5xl font-black border-4 border-white shadow-2xl relative group">
           {{ userInitials }}
           <button class="absolute -bottom-2 -right-2 w-10 h-10 bg-brand-cyan text-[#003366] rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-all border-4 border-white">
             <Icon name="lucide:camera" size="16" />
           </button>
        </div>
        <div class="flex-1 text-center md:text-left space-y-2">
          <div class="flex flex-wrap items-center gap-4 justify-center md:justify-start">
             <h1 class="text-4xl font-bold text-slate-800 tracking-tight leading-none">{{ user?.fullName }}</h1>
             <span class="px-3 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-lg text-xs font-bold mt-1">Verified Practitioner</span>
          </div>
          <p class="text-sm font-semibold text-slate-400">{{ user?.category }} Member • Registry ID: {{ user?.membershipId || 'SC-PENDING' }}</p>
          <p class="text-sm font-medium text-slate-500 max-w-xl leading-relaxed italic">"{{ profileData.bio || 'Scientific bio not yet provided. Update your profile to showcase your expertise.' }}"</p>
        </div>
        <div class="flex flex-col gap-4">
           <button @click="savePortfolio" :disabled="isSaving" class="bg-[#003366] text-white px-10 py-4 rounded-xl text-xs font-bold shadow-xl shadow-[#003366]/20 hover:scale-105 transition-all disabled:opacity-50">
             {{ isSaving ? 'Syncing...' : 'Sync Portfolio' }}
           </button>
           <button class="bg-white border border-slate-200 text-slate-400 px-10 py-4 rounded-xl text-xs font-bold hover:border-slate-800 hover:text-slate-800 transition-all">Export CV</button>
        </div>
      </div>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <!-- Main Content: Bio & Exp -->
      <div class="lg:col-span-2 space-y-10">
        <!-- Bio Editor -->
        <div class="bg-white rounded-[2rem] border border-slate-200 p-10 space-y-8">
           <div class="flex items-center justify-between mb-4">
              <h3 class="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Scientific Background</h3>
              <Icon name="lucide:file-edit" size="16" class="text-slate-300" />
           </div>
           
           <div class="space-y-6">
             <div class="space-y-2">
               <label class="text-[9px] font-black text-[#003366] uppercase tracking-widest ml-1">Professional Biography</label>
               <textarea 
                 v-model="profileData.bio"
                 rows="4"
                 placeholder="Scientific background and research priorities..."
                 class="w-full bg-slate-50 border border-slate-100 rounded-2xl p-6 text-[13px] font-medium text-slate-600 focus:ring-4 focus:ring-[#003366]/5 focus:border-[#003366]/20 outline-none transition-all resize-none shadow-inner"
               ></textarea>
             </div>

             <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div class="space-y-4">
                 <div class="flex items-center justify-between">
                    <label class="text-[9px] font-black text-[#003366] uppercase tracking-widest">Education History</label>
                    <button @click="addItem('education')" class="p-1 hover:bg-slate-100 rounded-lg text-brand-cyan transition-all"><Icon name="lucide:plus-circle" size="16" /></button>
                 </div>
                 <div class="space-y-3">
                   <div v-for="(edu, i) in profileData.education" :key="i" class="flex items-center gap-3 group">
                      <input 
                        v-model="profileData.education[i]" 
                        class="flex-1 bg-slate-50 border border-slate-100 px-4 py-3 rounded-xl text-[11px] font-bold text-slate-600 outline-none transition-all focus:border-brand-cyan focus:bg-white"
                      />
                      <button @click="removeItem('education', i)" class="p-2 text-rose-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"><Icon name="lucide:trash-2" size="16" /></button>
                   </div>
                 </div>
               </div>

               <div class="space-y-4">
                 <div class="flex items-center justify-between">
                    <label class="text-xs font-bold text-[#003366]">Clinical Experience</label>
                    <button @click="addItem('experience')" class="p-1 hover:bg-slate-100 rounded-lg text-brand-cyan transition-all"><Icon name="lucide:plus-circle" size="16" /></button>
                 </div>
                 <div class="space-y-3">
                   <div v-for="(exp, i) in profileData.experience" :key="i" class="flex items-center gap-3 group">
                      <input 
                        v-model="profileData.experience[i]" 
                        class="flex-1 bg-slate-50 border border-slate-100 px-4 py-3 rounded-xl text-xs font-medium text-slate-600 outline-none transition-all focus:border-brand-cyan focus:bg-white"
                      />
                      <button @click="removeItem('experience', i)" class="p-2 text-rose-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"><Icon name="lucide:trash-2" size="16" /></button>
                   </div>
                 </div>
               </div>
             </div>
           </div>
        </div>
      </div>

      <!-- Right Column: Document Registry -->
      <div class="space-y-10">
        <div class="bg-white rounded-[2rem] border border-slate-200 p-10 space-y-8 h-full">
           <h3 class="text-sm font-bold text-slate-400">Validated Documents</h3>
           <div class="space-y-6">
              <div v-for="(status, name) in documentStatus" :key="name" class="p-6 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between group hover:border-[#003366]/20 transition-all">
                <div class="flex items-center gap-4">
                  <div class="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#003366] shadow-sm border border-slate-100">
                    <Icon name="lucide:file-text" size="18" />
                  </div>
                  <div>
                    <h5 class="text-xs font-bold text-slate-800">{{ name }}</h5>
                    <p class="text-xs font-semibold text-slate-500 mt-0.5">{{ status === 'verified' ? 'System Validated' : 'Missing Requirement' }}</p>
                  </div>
                </div>
                <div v-if="status === 'verified'" class="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <Icon name="lucide:check" size="14" />
                </div>
                <button v-else class="text-xs font-bold text-brand-cyan hover:underline">Upload</button>
              </div>
           </div>

           <div class="p-8 bg-[#003366] text-white rounded-2xl space-y-4 shadow-xl shadow-[#003366]/10 text-center">
              <Icon name="lucide:shield-check" size="32" class="text-brand-cyan mx-auto" />
              <p class="text-xs font-bold leading-relaxed">Your professional data is encrypted and validated by the SCPSN registry protocol.</p>
           </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'dashboard'
})

const { user, token: userToken, setUser } = useUser()
const isSaving = ref(false)

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
  if (!user.value?.fullName) return 'M'
  return user.value.fullName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)
})

const addItem = (type) => {
  profileData.value[type].push('')
}

const removeItem = (type, index) => {
  profileData.value[type].splice(index, 1)
}

const savePortfolio = async () => {
  isSaving.value = true
  try {
    const config = useRuntimeConfig()
    const apiBase = config.public.apiBase || 'http://localhost:3000/api'
    
    const response = await $fetch(`${apiBase}/members/profile`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${userToken.value}`
      },
      body: {
        professionalProfile: {
          bio: profileData.value.bio,
          education: profileData.value.education.filter(e => e.trim()),
          experience: profileData.value.experience.filter(e => e.trim())
        }
      }
    })
    
    // Update local state
    setUser(response, userToken.value)
    alert('Scientific Portfolio Synced Successfully')
  } catch (err) {
    console.error('Portfolio save error:', err)
    alert('Failed to sync portfolio. Please verify connection.')
  } finally {
    isSaving.value = false
  }
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

::selection {
  background: #00b8d4;
  color: #003366;
}
</style>
