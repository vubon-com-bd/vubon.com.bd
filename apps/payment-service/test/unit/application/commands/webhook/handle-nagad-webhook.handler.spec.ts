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

import { HandleNagadWebhookHandler } from '@application/commands/webhook/handle-nagad-webhook.handler';
import { HandleNagadWebhookCommand } from '@application/commands/webhook/handle-nagad-webhook.command';
import type { PaymentRepository } from '@domain/repositories/payment.repository.interface';

function makeMockRepo() { return { findByGatewayReference: jest.fn() }; }
function makeMockBus() { return { execute: jest.fn() }; }

describe('HandleNagadWebhookHandler', () => {
  let handler: HandleNagadWebhookHandler;
  let repo: ReturnType<typeof makeMockRepo>;
  let bus: ReturnType<typeof makeMockBus>;

  beforeEach(() => {
    repo = makeMockRepo();
    bus = makeMockBus();
    handler = new HandleNagadWebhookHandler(bus as never, repo as unknown as PaymentRepository);
  });

  it('should return null on non-Success', async () => {
    const cmd = new HandleNagadWebhookCommand({
      orderId: 'o1', paymentRefId: 'p1', amount: '100', status: 'Failed', rawPayload: {},
    });
    expect(await handler.execute(cmd)).toBeNull();
  });

  it('should return null when payment missing', async () => {
    repo.findByGatewayReference.mockResolvedValue(null);
    const cmd = new HandleNagadWebhookCommand({
      orderId: 'o1', paymentRefId: 'p1', amount: '100', status: 'Success', rawPayload: {},
    });
    expect(await handler.execute(cmd)).toBeNull();
  });

  it('should execute confirm on success', async () => {
    repo.findByGatewayReference.mockResolvedValue({ id: 'payment-1' });
    bus.execute.mockResolvedValue({ id: 'payment-1' });
    const cmd = new HandleNagadWebhookCommand({
      orderId: 'o1', paymentRefId: 'p1', amount: '100', status: 'Success', rawPayload: {},
    });
    expect(await handler.execute(cmd)).toEqual({ id: 'payment-1' });
  });
});
