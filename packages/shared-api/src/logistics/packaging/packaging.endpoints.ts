import { API_ROUTES } from '@vubon/shared-constants/common';
import { paramEndpoint } from '../../common/endpoints/endpoint.builder';

export const PACKAGING_ENDPOINTS = {
  list: API_ROUTES.PACKAGING.LIST,
  create: API_ROUTES.PACKAGING.CREATE,
  detail: (id: string): string => paramEndpoint(API_ROUTES.PACKAGING.DETAIL, { id }),
  update: (id: string): string => paramEndpoint(API_ROUTES.PACKAGING.UPDATE, { id }),
} as const;
