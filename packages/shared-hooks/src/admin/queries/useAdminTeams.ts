/**
 * useAdminTeams Hook
 * অ্যাডমিন টিম পাওয়ার হুক
 */

import { useQuery } from '@tanstack/react-query';
import { AdminTeamEndpoints } from '@vubon/shared-api';
import { AdminTeam } from '@vubon/shared-types';

export interface UseAdminTeamsOptions {
  page?: number;
  limit?: number;
  department?: string;
  status?: string;
}

export const useAdminTeams = (
  teamEndpoints: AdminTeamEndpoints,
  options: UseAdminTeamsOptions = {}
) => {
  const { page = 1, limit = 10, department, status } = options;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['admin', 'teams', { page, limit, department, status }],
    queryFn: () => teamEndpoints.getTeams({ page, limit, department, status }),
    staleTime: 2 * 60 * 1000,
  });

  return {
    teams: data?.teams || [],
    total: data?.total || 0,
    page: data?.page || page,
    limit: data?.limit || limit,
    isLoading,
    error,
    refetch,
  };
};

export const useAdminTeam = (teamEndpoints: AdminTeamEndpoints, teamId: string) => {
  const {
    data: team,
    isLoading,
    error,
    refetch,
  } = useQuery<AdminTeam>({
    queryKey: ['admin', 'team', teamId],
    queryFn: () => teamEndpoints.getTeam(teamId),
    enabled: !!teamId,
    staleTime: 5 * 60 * 1000,
  });

  return {
    team,
    isLoading,
    error,
    refetch,
  };
};
