import axios, { type AxiosResponse } from "axios";
import { useUser } from "@/composables/modules/auth/user";
import { useCustomToast } from '@/composables/core/useCustomToast'

const $GATEWAY_ENDPOINT = import.meta.env.VITE_BASE_URL || "https://spsn-backend.onrender.com/api";

export const GATEWAY_ENDPOINT = axios.create({
  baseURL: $GATEWAY_ENDPOINT,
});

export interface CustomAxiosResponse extends AxiosResponse {
  value?: any;
  type?: string;
}

GATEWAY_ENDPOINT.interceptors.request.use((config: any) => {
  const { token } = useUser();
  if (token.value) {
    config.headers.Authorization = `Bearer ${token.value}`;
  }
  
  let lang = 'en';
  if (typeof document !== 'undefined') {
    const match = document.cookie.match(new RegExp('(^| )i18n_redirected=([^;]+)'));
    if (match && match[2]) lang = decodeURIComponent(match[2]);
    else lang = localStorage.getItem('app-lang') || 'en';
  }
  config.headers['x-lang'] = lang;

  return config;
});

GATEWAY_ENDPOINT.interceptors.response.use(
  (response: CustomAxiosResponse) => response,
  (err: any) => {
    const { logOut } = useUser();
    const { showToast } = useCustomToast();

    if (err.response?.status === 401) {
      // Don't trigger global logout/refresh if we are actively trying to log in
      const isLoginRequest = err.config?.url?.includes('/login');
      const isLoginPage = typeof window !== 'undefined' && window.location.pathname.includes('/login');
      
      if (!isLoginRequest && !isLoginPage) {
        logOut();
        showToast({ title: "Session Expired", message: "Please login again", toastType: "error" });
        if (typeof window !== 'undefined') window.location.href = '/login';
      }
    }
    return Promise.reject(err);
  }
);
