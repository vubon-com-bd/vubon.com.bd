/**
 * useDeleteAdminTeam Hook
 * অ্যাডমিন টিম ডিলিট করার হুক
 */

import { useMutation } from '@tanstack/react-query';
import { AdminTeamEndpoints } from '@vubon/shared-api';

export const useDeleteAdminTeam = (teamEndpoints: AdminTeamEndpoints) => {
  return useMutation({
    mutationFn: (teamId: string) => teamEndpoints.deleteTeam(teamId),
  });
};
