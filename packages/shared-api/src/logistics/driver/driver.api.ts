import { httpClient } from '../../common/client/client.factory';
import type { QueryParams } from '../../common/request/request.types';
import { DRIVER_ENDPOINTS } from './driver.endpoints';
import type { Driver, DriverListResponse } from './driver.types';

export const driverApi = {
  list: async (query?: QueryParams, signal?: AbortSignal): Promise<DriverListResponse> => {
    const res = await httpClient.get<DriverListResponse>(DRIVER_ENDPOINTS.list, {
      signal,
      timeout: 15_000,
      query,
    });
    return res.data;
  },

  detail: async (id: string, signal?: AbortSignal): Promise<Driver> => {
    const res = await httpClient.get<Driver>(DRIVER_ENDPOINTS.detail(id), {
      signal,
      timeout: 10_000,
    });
    return res.data;
  },
} as const;
