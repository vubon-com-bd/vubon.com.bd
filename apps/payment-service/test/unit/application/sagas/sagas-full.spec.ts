import { jest } from '@jest/globals';
import { firstValueFrom, of, take } from 'rxjs';
import { CommandBus } from '@nestjs/cqrs';
import { PaymentLifecycleSaga } from '../../../../src/module/application/sagas/payment-lifecycle.saga.js';
import { RefundLifecycleSaga } from '../../../../src/module/application/sagas/refund-lifecycle.saga.js';
import { WebhookLifecycleSaga } from '../../../../src/module/application/sagas/webhook-lifecycle.saga.js';
import {
  PaymentAuthorizedEvent,
  PaymentDeclinedEvent,
  PaymentChargebackEvent,
  PaymentRetryAttemptedEvent,
} from '../../../../src/module/domain/events/payment.events.js';
import { RefundCancelledEvent } from '../../../../src/module/domain/events/refund.events.js';
import { WebhookDuplicateEvent } from '../../../../src/module/domain/events/webhook.events.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';

describe('PaymentLifecycleSaga — remaining handlers', () => {
  let saga: PaymentLifecycleSaga;
  let bus: { execute: jest.Mock };

  beforeEach(() => {
    bus = { execute: jest.fn(async (c: unknown) => c) };
    saga = new PaymentLifecycleSaga(bus as unknown as CommandBus);
  });

  it('onPaymentAuthorized → UpdateAnalyticsCommand', async () => {
    const e = new PaymentAuthorizedEvent({
      aggregateId: UUID,
      payload: { paymentId: UUID, authorizedAt: NOW, amount: 1000, currency: 'BDT' },
    });
    const cmd = await firstValueFrom(saga.onPaymentAuthorized(of(e)).pipe(take(1)));
    expect((cmd as { type: string }).type).toBe('saga.update_analytics');
  });

  it('onPaymentDeclined → NotifyCustomerCommand', async () => {
    const e = new PaymentDeclinedEvent({
      aggregateId: UUID,
      payload: { paymentId: UUID, declinedAt: NOW, reason: 'insufficient funds' },
    });
    const cmd = await firstValueFrom(saga.onPaymentDeclined(of(e)).pipe(take(1)));
    expect((cmd as { type: string }).type).toBe('saga.notify_customer');
  });

  it('onPaymentChargeback → NotifyCustomerCommand', async () => {
    const e = new PaymentChargebackEvent({
      aggregateId: UUID,
      payload: { paymentId: UUID, chargebackAt: NOW, amount: 1000, currency: 'BDT' },
    });
    const cmd = await firstValueFrom(saga.onPaymentChargeback(of(e)).pipe(take(1)));
    expect((cmd as { type: string }).type).toBe('saga.notify_customer');
  });

  it('onPaymentRetryAttempted → UpdateAnalyticsCommand', async () => {
    const e = new PaymentRetryAttemptedEvent({
      aggregateId: UUID,
      payload: { paymentId: UUID, attempt: 2, attemptedAt: NOW },
    });
    const cmd = await firstValueFrom(saga.onPaymentRetryAttempted(of(e)).pipe(take(1)));
    expect((cmd as { type: string }).type).toBe('saga.update_analytics');
  });
});

describe('RefundLifecycleSaga — remaining handlers', () => {
  let saga: RefundLifecycleSaga;
  let bus: { execute: jest.Mock };

  beforeEach(() => {
    bus = { execute: jest.fn(async (c: unknown) => c) };
    saga = new RefundLifecycleSaga(bus as unknown as CommandBus);
  });

  it('onRefundCancelled → UpdateAnalyticsCommand', async () => {
    const e = new RefundCancelledEvent({
      aggregateId: UUID,
      payload: { refundId: UUID, paymentId: UUID, cancelledAt: NOW, reason: 'x' },
    });
    const cmd = await firstValueFrom(saga.onRefundCancelled(of(e)).pipe(take(1)));
    expect((cmd as { type: string }).type).toBe('saga.update_analytics');
  });
});

describe('WebhookLifecycleSaga — remaining handlers', () => {
  let saga: WebhookLifecycleSaga;

  beforeEach(() => {
    saga = new WebhookLifecycleSaga();
  });

  it('onWebhookDuplicate completes without error', async () => {
    const e = new WebhookDuplicateEvent({
      aggregateId: UUID,
      payload: { webhookId: UUID, gateway: 'bkash', gatewayEventId: 'evt_1' },
    });
    await firstValueFrom(saga.onWebhookDuplicate(of(e)));
    expect(true).toBe(true);
  });
});
