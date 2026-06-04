import { ref } from 'vue'

const toasts = ref([])
let toastId = 0

export const useToast = () => {
  const showToast = (message) => {
    const id = toastId++
    toasts.value.push({ id, message })
    setTimeout(() => {
      toasts.value = toasts.value.filter(t => t.id !== id)
    }, 3000)
  }

  return {
    toasts,
    showToast
  }
}
