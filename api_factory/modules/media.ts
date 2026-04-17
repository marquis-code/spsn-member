import { GATEWAY_ENDPOINT } from "../axios.config";

export const media_api = {
  upload: (payload: FormData) => GATEWAY_ENDPOINT.post("/media/upload", payload, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
};
