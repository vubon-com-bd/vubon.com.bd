import { jest } from '@jest/globals';
void jest;

import { CouponMapper } from '../../../../src/module/application/mappers/coupon.mapper.js';
import { CartCouponEntity } from '../../../../src/module/domain/entities/cart-coupon.entity.js';
import { CartIdVO } from '../../../../src/module/domain/value-objects/primitives/cart-id.vo.js';
import { CouponCodeVO } from '../../../../src/module/domain/value-objects/primitives/coupon-code.vo.js';
import { CouponStatusVO } from '../../../../src/module/domain/value-objects/primitives/coupon-status.vo.js';
import { COUPON_STATUS } from '@vubon/shared-constants/business/cart';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00Z';

describe('CouponMapper', () => {
  it('maps coupon entity to DTO', () => {
    const entity = CartCouponEntity.create({
      id: UUID,
      now: NOW,
      props: {
        cartId: CartIdVO.create(UUID),
        code: CouponCodeVO.create('SAVE10'),
        status: CouponStatusVO.create(COUPON_STATUS.ACTIVE),
        discountAmount: 100,
        currency: 'BDT',
        appliedAt: NOW,
      },
    });
    const r = CouponMapper.toResponse(entity);
    expect(r.cartId).toBe(UUID);
    expect(r.code).toBe('SAVE10');
    expect(r.discountAmount).toBe(100);
    expect(r.currency).toBe('BDT');
    expect(r.appliedAt).toBe(NOW);
  });
});
