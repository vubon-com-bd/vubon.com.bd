import { getOptionalEnvBool, getOptionalEnvInt } from '@vubon/shared-config/common';
import { AUTH_DEVICE } from '@vubon/shared-constants/auth';

export const DEVICE_CONFIG = Object.freeze({
  maxDevicesPerUser: getOptionalEnvInt('DEVICE_MAX_PER_USER', AUTH_DEVICE.MAX_DEVICES_PER_USER),
  trustExpiryDays: getOptionalEnvInt('DEVICE_TRUST_EXPIRY_DAYS', AUTH_DEVICE.TRUST_DEVICE_EXPIRY_DAYS),
  rememberDeviceDefault: getOptionalEnvBool('DEVICE_REMEMBER_DEFAULT', AUTH_DEVICE.REMEMBER_DEVICE_DEFAULT),
  trackFingerprint: getOptionalEnvBool('DEVICE_TRACK_FINGERPRINT', AUTH_DEVICE.TRACK_FINGERPRINT),
  trackIp: getOptionalEnvBool('DEVICE_TRACK_IP', AUTH_DEVICE.TRACK_IP),
  trackUserAgent: getOptionalEnvBool('DEVICE_TRACK_USER_AGENT', AUTH_DEVICE.TRACK_USER_AGENT),
} as const);
