/**
 * Template Fixtures
 * @module notification-service/test/fixtures/domain
 */
import { IDS } from './ids.fixture.js';
import { DATES } from './dates.fixture.js';

export const TEMPLATE_FIXTURE = {
  id: IDS.templateId,
  name: 'Order Confirmation',
  slug: 'order-confirmation',
  type: 'transactional',
  status: 'active',
  format: 'html',
  subject: 'Order {{orderId}} confirmed',
  body: '<h1>Hello {{userName}}</h1><p>Order {{orderId}} confirmed for {{amount}} BDT</p>',
  variables: [
    { name: 'orderId', type: 'string' as const, required: true },
    { name: 'userName', type: 'string' as const, required: true },
    { name: 'amount', type: 'number' as const, required: true },
  ],
  locale: 'en',
  version: 1,
  createdAt: DATES.now,
  updatedAt: DATES.now,
} as const;

export const TEMPLATE_VARIABLES_SAMPLE = {
  orderId: 'ORD-1234',
  userName: 'Rahim',
  amount: 1500,
};
