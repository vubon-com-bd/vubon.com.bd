import { getRequiredEnv } from './env/env.validation';

export const deviceConfig = {
  maxDevicesPerUser: 10,
  sessionTimeout: 30 * 60 * 1000,
  trustDuration: 7 * 24 * 60 * 60 * 1000,
  fingerprint: {
    enabled: true,
    /** @required — never hardcode a salt */
    salt: getRequiredEnv('DEVICE_FINGERPRINT_SALT'),
  },
  deviceTypes: ['mobile', 'tablet', 'desktop', 'other'],
} as const;
