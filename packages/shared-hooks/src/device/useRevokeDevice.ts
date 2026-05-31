/**
 * useRevokeDevice Hook - Revoke device mutation
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module shared-hooks/src/device/useRevokeDevice
 *
 * RULES:
 * ✅ ONLY mutation orchestration - NO business logic
 * ✅ NO security engine (handled by backend)
 * ✅ Uses shared-api (not raw fetch)
 * ✅ React Query integration with cache invalidation
 * ✅ TypeScript strict
 */

import { useMutation, useQueryClient, UseMutationOptions } from '@tanstack/react-query';
import { getAxiosClient } from '@vubon/shared-api/client/axios';
import { createDeviceEndpoints } from '@vubon/shared-api/endpoints/device';
import type { ApiResponse } from '@vubon/shared-types';

// ==================== Types ====================

export interface RevokeDeviceRequest {
  deviceId: string;
  reason?: string;
  revokeTrustOnly?: boolean;
}

export interface RevokeDeviceResponse {
  success: boolean;
  message: string;
  sessionsRevoked?: number;
  messageBn?: string; // বাংলাদেশ স্পেসিফিক
}

export type UseRevokeDeviceOptions = Omit<
  UseMutationOptions<RevokeDeviceResponse, Error, RevokeDeviceRequest>,
  'mutationFn'
>;

export interface RevokeMultipleDevicesRequest {
  deviceIds: string[];
  reason?: string;
}

export interface RevokeMultipleDevicesResponse {
  success: boolean;
  revokedCount: number;
  failedIds?: Array<{ deviceId: string; reason: string }>;
}

export type UseRevokeMultipleDevicesOptions = Omit<
  UseMutationOptions<RevokeMultipleDevicesResponse, Error, RevokeMultipleDevicesRequest>,
  'mutationFn'
>;

export interface UseRevokeDeviceReturn {
  mutate: (deviceId: string, reason?: string, revokeTrustOnly?: boolean) => void;
  mutateAsync: (deviceId: string, reason?: string, revokeTrustOnly?: boolean) => Promise<RevokeDeviceResponse>;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  data: RevokeDeviceResponse | undefined;
}

// ==================== Query Keys ====================

const DEVICES_QUERY_KEY = ['devices'] as const;
const SESSIONS_QUERY_KEY = ['sessions'] as const;
const CURRENT_USER_QUERY_KEY = ['currentUser'] as const;
const DEVICE_STATISTICS_QUERY_KEY = ['deviceStatistics'] as const;

// Helper to get endpoints with authenticated client
const getDeviceEndpoints = () => {
  return createDeviceEndpoints(getAxiosClient());
};

// Helper to extract data from API response
const extractData = <T>(response: ApiResponse<T>): T => response.data;

// Helper to check if error is non-retryable
const isNonRetryableError = (error: Error): boolean => {
  return error.message.includes('400') || error.message.includes('401') || error.message.includes('403');
};

// ==================== Hooks ====================

/**
 * Hook for revoking a trusted device
 * Uses shared-api instead of raw fetch for consistent error handling and auth
 *
 * @example
 * const { mutate: revokeDevice, isLoading } = useRevokeDevice({
 *   onSuccess: (data) => {
 *     console.log('Device revoked:', data.message);
 *   },
 *   onError: (error) => {
 *     console.error('Failed to revoke device:', error.message);
 *   }
 * });
 *
 * // Revoke device
 * revokeDevice('device-id-123', 'Lost my phone');
 *
 * // Revoke trust only (keep device but remove trust)
 * revokeDevice('device-id-123', 'Security check', true);
 */
export const useRevokeDevice = (options?: UseRevokeDeviceOptions): UseRevokeDeviceReturn => {
  const queryClient = useQueryClient();
  const endpoints = getDeviceEndpoints();

  const mutation = useMutation({
    mutationFn: async ({ deviceId, reason, revokeTrustOnly }: RevokeDeviceRequest): Promise<RevokeDeviceResponse> => {
      let response;
      if (revokeTrustOnly) {
        // Use revokeSessions endpoint to revoke sessions without deleting device
        const result = await endpoints.revokeDeviceSessions(deviceId);
        response = {
          success: result.success,
          message: 'Device trust revoked successfully',
          sessionsRevoked: result.sessionsRevoked,
        };
      } else {
        // Full device removal
        const result = await endpoints.removeDevice(deviceId, reason);
        response = {
          success: result.success,
          message: result.message,
          sessionsRevoked: result.sessionsRevoked,
        };
      }
      return response;
    },
    onSuccess: (data) => {
      // Invalidate devices cache
      queryClient.invalidateQueries({ queryKey: DEVICES_QUERY_KEY });

      // Invalidate sessions (device revocation may affect active sessions)
      queryClient.invalidateQueries({ queryKey: SESSIONS_QUERY_KEY });

      // Invalidate user data (trust level may have changed)
      queryClient.invalidateQueries({ queryKey: CURRENT_USER_QUERY_KEY });

      // Invalidate device statistics
      queryClient.invalidateQueries({ queryKey: DEVICE_STATISTICS_QUERY_KEY });

      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error as Error);
    },
    onSettled: () => {
      options?.onSettled?.();
    },
    retry: (failureCount, error) => {
      if (isNonRetryableError(error as Error)) {
        return false;
      }
      return failureCount < 2;
    },
  });

  // Wrapper function for easier parameter handling
  const mutate = (deviceId: string, reason?: string, revokeTrustOnly?: boolean) => {
    mutation.mutate({ deviceId, reason, revokeTrustOnly });
  };

  const mutateAsync = (deviceId: string, reason?: string, revokeTrustOnly?: boolean) => {
    return mutation.mutateAsync({ deviceId, reason, revokeTrustOnly });
  };

  return {
    mutate,
    mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error as Error | null,
    data: mutation.data,
  };
};

/**
 * Hook for revoking trust from a device (without deleting the device)
 * Uses shared-api instead of raw fetch
 *
 * @example
 * const { mutate: revokeDeviceTrust, isLoading } = useRevokeDeviceTrust({
 *   onSuccess: (data) => {
 *     console.log('Device trust revoked:', data.message);
 *   }
 * });
 *
 * revokeDeviceTrust({ deviceId: 'device-id-123', reason: 'Suspicious activity detected' });
 */
export const useRevokeDeviceTrust = (options?: UseRevokeDeviceOptions) => {
  const queryClient = useQueryClient();
  const endpoints = getDeviceEndpoints();

  const mutation = useMutation({
    mutationFn: async ({ deviceId, reason }: { deviceId: string; reason?: string }): Promise<RevokeDeviceResponse> => {
      const result = await endpoints.revokeDeviceSessions(deviceId, reason);
      return {
        success: result.success,
        message: 'Device trust revoked successfully',
        sessionsRevoked: result.sessionsRevoked,
      };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: DEVICES_QUERY_KEY });
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
      if (isNonRetryableError(error as Error)) {
        return false;
      }
      return failureCount < 2;
    },
  });

  return mutation;
};

/**
 * Hook for revoking multiple devices at once
 * Uses shared-api instead of raw fetch
 *
 * @example
 * const { mutate: revokeMultipleDevices, isLoading } = useRevokeMultipleDevices({
 *   onSuccess: (data) => {
 *     console.log(`Revoked ${data.revokedCount} devices`);
 *   }
 * });
 *
 * revokeMultipleDevices({
 *   deviceIds: ['device-1', 'device-2'],
 *   reason: 'Security audit'
 * });
 */
export const useRevokeMultipleDevices = (options?: UseRevokeMultipleDevicesOptions) => {
  const queryClient = useQueryClient();
  const endpoints = getDeviceEndpoints();

  const mutation = useMutation({
    mutationFn: async ({ deviceIds, reason }: RevokeMultipleDevicesRequest): Promise<RevokeMultipleDevicesResponse> => {
      // Execute revoke operations in parallel
      const results = await Promise.allSettled(
        deviceIds.map(deviceId => endpoints.removeDevice(deviceId, reason))
      );

      const successful = results.filter(r => r.status === 'fulfilled').length;
      const failed = results.filter(r => r.status === 'rejected');
      const failedIds: Array<{ deviceId: string; reason: string }> = [];

      // Extract failed device info
      results.forEach((result, index) => {
        if (result.status === 'rejected') {
          failedIds.push({
            deviceId: deviceIds[index]!,
            reason: (result.reason as Error)?.message || 'Unknown error',
          });
        }
      });

      if (failedIds.length > 0 && successful === 0) {
        throw new Error(`Failed to revoke ${failedIds.length} device(s)`);
      }

      return {
        success: successful > 0,
        revokedCount: successful,
        failedIds: failedIds.length > 0 ? failedIds : undefined,
      };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: DEVICES_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: SESSIONS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: CURRENT_USER_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: DEVICE_STATISTICS_QUERY_KEY });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error as Error);
    },
    onSettled: () => {
      options?.onSettled?.();
    },
    retry: (failureCount, error) => {
      if (isNonRetryableError(error as Error)) {
        return false;
      }
      return failureCount < 1; // Only retry once for bulk operations
    },
  });

  return mutation;
};

/**
 * Hook for checking if a device can be revoked
 * (prevents revoking if it would leave the user without any trusted device for sensitive operations)
 *
 * @example
 * const { canRevoke, reason } = useCanRevokeDevice();
 *
 * if (!canRevoke('device-id-123')) {
 *   console.log('Cannot revoke:', reason);
 * }
 */
export const useCanRevokeDevice = () => {
  const queryClient = useQueryClient();

  const canRevoke = (deviceId: string): boolean => {
    const devices = queryClient.getQueryData<Array<{ deviceId: string; isCurrent: boolean; trustLevel: string }>>(DEVICES_QUERY_KEY);
    if (!devices) return true;

    const targetDevice = devices.find(d => d.deviceId === deviceId);
    if (!targetDevice) return true;

    // Don't allow revoking the current device (would logout immediately)
    if (targetDevice.isCurrent) {
      return false;
    }

    // Check if there's at least one other trusted device
    const otherTrustedDevices = devices.filter(
      d => d.deviceId !== deviceId && d.trustLevel !== 'untrusted'
    );

    return otherTrustedDevices.length > 0;
  };

  const getRevokeRestrictionReason = (deviceId: string): string | null => {
    const devices = queryClient.getQueryData<Array<{ deviceId: string; isCurrent: boolean; trustLevel: string }>>(DEVICES_QUERY_KEY);
    if (!devices) return null;

    const targetDevice = devices.find(d => d.deviceId === deviceId);
    if (!targetDevice) return null;

    if (targetDevice.isCurrent) {
      return 'Cannot revoke the current device. Please log out instead.';
    }

    const otherTrustedDevices = devices.filter(
      d => d.deviceId !== deviceId && d.trustLevel !== 'untrusted'
    );

    if (otherTrustedDevices.length === 0) {
      return 'Cannot revoke the only trusted device. Please trust another device first.';
    }

    return null;
  };

  return {
    canRevoke,
    getRevokeRestrictionReason,
  };
};

// ==================== Type Exports ====================

export type {
  UseRevokeDeviceOptions,
  UseRevokeDeviceReturn,
  UseRevokeMultipleDevicesOptions,
  RevokeDeviceRequest,
  RevokeDeviceResponse,
  RevokeMultipleDevicesRequest,
  RevokeMultipleDevicesResponse,
};
