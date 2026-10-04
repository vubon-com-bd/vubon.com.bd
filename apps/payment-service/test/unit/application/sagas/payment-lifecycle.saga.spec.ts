import { jest } from '@jest/globals';
import { firstValueFrom, of, take, toArray } from 'rxjs';
import { CommandBus } from '@nestjs/cqrs';
import { PaymentLifecycleSaga } from '../../../../src/module/application/sagas/payment-lifecycle.saga.js';
import {
  PaymentInitiatedEvent,
  PaymentCapturedEvent,
  PaymentPaidEvent,
  PaymentFailedEvent,
  PaymentRefundedEvent,
} from '../../../../src/module/domain/events/payment.events.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

describe('PaymentLifecycleSaga', () => {
  let saga: PaymentLifecycleSaga;
  let commandBus: { execute: jest.Mock };

  beforeEach(() => {
    commandBus = { execute: jest.fn(async (c: unknown) => c) };
    saga = new PaymentLifecycleSaga(commandBus as unknown as CommandBus);
  });

  it('onPaymentInitiated emits NotifyCustomerCommand', async () => {
    const event = new PaymentInitiatedEvent({
      aggregateId: UUID,
      payload: {
        paymentId: UUID,
        orderId: UUID,
        userId: UUID,
        amount: 1000,
        currency: 'BDT',
        method: 'mobile_banking',
        gateway: 'bkash',
        type: 'one_time',
      },
    });

    const cmds = await firstValueFrom(
      saga.onPaymentInitiated(of(event)).pipe(take(1)),
    );
    expect((cmds as { type: string }).type).toBe('saga.notify_customer');
  });

  it('onPaymentCaptured emits NotifyCustomerCommand', async () => {
    const event = new PaymentCapturedEvent({
      aggregateId: UUID,
      payload: {
        paymentId: UUID,
        capturedAt: new Date().toISOString(),
        amount: 1000,
        currency: 'BDT',
      },
    });
    const cmd = await firstValueFrom(saga.onPaymentCaptured(of(event)).pipe(take(1)));
    expect((cmd as { type: string }).type).toBe('saga.notify_customer');
  });

  it('onPaymentPaid emits NotifyCustomerCommand', async () => {
    const event = new PaymentPaidEvent({
      aggregateId: UUID,
      payload: {
        paymentId: UUID,
        orderId: UUID,
        paidAt: new Date().toISOString(),
        amount: 1000,
        currency: 'BDT',
      },
    });
    const cmd = await firstValueFrom(saga.onPaymentPaid(of(event)).pipe(take(1)));
    expect((cmd as { type: string }).type).toBe('saga.notify_customer');
  });

  it('onPaymentFailed emits NotifyCustomerCommand', async () => {
    const event = new PaymentFailedEvent({
      aggregateId: UUID,
      payload: {
        paymentId: UUID,
        failedAt: new Date().toISOString(),
        reason: 'network',
      },
    });
    const cmd = await firstValueFrom(saga.onPaymentFailed(of(event)).pipe(take(1)));
    expect((cmd as { type: string }).type).toBe('saga.notify_customer');
  });

  it('onPaymentRefunded emits NotifyCustomerCommand', async () => {
    const event = new PaymentRefundedEvent({
      aggregateId: UUID,
      payload: {
        paymentId: UUID,
        refundedAt: new Date().toISOString(),
        amount: 500,
        currency: 'BDT',
        fullyRefunded: false,
      },
    });
    const cmd = await firstValueFrom(saga.onPaymentRefunded(of(event)).pipe(take(1)));
    expect((cmd as { type: string }).type).toBe('saga.notify_customer');
  });
});
