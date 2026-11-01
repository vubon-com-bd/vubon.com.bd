import { API_ROUTES } from '@vubon/shared-constants/common';

export const DISCOVERY_ENDPOINTS = {
  feed: API_ROUTES.DISCOVERY.FEED,
  recommendation: API_ROUTES.DISCOVERY.RECOMMENDATION,
  trending: API_ROUTES.DISCOVERY.TRENDING,
} as const;
