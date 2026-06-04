<template>
  <div class="min-h-screen bg-white font-body overflow-x-hidden">

    <!-- ─── NAVIGATION ─────────────────────────────────────────── -->
    <nav class="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl overflow-hidden border border-slate-100">
              <img src="~/assets/img/logo.jpeg" class="w-full h-full object-cover" />
            </div>
            <span class="text-[13px] font-bold text-slate-800 tracking-tight hidden sm:block">SCPSN</span>
          </div>
          <div class="hidden md:flex items-center gap-1">
            <a v-for="link in navLinks" :key="link" href="#"
              class="text-[13px] font-medium text-slate-500 hover:text-[#1d4e89] px-4 py-2 rounded-lg hover:bg-blue-50 transition-all duration-200">
              {{ link }}
            </a>
          </div>
          <div class="flex items-center gap-2">
            <NuxtLink to="/login"
              class="text-[13px] font-semibold text-slate-600 hover:text-[#1d4e89] px-4 py-2 rounded-lg hover:bg-slate-50 transition-all duration-200">
              Login
            </NuxtLink>
            <NuxtLink to="/signup"
              class="inline-flex items-center gap-1.5 bg-[#1d4e89] hover:bg-blue-800 text-white text-[13px] font-semibold px-4 py-2 rounded-xl transition-colors duration-200">
              Join Now
              <LucideArrowRight :size="13" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>


    <!-- ─── HERO ───────────────────────────────────────────────── -->
    <section class="relative min-h-screen flex items-center bg-white overflow-hidden pt-16">

      <!-- Subtle grid pattern -->
      <div class="absolute inset-0 opacity-[0.03]"
        style="background-image: linear-gradient(#1d4e89 1px, transparent 1px), linear-gradient(to right, #1d4e89 1px, transparent 1px); background-size: 48px 48px;">
      </div>

      <!-- Blue accent blob -->
      <div class="absolute top-20 right-0 w-[500px] h-[500px] bg-blue-50 rounded-full blur-3xl opacity-40 pointer-events-none"></div>
      <div class="absolute bottom-0 left-0 w-[300px] h-[300px] bg-slate-50 rounded-full blur-3xl opacity-60 pointer-events-none"></div>

      <div class="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div class="grid lg:grid-cols-2 gap-16 items-center">

          <!-- Left copy -->
          <div>
            <div class="inline-flex items-center gap-2 bg-blue-50 text-[#1d4e89] text-[11px] font-semibold px-4 py-2 rounded-full mb-7 border border-blue-100">
              <span class="w-1.5 h-1.5 bg-[#1d4e89] rounded-full animate-pulse"></span>
              Excellence in Pathology · Est. Nigeria
            </div>

            <h1 class="text-5xl sm:text-6xl lg:text-[64px] font-bold text-slate-900 leading-[1.05] tracking-tight mb-6">
              Advancing<br />
              <span class="text-[#1d4e89]">Cellular</span><br />
              Diagnostics.
            </h1>

            <p class="text-[16px] text-slate-500 leading-relaxed max-w-[460px] mb-10">
              Nigeria's premier body for cellular pathology scientists — setting national standards, fostering global collaboration, and driving laboratory innovation.
            </p>

            <div class="flex flex-wrap items-center gap-3">
              <NuxtLink to="/signup"
                class="inline-flex items-center gap-2 bg-[#1d4e89] hover:bg-blue-800 text-white text-[14px] font-semibold px-6 py-3.5 rounded-xl transition-colors duration-200">
                Join the Network
                <LucideArrowRight :size="15" />
              </NuxtLink>
              <a href="#about"
                class="inline-flex items-center gap-2 bg-white border border-slate-200 hover:border-blue-200 text-slate-700 hover:text-[#1d4e89] text-[14px] font-semibold px-6 py-3.5 rounded-xl transition-all duration-200">
                Learn More
              </a>
            </div>

            <!-- Stat strip -->
            <div class="flex items-center gap-8 mt-12 pt-10 border-t border-slate-100">
              <div v-for="stat in heroStats" :key="stat.label">
                <p class="text-2xl font-bold text-[#1d4e89]">{{ stat.value }}</p>
                <p class="text-[12px] text-slate-400 font-medium mt-0.5">{{ stat.label }}</p>
              </div>
            </div>
          </div>

          <!-- Right: rotating image cards -->
          <div class="relative hidden lg:block h-[540px]">
            <div v-for="(slide, i) in slides" :key="i"
              class="absolute inset-0 transition-all duration-[1200ms] ease-in-out rounded-3xl overflow-hidden border border-slate-200"
              :class="currentSlide === i ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-95 z-0'">
              <img :src="slide.image" class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-gradient-to-t from-[#1d4e89]/70 via-transparent to-transparent"></div>
              <div class="absolute bottom-0 left-0 right-0 p-7">
                <div class="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white text-[11px] font-semibold px-3 py-1.5 rounded-full mb-3 border border-white/20">
                  {{ slide.tagline }}
                </div>
                <p class="text-white text-[22px] font-bold leading-snug">{{ slide.titlePart1 }} <span class="text-blue-200">{{ slide.titlePart2 }}</span>.</p>
              </div>
            </div>
            <!-- Slide dots -->
            <div class="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              <button v-for="(_, i) in slides" :key="i" @click="currentSlide = i"
                class="h-1.5 rounded-full transition-all duration-500"
                :class="currentSlide === i ? 'w-8 bg-[#1d4e89]' : 'w-3 bg-slate-300 hover:bg-slate-400'">
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>


    <!-- ─── VALUES ─────────────────────────────────────────────── -->
    <section id="about" class="bg-slate-50 border-y border-slate-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div v-for="v in values" :key="v.title"
            class="bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-200 hover:shadow-sm transition-all duration-300">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center mb-4" :class="v.colors.bg">
              <component :is="v.icon" :size="18" :class="v.colors.icon" />
            </div>
            <p class="text-[11px] font-semibold tracking-widest uppercase mb-1.5" :class="v.colors.label">{{ v.category }}</p>
            <h3 class="text-[15px] font-bold text-slate-800 mb-2">{{ v.title }}</h3>
            <p class="text-[13px] text-slate-500 leading-relaxed">{{ v.desc }}</p>
          </div>
        </div>
      </div>
    </section>


    <!-- ─── EXCELLENCE FEATURE ─────────────────────────────────── -->
    <section id="features" class="bg-white border-b border-slate-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div class="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          <!-- Image -->
          <div class="relative rounded-3xl overflow-hidden aspect-[4/5] border border-slate-200">
            <img src="/images/hero/3.png" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-[#1d4e89]/50 to-transparent"></div>
            <!-- Floating badge -->
            <div class="absolute bottom-6 left-6 right-6">
              <div class="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
                <p class="text-[11px] font-semibold text-blue-600 tracking-widest uppercase mb-1">Recognition</p>
                <p class="text-[14px] font-bold text-slate-800">SCPSN credentials recognized globally by international laboratory bodies.</p>
              </div>
            </div>
          </div>

          <!-- Copy + benefits -->
          <div>
            <div class="inline-flex items-center gap-2 bg-blue-50 text-[#1d4e89] text-[11px] font-semibold px-4 py-2 rounded-full mb-6 border border-blue-100">
              <LucideMicroscope :size="12" />
              Scientific Excellence
            </div>
            <h2 class="text-4xl lg:text-[48px] font-bold text-slate-900 leading-[1.1] tracking-tight mb-5">
              Precision in<br />
              <span class="text-[#1d4e89]">Diagnostics.</span>
            </h2>
            <p class="text-[16px] text-slate-500 leading-relaxed mb-10">
              Standardizing cellular pathology through rigorous research, global collaboration, and the highest ethical standards in laboratory medicine.
            </p>

            <div class="grid sm:grid-cols-2 gap-4">
              <div v-for="b in benefits" :key="b.title"
                class="bg-slate-50 border border-slate-200 rounded-2xl p-5 hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-200">
                <div class="w-8 h-8 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center mb-3">
                  <component :is="b.icon" :size="15" class="text-[#1d4e89]" />
                </div>
                <h4 class="text-[14px] font-bold text-slate-800 mb-1.5">{{ b.title }}</h4>
                <p class="text-[12px] text-slate-500 leading-relaxed">{{ b.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- ─── MEMBERSHIP TIERS ───────────────────────────────────── -->
    <section id="pricing" class="bg-slate-50 border-b border-slate-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">

        <div class="max-w-xl mb-12">
          <div class="inline-flex items-center gap-2 bg-blue-50 text-[#1d4e89] text-[11px] font-semibold px-4 py-2 rounded-full mb-5 border border-blue-100">
            <LucideShield :size="12" />
            Member Tiers
          </div>
          <h2 class="text-4xl lg:text-[48px] font-bold text-slate-900 leading-[1.1] tracking-tight mb-4">
            Choose Your<br />
            <span class="text-[#1d4e89]">Path.</span>
          </h2>
          <p class="text-[15px] text-slate-500 leading-relaxed">Select a professional tier to begin your enrollment and join Nigeria's premier pathology network.</p>
        </div>

        <div class="grid sm:grid-cols-2 gap-5 max-w-3xl">
          <div v-for="(tier, i) in tiers" :key="i"
            class="bg-white border rounded-2xl p-7 hover:shadow-sm transition-all duration-300 flex flex-col"
            :class="i === 1 ? 'border-[#1d4e89]/30 ring-1 ring-[#1d4e89]/10' : 'border-slate-200 hover:border-blue-200'">

            <div v-if="i === 1"
              class="inline-flex items-center gap-1.5 bg-blue-50 text-[#1d4e89] text-[10px] font-bold px-3 py-1 rounded-full border border-blue-100 mb-4 self-start tracking-widest uppercase">
              Most Popular
            </div>

            <p class="text-[11px] font-semibold text-slate-400 tracking-widest uppercase mb-2">{{ tier.category }}</p>
            <h3 class="text-[18px] font-bold text-slate-800 mb-4 leading-snug">{{ tier.title }}</h3>

            <div class="flex items-baseline gap-1 mb-6">
              <span class="text-[13px] font-bold text-slate-400">₦</span>
              <span class="text-4xl font-bold text-[#1d4e89]">{{ tier.price }}</span>
              <span v-if="tier.per" class="text-[13px] font-medium text-slate-400">{{ tier.per }}</span>
            </div>

            <div class="border-t border-slate-100 pt-5 mb-6 flex-1">
              <ul class="space-y-3">
                <li v-for="feat in tier.features" :key="feat" class="flex items-start gap-2.5 text-[13px] text-slate-600">
                  <LucideCheckCircle :size="15" class="text-emerald-500 flex-shrink-0 mt-0.5" />
                  {{ feat }}
                </li>
              </ul>
            </div>

            <NuxtLink :to="'/signup?tier='+tier.slug"
              class="w-full inline-flex items-center justify-center gap-2 text-[14px] font-semibold px-6 py-3 rounded-xl transition-all duration-200"
              :class="i === 1 ? 'bg-[#1d4e89] hover:bg-blue-800 text-white' : 'bg-slate-50 hover:bg-blue-50 text-slate-800 hover:text-[#1d4e89] border border-slate-200 hover:border-blue-200'">
              {{ tier.buttonText }}
              <LucideArrowRight :size="14" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>


    <!-- ─── COMMUNITY / CTA ────────────────────────────────────── -->
    <section id="community" class="bg-[#1d4e89]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div class="inline-flex items-center gap-2 bg-white/10 text-blue-200 text-[11px] font-semibold px-4 py-2 rounded-full mb-6 border border-white/15">
              <LucideGlobe :size="12" />
              Global Network
            </div>
            <h2 class="text-4xl lg:text-[52px] font-bold text-white leading-[1.1] tracking-tight mb-5">
              Leading the<br />
              <span class="text-blue-200">Future.</span>
            </h2>
            <p class="text-[16px] text-blue-200/80 leading-relaxed mb-8 max-w-md">
              Join a specialized community of pathology scientists advancing laboratory diagnostics across Nigeria and beyond.
            </p>
            <NuxtLink to="/signup"
              class="inline-flex items-center gap-2 bg-white hover:bg-blue-50 text-[#1d4e89] text-[14px] font-bold px-7 py-3.5 rounded-xl transition-colors duration-200">
              Join Now
              <LucideArrowRight :size="15" />
            </NuxtLink>
          </div>

          <!-- Stats grid -->
          <div class="grid grid-cols-3 gap-4">
            <div v-for="stat in stats" :key="stat.label"
              class="bg-white/10 border border-white/10 rounded-2xl p-5 text-center hover:bg-white/15 transition-all duration-200">
              <p class="text-3xl font-bold text-white mb-1">{{ stat.value }}</p>
              <p class="text-[11px] font-semibold text-blue-200/70 tracking-widest uppercase leading-snug">{{ stat.label }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- ─── FOOTER ─────────────────────────────────────────────── -->
    <footer class="bg-white border-t border-slate-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="grid lg:grid-cols-4 gap-10 mb-12">
          <div class="lg:col-span-1">
            <div class="w-10 h-10 rounded-xl overflow-hidden border border-slate-100 mb-4">
              <img src="~/assets/img/logo.jpeg" class="w-full h-full object-cover" />
            </div>
            <p class="text-[13px] text-slate-500 leading-relaxed mb-4">
              Society for Cellular Pathology Scientists of Nigeria. Advancing pathological science through innovation and integrity.
            </p>
            <div class="flex gap-2">
              <a href="#" class="w-8 h-8 rounded-lg border border-slate-200 hover:border-blue-200 hover:bg-blue-50 flex items-center justify-center transition-all duration-200">
                <LucideMail :size="14" class="text-slate-400 hover:text-[#1d4e89]" />
              </a>
              <a href="#" class="w-8 h-8 rounded-lg border border-slate-200 hover:border-blue-200 hover:bg-blue-50 flex items-center justify-center transition-all duration-200">
                <LucidePhone :size="14" class="text-slate-400 hover:text-[#1d4e89]" />
              </a>
            </div>
          </div>

          <div v-for="col in footerLinks" :key="col.title" class="space-y-4">
            <h5 class="text-[11px] font-bold text-[#1d4e89] tracking-widest uppercase">{{ col.title }}</h5>
            <ul class="space-y-2.5">
              <li v-for="link in col.links" :key="link">
                <a href="#" class="text-[13px] font-medium text-slate-500 hover:text-[#1d4e89] transition-colors duration-200">{{ link }}</a>
              </li>
            </ul>
          </div>
        </div>

        <div class="border-t border-slate-100 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p class="text-[12px] text-slate-400 font-medium">© 2026 Society for Cellular Pathology Scientists of Nigeria · All Rights Reserved.</p>
          <div class="flex gap-6">
            <NuxtLink to="/signup" class="text-[12px] font-medium text-slate-400 hover:text-[#1d4e89] transition-colors">Sign Up</NuxtLink>
            <NuxtLink to="/login" class="text-[12px] font-medium text-slate-400 hover:text-[#1d4e89] transition-colors">Login</NuxtLink>
            <a href="#" class="text-[12px] font-medium text-slate-400 hover:text-[#1d4e89] transition-colors">Privacy</a>
          </div>
        </div>
      </div>
    </footer>

  </div>
</template>


<script setup>
import {
  LucideArrowRight,
  LucideCheckCircle,
  LucideMail,
  LucidePhone,
  LucideGlobe,
  LucideShield,
  LucideMicroscope,
  LucideFlaskConical,
  LucideBookOpen,
  LucideAward,
  LucideActivity,
  LucideUsers,
} from 'lucide-vue-next'
import { ref, onMounted, onUnmounted } from 'vue'
import hero1 from "@/assets/img/gallery/photo4.jpeg"
import hero2 from "@/assets/img/gallery/photo3.jpeg"
import hero3 from "@/assets/img/gallery/photo2.jpeg"

const currentSlide = ref(0)
let slideInterval = null

const navLinks = ['About', 'Features', 'Pricing', 'Community', 'Contact']

const slides = [
  { image: hero1, tagline: 'Excellence in Pathology 2026', titlePart1: 'Advancing', titlePart2: 'Diagnostics' },
  { image: hero2, tagline: 'Working Together', titlePart1: 'Fostering', titlePart2: 'Collaboration' },
  { image: hero3, tagline: 'Accurate Results', titlePart1: 'Mastering', titlePart2: 'The Cell' },
]

const heroStats = [
  { value: '1,200+', label: 'Active Members' },
  { value: '15+', label: 'Years of Impact' },
  { value: 'Top 5%', label: 'Global Rank' },
]

const values = [
  {
    title: 'Standardization', category: 'Core Value',
    desc: 'Implementing national protocols for diagnostic precision and laboratory excellence.',
    icon: LucideActivity,
    colors: { bg: 'bg-blue-50', icon: 'text-[#1d4e89]', label: 'text-blue-600' },
  },
  {
    title: 'Collaboration', category: 'Core Value',
    desc: 'Fostering partnerships with global scientific bodies and research institutions.',
    icon: LucideUsers,
    colors: { bg: 'bg-teal-50', icon: 'text-teal-700', label: 'text-teal-600' },
  },
  {
    title: 'Innovation', category: 'Core Value',
    desc: 'Pioneering AI-driven diagnostics and cutting-edge molecular pathology research.',
    icon: LucideFlaskConical,
    colors: { bg: 'bg-purple-50', icon: 'text-purple-700', label: 'text-purple-600' },
  },
  {
    title: 'Integrity', category: 'Core Value',
    desc: 'Upholding the highest ethical standards in laboratory medicine and scientific reporting.',
    icon: LucideShield,
    colors: { bg: 'bg-emerald-50', icon: 'text-emerald-700', label: 'text-emerald-600' },
  },
]

const benefits = [
  { title: 'Scientific Repository', desc: 'Access to peer-reviewed journals, monographs, and research databases.', icon: LucideBookOpen },
  { title: 'Global Recognition', desc: 'SCPSN credentials recognized by international laboratory bodies.', icon: LucideGlobe },
  { title: 'Grant Eligibility', desc: 'Priority access to research grants and institutional funding.', icon: LucideAward },
  { title: 'Event Access', desc: 'Guaranteed access to the International Scientific Congress.', icon: LucideUsers },
]

const tiers = [
  {
    category: 'New Member',
    title: 'New Registration',
    price: '20,000',
    per: 'one-time',
    slug: 'new-registration',
    buttonText: 'Join Now',
    features: [
      'Full association membership',
      'Voting rights',
      'Journal access',
      'Conference discounts',
    ],
  },
  {
    category: 'Existing Member',
    title: 'Membership Renewal',
    price: '10,000',
    per: '/ year',
    slug: 'membership-renewal',
    buttonText: 'Renew Now',
    features: [
      'Maintain active status',
      'Continuous journal access',
      'Resource vault access',
      'Mentorship programme',
    ],
  },
]

const stats = [
  { value: '1,200+', label: 'Active Members' },
  { value: '₦2.4B+', label: 'Research Funding' },
  { value: 'Top 5%', label: 'Global Rank' },
]

const footerLinks = [
  { title: 'Ecosystem', links: ['Vision', 'Protocols', 'Research Hub', 'Ethics Board'] },
  { title: 'Resources', links: ['Archive', 'Peer Journals', 'Clinical Guidelines'] },
  { title: 'Strategic', links: ['Directory', 'Affiliated Colleges', 'Global Hub'] },
]

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.length
}

onMounted(() => {
  slideInterval = setInterval(nextSlide, 7000)
})

onUnmounted(() => {
  if (slideInterval) clearInterval(slideInterval)
})
</script>


<style scoped>
.font-body {
  font-family: 'DM Sans', 'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif;
}
</style>