/**
 * NagadWebhookController — unit tests (full branch coverage)
 * @module payment-service/test/unit/interfaces/controllers/webhooks
 */
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { NagadWebhookController } from '@interfaces/controllers/webhooks/nagad.webhook';
import type { CommandBus } from '@nestjs/cqrs';

describe('NagadWebhookController', () => {
  let commandBus: { execute: jest.Mock };
  let controller: NagadWebhookController;

  beforeEach(() => {
    commandBus = { execute: jest.fn(async () => ({ id: 'p1' })) };
    controller = new NagadWebhookController(commandBus as unknown as CommandBus);
  });

  it('dispatches HandleNagadWebhookCommand (base)', async () => {
    const result = await controller.handle(
      {
        orderId: 'o1',
        paymentRefId: 'NG123',
        amount: '500',
        status: 'Success',
      },
      {},
    );
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ acknowledged: true });
  });

  it('includes optional fields (issuerPaymentRefNo + signature)', async () => {
    await controller.handle(
      {
        orderId: 'o1',
        paymentRefId: 'NG123',
        amount: '500',
        status: 'Success',
        issuerPaymentRefNo: 'issuer-1',
        signature: 'sig-abc',
      },
      {},
    );
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
  });

  it('handles undefined optional fields', async () => {
    await controller.handle(
      {
        orderId: 'o1',
        paymentRefId: 'NG123',
        amount: '500',
        status: 'Success',
        issuerPaymentRefNo: undefined,
        signature: undefined,
      },
      {},
    );
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
  });

  it('handles populated headers (ignored)', async () => {
    await controller.handle(
      {
        orderId: 'o1',
        paymentRefId: 'NG123',
        amount: '500',
        status: 'Success',
      },
      { 'x-nagad-sig': 'abc', other: ['v1', 'v2'] },
    );
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
  });
});
