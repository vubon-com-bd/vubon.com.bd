import type { DeviceServiceContract, TrustedDevice } from './device.service.interface';

/**
 * In-memory trusted-device registry.
 * Replace with persistent storage in production.
 */
export class DeviceService implements DeviceServiceContract {
  private readonly store = new Map<string, TrustedDevice>();

  private key(userId: string, deviceId: string): string {
    return `${userId}::${deviceId}`;
  }

  async trust(input: {
    userId: string;
    deviceId: string;
    fingerprint: string;
  }): Promise<TrustedDevice> {
    const now = new Date().toISOString();
    const record: TrustedDevice = {
      deviceId: input.deviceId,
      userId: input.userId,
      fingerprint: input.fingerprint,
      trustedAt: now,
      lastSeenAt: now,
    };
    this.store.set(this.key(input.userId, input.deviceId), record);
    return record;
  }

  async isTrusted(userId: string, deviceId: string): Promise<boolean> {
    const rec = this.store.get(this.key(userId, deviceId));
    if (!rec) return false;
    this.store.set(this.key(userId, deviceId), {
      ...rec,
      lastSeenAt: new Date().toISOString(),
    });
    return true;
  }

  async revoke(userId: string, deviceId: string): Promise<void> {
    this.store.delete(this.key(userId, deviceId));
  }
}

export const deviceService = new DeviceService();
