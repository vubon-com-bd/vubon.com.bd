import { API_ROUTES } from '@vubon/shared-constants/common';
import { paramEndpoint } from '../../../common/endpoints/endpoint.builder';

export const PAYOUT_ENDPOINTS = {
  list: (vendorId: string): string =>
    paramEndpoint(API_ROUTES.VENDOR.PAYOUT_LIST, { id: vendorId }),
} as const;
