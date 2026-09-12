import { ApiClient } from '../client/api-client';
import { EXPORT_ENDPOINTS } from '../endpoints/export.endpoints';

export const exportApi = {
  create: (body: unknown): Promise<{ exportId: string }> =>
    ApiClient.post(EXPORT_ENDPOINTS.CREATE, body),
  status: (exportId: string): Promise<unknown> => ApiClient.get(EXPORT_ENDPOINTS.STATUS(exportId)),
  download: (exportId: string): Promise<{ url: string }> =>
    ApiClient.get(EXPORT_ENDPOINTS.DOWNLOAD(exportId)),
} as const;
