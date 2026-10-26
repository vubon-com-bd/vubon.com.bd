/**
 * TwilioWebhookController Tests
 * @module notification-service/test/unit/interfaces/controllers/webhooks
 */
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import type { CommandBus } from '@nestjs/cqrs';
import { TwilioWebhookController } from '@interfaces/controllers/webhooks/twilio.webhook.js';

describe('TwilioWebhookController', () => {
  let controller: TwilioWebhookController;
  let commandBus: { execute: jest.Mock };
  let logSpy: jest.Mock;

  beforeEach(() => {
    commandBus = { execute: jest.fn() };
    controller = new TwilioWebhookController(commandBus as unknown as CommandBus);
    logSpy = jest.fn();
    (controller as unknown as { logger: { log: jest.Mock } }).logger = { log: logSpy };
  });

  it('dispatches HandleTwilioWebhookCommand', async () => {
    commandBus.execute.mockResolvedValueOnce({ processed: true, status: 'delivered' });

    const payload = {
      MessageSid: 'msg-1',
      AccountSid: 'acc-1',
      From: '+8801712345678',
      To: '+8801812345678',
      Status: 'delivered',
    };
    const result = await controller.handle(payload as never);
    expect(result.received).toBe(true);
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
    expect(logSpy.mock.calls[0]?.[0]).toContain('delivered');
  });

  it('handles missing status', async () => {
    commandBus.execute.mockResolvedValueOnce({ processed: true });
    const payload = {
      MessageSid: 'msg-1',
      AccountSid: 'acc-1',
      From: '+1',
      To: '+2',
    };
    await controller.handle(payload as never);
    expect(logSpy.mock.calls[0]?.[0]).toContain('unknown');
  });
});
