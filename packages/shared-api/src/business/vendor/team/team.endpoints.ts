import { API_ROUTES } from '@vubon/shared-constants/common';
import { paramEndpoint } from '../../../common/endpoints/endpoint.builder';

export const TEAM_ENDPOINTS = {
  list: (vendorId: string): string => paramEndpoint(API_ROUTES.VENDOR.TEAM_LIST, { id: vendorId }),
  invite: (vendorId: string): string =>
    paramEndpoint(API_ROUTES.VENDOR.TEAM_INVITE, { id: vendorId }),
} as const;
