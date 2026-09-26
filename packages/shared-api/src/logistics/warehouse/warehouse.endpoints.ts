import { API_ROUTES } from '@vubon/shared-constants/common';
import { paramEndpoint } from '../../common/endpoints/endpoint.builder';

export const WAREHOUSE_ENDPOINTS = {
  list: API_ROUTES.WAREHOUSE.LIST,
  detail: (id: string): string => paramEndpoint(API_ROUTES.WAREHOUSE.DETAIL, { id }),
} as const;
