import { IDS } from '@domain-fixtures/ids.fixture.js';
import { DATES } from '@domain-fixtures/dates.fixture.js';

export const NOTIFICATION_DTO = {
  send: {
    userId: IDS.userId,
    type: 'transactional' as const,
    category: 'system' as const,
    channels: ['email' as const],
    priority: 'normal' as const,
    subject: 'Test Subject',
    body: 'Test Body',
    data: { key: 'value' },
    idempotencyKey: `idem-${IDS.notificationId}`,
  },
  sendBulk: {
    userIds: [IDS.userId, IDS.userId2],
    type: 'transactional' as const,
    category: 'system' as const,
    channels: ['email' as const],
    priority: 'normal' as const,
    subject: 'Bulk Subject',
    body: 'Bulk Body',
  },
  resend: { notificationId: IDS.notificationId, channels: ['email' as const], reason: 'Retry' },
  cancel: { notificationId: IDS.notificationId, reason: 'Cancel' },
} as const;

export const TEMPLATE_DTO = {
  create: {
    name: 'Welcome Email',
    slug: 'welcome-email',
    type: 'email' as const,
    category: 'system' as const,
    locale: 'en',
    subject: 'Welcome {{name}}',
    body: 'Hi {{name}}',
    variables: [{ name: 'name', type: 'string' as const, required: true }],
  },
  update: { templateId: IDS.templateId, subject: 'Updated' },
  test: { templateId: IDS.templateId, variables: { name: 'User' }, email: 't@example.com' },
} as const;

export const SCHEDULE_DTO = {
  create: {
    name: 'Daily',
    type: 'recurring' as const,
    recurrence: 'daily' as const,
    scheduledAt: DATES.future24h,
    timezone: 'Asia/Dhaka',
    templateId: IDS.templateId,
    recipientIds: [IDS.userId],
  },
  update: { scheduleId: IDS.scheduleId, name: 'Updated' },
  cancel: { scheduleId: IDS.scheduleId, reason: 'Not needed' },
} as const;

export const BROADCAST_DTO = {
  create: {
    name: 'Campaign',
    type: 'all_users' as const,
    target: 'all' as const,
    channels: ['email' as const],
    content: 'Hello!',
  },
  start: { broadcastId: IDS.broadcastId, approvedBy: IDS.userId },
  cancel: { broadcastId: IDS.broadcastId, reason: 'Not needed' },
} as const;

export const DIGEST_DTO = {
  create: {
    userId: IDS.userId,
    frequency: 'daily' as const,
    type: 'summary' as const,
    categories: ['order'],
    sendHour: 9,
    timezone: 'Asia/Dhaka',
  },
  send: { digestId: IDS.digestId },
} as const;

export const PREFERENCE_DTO = {
  update: {
    userId: IDS.userId,
    email: true,
    quietHoursEnabled: true,
    quietHoursStart: 22,
    quietHoursEnd: 8,
  },
  bulkUpdate: {
    userIds: [IDS.userId, IDS.userId2],
    updates: { email: false, push: true },
  },
  unsubscribe: { userId: IDS.userId, channel: 'email' as const, category: 'promotion' },
} as const;

export const DEVICE_DTO = {
  register: {
    userId: IDS.userId,
    type: 'android' as const,
    token: IDS.deviceToken,
    deviceName: 'Phone',
  },
  updateToken: { deviceId: IDS.deviceId, newToken: IDS.deviceToken2 },
  unregister: { deviceId: IDS.deviceId, reason: 'Logout' },
} as const;

export const WEBHOOK_DTO = {
  create: {
    name: 'Order Hook',
    url: 'https://example.com/webhook',
    events: ['order.created' as const],
    secret: 'whsec_test_secret_1234567890abcdef',
  },
  update: {
    webhookId: IDS.webhookId,
    name: 'Updated Hook',
    events: ['order.created' as const],
  },
  test: { webhookId: IDS.webhookId, event: 'order.created' as const, payload: { id: '1' } },
} as const;
