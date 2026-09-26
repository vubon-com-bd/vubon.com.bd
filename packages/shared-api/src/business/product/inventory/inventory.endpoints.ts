import { API_ROUTES } from '@vubon/shared-constants/common';
import { paramEndpoint } from '../../../common/endpoints/endpoint.builder';

export const INVENTORY_ENDPOINTS = {
  list: API_ROUTES.INVENTORY.LIST,
  detail: (productId: string): string => paramEndpoint(API_ROUTES.INVENTORY.DETAIL, { productId }),
  update: (productId: string): string => paramEndpoint(API_ROUTES.INVENTORY.UPDATE, { productId }),
} as const;
