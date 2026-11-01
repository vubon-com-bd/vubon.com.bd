/**
 * StripeWebhookController — unit tests
 * @module payment-service/test/unit/interfaces/controllers/webhooks
 */
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { StripeWebhookController } from '@interfaces/controllers/webhooks/stripe.webhook';
import type { CommandBus } from '@nestjs/cqrs';

describe('StripeWebhookController', () => {
  let commandBus: { execute: jest.Mock };
  let controller: StripeWebhookController;

  beforeEach(() => {
    commandBus = { execute: jest.fn(async () => ({ id: 'p1' })) };
    controller = new StripeWebhookController(commandBus as unknown as CommandBus);
  });

  it('dispatches HandleStripeWebhookCommand', async () => {
    const result = await controller.handle(
      {
        id: 'evt_1',
        type: 'payment_intent.succeeded',
        data: { object: { id: 'pi_123' } },
      },
      't=1,v1=abc',
    );
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ received: true });
  });

  it('handles missing signature', async () => {
    await controller.handle(
      { id: 'evt_1', type: 'payment_intent.succeeded', data: { object: {} } },
      undefined,
    );
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
  });
});
