import { buildDeviceFingerprint } from './device-fingerprint';
import type { DeviceInfo } from './device.types';

const DEVICE_ID_KEY = 'vubon:device-id';

function randomDeviceId(): string {
  if (typeof crypto === 'undefined' || !('randomUUID' in crypto)) {
    throw new Error('Web Crypto unavailable — cannot generate secure device id');
  }
  return crypto.randomUUID();
}

export class DeviceTracker {
  private cached: DeviceInfo | null = null;

  async get(): Promise<DeviceInfo> {
    if (this.cached) return this.cached;
    if (typeof window === 'undefined') {
      this.cached = {
        deviceId: 'server-side',
        userAgent: 'server-side',
        platform: 'server-side',
        language: 'en',
        timezone: 'UTC',
        fingerprint: 'server-side',
      };
      return this.cached;
    }
    let deviceId = localStorage.getItem(DEVICE_ID_KEY);
    if (!deviceId) {
      deviceId = randomDeviceId();
      localStorage.setItem(DEVICE_ID_KEY, deviceId);
    }
    this.cached = {
      deviceId,
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      screenWidth: screen?.width,
      screenHeight: screen?.height,
      fingerprint: await buildDeviceFingerprint(),
    };
    return this.cached;
  }

  clear(): void {
    if (typeof window !== 'undefined') localStorage.removeItem(DEVICE_ID_KEY);
    this.cached = null;
  }
}
