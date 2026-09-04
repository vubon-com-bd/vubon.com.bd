/**
 * useUpdateAdminTeam Hook
 * অ্যাডমিন টিম আপডেট করার হুক
 */

import { useMutation } from '@tanstack/react-query';
import { AdminTeamEndpoints } from '@vubon/shared-api';
import { AdminTeamUpdateInput } from '@vubon/shared-types';

export const useUpdateAdminTeam = (teamEndpoints: AdminTeamEndpoints) => {
  return useMutation({
    mutationFn: ({ teamId, data }: { teamId: string; data: AdminTeamUpdateInput }) =>
      teamEndpoints.updateTeam(teamId, data),
  });
};
