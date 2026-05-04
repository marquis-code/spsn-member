<template>
  <div class="min-h-screen bg-slate-50 flex font-sans selection:bg-brand-cyan/20 overflow-hidden">
    <!-- Left: Artistic Scientific Narrative -->
    <div class="hidden lg:flex lg:w-1/2 relative bg-[#033958] items-center justify-center p-20 overflow-hidden">
      <div class="absolute inset-0 opacity-40">
        <img src="/images/hero/2.png" class="w-full h-full object-cover animate-pulse duration-[10000ms]" />
      </div>
      <div class="absolute inset-0 bg-gradient-to-tr from-[#033958] via-transparent to-transparent"></div>
      
      <div class="relative z-10 space-y-12 animate-in fade-in slide-in-from-bottom-12">
        <div @click="router.push('/')" class="h-20 w-20 bg-white rounded-3xl flex items-center justify-center text-[#033958] font-black text-3xl cursor-pointer hover:rotate-12 transition-transform">
          SC
        </div>
        <div class="space-y-6">
          <h1 class="text-6xl font-black text-white tracking-tighter leading-none">
            New <br> <span class="text-brand-cyan">Security</span>.
          </h1>
          <p class="text-xl text-white/50 font-medium max-w-md leading-relaxed">
            Create a strong, unique password to ensure the continued security of your scientific credentials.
          </p>
        </div>
      </div>
    </div>

    <!-- Right: Reset Portal -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-24 bg-white relative">
      <div class="w-full max-w-md space-y-12 relative z-10">
        <header class="space-y-4">
          <div class="inline-flex items-center gap-3 px-5 py-2 bg-slate-50 border border-slate-100 rounded-full">
            <div class="w-1.5 h-1.5 bg-brand-cyan rounded-full animate-ping"></div>
            <span class="text-xs font-semibold text-slate-500">Security Update</span>
          </div>
          <h2 class="text-4xl font-black text-[#033958] tracking-tighter leading-none">Reset Password.</h2>
          <p class="text-sm text-slate-500 font-medium leading-relaxed">Enter your new password below to finalize the update.</p>
        </header>

        <form @submit.prevent="handleReset" class="space-y-8">
           <div class="space-y-6">
              <AnimatedInput 
                 v-model="password" 
                 type="password" 
                 label="New Password"
                 placeholder="••••••••••••" 
              />
              <AnimatedInput 
                 v-model="confirmPassword" 
                 type="password" 
                 label="Confirm New Password"
                 placeholder="••••••••••••" 
              />
           </div>

           <div v-if="error" class="p-4 bg-rose-50 border border-rose-100 rounded-xl text-xs font-bold text-rose-500">
             {{ error }}
           </div>

           <button 
             type="submit" 
             :disabled="loading || !token"
             class="w-full bg-[#033958] text-white py-6 rounded-[32px] font-bold text-base flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
           >
             <span v-if="loading" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
             <span v-else>Update Password</span>
             <Icon v-if="!loading" name="lucide:arrow-right" :size="18" />
           </button>
        </form>

        <div class="text-center">
           <NuxtLink to="/login" class="text-sm font-bold text-slate-400 hover:text-[#033958] transition-colors">
              Return to Sign In
           </NuxtLink>
        </div>
      </div>
      
      <!-- Subtle Bottom Attribution -->
      <footer class="absolute bottom-12 left-1/2 -translate-x-1/2 w-full text-center px-6">
         <p class="text-xs font-semibold text-slate-400">© 2026 Society for Cellular Pathology Scientists of Nigeria</p>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
// Lucide icons are auto-imported by lucide-nuxt module
import { useResetPassword } from '@/composables/modules/auth/useResetPassword';

const router = useRouter();
const route = useRoute();
const { loading, error, resetPassword } = useResetPassword();

const password = ref('');
const confirmPassword = ref('');
const token = ref('');

onMounted(() => {
  token.value = (route.query.token || '');
  if (!token.value) {
    error.value = 'Invalid or missing reset token. Please request a new one.';
  }
});

const handleReset = async () => {
  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match';
    return;
  }
  
  const res = await resetPassword(token.value, password.value);
  if (res) {
    alert('Password updated successfully. Please sign in.');
    router.push('/login');
  }
};

definePageMeta({
  layout: 'auth'
});
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
