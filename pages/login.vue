<template>
  <div class="min-h-screen bg-slate-50 font-body flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-md">

      <!-- Top logo -->
      <div class="flex justify-center mb-6">
        <div @click="router.push('/')" class="cursor-pointer hover:opacity-75 transition-opacity flex items-center gap-2.5">
          <div class="w-10 h-10 rounded-xl overflow-hidden border border-slate-200">
            <img src="@/assets/img/logo.jpeg" alt="SCPSN" class="w-full h-full object-cover" />
          </div>
          <span class="text-[13px] font-bold text-slate-700">SCPSN</span>
        </div>
      </div>

      <!-- Card -->
      <div class="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div class="p-7 lg:p-10">

          <!-- ── Step 1: Login Form ── -->
          <div v-if="step === 1">
            <div class="mb-8">
              <div class="inline-flex items-center gap-2 bg-blue-50 text-[#1d4e89] text-[11px] font-semibold px-4 py-1.5 rounded-full border border-blue-100 mb-5">
                <span class="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                Secure Connection
              </div>
              <h2 class="text-[26px] font-bold text-slate-800 leading-snug mb-1">Welcome back.</h2>
              <p class="text-[14px] text-slate-400 font-medium">Sign in to your SCPSN account to continue.</p>
            </div>

            <form @submit.prevent="handleLogin" class="space-y-5">
              <div class="space-y-1.5">
                <label class="text-[12px] font-semibold text-slate-500">Email Address</label>
                <input
                  v-model="form.email"
                  type="email"
                  placeholder="john@example.com"
                  class="field"
                  required
                />
              </div>

              <div class="space-y-1.5">
                <div class="flex items-center justify-between">
                  <label class="text-[12px] font-semibold text-slate-500">Password</label>
                  <NuxtLink to="/forgot-password" class="text-[12px] font-semibold text-[#1d4e89] hover:underline">
                    Forgot password?
                  </NuxtLink>
                </div>
                <input
                  v-model="form.password"
                  type="password"
                  placeholder="••••••••••••"
                  class="field"
                  required
                />
              </div>

              <div class="pt-2">
                <button
                  type="submit"
                  :disabled="loading"
                  class="w-full inline-flex items-center justify-center gap-2 bg-[#1d4e89] hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed text-white text-[14px] font-semibold px-6 py-3.5 rounded-xl transition-colors duration-200"
                >
                  <div v-if="loading" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span v-if="loading">Signing in...</span>
                  <span v-else class="flex items-center gap-2">
                    Sign In
                    <LucideArrowRight :size="15" />
                  </span>
                </button>
              </div>
            </form>
          </div>

          <!-- ── Step 2: 2FA OTP ── -->
          <div v-else-if="step === 2" class="text-center">
            <div class="mb-8">
              <div class="w-16 h-16 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <LucideShieldCheck :size="26" class="text-[#1d4e89]" />
              </div>
              <h2 class="text-[26px] font-bold text-slate-800 leading-snug mb-1">Security Check</h2>
              <p class="text-[14px] text-slate-400 font-medium max-w-sm mx-auto">
                Please enter the 6-digit verification code sent to<br/>
                <span class="text-slate-700 font-semibold">{{ form.email }}</span>
              </p>
            </div>

            <form @submit.prevent="handleVerify2FA" class="space-y-6">
              <!-- Standard OTP Input -->
              <div class="flex items-center gap-2 justify-center" @paste="handlePaste">
                <input
                  v-for="(digit, index) in digits"
                  :key="index"
                  :ref="el => inputs[index] = el"
                  type="text"
                  inputmode="numeric"
                  maxlength="1"
                  v-model="digits[index]"
                  @input="handleInput($event, index)"
                  @keydown="handleKeydown($event, index)"
                  @focus="$event.target.select()"
                  class="w-11 h-14 text-center text-[22px] font-bold text-[#1d4e89] bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#1d4e89] focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all duration-200"
                />
              </div>

              <button
                type="submit"
                :disabled="loading || otpCode.length < 6"
                class="w-full inline-flex items-center justify-center gap-2 bg-[#1d4e89] hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed text-white text-[14px] font-semibold px-6 py-3.5 rounded-xl transition-colors duration-200"
              >
                <div v-if="loading" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span v-if="loading">Verifying...</span>
                <span v-else class="flex items-center gap-2">
                  Verify &amp; Continue
                  <LucideArrowRight :size="15" />
                </span>
              </button>

              <div class="text-center mt-4">
                <button
                  type="button"
                  @click="step = 1"
                  class="text-[13px] font-semibold text-slate-400 hover:text-slate-600 transition-colors"
                >
                  &larr; Back to login
                </button>
              </div>
            </form>
          </div>

          <!-- Divider + signup (Only on Step 1) -->
          <div v-if="step === 1" class="mt-8 pt-7 border-t border-slate-100 text-center">
            <p class="text-[13px] font-medium text-slate-500">
              Don't have an account?
              <NuxtLink to="/signup" class="text-[#1d4e89] font-semibold hover:underline ml-1">
                Create an account
              </NuxtLink>
            </p>
          </div>

        </div>

        <!-- Card footer -->
        <div class="bg-slate-50 border-t border-slate-100 px-7 lg:px-10 py-4 flex items-center justify-between">
          <p class="text-[11px] font-medium text-slate-400">© {{ new Date().getFullYear() }} Society for Cellular Pathology Scientists of Nigeria</p>
          <div class="flex items-center gap-1.5">
            <div class="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
            <p class="text-[11px] font-semibold text-slate-400">Secure</p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { LucideArrowRight, LucideShieldCheck } from 'lucide-vue-next'
import { ref, reactive, computed, nextTick } from 'vue'
import { useLogin } from '@/composables/modules/auth/useLogin'
import { useRouter } from 'vue-router'

const { loading, login, verify2FA } = useLogin()
const router = useRouter()

const step = ref(1)

const form = reactive({
  email: '',
  password: '',
})

// OTP logic
const digits = ref(['', '', '', '', '', ''])
const inputs = ref([])
const otpCode = computed(() => digits.value.join(''))

const handleInput = (event, index) => {
  const value = event.target.value
  if (value && !/^\d+$/.test(value)) {
    digits.value[index] = ''
    return
  }
  
  if (value && index < 5) {
    nextTick(() => {
      inputs.value[index + 1]?.focus()
    })
  }
}

const handleKeydown = (event, index) => {
  if (event.key === 'Backspace' && !digits.value[index] && index > 0) {
    inputs.value[index - 1]?.focus()
  }
}

const handlePaste = (event) => {
  event.preventDefault()
  const pastedData = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
  if (pastedData) {
    for (let i = 0; i < pastedData.length; i++) {
      digits.value[i] = pastedData[i]
    }
    const nextIndex = Math.min(pastedData.length, 5)
    inputs.value[nextIndex]?.focus()
  }
}

const handleLogin = async () => {
  const data = await login(form)
  if (data?.requires2FA) {
    step.value = 2
    // Reset digits when opening step 2
    digits.value = ['', '', '', '', '', '']
  } else if (data) {
    router.push('/dashboard')
  }
}

const handleVerify2FA = async () => {
  const data = await verify2FA({ email: form.email, otp: otpCode.value.trim() })
  if (data) {
    router.push('/dashboard')
  }
}

definePageMeta({ layout: 'auth' })
</script>

<style scoped>
.font-body {
  font-family: 'DM Sans', 'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif;
}

.field {
  @apply w-full bg-slate-50 border border-slate-200 text-slate-800 placeholder:text-slate-400 text-[14px] px-4 py-3 rounded-xl focus:outline-none focus:border-blue-300 focus:bg-white focus:ring-2 focus:ring-blue-50 transition-all duration-200;
}
</style>