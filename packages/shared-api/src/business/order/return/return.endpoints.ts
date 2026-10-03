import { API_ROUTES } from '@vubon/shared-constants/common';
import { paramEndpoint } from '../../../common/endpoints/endpoint.builder';

export const RETURN_ORDER_ENDPOINTS = {
  request: (orderId: string): string => paramEndpoint(API_ROUTES.ORDER.RETURN, { id: orderId }),
} as const;
