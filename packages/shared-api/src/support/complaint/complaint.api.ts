import { httpClient } from '../../common/client/client.factory';
import { generateIdempotencyKey } from '../../common/idempotency/idempotency-key';
import type { QueryParams } from '../../common/request/request.types';
import { COMPLAINT_ENDPOINTS } from './complaint.endpoints';
import type { Complaint, ComplaintListResponse, CreateComplaintRequest } from './complaint.types';

export const complaintApi = {
  list: async (query?: QueryParams, signal?: AbortSignal): Promise<ComplaintListResponse> => {
    const res = await httpClient.get<ComplaintListResponse>(COMPLAINT_ENDPOINTS.list, {
      signal,
      timeout: 15_000,
      query,
    });
    return res.data;
  },

  detail: async (id: string, signal?: AbortSignal): Promise<Complaint> => {
    const res = await httpClient.get<Complaint>(COMPLAINT_ENDPOINTS.detail(id), {
      signal,
      timeout: 10_000,
    });
    return res.data;
  },

  create: async (input: CreateComplaintRequest, signal?: AbortSignal): Promise<Complaint> => {
    const res = await httpClient.post<Complaint>(COMPLAINT_ENDPOINTS.create, input, {
      signal,
      timeout: 15_000,
      headers: { 'Idempotency-Key': generateIdempotencyKey() },
    });
    return res.data;
  },
} as const;
