import { ref } from 'vue'
import { auth_api } from '@/api_factory/modules/auth'
import { useUser } from './user'
import { useCustomToast } from '@/composables/core/useCustomToast'

export const useLogin = () => {
  const loading = ref(false)
  const { setUser } = useUser()
  const { showToast } = useCustomToast()

  const login = async (payload: any) => {
    loading.value = true
    try {
      const res = await auth_api.login(payload)
      const { user, token } = res.data
      setUser(user, token)
      showToast({
        title: 'Success',
        message: 'Logged in successfully',
        toastType: 'success'
      })
      return res.data
    } catch (error: any) {
      showToast({
        title: 'Error',
        message: error.response?.data?.message || 'Login failed',
        toastType: 'error'
      })
    } finally {
      loading.value = false
    }
  }

  return { loading, login }
}
