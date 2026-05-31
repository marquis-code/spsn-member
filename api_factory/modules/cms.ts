import { GATEWAY_ENDPOINT } from "../axios.config";

export const cms_api = {
  getConfig: (lang?: string) => GATEWAY_ENDPOINT.get(`/cms${lang ? `?lang=${lang}` : ''}`),
};
