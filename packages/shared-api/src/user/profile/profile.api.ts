import { httpClient } from '../../common/client/client.factory';
import { PROFILE_ENDPOINTS } from './profile.endpoints';
import type { UpdateProfileRequest, UserProfile } from './profile.types';

export const profileApi = {
  get: async (signal?: AbortSignal): Promise<UserProfile> => {
    const res = await httpClient.get<UserProfile>(PROFILE_ENDPOINTS.get, {
      signal,
      timeout: 10_000,
    });
    return res.data;
  },

  update: async (input: UpdateProfileRequest, signal?: AbortSignal): Promise<UserProfile> => {
    const res = await httpClient.patch<UserProfile>(PROFILE_ENDPOINTS.update, input, {
      signal,
      timeout: 15_000,
    });
    return res.data;
  },
} as const;
