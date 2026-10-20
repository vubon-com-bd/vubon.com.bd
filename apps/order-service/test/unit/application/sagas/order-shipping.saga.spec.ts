/**
 * OrderShippingSaga — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { of, firstValueFrom } from 'rxjs';
import { OrderShippingSaga } from '@application/sagas/order-shipping.saga.js';
import { OrderStatusChangedEvent } from '@domain/events/order.events.js';
import { NotifyCustomerCommand } from '@application/sagas/commands/notify-customer.command.js';
import { FIXTURE_ID, FIXTURE_NOW } from '@fixtures/application/entity-factories.js';

describe('OrderShippingSaga', () => {
  let saga: OrderShippingSaga;

  beforeEach(() => {
    saga = new OrderShippingSaga();
  });

  it('emits NotifyCustomerCommand on shipped', async () => {
    const event = new OrderStatusChangedEvent({
      aggregateId: FIXTURE_ID,
      payload: {
        orderId: FIXTURE_ID,
        fromStatus: 'packed',
        toStatus: 'shipped',
      },
      occurredAt: FIXTURE_NOW as never,
    });

    const result$ = saga.onShipped(of(event));
    const cmd = (await firstValueFrom(result$)) as unknown as NotifyCustomerCommand;

    expect(cmd).toBeInstanceOf(NotifyCustomerCommand);
    expect(cmd.template).toBe('order_shipped');
  });

  it('returns null for non-shipped status', async () => {
    const event = new OrderStatusChangedEvent({
      aggregateId: FIXTURE_ID,
      payload: {
        orderId: FIXTURE_ID,
        fromStatus: 'pending',
        toStatus: 'confirmed',
      },
      occurredAt: FIXTURE_NOW as never,
    });

    const result$ = saga.onShipped(of(event));
    const cmd = await firstValueFrom(result$);
    expect(cmd).toBeNull();
  });
});
