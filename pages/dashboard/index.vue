<template>
  <div class="space-y-8 max-w-7xl mx-auto font-body">

    <!-- ─── HERO / STATUS BANNER ───────────────────────────────── -->
    <section class="grid grid-cols-1 lg:grid-cols-3 gap-5">

      <!-- Welcome card -->
      <div
        class="lg:col-span-2 bg-[#1d4e89] rounded-2xl p-7 lg:p-10 text-white relative overflow-hidden"
        :style="cmsConfig?.member?.portal?.heroBg
          ? { backgroundImage: `url(${cmsConfig.member.portal.heroBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }
          : {}"
      >
        <div v-if="!cmsConfig?.member?.portal?.heroBg"
          class="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none">
        </div>
        <div v-else class="absolute inset-0 bg-[#1d4e89]/60 backdrop-blur-[2px]"></div>

        <div class="relative z-10 space-y-5">
          <div class="inline-flex items-center gap-2 bg-white/10 text-white text-[11px] font-semibold px-4 py-1.5 rounded-full border border-white/15">
            <span class="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
            Scientific Network Active
          </div>

          <h1 class="text-4xl lg:text-[48px] font-bold leading-[1.05] tracking-tight">
            {{ cmsConfig?.member?.portal?.welcomeTitle || 'Welcome back,' }}<br />
            <span class="text-blue-200">{{ user?.fullName?.split(' ')[0] || 'Practitioner' }}.</span>
          </h1>

          <p class="text-white/70 text-[15px] font-medium max-w-md leading-relaxed">
            {{ cmsConfig?.member?.portal?.welcomeSubtitle || 'Your credentials have been re-validated for the current diagnostic cycle. You have access to the latest pathological archives.' }}
          </p>

          <div class="flex flex-wrap items-center gap-3 pt-2">
            <NuxtLink to="/dashboard/library"
              class="inline-flex items-center gap-2 bg-white hover:bg-blue-50 text-[#1d4e89] text-[13px] font-bold px-5 py-2.5 rounded-xl transition-colors duration-200">
              Explore Archives
              <LucideArrowRight :size="14" />
            </NuxtLink>
            <NuxtLink to="/dashboard/portfolio"
              class="text-[13px] font-semibold text-white/70 hover:text-white transition-colors duration-200">
              Update Profile
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Membership identity card -->
      <div class="bg-white border border-slate-200 rounded-2xl p-7 flex flex-col justify-between hover:border-blue-200 hover:shadow-sm transition-all duration-300">
        <div class="space-y-5">
          <div>
            <p class="text-[11px] font-semibold text-blue-600 tracking-widest uppercase mb-3">Membership Identity</p>
            <div class="flex items-center justify-between">
              <h3 class="text-[18px] font-bold text-slate-800">{{ user?.category || 'Professional' }}</h3>
              <span :class="statusClass" class="text-[11px] font-bold px-3 py-1 rounded-lg">
                {{ user?.status || 'Active' }}
              </span>
            </div>
          </div>

          <div class="space-y-2.5 pt-2 border-t border-slate-100">
            <div class="flex justify-between items-center">
              <span class="text-[12px] font-semibold text-slate-400">Renewal Date</span>
              <span class="text-[13px] font-bold text-slate-700">{{ renewalDate }}</span>
            </div>
            <div class="h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div style="width: 75%" class="h-full bg-[#1d4e89] rounded-full"></div>
            </div>
            <p class="text-[12px] text-slate-400 font-medium">75% of membership cycle remaining</p>
          </div>
        </div>

        <button
          @click="downloadVirtualID"
          :disabled="isDownloading"
          class="w-full mt-6 inline-flex items-center justify-center gap-2 bg-slate-50 border border-slate-200 hover:border-blue-200 hover:bg-blue-50/40 text-slate-700 hover:text-[#1d4e89] text-[13px] font-semibold py-3 rounded-xl transition-all duration-200 disabled:opacity-50"
        >
          <LucideLoader2 v-if="isDownloading" :size="15" class="animate-spin" />
          <LucideDownload v-else :size="15" />
          {{ isDownloading ? 'Generating ID...' : 'Download Virtual ID' }}
        </button>
      </div>
    </section>


    <!-- ─── METRICS ────────────────────────────────────────────── -->
    <section class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div
        v-for="metric in metrics"
        :key="metric.label"
        class="bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-200 hover:shadow-sm transition-all duration-300 group"
      >
        <div class="flex items-start justify-between mb-4">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center border border-slate-100 group-hover:bg-[#1d4e89] group-hover:border-[#1d4e89] transition-all duration-300"
            :class="metric.colors.bg">
            <component :is="metric.iconComponent" :size="17"
              class="transition-colors duration-300"
              :class="[metric.colors.icon, 'group-hover:text-white']" />
          </div>
          <span class="text-[11px] font-bold text-emerald-500">+{{ metric.growth }}%</span>
        </div>
        <p class="text-[12px] font-semibold text-slate-400 mb-1">{{ metric.label }}</p>
        <h4 class="text-[26px] font-bold text-slate-800 leading-none">{{ metric.value }}</h4>
      </div>
    </section>


    <!-- ─── CONTENT SPLIT ─────────────────────────────────────── -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

      <!-- Publications -->
      <div class="lg:col-span-2 space-y-5">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-[11px] font-semibold text-blue-600 tracking-widest uppercase">Publications</p>
            <h3 class="text-[15px] font-bold text-slate-800 mt-0.5">Latest Scientific Publications</h3>
          </div>
          <NuxtLink to="/dashboard/library"
            class="text-[12px] font-semibold text-[#1d4e89] hover:underline inline-flex items-center gap-1">
            View all
            <LucideArrowRight :size="12" />
          </NuxtLink>
        </div>

        <div class="space-y-3">
          <div
            v-for="pub in recentPublications"
            :key="pub.id"
            @click="openPublication(pub)"
            class="bg-white border border-slate-200 rounded-2xl p-5 flex items-center gap-5 cursor-pointer group hover:border-blue-200 hover:shadow-sm transition-all duration-200"
          >
            <div class="w-12 h-14 bg-slate-50 border border-slate-100 rounded-xl flex-shrink-0 flex flex-col items-center justify-center group-hover:bg-[#1d4e89] group-hover:border-[#1d4e89] transition-all duration-300 relative overflow-hidden">
              <LucideFileText :size="18" class="text-slate-400 group-hover:text-white transition-colors duration-300" />
              <div class="absolute bottom-0 inset-x-0 h-0.5 bg-[#1d4e89] group-hover:bg-blue-200"></div>
            </div>

            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-1">
                <h4 class="text-[14px] font-bold text-slate-800 truncate group-hover:text-[#1d4e89] transition-colors duration-200">{{ pub.title }}</h4>
                <span class="bg-blue-50 text-[#1d4e89] border border-blue-100 text-[10px] font-bold px-2 py-0.5 rounded-md flex-shrink-0">{{ pub.category }}</span>
              </div>
              <p class="text-[12px] text-slate-500 leading-relaxed line-clamp-1">{{ pub.desc }}</p>
              <div class="flex items-center gap-3 mt-2 text-[11px] font-semibold text-slate-400">
                <span>{{ pub.date }}</span>
                <span class="w-1 h-1 bg-slate-300 rounded-full"></span>
                <span>{{ pub.size }}</span>
              </div>
            </div>

            <LucideChevronRight :size="16" class="text-slate-300 group-hover:text-[#1d4e89] group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0" />
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-5">
        <div>
          <p class="text-[11px] font-semibold text-blue-600 tracking-widest uppercase">Support</p>
          <h3 class="text-[15px] font-bold text-slate-800 mt-0.5">Quick Actions</h3>
        </div>

        <!-- Announcement card -->
        <div class="bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-200 hover:shadow-sm transition-all duration-300 space-y-5">
          <div class="w-10 h-10 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center">
            <LucideMegaphone :size="17" class="text-[#1d4e89]" />
          </div>
          <div>
            <p class="text-[11px] font-semibold text-blue-600 tracking-widest uppercase mb-1.5">Announcement</p>
            <h4 class="text-[15px] font-bold text-slate-800 mb-2">
              {{ cmsConfig?.member?.portal?.announcementTitle || 'Scientific Abstract Due' }}
            </h4>
            <p class="text-[13px] text-slate-500 leading-relaxed">
              {{ cmsConfig?.member?.portal?.announcementText || 'The International Scientific Congress abstract submission is currently open for members.' }}
            </p>
          </div>
          <NuxtLink
            :to="cmsConfig?.member?.portal?.announcementLink || '/dashboard/abstracts'"
            class="w-full inline-flex items-center justify-center gap-2 bg-[#1d4e89] hover:bg-blue-800 text-white text-[13px] font-semibold py-3 rounded-xl transition-colors duration-200"
          >
            Take Action
            <LucideArrowRight :size="13" />
          </NuxtLink>
        </div>

        <!-- Helpdesk card -->
        <div class="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex items-center gap-4 hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-200 cursor-pointer group">
          <div class="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center group-hover:bg-[#1d4e89] group-hover:border-[#1d4e89] transition-all duration-300 flex-shrink-0">
            <LucideHelpCircle :size="17" class="text-slate-400 group-hover:text-white transition-colors duration-300" />
          </div>
          <div>
            <p class="text-[13px] font-bold text-slate-700 group-hover:text-[#1d4e89] transition-colors duration-200">Enquiry Helpdesk</p>
            <p class="text-[11px] text-slate-400 font-medium">Get support from our team</p>
          </div>
          <LucideChevronRight :size="14" class="text-slate-300 group-hover:text-[#1d4e89] ml-auto transition-colors duration-200" />
        </div>

      </div>
    </div>

  </div>
</template>


<script setup>
import {
  LucideArrowRight,
  LucideChevronRight,
  LucideFileText,
  LucideDownload,
  LucideLoader2,
  LucideMegaphone,
  LucideHelpCircle,
  LucideUsers,
  LucideBookOpen,
  LucideActivity,
  LucideAward,
} from 'lucide-vue-next'
import { useLibrary } from '@/composables/useLibrary'
import { useCMS } from '@/composables/useCMS'

definePageMeta({ layout: 'dashboard' })

const { user } = useUser()
const { publications, trackRead } = useLibrary()
const { cmsConfig } = useCMS()

const statusClass = computed(() => {
  const status = user.value?.status?.toLowerCase() || 'active'
  return status === 'active'
    ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
    : 'bg-amber-50 text-amber-700 border border-amber-100'
})

const renewalDate = computed(() => 'Dec 31, 2026')
const isDownloading = ref(false)

const metrics = [
  { label: 'Publications Read', value: '24', growth: 12, iconComponent: LucideBookOpen, colors: { bg: 'bg-blue-50', icon: 'text-[#1d4e89]' } },
  { label: 'Network Members', value: '1,248', growth: 8, iconComponent: LucideUsers, colors: { bg: 'bg-teal-50', icon: 'text-teal-700' } },
  { label: 'CME Points', value: '140', growth: 5, iconComponent: LucideActivity, colors: { bg: 'bg-purple-50', icon: 'text-purple-700' } },
  { label: 'Certifications', value: '6', growth: 2, iconComponent: LucideAward, colors: { bg: 'bg-emerald-50', icon: 'text-emerald-700' } },
]

const recentPublications = computed(() => publications.value?.slice(0, 4) || [])

const downloadVirtualID = async () => {
  isDownloading.value = true
  const element = document.getElementById('virtual-id-card')
  if (!element) return
  try {
    const canvas = await html2canvas(element, { scale: 3, useCORS: true, backgroundColor: null })
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'px', format: [400, 600] })
    pdf.addImage(imgData, 'PNG', 0, 0, 400, 600)
    pdf.save(`SCPSN_Virtual_ID_${user.value?.membershipId || 'Member'}.pdf`)
  } catch (err) {
    console.error('Download Error:', err)
  } finally {
    isDownloading.value = false
  }
}

const openPublication = (pub) => {
  navigateTo(`/dashboard/library?id=${pub.id}`)
}
</script>


<style scoped>
.font-body {
  font-family: 'DM Sans', 'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif;
}
</style>