import { httpClient } from '../../../common/client/client.factory';
import { generateIdempotencyKey } from '../../../common/idempotency/idempotency-key';
import { TEAM_ENDPOINTS } from './team.endpoints';
import type { InviteTeamRequest, TeamListResponse, VendorTeamMember } from './team.types';

export const teamApi = {
  list: async (vendorId: string, signal?: AbortSignal): Promise<TeamListResponse> => {
    const res = await httpClient.get<TeamListResponse>(TEAM_ENDPOINTS.list(vendorId), {
      signal,
      timeout: 10_000,
    });
    return res.data;
  },

  invite: async (
    vendorId: string,
    input: InviteTeamRequest,
    signal?: AbortSignal
  ): Promise<VendorTeamMember> => {
    const res = await httpClient.post<VendorTeamMember>(TEAM_ENDPOINTS.invite(vendorId), input, {
      signal,
      timeout: 15_000,
      headers: { 'Idempotency-Key': generateIdempotencyKey() },
    });
    return res.data;
  },
} as const;
