<template>
  <div class="min-h-screen bg-white font-sans text-slate-900 selection:bg-brand-cyan/20 selection:text-brand-dark overflow-x-hidden">
    <!-- Ultra-Compact Navigation -->
    <header class="fixed top-0 left-0 right-0 z-[100] transition-all duration-500 py-4" :class="isScrolled ? 'glass py-3 shadow-xl shadow-brand-dark/5' : 'bg-transparent'">
      <div class="container mx-auto px-6 flex justify-between items-center">
        <div class="flex items-center gap-4 group cursor-pointer" @click="router.push('/')">
          <div class="h-10 w-10 bg-[#003366] rounded-xl flex items-center justify-center text-brand-cyan font-black border border-white/10 shadow-lg group-hover:scale-110 transition-transform duration-500">
             SC
          </div>
          <div class="hidden md:block">
             <span class="font-black text-[#003366] uppercase tracking-[0.3em] text-[10px]">Scientific Portal</span>
             <p class="text-[8px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Society for Cellular Pathology</p>
          </div>
        </div>

        <nav class="hidden lg:flex items-center gap-8">
          <a v-for="link in ['Vision', 'Benefits', 'Pathways', 'Network']" :key="link" :href="'#'+link.toLowerCase()" class="text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-[#003366] transition-colors relative group">
            {{ link }}
            <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-cyan transition-all duration-300 group-hover:w-full"></span>
          </a>
        </nav>

        <div class="flex items-center gap-4">
          <NuxtLink to="/login" class="text-[9px] font-black uppercase tracking-widest text-[#003366] hover:text-brand-cyan transition-colors">
            Portal Login
          </NuxtLink>
          <NuxtLink to="/signup" class="bg-[#003366] text-white px-6 py-2.5 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-lg shadow-[#003366]/20 hover:bg-[#004080] transition-all">
            Join Network
          </NuxtLink>
        </div>
      </div>
    </header>

    <!-- Deep Hero Section -->
    <section class="min-h-screen flex items-center relative overflow-hidden bg-[#003366]">
      <img src="https://images.unsplash.com/photo-1532187875605-1ef6c20090d8?q=80&w=2070&auto=format&fit=crop" class="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay grayscale" />
      <div class="absolute inset-0 bg-gradient-to-br from-[#003366] via-[#003366]/90 to-transparent"></div>
      
      <div class="container mx-auto px-6 relative z-10 pt-20">
        <div class="max-w-4xl space-y-8 animate-fade-in">
          <div class="inline-flex items-center gap-3 px-4 py-1.5 glass-dark rounded-full border border-white/10">
            <span class="w-1.5 h-1.5 bg-brand-cyan rounded-full animate-pulse shadow-[0_0_10px_rgba(0,184,212,0.8)]"></span>
            <span class="text-[9px] font-black text-white/70 uppercase tracking-widest">Enrollment Cycle 2026 Active</span>
          </div>
          
          <h1 class="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] uppercase">
            Advancing <br/> <span class="text-brand-cyan">Diagnostic</span> <br/> Mastery.
          </h1>
          
          <p class="text-lg md:text-xl text-white/60 font-medium max-w-2xl leading-relaxed">
            The elite registry for practitioners of Cellular Pathology Scientists in Nigeria. Validating credentials, fostering research, and leading laboratory excellence.
          </p>

          <div class="flex flex-wrap items-center gap-6 pt-4">
            <NuxtLink to="/signup" class="bg-brand-cyan text-[#003366] px-10 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-brand-cyan/20 hover:scale-105 transition-all">
              Begin Enrollment Process
            </NuxtLink>
            <a href="#benefits" class="flex items-center gap-3 text-[10px] font-black text-white hover:text-brand-cyan transition-colors uppercase tracking-widest">
              Review Membership Tiers
              <LucideArrowRight :size="16" />
            </a>
          </div>

          <div class="pt-12 grid grid-cols-3 gap-12 max-w-2xl">
            <div v-for="stat in stats" :key="stat.label" class="space-y-1 border-l border-white/10 pl-6">
              <p class="text-3xl font-black text-white tracking-tighter">{{ stat.value }}</p>
              <p class="text-[9px] font-bold text-white/40 uppercase tracking-widest">{{ stat.label }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Compact Scientific Values -->
    <section id="vision" class="py-24 bg-white relative border-b border-slate-100">
       <div class="container mx-auto px-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
             <div v-for="(v, i) in values" :key="i" class="space-y-4 group">
                <div class="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-[#003366] border border-slate-100 group-hover:bg-[#003366] group-hover:text-white transition-all duration-500">
                   <component :is="v.icon" :size="20" />
                </div>
                <h3 class="text-sm font-black text-[#003366] uppercase tracking-wider">{{ v.title }}</h3>
                <p class="text-slate-400 text-[11px] font-medium leading-relaxed max-w-[220px]">{{ v.desc }}</p>
             </div>
          </div>
       </div>
    </section>

    <!-- Compact Benefits -->
    <section id="benefits" class="py-24 relative overflow-hidden">
       <div class="container mx-auto px-6">
          <div class="flex flex-col lg:flex-row gap-20 items-center">
             <div class="lg:w-1/2 space-y-10">
                <div class="space-y-4">
                   <span class="text-[9px] font-black text-brand-cyan uppercase tracking-widest">Why SCPSN Membership?</span>
                   <h2 class="text-4xl font-black text-[#003366] tracking-tighter leading-tight uppercase">Scientific <br/> Empowerment.</h2>
                   <p class="text-slate-400 font-medium text-xs leading-relaxed max-w-md">Access international monographs, peer-reviewed journals, and a global network of pathological excellence.</p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div v-for="b in benefits" :key="b.title" class="space-y-2 border-t border-slate-50 pt-4">
                      <h4 class="font-black text-[#003366] uppercase tracking-tight text-[10px]">{{ b.title }}</h4>
                      <p class="text-[10px] text-slate-400 font-medium leading-normal">{{ b.desc }}</p>
                   </div>
                </div>
             </div>

             <div class="lg:w-1/2">
                <div class="rounded-3xl overflow-hidden aspect-video relative group border border-slate-200 shadow-2xl">
                   <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop" class="w-full h-full object-cover" />
                   <div class="absolute inset-0 bg-[#003366]/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <NuxtLink to="/signup" class="bg-white text-[#003366] px-8 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-xl">Secure Your Seat</NuxtLink>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </section>

    <!-- Pathway Selection: Compact Cards -->
    <section id="pathways" class="py-24 bg-slate-50 relative">
       <div class="container mx-auto px-6">
          <div class="text-center space-y-4 mb-20 animate-fade-in">
             <h2 class="text-4xl font-black text-[#003366] tracking-tighter uppercase">Professional Pathways.</h2>
             <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">Select your tier to begin the automated verification process.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div v-for="(tier, i) in tiers" :key="i" class="bg-white p-10 rounded-2xl border border-slate-100 space-y-8 group hover:border-brand-cyan transition-all duration-500 hover:shadow-2xl">
                <div class="space-y-4">
                   <span class="text-[8px] font-black text-brand-cyan uppercase tracking-[0.4em]">{{ tier.tag }}</span>
                   <h3 class="text-xl font-black text-[#003366] tracking-tight uppercase leading-none">{{ tier.title }}</h3>
                </div>
                <div class="text-4xl font-black text-[#003366] tracking-tighter flex items-baseline">
                   <span class="text-sm font-bold mr-1">₦</span>{{ tier.price }}<span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-2"> / Year</span>
                </div>
                <ul class="space-y-3 border-t border-slate-50 pt-6">
                   <li v-for="feat in tier.features" :key="feat" class="text-slate-400 text-[10px] font-medium flex items-center gap-3">
                      <LucideCheck :size="12" class="text-brand-cyan" /> {{ feat }}
                   </li>
                </ul>
                <NuxtLink :to="'/signup?tier='+tier.title.toLowerCase()" class="block w-full text-center bg-[#003366] text-white py-4 rounded-xl text-[9px] font-extrabold uppercase tracking-widest group-hover:bg-brand-cyan group-hover:text-[#003366] transition-all">SELECT PATHWAY</NuxtLink>
             </div>
          </div>
       </div>
    </section>

    <!-- Final Compact Footer -->
    <footer class="py-16 bg-[#003366] text-white">
       <div class="container mx-auto px-6">
          <div class="flex flex-col md:flex-row items-center justify-between gap-12">
            <div class="space-y-4 text-center md:text-left">
              <div class="h-10 w-10 bg-white rounded-xl flex items-center justify-center text-[#003366] font-black shadow-lg mx-auto md:mx-0">SC</div>
              <p class="text-[10px] font-medium text-white/50 max-w-xs leading-relaxed uppercase tracking-wider">Advancing the science of cellular pathology through elite collaboration and rigorous standardization.</p>
            </div>
            
            <div class="grid grid-cols-2 md:grid-cols-3 gap-16">
              <div v-for="col in footerLinks" :key="col.title" class="space-y-4">
                <h5 class="text-[10px] font-black text-brand-cyan uppercase tracking-widest">{{ col.title }}</h5>
                <ul class="space-y-2">
                  <li v-for="link in col.links" :key="link" class="text-[10px] font-medium text-white/40 hover:text-white transition-colors cursor-pointer uppercase tracking-wider">{{ link }}</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div class="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
             <p class="text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">© 2026 SCPSN Scientific Network. SECURE PORTAL ACCESS.</p>
             <div class="flex gap-8">
                <NuxtLink to="/signup" class="text-[9px] font-black text-white/40 uppercase tracking-widest hover:text-brand-cyan transition-colors">Apply Now</NuxtLink>
                <NuxtLink to="/login" class="text-[9px] font-black text-white/40 uppercase tracking-widest hover:text-brand-cyan transition-colors">Member Sign-In</NuxtLink>
                <a href="#" class="text-[9px] font-black text-white/40 uppercase tracking-widest hover:text-brand-cyan transition-colors">Privacy Shield</a>
             </div>
          </div>
       </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { 
  LucideArrowRight, 
  LucideCheck, 
  LucideMicroscope, 
  LucideGlobe, 
  LucideDna, 
  LucideShieldCheck
} from 'lucide-vue-next'

const router = useRouter()
const isScrolled = ref(false)

const stats = [
  { value: '1.2k+', label: 'Active Fellows' },
  { value: '24/7', label: 'Lab Support' },
  { value: '₦2B+', label: 'Research Grants' }
]

const values = [
  { title: 'Standardization', desc: 'Implementing national protocols for diagnostic precision.', icon: LucideMicroscope },
  { title: 'Collaboration', desc: 'Fostering partnerships with global scientific bodies.', icon: LucideGlobe },
  { title: 'Innovation', desc: 'Pioneering Al-driven and molecular pathology.', icon: LucideDna },
  { title: 'Integrity', desc: 'Upholding highest ethical standards in medicine.', icon: LucideShieldCheck },
]

const benefits = [
  { title: 'Scientific Repository', desc: 'Access to peer-reviewed journals and monographs.' },
  { title: 'Global Recognition', desc: 'SCPSN certified credentials recognized internationally.' },
  { title: 'Grant Eligibility', desc: 'Priority access to research grants and funding.' },
  { title: 'Scientific Congress', desc: 'Discounted VIP access to International Scientific Congress.' }
]

const tiers = [
  { tag: 'Academic Entry', title: 'Student Member', price: '15,000', features: ['Library Access', 'Student Forum', 'Congress Discounts'] },
  { tag: 'Core Practitioner', title: 'Full Member', price: '35,000', features: ['Board Certification', 'Voting Privileges', 'Grant Eligibility', 'Expert Listing'] },
  { tag: 'Strategic Leadership', title: 'Fellow', price: '75,000', features: ['Advisory Role', 'Review Board', 'Fellowship Title', 'VIP Access'] }
]

const footerLinks = [
  { title: 'Ecosystem', links: ['Vision', 'Protocols', 'Research', 'Integrity'] },
  { title: 'Resources', links: ['Archive', 'Journals', 'Monographs', 'Guidelines'] },
  { title: 'Network', links: ['Directory', 'Colleges', 'Global Hub', 'Ethics'] }
]

onMounted(() => {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 20
  })
})
</script>

<style scoped>
.glass {
  @apply bg-white/80 backdrop-blur-md border-b border-white/20;
}

.glass-dark {
  @apply bg-[#003366]/40 backdrop-blur-md border border-white/10;
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

::selection {
  background: #00b8d4;
  color: #003366;
}
</style>
