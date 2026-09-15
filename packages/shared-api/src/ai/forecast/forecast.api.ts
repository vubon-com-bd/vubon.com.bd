import { httpClient } from '../../common/client/client.factory';
import type { QueryParams } from '../../common/request/request.types';
import { AI_FORECAST_ENDPOINTS } from './forecast.endpoints';
import type { ForecastResponse } from './forecast.types';

export const aiForecastApi = {
  get: async (query?: QueryParams, signal?: AbortSignal): Promise<ForecastResponse> => {
    const res = await httpClient.get<ForecastResponse>(AI_FORECAST_ENDPOINTS.get, {
      signal,
      timeout: 20_000,
      query,
    });
    return res.data;
  },
} as const;
