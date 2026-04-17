import { ref } from 'vue'
import { media_api } from '@/api_factory/modules/media'
import { useCustomToast } from '@/composables/core/useCustomToast'

export const useUploadFile = () => {
  const uploading = ref(false)
  const uploadResponse = ref<any>(null)
  const { showToast } = useCustomToast()

  const uploadFile = async (file: File) => {
    uploading.value = true
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await media_api.upload(formData)
      uploadResponse.value = res.data
      return res.data
    } catch (error: any) {
      showToast({
        title: 'Upload Error',
        message: error.response?.data?.message || 'Failed to upload document',
        toastType: 'error'
      })
      throw error
    } finally {
      uploading.value = false
    }
  }

  return { uploading, uploadResponse, uploadFile }
}
