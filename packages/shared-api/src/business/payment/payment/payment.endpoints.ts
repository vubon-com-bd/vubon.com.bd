import { API_ROUTES } from '@vubon/shared-constants/common';
import { paramEndpoint } from '../../../common/endpoints/endpoint.builder';

export const PAYMENT_ENDPOINTS = {
  create: API_ROUTES.PAYMENT.CREATE,
  detail: (id: string): string => paramEndpoint(API_ROUTES.PAYMENT.DETAIL, { id }),
  refund: (id: string): string => paramEndpoint(API_ROUTES.PAYMENT.REFUND, { id }),
  methods: API_ROUTES.PAYMENT.METHODS,
} as const;
