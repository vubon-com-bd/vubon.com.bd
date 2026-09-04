/**
 * useAdminBiometric Hook
 * অ্যাডমিন বায়োমেট্রিক পাওয়ার হুক
 */

import { useQuery } from '@tanstack/react-query';
import { AdminBiometricEndpoints } from '@vubon/shared-api';
import { AdminBiometric } from '@vubon/shared-types';

export const useAdminBiometric = (biometricEndpoints: AdminBiometricEndpoints, adminId: string) => {
  const {
    data: devices,
    isLoading,
    error,
    refetch,
  } = useQuery<AdminBiometric[]>({
    queryKey: ['admin', 'biometric', adminId],
    queryFn: () => biometricEndpoints.getBiometricDevices(adminId),
    enabled: !!adminId,
    staleTime: 2 * 60 * 1000,
  });

  return {
    devices: devices || [],
    isLoading,
    error,
    refetch,
  };
};

export const useMyAdminBiometric = (biometricEndpoints: AdminBiometricEndpoints) => {
  const {
    data: devices,
    isLoading,
    error,
    refetch,
  } = useQuery<AdminBiometric[]>({
    queryKey: ['admin', 'biometric', 'me'],
    queryFn: () => biometricEndpoints.getMyBiometricDevices(),
    staleTime: 2 * 60 * 1000,
  });

  return {
    devices: devices || [],
    isLoading,
    error,
    refetch,
  };
};
