<template>
  <div class="min-h-screen flex font-body overflow-hidden">

    <!-- ─── LEFT PANEL ───────────────────────────────────────── -->
    <div class="hidden lg:flex lg:w-1/2 relative bg-[#1d4e89] items-center justify-center p-20 overflow-hidden">

      <!-- Background image -->
      <div class="absolute inset-0 opacity-30">
        <img src="/images/hero/2.png" class="w-full h-full object-cover" />
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
            <LucideShieldCheck :size="12" />
            Security Update
          </div>
          <h1 class="text-5xl font-bold text-white leading-[1.05] tracking-tight">
            New<br />
            <span class="text-blue-200">Security.</span>
          </h1>
          <p class="text-[15px] text-blue-200/70 leading-relaxed font-medium">
            Create a strong, unique password to ensure the continued security of your scientific credentials.
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

      <!-- Form card -->
      <div class="w-full max-w-md space-y-8">

        <!-- Header -->
        <div class="space-y-3">
          <div class="inline-flex items-center gap-2 bg-blue-50 text-[#1d4e89] text-xs font-semibold px-4 py-2 rounded-full border border-blue-100">
            <LucideLock :size="12" />
            Password Reset
          </div>
          <h2 class="text-3xl font-bold text-slate-900 tracking-tight leading-tight">
            Reset Password.
          </h2>
          <p class="text-[14px] text-slate-500 leading-relaxed">
            Enter your new password below to finalize the security update.
          </p>
        </div>

        <!-- Error banner -->
        <div
          v-if="error"
          class="flex items-start gap-3 p-4 bg-rose-50 border border-rose-100 rounded-xl"
        >
          <LucideAlertCircle :size="16" class="text-rose-500 shrink-0 mt-0.5" />
          <p class="text-[13px] font-semibold text-rose-600">{{ error }}</p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleReset" class="space-y-4">

          <div class="space-y-1.5">
            <label class="text-[12px] font-semibold text-slate-500">New Password</label>
            <div class="relative">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••••••"
                class="field pr-11"
                required
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <LucideEye v-if="!showPassword" :size="16" />
                <LucideEyeOff v-else :size="16" />
              </button>
            </div>
          </div>

          <div class="space-y-1.5">
            <label class="text-[12px] font-semibold text-slate-500">Confirm New Password</label>
            <div class="relative">
              <input
                v-model="confirmPassword"
                :type="showConfirm ? 'text' : 'password'"
                placeholder="••••••••••••"
                class="field pr-11"
                required
              />
              <button
                type="button"
                @click="showConfirm = !showConfirm"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <LucideEye v-if="!showConfirm" :size="16" />
                <LucideEyeOff v-else :size="16" />
              </button>
            </div>
          </div>

          <!-- Password strength indicator -->
          <div v-if="password" class="space-y-2 pt-1">
            <div class="flex gap-1.5">
              <div
                v-for="i in 4"
                :key="i"
                class="h-1 flex-1 rounded-full transition-all duration-300"
                :class="passwordStrength >= i ? strengthColor : 'bg-slate-100'"
              />
            </div>
            <p class="text-[11px] font-semibold" :class="strengthTextColor">
              {{ strengthLabel }}
            </p>
          </div>

          <div class="pt-2">
            <button
              type="submit"
              :disabled="loading || !token"
              class="w-full inline-flex items-center justify-center gap-2 bg-[#1d4e89] hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed text-white text-[14px] font-semibold px-6 py-3.5 rounded-xl transition-colors duration-200"
            >
              <div v-if="loading" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span v-if="loading">Updating…</span>
              <span v-else class="flex items-center gap-2">
                Update Password
                <LucideArrowRight :size="15" />
              </span>
            </button>
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
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  LucideShieldCheck,
  LucideCheck,
  LucideLock,
  LucideAlertCircle,
  LucideArrowLeft,
  LucideArrowRight,
  LucideEye,
  LucideEyeOff,
} from 'lucide-vue-next'
import { useResetPassword } from '@/composables/modules/auth/useResetPassword'

definePageMeta({ layout: 'auth' })

const router = useRouter()
const route  = useRoute()
const { loading, error, resetPassword } = useResetPassword()

const password        = ref('')
const confirmPassword = ref('')
const token           = ref('')
const showPassword    = ref(false)
const showConfirm     = ref(false)

const trustItems = [
  'End-to-end encrypted credential storage',
  'SCPSN registry-grade security protocol',
  'Automatic session invalidation on reset',
]

// Password strength
const passwordStrength = computed(() => {
  const p = password.value
  if (!p) return 0
  let score = 0
  if (p.length >= 8)             score++
  if (/[A-Z]/.test(p))           score++
  if (/[0-9]/.test(p))           score++
  if (/[^A-Za-z0-9]/.test(p))   score++
  return score
})

const strengthColor = computed(() => {
  const map = { 1: 'bg-rose-400', 2: 'bg-amber-400', 3: 'bg-blue-400', 4: 'bg-emerald-500' }
  return map[passwordStrength.value] || 'bg-slate-100'
})

const strengthTextColor = computed(() => {
  const map = { 1: 'text-rose-500', 2: 'text-amber-500', 3: 'text-blue-500', 4: 'text-emerald-600' }
  return map[passwordStrength.value] || 'text-slate-400'
})

const strengthLabel = computed(() => {
  const map = { 1: 'Weak', 2: 'Fair', 3: 'Good', 4: 'Strong' }
  return map[passwordStrength.value] || ''
})

onMounted(() => {
  token.value = route.query.token || ''
  if (!token.value) {
    error.value = 'Invalid or missing reset token. Please request a new one.'
  }
})

const handleReset = async () => {
  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match.'
    return
  }
  const res = await resetPassword(token.value, password.value)
  if (res) {
    router.push('/login')
  }
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