import { API_ROUTES } from '@vubon/shared-constants/common';
import { paramEndpoint } from '../../../common/endpoints/endpoint.builder';

export const DOCUMENT_ENDPOINTS = {
  list: (vendorId: string): string =>
    paramEndpoint(API_ROUTES.VENDOR.DOCUMENT_LIST, { id: vendorId }),
  upload: (vendorId: string): string =>
    paramEndpoint(API_ROUTES.VENDOR.DOCUMENT_UPLOAD, { id: vendorId }),
} as const;
