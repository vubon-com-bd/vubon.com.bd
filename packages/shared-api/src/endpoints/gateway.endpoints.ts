/**
 * Payment Gateway API endpoint paths.
 * @module shared-api/endpoints/gateway
 */

export const GATEWAY_ENDPOINTS = {
  LIST: '/gateways',
  GET: (gatewayId: string) => `/gateways/${gatewayId}`,
  PROCESS: (gatewayId: string) => `/gateways/${gatewayId}/process`,
  VERIFY: (gatewayId: string) => `/gateways/${gatewayId}/verify`,
  REFUND: (gatewayId: string) => `/gateways/${gatewayId}/refund`,
  STATUS: (gatewayId: string) => `/gateways/${gatewayId}/status`,
  ENABLE: (gatewayId: string) => `/gateways/${gatewayId}/enable`,
  DISABLE: (gatewayId: string) => `/gateways/${gatewayId}/disable`,
  CONFIG: (gatewayId: string) => `/gateways/${gatewayId}/config`,
} as const;
