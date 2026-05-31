import { ref } from 'vue'
import { payments_api } from '@/api_factory/modules/payments'
import { useCustomToast } from '@/composables/core/useCustomToast'
import { useUser } from '@/composables/modules/auth/user'

export const usePayments = () => {
  const loading = ref(false)
  const fetching = ref(false)
  const payments = ref([])
  const { showToast } = useCustomToast()
  const { user } = useUser()

  const fetchMyPayments = async () => {
    fetching.value = true
    try {
      const res = await payments_api.fetchMemberPayments()
      // Filter by the current member's email
      const myEmail = user.value?.email
      if (myEmail) {
        payments.value = res.data.filter((p: any) => p.userEmail === myEmail || p.member?.email === myEmail)
      } else {
        payments.value = res.data
      }
    } catch (err: any) {
      showToast({ title: 'Error', message: 'Failed to fetch payments', toastType: 'error' })
    } finally {
      fetching.value = false
    }
  }

  const createPayment = async (payload: any) => {
    loading.value = true
    try {
      const res = await payments_api.create(payload)
      showToast({ title: 'Success', message: 'Payment created successfully', toastType: 'success' })
      return { data: res.data, error: null }
    } catch (err: any) {
      const errMsg = err.response?.data?.message || 'Failed to submit payment'
      showToast({ title: 'Error', message: errMsg, toastType: 'error' })
      return { data: null, error: errMsg }
    } finally {
      loading.value = false
    }
  }

  return { loading, fetching, payments, fetchMyPayments, createPayment }
}
