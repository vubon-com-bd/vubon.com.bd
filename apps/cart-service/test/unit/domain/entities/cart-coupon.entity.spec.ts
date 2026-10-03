/**
 * CartCouponEntity — Unit Tests
 */
import { CartCouponEntity } from '../../../../src/module/domain/entities/cart-coupon.entity.js';
import { CartIdVO } from '../../../../src/module/domain/value-objects/primitives/cart-id.vo.js';
import { CouponCodeVO } from '../../../../src/module/domain/value-objects/primitives/coupon-code.vo.js';
import { CouponStatusVO } from '../../../../src/module/domain/value-objects/primitives/coupon-status.vo.js';
import { COUPON_STATUS } from '@vubon/shared-constants/business/cart';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00Z';

function makeProps(overrides = {}) {
  return {
    cartId: CartIdVO.create(UUID),
    code: CouponCodeVO.create('SAVE10'),
    status: CouponStatusVO.create(COUPON_STATUS.ACTIVE),
    discountAmount: 100,
    currency: 'BDT',
    appliedAt: NOW,
    ...overrides,
  };
}

describe('CartCouponEntity', () => {
  it('creates entity and emits CouponAppliedEvent', () => {
    const e = CartCouponEntity.create({ id: UUID, props: makeProps() as never, now: NOW });
    expect(e.code.value).toBe('SAVE10');
    expect(e.domainEvents.some((ev) => ev.type === 'cart.coupon.applied')).toBe(true);
  });

  it('isActive() true for active status', () => {
    const e = CartCouponEntity.create({ id: UUID, props: makeProps() as never, now: NOW });
    expect(e.isActive()).toBe(true);
  });

  it('invalidate() sets status EXPIRED', () => {
    const e = CartCouponEntity.create({ id: UUID, props: makeProps() as never, now: NOW });
    e.invalidate('expired', NOW);
    expect(e.status.isExpired()).toBe(true);
  });

  it('remove() emits CouponRemovedEvent', () => {
    const e = CartCouponEntity.create({ id: UUID, props: makeProps() as never, now: NOW });
    e.remove(undefined, 'user cancelled', NOW);
    expect(e.domainEvents.some((ev) => ev.type === 'cart.coupon.removed')).toBe(true);
  });
});
