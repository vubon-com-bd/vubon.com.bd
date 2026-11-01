/**
 * Webhook Fixtures
 * @module notification-service/test/fixtures/domain
 */
import { IDS } from './ids.fixture.js';

export const WEBHOOK_FIXTURE = {
  id: IDS.webhookId,
  name: 'Order Events',
  type: 'outgoing',
  status: 'active',
  url: 'https://example.com/webhooks/orders',
  secret: IDS.webhookSecret,
  events: ['order.created', 'order.updated'],
  headers: { 'X-Custom': 'value' },
} as const;

export const WEBHOOK_INCOMING = {
  ...WEBHOOK_FIXTURE,
  type: 'incoming',
  url: 'https://example.com/webhooks/incoming',
};
