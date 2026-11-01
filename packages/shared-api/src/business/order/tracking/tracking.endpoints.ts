import { API_ROUTES } from '@vubon/shared-constants/common';
import { paramEndpoint } from '../../../common/endpoints/endpoint.builder';

export const ORDER_TRACKING_ENDPOINTS = {
  get: (orderId: string): string => paramEndpoint(API_ROUTES.ORDER.TRACKING, { id: orderId }),
} as const;
