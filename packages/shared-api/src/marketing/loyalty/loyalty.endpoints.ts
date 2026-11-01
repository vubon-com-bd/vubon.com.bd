import { API_ROUTES } from '@vubon/shared-constants/common';

export const LOYALTY_ENDPOINTS = {
  get: API_ROUTES.LOYALTY.GET,
  redeem: API_ROUTES.LOYALTY.REDEEM,
} as const;
