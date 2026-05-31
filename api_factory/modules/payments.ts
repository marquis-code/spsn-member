import { GATEWAY_ENDPOINT } from '../axios.config'

export const payments_api = {
  create: (payload: any) => {
    return GATEWAY_ENDPOINT.post('/payments', payload)
  },
  fetchMemberPayments: () => {
    // Ideally this would be /payments/my or we filter client-side if we only have /payments
    // For now we'll fetch all and filter by email if the backend doesn't filter
    return GATEWAY_ENDPOINT.get('/payments')
  }
}
