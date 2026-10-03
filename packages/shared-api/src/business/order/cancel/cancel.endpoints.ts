import { API_ROUTES } from '@vubon/shared-constants/common';
import { paramEndpoint } from '../../../common/endpoints/endpoint.builder';

export const CANCEL_ORDER_ENDPOINTS = {
  cancel: (orderId: string): string => paramEndpoint(API_ROUTES.ORDER.CANCEL, { id: orderId }),
} as const;
