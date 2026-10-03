import { CheckoutStatusVO } from '../../../../../src/module/domain/value-objects/primitives/checkout-status.vo.js';
import { CHECKOUT_STATUS } from '@vubon/shared-constants/business/checkout';

describe('CheckoutStatusVO', () => {
  it('create accepts valid', () => {
    expect(CheckoutStatusVO.create(CHECKOUT_STATUS.PENDING).value).toBe('pending');
  });

  it('create rejects invalid', () => {
    expect(() => CheckoutStatusVO.create('xxx')).toThrow();
  });

  it('isFinal()', () => {
    expect(CheckoutStatusVO.create(CHECKOUT_STATUS.COMPLETED).isFinal()).toBe(true);
    expect(CheckoutStatusVO.create(CHECKOUT_STATUS.ABANDONED).isFinal()).toBe(true);
    expect(CheckoutStatusVO.create(CHECKOUT_STATUS.EXPIRED).isFinal()).toBe(true);
    expect(CheckoutStatusVO.create(CHECKOUT_STATUS.CANCELLED).isFinal()).toBe(true);
    expect(CheckoutStatusVO.pending().isFinal()).toBe(false);
  });

  it('isActive()', () => {
    expect(CheckoutStatusVO.pending().isActive()).toBe(true);
    expect(CheckoutStatusVO.inProgress().isActive()).toBe(true);
    expect(CheckoutStatusVO.create(CHECKOUT_STATUS.COMPLETED).isActive()).toBe(false);
  });

  it('canTransitionTo pending → in_progress/abandoned/expired/cancelled', () => {
    const p = CheckoutStatusVO.pending();
    expect(p.canTransitionTo(CHECKOUT_STATUS.IN_PROGRESS)).toBe(true);
    expect(p.canTransitionTo(CHECKOUT_STATUS.ABANDONED)).toBe(true);
    expect(p.canTransitionTo(CHECKOUT_STATUS.EXPIRED)).toBe(true);
    expect(p.canTransitionTo(CHECKOUT_STATUS.CANCELLED)).toBe(true);
    expect(p.canTransitionTo(CHECKOUT_STATUS.COMPLETED)).toBe(false);
  });

  it('canTransitionTo in_progress → completed/failed/...', () => {
    const i = CheckoutStatusVO.inProgress();
    expect(i.canTransitionTo(CHECKOUT_STATUS.COMPLETED)).toBe(true);
    expect(i.canTransitionTo(CHECKOUT_STATUS.FAILED)).toBe(true);
    expect(i.canTransitionTo(CHECKOUT_STATUS.ABANDONED)).toBe(true);
  });

  it('canTransitionTo failed → pending/cancelled', () => {
    const f = CheckoutStatusVO.create(CHECKOUT_STATUS.FAILED);
    expect(f.canTransitionTo(CHECKOUT_STATUS.PENDING)).toBe(true);
    expect(f.canTransitionTo(CHECKOUT_STATUS.CANCELLED)).toBe(true);
    expect(f.canTransitionTo(CHECKOUT_STATUS.COMPLETED)).toBe(false);
  });
});
