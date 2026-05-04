<template>
  <Teleport to="body">
    <transition
      enter-active-class="transition duration-500 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-400 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isOpen" class="fixed inset-0 z-[9999] flex justify-end overflow-hidden">
        <!-- Full-Screen High-End Backdrop -->
        <div class="absolute inset-0 bg-[#003366]/40 backdrop-blur-md" @click="$emit('close')"></div>
        
        <transition
          enter-active-class="transition duration-500 ease-out transform"
          enter-from-class="translate-x-full"
          enter-to-class="translate-x-0"
          leave-active-class="transition duration-400 ease-in transform"
          leave-from-class="translate-x-0"
          leave-to-class="translate-x-full"
        >
          <div 
            v-if="isOpen" 
            :class="[
              'relative h-full bg-white shadow-[-20px_0_60px_rgba(0,0,0,0.1)] flex flex-col pointer-events-auto transition-all duration-500 w-full',
              sizeClasses[size] || sizeClasses.xl
            ]"
            @click.stop
          >
            <!-- Premium Header -->
            <div :class="['border-b border-slate-100 flex items-center justify-between shrink-0 bg-white z-10', paddingClasses[size] || paddingClasses.xl]">
              <div class="flex items-center gap-5">
                 <div class="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-[#003366] border border-slate-100">
                    <Icon name="lucide:layers" size="20" />
                 </div>
                 <div>
                   <h2 class="text-lg lg:text-xl font-black text-slate-800 tracking-tight leading-tight lowercase">{{ title }}</h2>
                   <p v-if="subtitle" class="text-[10px] font-black text-slate-400 mt-0.5 lowercase">{{ subtitle }}</p>
                 </div>
              </div>
              
              <button @click="$emit('close')" class="w-10 h-10 bg-slate-50 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all flex items-center justify-center border border-slate-100 group">
                <Icon name="lucide:x" size="20" class="group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>
            
            <!-- Immersive Content Body -->
            <div class="flex-1 overflow-y-auto w-full custom-scrollbar bg-white">
              <div :class="paddingClasses[size] || paddingClasses.xl">
                 <slot />
              </div>
            </div>
            
            <!-- Sticky Premium Footer -->
            <div v-if="$slots.footer" :class="['border-t border-slate-100 bg-white shrink-0 shadow-[0_-10px_30px_rgba(0,0,0,0.02)]', paddingClasses[size] || paddingClasses.xl]">
               <slot name="footer" />
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
import { onUnmounted, watch } from 'vue'

const props = defineProps({
  isOpen: Boolean,
  title: String,
  subtitle: String,
  size: {
    type: String,
    default: 'xl' // sm, md, lg, xl, full
  }
})

const sizeClasses = {
  sm: 'lg:w-[400px]',
  md: 'lg:w-[500px]',
  lg: 'lg:w-[650px]',
  xl: 'lg:w-1/2',
  full: 'lg:w-full'
}

const paddingClasses = {
  sm: 'px-5 py-5',
  md: 'px-6 py-6',
  lg: 'px-8 py-8',
  xl: 'px-10 py-10',
  full: 'px-12 py-12'
}

const emit = defineEmits(['close'])

// Lock body scroll when drawer is open
watch(() => props.isOpen, (newVal) => {
  if (typeof document !== 'undefined') {
    if (newVal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
})

onUnmounted(() => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #f1f5f9;
  border-radius: 10px;
}

::selection {
  background: #00b8d4;
  color: #003366;
}
</style>
