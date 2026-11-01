/**
 * VonageWebhookController Tests
 * @module notification-service/test/unit/interfaces/controllers/webhooks
 */
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { VonageWebhookController } from '@interfaces/controllers/webhooks/vonage.webhook.js';

describe('VonageWebhookController', () => {
  const controller = new VonageWebhookController();
  let logSpy: jest.Mock;

  beforeEach(() => {
    logSpy = jest.fn();
    (controller as unknown as { logger: { log: jest.Mock } }).logger = { log: logSpy };
  });

  it('logs delivered payload', async () => {
    const result = await controller.handle({
      messageId: 'msg-1',
      status: 'delivered',
    });
    expect(result.received).toBe(true);
    expect(logSpy.mock.calls[0]?.[0]).toContain('delivered');
  });

  it('handles missing fields', async () => {
    const result = await controller.handle({});
    expect(result.received).toBe(true);
    expect(logSpy.mock.calls[0]?.[0]).toContain('unknown');
  });
});
