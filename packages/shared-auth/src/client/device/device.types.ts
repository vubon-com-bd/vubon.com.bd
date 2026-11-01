export interface DeviceInfo {
  readonly deviceId: string;
  readonly userAgent: string;
  readonly platform: string;
  readonly language: string;
  readonly timezone: string;
  readonly screenWidth?: number;
  readonly screenHeight?: number;
  readonly fingerprint: string;
}
