/**
 * Auth useVerificationStatus Hook
 * প্রমীকরণ ভেরিফিকেশন স্ট্যাটাস হুক
 */

import { useQuery } from '@tanstack/react-query';
import { AuthEndpoints } from '@vubon/shared-api';
import { AUTH_VERIFICATION } from '@vubon/shared-constants';

export const useVerificationStatus = (authEndpoints: AuthEndpoints) => {
  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['auth', 'user', 'verification'],
    queryFn: () => authEndpoints.getCurrentUser(),
    staleTime: 60 * 1000,
  });

  // AUTH_VERIFICATION ব্যবহার করে স্ট্যাটাস চেক করা
  const isVerified = user?.user?.isVerified || false;
  const verificationStatus = isVerified
    ? AUTH_VERIFICATION.STATUS.VERIFIED
    : AUTH_VERIFICATION.STATUS.PENDING;

  return {
    isVerified,
    verificationStatus,
    isLoading,
    error,
    refetch,
    needsVerification: !isVerified,
  };
};
