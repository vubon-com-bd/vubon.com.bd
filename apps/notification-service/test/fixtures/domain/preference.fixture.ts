/**
 * Preference Fixtures
 * @module notification-service/test/fixtures/domain
 */
import { IDS } from './ids.fixture.js';

export const PREFERENCE_FIXTURE = {
  id: IDS.preferenceId,
  userId: IDS.userId,
  type: 'channel_specific',
  options: [
    { channel: 'email', enabled: true },
    { channel: 'sms', enabled: false },
    { channel: 'push', enabled: true },
    { channel: 'in_app', enabled: true },
    { channel: 'webhook', enabled: false },
  ],
  quietHoursEnabled: true,
  quietHoursStart: 22,
  quietHoursEnd: 8,
  timezone: 'Asia/Dhaka',
  locale: 'bn',
  locked: false,
} as const;

export const PREFERENCE_LOCKED = {
  ...PREFERENCE_FIXTURE,
  locked: true,
};

export const PREFERENCE_NO_QUIET = {
  ...PREFERENCE_FIXTURE,
  quietHoursEnabled: false,
  quietHoursStart: undefined,
  quietHoursEnd: undefined,
};
