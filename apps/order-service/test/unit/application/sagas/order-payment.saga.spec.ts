/**
 * OrderPaymentSaga — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { of, firstValueFrom } from 'rxjs';
import { OrderPaymentSaga } from '@application/sagas/order-payment.saga.js';
import { OrderStatusChangedEvent } from '@domain/events/order.events.js';
import { NotifyCustomerCommand } from '@application/sagas/commands/notify-customer.command.js';
import { FIXTURE_ID, FIXTURE_NOW } from '@fixtures/application/entity-factories.js';

describe('OrderPaymentSaga', () => {
  let saga: OrderPaymentSaga;

  beforeEach(() => {
    saga = new OrderPaymentSaga();
  });

  it('emits NotifyCustomerCommand on OrderStatusChangedEvent', async () => {
    const event = new OrderStatusChangedEvent({
      aggregateId: FIXTURE_ID,
      payload: {
        orderId: FIXTURE_ID,
        fromStatus: 'pending',
        toStatus: 'confirmed',
      },
      occurredAt: FIXTURE_NOW as never,
    });

    const result$ = saga.onStatusChanged(of(event));
    const cmd = (await firstValueFrom(result$)) as unknown as NotifyCustomerCommand;

    expect(cmd).toBeInstanceOf(NotifyCustomerCommand);
    expect(cmd.orderId).toBe(FIXTURE_ID);
    expect(cmd.template).toBe('order_status_changed');
  });
});
