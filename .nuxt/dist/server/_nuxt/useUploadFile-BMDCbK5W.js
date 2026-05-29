import { ref } from "vue";
import { G as GATEWAY_ENDPOINT, b as useCustomToast } from "../server.mjs";
const media_api = {
  upload: (payload) => GATEWAY_ENDPOINT.post("/media/upload", payload, {
    headers: { "Content-Type": "multipart/form-data" }
  })
};
const useUploadFile = () => {
  const uploading = ref(false);
  const uploadResponse = ref(null);
  const { showToast } = useCustomToast();
  const uploadFile = async (file) => {
    uploading.value = true;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await media_api.upload(formData);
      uploadResponse.value = res.data;
      return res.data;
    } catch (error) {
      showToast({
        title: "Upload Error",
        message: error.response?.data?.message || "Failed to upload document",
        toastType: "error"
      });
      throw error;
    } finally {
      uploading.value = false;
    }
  };
  return { uploading, uploadResponse, uploadFile };
};
export {
  useUploadFile as u
};
//# sourceMappingURL=useUploadFile-BMDCbK5W.js.map
