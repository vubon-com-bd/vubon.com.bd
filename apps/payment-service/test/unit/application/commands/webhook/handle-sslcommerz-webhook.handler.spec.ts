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

import { HandleSslcommerzWebhookHandler } from '@application/commands/webhook/handle-sslcommerz-webhook.handler';
import { HandleSslcommerzWebhookCommand } from '@application/commands/webhook/handle-sslcommerz-webhook.command';
import type { PaymentRepository } from '@domain/repositories/payment.repository.interface';

function makeMockRepo() { return { findByGatewayReference: jest.fn() }; }
function makeMockBus() { return { execute: jest.fn() }; }

describe('HandleSslcommerzWebhookHandler', () => {
  let handler: HandleSslcommerzWebhookHandler;
  let repo: ReturnType<typeof makeMockRepo>;
  let bus: ReturnType<typeof makeMockBus>;

  beforeEach(() => {
    repo = makeMockRepo();
    bus = makeMockBus();
    handler = new HandleSslcommerzWebhookHandler(bus as never, repo as unknown as PaymentRepository);
  });

  it('should return null on invalid status', async () => {
    const cmd = new HandleSslcommerzWebhookCommand({
      tran_id: 't1', val_id: 'v1', amount: '100', status: 'FAILED', rawPayload: {},
    });
    expect(await handler.execute(cmd)).toBeNull();
  });

  it('should accept VALID status', async () => {
    repo.findByGatewayReference.mockResolvedValue({ id: 'payment-1' });
    bus.execute.mockResolvedValue({ id: 'payment-1' });
    const cmd = new HandleSslcommerzWebhookCommand({
      tran_id: 't1', val_id: 'v1', amount: '100', status: 'VALID', rawPayload: {},
    });
    expect(await handler.execute(cmd)).toEqual({ id: 'payment-1' });
  });

  it('should accept VALIDATED status', async () => {
    repo.findByGatewayReference.mockResolvedValue({ id: 'payment-1' });
    bus.execute.mockResolvedValue({ id: 'payment-1' });
    const cmd = new HandleSslcommerzWebhookCommand({
      tran_id: 't1', val_id: 'v1', amount: '100', status: 'VALIDATED', rawPayload: {},
    });
    expect(await handler.execute(cmd)).toEqual({ id: 'payment-1' });
  });

  it('should return null when payment missing', async () => {
    repo.findByGatewayReference.mockResolvedValue(null);
    const cmd = new HandleSslcommerzWebhookCommand({
      tran_id: 't1', val_id: 'v1', amount: '100', status: 'VALID', rawPayload: {},
    });
    expect(await handler.execute(cmd)).toBeNull();
  });
});
