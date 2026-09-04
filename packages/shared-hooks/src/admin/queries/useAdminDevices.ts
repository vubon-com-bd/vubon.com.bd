/**
 * useAdminDevices Hook
 * অ্যাডমিন ডিভাইস পাওয়ার হুক
 */

import { useQuery } from '@tanstack/react-query';
import { AdminDeviceEndpoints } from '@vubon/shared-api';
import { AdminDevice } from '@vubon/shared-types';

export const useAdminDevices = (deviceEndpoints: AdminDeviceEndpoints, adminId: string) => {
  const {
    data: devices,
    isLoading,
    error,
    refetch,
  } = useQuery<AdminDevice[]>({
    queryKey: ['admin', 'devices', adminId],
    queryFn: () => deviceEndpoints.getDevices(adminId),
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

export const useMyAdminDevices = (deviceEndpoints: AdminDeviceEndpoints) => {
  const {
    data: devices,
    isLoading,
    error,
    refetch,
  } = useQuery<AdminDevice[]>({
    queryKey: ['admin', 'devices', 'me'],
    queryFn: () => deviceEndpoints.getMyDevices(),
    staleTime: 2 * 60 * 1000,
  });

  return {
    devices: devices || [],
    isLoading,
    error,
    refetch,
  };
};
