import { httpClient } from '../../../common/client/client.factory';
import { generateIdempotencyKey } from '../../../common/idempotency/idempotency-key';
import { DOCUMENT_ENDPOINTS } from './document.endpoints';
import type { DocumentListResponse, UploadDocumentRequest, VendorDocument } from './document.types';

export const documentApi = {
  list: async (vendorId: string, signal?: AbortSignal): Promise<DocumentListResponse> => {
    const res = await httpClient.get<DocumentListResponse>(DOCUMENT_ENDPOINTS.list(vendorId), {
      signal,
      timeout: 10_000,
    });
    return res.data;
  },

  upload: async (
    vendorId: string,
    input: UploadDocumentRequest,
    signal?: AbortSignal
  ): Promise<VendorDocument> => {
    const res = await httpClient.post<VendorDocument>(DOCUMENT_ENDPOINTS.upload(vendorId), input, {
      signal,
      timeout: 30_000,
      headers: { 'Idempotency-Key': generateIdempotencyKey() },
    });
    return res.data;
  },
} as const;
