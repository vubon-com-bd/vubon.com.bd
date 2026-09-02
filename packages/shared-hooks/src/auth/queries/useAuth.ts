/**
 * Auth useAuth Hook
 * প্রমীকরণ অথ হুক
 */

import { useQuery } from '@tanstack/react-query';
import { AuthEndpoints } from '@vubon/shared-api';
import { AUTH } from '@vubon/shared-constants';

export const useAuth = (authEndpoints: AuthEndpoints) => {
  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['auth', 'user'],
    queryFn: () => authEndpoints.getCurrentUser(),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  const { data: isAuthenticated } = useQuery({
    queryKey: ['auth', 'status'],
    queryFn: () => authEndpoints.isAuthenticated(),
    staleTime: 60 * 1000,
    retry: false,
  });

  // AUTH ব্যবহার করে স্ট্যাটাস চেক করা
  const authStatus = isAuthenticated?.authenticated
    ? AUTH.STATUS.AUTHENTICATED
    : AUTH.STATUS.UNAUTHENTICATED;

  return {
    user: user?.user || null,
    isAuthenticated: isAuthenticated?.authenticated || false,
    authStatus,
    isLoading,
    error,
    refetch,
  };
};
