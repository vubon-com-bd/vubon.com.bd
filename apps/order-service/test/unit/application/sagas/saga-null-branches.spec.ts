/**
 * Saga Null Branch Coverage
 * @module order-service/test/unit/application/sagas
 *
 * Covers the `if (status !== X) return null` branches.
 */
import { describe, it, expect } from '@jest/globals';
import { of, firstValueFrom } from 'rxjs';
import { OrderShippingSaga } from '@application/sagas/order-shipping.saga.js';
import { OrderDeliverySaga } from '@application/sagas/order-delivery.saga.js';
import { OrderFulfillmentSaga } from '@application/sagas/order-fulfillment.saga.js';
import { OrderStatusChangedEvent } from '@domain/events/order.events.js';
import { FIXTURE_ID, FIXTURE_NOW } from '@fixtures/application/entity-factories.js';

function makeStatusEvent(from: string, to: string): OrderStatusChangedEvent {
  return new OrderStatusChangedEvent({
    aggregateId: FIXTURE_ID,
    payload: { orderId: FIXTURE_ID, fromStatus: from, toStatus: to },
    occurredAt: FIXTURE_NOW as never,
  });
}

describe('Saga null branch — non-matching statuses', () => {
  it('OrderShippingSaga returns null for pending → confirmed', async () => {
    const saga = new OrderShippingSaga();
    const result = await firstValueFrom(saga.onShipped(of(makeStatusEvent('pending', 'confirmed'))));
    expect(result).toBeNull();
  });

  it('OrderDeliverySaga returns null for pending → confirmed', async () => {
    const saga = new OrderDeliverySaga();
    const result = await firstValueFrom(saga.onDelivered(of(makeStatusEvent('pending', 'confirmed'))));
    expect(result).toBeNull();
  });

  it('OrderFulfillmentSaga returns null for pending → cancelled', async () => {
    const saga = new OrderFulfillmentSaga();
    const result = await firstValueFrom(saga.onConfirmed(of(makeStatusEvent('pending', 'cancelled'))));
    expect(result).toBeNull();
  });

  it('OrderShippingSaga returns NotifyCustomer on shipped', async () => {
    const saga = new OrderShippingSaga();
    const result = await firstValueFrom(saga.onShipped(of(makeStatusEvent('packed', 'shipped'))));
    expect(result).not.toBeNull();
  });

  it('OrderDeliverySaga returns NotifyCustomer on delivered', async () => {
    const saga = new OrderDeliverySaga();
    const result = await firstValueFrom(saga.onDelivered(of(makeStatusEvent('shipped', 'delivered'))));
    expect(result).not.toBeNull();
  });

  it('OrderFulfillmentSaga returns NotifyVendor on confirmed', async () => {
    const saga = new OrderFulfillmentSaga();
    const result = await firstValueFrom(saga.onConfirmed(of(makeStatusEvent('pending', 'confirmed'))));
    expect(result).not.toBeNull();
  });
});
