import { ApiClient } from '../client/api-client';
import { REPORT_ENDPOINTS } from '../endpoints/report.endpoints';

export const reportApi = {
  list: (): Promise<unknown> => ApiClient.get(REPORT_ENDPOINTS.LIST),
  generate: (body: unknown): Promise<unknown> => ApiClient.post(REPORT_ENDPOINTS.GENERATE, body),
  get: (reportId: string): Promise<unknown> => ApiClient.get(REPORT_ENDPOINTS.GET(reportId)),
  download: (reportId: string): Promise<unknown> =>
    ApiClient.get(REPORT_ENDPOINTS.DOWNLOAD(reportId)),
} as const;
