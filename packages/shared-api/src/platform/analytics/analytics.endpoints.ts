import { API_ROUTES } from '@vubon/shared-constants/common';

export const ANALYTICS_ENDPOINTS = {
  track: API_ROUTES.ANALYTICS.TRACK,
  report: API_ROUTES.ANALYTICS.REPORT,
} as const;
