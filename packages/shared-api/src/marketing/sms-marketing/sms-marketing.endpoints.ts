import { API_ROUTES } from '@vubon/shared-constants/common';

export const SMS_MARKETING_ENDPOINTS = {
  list: API_ROUTES.SMS_MARKETING.LIST,
  send: API_ROUTES.SMS_MARKETING.SEND,
} as const;
