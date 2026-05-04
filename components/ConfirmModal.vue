<template>
  <transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0 scale-95"
    enter-to-class="opacity-100 scale-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95"
  >
    <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm px-4">
      <div 
        class="bg-white w-full max-w-sm rounded-[2rem] p-8 shadow-2xl relative"
        @click.stop
      >
        <div class="w-14 h-14 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon :name="icon || 'lucide:alert-triangle'" size="28" />
        </div>
        
        <div class="text-center mb-8">
          <h3 class="text-xl font-bold text-[#003366] tracking-tight lowercase">{{ title }}</h3>
          <p class="text-sm font-medium text-slate-500 mt-2 lowercase">{{ message }}</p>
        </div>
        
        <div class="flex gap-3">
          <button 
            @click="$emit('cancel')"
            class="flex-1 py-3.5 bg-slate-50 hover:bg-slate-100 text-slate-500 rounded-xl text-xs font-bold transition-all lowercase"
          >
            {{ cancelText || 'cancel' }}
          </button>
          <button 
            @click="$emit('confirm')"
            :class="[
              'flex-1 py-3.5 rounded-xl text-xs font-bold transition-all shadow-lg text-white lowercase',
              confirmStyle === 'danger' ? 'bg-rose-500 hover:bg-rose-600' : 'bg-[#003366] hover:bg-[#002244]'
            ]"
          >
            {{ confirmText || 'confirm' }}
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  isOpen: Boolean,
  title: String,
  message: String,
  confirmText: String,
  cancelText: String,
  confirmStyle: {
    type: String,
    default: 'danger'
  },
  icon: String
})

defineEmits(['confirm', 'cancel'])
</script>
