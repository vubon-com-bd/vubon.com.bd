/**
 * User API.
 * @module shared-api/apis/user
 */

import type { UserPublic, PaginationParams, PaginatedResponse } from '@vubon/shared-types';
import { ApiClient } from '../client/api-client';
import { USER_ENDPOINTS } from '../endpoints/user.endpoints';

export const userApi = {
  list: (params?: PaginationParams): Promise<PaginatedResponse<UserPublic>> => {
    const qs = params ? `?page=${params.page ?? 1}&limit=${params.limit ?? 20}` : '';
    return ApiClient.get(`${USER_ENDPOINTS.LIST}${qs}`);
  },

  get: (userId: string): Promise<UserPublic> => ApiClient.get(USER_ENDPOINTS.GET(userId)),

  me: (): Promise<UserPublic> => ApiClient.get(USER_ENDPOINTS.ME),

  update: (userId: string, body: Partial<UserPublic>): Promise<UserPublic> =>
    ApiClient.put(USER_ENDPOINTS.UPDATE(userId), body),

  delete: (userId: string): Promise<void> => ApiClient.delete(USER_ENDPOINTS.DELETE(userId)),

  getProfile: (userId: string): Promise<UserPublic> =>
    ApiClient.get(USER_ENDPOINTS.PROFILE(userId)),
} as const;
