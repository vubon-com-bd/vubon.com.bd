/**
 * useCreateAdminTeam Hook
 * অ্যাডমিন টিম তৈরি করার হুক
 */

import { useMutation } from '@tanstack/react-query';
import { AdminTeamEndpoints } from '@vubon/shared-api';
import { AdminTeamCreateInput } from '@vubon/shared-types';

export const useCreateAdminTeam = (teamEndpoints: AdminTeamEndpoints) => {
  return useMutation({
    mutationFn: (data: AdminTeamCreateInput) => teamEndpoints.createTeam(data),
  });
};
