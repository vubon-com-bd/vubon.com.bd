/**
 * useUserVerifications Hook
 * ইউজারের সব ভেরিফিকেশন পাওয়ার হুক
 */

import { useQuery } from '@tanstack/react-query';
import { UserVerificationEndpoints } from '@vubon/shared-api';
import { UserVerification } from '@vubon/shared-types';

export const useUserVerifications = (
  verificationEndpoints: UserVerificationEndpoints,
  userId: string
) => {
  const {
    data: verifications,
    isLoading,
    error,
    refetch,
  } = useQuery<UserVerification[]>({
    queryKey: ['user', 'verifications', userId],
    queryFn: () => verificationEndpoints.getVerifications(userId),
    enabled: !!userId,
    staleTime: 2 * 60 * 1000,
  });

  return {
    verifications: verifications || [],
    isLoading,
    error,
    refetch,
  };
};

export const useMyVerifications = (verificationEndpoints: UserVerificationEndpoints) => {
  const {
    data: verifications,
    isLoading,
    error,
    refetch,
  } = useQuery<UserVerification[]>({
    queryKey: ['user', 'verifications', 'me'],
    queryFn: () => verificationEndpoints.getMyVerifications(),
    staleTime: 2 * 60 * 1000,
  });

  return {
    verifications: verifications || [],
    isLoading,
    error,
    refetch,
  };
};
