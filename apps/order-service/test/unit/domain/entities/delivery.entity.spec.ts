/**
 * DeliveryEntity tests
 */
import { DeliveryEntity } from '../../../../src/module/domain/entities/delivery.entity.js';
import { DeliveryStatusVO } from '../../../../src/module/domain/value-objects/primitives/delivery-status.vo.js';
import { DeliveryTypeVO } from '../../../../src/module/domain/value-objects/primitives/delivery-type.vo.js';
import { OrderIdVO } from '../../../../src/module/domain/value-objects/primitives/order-id.vo.js';

const NOW = '2026-01-01T10:00:00Z';
const UUID_DELIVERY = '88888888-8888-4888-8888-888888888888';
const UUID_ORDER = '11111111-1111-4111-8111-111111111111';

function makeDelivery(): DeliveryEntity {
  return DeliveryEntity.create({
    id: UUID_DELIVERY,
    now: NOW,
    props: {
      orderId: OrderIdVO.create(UUID_ORDER),
      status: DeliveryStatusVO.scheduled(),
      type: DeliveryTypeVO.create('standard'),
      attempts: 0,
    },
  });
}

describe('DeliveryEntity', () => {
  it('create()', () => {
    const d = makeDelivery();
    expect(d.id).toBe(UUID_DELIVERY);
    expect(d.status.isScheduled()).toBe(true);
  });

  it('assignCourier() from scheduled → assigned', () => {
    const d = makeDelivery();
    d.assignCourier('courier-1', NOW);
    expect(d.courierId).toBe('courier-1');
    expect(d.status.isAssigned()).toBe(true);
  });

  it('assignCourier() throws from non-scheduled', () => {
    const d = makeDelivery();
    d.assignCourier('c1', NOW);
    expect(() => d.assignCourier('c2', NOW)).toThrow();
  });

  it('pickUp() requires courier', () => {
    const d = makeDelivery();
    expect(() => d.pickUp('TRK-AAAA1111', NOW)).toThrow();
  });

  it('pickUp() sets tracking and transitions', () => {
    const d = makeDelivery();
    d.assignCourier('c1', NOW);
    d.pickUp('TRK-AAAA1111', NOW);
    expect(d.trackingNumber).toBe('TRK-AAAA1111');
    expect(d.status.isPickedUp()).toBe(true);
  });

  it('full flow: scheduled → ... → delivered', () => {
    const d = makeDelivery();
    d.assignCourier('c1', NOW);
    d.pickUp('TRK-AAAA1111', NOW);
    d.markInTransit('Dhaka Hub', NOW);
    d.markOutForDelivery(NOW);
    d.deliver('John', NOW);
    expect(d.status.isDelivered()).toBe(true);
    expect(d.isComplete()).toBe(true);
  });

  it('recordAttempt(success) delivers', () => {
    const d = makeDelivery();
    d.assignCourier('c1', NOW);
    d.pickUp('TRK-AAAA1111', NOW);
    d.recordAttempt(true, 'delivered fine', NOW);
    expect(d.status.isDelivered()).toBe(true);
    expect(d.attempts).toBe(1);
  });

  it('recordAttempt(failure) increments; fails after MAX', () => {
    const d = makeDelivery();
    d.assignCourier('c1', NOW);
    d.pickUp('TRK-AAAA1111', NOW);
    d.recordAttempt(false, 'no one home', NOW);
    d.recordAttempt(false, 'no one home', NOW);
    d.recordAttempt(false, 'no one home', NOW);
    expect(d.status.isFailed()).toBe(true);
  });

  it('fail() sets failed with reason', () => {
    const d = makeDelivery();
    d.assignCourier('c1', NOW);
    d.pickUp('TRK-AAAA1111', NOW);
    d.fail('address wrong', NOW);
    expect(d.status.isFailed()).toBe(true);
    expect(d.canRetry()).toBe(true);
  });

  it('reschedule()', () => {
    const d = makeDelivery();
    d.assignCourier('c1', NOW);
    d.reschedule('customer request', '2026-02-01T10:00:00Z', NOW);
    expect(d.status.isRescheduled()).toBe(true);
  });

  it('cancel() throws when delivered', () => {
    const d = makeDelivery();
    d.assignCourier('c1', NOW);
    d.pickUp('TRK-AAAA1111', NOW);
    d.deliver('John', NOW);
    expect(() => d.cancel('reason', NOW)).toThrow();
  });

  it('cancel() from scheduled works', () => {
    const d = makeDelivery();
    d.cancel('customer cancelled', NOW);
    expect(d.status.isCancelled()).toBe(true);
  });
});
