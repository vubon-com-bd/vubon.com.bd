/**
 * BkashWebhookController — unit tests (full branch coverage)
 * @module payment-service/test/unit/interfaces/controllers/webhooks
 */
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { BkashWebhookController } from '@interfaces/controllers/webhooks/bkash.webhook';
import type { CommandBus } from '@nestjs/cqrs';

describe('BkashWebhookController', () => {
  let commandBus: { execute: jest.Mock };
  let controller: BkashWebhookController;

  beforeEach(() => {
    commandBus = { execute: jest.fn(async () => ({ id: 'p1' })) };
    controller = new BkashWebhookController(commandBus as unknown as CommandBus);
  });

  const baseDto = {
    paymentID: 'TR001',
    trxID: 'BK123',
    amount: '1500.00',
    transactionStatus: 'Completed',
  };

  it('dispatches with string header', async () => {
    const result = await controller.handle(baseDto, {
      'x-bkash-signature': 'sig',
    });
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ acknowledged: true });
  });

  it('handles array header (takes first)', async () => {
    await controller.handle(baseDto, {
      'x-bkash-signature': ['sig1', 'sig2'],
    });
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
  });

  it('handles empty array header (falls back to empty string)', async () => {
    await controller.handle(baseDto, {
      'x-bkash-signature': [],
    });
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
  });

  it('handles non-string, non-array header (ignored)', async () => {
    await controller.handle(baseDto, {
      'x-bkash-signature': undefined as unknown as string,
    });
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
  });

  it('handles empty headers object', async () => {
    await controller.handle(baseDto, {});
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
  });

  it('handles both string and array mixed', async () => {
    await controller.handle(baseDto, {
      'x-bkash-signature': 'sig',
      'other-header': ['a', 'b'],
    });
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
  });
});
