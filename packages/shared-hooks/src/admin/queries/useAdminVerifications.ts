/**
 * useAdminVerifications Hook
 * অ্যাডমিন ভেরিফিকেশন পাওয়ার হুক
 */

import { useQuery } from '@tanstack/react-query';
import { AdminVerificationEndpoints } from '@vubon/shared-api';
import { AdminVerification } from '@vubon/shared-types';

export const useAdminVerifications = (
  verificationEndpoints: AdminVerificationEndpoints,
  adminId: string
) => {
  const {
    data: verifications,
    isLoading,
    error,
    refetch,
  } = useQuery<AdminVerification[]>({
    queryKey: ['admin', 'verifications', adminId],
    queryFn: () => verificationEndpoints.getVerifications(adminId),
    enabled: !!adminId,
    staleTime: 2 * 60 * 1000,
  });

  return {
    verifications: verifications || [],
    isLoading,
    error,
    refetch,
  };
};

export const useMyAdminVerifications = (verificationEndpoints: AdminVerificationEndpoints) => {
  const {
    data: verifications,
    isLoading,
    error,
    refetch,
  } = useQuery<AdminVerification[]>({
    queryKey: ['admin', 'verifications', 'me'],
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
