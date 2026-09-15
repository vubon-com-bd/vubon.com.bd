import { httpClient } from '../../common/client/client.factory';
import type { QueryParams } from '../../common/request/request.types';
import { AI_PERSONALIZATION_ENDPOINTS } from './personalization.endpoints';
import type { PersonalizationProfile } from './personalization.types';

export const aiPersonalizationApi = {
  get: async (query?: QueryParams, signal?: AbortSignal): Promise<PersonalizationProfile> => {
    const res = await httpClient.get<PersonalizationProfile>(AI_PERSONALIZATION_ENDPOINTS.get, {
      signal,
      timeout: 10_000,
      query,
    });
    return res.data;
  },
} as const;
