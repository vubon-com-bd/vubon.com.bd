/**
 * useUserProfile Hook
 * ইউজার প্রোফাইল পাওয়ার হুক
 */

import { useQuery } from '@tanstack/react-query';
import { UserProfileEndpoints } from '@vubon/shared-api';
import { UserProfile } from '@vubon/shared-types';

export const useUserProfile = (profileEndpoints: UserProfileEndpoints, userId: string) => {
  const {
    data: profile,
    isLoading,
    error,
    refetch,
  } = useQuery<UserProfile>({
    queryKey: ['user', 'profile', userId],
    queryFn: () => profileEndpoints.getProfile(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });

  return {
    profile,
    isLoading,
    error,
    refetch,
  };
};

export const useMyProfile = (profileEndpoints: UserProfileEndpoints) => {
  const {
    data: profile,
    isLoading,
    error,
    refetch,
  } = useQuery<UserProfile>({
    queryKey: ['user', 'profile', 'me'],
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
