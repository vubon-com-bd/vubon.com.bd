/**
 * OrderCancelSaga — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { of, firstValueFrom } from 'rxjs';
import { OrderCancelSaga } from '@application/sagas/order-cancel.saga.js';
import { OrderCancelledEvent } from '@domain/events/order.events.js';
import { NotifyCustomerCommand } from '@application/sagas/commands/notify-customer.command.js';
import { FIXTURE_ID, FIXTURE_NOW } from '@fixtures/application/entity-factories.js';

describe('OrderCancelSaga', () => {
  let saga: OrderCancelSaga;

  beforeEach(() => {
    saga = new OrderCancelSaga();
  });

  it('emits NotifyCustomerCommand on cancelled', async () => {
    const event = new OrderCancelledEvent({
      aggregateId: FIXTURE_ID,
      payload: {
        orderId: FIXTURE_ID,
        cancelId: FIXTURE_ID,
        reason: 'customer_request',
        cancelledBy: 'admin',
        cancelledAt: FIXTURE_NOW,
      },
      occurredAt: FIXTURE_NOW as never,
    });

    const result$ = saga.onCancelled(of(event));
    const cmd = (await firstValueFrom(result$)) as unknown as NotifyCustomerCommand;

    expect(cmd).toBeInstanceOf(NotifyCustomerCommand);
    expect(cmd.template).toBe('order_cancelled');
    expect(cmd.orderId).toBe(FIXTURE_ID);
  });
});
