<template>
  <div class="min-h-screen bg-slate-50 flex font-sans selection:bg-brand-cyan/20 overflow-hidden">
    <!-- Left: Artistic Scientific Narrative -->
    <div class="hidden lg:flex lg:w-1/2 relative bg-brand-dark items-center justify-center p-20 overflow-hidden">
      <div class="absolute inset-0 opacity-40">
        <img :src="cmsConfig?.member?.portal?.loginBg || '/images/hero/1.png'" class="w-full h-full object-cover animate-pulse duration-[10000ms]" />
      </div>
      <div class="absolute inset-0 bg-gradient-to-tr from-[#033958] via-transparent to-transparent"></div>
      
      <div class="relative z-10 space-y-12 animate-in fade-in slide-in-from-bottom-12">
        <div class="h-20 w-20 bg-white rounded-3xl flex items-center justify-center text-[#033958] font-black text-3xl">
          {{ cmsConfig?.global?.siteName ? cmsConfig.global.siteName.split(' ').map(n => n[0]).join('').substring(0, 2) : 'SC' }}
        </div>
        <div class="space-y-6">
          <h1 class="text-6xl font-black text-white tracking-tighter leading-none">
            Welcome <br/> <span class="text-brand-cyan">Back</span>.
          </h1>
          <p class="text-xl text-white/50 font-medium max-w-md leading-relaxed">
            Sign in to access your {{ cmsConfig?.global?.siteName || 'SCPSN' }} account.
          </p>
        </div>
        <div class="flex items-center gap-6">
          <div class="flex -space-x-3">
             <div v-for="i in 4" :key="i" class="w-10 h-10 rounded-full border-2 border-brand-dark bg-slate-200"></div>
          </div>
          <p class="text-sm font-semibold text-white/60">500+ members joined</p>
        </div>
      </div>
    </div>

    <!-- Right: Authentication Portal -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-24 bg-white relative">
      <div class="w-full max-w-md space-y-12 relative z-10">
        <header class="space-y-4">
          <div class="inline-flex items-center gap-3 px-5 py-2 bg-slate-50 border border-slate-100 rounded-full">
            <div class="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></div>
            <span class="text-xs font-semibold text-slate-500">Secure Connection</span>
          </div>
          <h2 class="text-4xl font-black text-[#033958] tracking-tighter leading-none">Sign In.</h2>
          <p class="text-sm text-slate-500 font-medium leading-relaxed">Enter your details below to continue.</p>
        </header>

        <form @submit.prevent="handleLogin" class="space-y-8">
           <div class="space-y-6">
              <div class="space-y-3">
                 <AnimatedInput 
                    v-model="form.email" 
                    type="email" 
                    label="Email Address"
                    placeholder="john@example.com" 
                 >
                    <template #right>
                      <Icon name="lucide:mail" class="text-slate-300 group-focus-within:text-brand-cyan transition-colors" :size="20" />
                    </template>
                 </AnimatedInput>
              </div>

              <div class="space-y-3">
                 <div class="flex justify-between items-center mb-1">
                     <NuxtLink to="/forgot-password" class="text-xs font-semibold text-brand-cyan hover:underline ml-auto">Forgot Password?</NuxtLink>
                 </div>
                 <AnimatedInput 
                    v-model="form.password" 
                    type="password" 
                    label="Password"
                    placeholder="••••••••••••" 
                 />
              </div>
           </div>

           <button 
             type="submit" 
             :disabled="loading"
             class="w-full bg-[#033958] text-white py-3 rounded-[32px] font-bold text-base flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100"
           >
             <span v-if="loading" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
             <span v-else>Sign In</span>
             <Icon v-if="!loading" name="lucide:arrow-right" :size="18" />
           </button>
        </form>

        <div class="text-center">
           <p class="text-sm font-medium text-slate-500 leading-relaxed">
              Don't have an account? 
              <NuxtLink to="/signup" class="text-brand-cyan font-bold hover:underline ml-2">Create an account</NuxtLink>
           </p>
        </div>
      </div>
      
      <!-- Subtle Bottom Attribution -->
      <footer class="absolute bottom-12 left-1/2 -translate-x-1/2 w-full text-center px-6">
         <p class="text-xs font-semibold text-slate-400">© {{ new Date().getFullYear() }} {{ cmsConfig?.global?.siteName || 'Society for Cellular Pathology Scientists of Nigeria' }}</p>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
// Lucide icons are auto-imported by lucide-nuxt module
import { useLogin } from '@/composables/modules/auth/useLogin'
import { useRouter } from 'vue-router'
import { useCMS } from '@/composables/useCMS'

const { cmsConfig } = useCMS()
const { loading, login } = useLogin()
const router = useRouter()
const showPassword = ref(false)

const form = reactive({
  email: '',
  password: ''
})

const handleLogin = async () => {
  const data = await login(form)
  if (data) {
    router.push('/dashboard')
  }
}

definePageMeta({
  layout: 'auth'
})
</script>

<style scoped>
.animate-in {
  animation: slideIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes slideIn {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}

::selection {
  background: #00b8d4;
  color: #033958;
}
</style>
