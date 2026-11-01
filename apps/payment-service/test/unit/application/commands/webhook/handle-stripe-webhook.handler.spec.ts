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

import { HandleStripeWebhookHandler } from '@application/commands/webhook/handle-stripe-webhook.handler';
import { HandleStripeWebhookCommand } from '@application/commands/webhook/handle-stripe-webhook.command';
import type { PaymentRepository } from '@domain/repositories/payment.repository.interface';

function makeMockRepo() { return { findByGatewayReference: jest.fn() }; }
function makeMockBus() { return { execute: jest.fn() }; }

describe('HandleStripeWebhookHandler', () => {
  let handler: HandleStripeWebhookHandler;
  let repo: ReturnType<typeof makeMockRepo>;
  let bus: ReturnType<typeof makeMockBus>;

  beforeEach(() => {
    repo = makeMockRepo();
    bus = makeMockBus();
    handler = new HandleStripeWebhookHandler(bus as never, repo as unknown as PaymentRepository);
  });

  it('should return null on non-payment.succeeded', async () => {
    const cmd = new HandleStripeWebhookCommand({
      id: 'evt1', type: 'charge.refunded', data: { object: { id: 'pi_1' } },
      signature: 'sig', rawPayload: {},
    });
    expect(await handler.execute(cmd)).toBeNull();
  });

  it('should return null if no intent id', async () => {
    const cmd = new HandleStripeWebhookCommand({
      id: 'evt1', type: 'payment_intent.succeeded', data: { object: {} },
      signature: 'sig', rawPayload: {},
    });
    expect(await handler.execute(cmd)).toBeNull();
  });

  it('should return null when payment missing', async () => {
    repo.findByGatewayReference.mockResolvedValue(null);
    const cmd = new HandleStripeWebhookCommand({
      id: 'evt1', type: 'payment_intent.succeeded', data: { object: { id: 'pi_1' } },
      signature: 'sig', rawPayload: {},
    });
    expect(await handler.execute(cmd)).toBeNull();
  });

  it('should confirm on valid payment', async () => {
    repo.findByGatewayReference.mockResolvedValue({ id: 'payment-1' });
    bus.execute.mockResolvedValue({ id: 'payment-1', status: 'captured' });
    const cmd = new HandleStripeWebhookCommand({
      id: 'evt1', type: 'payment_intent.succeeded', data: { object: { id: 'pi_1' } },
      signature: 'sig', rawPayload: {},
    });
    expect(await handler.execute(cmd)).toEqual({ id: 'payment-1', status: 'captured' });
  });
});
