import { generateDeviceFingerprint, validateDevice } from '../auth/device-fingerprint';
import { AdminDevice } from '@vubon/shared-types';

export const generateAdminDeviceFingerprint = (data: {
  userAgent: string;
  ipAddress: string;
  screen: string;
}): string => {
  return generateDeviceFingerprint(data);
};

export const validateAdminDevice = (device: AdminDevice): boolean => {
  return validateDevice(device);
};
