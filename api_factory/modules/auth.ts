import { GATEWAY_ENDPOINT } from "../axios.config";

export const auth_api = {
  login: (payload: any) => GATEWAY_ENDPOINT.post("/auth/login", payload),
  verify2FA: (payload: { email: string, otp: string }) => GATEWAY_ENDPOINT.post("/auth/verify-2fa", payload),
  register: (payload: any) => GATEWAY_ENDPOINT.post("/auth/register", payload),
};
