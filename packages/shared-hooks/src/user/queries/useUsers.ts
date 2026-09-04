/**
 * useUsers Hook
 * ইউজার লিস্ট পাওয়ার হুক
 */

import { useQuery } from '@tanstack/react-query';
import { UserEndpoints } from '@vubon/shared-api';
import { User } from '@vubon/shared-types';

export interface UseUsersOptions {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  enabled?: boolean;
}

export const useUsers = (userEndpoints: UserEndpoints, options: UseUsersOptions = {}) => {
  const { page = 1, limit = 10, search, status, enabled = true } = options;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['users', 'list', { page, limit, search, status }],
    queryFn: () => userEndpoints.getUsers({ page, limit, search, status }),
    enabled,
    staleTime: 2 * 60 * 1000,
  });

  // User টাইপ ব্যবহার করে রিটার্ন টাইপ নির্ধারণ
  const users: User[] = data?.users || [];

  return {
    users,
    total: data?.total || 0,
    page: data?.page || page,
    limit: data?.limit || limit,
    isLoading,
    error,
    refetch,
  };
};
