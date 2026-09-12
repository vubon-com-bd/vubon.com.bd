import { ApiClient } from '../client/api-client';
import { UPLOAD_ENDPOINTS } from '../endpoints/upload.endpoints';

export const uploadApi = {
  single: (file: File): Promise<unknown> => {
    const formData = new FormData();
    formData.append('file', file);
    return ApiClient.post(UPLOAD_ENDPOINTS.SINGLE, formData);
  },
  multiple: (files: File[]): Promise<unknown> => {
    const formData = new FormData();
    files.forEach((f) => formData.append('files', f));
    return ApiClient.post(UPLOAD_ENDPOINTS.MULTIPLE, formData);
  },
  presigned: (filename: string): Promise<unknown> =>
    ApiClient.post(UPLOAD_ENDPOINTS.PRESIGNED, { filename }),
} as const;
