import { describe, it, expect, beforeEach, jest } from '@jest/globals';
jest.mock('@nestjs/cqrs', () => ({
  CommandHandler: () => (t: unknown) => t,
  CommandBus: class {},
}));
jest.mock('@nestjs/common', () => ({
  Injectable: () => (t: unknown) => t,
  Inject: () => () => undefined,
  Logger: class { log(): void {} error(): void {} warn(): void {} debug(): void {} verbose(): void {} },
}));

import { HandleBkashWebhookHandler } from '@application/commands/webhook/handle-bkash-webhook.handler';
import { HandleBkashWebhookCommand } from '@application/commands/webhook/handle-bkash-webhook.command';
import type { PaymentRepository } from '@domain/repositories/payment.repository.interface';

function makeMockRepo() {
  return { findByGatewayReference: jest.fn() };
}
function makeMockBus() {
  return { execute: jest.fn() };
}

describe('HandleBkashWebhookHandler', () => {
  let handler: HandleBkashWebhookHandler;
  let repo: ReturnType<typeof makeMockRepo>;
  let bus: ReturnType<typeof makeMockBus>;

  beforeEach(() => {
    repo = makeMockRepo();
    bus = makeMockBus();
    handler = new HandleBkashWebhookHandler(
      bus as never,
      repo as unknown as PaymentRepository,
    );
  });

  it('should return null when status is not Completed', async () => {
    const cmd = new HandleBkashWebhookCommand({
      paymentID: 'p1', trxID: 'tx1', amount: '1000',
      transactionStatus: 'Initiated', rawPayload: {},
    });
    const result = await handler.execute(cmd);
    expect(result).toBeNull();
    expect(repo.findByGatewayReference).not.toHaveBeenCalled();
  });

  it('should return null when payment not found', async () => {
    repo.findByGatewayReference.mockResolvedValue(null);
    const cmd = new HandleBkashWebhookCommand({
      paymentID: 'unknown', trxID: 'tx1', amount: '1000',
      transactionStatus: 'Completed', rawPayload: {},
    });
    const result = await handler.execute(cmd);
    expect(result).toBeNull();
  });

  it('should execute ConfirmPaymentCommand on valid payment', async () => {
    repo.findByGatewayReference.mockResolvedValue({ id: 'payment-1' });
    bus.execute.mockResolvedValue({ id: 'payment-1', status: 'captured' });
    const cmd = new HandleBkashWebhookCommand({
      paymentID: 'p1', trxID: 'tx1', amount: '1000',
      transactionStatus: 'Completed', rawPayload: {},
    });
    const result = await handler.execute(cmd);
    expect(result).toEqual({ id: 'payment-1', status: 'captured' });
    expect(bus.execute).toHaveBeenCalled();
  });
});
