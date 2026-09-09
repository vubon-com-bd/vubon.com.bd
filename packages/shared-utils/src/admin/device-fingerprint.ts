import { generateDeviceFingerprint } from '../auth/device-fingerprint';

export interface AdminDevice {
  deviceId: string;
  adminId: string;
  type: string;
  name: string;
  model?: string;
  os: string;
  browser: string;
  isTrusted: boolean;
  isActive: boolean;
  lastUsed: Date;
  registeredAt: Date;
  metadata: Record<string, unknown>;
}

export const generateAdminDeviceFingerprint = (data: {
  userAgent: string;
  ipAddress: string;
  screen: string;
}): string => {
  return generateDeviceFingerprint(data);
};

export const validateAdminDevice = (device: AdminDevice): boolean => {
  // Direct validation without calling validateDevice
  return (
    device.isTrusted &&
    device.isActive &&
    new Date(device.lastUsed) > new Date(Date.now() - 24 * 60 * 60 * 1000)
  );
};
