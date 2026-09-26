import { httpClient } from '../../common/client/client.factory';
import { UPLOAD_BASE_ENDPOINTS } from './upload.endpoints';
import type { UploadedFile } from './upload.types';

/**
 * Base upload helper.
 *
 * NOTE: Sends FormData via httpClient. The underlying client must pass
 * FormData through without JSON-serializing it. If your current
 * FetchClient always JSON.stringifies the body, update it to skip
 * serialization when `body instanceof FormData`.
 */
async function uploadFile(
  endpoint: string,
  file: Blob | File,
  filename?: string,
  signal?: AbortSignal
): Promise<UploadedFile> {
  const form = new FormData();
  const name =
    filename ?? (typeof File !== 'undefined' && file instanceof File ? file.name : 'file');
  form.append('file', file, name);

  const res = await httpClient.post<UploadedFile>(endpoint, form, {
    signal,
    timeout: 120_000,
    // Let the browser set multipart boundary automatically.
    headers: {},
  });
  return res.data;
}

export const uploadBaseApi = {
  uploadImage: (file: Blob | File, filename?: string, signal?: AbortSignal) =>
    uploadFile(UPLOAD_BASE_ENDPOINTS.image, file, filename, signal),

  uploadVideo: (file: Blob | File, filename?: string, signal?: AbortSignal) =>
    uploadFile(UPLOAD_BASE_ENDPOINTS.video, file, filename, signal),

  uploadDocument: (file: Blob | File, filename?: string, signal?: AbortSignal) =>
    uploadFile(UPLOAD_BASE_ENDPOINTS.document, file, filename, signal),
} as const;
