<template>
  <transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-show="isOpen" class="fixed inset-0 bg-slate-900/30 backdrop-blur-sm z-[100]" @click="$emit('close')">
      <transition
        enter-active-class="transition duration-400 ease-out transform"
        enter-from-class="translate-x-full"
        enter-to-class="translate-x-0"
        leave-active-class="transition duration-300 ease-in transform"
        leave-from-class="translate-x-0"
        leave-to-class="translate-x-full"
      >
        <div 
          v-show="isOpen" 
          class="absolute inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl border-l border-slate-200 flex flex-col pointer-events-auto"
          @click.stop
        >
          <!-- Header -->
          <div class="px-8 py-6 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/50">
            <div>
              <h2 class="text-xl font-bold text-slate-800 tracking-tight">{{ title }}</h2>
              <p v-if="subtitle" class="text-xs font-semibold text-slate-500 mt-1">{{ subtitle }}</p>
            </div>
            <button @click="$emit('close')" class="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-all">
              <Icon name="lucide:x" size="20" />
            </button>
          </div>
          
          <!-- Content Body -->
          <div class="flex-1 overflow-y-auto w-full custom-scrollbar">
            <slot />
          </div>
          
          <!-- Footer Actions -->
          <div v-if="$slots.footer" class="p-6 border-t border-slate-100 bg-slate-50/50 shrink-0">
            <slot name="footer" />
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  isOpen: Boolean,
  title: String,
  subtitle: String
})

defineEmits(['close'])
</script>
