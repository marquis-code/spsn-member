<template>
  <div class="space-y-8 pb-20 font-body">

    <!-- ─── PAGE HEADER ─────────────────────────────────────── -->
    <section class="bg-white border-b rounded-lg border-slate-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">
        <div class="flex items-start justify-between gap-6 flex-wrap">
          <div class="max-w-xl">
            <div class="inline-flex items-center gap-2 bg-blue-50 text-[#1d4e89] text-xs font-semibold px-4 py-2 rounded-full mb-5 border border-blue-100">
              <LucideUserCircle :size="13" />
              Member Portfolio
            </div>
            <h1 class="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight tracking-tight mb-2">
              {{ user?.fullName || 'Scientific Practitioner' }}
            </h1>
            <p class="text-[13px] text-slate-500 leading-relaxed">
              {{ user?.category || 'General' }} Member &bull; Registry ID:
              <span class="font-bold text-[#1d4e89]">{{ user?.membershipId || 'SC-PENDING' }}</span>
            </p>
          </div>

          <div class="flex items-center gap-3 shrink-0">
            <button
              @click="exportCV"
              class="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-600 text-[13px] font-semibold px-5 py-2.5 rounded-xl hover:border-[#1d4e89] hover:text-[#1d4e89] transition-all duration-200"
            >
              <LucideDownload :size="14" />
              Export CV
            </button>
            <button
              @click="savePortfolio"
              :disabled="isSaving"
              class="inline-flex items-center gap-2 bg-[#1d4e89] hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed text-white text-[13px] font-semibold px-5 py-2.5 rounded-xl transition-colors duration-200"
            >
              <div v-if="isSaving" class="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <LucideRefreshCw v-else :size="14" />
              {{ isSaving ? 'Syncing…' : 'Sync Portfolio' }}
            </button>
          </div>
        </div>
      </div>
    </section>


    <!-- ─── PROFILE IDENTITY STRIP ───────────────────────────── -->
    <section class="bg-slate-50 border-b border-slate-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex items-center gap-6 flex-wrap">

          <!-- Avatar -->
          <div class="relative group shrink-0">
            <div class="w-20 h-20 rounded-2xl bg-[#1d4e89] text-white flex items-center justify-center text-2xl font-bold overflow-hidden border-2 border-white shadow-md">
              <img
                v-if="user?.profilePicture"
                :src="user.profilePicture"
                class="w-full h-full object-cover"
              />
              <span v-else>{{ userInitials }}</span>
              <div
                class="absolute inset-0 bg-black/40 flex items-center justify-center transition-all cursor-pointer"
                :class="uploading ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'"
                @click="!uploading && $refs.fileInput.click()"
              >
                <div v-if="uploading" class="flex flex-col items-center gap-1">
                  <div class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span class="text-[9px] font-bold text-white">uploading</span>
                </div>
                <LucideCamera v-else :size="20" class="text-white" />
              </div>
            </div>
            <button
              @click="!uploading && $refs.fileInput.click()"
              :class="['absolute -bottom-1.5 -right-1.5 w-7 h-7 bg-[#1d4e89] text-white rounded-lg flex items-center justify-center border-2 border-white shadow hover:scale-110 transition-all z-10', uploading ? 'opacity-50 cursor-not-allowed' : '']"
            >
              <LucidePlus :size="12" />
            </button>
            <input type="file" ref="fileInput" class="hidden" accept="image/*" @change="handleImageUpload" />
          </div>

          <!-- Identity info -->
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-3 flex-wrap mb-1">
              <span class="text-[11px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100 px-3 py-1 rounded-lg">Verified Practitioner</span>
              <span class="text-[11px] font-semibold text-slate-400 tracking-widest uppercase">Last synced: {{ lastSynced }}</span>
            </div>
            <p class="text-[13px] text-slate-500 leading-relaxed italic max-w-xl">
              "{{ profileData.bio || cmsConfig?.member?.pages?.portfolio?.subtitle || 'Scientific bio not yet provided. Update your profile to showcase your expertise.' }}"
            </p>
          </div>

        </div>
      </div>
    </section>


    <!-- ─── MAIN CONTENT ─────────────────────────────────────── -->
    <section class="bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div class="grid lg:grid-cols-12 gap-8 items-start">

          <!-- ── Left: Bio + Education + Experience ── -->
          <div class="lg:col-span-7 space-y-6">

            <!-- Bio editor -->
            <div class="bg-white border border-slate-200 rounded-2xl p-7">
              <div class="flex items-center justify-between mb-5">
                <div>
                  <p class="text-[11px] font-semibold text-blue-600 tracking-widest uppercase mb-0.5">Scientific Background</p>
                  <h3 class="text-[16px] font-bold text-slate-800">Professional Biography</h3>
                </div>
                <LucideFileEdit :size="16" class="text-slate-400" />
              </div>
              <textarea
                v-model="profileData.bio"
                rows="5"
                placeholder="Enter your scientific background, research priorities, and professional goals..."
                class="field resize-none leading-relaxed"
              />
            </div>

            <!-- Education + Experience -->
            <div class="grid sm:grid-cols-2 gap-6">

              <!-- Education -->
              <div class="bg-white border border-slate-200 rounded-2xl p-7">
                <div class="flex items-center justify-between mb-5 border-b border-slate-100 pb-4">
                  <div>
                    <p class="text-[11px] font-semibold text-blue-600 tracking-widest uppercase mb-0.5">History</p>
                    <h3 class="text-[15px] font-bold text-slate-800">Education</h3>
                  </div>
                  <button
                    @click="addItem('education')"
                    class="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-[#1d4e89] hover:bg-blue-100 transition-all"
                  >
                    <LucidePlus :size="14" />
                  </button>
                </div>

                <div class="space-y-3">
                  <div
                    v-for="(edu, i) in profileData.education"
                    :key="i"
                    class="flex items-start gap-2"
                  >
                    <input
                      v-model="profileData.education[i]"
                      type="text"
                      placeholder="e.g. BSc. Cellular Pathology – Univ. of Lagos"
                      class="field text-[13px]"
                    />
                    <button
                      @click="removeItem('education', i)"
                      class="shrink-0 w-9 h-9 mt-0.5 rounded-lg border border-slate-200 flex items-center justify-center text-rose-400 hover:bg-rose-50 hover:border-rose-100 transition-all"
                    >
                      <LucideTrash2 :size="13" />
                    </button>
                  </div>
                  <div
                    v-if="profileData.education.length === 0"
                    class="py-8 border-2 border-dashed border-slate-100 rounded-xl text-center"
                  >
                    <p class="text-[12px] font-medium text-slate-300">No education records added</p>
                  </div>
                </div>
              </div>

              <!-- Experience -->
              <div class="bg-white border border-slate-200 rounded-2xl p-7">
                <div class="flex items-center justify-between mb-5 border-b border-slate-100 pb-4">
                  <div>
                    <p class="text-[11px] font-semibold text-blue-600 tracking-widest uppercase mb-0.5">Clinical</p>
                    <h3 class="text-[15px] font-bold text-slate-800">Experience</h3>
                  </div>
                  <button
                    @click="addItem('experience')"
                    class="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-[#1d4e89] hover:bg-blue-100 transition-all"
                  >
                    <LucidePlus :size="14" />
                  </button>
                </div>

                <div class="space-y-3">
                  <div
                    v-for="(exp, i) in profileData.experience"
                    :key="i"
                    class="flex items-start gap-2"
                  >
                    <input
                      v-model="profileData.experience[i]"
                      type="text"
                      placeholder="e.g. Senior Pathologist – General Hospital"
                      class="field text-[13px]"
                    />
                    <button
                      @click="removeItem('experience', i)"
                      class="shrink-0 w-9 h-9 mt-0.5 rounded-lg border border-slate-200 flex items-center justify-center text-rose-400 hover:bg-rose-50 hover:border-rose-100 transition-all"
                    >
                      <LucideTrash2 :size="13" />
                    </button>
                  </div>
                  <div
                    v-if="profileData.experience.length === 0"
                    class="py-8 border-2 border-dashed border-slate-100 rounded-xl text-center"
                  >
                    <p class="text-[12px] font-medium text-slate-300">No experience records added</p>
                  </div>
                </div>
              </div>

            </div>
          </div>


          <!-- ── Right: Document Registry ── -->
          <div class="lg:col-span-5 space-y-5">

            <!-- Document list card -->
            <div class="bg-white border border-slate-200 rounded-2xl p-7">
              <div class="flex items-center justify-between mb-6">
                <div>
                  <p class="text-[11px] font-semibold text-blue-600 tracking-widest uppercase mb-0.5">Registry</p>
                  <h3 class="text-[16px] font-bold text-slate-800">Validated Documents</h3>
                </div>
                <div class="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                  <LucideShieldCheck :size="16" class="text-[#1d4e89]" />
                </div>
              </div>

              <div class="space-y-3">
                <div
                  v-for="(status, name) in documentStatus"
                  :key="name"
                  class="group flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl hover:border-blue-200 hover:shadow-sm transition-all duration-200"
                >
                  <div class="flex items-center gap-3">
                    <div
                      :class="[
                        'w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-200',
                        status === 'verified'
                          ? 'bg-emerald-50 border-emerald-100 text-emerald-600'
                          : 'bg-slate-50 border-slate-100 text-slate-300 group-hover:bg-[#1d4e89] group-hover:border-[#1d4e89] group-hover:text-white'
                      ]"
                    >
                      <LucideFileCheck v-if="status === 'verified'" :size="16" />
                      <LucideFileText v-else :size="16" />
                    </div>
                    <div>
                      <p class="text-[13px] font-bold text-slate-800">{{ name }}</p>
                      <div class="flex items-center gap-1.5 mt-0.5">
                        <span
                          class="block w-1.5 h-1.5 rounded-full"
                          :class="status === 'verified' ? 'bg-emerald-500' : 'bg-slate-300'"
                        />
                        <p class="text-[10px] font-semibold text-slate-400 tracking-widest uppercase">
                          {{ status === 'verified' ? 'System Validated' : 'Action Required' }}
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    @click="triggerDocumentUpload(name)"
                    :class="[
                      'text-[11px] font-bold px-3 py-1.5 rounded-lg border transition-all duration-200',
                      status === 'verified'
                        ? 'opacity-0 group-hover:opacity-100 bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100'
                        : 'bg-[#1d4e89] text-white border-[#1d4e89] hover:bg-blue-800'
                    ]"
                  >
                    {{ status === 'verified' ? 'Replace' : 'Upload' }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Vault encryption card -->
            <div class="bg-[#1d4e89] border border-blue-800 rounded-2xl p-7 relative overflow-hidden">
              <LucideFingerprint
                :size="110"
                class="absolute -right-5 -bottom-5 opacity-[0.06] text-white pointer-events-none"
              />
              <div class="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-5">
                <LucideFingerprint :size="18" class="text-white" />
              </div>
              <p class="text-[11px] font-semibold text-blue-300 tracking-widest uppercase mb-2">Vault Encrypted</p>
              <h3 class="text-[16px] font-bold text-white mb-2 leading-snug">Registry-grade security</h3>
              <p class="text-[13px] text-blue-200 leading-relaxed">
                Your professional data is validated and protected by the SCPSN registry protocol.
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>

    <!-- Hidden file input for documents -->
    <input type="file" ref="cvInput" class="hidden" accept=".pdf,.doc,.docx,image/*" @change="handleDocumentUpload" />

  </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue'
import {
  LucideUserCircle,
  LucideDownload,
  LucideRefreshCw,
  LucideCamera,
  LucidePlus,
  LucideFileEdit,
  LucideTrash2,
  LucideShieldCheck,
  LucideFileCheck,
  LucideFileText,
  LucideFingerprint,
} from 'lucide-vue-next'
import { useUploadFile } from '@/composables/useUploadFile'
import { useCustomToast } from '@/composables/core/useCustomToast'
import { members_api } from '@/api_factory/modules/members'
import { useCMS } from '@/composables/useCMS'

const { cmsConfig } = useCMS()

definePageMeta({ layout: 'dashboard' })

const { user, token: userToken, setUser } = useUser()
const { uploadFile, uploading } = useUploadFile()
const { showToast } = useCustomToast()

const isSaving   = ref(false)
const lastSynced = ref(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
const activeUploadType = ref(null)

const profileData = ref({
  bio:        user.value?.professionalProfile?.bio        || '',
  education:  user.value?.professionalProfile?.education  || [],
  experience: user.value?.professionalProfile?.experience || [],
})

const documentStatus = computed(() => ({
  'Practicing License': user.value?.documents?.license       ? 'verified' : 'missing',
  'Scientific BSc/MSc': user.value?.documents?.qualification ? 'verified' : 'missing',
  'National Passport':  user.value?.documents?.passport      ? 'verified' : 'missing',
  'Professional CV':    user.value?.documents?.cv            ? 'verified' : 'missing',
}))

const userInitials = computed(() => {
  if (!user.value?.fullName) return 'SC'
  return user.value.fullName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)
})

const addItem    = (type)          => profileData.value[type].push('')
const removeItem = (type, index)   => profileData.value[type].splice(index, 1)

const handleImageUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return
  try {
    const res = await uploadFile(file)
    const url = res.secure_url || res.url || res
    await syncProfileUpdate({ profilePicture: url })
    showToast({ title: 'Success', message: 'Profile picture updated', toastType: 'success' })
  } catch {
    showToast({ title: 'Error', message: 'Failed to upload image', toastType: 'error' })
  }
}

const triggerDocumentUpload = (name) => {
  activeUploadType.value = name
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = name === 'Professional CV' ? '.pdf,.doc,.docx' : 'image/*,.pdf'
  input.onchange = (e) => handleDocumentUpload(e, name)
  input.click()
}

const handleDocumentUpload = async (event, name) => {
  const file = event.target.files[0]
  if (!file) return
  try {
    const res = await uploadFile(file)
    const url = res.url || res
    const docKey = { 'Practicing License': 'license', 'Scientific BSc/MSc': 'qualification', 'National Passport': 'passport', 'Professional CV': 'cv' }[name]
    await syncProfileUpdate({ documents: { ...user.value.documents, [docKey]: url } })
    showToast({ title: 'Success', message: `${name} uploaded successfully`, toastType: 'success' })
  } catch {
    showToast({ title: 'Error', message: `Failed to upload ${name}`, toastType: 'error' })
  }
}

const syncProfileUpdate = async (update) => {
  if (!user.value?.id) {
    const config = useRuntimeConfig()
    const apiBase = config.public.apiBase || 'https://spsn-backend.onrender.com/api'
    const response = await $fetch(`${apiBase}/members/profile`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${userToken.value}` },
      body: update,
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
        bio:        profileData.value.bio,
        education:  profileData.value.education.filter(e => e.trim()),
        experience: profileData.value.experience.filter(e => e.trim()),
      },
    })
    lastSynced.value = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    showToast({ title: 'Success', message: 'Portfolio synced with registry', toastType: 'success' })
  } catch {
    showToast({ title: 'Error', message: 'Registry sync failed', toastType: 'error' })
  } finally {
    isSaving.value = false
  }
}

const exportCV = () => {
  showToast({ title: 'Exporting', message: 'Preparing your scientific CV…', toastType: 'info' })
  setTimeout(() => window.print(), 1000)
}
</script>


<style scoped>
.font-body {
  font-family: 'DM Sans', 'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif;
}

.field {
  @apply w-full bg-slate-50 border border-slate-200 text-slate-800 placeholder:text-slate-400 text-[14px] px-4 py-3 rounded-xl focus:outline-none focus:border-blue-300 focus:bg-white focus:ring-2 focus:ring-blue-50 transition-all duration-200;
}
</style>