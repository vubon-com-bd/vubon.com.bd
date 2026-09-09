import { hashString } from '../common/helper/hash.helper';
import { AUTH_DEVICE } from '@vubon/shared-constants/src/auth/auth-device.constants';

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

export const generateDeviceFingerprint = (data: {
  userAgent: string;
  ipAddress: string;
  screen: string;
}): string => {
  return hashString(`${data.userAgent}|${data.ipAddress}|${data.screen}`, 'sha256');
};

export const validateDevice = (device: AuthDevice): boolean => {
  return device.isTrusted && new Date(device.lastUsed) > new Date(Date.now() - 24 * 60 * 60 * 1000);
};
