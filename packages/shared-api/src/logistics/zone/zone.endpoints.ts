import { API_ROUTES } from '@vubon/shared-constants/common';
import { paramEndpoint } from '../../common/endpoints/endpoint.builder';

export const ZONE_ENDPOINTS = {
  list: API_ROUTES.ZONE.LIST,
  create: API_ROUTES.ZONE.CREATE,
  detail: (id: string): string => paramEndpoint(API_ROUTES.ZONE.DETAIL, { id }),
  update: (id: string): string => paramEndpoint(API_ROUTES.ZONE.UPDATE, { id }),
} as const;
