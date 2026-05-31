/**
 * useDevices Hook - Trusted devices query
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-hooks/src/device/useDevices
 * 
 * RULES:
 * ✅ ONLY query orchestration - NO business logic
 * ✅ NO device fingerprinting engine (handled by backend)
 * ✅ Uses shared-api (not raw fetch)
 * ✅ React Query integration with proper caching
 * ✅ TypeScript strict
 */

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAxiosClient } from '@vubon/shared-api/client/axios';
import { createDeviceEndpoints } from '@vubon/shared-api/endpoints/device';
import type { TrustedDevice as ApiTrustedDevice, DeviceInfo as ApiDeviceInfo } from '@vubon/shared-api';
import type { ApiResponse } from '@vubon/shared-types';

// ==================== Types ====================

// Re-export types from shared-api for consistency
export type DeviceInfo = ApiDeviceInfo;
export type TrustedDevice = ApiTrustedDevice;

export interface UseDevicesOptions {
  enabled?: boolean;
  staleTime?: number; // milliseconds
  includeExpired?: boolean;
  refetchInterval?: number;
}

export interface UseDevicesReturn {
  data: TrustedDevice[] | undefined;
  devices: TrustedDevice[];
  currentDevice: TrustedDevice | undefined;
  trustedDevices: TrustedDevice[];
  untrustedDevices: TrustedDevice[];
  familySharedDevices: TrustedDevice[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  isFetching: boolean;
  refetch: () => Promise<void>;
}

// ==================== Query Keys ====================

const DEVICES_QUERY_KEY = ['devices'] as const;

// Helper to get endpoints with authenticated client
const getDeviceEndpoints = () => {
  return createDeviceEndpoints(getAxiosClient());
};

// Helper to extract data from API response
const extractData = <T>(response: ApiResponse<T>): T => response.data;

// ==================== Hook ====================

/**
 * Hook for fetching trusted devices
 * Uses shared-api instead of raw fetch for consistent error handling and auth
 * 
 * @example
 * const { devices, currentDevice, trustedDevices, isLoading, refetch } = useDevices({
 *   staleTime: 30 * 1000, // 30 seconds
 * });
 * 
 * if (isLoading) return <LoadingSpinner />;
 * 
 * return (
 *   <div>
 *     <p>Current device: {currentDevice?.deviceInfo.browser}</p>
 *     <p>Trusted devices: {trustedDevices.length}</p>
 *     {devices.map(device => (
 *       <DeviceCard key={device.id} device={device} />
 *     ))}
 *   </div>
 * );
 */
export const useDevices = (options?: UseDevicesOptions): UseDevicesReturn => {
  const includeExpired = options?.includeExpired ?? false;
  const endpoints = getDeviceEndpoints();

  const query = useQuery({
    queryKey: [...DEVICES_QUERY_KEY, { includeExpired }],
    queryFn: async (): Promise<TrustedDevice[]> => {
      const response = await endpoints.getDevices(includeExpired);
      return extractData(response);
    },
    staleTime: options?.staleTime ?? 30 * 1000, // 30 seconds default
    refetchInterval: options?.refetchInterval,
    enabled: options?.enabled ?? true,
    retry: (failureCount, error) => {
      // Don't retry on authentication errors
      if (error instanceof Error && error.message.includes('401')) {
        return false;
      }
      return failureCount < 2;
    },
  });

  const devices = query.data || [];
  const currentDevice = devices.find((d) => d.isCurrent);
  const trustedDevices = devices.filter((d) => d.trustLevel !== 'untrusted');
  const untrustedDevices = devices.filter((d) => d.trustLevel === 'untrusted');
  const familySharedDevices = devices.filter((d) => d.isFamilyShared === true);

  return {
    data: query.data,
    devices,
    currentDevice,
    trustedDevices,
    untrustedDevices,
    familySharedDevices,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error as Error | null,
    isFetching: query.isFetching,
    refetch: async () => {
      await query.refetch();
    },
  };
};

/**
 * Hook for fetching a single device by ID
 * Uses shared-api instead of raw fetch
 * 
 * @example
 * const { data: device, isLoading } = useDeviceById('device-id-123');
 */
export const useDeviceById = (deviceId: string, options?: UseDevicesOptions) => {
  const endpoints = getDeviceEndpoints();

  return useQuery({
    queryKey: [...DEVICES_QUERY_KEY, deviceId],
    queryFn: async (): Promise<TrustedDevice> => {
      const response = await endpoints.getDeviceById(deviceId);
      return extractData(response);
    },
    enabled: !!deviceId && (options?.enabled ?? true),
    staleTime: options?.staleTime ?? 60 * 1000, // 1 minute
  });
};

/**
 * Hook for device statistics
 * Uses shared-api instead of raw fetch
 * 
 * @example
 * const { data: stats, isLoading } = useDeviceStatistics();
 */
export const useDeviceStatistics = () => {
  const endpoints = getDeviceEndpoints();

  return useQuery({
    queryKey: ['deviceStatistics'],
    queryFn: async () => {
      const response = await endpoints.getDeviceStatistics();
      return extractData(response);
    },
    staleTime: 60 * 1000, // 1 minute
  });
};

/**
 * Hook for checking if a device is trusted
 * 
 * @example
 * const { isTrusted, device, isLoading } = useIsDeviceTrusted(deviceId);
 */
export const useIsDeviceTrusted = (deviceId: string) => {
  const { devices, isLoading } = useDevices();
  
  const device = devices.find((d) => d.deviceId === deviceId);
  const isTrusted = device?.trustLevel !== 'untrusted';
  
  return { isTrusted, device, isLoading };
};

// ==================== Type Exports ====================

export type { UseDevicesOptions, UseDevicesReturn, TrustedDevice, DeviceInfo };
