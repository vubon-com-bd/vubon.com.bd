/**
 * OrderFulfillmentEntity tests
 */
import { OrderFulfillmentEntity } from '../../../../src/module/domain/entities/order-fulfillment.entity.js';
import { FulfillmentStatusVO } from '../../../../src/module/domain/value-objects/primitives/fulfillment-status.vo.js';
import { OrderIdVO } from '../../../../src/module/domain/value-objects/primitives/order-id.vo.js';
import { OrderItemIdVO } from '../../../../src/module/domain/value-objects/primitives/order-item-id.vo.js';
import { TrackingNumberVO } from '../../../../src/module/domain/value-objects/primitives/tracking-number.vo.js';

const NOW = '2026-01-01T10:00:00Z';
const UUID_FULFILL = 'f1111111-1111-4111-8111-111111111111';
const UUID_ORDER = '11111111-1111-4111-8111-111111111111';
const UUID_ITEM = '44444444-4444-4444-8444-444444444444';

function makeFulfillment(): OrderFulfillmentEntity {
  return OrderFulfillmentEntity.create({
    id: UUID_FULFILL,
    now: NOW,
    props: {
      orderId: OrderIdVO.create(UUID_ORDER),
      status: FulfillmentStatusVO.unfulfilled(),
      type: 'standard',
      itemIds: [OrderItemIdVO.create(UUID_ITEM)],
      currency: 'BDT',
    },
  });
}

describe('OrderFulfillmentEntity', () => {
  it('create()', () => {
    const f = makeFulfillment();
    expect(f.status.isUnfulfilled()).toBe(true);
    expect(f.itemCount).toBe(1);
  });

  it('throws on empty itemIds', () => {
    expect(() =>
      OrderFulfillmentEntity.create({
        id: UUID_FULFILL,
        now: NOW,
        props: {
          orderId: OrderIdVO.create(UUID_ORDER),
          status: FulfillmentStatusVO.unfulfilled(),
          type: 'standard',
          itemIds: [],
          currency: 'BDT',
        },
      }),
    ).toThrow();
  });

  it('pack()', () => {
    const f = makeFulfillment();
    f.pack(1, NOW);
    expect(f.domainEvents.length).toBeGreaterThan(1); // Started + Packed
  });

  it('ship() sets tracking', () => {
    const f = makeFulfillment();
    f.ship(TrackingNumberVO.create('TRK-AAAA1111'), 'courier-1', NOW);
    expect(f.trackingNumber?.value).toBe('TRK-AAAA1111');
    expect(f.hasTracking()).toBe(true);
  });

  it('markPartiallyFulfilled()', () => {
    const f = makeFulfillment();
    f.markPartiallyFulfilled(1, 1, NOW);
    expect(f.status.isPartiallyFulfilled()).toBe(true);
    expect(f.isPartial()).toBe(true);
  });

  it('complete() → fulfilled', () => {
    const f = makeFulfillment();
    f.complete(NOW);
    expect(f.status.isFulfilled()).toBe(true);
    expect(f.fulfilledAt).toBe(NOW);
    expect(f.isComplete()).toBe(true);
  });

  it('complete() idempotent', () => {
    const f = makeFulfillment();
    f.complete(NOW);
    const before = f.domainEvents.length;
    f.complete(NOW);
    expect(f.domainEvents.length).toBe(before);
  });

  it('cancel() throws from final', () => {
    const f = makeFulfillment();
    f.complete(NOW);
    expect(() => f.cancel('reason', NOW)).toThrow();
  });

  it('cancel() from pending', () => {
    const f = makeFulfillment();
    f.cancel('out of stock', NOW);
    expect(f.status.isCancelled()).toBe(true);
  });
});
