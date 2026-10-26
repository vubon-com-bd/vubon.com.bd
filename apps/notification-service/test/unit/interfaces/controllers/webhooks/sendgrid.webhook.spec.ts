/**
 * SendgridWebhookController Tests
 * @module notification-service/test/unit/interfaces/controllers/webhooks
 */
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import type { CommandBus } from '@nestjs/cqrs';
import { SendgridWebhookController } from '@interfaces/controllers/webhooks/sendgrid.webhook.js';

describe('SendgridWebhookController', () => {
  let controller: SendgridWebhookController;
  let commandBus: { execute: jest.Mock };

  beforeEach(() => {
    commandBus = { execute: jest.fn() };
    controller = new SendgridWebhookController(commandBus as unknown as CommandBus);
  });

  it('receives events + dispatches HandleSendgridWebhookCommand', async () => {
    commandBus.execute.mockResolvedValueOnce({
      processed: 2,
      skipped: 0,
      failed: 0,
    });

    const events = [
      { email: 'a@b.c', timestamp: 123, event: 'delivered', sg_event_id: 'e1', sg_message_id: 'm1' },
      { email: 'd@e.f', timestamp: 124, event: 'open', sg_event_id: 'e2', sg_message_id: 'm2' },
    ];
    const result = await controller.handle(events as never);
    expect(result.received).toBe(2);
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
  });

  it('handles empty array', async () => {
    commandBus.execute.mockResolvedValueOnce({ processed: 0, skipped: 0, failed: 0 });
    const result = await controller.handle([]);
    expect(result.received).toBe(0);
  });
});
