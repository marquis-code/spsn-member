<template>
  <div class="min-h-screen bg-slate-50 flex flex-col justify-center items-center font-sans py-12 px-4 sm:px-6 lg:px-8 selection:bg-brand-cyan/20">
    <!-- Centered Card Container -->
    <div class="w-full max-w-md bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
      <div class="p-8 md:p-12">
        
        <!-- Logo Header -->
        <div class="flex justify-center mb-8">
          <div @click="router.push('/')" class="cursor-pointer hover:opacity-80 transition-opacity">
            <img src="@/assets/img/logo.jpeg" alt="logo" class="h-16 w-auto rounded-2xl shadow-sm" />
          </div>
        </div>

        <div class="text-center mb-10">
           <div class="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-50 border border-slate-100 rounded-full mb-6">
             <div class="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></div>
             <span class="text-[10px] uppercase tracking-wider font-bold text-slate-500">Secure Connection</span>
           </div>
           <h2 class="text-3xl font-black text-[#033958] tracking-tight">Sign In.</h2>
           <p class="text-sm font-medium text-slate-500 mt-2">Welcome back to your SCPSN account.</p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleLogin" class="space-y-6">
           
           <AnimatedInput 
              v-model="form.email" 
              type="email" 
              label="Email Address"
              placeholder="john@example.com" 
           />

           <div class="space-y-1">
             <div class="flex justify-end px-1">
                 <NuxtLink to="/forgot-password" class="text-sm font-semibold text-brand-cyan hover:underline">Forgot Password?</NuxtLink>
             </div>
             <AnimatedInput 
                v-model="form.password" 
                type="password" 
                label="Password"
                placeholder="••••••••••••" 
             />
           </div>

           <button 
             type="submit" 
             :disabled="loading"
             class="w-full mt-2 bg-[#033958] text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#022a42] transition-colors disabled:opacity-50"
           >
             <span v-if="loading" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
             <span v-else>Sign In</span>
             <Icon v-if="!loading" name="lucide:arrow-right" :size="16" />
           </button>
        </form>

        <div class="mt-8 text-center border-t border-slate-100 pt-8">
           <p class="text-sm font-medium text-slate-500">
              Don't have an account? 
              <NuxtLink to="/signup" class="text-brand-cyan font-bold hover:underline ml-1">Create an account</NuxtLink>
           </p>
        </div>
      </div>
      
      <!-- Footer Note -->
      <div class="bg-slate-50 p-6 text-center border-t border-slate-100">
        <p class="text-sm font-semibold text-slate-400">
           © {{ new Date().getFullYear() }} SCPSN
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
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

definePageMeta({
  layout: 'auth'
})
</script>

<style scoped>
::selection {
  background: #00b8d4;
  color: #033958;
}
</style>
