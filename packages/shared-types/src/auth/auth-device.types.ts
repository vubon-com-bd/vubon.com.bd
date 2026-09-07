import { AUTH_DEVICE } from '@vubon/shared-constants';

export interface AuthDevice {
  deviceId: string;
  userId: string;
  type: keyof typeof AUTH_DEVICE;
  name: string;
  model?: string;
  os: string;
  browser: string;
  isTrusted: boolean;
  lastUsed: Date;
  registeredAt: Date;
  metadata: Record<string, unknown>;
}
