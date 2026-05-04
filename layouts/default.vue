<template>
  <div class="min-h-screen bg-slate-50">
    <slot />
    <LazyAIChatWidget />
    <LazyToast />
  </div>
</template>

<script setup>
// Nuxt auto-imports components
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
