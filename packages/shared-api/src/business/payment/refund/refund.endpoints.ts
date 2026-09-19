import { API_ROUTES } from '@vubon/shared-constants/common';
import { paramEndpoint } from '../../../common/endpoints/endpoint.builder';

/**
 * Refund endpoints reuse PAYMENT.REFUND route.
 * NOTE: If backend adds dedicated refund routes, add
 * REFUND.LIST / REFUND.DETAIL to API_ROUTES and update here.
 */
export const REFUND_ENDPOINTS = {
  create: (paymentId: string): string =>
    paramEndpoint(API_ROUTES.PAYMENT.REFUND, { id: paymentId }),
} as const;
