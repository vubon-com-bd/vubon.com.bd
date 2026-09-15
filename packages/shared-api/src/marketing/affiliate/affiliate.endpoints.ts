import { API_ROUTES } from '@vubon/shared-constants/common';
import { paramEndpoint } from '../../common/endpoints/endpoint.builder';

export const AFFILIATE_ENDPOINTS = {
  list: API_ROUTES.AFFILIATE.LIST,
  detail: (id: string): string => paramEndpoint(API_ROUTES.AFFILIATE.DETAIL, { id }),
  register: API_ROUTES.AFFILIATE.REGISTER,
} as const;
