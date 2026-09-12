/**
 * Callback API endpoint paths.
 * @module shared-api/endpoints/callback
 */

export const CALLBACK_ENDPOINTS = {
  RECEIVE: (callbackId: string) => `/callback/${callbackId}`,
  STATUS: (callbackId: string) => `/callback/${callbackId}/status`,
  RETRY: (callbackId: string) => `/callback/${callbackId}/retry`,
  CANCEL: (callbackId: string) => `/callback/${callbackId}/cancel`,
} as const;
