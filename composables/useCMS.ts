import { ref } from 'vue'
import { cms_api } from '@/api_factory/modules/cms'

export const useCMS = () => {
  const cmsConfig = useState('cms_config', () => null)
  const loading = ref(false)

  const loadCMS = async () => {
    if (cmsConfig.value) return cmsConfig.value
    
    loading.value = true
    try {
      const res = await cms_api.getConfig()
      cmsConfig.value = res.data
      return res.data
    } catch (error) {
      console.error('Failed to load CMS:', error)
      return null
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    cmsConfig,
    loadCMS
  }
}
