/**
 * useDeviceTrust Hook - Device trust management
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

// ==================== Helper ====================

const API_BASE = '/api/v1/devices';

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

  const loadDevices = React.useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(API_BASE, { credentials: 'include' });
      const data = await response.json();
      setDevices(data.data || []);
    } catch (error) {
      console.error('Failed to load trusted devices:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load devices on mount
  React.useEffect(() => {
    loadDevices();
  }, [loadDevices]);

  const currentDevice = React.useMemo(() => {
    return devices.find((d) => d.isCurrent);
  }, [devices]);

  const trustCurrentDevice = React.useCallback(
    async (durationDays?: number): Promise<TrustedDevice> => {
      // First, get device fingerprint
      const fingerprint = await getDeviceFingerprint();

      const response = await fetch(`${API_BASE}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          deviceInfo: {
            // Device info will be collected client-side
            userAgent: navigator.userAgent,
            language: navigator.language,
            platform: navigator.platform,
            screenResolution: `${window.screen.width}x${window.screen.height}`,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
          fingerprint,
          trustDevice: true,
          trustDurationDays: durationDays,
        }),
      });
      const data = await response.json();
      await loadDevices(); // Refresh list
      return data.data;
    },
    [loadDevices]
  );

  const updateDeviceTrust = React.useCallback(
    async (deviceId: string, trustLevel: 'standard' | 'trusted' | 'high_trust', durationDays?: number, reason?: string): Promise<TrustedDevice> => {
      const response = await fetch(`${API_BASE}/${deviceId}/trust`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ trustLevel, durationDays, reason }),
      });
      const data = await response.json();
      await loadDevices(); // Refresh list
      return data.data;
    },
    [loadDevices]
  );

  const removeDevice = React.useCallback(
    async (deviceId: string, reason?: string): Promise<boolean> => {
      const response = await fetch(`${API_BASE}/${deviceId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ reason }),
      });
      const data = await response.json();
      if (data.success) {
        await loadDevices();
      }
      return data.success;
    },
    [loadDevices]
  );

  const renameDevice = React.useCallback(
    async (deviceId: string, name: string): Promise<TrustedDevice> => {
      const response = await fetch(`${API_BASE}/${deviceId}/rename`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name }),
      });
      const data = await response.json();
      await loadDevices();
      return data.data;
    },
    [loadDevices]
  );

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

export type { UseDeviceTrustReturn, TrustedDevice, DeviceFingerprint };
