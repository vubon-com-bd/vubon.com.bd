import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { CartCouponService } from '../../../../src/module/application/services/impl/cart-coupon.service.js';
import type { CartRepository } from '../../../../src/module/domain/repositories/cart.repository.interface.js';
import type { CartCouponRepository } from '../../../../src/module/domain/repositories/cart-coupon.repository.interface.js';
import { CartEntity } from '../../../../src/module/domain/entities/cart.entity.js';
import { CartCouponEntity } from '../../../../src/module/domain/entities/cart-coupon.entity.js';
import { CartIdVO } from '../../../../src/module/domain/value-objects/primitives/cart-id.vo.js';
import { CouponCodeVO } from '../../../../src/module/domain/value-objects/primitives/coupon-code.vo.js';
import { CouponStatusVO } from '../../../../src/module/domain/value-objects/primitives/coupon-status.vo.js';
import { CouponDiscountVO } from '../../../../src/module/domain/value-objects/primitives/coupon-discount.vo.js';
import { CartTypeVO } from '../../../../src/module/domain/value-objects/primitives/cart-type.vo.js';
import { CouponAlreadyAppliedApplicationError, CouponNotFoundApplicationError } from '../../../../src/module/application/errors/coupon.errors.js';

const CART_ID = '123e4567-e89b-12d3-a456-426614174000';
const COUPON_ID = '223e4567-e89b-12d3-a456-426614174000';
const NOW = '2024-01-15T10:00:00.000Z';

function makeCart(): CartEntity {
  return CartEntity.reconstitute({
    id: CART_ID, createdAt: NOW, updatedAt: NOW, status: 'active',
    props: {
      type: CartTypeVO.user(),
      currency: 'BDT', itemCount: 0, subtotal: 500, discountAmount: 0,
      taxAmount: 0, shippingAmount: 0, total: 500,
      expiresAt: '2099-12-31T23:59:59.000Z', lastActivityAt: NOW,
    },
  });
}

function makeCoupon(): CartCouponEntity {
  return CartCouponEntity.create({
    id: COUPON_ID, now: NOW,
    props: {
      cartId: CartIdVO.create(CART_ID),
      code: CouponCodeVO.create('SAVE20'),
      status: CouponStatusVO.active(),
      discount: CouponDiscountVO.create({ type: 'percentage', value: 20 }),
      appliedDiscountAmount: 100,
      currency: 'BDT',
      expiresAt: '2099-12-31T23:59:59.000Z',
    },
  });
}

function makeCartRepo(): jest.Mocked<CartRepository> {
  return {
    findById: jest.fn(), findByIdVO: jest.fn(), findAll: jest.fn(),
    save: jest.fn(), delete: jest.fn(), exists: jest.fn(),
    findByUserId: jest.fn(), findActiveByUserId: jest.fn(),
    findBySessionId: jest.fn(), findActiveBySessionId: jest.fn(),
    findByStatus: jest.fn(), findByIdempotencyKey: jest.fn(),
    findPaginated: jest.fn(), getStats: jest.fn(),
    findStale: jest.fn(), findExpired: jest.fn(), findAbandonable: jest.fn(),
    findRetryable: jest.fn(),
    countByUserId: jest.fn(), countByStatus: jest.fn(), countActiveByUserId: jest.fn(),
    softDelete: jest.fn(), restore: jest.fn(), bulkUpdateStatus: jest.fn(),
  } as unknown as jest.Mocked<CartRepository>;
}

function makeCouponRepo(): jest.Mocked<CartCouponRepository> {
  return {
    findById: jest.fn(), findAll: jest.fn(), save: jest.fn(),
    delete: jest.fn(), exists: jest.fn(),
    findByCartId: jest.fn(),
    findUsableByCartId: jest.fn(),
    existsByCartAndCode: jest.fn(),
    findByCartAndCode: jest.fn(),
    findByCode: jest.fn(),
    findByStatus: jest.fn(),
    findExpired: jest.fn(),
    findPaginated: jest.fn(),
    getStats: jest.fn(),
    deleteByCartId: jest.fn(),
    bulkUpdateStatus: jest.fn(),
    softDelete: jest.fn(), restore: jest.fn(),
  } as unknown as jest.Mocked<CartCouponRepository>;
}

describe('CartCouponService', () => {
  let service: CartCouponService;
  let cartRepo: jest.Mocked<CartRepository>;
  let couponRepo: jest.Mocked<CartCouponRepository>;

  beforeEach(() => {
    cartRepo = makeCartRepo();
    couponRepo = makeCouponRepo();
    service = new CartCouponService(cartRepo, couponRepo);
  });

  describe('apply', () => {
    it('should apply a coupon to cart', async () => {
      cartRepo.findByIdVO.mockResolvedValue(makeCart());
      couponRepo.existsByCartAndCode.mockResolvedValue(false);
      couponRepo.save.mockImplementation(async (e) => e);

      const result = await service.apply({ cartId: CART_ID, code: 'save20' });

      expect(result.code).toBe('SAVE20');
      expect(result.status).toBe('active');
      expect(couponRepo.save).toHaveBeenCalled();
    });

    it('should throw when coupon already applied', async () => {
      cartRepo.findByIdVO.mockResolvedValue(makeCart());
      couponRepo.existsByCartAndCode.mockResolvedValue(true);

      await expect(
        service.apply({ cartId: CART_ID, code: 'SAVE20' }),
      ).rejects.toThrow(CouponAlreadyAppliedApplicationError);
    });
  });

  describe('remove', () => {
    it('should disable and remove coupon', async () => {
      cartRepo.findByIdVO.mockResolvedValue(makeCart());
      couponRepo.findByCartAndCode.mockResolvedValue(makeCoupon());
      couponRepo.save.mockImplementation(async (e) => e);

      const result = await service.remove({ cartId: CART_ID, code: 'SAVE20' });

      expect(result.success).toBe(true);
      expect(result.message).toBe('Coupon removed');
    });

    it('should throw when coupon not found', async () => {
      cartRepo.findByIdVO.mockResolvedValue(makeCart());
      couponRepo.findByCartAndCode.mockResolvedValue(null);

      await expect(
        service.remove({ cartId: CART_ID, code: 'NOTFOUND' }),
      ).rejects.toThrow(CouponNotFoundApplicationError);
    });
  });

  describe('validate', () => {
    it('should return valid with discount amount', async () => {
      cartRepo.findByIdVO.mockResolvedValue(makeCart());
      couponRepo.findByCartAndCode.mockResolvedValue(makeCoupon());

      const result = await service.validate({ cartId: CART_ID, code: 'SAVE20' });

      expect(result.valid).toBe(true);
      expect(result.discountAmount).toBe(100);
    });

    it('should return invalid when coupon not found', async () => {
      cartRepo.findByIdVO.mockResolvedValue(makeCart());
      couponRepo.findByCartAndCode.mockResolvedValue(null);

      const result = await service.validate({ cartId: CART_ID, code: 'SAVE20' });

      expect(result.valid).toBe(false);
      expect(result.reason).toContain('not found');
    });
  });

  describe('getByCartId', () => {
    it('should return all coupons for cart', async () => {
      couponRepo.findByCartId.mockResolvedValue([makeCoupon()]);

      const result = await service.getByCartId(CART_ID);

      expect(result).toHaveLength(1);
      expect(result[0].code).toBe('SAVE20');
    });
  });

  describe('getPublicByCartId', () => {
    it('should return public coupon', async () => {
      couponRepo.findUsableByCartId.mockResolvedValue(makeCoupon());

      const result = await service.getPublicByCartId(CART_ID);

      expect(result).not.toBeNull();
      expect(result?.code).toBe('SAVE20');
    });

    it('should return null when no usable coupon', async () => {
      couponRepo.findUsableByCartId.mockResolvedValue(null);

      const result = await service.getPublicByCartId(CART_ID);

      expect(result).toBeNull();
    });
  });
});
