import { API_ROUTES } from '@vubon/shared-constants/common';

export const EMAIL_MARKETING_ENDPOINTS = {
  list: API_ROUTES.EMAIL_MARKETING.LIST,
  send: API_ROUTES.EMAIL_MARKETING.SEND,
} as const;
