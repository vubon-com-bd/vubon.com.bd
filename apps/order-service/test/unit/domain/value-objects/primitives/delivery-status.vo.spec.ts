import { DeliveryStatusVO } from '../../../../../src/module/domain/value-objects/primitives/delivery-status.vo.js';
import { DELIVERY_STATUS } from '@vubon/shared-constants/logistics';

describe('DeliveryStatusVO', () => {
  it('create accepts valid', () => {
    expect(DeliveryStatusVO.create(DELIVERY_STATUS.SCHEDULED).value).toBe('scheduled');
  });

  it('create rejects invalid', () => {
    expect(() => DeliveryStatusVO.create('xxx')).toThrow();
  });

  it('isFinal()', () => {
    expect(DeliveryStatusVO.create(DELIVERY_STATUS.DELIVERED).isFinal()).toBe(true);
    expect(DeliveryStatusVO.create(DELIVERY_STATUS.FAILED).isFinal()).toBe(true);
    expect(DeliveryStatusVO.create(DELIVERY_STATUS.CANCELLED).isFinal()).toBe(true);
    expect(DeliveryStatusVO.create(DELIVERY_STATUS.REFUSED).isFinal()).toBe(true);
    expect(DeliveryStatusVO.scheduled().isFinal()).toBe(false);
  });

  it('canTransitionTo scheduled → assigned/cancelled', () => {
    const s = DeliveryStatusVO.scheduled();
    expect(s.canTransitionTo(DELIVERY_STATUS.ASSIGNED)).toBe(true);
    expect(s.canTransitionTo(DELIVERY_STATUS.CANCELLED)).toBe(true);
    expect(s.canTransitionTo(DELIVERY_STATUS.DELIVERED)).toBe(false);
  });

  it('canTransitionTo out_for_delivery → arrived/delivered/failed/refused', () => {
    const o = DeliveryStatusVO.create(DELIVERY_STATUS.OUT_FOR_DELIVERY);
    expect(o.canTransitionTo(DELIVERY_STATUS.ARRIVED)).toBe(true);
    expect(o.canTransitionTo(DELIVERY_STATUS.DELIVERED)).toBe(true);
    expect(o.canTransitionTo(DELIVERY_STATUS.FAILED)).toBe(true);
    expect(o.canTransitionTo(DELIVERY_STATUS.REFUSED)).toBe(true);
  });

  it('canTransitionTo failed → rescheduled/cancelled', () => {
    const f = DeliveryStatusVO.create(DELIVERY_STATUS.FAILED);
    expect(f.canTransitionTo(DELIVERY_STATUS.RESCHEDULED)).toBe(true);
    expect(f.canTransitionTo(DELIVERY_STATUS.CANCELLED)).toBe(true);
  });

  it('terminal cannot transition', () => {
    expect(DeliveryStatusVO.create(DELIVERY_STATUS.DELIVERED).canTransitionTo('in_transit')).toBe(false);
  });
});
