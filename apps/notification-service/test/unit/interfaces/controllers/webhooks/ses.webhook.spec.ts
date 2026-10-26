/**
 * SesWebhookController Tests
 * @module notification-service/test/unit/interfaces/controllers/webhooks
 */
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { SesWebhookController } from '@interfaces/controllers/webhooks/ses.webhook.js';

describe('SesWebhookController', () => {
  const controller = new SesWebhookController();
  let logSpy: jest.Mock;

  beforeEach(() => {
    logSpy = jest.fn();
    (controller as unknown as { logger: { log: jest.Mock } }).logger = { log: logSpy };
  });

  it('returns received for SubscriptionConfirmation', async () => {
    const result = await controller.handle({ Type: 'SubscriptionConfirmation' });
    expect(result.received).toBe(true);
    expect(logSpy.mock.calls[0]?.[0]).toContain('SubscriptionConfirmation');
  });

  it('returns received for Notification', async () => {
    const result = await controller.handle({ Type: 'Notification' });
    expect(result.received).toBe(true);
  });

  it('handles missing Type', async () => {
    const result = await controller.handle({});
    expect(result.received).toBe(true);
    expect(logSpy.mock.calls[0]?.[0]).toContain('unknown');
  });
});
