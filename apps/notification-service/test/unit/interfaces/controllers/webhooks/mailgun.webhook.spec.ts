/**
 * MailgunWebhookController Tests
 * @module notification-service/test/unit/interfaces/controllers/webhooks
 */
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { MailgunWebhookController } from '@interfaces/controllers/webhooks/mailgun.webhook.js';

describe('MailgunWebhookController', () => {
  const controller = new MailgunWebhookController();
  let logSpy: jest.Mock;

  beforeEach(() => {
    logSpy = jest.fn();
    (controller as unknown as { logger: { log: jest.Mock } }).logger = { log: logSpy };
  });

  it('returns received=true with valid event-data', async () => {
    const result = await controller.handle({
      'event-data': {
        event: 'delivered',
        id: 'abc',
        recipient: 'x@y.z',
      },
    });
    expect(result.received).toBe(true);
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy.mock.calls[0]?.[0]).toContain('delivered');
  });

  it('handles missing event-data', async () => {
    const result = await controller.handle({});
    expect(result.received).toBe(true);
    expect(logSpy.mock.calls[0]?.[0]).toContain('unknown');
  });
});
