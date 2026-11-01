/**
 * Provider Webhook API E2E Tests (lightweight)
 * @module notification-service/test/e2e/interfaces
 */
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import type { CommandBus } from '@nestjs/cqrs';
import { SendgridWebhookController } from '@interfaces/controllers/webhooks/sendgrid.webhook.js';

describe('Provider Webhook API (e2e)', () => {
  let controller: SendgridWebhookController;
  let commandBus: { execute: jest.Mock };

  beforeEach(() => {
    commandBus = { execute: jest.fn() };
    controller = new SendgridWebhookController(commandBus as unknown as CommandBus);
  });

  it('POST /webhooks/providers/sendgrid → 200 payload', async () => {
    commandBus.execute.mockResolvedValueOnce({
      processed: 1,
      skipped: 0,
      failed: 0,
    });

    const res = await controller.handle([
      {
        email: 'x@y.z',
        timestamp: 123,
        event: 'delivered',
        sg_event_id: 'e1',
        sg_message_id: 'm1',
      },
    ] as never);
    expect(res.received).toBe(1);
  });
});
