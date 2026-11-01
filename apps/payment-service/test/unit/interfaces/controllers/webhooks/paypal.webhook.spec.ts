/**
 * PaypalWebhookController — unit tests
 * @module payment-service/test/unit/interfaces/controllers/webhooks
 */
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { PaypalWebhookController } from '@interfaces/controllers/webhooks/paypal.webhook';
import type { CommandBus } from '@nestjs/cqrs';

describe('PaypalWebhookController', () => {
  let commandBus: { execute: jest.Mock };
  let controller: PaypalWebhookController;

  beforeEach(() => {
    commandBus = { execute: jest.fn(async () => ({ id: 'p1' })) };
    controller = new PaypalWebhookController(commandBus as unknown as CommandBus);
  });

  it('dispatches ConfirmPaymentCommand on PAYMENT.CAPTURE.COMPLETED', async () => {
    const result = await controller.handle(
      {
        id: 'WH-1',
        event_type: 'PAYMENT.CAPTURE.COMPLETED',
        resource: {
          id: 'CAP-1',
          custom_id: 'pay-1',
          amount: { value: '100.00', currency_code: 'USD' },
        },
      },
      {},
    );
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ received: true });
  });

  it('dispatches on CHECKOUT.ORDER.APPROVED', async () => {
    await controller.handle(
      {
        id: 'WH-2',
        event_type: 'CHECKOUT.ORDER.APPROVED',
        resource: { id: 'ORDER-1', custom_id: 'pay-1' },
      },
      {},
    );
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
  });

  it('skips when event type not matching', async () => {
    await controller.handle(
      { id: 'WH-3', event_type: 'CUSTOMER.CREATED', resource: {} },
      {},
    );
    expect(commandBus.execute).not.toHaveBeenCalled();
  });

  it('skips when paymentId not present', async () => {
    await controller.handle(
      {
        id: 'WH-4',
        event_type: 'PAYMENT.CAPTURE.COMPLETED',
        resource: { id: 'CAP-1' },
      },
      {},
    );
    expect(commandBus.execute).not.toHaveBeenCalled();
  });

  it('handles amount missing', async () => {
    await controller.handle(
      {
        id: 'WH-5',
        event_type: 'PAYMENT.CAPTURE.COMPLETED',
        resource: { id: 'CAP-1', custom_id: 'pay-1' },
      },
      {},
    );
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
  });
});
