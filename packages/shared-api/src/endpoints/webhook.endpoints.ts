/**
 * Webhook API endpoint paths.
 * @module shared-api/endpoints/webhook
 */

export const WEBHOOK_ENDPOINTS = {
  LIST: '/webhooks',
  CREATE: '/webhooks',
  GET: (webhookId: string) => `/webhooks/${webhookId}`,
  UPDATE: (webhookId: string) => `/webhooks/${webhookId}`,
  DELETE: (webhookId: string) => `/webhooks/${webhookId}`,
  DELIVERIES: (webhookId: string) => `/webhooks/${webhookId}/deliveries`,
  DELIVERY: (webhookId: string, deliveryId: string) =>
    `/webhooks/${webhookId}/deliveries/${deliveryId}`,
  RETRY: (webhookId: string, deliveryId: string) =>
    `/webhooks/${webhookId}/deliveries/${deliveryId}/retry`,
  ENABLE: (webhookId: string) => `/webhooks/${webhookId}/enable`,
  DISABLE: (webhookId: string) => `/webhooks/${webhookId}/disable`,
  SECRET: (webhookId: string) => `/webhooks/${webhookId}/secret`,
} as const;
