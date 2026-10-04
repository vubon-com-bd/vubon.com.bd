import { jest } from '@jest/globals';
import { firstValueFrom, of, take } from 'rxjs';
import { CommandBus } from '@nestjs/cqrs';
import { RefundLifecycleSaga } from '../../../../src/module/application/sagas/refund-lifecycle.saga.js';
import {
  RefundRequestedEvent,
  RefundSucceededEvent,
  RefundFailedEvent,
} from '../../../../src/module/domain/events/refund.events.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

describe('RefundLifecycleSaga', () => {
  let saga: RefundLifecycleSaga;
  let commandBus: { execute: jest.Mock };

  beforeEach(() => {
    commandBus = { execute: jest.fn(async (c: unknown) => c) };
    saga = new RefundLifecycleSaga(commandBus as unknown as CommandBus);
  });

  it('onRefundRequested emits NotifyCustomerCommand', async () => {
    const e = new RefundRequestedEvent({
      aggregateId: UUID,
      payload: {
        refundId: UUID,
        paymentId: UUID,
        amount: 500,
        currency: 'BDT',
      },
    });
    const cmd = await firstValueFrom(saga.onRefundRequested(of(e)).pipe(take(1)));
    expect((cmd as { type: string }).type).toBe('saga.notify_customer');
  });

  it('onRefundSucceeded emits NotifyCustomerCommand', async () => {
    const e = new RefundSucceededEvent({
      aggregateId: UUID,
      payload: {
        refundId: UUID,
        paymentId: UUID,
        processedAt: new Date().toISOString(),
        amount: 500,
        currency: 'BDT',
      },
    });
    const cmd = await firstValueFrom(saga.onRefundSucceeded(of(e)).pipe(take(1)));
    expect((cmd as { type: string }).type).toBe('saga.notify_customer');
  });

  it('onRefundFailed emits NotifyCustomerCommand', async () => {
    const e = new RefundFailedEvent({
      aggregateId: UUID,
      payload: {
        refundId: UUID,
        paymentId: UUID,
        failedAt: new Date().toISOString(),
        reason: 'gateway rejected',
      },
    });
    const cmd = await firstValueFrom(saga.onRefundFailed(of(e)).pipe(take(1)));
    expect((cmd as { type: string }).type).toBe('saga.notify_customer');
  });
});
