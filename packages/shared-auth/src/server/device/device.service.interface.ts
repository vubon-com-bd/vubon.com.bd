export interface TrustedDevice {
  readonly deviceId: string;
  readonly userId: string;
  readonly fingerprint: string;
  readonly trustedAt: string;
  readonly lastSeenAt: string;
}

export interface DeviceServiceContract {
  trust(input: { userId: string; deviceId: string; fingerprint: string }): Promise<TrustedDevice>;
  isTrusted(userId: string, deviceId: string): Promise<boolean>;
  revoke(userId: string, deviceId: string): Promise<void>;
}
