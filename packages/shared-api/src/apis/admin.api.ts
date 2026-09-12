/**
 * Admin API.
 * @module shared-api/apis/admin
 */

import type { AdminPublic, PaginationParams, PaginatedResponse } from '@vubon/shared-types';
import { ApiClient } from '../client/api-client';
import { ADMIN_ENDPOINTS } from '../endpoints/admin.endpoints';

export const adminApi = {
  list: (params?: PaginationParams): Promise<PaginatedResponse<AdminPublic>> => {
    const qs = params ? `?page=${params.page ?? 1}&limit=${params.limit ?? 20}` : '';
    return ApiClient.get(`${ADMIN_ENDPOINTS.LIST}${qs}`);
  },

  get: (adminId: string): Promise<AdminPublic> => ApiClient.get(ADMIN_ENDPOINTS.GET(adminId)),

  me: (): Promise<AdminPublic> => ApiClient.get(ADMIN_ENDPOINTS.ME),

  update: (adminId: string, body: Partial<AdminPublic>): Promise<AdminPublic> =>
    ApiClient.put(ADMIN_ENDPOINTS.UPDATE(adminId), body),

  delete: (adminId: string): Promise<void> => ApiClient.delete(ADMIN_ENDPOINTS.DELETE(adminId)),

  getSettings: (adminId: string): Promise<unknown> =>
    ApiClient.get(ADMIN_ENDPOINTS.SETTINGS(adminId)),
} as const;
