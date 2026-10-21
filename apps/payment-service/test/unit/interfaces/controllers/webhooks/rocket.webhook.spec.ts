/**
 * RocketWebhookController — unit tests
 * @module payment-service/test/unit/interfaces/controllers/webhooks
 */
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { RocketWebhookController } from '@interfaces/controllers/webhooks/rocket.webhook';
import type { CommandBus } from '@nestjs/cqrs';

describe('RocketWebhookController', () => {
  let commandBus: { execute: jest.Mock };
  let controller: RocketWebhookController;

  beforeEach(() => {
    commandBus = { execute: jest.fn(async () => ({ id: 'p1' })) };
    controller = new RocketWebhookController(commandBus as unknown as CommandBus);
  });

  it('dispatches ConfirmPaymentCommand on Success', async () => {
    const result = await controller.handle({
      orderId: 'o1',
      rocketPaymentId: 'RCK123',
      amount: '300',
      status: 'Success',
    });
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ acknowledged: true });
  });

  it('dispatches ConfirmPaymentCommand on Paid', async () => {
    await controller.handle({
      orderId: 'o1',
      rocketPaymentId: 'RCK123',
      amount: '300',
      status: 'Paid',
    });
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
  });

  it('skips when status not Success/Paid', async () => {
    await controller.handle({
      orderId: 'o1',
      rocketPaymentId: 'RCK123',
      amount: '300',
      status: 'Failed',
    });
    expect(commandBus.execute).not.toHaveBeenCalled();
  });
});
