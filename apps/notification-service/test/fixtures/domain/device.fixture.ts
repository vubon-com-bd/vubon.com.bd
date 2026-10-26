/**
 * Device Fixtures
 * @module notification-service/test/fixtures/domain
 */
import { IDS } from './ids.fixture.js';
import { DATES } from './dates.fixture.js';

export const DEVICE_FIXTURE = {
  id: IDS.deviceId,
  userId: IDS.userId,
  type: 'android',
  status: 'active',
  token: IDS.deviceToken,
  platform: 'android',
  appVersion: '1.2.3',
  osVersion: 'Android 14',
  deviceName: 'Samsung Galaxy S24',
  lastActiveAt: DATES.now,
  registeredAt: DATES.weekAgo,
} as const;

export const DEVICE_STALE = {
  ...DEVICE_FIXTURE,
  lastActiveAt: '2024-10-01T10:00:00.000Z', // > 90 days ago
};

export const DEVICE_BLOCKED = {
  ...DEVICE_FIXTURE,
  status: 'blocked',
};
