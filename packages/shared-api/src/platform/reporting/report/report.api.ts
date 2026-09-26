import { httpClient } from '../../../common/client/client.factory';
import type { QueryParams } from '../../../common/request/request.types';
import { REPORT_ENDPOINTS } from './report.endpoints';
import type { Report, ReportListResponse } from './report.types';

export const reportApi = {
  list: async (query?: QueryParams, signal?: AbortSignal): Promise<ReportListResponse> => {
    const res = await httpClient.get<ReportListResponse>(REPORT_ENDPOINTS.list, {
      signal,
      timeout: 15_000,
      query,
    });
    return res.data;
  },

  detail: async (id: string, signal?: AbortSignal): Promise<Report> => {
    const res = await httpClient.get<Report>(REPORT_ENDPOINTS.detail(id), {
      signal,
      timeout: 15_000,
    });
    return res.data;
  },
} as const;
