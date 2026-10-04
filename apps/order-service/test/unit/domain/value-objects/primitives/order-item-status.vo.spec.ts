/**
 * OrderItemStatusVO — state machine tests
 */
import { OrderItemStatusVO } from '../../../../../src/module/domain/value-objects/primitives/order-item-status.vo.js';
import { ORDER_ITEM_STATUS } from '@vubon/shared-constants/business/order';

describe('OrderItemStatusVO', () => {
  it('create() accepts valid', () => {
    expect(OrderItemStatusVO.create(ORDER_ITEM_STATUS.PENDING).value).toBe('pending');
  });

  it('create() rejects invalid', () => {
    expect(() => OrderItemStatusVO.create('bogus')).toThrow();
  });

  it('named constructors', () => {
    expect(OrderItemStatusVO.pending().value).toBe('pending');
    expect(OrderItemStatusVO.shipped().value).toBe('shipped');
    expect(OrderItemStatusVO.delivered().value).toBe('delivered');
  });

  it('isFinal()', () => {
    expect(OrderItemStatusVO.delivered().isFinal()).toBe(true);
    expect(OrderItemStatusVO.cancelled().isFinal()).toBe(true);
    expect(OrderItemStatusVO.returned().isFinal()).toBe(true);
    expect(OrderItemStatusVO.refunded().isFinal()).toBe(true);
    expect(OrderItemStatusVO.pending().isFinal()).toBe(false);
    expect(OrderItemStatusVO.shipped().isFinal()).toBe(false);
  });

  it('canTransitionTo: pending → confirmed/cancelled', () => {
    const p = OrderItemStatusVO.pending();
    expect(p.canTransitionTo('confirmed')).toBe(true);
    expect(p.canTransitionTo('cancelled')).toBe(true);
    expect(p.canTransitionTo('delivered')).toBe(false);
  });

  it('canTransitionTo: confirmed → packed/cancelled', () => {
    const c = OrderItemStatusVO.confirmed();
    expect(c.canTransitionTo('packed')).toBe(true);
    expect(c.canTransitionTo('cancelled')).toBe(true);
  });

  it('canTransitionTo: shipped → delivered/returned', () => {
    const s = OrderItemStatusVO.shipped();
    expect(s.canTransitionTo('delivered')).toBe(true);
    expect(s.canTransitionTo('returned')).toBe(true);
  });

  it('canTransitionTo: delivered → returned/refunded', () => {
    const d = OrderItemStatusVO.delivered();
    expect(d.canTransitionTo('returned')).toBe(true);
    expect(d.canTransitionTo('refunded')).toBe(true);
  });

  it('canTransitionTo: terminal statuses', () => {
    expect(OrderItemStatusVO.refunded().canTransitionTo('pending')).toBe(false);
  });
});
