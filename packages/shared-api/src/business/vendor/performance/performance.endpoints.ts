import { API_ROUTES } from '@vubon/shared-constants/common';
import { paramEndpoint } from '../../../common/endpoints/endpoint.builder';

export const PERFORMANCE_ENDPOINTS = {
  get: (vendorId: string): string => paramEndpoint(API_ROUTES.VENDOR.PERFORMANCE, { id: vendorId }),
} as const;
