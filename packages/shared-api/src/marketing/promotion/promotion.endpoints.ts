import { API_ROUTES } from '@vubon/shared-constants/common';
import { paramEndpoint } from '../../common/endpoints/endpoint.builder';

export const PROMOTION_ENDPOINTS = {
  list: API_ROUTES.PROMOTION.LIST,
  detail: (id: string): string => paramEndpoint(API_ROUTES.PROMOTION.DETAIL, { id }),
} as const;
