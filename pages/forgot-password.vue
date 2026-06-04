<template>
  <div class="min-h-screen flex font-body overflow-hidden">

    <!-- ─── LEFT PANEL ───────────────────────────────────────── -->
    <div class="hidden lg:flex lg:w-1/2 relative bg-[#1d4e89] items-center justify-center p-20 overflow-hidden">

      <!-- Background image -->
      <div class="absolute inset-0 opacity-30">
        <img src="/images/hero/3.png" class="w-full h-full object-cover" />
      </div>

      <!-- Gradient overlay -->
      <div class="absolute inset-0 bg-gradient-to-tr from-[#1d4e89] via-[#1d4e89]/80 to-transparent" />

      <!-- Decorative circles -->
      <div class="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div class="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <!-- Content -->
      <div class="relative z-10 space-y-10">

        <!-- Logo mark -->
        <div
          @click="router.push('/')"
          class="w-14 h-14 bg-white rounded-2xl flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-200 shadow-lg"
        >
          <span class="text-[#1d4e89] font-black text-lg tracking-tight">SC</span>
        </div>

        <div class="space-y-5 max-w-sm">
          <div class="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-blue-200 text-xs font-semibold px-4 py-2 rounded-full">
            <LucideKeyRound :size="12" />
            Security Protocol
          </div>
          <h1 class="text-5xl font-bold text-white leading-[1.05] tracking-tight">
            Reset<br />
            <span class="text-blue-200">Access.</span>
          </h1>
          <p class="text-[15px] text-blue-200/70 leading-relaxed font-medium">
            Locked out? No worries. We'll help you regain access to your professional account.
          </p>
        </div>

        <!-- Trust indicators -->
        <div class="space-y-3 pt-2">
          <div
            v-for="item in trustItems"
            :key="item"
            class="flex items-center gap-3"
          >
            <div class="w-5 h-5 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
              <LucideCheck :size="11" class="text-blue-200" />
            </div>
            <p class="text-[12px] font-medium text-blue-200/60">{{ item }}</p>
          </div>
        </div>

      </div>
    </div>


    <!-- ─── RIGHT PANEL ──────────────────────────────────────── -->
    <div class="w-full lg:w-1/2 flex flex-col items-center justify-center bg-white relative px-6 py-12 lg:px-20">

      <!-- Top nav -->
      <div class="absolute top-8 left-8 right-8 flex items-center justify-between">
        <div
          @click="router.push('/')"
          class="lg:hidden w-10 h-10 bg-[#1d4e89] rounded-xl flex items-center justify-center cursor-pointer"
        >
          <span class="text-white font-black text-sm">SC</span>
        </div>
        <NuxtLink
          to="/login"
          class="ml-auto inline-flex items-center gap-1.5 text-[12px] font-semibold text-slate-400 hover:text-[#1d4e89] transition-colors"
        >
          <LucideArrowLeft :size="13" />
          Back to Sign In
        </NuxtLink>
      </div>

      <!-- Form area -->
      <div class="w-full max-w-md space-y-8">

        <!-- Header -->
        <div class="space-y-3">
          <div class="inline-flex items-center gap-2 bg-blue-50 text-[#1d4e89] text-xs font-semibold px-4 py-2 rounded-full border border-blue-100">
            <LucideKeyRound :size="12" />
            Password Recovery
          </div>
          <h2 class="text-3xl font-bold text-slate-900 tracking-tight leading-tight">
            Forgot Password?
          </h2>
          <p class="text-[14px] text-slate-500 leading-relaxed">
            Enter your registered email address to receive reset instructions.
          </p>
        </div>

        <!-- ── SUCCESS STATE ── -->
        <div
          v-if="success"
          class="bg-white border border-slate-200 rounded-2xl p-7 space-y-4"
        >
          <div class="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
            <LucideCheckCircle :size="22" class="text-emerald-600" />
          </div>
          <div>
            <p class="text-[11px] font-semibold text-emerald-600 tracking-widest uppercase mb-1">Email Sent</p>
            <h3 class="text-[17px] font-bold text-slate-800 mb-2">Check your inbox</h3>
            <p class="text-[13px] text-slate-500 leading-relaxed">
              We've sent password reset instructions to
              <span class="font-bold text-slate-700">{{ email }}</span>.
            </p>
          </div>
          <button
            @click="success = false"
            class="text-[12px] font-bold text-[#1d4e89] hover:underline"
          >
            Try another email
          </button>
        </div>

        <!-- ── FORM ── -->
        <form v-else @submit.prevent="handleForgot" class="space-y-4">

          <!-- Error banner -->
          <div
            v-if="error"
            class="flex items-start gap-3 p-4 bg-rose-50 border border-rose-100 rounded-xl"
          >
            <LucideAlertCircle :size="16" class="text-rose-500 shrink-0 mt-0.5" />
            <p class="text-[13px] font-semibold text-rose-600">{{ error }}</p>
          </div>

          <div class="space-y-1.5">
            <label class="text-[12px] font-semibold text-slate-500">Email Address</label>
            <div class="relative">
              <input
                v-model="email"
                type="email"
                placeholder="john@example.com"
                class="field pr-11"
                required
              />
              <LucideMail
                :size="16"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none"
              />
            </div>
          </div>

          <div class="pt-2">
            <button
              type="submit"
              :disabled="loading"
              class="w-full inline-flex items-center justify-center gap-2 bg-[#1d4e89] hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed text-white text-[14px] font-semibold px-6 py-3.5 rounded-xl transition-colors duration-200"
            >
              <div v-if="loading" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span v-if="loading">Sending…</span>
              <span v-else class="flex items-center gap-2">
                Send Instructions
                <LucideArrowRight :size="15" />
              </span>
            </button>
          </div>

          <!-- Divider hint -->
          <div class="pt-2 text-center">
            <p class="text-[12px] text-slate-400 font-medium">
              Remembered your password?
              <NuxtLink to="/login" class="font-bold text-[#1d4e89] hover:underline ml-1">Sign in</NuxtLink>
            </p>
          </div>

        </form>

      </div>

      <!-- Footer -->
      <footer class="absolute bottom-8 text-center w-full px-6">
        <p class="text-[11px] font-medium text-slate-400">
          © 2026 Society for Cellular Pathology Scientists of Nigeria
        </p>
      </footer>

    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  LucideKeyRound,
  LucideCheck,
  LucideCheckCircle,
  LucideAlertCircle,
  LucideArrowLeft,
  LucideArrowRight,
  LucideMail,
} from 'lucide-vue-next'
import { useForgotPassword } from '@/composables/modules/auth/useForgotPassword'

definePageMeta({ layout: 'auth' })

const router = useRouter()
const { loading, error, forgotPassword } = useForgotPassword()

const email   = ref('')
const success = ref(false)

const trustItems = [
  'Secure reset link delivered instantly',
  'Link expires after 30 minutes for safety',
  'SCPSN registry-grade account protection',
]

const handleForgot = async () => {
  const res = await forgotPassword(email.value)
  if (res) success.value = true
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