import { NOTIFICATION_DEVICE } from '@vubon/shared-constants/src/platform/notification/notification-device.constants';

export interface PlatformDeviceInput {
  userId: string;
  token: string;
  name: string;
  status: string;
  type: string;
  isActive: boolean;
  isRegistered: boolean;
  expiresAt: Date;
}

export const validatePlatformDevice = (
  device: Partial<PlatformDeviceInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!device.userId) errors.push('User ID is required');
  if (!device.token) errors.push('Device token is required');
  if (!device.name) errors.push('Device name is required');
  if (device.status && !Object.keys(NOTIFICATION_DEVICE.STATUS).includes(device.status)) {
    errors.push('Invalid device status');
  }
  if (device.type && !Object.keys(NOTIFICATION_DEVICE.TYPES).includes(device.type)) {
    errors.push('Invalid device type');
  }
  return { isValid: errors.length === 0, errors };
};

export const isPlatformDeviceActive = (device: PlatformDeviceInput): boolean => {
  return device.isActive && device.isRegistered && new Date(device.expiresAt) > new Date();
};
