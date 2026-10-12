/**
 * Device Configuration
 * @module identity-service/infrastructure/config
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '@vubon/shared-config/common';
import { AUTH_DEVICE } from '@vubon/shared-constants/auth';

export const AUTH_DEVICE_CONFIG = Object.freeze({
  maxDevicesPerUser: getOptionalEnvInt(
    'DEVICE_MAX_PER_USER',
    AUTH_DEVICE.MAX_DEVICES_PER_USER,
  ),
  trustExpiryDays: getOptionalEnvInt(
    'DEVICE_TRUST_EXPIRY_DAYS',
    AUTH_DEVICE.TRUST_DEVICE_EXPIRY_DAYS,
  ),
  rememberDeviceDefault: getOptionalEnvBool(
    'DEVICE_REMEMBER_DEFAULT',
    AUTH_DEVICE.REMEMBER_DEVICE_DEFAULT,
  ),
  trackFingerprint: getOptionalEnvBool(
    'DEVICE_TRACK_FINGERPRINT',
    AUTH_DEVICE.TRACK_FINGERPRINT,
  ),
});
