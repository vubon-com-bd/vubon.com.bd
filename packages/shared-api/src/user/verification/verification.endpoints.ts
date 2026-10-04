import { API_ROUTES } from '@vubon/shared-constants/common';

export const VERIFICATION_ENDPOINTS = {
  start: API_ROUTES.USER.VERIFICATION_START,
  status: API_ROUTES.USER.VERIFICATION_STATUS,
} as const;
