<template>
  <header
    class="fixed top-0 left-0 right-0 z-[100] transition-all duration-500"
    :class="[
      (isScrolled || !isHomePage) ? 'py-4' : 'py-6',
      isMobileMenuOpen ? 'h-screen bg-brand-dark lg:h-auto' : ''
    ]"
  >
    <!-- Navbar Container -->
    <div class="container mx-auto px-4">
      <nav 
        :class="[
          'w-full transition-all duration-700 rounded-3xl flex items-center justify-between px-6 py-3',
          (isScrolled || !isHomePage) ? 'glass-premium border-b border-white/10' : 'bg-transparent border-transparent'
        ]"
      >
        <!-- Logo Section -->
        <NuxtLink to="/" class="flex items-center gap-3 relative z-[110]" @click="isMobileMenuOpen = false">
          <div class="w-11 h-11 rounded-2xl flex items-center justify-center p-0.5 hover:rotate-[360deg] transition-transform duration-1000 bg-white shadow-lg overflow-hidden border border-white/20">
             <img src="@/assets/img/logo.jpeg" class="w-full h-full object-contain" alt="Logo" />
          </div>
          <div class="flex flex-col">
             <span class="text-lg font-black tracking-tighter leading-none" :class="(isScrolled || !isHomePage || isHomePage) ? 'text-white' : 'text-white'">SCPSN</span>
             <span class="text-[10px] font-bold text-brand-cyan tracking-wide">Member Hub</span>
          </div>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden lg:flex items-center gap-2">
          <div v-for="link in navigation" :key="link.label" class="relative">
            <NuxtLink 
              :to="link.to"
              :class="[
                'px-5 py-2.5 text-sm font-bold transition-all duration-300 rounded-2xl relative flex items-center gap-1',
                (isScrolled || !isHomePage) ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-white/80 hover:text-white hover:bg-white/10'
              ]"
              active-class="!text-brand-cyan !bg-white/5"
            >
              {{ link.label }}
            </NuxtLink>
          </div>
        </div>

        <!-- Desktop CTA -->
        <div class="hidden lg:flex items-center gap-4">
          <NuxtLink to="/login" class="px-5 py-2.5 text-sm font-bold transition-colors text-white hover:text-brand-cyan">
            Login
          </NuxtLink>
          <NuxtLink to="/signup" class="bg-brand-cyan text-white px-8 py-3 rounded-2xl text-sm font-bold hover:bg-white hover:text-brand-dark hover:scale-105 active:scale-95 transition-all shadow-lg shadow-brand-cyan/20">
            Sign Up
          </NuxtLink>
        </div>

        <!-- Mobile Menu Controls -->
        <div class="flex items-center gap-3 lg:hidden relative z-[110]">
          <button 
            @click="isMobileMenuOpen = !isMobileMenuOpen" 
            class="w-11 h-11 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all duration-500 border"
            :class="(isScrolled || !isHomePage || isMobileMenuOpen) ? 'bg-white/10 border-white/20' : 'bg-slate-50 border-slate-200'"
          >
            <div :class="['w-5 h-0.5 rounded-full transition-all duration-500', (isScrolled || !isHomePage || isMobileMenuOpen) ? 'bg-white' : 'bg-[#033958]', isMobileMenuOpen ? 'rotate-45 translate-y-[8px]' : '']"></div>
            <div :class="['w-3 h-0.5 rounded-full transition-all duration-300', (isScrolled || !isHomePage || isMobileMenuOpen) ? 'bg-white' : 'bg-[#033958]', isMobileMenuOpen ? 'opacity-0 -translate-x-2' : '']"></div>
            <div :class="['w-5 h-0.5 rounded-full transition-all duration-500', (isScrolled || !isHomePage || isMobileMenuOpen) ? 'bg-white' : 'bg-[#033958]', isMobileMenuOpen ? '-rotate-45 -translate-y-[8px]' : '']"></div>
          </button>
        </div>
      </nav>
    </div>

    <!-- Mobile Fullscreen Menu -->
    <transition
      enter-active-class="transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
      enter-from-class="opacity-0 translate-y-[-100%]"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-500 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-[-100%]"
    >
      <div v-if="isMobileMenuOpen" class="lg:hidden fixed inset-0 bg-[#033958] z-[105] flex flex-col pt-28 pb-10 px-6 overflow-y-auto">
        <div class="flex flex-col gap-1 relative z-10">
          <div v-for="(link, i) in navigation" :key="link.label">
            <NuxtLink 
              :to="link.to"
              @click="isMobileMenuOpen = false"
              class="block py-4 text-2xl font-semibold text-white tracking-tight group"
            >
              <div class="flex items-center gap-4">
                <span class="text-sm font-medium text-brand-cyan/60 font-mono">0{{ i + 1 }}</span>
                <span class="group-hover:translate-x-3 transition-transform duration-500">{{ link.label }}</span>
              </div>
            </NuxtLink>
          </div>
        </div>

        <div class="mt-auto pt-10 relative z-10">
          <div class="grid grid-cols-2 gap-3 mb-10">
            <NuxtLink to="/login" @click="isMobileMenuOpen = false" class="btn-outline-premium !w-full !py-4 !text-base !normal-case !font-semibold !text-white !border-white/20 flex items-center justify-center">
              Login
            </NuxtLink>
            <NuxtLink to="/signup" @click="isMobileMenuOpen = false" class="btn-cyan !w-full !py-4 !text-base !normal-case !font-semibold flex items-center justify-center">
              Sign Up
            </NuxtLink>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
// use Nuxt auto-imports for route/router

const route = useRoute()
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const isHomePage = computed(() => route.path === '/')

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const navigation = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '#about' },
  { label: 'Features', to: '#features' },
  { label: 'Pricing', to: '#pricing' },
  { label: 'Community', to: '#community' },
]

watch(() => route.path, () => {
  isMobileMenuOpen.value = false
})
</script>
