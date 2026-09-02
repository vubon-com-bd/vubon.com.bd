/**
 * Auth useDevices Hook
 * প্রমীকরণ ডিভাইস লিস্ট হুক
 */

import { useQuery } from '@tanstack/react-query';
import { AuthDeviceEndpoints } from '@vubon/shared-api';

export const useDevices = (deviceEndpoints: AuthDeviceEndpoints) => {
  const {
    data: devices,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['auth', 'devices'],
    queryFn: () => deviceEndpoints.getDevices(),
    staleTime: 60 * 1000,
  });

  const trustedDevices = devices?.filter((d) => d.status === 'trusted') || [];

  return {
    devices: devices || [],
    trustedDevices,
    deviceCount: devices?.length || 0,
    trustedCount: trustedDevices.length,
    isLoading,
    error,
    refetch,
  };
};
