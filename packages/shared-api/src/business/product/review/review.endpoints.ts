import { API_ROUTES } from '@vubon/shared-constants/common';
import { paramEndpoint } from '../../../common/endpoints/endpoint.builder';

export const REVIEW_ENDPOINTS = {
  list: (productId: string): string => paramEndpoint(API_ROUTES.REVIEW.LIST, { productId }),
  create: (productId: string): string => paramEndpoint(API_ROUTES.REVIEW.CREATE, { productId }),
  delete: (productId: string, id: string): string =>
    paramEndpoint(API_ROUTES.REVIEW.DELETE, { productId, id }),
} as const;
