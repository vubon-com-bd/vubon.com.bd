import { httpClient } from '../../../common/client/client.factory';
import { FACET_ENDPOINTS } from './facet.endpoints';
import type { FacetRequest, FacetResponse } from './facet.types';

export const facetApi = {
  query: async (input: FacetRequest, signal?: AbortSignal): Promise<FacetResponse> => {
    const res = await httpClient.post<FacetResponse>(FACET_ENDPOINTS.query, input, {
      signal,
      timeout: 10_000,
    });
    return res.data;
  },
} as const;
