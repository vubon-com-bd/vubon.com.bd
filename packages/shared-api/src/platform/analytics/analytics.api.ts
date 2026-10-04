import { httpClient } from '../../common/client/client.factory';
import { ANALYTICS_ENDPOINTS } from './analytics.endpoints';
import type {
  AnalyticsReportRequest,
  AnalyticsReportResponse,
  AnalyticsTrackRequest,
  AnalyticsTrackResponse,
} from './analytics.types';

export const analyticsApi = {
  track: async (
    input: AnalyticsTrackRequest,
    signal?: AbortSignal
  ): Promise<AnalyticsTrackResponse> => {
    const res = await httpClient.post<AnalyticsTrackResponse>(ANALYTICS_ENDPOINTS.track, input, {
      signal,
      timeout: 5000,
    });
    return res.data;
  },

  report: async (
    input: AnalyticsReportRequest,
    signal?: AbortSignal
  ): Promise<AnalyticsReportResponse> => {
    const res = await httpClient.post<AnalyticsReportResponse>(ANALYTICS_ENDPOINTS.report, input, {
      signal,
      timeout: 30_000,
    });
    return res.data;
  },
} as const;
