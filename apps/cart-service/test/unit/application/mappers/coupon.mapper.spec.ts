import { describe, it, expect } from '@jest/globals';
import { CouponMapper } from '../../../../src/module/application/mappers/coupon.mapper.js';
import { CartCouponEntity } from '../../../../src/module/domain/entities/cart-coupon.entity.js';
import { CartVoucherEntity } from '../../../../src/module/domain/entities/cart-voucher.entity.js';
import { CartIdVO } from '../../../../src/module/domain/value-objects/primitives/cart-id.vo.js';
import { CouponCodeVO } from '../../../../src/module/domain/value-objects/primitives/coupon-code.vo.js';
import { CouponStatusVO } from '../../../../src/module/domain/value-objects/primitives/coupon-status.vo.js';
import { CouponDiscountVO } from '../../../../src/module/domain/value-objects/primitives/coupon-discount.vo.js';
import { VoucherCodeVO } from '../../../../src/module/domain/value-objects/primitives/voucher-code.vo.js';
import { VoucherStatusVO } from '../../../../src/module/domain/value-objects/primitives/voucher-status.vo.js';

const ID = '123e4567-e89b-12d3-a456-426614174000';
const CART_ID = '223e4567-e89b-12d3-a456-426614174000';
const NOW = '2024-01-15T10:00:00.000Z';
const EXPIRES = '2024-12-31T23:59:59.000Z';

function makeCoupon(): CartCouponEntity {
  return CartCouponEntity.create({
    id: ID,
    now: NOW,
    props: {
      cartId: CartIdVO.create(CART_ID),
      code: CouponCodeVO.create('SAVE20'),
      status: CouponStatusVO.active(),
      discount: CouponDiscountVO.create({ type: 'percentage', value: 20 }),
      appliedDiscountAmount: 100,
      currency: 'BDT',
      expiresAt: EXPIRES,
    },
  });
}

function makeVoucher(): CartVoucherEntity {
  return CartVoucherEntity.create({
    id: ID,
    now: NOW,
    props: {
      cartId: CartIdVO.create(CART_ID),
      code: VoucherCodeVO.create('GIFT12345678'),
      status: VoucherStatusVO.active(),
      remainingAmount: 1000,
      appliedAmount: 0,
      currency: 'BDT',
      expiresAt: EXPIRES,
    },
  });
}

describe('CouponMapper', () => {
  describe('toResponse (coupon)', () => {
    it('should map coupon fields correctly', () => {
      const entity = makeCoupon();
      const dto = CouponMapper.toResponse(entity);

      expect(dto.id).toBe(ID);
      expect(dto.cartId).toBe(CART_ID);
      expect(dto.code).toBe('SAVE20');
      expect(dto.status).toBe('active');
      expect(dto.discountType).toBe('percentage');
      expect(dto.discountValue).toBe(20);
      expect(dto.appliedDiscountAmount).toBe(100);
      expect(dto.currency).toBe('BDT');
    });
  });

  describe('toPublicResponse (coupon)', () => {
    it('should produce customer-safe coupon', () => {
      const entity = makeCoupon();
      const dto = CouponMapper.toPublicResponse(entity);

      expect(dto.id).toBe(ID);
      expect(dto.code).toBe('SAVE20');
      expect((dto as Record<string, unknown>).cartId).toBeUndefined();
    });
  });

  describe('voucherToResponse', () => {
    it('should map voucher fields correctly', () => {
      const entity = makeVoucher();
      const dto = CouponMapper.voucherToResponse(entity);

      expect(dto.id).toBe(ID);
      expect(dto.cartId).toBe(CART_ID);
      expect(dto.code).toBe('GIFT12345678');
      expect(dto.status).toBe('active');
      expect(dto.remainingAmount).toBe(1000);
      expect(dto.appliedAmount).toBe(0);
      expect(dto.currency).toBe('BDT');
    });
  });

  describe('voucherToPublicResponse', () => {
    it('should produce customer-safe voucher', () => {
      const entity = makeVoucher();
      const dto = CouponMapper.voucherToPublicResponse(entity);

      expect(dto.id).toBe(ID);
      expect(dto.code).toBe('GIFT12345678');
      expect(dto.remainingAmount).toBe(1000);
      expect((dto as Record<string, unknown>).cartId).toBeUndefined();
    });
  });
});
