<template>
  <div class="min-h-screen bg-slate-50 font-body flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-md">
      <!-- Top bar -->
      <div class="flex justify-center mb-8">
        <div @click="router.push('/')" class="cursor-pointer hover:opacity-75 transition-opacity flex items-center gap-2.5">
          <div class="w-10 h-10 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
            <img src="@/assets/img/logo.jpeg" alt="SCPSN" class="w-full h-full object-cover" />
          </div>
          <span class="text-[16px] font-bold text-slate-700">SCPSN</span>
        </div>
      </div>

      <!-- Main card -->
      <div class="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div class="p-8">
          
          <form @submit.prevent="handleSubmit">
            <!-- ── Step 1: OTP ── -->
            <div v-if="step === 1" class="text-center">
              <div class="w-16 h-16 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <LucideMail :size="26" class="text-[#1d4e89]" />
              </div>
              <p class="text-[11px] font-semibold text-blue-600 tracking-widest uppercase mb-2">Email Verification</p>
              <h3 class="text-[22px] font-bold text-slate-800 mb-2">Check your inbox</h3>
              <p class="text-[14px] text-slate-500 mx-auto leading-relaxed mb-8">
                A 6-digit verification code has been sent to<br/>
                <span class="font-semibold text-slate-700">{{ email }}</span>
              </p>

              <!-- Standard OTP Input -->
              <div class="flex items-center gap-2 justify-center mb-8" @paste="handlePaste">
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
                class="w-full inline-flex justify-center items-center gap-2 bg-[#1d4e89] hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed text-white text-[14px] font-semibold px-6 py-3.5 rounded-xl transition-colors duration-200"
              >
                <div v-if="loading" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span v-if="loading">Verifying...</span>
                <span v-else>Verify Account</span>
              </button>

              <div class="mt-6">
                <p v-if="resendTimer > 0" class="text-[13px] text-slate-400 font-medium">
                  Resend code in {{ resendTimer }}s
                </p>
                <button
                  v-else
                  type="button"
                  @click="handleResendOTP"
                  :disabled="loading"
                  class="text-[13px] font-semibold text-[#1d4e89] hover:underline transition-all"
                >
                  Resend Verification Code
                </button>
              </div>
            </div>

            <!-- ── Step 2: Success (Celebration) ── -->
            <div v-if="step === 2" class="py-6 text-center flex flex-col items-center">
              <div class="relative w-24 h-24 mx-auto mb-10 animate-bounce-short">
                <div class="absolute inset-0 bg-emerald-100 rounded-full animate-ping opacity-75 duration-1000"></div>
                <div class="relative w-full h-full bg-gradient-to-tr from-emerald-500 to-emerald-400 rounded-full flex items-center justify-center shadow-xl shadow-emerald-500/30 transform transition-transform hover:scale-105">
                  <LucideCheck :size="48" class="text-white" />
                </div>
                <!-- Confetti particles -->
                <div class="absolute -top-4 -left-4 w-3 h-3 bg-yellow-400 rounded-full animate-ping" style="animation-delay: 0.1s;"></div>
                <div class="absolute -bottom-2 -right-4 w-4 h-4 bg-blue-400 rounded-full animate-ping" style="animation-delay: 0.3s;"></div>
                <div class="absolute top-1/2 -right-6 w-2 h-2 bg-pink-400 rounded-full animate-ping" style="animation-delay: 0.2s;"></div>
                <div class="absolute -bottom-6 left-1/2 w-3 h-3 bg-purple-400 rounded-full animate-ping" style="animation-delay: 0.4s;"></div>
              </div>

              <div class="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 text-[12px] font-bold px-5 py-2 rounded-full border border-emerald-200 mb-6 shadow-sm animate-fade-in-up">
                🎉 Registration Complete!
              </div>

              <h3 class="text-[32px] font-extrabold text-slate-800 mb-4 leading-snug animate-fade-in-up" style="animation-delay: 0.1s;">Welcome to SCPSN</h3>
              <p class="text-[15px] text-slate-500 max-w-md mx-auto leading-relaxed mb-10 animate-fade-in-up" style="animation-delay: 0.2s;">
                You are officially a member of the Society for Cellular Pathology Scientists of Nigeria.
                Your <span class="font-semibold text-slate-800">Certificate of Joining</span> has been sent to your email.
              </p>

              <NuxtLink
                to="/dashboard"
                class="inline-flex items-center gap-2 bg-gradient-to-r from-[#1d4e89] to-blue-600 hover:from-blue-800 hover:to-blue-700 text-white text-[15px] font-semibold px-10 py-4 rounded-xl shadow-lg shadow-blue-900/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl animate-fade-in-up" style="animation-delay: 0.3s;"
              >
                Go to Dashboard
                <LucideArrowRight :size="18" />
              </NuxtLink>
            </div>
          </form>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  LucideArrowRight,
  LucideCheck,
  LucideMail,
} from 'lucide-vue-next'
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRegisterMember } from '@/composables/modules/members/useRegisterMember'
import { useUser } from '@/composables/modules/auth/user'
import { useRouter, useRoute } from 'vue-router'

const step = ref(1)
const { loading, verifyRegistration, resendOTP } = useRegisterMember()
const { setUser } = useUser()
const router = useRouter()
const route = useRoute()

const email = computed(() => route.query.email || '')

const digits = ref(['', '', '', '', '', ''])
const inputs = ref([])

const otpCode = computed(() => digits.value.join(''))

const resendTimer = ref(60)
let timerInterval = null

const startTimer = () => {
  resendTimer.value = 60
  if (timerInterval) clearInterval(timerInterval)
  timerInterval = setInterval(() => {
    if (resendTimer.value > 0) resendTimer.value--
    else clearInterval(timerInterval)
  }, 1000)
}

onMounted(() => {
  if (!email.value) {
    router.push('/signup')
    return
  }
  startTimer()
})

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval)
})

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

const handleResendOTP = async () => {
  const res = await resendOTP(email.value)
  if (res) startTimer()
}

const handleSubmit = async () => {
  if (step.value === 1) {
    const data = await verifyRegistration({ email: email.value, otp: otpCode.value.trim() })
    if (data) {
      if (data.token && data.user) {
        setUser(data.user, data.token)
      }
      step.value = 2
    }
  }
}

definePageMeta({ layout: 'auth' })
</script>

<style scoped>
.font-body {
  font-family: 'DM Sans', 'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif;
}

@keyframes bounce-short {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15%); }
}
.animate-bounce-short {
  animation: bounce-short 1s ease-in-out 3;
}

@keyframes fade-in-up {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out forwards;
  opacity: 0;
}
</style>
