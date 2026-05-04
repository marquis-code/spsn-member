import { ref } from 'vue'

export const useForgotPassword = () => {
  const loading = ref(false)
  const error = ref(null)

  const forgotPassword = async (email: string) => {
    loading.value = true
    error.value = null
    try {
      const config = useRuntimeConfig()
      const apiBase = config.public.apiBase || 'http://localhost:3000/api'
      
      const response = await $fetch(`${apiBase}/auth/forgot-password`, {
        method: 'POST',
        body: { email }
      })
      
      return response
    } catch (err: any) {
      error.value = err.data?.message || 'Failed to initiate password reset'
      return null
    } finally {
      loading.value = false
    }
  }

  return { loading, error, forgotPassword }
}
