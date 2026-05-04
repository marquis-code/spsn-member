<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { useCMS } from '@/composables/useCMS'
import { onMounted } from 'vue'

const { loadCMS } = useCMS()

onMounted(() => {
  loadCMS()
})
</script>
