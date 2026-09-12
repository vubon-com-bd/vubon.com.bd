import { ApiClient } from '../client/api-client';
import { IMPORT_ENDPOINTS } from '../endpoints/import.endpoints';

export const importApi = {
  create: (body: unknown): Promise<{ importId: string }> =>
    ApiClient.post(IMPORT_ENDPOINTS.CREATE, body),
  status: (importId: string): Promise<unknown> => ApiClient.get(IMPORT_ENDPOINTS.STATUS(importId)),
  templates: (): Promise<unknown[]> => ApiClient.get(IMPORT_ENDPOINTS.TEMPLATES),
} as const;
