import { API_ROUTES } from '@vubon/shared-constants/common';
import { paramEndpoint } from '../../common/endpoints/endpoint.builder';

export const SHIPPING_METHOD_ENDPOINTS = {
  list: API_ROUTES.SHIPPING_METHOD.LIST,
  create: API_ROUTES.SHIPPING_METHOD.CREATE,
  detail: (id: string): string => paramEndpoint(API_ROUTES.SHIPPING_METHOD.DETAIL, { id }),
  update: (id: string): string => paramEndpoint(API_ROUTES.SHIPPING_METHOD.UPDATE, { id }),
} as const;
