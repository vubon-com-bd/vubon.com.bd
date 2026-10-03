import { API_ROUTES } from '@vubon/shared-constants/common';
import { paramEndpoint } from '../../../common/endpoints/endpoint.builder';

export const ORDER_ENDPOINTS = {
  list: API_ROUTES.ORDER.LIST,
  detail: (id: string): string => paramEndpoint(API_ROUTES.ORDER.DETAIL, { id }),
  create: API_ROUTES.ORDER.CREATE,
} as const;
