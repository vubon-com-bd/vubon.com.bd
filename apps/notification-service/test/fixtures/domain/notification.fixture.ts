/**
 * Notification Fixtures
 * @module notification-service/test/fixtures/domain
 */
import { IDS } from './ids.fixture.js';
import { DATES } from './dates.fixture.js';

export const NOTIFICATION_FIXTURE = {
  id: IDS.notificationId,
  userId: IDS.userId,
  type: 'transactional',
  category: 'order',
  channel: 'email',
  priority: 'normal',
  status: 'draft',
  subject: 'Your order has been confirmed',
  body: 'Hello, your order #1234 has been confirmed.',
  data: { orderId: IDS.orderId, amount: 100 },
  createdAt: DATES.now,
  updatedAt: DATES.now,
} as const;

export const NOTIFICATION_VARIATIONS = {
  security: {
    ...NOTIFICATION_FIXTURE,
    type: 'security',
    category: 'security',
    priority: 'critical',
    subject: 'New login detected',
    body: 'A new login was detected on your account.',
  },
  marketing: {
    ...NOTIFICATION_FIXTURE,
    type: 'promotional',
    category: 'promotion',
    priority: 'low',
    subject: 'Big sale!',
    body: 'Get 50% off on all products.',
  },
  silent: {
    ...NOTIFICATION_FIXTURE,
    priority: 'silent',
  },
  pushChannel: {
    ...NOTIFICATION_FIXTURE,
    channel: 'push',
  },
  smsChannel: {
    ...NOTIFICATION_FIXTURE,
    channel: 'sms',
  },
  inAppChannel: {
    ...NOTIFICATION_FIXTURE,
    channel: 'in_app',
  },
} as const;
