/**
 * FcmWebhookController Tests
 * @module notification-service/test/unit/interfaces/controllers/webhooks
 */
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import type { CommandBus } from '@nestjs/cqrs';
import { FcmWebhookController } from '@interfaces/controllers/webhooks/fcm.webhook.js';

describe('FcmWebhookController', () => {
  let controller: FcmWebhookController;
  let commandBus: { execute: jest.Mock };
  let logSpy: jest.Mock;

  beforeEach(() => {
    commandBus = { execute: jest.fn() };
    controller = new FcmWebhookController(commandBus as unknown as CommandBus);
    logSpy = jest.fn();
    (controller as unknown as { logger: { log: jest.Mock } }).logger = { log: logSpy };
  });

  it('dispatches HandleFcmWebhookCommand', async () => {
    commandBus.execute.mockResolvedValueOnce({ processed: true, state: 'MessageDelivered' });

    const payload = {
      messageId: 'msg-1',
      state: 'MessageDelivered',
    };
    const result = await controller.handle(payload as never);
    expect(result.received).toBe(true);
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
    expect(logSpy.mock.calls[0]?.[0]).toContain('MessageDelivered');
  });
});
