<template>
  <Teleport to="body">
    <transition
      enter-active-class="transition duration-400 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-300 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isOpen" class="fixed inset-0 z-[9999] flex justify-end overflow-hidden font-body">

        <!-- Backdrop -->
        <div
          class="absolute inset-0 backdrop-blur-sm"
          style="background: rgba(13,29,53,0.55);"
          @click="$emit('close')"
        />

        <transition
          enter-active-class="transition duration-400 ease-out"
          enter-from-class="translate-x-full"
          enter-to-class="translate-x-0"
          leave-active-class="transition duration-300 ease-in"
          leave-from-class="translate-x-0"
          leave-to-class="translate-x-full"
        >
          <div
            v-if="isOpen"
            :class="[
              'relative h-full flex flex-col pointer-events-auto w-full bg-white',
              sizeClasses[size] || sizeClasses.xl
            ]"
            style="box-shadow: -24px 0 60px rgba(13,29,53,0.14), -4px 0 12px rgba(13,29,53,0.06);"
            @click.stop
          >

            <!-- ── Gold top accent ── -->
            <div
              class="absolute top-0 left-0 right-0 h-[3px] z-20 pointer-events-none"
              style="background: linear-gradient(90deg, transparent, #c9993f 30%, #e8c97a 60%, transparent);"
            />

            <!-- ══════════════════════════════════════════
                 HEADER
            ══════════════════════════════════════════ -->
            <div
              :class="['relative z-10 border-b border-slate-100 flex items-center justify-between shrink-0', headerPaddingClasses[size] || headerPaddingClasses.xl]"
              style="background: linear-gradient(175deg, #0d2d55 0%, #1d4e89 60%, #163d6e 100%);"
            >
              <!-- Subtle grid texture -->
              <div
                class="absolute inset-0 pointer-events-none opacity-[0.035]"
                style="background-image: repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 32px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 32px);"
              />

              <!-- Title block -->
              <div class="relative z-10 flex items-center gap-3.5">
                <div class="w-9 h-9 rounded-xl border border-white/15 bg-white/[0.08] flex items-center justify-center text-[#93c5fd] flex-shrink-0">
                  <Icon name="lucide:layers" size="16" />
                </div>
                <div>
                  <h2 class="text-[14px] font-extrabold text-white tracking-tight leading-tight">{{ title }}</h2>
                  <p v-if="subtitle" class="text-[10px] font-semibold text-[#93c5fd] mt-0.5 tracking-[0.12em] uppercase">{{ subtitle }}</p>
                </div>
              </div>

              <!-- Close button -->
              <button
                @click="$emit('close')"
                class="relative z-10 w-9 h-9 rounded-xl border border-white/15 bg-white/[0.08] hover:bg-rose-500 hover:border-rose-400 text-white/60 hover:text-white transition-all duration-200 flex items-center justify-center group flex-shrink-0"
              >
                <Icon name="lucide:x" size="15" class="group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            <!-- ══════════════════════════════════════════
                 BODY
            ══════════════════════════════════════════ -->
            <div class="flex-1 overflow-y-auto w-full drawer-scroll bg-[#f8fafc]">
              <div :class="bodyPaddingClasses[size] || bodyPaddingClasses.xl">
                <slot />
              </div>
            </div>

            <!-- ══════════════════════════════════════════
                 FOOTER (optional slot)
            ══════════════════════════════════════════ -->
            <div
              v-if="$slots.footer"
              :class="['border-t border-slate-200 bg-white shrink-0', headerPaddingClasses[size] || headerPaddingClasses.xl]"
              style="box-shadow: 0 -8px 24px rgba(13,29,53,0.04);"
            >
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
  isOpen:   Boolean,
  title:    String,
  subtitle: String,
  size: {
    type: String,
    default: 'xl', // sm | md | lg | xl | full
  },
})

const emit = defineEmits(['close'])

const sizeClasses = {
  sm:   'lg:w-[400px]',
  md:   'lg:w-[520px]',
  lg:   'lg:w-[660px]',
  xl:   'lg:w-1/2',
  full: 'lg:w-full',
}

const headerPaddingClasses = {
  sm:   'px-5 py-4',
  md:   'px-6 py-4',
  lg:   'px-7 py-5',
  xl:   'px-8 py-5',
  full: 'px-10 py-5',
}

const bodyPaddingClasses = {
  sm:   'px-5 py-6',
  md:   'px-6 py-7',
  lg:   'px-7 py-8',
  xl:   'px-8 py-8',
  full: 'px-10 py-10',
}

watch(() => props.isOpen, (val) => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = val ? 'hidden' : ''
  }
})

onUnmounted(() => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
})
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,800;9..40,900&display=swap');

.font-body {
  font-family: 'DM Sans', ui-sans-serif, system-ui, sans-serif;
}

.drawer-scroll::-webkit-scrollbar        { width: 4px; }
.drawer-scroll::-webkit-scrollbar-track  { background: transparent; }
.drawer-scroll::-webkit-scrollbar-thumb  { background: rgba(0,0,0,0.07); border-radius: 10px; }

::selection {
  background: #c9993f;
  color: #0d2d55;
}
</style>