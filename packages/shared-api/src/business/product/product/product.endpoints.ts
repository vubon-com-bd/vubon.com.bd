import { API_ROUTES } from '@vubon/shared-constants/common';
import { paramEndpoint } from '../../../common/endpoints/endpoint.builder';

export const PRODUCT_ENDPOINTS = {
  list: API_ROUTES.PRODUCT.LIST,
  create: API_ROUTES.PRODUCT.CREATE,
  detail: (id: string): string => paramEndpoint(API_ROUTES.PRODUCT.DETAIL, { id }),
} as const;
