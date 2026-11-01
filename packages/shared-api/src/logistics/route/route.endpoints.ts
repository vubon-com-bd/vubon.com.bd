import { API_ROUTES } from '@vubon/shared-constants/common';
import { paramEndpoint } from '../../common/endpoints/endpoint.builder';

export const ROUTE_ENDPOINTS = {
  list: API_ROUTES.ROUTE.LIST,
  detail: (id: string): string => paramEndpoint(API_ROUTES.ROUTE.DETAIL, { id }),
} as const;
