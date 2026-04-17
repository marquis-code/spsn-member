import { ref, computed } from 'vue'

export const useFormValidation = (form: any) => {
  const errors = ref<Record<string, string>>({})

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const validatePhone = (phone: string) => {
    // Basic validation: ensure it has a dial code and at least 7 digits
    if (!phone) return false
    const stripped = phone.replace(/[^0-9]/g, '')
    return stripped.length >= 10
  }

  const validateStep = (step: number) => {
    errors.value = {}
    let isValid = true

    if (step === 1) {
      if (!form.fullName?.trim()) {
        errors.value.fullName = 'Full Name is required for official certification'
        isValid = false
      }
      if (!form.email?.trim() || !validateEmail(form.email)) {
        errors.value.email = 'A valid scientific email address is required'
        isValid = false
      }
      if (!form.password || form.password.length < 8) {
        errors.value.password = 'Password must be at least 8 characters'
        isValid = false
      }
      if (!form.phoneNumber?.trim() || !validatePhone(form.phoneNumber)) {
        errors.value.phoneNumber = 'A valid contact number with country code is required'
        isValid = false
      }
      if (!form.organization?.trim()) {
        errors.value.organization = 'Host Institution/Organization is required'
        isValid = false
      }
      if (!form.category) {
        errors.value.category = 'Membership Segment must be selected'
        isValid = false
      }
    }

    if (step === 2) {
      // Step 2 is document upload - handled in signup.vue via uploadStatuses
    }

    if (step === 3) {
      if (!form.professionalProfile?.bio?.trim() || form.professionalProfile.bio.length < 50) {
        errors.value.bio = 'Scientific biography must be at least 50 characters'
        isValid = false
      }
      if (!form.refereeName?.trim()) {
        errors.value.refereeName = 'An active Fellow or Full Member referee is required'
        isValid = false
      }
    }

    return isValid
  }

  return {
    errors,
    validateStep,
    validateEmail,
    validatePhone
  }
}
