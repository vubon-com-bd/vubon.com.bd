import { API_ROUTES } from '@vubon/shared-constants/common';
import { paramEndpoint } from '../../common/endpoints/endpoint.builder';

export const FULFILLMENT_ENDPOINTS = {
  list: API_ROUTES.FULFILLMENT.LIST,
  detail: (id: string): string => paramEndpoint(API_ROUTES.FULFILLMENT.DETAIL, { id }),
} as const;
