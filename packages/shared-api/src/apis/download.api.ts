import { ApiClient } from '../client/api-client';
import { DOWNLOAD_ENDPOINTS } from '../endpoints/download.endpoints';

export const downloadApi = {
  file: (fileId: string): Promise<unknown> => ApiClient.get(DOWNLOAD_ENDPOINTS.FILE(fileId)),
  presigned: (fileId: string): Promise<{ url: string }> =>
    ApiClient.get(DOWNLOAD_ENDPOINTS.PRESIGNED(fileId)),
} as const;
