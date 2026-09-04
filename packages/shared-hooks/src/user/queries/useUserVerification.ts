/**
 * useUserVerification Hook
 * ইউজারের একটি ভেরিফিকেশন পাওয়ার হুক
 */

import { useQuery } from '@tanstack/react-query';
import { UserVerificationEndpoints } from '@vubon/shared-api';
import { UserVerification } from '@vubon/shared-types';

export const useUserVerification = (
  verificationEndpoints: UserVerificationEndpoints,
  verificationId: string
) => {
  const {
    data: verification,
    isLoading,
    error,
    refetch,
  } = useQuery<UserVerification>({
    queryKey: ['user', 'verification', verificationId],
    queryFn: () => verificationEndpoints.getVerification(verificationId),
    enabled: !!verificationId,
    staleTime: 2 * 60 * 1000,
  });

  return {
    verification,
    isLoading,
    error,
    refetch,
  };
};
