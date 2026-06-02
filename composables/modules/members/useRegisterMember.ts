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

  const verifyRegistration = async (payload: { email: string, otp: string }) => {
    loading.value = true
    try {
      const res = await members_api.verifyRegistration(payload)
      showToast({
        title: 'Verified',
        message: 'Your account has been successfully verified and created.',
        toastType: 'success'
      })
      return res.data
    } catch (error: any) {
      showToast({
        title: 'Verification Failed',
        message: error.response?.data?.message || 'Invalid or expired OTP',
        toastType: 'error'
      })
      return null
    } finally {
      loading.value = false
    }
  }

  const resendOTP = async (email: string) => {
    loading.value = true
    try {
      const res = await members_api.resendRegistrationOtp({ email })
      showToast({
        title: 'OTP Resent',
        message: res.data?.message || 'A new verification code has been sent.',
        toastType: 'success'
      })
      return res.data
    } catch (error: any) {
      showToast({
        title: 'Error',
        message: error.response?.data?.message || 'Failed to resend OTP',
        toastType: 'error'
      })
      return null
    } finally {
      loading.value = false
    }
  }

  return { loading, register, verifyRegistration, resendOTP }
}
