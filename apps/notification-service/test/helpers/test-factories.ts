/**
 * Test factories — reusable fixtures for notification domain tests
 * @module notification-service/test/helpers
 */
import { randomUUID } from 'node:crypto';

export const FIXED_USER_ID = '00000000-0000-0000-0000-000000000001';
export const FIXED_ORDER_ID = '00000000-0000-0000-0000-000000000002';
export const FIXED_NOTIFICATION_ID = '00000000-0000-0000-0000-000000000003';
export const FIXED_TEMPLATE_ID = '00000000-0000-0000-0000-000000000004';
export const FIXED_SCHEDULE_ID = '00000000-0000-0000-0000-000000000005';
export const FIXED_BROADCAST_ID = '00000000-0000-0000-0000-000000000006';
export const FIXED_DIGEST_ID = '00000000-0000-0000-0000-000000000007';
export const FIXED_WEBHOOK_ID = '00000000-0000-0000-0000-000000000008';

export function makeUuid(): string {
  return randomUUID();
}

export function makeIso(offsetMs = 0): string {
  return new Date(Date.now() + offsetMs).toISOString();
}

export interface SendNotificationFixture {
  userId: string;
  type: string;
  category: string;
  channels: string[];
  priority: string;
  title: string;
  body: string;
}

export function makeSendNotificationFixture(
  overrides: Partial<SendNotificationFixture> = {},
): SendNotificationFixture {
  return {
    userId: FIXED_USER_ID,
    type: 'transactional',
    category: 'order',
    channels: ['email'],
    priority: 'normal',
    title: 'Order Confirmed',
    body: 'Your order has been confirmed.',
    ...overrides,
  };
}

export function makeTemplateFixture(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    id: FIXED_TEMPLATE_ID,
    name: 'Order Confirmation',
    slug: 'order-confirmation',
    type: 'email',
    status: 'active',
    category: 'order',
    locale: 'en',
    subject: 'Order #{{orderNumber}} confirmed',
    body: 'Hello {{customerName}}, your order #{{orderNumber}} is confirmed.',
    bodyHtml: null,
    variables: [
      { name: 'orderNumber', type: 'string', required: true },
      { name: 'customerName', type: 'string', required: true },
    ],
    version: 1,
    parentId: null,
    createdBy: FIXED_USER_ID,
    updatedBy: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    ...overrides,
  };
}
