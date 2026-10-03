import { TrackingStatusVO } from '../../../../../src/module/domain/value-objects/primitives/tracking-status.vo.js';
import { ORDER_TRACKING_EVENT } from '@vubon/shared-constants/business/order';

describe('TrackingStatusVO', () => {
  it('create accepts valid', () => {
    expect(TrackingStatusVO.create(ORDER_TRACKING_EVENT.ORDER_PLACED).value).toBe('order_placed');
  });

  it('create rejects invalid', () => {
    expect(() => TrackingStatusVO.create('xxx')).toThrow();
  });

  it('predicates', () => {
    expect(TrackingStatusVO.create(ORDER_TRACKING_EVENT.ORDER_PLACED).isOrderPlaced()).toBe(true);
    expect(TrackingStatusVO.create(ORDER_TRACKING_EVENT.DELIVERED).isDelivered()).toBe(true);
    expect(TrackingStatusVO.create(ORDER_TRACKING_EVENT.CANCELLED).isCancelled()).toBe(true);
    expect(TrackingStatusVO.create(ORDER_TRACKING_EVENT.RETURNED).isReturned()).toBe(true);
  });

  it('isTerminal()', () => {
    expect(TrackingStatusVO.create(ORDER_TRACKING_EVENT.DELIVERED).isTerminal()).toBe(true);
    expect(TrackingStatusVO.create(ORDER_TRACKING_EVENT.CANCELLED).isTerminal()).toBe(true);
    expect(TrackingStatusVO.create(ORDER_TRACKING_EVENT.RETURNED).isTerminal()).toBe(true);
    expect(TrackingStatusVO.create(ORDER_TRACKING_EVENT.ORDER_PLACED).isTerminal()).toBe(false);
    expect(TrackingStatusVO.create(ORDER_TRACKING_EVENT.IN_TRANSIT).isTerminal()).toBe(false);
  });
});
