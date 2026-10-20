/**
 * OrderDeliverySaga — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { of, firstValueFrom } from 'rxjs';
import { OrderDeliverySaga } from '@application/sagas/order-delivery.saga.js';
import { OrderStatusChangedEvent } from '@domain/events/order.events.js';
import { NotifyCustomerCommand } from '@application/sagas/commands/notify-customer.command.js';
import { FIXTURE_ID, FIXTURE_NOW } from '@fixtures/application/entity-factories.js';

describe('OrderDeliverySaga', () => {
  let saga: OrderDeliverySaga;

  beforeEach(() => {
    saga = new OrderDeliverySaga();
  });

  it('emits NotifyCustomerCommand on delivered', async () => {
    const event = new OrderStatusChangedEvent({
      aggregateId: FIXTURE_ID,
      payload: {
        orderId: FIXTURE_ID,
        fromStatus: 'shipped',
        toStatus: 'delivered',
      },
      occurredAt: FIXTURE_NOW as never,
    });

    const result$ = saga.onDelivered(of(event));
    const cmd = (await firstValueFrom(result$)) as unknown as NotifyCustomerCommand;

    expect(cmd).toBeInstanceOf(NotifyCustomerCommand);
    expect(cmd.template).toBe('order_delivered');
  });

  it('returns null for non-delivered status', async () => {
    const event = new OrderStatusChangedEvent({
      aggregateId: FIXTURE_ID,
      payload: {
        orderId: FIXTURE_ID,
        fromStatus: 'pending',
        toStatus: 'confirmed',
      },
      occurredAt: FIXTURE_NOW as never,
    });

    const result$ = saga.onDelivered(of(event));
    const cmd = await firstValueFrom(result$);
    expect(cmd).toBeNull();
  });
});
