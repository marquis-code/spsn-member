import { GATEWAY_ENDPOINT } from "../axios.config";

export const auth_api = {
  login: (payload: any) => GATEWAY_ENDPOINT.post("/auth/login", payload),
  register: (payload: any) => GATEWAY_ENDPOINT.post("/auth/register", payload),
};
