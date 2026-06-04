<template>
  <div class="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
    <transition-group name="toast">
      <div v-for="toast in toasts" :key="toast.id" class="px-5 py-3 bg-brand-dark/95 backdrop-blur-md text-white rounded-xl shadow-2xl font-bold flex items-center gap-3 border border-white/10 text-sm">
        <div class="w-2 h-2 bg-brand-cyan rounded-full animate-pulse"></div>
        {{ toast.message }}
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { useToast } from '@/composables/useToast'
const { toasts } = useToast()
</script>

<style scoped>
.toast-enter-active, .toast-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.toast-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.9);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(20px) scale(0.9);
}
</style>
