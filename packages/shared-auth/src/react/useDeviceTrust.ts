/**
 * useDeviceTrust Hook - Device trust management with shared-api integration
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-auth/src/react/useDeviceTrust
 * 
 * RULES:
 * ✅ ONLY device trust UI abstraction - NO fingerprint generation
 * ✅ Pure React hook for trust device management
 * ✅ TypeScript strict
 */

import React from 'react';
import { useAuthContext } from './AuthContext';
import { getAxiosClient } from '@vubon/shared-api/client/axios';
import { createDeviceEndpoints } from '@vubon/shared-api/endpoints/device';
import { withRetry, DEFAULT_RETRY_CONFIG } from '@vubon/shared-api/client/retry';
import { env } from '@vubon/shared-config/env';

// ==================== Types ====================

export interface TrustedDevice {
  id: string;
  deviceId: string;
  deviceName: string | null;
  deviceType: string;
  trustLevel: 'untrusted' | 'standard' | 'trusted' | 'high_trust' | 'maximum_trust';
  trustScore: number;
  trustedAt: string;
  lastUsedAt: string;
  expiresAt: string | null;
  isCurrent: boolean;
  isFamilyShared: boolean;
  familyMemberName?: string;
}

export interface TrustDeviceParams {
  deviceId: string;
  trustLevel?: 'standard' | 'trusted' | 'high_trust';
  durationDays?: number;
  reason?: string;
}

export interface DeviceFingerprint {
  hash: string;
  components: string[];
  version: number;
}

export interface DeviceInfo {
  userAgent: string;
  language: string;
  platform: string;
  screenResolution: string;
  timezone: string;
  deviceMemory?: number;
  hardwareConcurrency?: number;
}

export interface UseDeviceTrustReturn {
  /** List of trusted devices */
  devices: TrustedDevice[];
  /** Current device */
  currentDevice: TrustedDevice | undefined;
  /** Trust current device */
  trustCurrentDevice: (durationDays?: number) => Promise<TrustedDevice>;
  /** Update device trust level */
  updateDeviceTrust: (deviceId: string, trustLevel: 'standard' | 'trusted' | 'high_trust', durationDays?: number, reason?: string) => Promise<TrustedDevice>;
  /** Remove trusted device */
  removeDevice: (deviceId: string, reason?: string) => Promise<boolean>;
  /** Rename device */
  renameDevice: (deviceId: string, name: string) => Promise<TrustedDevice>;
  /** Get device fingerprint for current device */
  getDeviceFingerprint: () => Promise<DeviceFingerprint>;
  /** Refresh device list */
  refreshDevices: () => Promise<void>;
  /** Loading state */
  loading: boolean;
}

// Simple logger that can be replaced with proper logging solution
const logError = (error: unknown, context: string): void => {
  if (env.NODE_ENV === 'development') {
    console.error(`[useDeviceTrust] ${context}:`, error);
  }
};

// Helper function to extract data from API response
const extractData = <T>(response: { data?: { data?: T } }): T | undefined => {
  return response.data?.data;
};

// Helper function for idempotent GET requests with retry
const withIdempotentRetry = async <T>(requestFn: () => Promise<T>): Promise<T> => {
  return withRetry(requestFn, DEFAULT_RETRY_CONFIG);
};

// ==================== Hook ====================

/**
 * Hook for device trust management
 * 
 * @example
 * const { devices, trustCurrentDevice, removeDevice } = useDeviceTrust();
 * 
 * // Trust current device for 30 days
 * await trustCurrentDevice(30);
 * 
 * // Remove a device
 * await removeDevice('device-123');
 */
export const useDeviceTrust = (): UseDeviceTrustReturn => {
  const [devices, setDevices] = React.useState<TrustedDevice[]>([]);
  const [loading, setLoading] = React.useState(true);

  // Create API client once
  const deviceApi = React.useMemo(() => {
    const client = getAxiosClient();
    return createDeviceEndpoints(client);
  }, []);

  const loadDevices = React.useCallback(async () => {
    try {
      setLoading(true);
      const loadedDevices = await withIdempotentRetry(() => deviceApi.getDevices());
      setDevices(loadedDevices);
    } catch (error) {
      logError(error, 'Failed to load trusted devices');
    } finally {
      setLoading(false);
    }
  }, [deviceApi]);

  // Load devices on mount
  React.useEffect(() => {
    loadDevices();
  }, [loadDevices]);

  const currentDevice = React.useMemo(() => {
    return devices.find((d) => d.isCurrent);
  }, [devices]);

  const getDeviceFingerprint = React.useCallback(async (): Promise<DeviceFingerprint> => {
    // Collect browser fingerprint components
    const components = [
      navigator.userAgent,
      navigator.language,
      navigator.platform,
      `${window.screen.width}x${window.screen.height}`,
      window.screen.colorDepth,
      Intl.DateTimeFormat().resolvedOptions().timezone,
      // @ts-expect-error - deviceMemory is not standard yet
      navigator.deviceMemory || 'unknown',
      navigator.hardwareConcurrency || 'unknown',
    ];

    // Generate hash using SHA-256
    const encoder = new TextEncoder();
    const data = encoder.encode(components.join('|'));
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hash = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');

    return {
      hash,
      components,
      version: 1,
    };
  }, []);

  const getDeviceInfo = React.useCallback((): DeviceInfo => {
    return {
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      // @ts-expect-error - deviceMemory is not standard yet
      deviceMemory: navigator.deviceMemory,
      hardwareConcurrency: navigator.hardwareConcurrency,
    };
  }, []);

  const trustCurrentDevice = React.useCallback(
    async (durationDays?: number): Promise<TrustedDevice> => {
      const fingerprint = await getDeviceFingerprint();
      const deviceInfo = getDeviceInfo();

      const response = await deviceApi.registerDevice({
        deviceInfo,
        fingerprint: {
          hash: fingerprint.hash,
          components: fingerprint.components,
          version: fingerprint.version,
        },
        trustDevice: true,
        trustDurationDays: durationDays,
      });

      await loadDevices(); // Refresh list
      return response;
    },
    [deviceApi, loadDevices, getDeviceFingerprint, getDeviceInfo]
  );

  const updateDeviceTrust = React.useCallback(
    async (deviceId: string, trustLevel: 'standard' | 'trusted' | 'high_trust', durationDays?: number, reason?: string): Promise<TrustedDevice> => {
      const response = await deviceApi.updateDeviceTrust(deviceId, {
        trustLevel,
        durationDays,
        reason,
      });
      await loadDevices(); // Refresh list
      return response;
    },
    [deviceApi, loadDevices]
  );

  const removeDevice = React.useCallback(
    async (deviceId: string, reason?: string): Promise<boolean> => {
      const result = await deviceApi.removeDevice(deviceId, reason);
      if (result.success) {
        await loadDevices();
      }
      return result.success;
    },
    [deviceApi, loadDevices]
  );

  const renameDevice = React.useCallback(
    async (deviceId: string, name: string): Promise<TrustedDevice> => {
      const response = await deviceApi.renameDevice(deviceId, name);
      await loadDevices();
      return response;
    },
    [deviceApi, loadDevices]
  );

  const refreshDevices = React.useCallback(async () => {
    await loadDevices();
  }, [loadDevices]);

  return {
    devices,
    currentDevice,
    trustCurrentDevice,
    updateDeviceTrust,
    removeDevice,
    renameDevice,
    getDeviceFingerprint,
    refreshDevices,
    loading,
  };
};

/**
 * Hook for checking if current device is trusted (lightweight)
 */
export const useIsCurrentDeviceTrusted = (): boolean => {
  const { devices } = useDeviceTrust();
  const currentDevice = devices.find((d) => d.isCurrent);
  return currentDevice?.trustLevel === 'trusted' || currentDevice?.trustLevel === 'high_trust' || currentDevice?.trustLevel === 'maximum_trust';
};

/**
 * Hook for getting device trust level (lightweight)
 */
export const useDeviceTrustLevel = (): string => {
  const { devices } = useDeviceTrust();
  const currentDevice = devices.find((d) => d.isCurrent);
  return currentDevice?.trustLevel || 'untrusted';
};

// ==================== Type Exports ====================

export type { UseDeviceTrustReturn, TrustedDevice, DeviceFingerprint, DeviceInfo };
