import { httpClient } from '../../common/client/client.factory';
import { generateIdempotencyKey } from '../../common/idempotency/idempotency-key';
import { CHUNKED_UPLOAD_ENDPOINTS } from './chunked.endpoints';
import type {
  ChunkUploadRequest,
  ChunkUploadResponse,
  ChunkedAbortRequest,
  ChunkedCompleteRequest,
  ChunkedCompleteResponse,
  ChunkedInitRequest,
  ChunkedInitResponse,
} from './chunked.types';

export const chunkedUploadApi = {
  init: async (input: ChunkedInitRequest, signal?: AbortSignal): Promise<ChunkedInitResponse> => {
    const res = await httpClient.post<ChunkedInitResponse>(CHUNKED_UPLOAD_ENDPOINTS.init, input, {
      signal,
      timeout: 30_000,
      headers: { 'Idempotency-Key': generateIdempotencyKey() },
    });
    return res.data;
  },

  uploadChunk: async (
    input: ChunkUploadRequest,
    signal?: AbortSignal
  ): Promise<ChunkUploadResponse> => {
    const form = new FormData();
    form.append('chunk', input.chunk);
    form.append('chunkIndex', String(input.chunkIndex));
    if (input.checksum) form.append('checksum', input.checksum);

    const res = await httpClient.post<ChunkUploadResponse>(
      CHUNKED_UPLOAD_ENDPOINTS.part(input.uploadId),
      form,
      { signal, timeout: 120_000, headers: {} }
    );
    return res.data;
  },

  complete: async (
    input: ChunkedCompleteRequest,
    signal?: AbortSignal
  ): Promise<ChunkedCompleteResponse> => {
    const res = await httpClient.post<ChunkedCompleteResponse>(
      CHUNKED_UPLOAD_ENDPOINTS.complete(input.uploadId),
      { checksums: input.checksums },
      {
        signal,
        timeout: 60_000,
        headers: { 'Idempotency-Key': generateIdempotencyKey() },
      }
    );
    return res.data;
  },

  abort: async (input: ChunkedAbortRequest, signal?: AbortSignal): Promise<void> => {
    await httpClient.post<null>(
      CHUNKED_UPLOAD_ENDPOINTS.abort(input.uploadId),
      {},
      { signal, timeout: 15_000 }
    );
  },
} as const;
