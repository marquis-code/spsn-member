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
      if (!res.data.requires2FA) {
        // Fallback in case 2FA is not required
        const { user, token } = res.data
        if (user && token) setUser(user, token)
      }
      return res.data
    } catch (error: any) {
      showToast({
        title: 'Error',
        message: error.response?.data?.message || 'Login failed',
        toastType: 'error'
      })
      return null
    } finally {
      loading.value = false
    }
  }

  const verify2FA = async (payload: { email: string, otp: string }) => {
    loading.value = true
    try {
      const res = await auth_api.verify2FA(payload)
      const { user, token } = res.data
      if (user && token) {
        setUser(user, token)
        showToast({
          title: 'Success',
          message: 'Logged in successfully',
          toastType: 'success'
        })
      }
      return res.data
    } catch (error: any) {
      showToast({
        title: 'Error',
        message: error.response?.data?.message || 'Invalid or expired OTP',
        toastType: 'error'
      })
      return null
    } finally {
      loading.value = false
    }
  }

  return { loading, login, verify2FA }
}
