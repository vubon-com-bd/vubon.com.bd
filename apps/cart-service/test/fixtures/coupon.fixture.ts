/**
 * CartCoupon test fixtures
 * @module cart-service/test/fixtures
 *
 * ⚠️ Coupon codes must be 4-32 chars (see CouponCodeVO validation).
 */
import { CartCouponEntity } from '@domain/entities/cart-coupon.entity.js';
import { CartIdVO } from '@domain/value-objects/primitives/cart-id.vo.js';
import { CouponCodeVO } from '@domain/value-objects/primitives/coupon-code.vo.js';
import { CouponStatusVO } from '@domain/value-objects/primitives/coupon-status.vo.js';
import { CouponDiscountVO } from '@domain/value-objects/primitives/coupon-discount.vo.js';
import { TEST_IDS, TEST_DATES, TEST_CURRENCY } from './ids.fixture.js';

export function makeCartCoupon(overrides: {
  code?: string;
  type?: 'percentage' | 'fixed';
  value?: number;
  maxAmount?: number;
  minOrderAmount?: number;
  status?: string;
  expiresAt?: string;
} = {}): CartCouponEntity {
  return CartCouponEntity.create({
    id: 'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
    props: {
      cartId: CartIdVO.create(TEST_IDS.CART_ID),
      code: CouponCodeVO.create(overrides.code ?? 'SAVE20'),
      status: CouponStatusVO.create(overrides.status ?? 'active'),
      discount: CouponDiscountVO.create({
        type: overrides.type ?? 'percentage',
        value: overrides.value ?? 20,
        maxAmount: overrides.maxAmount,
      }),
      appliedDiscountAmount: 0,
      currency: TEST_CURRENCY,
      minOrderAmount: overrides.minOrderAmount,
      expiresAt: overrides.expiresAt ?? TEST_DATES.NEXT_MONTH,
    },
    now: TEST_DATES.NOW,
  });
}

/**
 * Coupon entity factory with valid default code, for service tests.
 * Uses "OLDCODE" (7 chars, valid).
 */
export function makeOldCoupon(overrides: Parameters<typeof makeCartCoupon>[0] = {}) {
  return makeCartCoupon({ code: 'OLDCODE', ...overrides });
}
