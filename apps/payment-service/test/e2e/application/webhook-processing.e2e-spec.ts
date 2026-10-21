/**
 * Webhook Processing — E2E
 * @module payment-service/test/e2e/application
 *
 * Full pipeline: webhook command → handler → CommandBus.execute(ConfirmPaymentCommand)
 */
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
import { HandleStripeWebhookHandler } from '@application/commands/webhook/handle-stripe-webhook.handler';
import { HandleStripeWebhookCommand } from '@application/commands/webhook/handle-stripe-webhook.command';
import { HandleNagadWebhookHandler } from '@application/commands/webhook/handle-nagad-webhook.handler';
import { HandleNagadWebhookCommand } from '@application/commands/webhook/handle-nagad-webhook.command';
import { HandleSslcommerzWebhookHandler } from '@application/commands/webhook/handle-sslcommerz-webhook.handler';
import { HandleSslcommerzWebhookCommand } from '@application/commands/webhook/handle-sslcommerz-webhook.command';
import type { PaymentRepository } from '@domain/repositories/payment.repository.interface';

function makeRepo() {
  return { findByGatewayReference: jest.fn() };
}
function makeBus() {
  return { execute: jest.fn() };
}

describe('E2E: Webhook Processing', () => {
  it('bKash → confirm payment', async () => {
    const repo = makeRepo();
    const bus = makeBus();
    repo.findByGatewayReference.mockResolvedValue({ id: 'payment-1' });
    bus.execute.mockResolvedValue({ id: 'payment-1', status: 'captured' });

    const handler = new HandleBkashWebhookHandler(
      bus as never,
      repo as unknown as PaymentRepository,
    );
    const result = await handler.execute(
      new HandleBkashWebhookCommand({
        paymentID: 'p1', trxID: 'tx1', amount: '1000',
        transactionStatus: 'Completed', rawPayload: {},
      }),
    );
    expect(result).toEqual({ id: 'payment-1', status: 'captured' });
    expect(bus.execute).toHaveBeenCalledTimes(1);
  });

  it('Stripe → confirm payment', async () => {
    const repo = makeRepo();
    const bus = makeBus();
    repo.findByGatewayReference.mockResolvedValue({ id: 'payment-1' });
    bus.execute.mockResolvedValue({ id: 'payment-1' });

    const handler = new HandleStripeWebhookHandler(
      bus as never,
      repo as unknown as PaymentRepository,
    );
    const result = await handler.execute(
      new HandleStripeWebhookCommand({
        id: 'evt1', type: 'payment_intent.succeeded',
        data: { object: { id: 'pi_1' } }, signature: 'sig', rawPayload: {},
      }),
    );
    expect(result).toEqual({ id: 'payment-1' });
  });

  it('Nagad → confirm payment', async () => {
    const repo = makeRepo();
    const bus = makeBus();
    repo.findByGatewayReference.mockResolvedValue({ id: 'payment-1' });
    bus.execute.mockResolvedValue({ id: 'payment-1' });

    const handler = new HandleNagadWebhookHandler(
      bus as never,
      repo as unknown as PaymentRepository,
    );
    const result = await handler.execute(
      new HandleNagadWebhookCommand({
        orderId: 'o1', paymentRefId: 'p1', amount: '100',
        status: 'Success', rawPayload: {},
      }),
    );
    expect(result).toEqual({ id: 'payment-1' });
  });

  it('SSLCommerz → confirm payment', async () => {
    const repo = makeRepo();
    const bus = makeBus();
    repo.findByGatewayReference.mockResolvedValue({ id: 'payment-1' });
    bus.execute.mockResolvedValue({ id: 'payment-1' });

    const handler = new HandleSslcommerzWebhookHandler(
      bus as never,
      repo as unknown as PaymentRepository,
    );
    const result = await handler.execute(
      new HandleSslcommerzWebhookCommand({
        tran_id: 't1', val_id: 'v1', amount: '100', status: 'VALID', rawPayload: {},
      }),
    );
    expect(result).toEqual({ id: 'payment-1' });
  });

  it('webhook for unknown payment returns null (no confirm)', async () => {
    const repo = makeRepo();
    const bus = makeBus();
    repo.findByGatewayReference.mockResolvedValue(null);

    const handler = new HandleBkashWebhookHandler(
      bus as never,
      repo as unknown as PaymentRepository,
    );
    const result = await handler.execute(
      new HandleBkashWebhookCommand({
        paymentID: 'unknown', trxID: 'tx', amount: '100',
        transactionStatus: 'Completed', rawPayload: {},
      }),
    );
    expect(result).toBeNull();
    expect(bus.execute).not.toHaveBeenCalled();
  });
});
