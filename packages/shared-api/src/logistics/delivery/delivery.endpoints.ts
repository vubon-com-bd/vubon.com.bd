import { API_ROUTES } from '@vubon/shared-constants/common';
import { paramEndpoint } from '../../common/endpoints/endpoint.builder';

export const DELIVERY_ENDPOINTS = {
  list: API_ROUTES.DELIVERY.LIST,
  detail: (id: string): string => paramEndpoint(API_ROUTES.DELIVERY.DETAIL, { id }),
} as const;
