/**
 * useAdminProfile Hook
 * অ্যাডমিন প্রোফাইল পাওয়ার হুক
 */

import { useQuery } from '@tanstack/react-query';
import { AdminProfileEndpoints } from '@vubon/shared-api';
import { AdminProfile } from '@vubon/shared-types';

export const useAdminProfile = (profileEndpoints: AdminProfileEndpoints, adminId: string) => {
  const {
    data: profile,
    isLoading,
    error,
    refetch,
  } = useQuery<AdminProfile>({
    queryKey: ['admin', 'profile', adminId],
    queryFn: () => profileEndpoints.getProfile(adminId),
    enabled: !!adminId,
    staleTime: 5 * 60 * 1000,
  });

  return {
    profile,
    isLoading,
    error,
    refetch,
  };
};

export const useMyAdminProfile = (profileEndpoints: AdminProfileEndpoints) => {
  const {
    data: profile,
    isLoading,
    error,
    refetch,
  } = useQuery<AdminProfile>({
    queryKey: ['admin', 'profile', 'me'],
    queryFn: () => profileEndpoints.getMyProfile(),
    staleTime: 5 * 60 * 1000,
  });

  return {
    profile,
    isLoading,
    error,
    refetch,
  };
};
