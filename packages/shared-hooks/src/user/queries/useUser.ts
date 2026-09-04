/**
 * useUser Hook
 * ইউজার ডেটা পাওয়ার হুক
 */

import { useQuery } from '@tanstack/react-query';
import { UserEndpoints } from '@vubon/shared-api';
import { User } from '@vubon/shared-types';

export const useUser = (userEndpoints: UserEndpoints, userId: string) => {
  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useQuery<User>({
    queryKey: ['user', 'detail', userId],
    queryFn: () => userEndpoints.getUser(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });

  return {
    user,
    isLoading,
    error,
    refetch,
  };
};
