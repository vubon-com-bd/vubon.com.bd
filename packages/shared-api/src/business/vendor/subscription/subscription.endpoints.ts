import { API_ROUTES } from '@vubon/shared-constants/common';
import { paramEndpoint } from '../../../common/endpoints/endpoint.builder';

export const SUBSCRIPTION_ENDPOINTS = {
  get: (vendorId: string): string =>
    paramEndpoint(API_ROUTES.VENDOR.SUBSCRIPTION, { id: vendorId }),
} as const;
