import { httpClient } from '../../../common/client/client.factory';
import { AUTOCOMPLETE_ENDPOINTS } from './autocomplete.endpoints';
import type { AutocompleteRequest, AutocompleteResponse } from './autocomplete.types';

export const autocompleteApi = {
  query: async (
    input: AutocompleteRequest,
    signal?: AbortSignal
  ): Promise<AutocompleteResponse> => {
    const res = await httpClient.get<AutocompleteResponse>(AUTOCOMPLETE_ENDPOINTS.query, {
      signal,
      timeout: 5000,
      query: { q: input.q, limit: input.limit },
    });
    return res.data;
  },
} as const;
