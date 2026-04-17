<template>
  <div class="min-h-screen bg-slate-50">
    <slot />
    <AIChatWidget />
    <Toast />
  </div>
</template>

<script setup>
import Toast from '@/components/core/Toast.vue'
import AIChatWidget from '@/components/AIChatWidget.vue'
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');

body {
  font-family: 'Inter', sans-serif;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Outfit', sans-serif;
}
</style>
