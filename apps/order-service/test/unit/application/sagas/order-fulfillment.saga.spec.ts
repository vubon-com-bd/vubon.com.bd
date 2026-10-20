/**
 * OrderFulfillmentSaga — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { of, firstValueFrom } from 'rxjs';
import { OrderFulfillmentSaga } from '@application/sagas/order-fulfillment.saga.js';
import { OrderStatusChangedEvent } from '@domain/events/order.events.js';
import { NotifyVendorCommand } from '@application/sagas/commands/notify-vendor.command.js';
import { FIXTURE_ID, FIXTURE_NOW } from '@fixtures/application/entity-factories.js';

describe('OrderFulfillmentSaga', () => {
  let saga: OrderFulfillmentSaga;

  beforeEach(() => {
    saga = new OrderFulfillmentSaga();
  });

  it('emits NotifyVendorCommand when order is confirmed', async () => {
    const event = new OrderStatusChangedEvent({
      aggregateId: FIXTURE_ID,
      payload: {
        orderId: FIXTURE_ID,
        fromStatus: 'pending',
        toStatus: 'confirmed',
      },
      occurredAt: FIXTURE_NOW as never,
    });

    const result$ = saga.onConfirmed(of(event));
    const cmd = (await firstValueFrom(result$)) as unknown as NotifyVendorCommand;

    expect(cmd).toBeInstanceOf(NotifyVendorCommand);
    expect(cmd.orderId).toBe(FIXTURE_ID);
  });

  it('returns null for other statuses', async () => {
    const event = new OrderStatusChangedEvent({
      aggregateId: FIXTURE_ID,
      payload: {
        orderId: FIXTURE_ID,
        fromStatus: 'confirmed',
        toStatus: 'processing',
      },
      occurredAt: FIXTURE_NOW as never,
    });

    const result$ = saga.onConfirmed(of(event));
    const cmd = await firstValueFrom(result$);
    expect(cmd).toBeNull();
  });
});
