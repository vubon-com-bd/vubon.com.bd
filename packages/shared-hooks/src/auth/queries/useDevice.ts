/**
 * Auth useDevice Hook
 * প্রমীকরণ ডিভাইস হুক
 */

import { useQuery } from '@tanstack/react-query';
import { AuthDeviceEndpoints } from '@vubon/shared-api';
import { AUTH_DEVICE } from '@vubon/shared-constants';

export const useDevice = (deviceEndpoints: AuthDeviceEndpoints, deviceId: string) => {
  const {
    data: device,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['auth', 'device', deviceId],
    queryFn: () => deviceEndpoints.getDevice(deviceId),
    enabled: !!deviceId,
    staleTime: 60 * 1000,
  });

  const isTrusted = device?.status === AUTH_DEVICE.STATUS.TRUSTED;

  return {
    device,
    isTrusted,
    isLoading,
    error,
    refetch,
  };
};
