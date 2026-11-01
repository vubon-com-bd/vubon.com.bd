import { httpClient } from '../../common/client/client.factory';
import type { QueryParams } from '../../common/request/request.types';
import { ROUTE_ENDPOINTS } from './route.endpoints';
import type { Route, RouteListResponse } from './route.types';

export const routeApi = {
  list: async (query?: QueryParams, signal?: AbortSignal): Promise<RouteListResponse> => {
    const res = await httpClient.get<RouteListResponse>(ROUTE_ENDPOINTS.list, {
      signal,
      timeout: 15_000,
      query,
    });
    return res.data;
  },

  detail: async (id: string, signal?: AbortSignal): Promise<Route> => {
    const res = await httpClient.get<Route>(ROUTE_ENDPOINTS.detail(id), {
      signal,
      timeout: 10_000,
    });
    return res.data;
  },
} as const;
