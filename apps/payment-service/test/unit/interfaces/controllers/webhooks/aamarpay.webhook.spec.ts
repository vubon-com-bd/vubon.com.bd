/**
 * AamarpayWebhookController — unit tests
 * @module payment-service/test/unit/interfaces/controllers/webhooks
 */
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { AamarpayWebhookController } from '@interfaces/controllers/webhooks/aamarpay.webhook';
import type { CommandBus } from '@nestjs/cqrs';

describe('AamarpayWebhookController', () => {
  let commandBus: { execute: jest.Mock };
  let controller: AamarpayWebhookController;

  beforeEach(() => {
    commandBus = { execute: jest.fn(async () => ({ id: 'p1' })) };
    controller = new AamarpayWebhookController(commandBus as unknown as CommandBus);
  });

  it('dispatches ConfirmPaymentCommand on Successful', async () => {
    const result = await controller.handle({
      mer_txnid: 'M1',
      amount: '100',
      pay_status: 'Successful',
    });
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ acknowledged: true });
  });

  it('dispatches on Success', async () => {
    await controller.handle({
      mer_txnid: 'M1',
      amount: '100',
      pay_status: 'Success',
    });
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
  });

  it('dispatches when status_code = 2', async () => {
    await controller.handle({
      mer_txnid: 'M1',
      amount: '100',
      pay_status: 'X',
      status_code: '2',
    });
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
  });

  it('skips on failed status', async () => {
    await controller.handle({
      mer_txnid: 'M1',
      amount: '100',
      pay_status: 'Failed',
    });
    expect(commandBus.execute).not.toHaveBeenCalled();
  });
});
