import { API_ROUTES } from '@vubon/shared-constants/common';

export const HEALTH_ENDPOINTS = {
  live: API_ROUTES.HEALTH.LIVE,
  ready: API_ROUTES.HEALTH.READY,
  full: API_ROUTES.HEALTH.FULL,
} as const;
