import { ApiClient } from '../client/api-client';
import { FILTER_ENDPOINTS } from '../endpoints/filter.endpoints';

export const filterApi = {
  list: (): Promise<unknown> => ApiClient.get(FILTER_ENDPOINTS.LIST),
  apply: (filters: unknown[]): Promise<unknown> =>
    ApiClient.post(FILTER_ENDPOINTS.APPLY, { filters }),
  operators: (): Promise<string[]> => ApiClient.get(FILTER_ENDPOINTS.OPERATORS),
} as const;
