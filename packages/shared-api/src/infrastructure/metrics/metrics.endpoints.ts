import { API_ROUTES } from '@vubon/shared-constants/common';

export const METRICS_ENDPOINTS = {
  snapshot: API_ROUTES.METRICS.SNAPSHOT,
  prometheus: API_ROUTES.METRICS.PROMETHEUS,
} as const;
