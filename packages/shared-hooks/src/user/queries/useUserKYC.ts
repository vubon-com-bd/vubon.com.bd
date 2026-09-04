/**
 * useUserKYC Hook
 * ইউজারের KYC পাওয়ার হুক
 */

import { useQuery } from '@tanstack/react-query';
import { UserKYCEndpoints } from '@vubon/shared-api';
import { UserKYC } from '@vubon/shared-types';

export const useUserKYC = (kycEndpoints: UserKYCEndpoints, userId: string) => {
  const {
    data: kyc,
    isLoading,
    error,
    refetch,
  } = useQuery<UserKYC[]>({
    queryKey: ['user', 'kyc', userId],
    queryFn: () => kycEndpoints.getKYC(userId),
    enabled: !!userId,
    staleTime: 2 * 60 * 1000,
  });

  const { data: status } = useQuery({
    queryKey: ['user', 'kyc', 'status', userId],
    queryFn: () => kycEndpoints.getKYCStatus(userId),
    enabled: !!userId,
    staleTime: 2 * 60 * 1000,
  });

  return {
    kyc: kyc || [],
    status,
    isLoading,
    error,
    refetch,
    isVerified: status?.isVerified || false,
    pendingDocuments: status?.pendingDocuments || [],
  };
};

export const useMyKYC = (kycEndpoints: UserKYCEndpoints) => {
  const {
    data: kyc,
    isLoading,
    error,
    refetch,
  } = useQuery<UserKYC[]>({
    queryKey: ['user', 'kyc', 'me'],
    queryFn: () => kycEndpoints.getMyKYC(),
    staleTime: 2 * 60 * 1000,
  });

  const { data: status } = useQuery({
    queryKey: ['user', 'kyc', 'status', 'me'],
    queryFn: () => kycEndpoints.getKYCStatus('me'),
    staleTime: 2 * 60 * 1000,
  });

  return {
    kyc: kyc || [],
    status,
    isLoading,
    error,
    refetch,
    isVerified: status?.isVerified || false,
    pendingDocuments: status?.pendingDocuments || [],
  };
};
