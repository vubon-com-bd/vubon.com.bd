/**
 * CryptoWebhookController — unit tests
 * @module payment-service/test/unit/interfaces/controllers/webhooks
 */
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { CryptoWebhookController } from '@interfaces/controllers/webhooks/crypto.webhook';
import type { CommandBus } from '@nestjs/cqrs';

describe('CryptoWebhookController', () => {
  let commandBus: { execute: jest.Mock };
  let controller: CryptoWebhookController;

  beforeEach(() => {
    commandBus = { execute: jest.fn(async () => ({ id: 'p1' })) };
    controller = new CryptoWebhookController(commandBus as unknown as CommandBus);
  });

  it('acknowledges confirmed crypto webhook', async () => {
    const result = await controller.handle({
      txHash: '0xabc',
      fromAddress: '0xdef',
      amount: '100',
      currency: 'USDT',
      status: 'confirmed',
      confirmations: 6,
    });
    expect(result).toEqual({ acknowledged: true });
    // No command dispatch (placeholder flow)
    expect(commandBus.execute).not.toHaveBeenCalled();
  });

  it('acknowledges unconfirmed crypto webhook', async () => {
    const result = await controller.handle({
      txHash: '0xabc',
      fromAddress: '0xdef',
      amount: '100',
      currency: 'USDT',
      status: 'pending',
    });
    expect(result).toEqual({ acknowledged: true });
  });

  it('handles missing confirmations', async () => {
    const result = await controller.handle({
      txHash: '0xabc',
      fromAddress: '0xdef',
      amount: '100',
      currency: 'USDT',
      status: 'confirmed',
    });
    expect(result).toEqual({ acknowledged: true });
  });
});
