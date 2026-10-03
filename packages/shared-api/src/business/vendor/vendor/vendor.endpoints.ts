import { API_ROUTES } from '@vubon/shared-constants/common';
import { paramEndpoint } from '../../../common/endpoints/endpoint.builder';

export const VENDOR_ENDPOINTS = {
  list: API_ROUTES.VENDOR.LIST,
  create: API_ROUTES.VENDOR.CREATE,
  detail: (id: string): string => paramEndpoint(API_ROUTES.VENDOR.DETAIL, { id }),
  update: (id: string): string => paramEndpoint(API_ROUTES.VENDOR.UPDATE, { id }),
} as const;
