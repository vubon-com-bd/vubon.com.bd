import { API_ROUTES } from '@vubon/shared-constants/common';
import { paramEndpoint } from '../../../common/endpoints/endpoint.builder';

export const PRICING_ENDPOINTS = {
  get: (productId: string): string => paramEndpoint(API_ROUTES.PRICING.GET, { productId }),
  update: (productId: string): string => paramEndpoint(API_ROUTES.PRICING.UPDATE, { productId }),
} as const;
