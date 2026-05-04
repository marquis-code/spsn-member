import { ref } from 'vue'

export const useResetPassword = () => {
  const loading = ref(false)
  const error = ref(null)

  const resetPassword = async (token: string, password: string) => {
    loading.value = true
    error.value = null
    try {
      const config = useRuntimeConfig()
      const apiBase = config.public.apiBase || 'http://localhost:3000/api'
      
      const response = await $fetch(`${apiBase}/auth/reset-password`, {
        method: 'POST',
        body: { token, password }
      })
      
      return response
    } catch (err: any) {
      error.value = err.data?.message || 'Failed to update password'
      return null
    } finally {
      loading.value = false
    }
  }

  return { loading, error, resetPassword }
}
