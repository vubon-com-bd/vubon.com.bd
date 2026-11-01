import { API_ROUTES } from '@vubon/shared-constants/common';

export const PUSH_ENDPOINTS = {
  send: API_ROUTES.PUSH.SEND,
  subscribe: API_ROUTES.PUSH.SUBSCRIBE,
} as const;
