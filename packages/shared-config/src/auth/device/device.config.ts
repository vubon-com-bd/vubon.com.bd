/**
 * Auth device tracking configuration
 * @module shared-config/auth/device
 *
 * Values আসে shared-constants/auth থেকে।
 */
import { AUTH_DEVICE } from '@vubon/shared-constants/auth';
import { getOptionalEnvBool } from '../../common/env/env.helper';

export const AUTH_DEVICE_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('AUTH_DEVICE_TRACKING', true),
  maxDevicesPerUser: AUTH_DEVICE.MAX_DEVICES_PER_USER,
  trustDeviceExpiryDays: AUTH_DEVICE.TRUST_DEVICE_EXPIRY_DAYS,
  rememberDeviceDefault: AUTH_DEVICE.REMEMBER_DEVICE_DEFAULT,
  trackFingerprint: AUTH_DEVICE.TRACK_FINGERPRINT,
  trackIp: AUTH_DEVICE.TRACK_IP,
  trackUserAgent: AUTH_DEVICE.TRACK_USER_AGENT,
  notifyOnNewDevice: getOptionalEnvBool('AUTH_NOTIFY_NEW_DEVICE', true),
  blockUnknownDevices: getOptionalEnvBool('AUTH_BLOCK_UNKNOWN_DEVICES', false),
});
