/**
 * SslcommerzWebhookController — unit tests
 * @module payment-service/test/unit/interfaces/controllers/webhooks
 */
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { SslcommerzWebhookController } from '@interfaces/controllers/webhooks/sslcommerz.webhook';
import type { CommandBus } from '@nestjs/cqrs';

describe('SslcommerzWebhookController', () => {
  let commandBus: { execute: jest.Mock };
  let controller: SslcommerzWebhookController;

  beforeEach(() => {
    commandBus = { execute: jest.fn(async () => ({ id: 'p1' })) };
    controller = new SslcommerzWebhookController(commandBus as unknown as CommandBus);
  });

  it('dispatches HandleSslcommerzWebhookCommand', async () => {
    const result = await controller.handle({
      tran_id: 'TXN-1',
      val_id: 'VAL-1',
      amount: '100',
      status: 'VALID',
    });
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ acknowledged: true });
  });

  it('includes optional verify_sign and verify_key', async () => {
    await controller.handle({
      tran_id: 'TXN-1',
      val_id: 'VAL-1',
      amount: '100',
      status: 'VALID',
      verify_sign: 'sig',
      verify_key: 'key',
    });
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
  });
});
