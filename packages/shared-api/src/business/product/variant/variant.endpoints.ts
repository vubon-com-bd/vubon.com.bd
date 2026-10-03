import { API_ROUTES } from '@vubon/shared-constants/common';
import { paramEndpoint } from '../../../common/endpoints/endpoint.builder';

export const VARIANT_ENDPOINTS = {
  list: (productId: string): string => paramEndpoint(API_ROUTES.VARIANT.LIST, { productId }),
  detail: (productId: string, id: string): string =>
    paramEndpoint(API_ROUTES.VARIANT.DETAIL, { productId, id }),
} as const;
