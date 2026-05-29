import { ref } from 'file:///Users/marquis/scpsn/member/node_modules/vue/index.mjs';
import { b as useCustomToast, G as GATEWAY_ENDPOINT } from './server.mjs';

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
    var _a, _b;
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
        message: ((_b = (_a = error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || "Failed to upload document",
        toastType: "error"
      });
      throw error;
    } finally {
      uploading.value = false;
    }
  };
  return { uploading, uploadResponse, uploadFile };
};

export { useUploadFile as u };
//# sourceMappingURL=useUploadFile-BMDCbK5W.mjs.map
