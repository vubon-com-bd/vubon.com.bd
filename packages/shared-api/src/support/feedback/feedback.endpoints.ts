import { API_ROUTES } from '@vubon/shared-constants/common';

export const FEEDBACK_ENDPOINTS = {
  list: API_ROUTES.FEEDBACK.LIST,
  submit: API_ROUTES.FEEDBACK.SUBMIT,
} as const;
