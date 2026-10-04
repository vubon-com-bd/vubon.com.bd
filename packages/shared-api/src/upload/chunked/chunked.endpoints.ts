import { API_ROUTES } from '@vubon/shared-constants/common';
import { paramEndpoint } from '../../common/endpoints/endpoint.builder';

export const CHUNKED_UPLOAD_ENDPOINTS = {
  init: API_ROUTES.UPLOAD.CHUNKED_INIT,
  part: (uploadId: string): string => paramEndpoint(API_ROUTES.UPLOAD.CHUNKED_PART, { uploadId }),
  complete: (uploadId: string): string =>
    paramEndpoint(API_ROUTES.UPLOAD.CHUNKED_COMPLETE, { uploadId }),
  abort: (uploadId: string): string => paramEndpoint(API_ROUTES.UPLOAD.CHUNKED_ABORT, { uploadId }),
} as const;
