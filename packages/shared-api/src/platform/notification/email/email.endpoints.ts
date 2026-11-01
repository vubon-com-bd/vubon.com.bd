import { API_ROUTES } from '@vubon/shared-constants/common';

export const EMAIL_ENDPOINTS = {
  send: API_ROUTES.EMAIL.SEND,
  templates: API_ROUTES.EMAIL.TEMPLATES,
} as const;
