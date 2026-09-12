import { ApiClient } from '../client/api-client';
import { APPROVAL_ENDPOINTS } from '../endpoints/approval.endpoints';

export const approvalApi = {
  list: (): Promise<unknown> => ApiClient.get(APPROVAL_ENDPOINTS.LIST),
  create: (body: unknown): Promise<unknown> => ApiClient.post(APPROVAL_ENDPOINTS.CREATE, body),
  approve: (approvalId: string, notes?: string): Promise<unknown> =>
    ApiClient.post(APPROVAL_ENDPOINTS.APPROVE(approvalId), { notes }),
  reject: (approvalId: string, notes: string): Promise<unknown> =>
    ApiClient.post(APPROVAL_ENDPOINTS.REJECT(approvalId), { notes }),
  pending: (): Promise<unknown[]> => ApiClient.get(APPROVAL_ENDPOINTS.PENDING),
} as const;
