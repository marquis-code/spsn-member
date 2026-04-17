<template>
  <div class="min-h-screen bg-slate-50 flex items-center justify-center p-6 lg:p-12 relative overflow-hidden font-sans">
    <!-- Sophisticated Background Decor -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
      <div class="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#003366]/5 rounded-full blur-[100px]"></div>
      <div class="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#00707E]/5 rounded-full blur-[100px]"></div>
    </div>

    <main class="w-full max-w-[440px] relative z-10">
      <!-- Branding & Title -->
      <header class="text-center mb-10 space-y-4">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white shadow-sm border border-slate-200">
          <LucideShieldCheck :size="14" class="text-[#003366]" />
          <span class="text-xs font-bold text-slate-500">Practitioner Portal</span>
        </div>
        <h1 class="text-4xl font-bold text-slate-800 tracking-tight">
          SCPSN <span class="text-[#003366]">Member Login</span>
        </h1>
        <p class="text-slate-500 text-sm font-medium leading-relaxed px-4">
          Access your professional dashboard and scientific resources.
        </p>
      </header>
      
      <!-- Professional White Login Card -->
      <section class="bg-white border border-slate-200 p-10 lg:p-12 rounded-3xl shadow-xl shadow-slate-200/40">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Email Field -->
          <AnimatedInput 
            v-model="form.email" 
            type="email" 
            label="Email Address"
            placeholder="practitioner@institution.edu.ng"
          >
            <template #right>
              <LucideMail :size="18" class="text-slate-400 group-focus-within:text-[#003366] transition-colors" />
            </template>
          </AnimatedInput>

          <!-- Password Field -->
          <div class="relative">
            <AnimatedInput 
              v-model="form.password" 
              type="password" 
              label="Password"
              placeholder="••••••••••••"
            />
            <!-- <button type="button" class="absolute right-12 top-[18px] text-[10px] font-bold text-[#003366] uppercase tracking-widest hover:underline z-20 transition-colors">Forgot?</button> -->
          </div>

          <!-- Login Action -->
          <div class="pt-4">
            <button 
              type="submit" 
              :disabled="loading"
              class="w-full flex items-center justify-center gap-4 bg-[#003366] hover:bg-[#004080] text-white py-3.5 rounded-xl text-sm font-bold shadow-md transition-all active:scale-95 disabled:opacity-50"
            >
              <span v-if="loading" class="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
              <span v-else class="flex items-center gap-2">
                Sign In
                <LucideArrowRight :size="16" />
              </span>
            </button>
          </div>
        </form>

        <footer class="mt-10 pt-8 border-t border-slate-100 italic text-center">
          <p class="text-slate-400 text-[11px] font-medium leading-relaxed">
            "Advancing Pathology through Scientific Excellence & Innovation"
          </p>
        </footer>
      </section>

      <!-- Redirect to Signup -->
      <nav class="mt-8 text-center">
        <p class="text-slate-500 text-xs font-medium">
          Not yet a registered member? 
          <NuxtLink to="/signup" class="text-[#003366] font-bold hover:underline">Apply for Membership</NuxtLink>
        </p>
      </nav>
    </main>

    <!-- Bottom Attribution -->
    <footer class="absolute bottom-8 left-0 w-full text-center">
      <p class="text-xs font-bold text-slate-300">&copy; 2024 Society of Clinical Pathologists</p>
    </footer>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { 
  LucideMail, 
  LucideLock, 
  LucideArrowRight,
  LucideShieldCheck
} from 'lucide-vue-next'
import AnimatedInput from '@/components/AnimatedInput.vue'
import { useLogin } from '@/composables/modules/auth/useLogin'
import { useRouter } from 'vue-router'

const { loading, login } = useLogin()
const router = useRouter()

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
</script>

