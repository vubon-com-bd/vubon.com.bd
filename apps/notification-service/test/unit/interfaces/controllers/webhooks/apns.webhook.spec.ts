/**
 * ApnsWebhookController Tests
 * @module notification-service/test/unit/interfaces/controllers/webhooks
 */
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import type { CommandBus } from '@nestjs/cqrs';
import { ApnsWebhookController } from '@interfaces/controllers/webhooks/apns.webhook.js';

describe('ApnsWebhookController', () => {
  let controller: ApnsWebhookController;
  let commandBus: { execute: jest.Mock };
  let logSpy: jest.Mock;

  beforeEach(() => {
    commandBus = { execute: jest.fn() };
    controller = new ApnsWebhookController(commandBus as unknown as CommandBus);
    logSpy = jest.fn();
    (controller as unknown as { logger: { log: jest.Mock } }).logger = { log: logSpy };
  });

  it('dispatches HandleApnsWebhookCommand', async () => {
    commandBus.execute.mockResolvedValueOnce({ processed: true, state: 'delivered' });

    const payload = {
      apnsId: 'apns-1',
      state: 'delivered',
    };
    const result = await controller.handle(payload as never);
    expect(result.received).toBe(true);
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
    expect(logSpy.mock.calls[0]?.[0]).toContain('apns-1');
  });

  it('handles unknown state', async () => {
    commandBus.execute.mockResolvedValueOnce({ processed: true, state: 'unknown' });
    await controller.handle({ apnsId: 'apns-x', state: 'unknown' } as never);
    expect(logSpy.mock.calls[0]?.[0]).toContain('unknown');
  });
});
