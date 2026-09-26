import { API_ROUTES } from '@vubon/shared-constants/common';
import { paramEndpoint } from '../../common/endpoints/endpoint.builder';

export const TRACKING_ENDPOINTS = {
  get: (trackingId: string): string => paramEndpoint(API_ROUTES.TRACKING.GET, { trackingId }),
} as const;
