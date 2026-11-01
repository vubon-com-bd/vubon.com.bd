/**
 * OrderCheckoutSaga — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { of } from 'rxjs';
import { firstValueFrom } from 'rxjs';
import { OrderCheckoutSaga } from '@application/sagas/order-checkout.saga.js';
import { OrderCreatedEvent } from '@domain/events/order.events.js';
import { NotifyCustomerCommand } from '@application/sagas/commands/notify-customer.command.js';
import { FIXTURE_ID, FIXTURE_ID_2, FIXTURE_NOW } from '@fixtures/application/entity-factories.js';

describe('OrderCheckoutSaga', () => {
  let saga: OrderCheckoutSaga;

  beforeEach(() => {
    saga = new OrderCheckoutSaga();
  });

  it('emits NotifyCustomerCommand on OrderCreatedEvent', async () => {
    const event = new OrderCreatedEvent({
      aggregateId: FIXTURE_ID,
      payload: {
        orderId: FIXTURE_ID,
        orderNumber: 'ORD-2024-000123',
        customerId: FIXTURE_ID_2,
        totalAmount: 115,
        currency: 'BDT',
        itemCount: 1,
        createdAt: FIXTURE_NOW,
      },
      occurredAt: FIXTURE_NOW as never,
    });

    const events$ = of(event);
    const result$ = saga.onOrderCreated(events$);
    const cmd = (await firstValueFrom(result$)) as unknown as NotifyCustomerCommand;

    expect(cmd).toBeInstanceOf(NotifyCustomerCommand);
    expect(cmd.type).toBe('order.saga.notify-customer');
    expect(cmd.userId).toBe(FIXTURE_ID_2);
    expect(cmd.orderId).toBe(FIXTURE_ID);
    expect(cmd.template).toBe('order_created');
  });

  it('ignores other event types', async () => {
    const events$ = of({ type: 'other.event' });
    const result$ = saga.onOrderCreated(events$);
    // No event matching ofType → observable completes without emission
    await expect(firstValueFrom(result$)).rejects.toBeDefined();
  });
});
