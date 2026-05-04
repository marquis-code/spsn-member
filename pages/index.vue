<template>
  <div class="min-h-screen bg-white font-sans selection:bg-brand-cyan/20 selection:text-brand-dark overflow-x-hidden">
    <!-- Sophisticated Navigation -->
    <Header />

    <!-- Master Carousel Hero -->
    <section class="h-screen relative overflow-hidden bg-brand-dark">
      <div v-for="(slide, i) in slides" :key="i" class="absolute inset-0 transition-all duration-[1500ms] ease-in-out" :class="currentSlide === i ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-110'">
        <img :src="slide.image" class="absolute inset-0 w-full h-full object-cover" />
        <!-- Sophisticated Overlay -->
        <div class="absolute inset-0 bg-gradient-to-r from-[#033958] via-[#033958]/80 to-transparent"></div>
        <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent h-40"></div>
        
        <div class="container mx-auto px-6 h-full flex items-center relative z-20">
          <div class="max-w-4xl space-y-8" :class="currentSlide === i ? 'animate-in fade-in slide-in-from-bottom-12 duration-1000' : 'opacity-0'">
            <div class="inline-flex items-center gap-3 px-4 py-1.5 glass-dark rounded-lg border border-white/10">
              <span class="w-1.5 h-1.5 bg-brand-cyan rounded-full animate-pulse"></span>
              <span class="text-sm font-semibold text-white/90">{{ slide.tagline }}</span>
            </div>
            
            <h1 class="text-6xl md:text-[90px] font-black text-white tracking-tighter leading-[0.9]">
              {{ slide.titlePart1 }} <br/> <span class="text-brand-cyan">{{ slide.titlePart2 }}</span>.
            </h1>
            
            <p class="text-lg md:text-xl text-white/70 font-medium max-w-2xl leading-relaxed">
              {{ slide.description }}
            </p>

            <div class="flex flex-wrap items-center gap-6 pt-4">
              <NuxtLink to="/signup" class="btn-cyan !normal-case !text-base">
                Sign Up
              </NuxtLink>
              <button class="flex items-center gap-4 text-sm font-semibold text-white group">
                <span>View pricing plans</span>
                <div class="w-10 h-10 rounded-xl border border-white/20 flex items-center justify-center group-hover:bg-brand-cyan group-hover:border-brand-cyan group-hover:text-white transition-all">
                  <Icon name="lucide:arrow-right" :size="16" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Carousel Navigation Dots -->
      <div class="absolute bottom-12 left-6 md:left-24 flex gap-3 z-30">
        <button 
          v-for="(_, i) in slides" 
          :key="i" 
          @click="currentSlide = i"
          class="h-1 rounded-full transition-all duration-700"
          :class="currentSlide === i ? 'w-12 bg-brand-cyan' : 'w-4 bg-white/20 hover:bg-white/40'"
        ></button>
      </div>
    </section>

    <!-- Core Values Section -->
    <section id="about" class="py-32 bg-white">
       <div class="container mx-auto px-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
             <div v-for="(v, i) in values" :key="i" class="space-y-6 group p-8 rounded-3xl border border-transparent hover:bg-slate-50 transition-all duration-500">
                <div class="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-[#033958] border border-slate-100 group-hover:bg-[#033958] group-hover:text-white transition-all duration-500">
                   <Icon :name="v.icon" :size="24" />
                </div>
                <div class="space-y-3">
                   <h3 class="text-lg font-semibold text-[#033958]">{{ v.title }}</h3>
                   <p class="text-slate-500 text-sm font-medium leading-relaxed">{{ v.desc }}</p>
                </div>
             </div>
          </div>
       </div>
    </section>

    <!-- Excellence Section -->
    <section id="features" class="py-32 bg-slate-50 relative overflow-hidden">
       <div class="container mx-auto px-6">
          <div class="flex flex-col lg:flex-row gap-24 items-center">
             <div class="lg:w-1/2 space-y-12">
                <div class="space-y-6">
                   <span class="inline-block px-4 py-1.5 bg-[#033958]/5 text-[#033958] font-semibold text-sm rounded-lg border border-[#033958]/10">
                      Scientific Excellence
                   </span>
                   <h2 class="text-5xl md:text-6xl font-black text-[#033958] tracking-tighter leading-none">Precision in <br/> <span class="text-brand-cyan">Diagnostics</span>.</h2>
                   <p class="text-slate-500 font-medium text-lg leading-relaxed max-w-xl">
                     We are committed to standardizing cellular pathology through rigorous research and global collaboration.
                   </p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div v-for="b in benefits" :key="b.title" class="space-y-4 p-8 bg-white rounded-3xl border border-slate-100 transition-all hover:-translate-y-1">
                      <div class="w-10 h-10 bg-brand-cyan/10 rounded-xl flex items-center justify-center text-brand-cyan">
                        <Icon name="lucide:activity" :size="20" />
                      </div>
                      <h4 class="font-semibold text-[#033958] tracking-tight text-lg">{{ b.title }}</h4>
                      <p class="text-sm text-slate-500 font-medium leading-relaxed">{{ b.desc }}</p>
                   </div>
                </div>
             </div>

             <div class="lg:w-1/2 relative">
                <div class="rounded-[40px] overflow-hidden aspect-[4/5] relative border border-slate-200 p-4 bg-white">
                   <img src="/images/hero/3.png" class="w-full h-full object-cover rounded-[28px]" />
                   <div class="absolute inset-0 bg-gradient-to-t from-[#033958]/40 to-transparent m-4 rounded-[28px]"></div>
                </div>
             </div>
          </div>
       </div>
    </section>

    <!-- Professional Pathways -->
    <section id="pricing" class="py-32 bg-white">
       <div class="container mx-auto px-6">
          <div class="max-w-2xl mx-auto text-center space-y-4 mb-20">
             <span class="text-sm font-semibold text-brand-cyan mb-2 inline-block">Member Tiers</span>
             <h2 class="text-5xl md:text-6xl font-black text-[#033958] tracking-tighter leading-none">Choose Your Path.</h2>
             <p class="text-base font-medium text-slate-500">Select a professional tier to begin your enrollment.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div v-for="(tier, i) in tiers" :key="i" class="p-10 rounded-[32px] border border-slate-100 flex flex-col space-y-8 group transition-all duration-500 hover:border-brand-cyan" :class="i === 1 ? 'bg-slate-50' : 'bg-white'">
                <div class="space-y-3">
                   <span class="text-sm font-semibold text-brand-cyan">{{ tier.tag }}</span>
                   <h3 class="text-2xl font-bold text-[#033958] tracking-tight">{{ tier.title }}</h3>
                </div>
                
                <div class="text-4xl font-black text-[#033958] tracking-tighter flex items-baseline">
                   <span class="text-sm font-bold mr-1">₦</span>{{ tier.price }}<span class="text-sm font-medium text-slate-400 ml-2 opacity-50"> / Year</span>
                </div>
                
                <div class="h-[1px] bg-slate-200/60 w-full"></div>
                
                <ul class="space-y-4 flex-1">
                   <li v-for="feat in tier.features" :key="feat" class="text-slate-500 text-sm font-medium flex items-center gap-3">
                      <Icon name="lucide:check" :size="14" class="text-brand-cyan shrink-0" />
                      <span class="tracking-wide">{{ feat }}</span>
                   </li>
                </ul>
                
                <NuxtLink :to="'/signup?tier='+tier.title.toLowerCase()" class="block w-full text-center py-5 rounded-2xl text-base font-semibold transition-all" :class="i === 1 ? 'bg-[#033958] text-white hover:bg-brand-cyan hover:text-white' : 'bg-slate-100 text-slate-600 hover:bg-[#033958] hover:text-white'">
                  Choose Plan
                </NuxtLink>
             </div>
          </div>
       </div>
    </section>

    <!-- Global Network -->
    <section id="community" class="py-32 bg-[#033958] text-white relative overflow-hidden">
       <div class="container mx-auto px-6 relative z-10 text-center space-y-12">
          <div class="max-w-3xl mx-auto space-y-6">
             <h2 class="text-5xl md:text-7xl font-black tracking-tighter leading-none">Leading the <span class="text-brand-cyan">Future</span>.</h2>
             <p class="text-lg text-white/60 font-medium max-w-xl mx-auto leading-relaxed">
               Join a specialized community of pathology scientists advancing laboratory diagnostics.
             </p>
          </div>
          
          <div class="flex flex-wrap justify-center gap-16">
             <div v-for="stat in stats" :key="stat.label" class="space-y-1 text-center">
                <p class="text-5xl font-black text-brand-cyan tracking-tighter">{{ stat.value }}</p>
                <p class="text-sm font-semibold text-white/60">{{ stat.label }}</p>
             </div>
          </div>

          <div class="pt-8">
             <NuxtLink to="/signup" class="btn-cyan !px-16 !py-3 !normal-case !text-lg !font-semibold">
                Join Now
             </NuxtLink>
          </div>
       </div>
    </section>

    <!-- Minimalist Footer -->
    <footer class="py-20 bg-white text-slate-800 border-t border-slate-100">
       <div class="container mx-auto px-6">
          <div class="flex flex-col md:flex-row items-start justify-between gap-16">
            <div class="space-y-6 max-w-xs">
              <div class="h-16 w-16 rounded-xl flex items-center justify-center font-black text-xl">
                <img src="~/assets/img/logo.jpeg" />
              </div>
              <p class="text-sm font-medium text-slate-500 leading-relaxed opacity-80">Society for Cellular Pathology Scientists of Nigeria. Advancing pathological science through innovation and integrity.</p>
            </div>
            
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-16 md:gap-24">
              <div v-for="col in footerLinks" :key="col.title" class="space-y-6">
                <h5 class="text-sm font-semibold text-brand-cyan">{{ col.title }}</h5>
                <ul class="space-y-3">
                  <li v-for="link in col.links" :key="link" class="text-sm font-medium text-slate-500 hover:text-[#033958] transition-colors cursor-pointer">{{ link }}</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div class="mt-20 pt-10 border-t border-slate-50 flex flex-col md:flex-row items-center justify-between gap-6">
             <p class="text-xs font-medium text-slate-400">© 2026 Society for Cellular Pathology Scientists of Nigeria &bull; All Rights Reserved.</p>
             <div class="flex gap-8">
                <NuxtLink to="/signup" class="text-xs font-medium text-slate-400 hover:text-[#033958]">Sign Up</NuxtLink>
                <NuxtLink to="/login" class="text-xs font-medium text-slate-400 hover:text-[#033958]">Login</NuxtLink>
                <a href="#" class="text-xs font-medium text-slate-400 hover:text-[#033958]">Privacy</a>
             </div>
          </div>
       </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const currentSlide = ref(0)
let slideInterval = null

const slides = [
  {
    image: '/images/hero/1.png',
    tagline: 'Excellence in Pathology 2026',
    titlePart1: 'Advancing',
    titlePart2: 'Diagnostics',
    description: 'The professional network for pathology scientists in Nigeria. We verify credentials and promote high standards.'
  },
  {
    image: '/images/hero/2.png',
    tagline: 'Working Together',
    titlePart1: 'Fostering',
    titlePart2: 'Collaboration',
    description: 'Connect with pathology professionals worldwide. Share knowledge and collaborate on research.'
  },
  {
    image: '/images/hero/3.png',
    tagline: 'Accurate Results',
    titlePart1: 'Mastering',
    titlePart2: 'The Cell',
    description: 'Using advanced research and standard procedures to improve pathology services in Nigeria.'
  }
]

const stats = [
  { value: '1,200+', label: 'Active Members' },
  { value: '₦2.4B+', label: 'Research Funding' },
  { value: 'Top 5%', label: 'Global Rank' }
]

const values = [
  { title: 'Standardization', desc: 'Implementing national protocols for diagnostic precision and laboratory excellence.', icon: 'lucide:microscope' },
  { title: 'Collaboration', desc: 'Fostering partnerships with global scientific bodies and research institutions.', icon: 'lucide:globe' },
  { title: 'Innovation', desc: 'Pioneering Al-driven diagnostics and cutting-edge molecular pathology research.', icon: 'lucide:dna' },
  { title: 'Integrity', desc: 'Upholding the highest ethical standards in laboratory medicine and scientific reporting.', icon: 'lucide:shield-check' },
]

const benefits = [
  { title: 'Scientific Repository', desc: 'Access to peer-reviewed journals, monographs, and research databases.' },
  { title: 'Global Recognition', desc: 'SCPSN credentials recognized by international laboratory bodies.' },
  { title: 'Grant Eligibility', desc: 'Priority access to research grants and institutional funding.' },
  { title: 'Event Access', desc: 'Guaranteed access to the International Scientific Congress.' }
]

const tiers = [
  { tag: 'Academic Entry', title: 'Student Member', price: '15,000', features: ['Repository Access', 'Forum Entry', 'Congress Discounts'] },
  { tag: 'Core Practitioner', title: 'Full Member', price: '35,000', features: ['Board Certification', 'Voting Privileges', 'Grant Eligibility', 'Directory Listing'] },
  { tag: 'Strategic Leadership', title: 'Fellow', price: '75,000', features: ['Advisory Role', 'Peer Review Board', 'Fellowship Title', 'VIP Event Access'] }
]

const footerLinks = [
  { title: 'Ecosystem', links: ['Vision', 'Protocols', 'Research Hub', 'Ethics Board'] },
  { title: 'Resources', links: ['Archive', 'Peer Journals', 'Clinical Guidelines'] },
  { title: 'Strategic', links: ['Directory', 'Affiliated Colleges', 'Global Hub'] }
]

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.length
}

onMounted(() => {
  slideInterval = setInterval(nextSlide, 8000)
})

onUnmounted(() => {
  if (slideInterval) clearInterval(slideInterval)
})
</script>

<style scoped>
.glass-dark {
  @apply bg-[#033958]/40 backdrop-blur-xl border border-white/10;
}

.animate-in {
  animation: slideIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes slideIn {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

::selection {
  background: #00A8B5;
  color: white;
}
</style>
