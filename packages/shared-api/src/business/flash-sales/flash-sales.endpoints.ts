import { API_ROUTES } from '@vubon/shared-constants/common';
import { paramEndpoint } from '../../common/endpoints/endpoint.builder';

export const FLASH_SALE_ENDPOINTS = {
  list: API_ROUTES.FLASH_SALE.LIST,
  detail: (id: string): string => paramEndpoint(API_ROUTES.FLASH_SALE.DETAIL, { id }),
} as const;

export const DEAL_ENDPOINTS = {
  list: API_ROUTES.DEAL.LIST,
  detail: (id: string): string => paramEndpoint(API_ROUTES.DEAL.DETAIL, { id }),
} as const;

export const BUNDLE_DEAL_ENDPOINTS = {
  list: API_ROUTES.BUNDLE_DEAL.LIST,
  detail: (id: string): string => paramEndpoint(API_ROUTES.BUNDLE_DEAL.DETAIL, { id }),
} as const;
