import { GATEWAY_ENDPOINT } from "../axios.config";

export const members_api = {
  register: (payload: any) => GATEWAY_ENDPOINT.post("/members/register", payload),
  verifyRegistration: (payload: { email: string, otp: string }) => GATEWAY_ENDPOINT.post("/members/verify-registration", payload),
  resendRegistrationOtp: (payload: { email: string }) => GATEWAY_ENDPOINT.post("/members/resend-registration-otp", payload),
  getProfile: (id: string) => GATEWAY_ENDPOINT.get(`/members/${id}`),
  updateProfile: (id: string, payload: any) => GATEWAY_ENDPOINT.patch(`/members/${id}`, payload),
};
