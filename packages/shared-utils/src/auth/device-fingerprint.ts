import { hashString } from '../common/helper/hash.helper';
import { addHours } from '../common/helper/time.helper';
import { AuthDevice } from '@vubon/shared-types';

export const generateDeviceFingerprint = (data: {
  userAgent: string;
  ipAddress: string;
  screen: string;
}): string => {
  return hashString(`${data.userAgent}|${data.ipAddress}|${data.screen}`, 'sha256');
};

export const validateDevice = (device: AuthDevice): boolean => {
  return device.isTrusted && new Date(device.lastUsed) > addHours(new Date(), -24);
};
