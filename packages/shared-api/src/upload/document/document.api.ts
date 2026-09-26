import { httpClient } from '../../common/client/client.factory';
import { DOCUMENT_UPLOAD_ENDPOINTS } from './document.endpoints';
import type { DocumentUploadOptions, DocumentUploadResult } from './document.types';

export const documentUploadApi = {
  upload: async (
    file: Blob | File,
    options: DocumentUploadOptions = {},
    signal?: AbortSignal
  ): Promise<DocumentUploadResult> => {
    const form = new FormData();
    form.append('file', file, (file as File).name ?? 'document');
    if (options.extractText) form.append('extractText', 'true');
    if (options.scanForViruses) form.append('scanForViruses', 'true');

    const res = await httpClient.post<DocumentUploadResult>(
      DOCUMENT_UPLOAD_ENDPOINTS.upload,
      form,
      { signal, timeout: 120_000, headers: {} }
    );
    return res.data;
  },
} as const;
