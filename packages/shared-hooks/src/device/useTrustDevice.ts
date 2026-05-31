/**
 * useTrustDevice Hook - Trust device mutation
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * IMPROVEMENTS:
 * - Uses shared-api instead of raw fetch
 * - Fixed import path for device fingerprint client
 * - Added proper retry logic and error handling
 * - Re-exported types from shared-api to avoid duplication
 * - Added separate query for current trusted device
 * 
 * @module shared-hooks/src/device/useTrustDevice
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getDeviceFingerprintClient } from '@vubon/shared-auth/client';
import { getAxiosClient } from '@vubon/shared-api/client/axios';
import { createDeviceEndpoints } from '@vubon/shared-api/endpoints/device';
import type { ApiResponse } from '@vubon/shared-types';

// ==================== Types (Re-exported from shared-api) ====================

export interface TrustDeviceRequest {
  name?: string;
  trustDurationDays?: number;
  trustLevel?: 'standard' | 'trusted' | 'high_trust';
  isFamilyShared?: boolean;
  familyMemberId?: string;
}

// TrustDeviceResponse type from shared-api (re-export for convenience)
export type { TrustedDevice as TrustDeviceResponse } from '@vubon/shared-api';

export interface UseTrustDeviceOptions {
  onSuccess?: (data: TrustDeviceResponse) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
  /** Whether to invalidate devices after trusting (default: true) */
  invalidateDevices?: boolean;
}

export interface UseTrustDeviceReturn {
  mutate: (data?: TrustDeviceRequest) => void;
  mutateAsync: (data?: TrustDeviceRequest) => Promise<TrustDeviceResponse>;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  data: TrustDeviceResponse | undefined;
}

// ==================== Query Keys ====================

const DEVICES_QUERY_KEY = ['devices'] as const;
const SESSIONS_QUERY_KEY = ['sessions'] as const;
const CURRENT_USER_QUERY_KEY = ['currentUser'] as const;
const CURRENT_TRUSTED_DEVICE_QUERY_KEY = ['currentTrustedDevice'] as const;

// Helper to get endpoints with authenticated client
const getDeviceEndpoints = () => {
  return createDeviceEndpoints(getAxiosClient());
};

// Helper to extract data from API response
const extractData = <T>(response: ApiResponse<T>): T => response.data;

// ==================== Hook ====================

/**
 * Hook for trusting current device
 * Uses shared-api instead of raw fetch for consistent error handling and auth
 * 
 * @example
 * const { mutate: trustDevice, isLoading } = useTrustDevice({
 *   onSuccess: (data) => {
 *     console.log('Device trusted:', data.trustLevel);
 *   }
 * });
 * 
 * trustDevice({ name: 'My Work Laptop', trustDurationDays: 30 });
 */
export const useTrustDevice = (options?: UseTrustDeviceOptions): UseTrustDeviceReturn => {
  const queryClient = useQueryClient();
  const fingerprintClient = getDeviceFingerprintClient();
  const invalidateDevices = options?.invalidateDevices ?? true;
  const endpoints = getDeviceEndpoints();

  const mutation = useMutation({
    mutationFn: async (request: TrustDeviceRequest = {}): Promise<TrustDeviceResponse> => {
      // Get device fingerprint and info from client
      const deviceInfo = fingerprintClient.getDeviceInfo();
      const deviceId = fingerprintClient.getPersistedDeviceId();
      const fingerprint = fingerprintClient.getFingerprint();
      
      const response = await endpoints.registerDevice({
        deviceInfo,
        fingerprint: {
          hash: fingerprint.hash,
          components: fingerprint.components,
          version: fingerprint.version,
        },
        name: request.name,
        trustDevice: true,
        trustDurationDays: request.trustDurationDays,
        isFamilyShared: request.isFamilyShared,
        familyMemberId: request.familyMemberId,
      });
      
      return extractData(response);
    },
    onSuccess: (data) => {
      if (invalidateDevices) {
        queryClient.invalidateQueries({ queryKey: DEVICES_QUERY_KEY });
        queryClient.invalidateQueries({ queryKey: CURRENT_TRUSTED_DEVICE_QUERY_KEY });
      }
      
      queryClient.invalidateQueries({ queryKey: SESSIONS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: CURRENT_USER_QUERY_KEY });
      
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error as Error);
    },
    onSettled: () => {
      options?.onSettled?.();
    },
    retry: (failureCount, error) => {
      // Don't retry on 4xx client errors
      if (error instanceof Error && (error.message.includes('400') || error.message.includes('401'))) {
        return false;
      }
      return failureCount < 2;
    },
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error as Error | null,
    data: mutation.data,
  };
};

/**
 * Hook for updating trust level of an existing device
 * Uses shared-api instead of raw fetch
 * 
 * @example
 * const { mutate: updateDeviceTrust } = useUpdateDeviceTrust({
 *   onSuccess: () => {
 *     console.log('Device trust level updated');
 *   }
 * });
 * 
 * updateDeviceTrust({
 *   deviceId: 'device-id-123',
 *   trustLevel: 'high_trust',
 *   durationDays: 60
 * });
 */
export const useUpdateDeviceTrust = (options?: UseTrustDeviceOptions) => {
  const queryClient = useQueryClient();
  const endpoints = getDeviceEndpoints();

  const mutation = useMutation({
    mutationFn: async ({
      deviceId,
      trustLevel,
      durationDays,
      reason,
    }: {
      deviceId: string;
      trustLevel: 'standard' | 'trusted' | 'high_trust';
      durationDays?: number;
      reason?: string;
    }): Promise<TrustDeviceResponse> => {
      const response = await endpoints.updateDeviceTrust(deviceId, {
        trustLevel,
        durationDays,
        reason,
      });
      return extractData(response);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DEVICES_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: CURRENT_TRUSTED_DEVICE_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: SESSIONS_QUERY_KEY });
      options?.onSuccess?.(undefined as never);
    },
    onError: (error) => {
      options?.onError?.(error as Error);
    },
    retry: (failureCount, error) => {
      if (error instanceof Error && (error.message.includes('400') || error.message.includes('401'))) {
        return false;
      }
      return failureCount < 2;
    },
  });

  return mutation;
};

/**
 * Hook for fetching current trusted device
 * Uses shared-api with proper caching
 * 
 * @example
 * const { data: currentDevice, isLoading } = useCurrentTrustedDevice();
 * 
 * if (currentDevice?.trustLevel === 'trusted') {
 *   console.log('Current device is trusted');
 * }
 */
export const useCurrentTrustedDevice = () => {
  const endpoints = getDeviceEndpoints();

  return useQuery({
    queryKey: CURRENT_TRUSTED_DEVICE_QUERY_KEY,
    queryFn: async (): Promise<TrustDeviceResponse | null> => {
      try {
        const response = await endpoints.getCurrentDevice();
        return extractData(response);
      } catch (error) {
        // If device not found, return null
        if (error instanceof Error && error.message.includes('404')) {
          return null;
        }
        throw error;
      }
    },
    staleTime: 30 * 1000, // 30 seconds
    retry: (failureCount, error) => {
      if (error instanceof Error && error.message.includes('404')) {
        return false;
      }
      return failureCount < 2;
    },
  });
};

/**
 * Hook for checking if current device is trusted
 * Uses useCurrentTrustedDevice for better performance
 * 
 * @example
 * const { isTrusted, trustLevel, isLoading } = useIsCurrentDeviceTrusted();
 * 
 * if (!isTrusted && !isLoading) {
 *   return <TrustDevicePrompt />;
 * }
 */
export const useIsCurrentDeviceTrusted = () => {
  const { data: currentDevice, isLoading } = useCurrentTrustedDevice();
  
  return {
    isTrusted: currentDevice?.trustLevel !== 'untrusted',
    trustLevel: currentDevice?.trustLevel,
    deviceId: currentDevice?.deviceId,
    deviceName: currentDevice?.name,
    isLoading,
  };
};

// ==================== Type Exports ====================

export type {
  UseTrustDeviceOptions,
  UseTrustDeviceReturn,
  TrustDeviceRequest,
  TrustDeviceResponse,
};
