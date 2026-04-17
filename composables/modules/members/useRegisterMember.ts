import { ref } from 'vue'
import { members_api } from '@/api_factory/modules/members'
import { useCustomToast } from '@/composables/core/useCustomToast'

export const useRegisterMember = () => {
  const loading = ref(false)
  const { showToast } = useCustomToast()

  const register = async (payload: any) => {
    loading.value = true
    try {
      const res = await members_api.register(payload)
      showToast({
        title: 'Success',
        message: 'Membership application submitted successfully',
        toastType: 'success'
      })
      return res.data
    } catch (error: any) {
      showToast({
        title: 'Error',
        message: error.response?.data?.message || 'Failed to submit application',
        toastType: 'error'
      })
    } finally {
      loading.value = false
    }
  }

  return { loading, register }
}
