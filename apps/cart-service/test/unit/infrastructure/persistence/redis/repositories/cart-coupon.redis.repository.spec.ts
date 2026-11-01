/**
 * CartCouponRedisRepository — Unit Tests
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { CartCouponRedisRepository } from '@infrastructure/persistence/redis/repositories/cart-coupon.redis.repository.js';
import { CartCouponEntity } from '@domain/entities/cart-coupon.entity.js';
import { CartIdVO } from '@domain/value-objects/primitives/cart-id.vo.js';
import { CouponCodeVO } from '@domain/value-objects/primitives/coupon-code.vo.js';
import { CouponStatusVO } from '@domain/value-objects/primitives/coupon-status.vo.js';
import { CouponDiscountVO } from '@domain/value-objects/primitives/coupon-discount.vo.js';
import { TEST_IDS, TEST_DATES, TEST_CURRENCY } from '@fixtures/index';
import {
  makeMockCartRedisService,
  type MockCartRedisService,
} from '@test-infra/index';

function makeCoupon(): CartCouponEntity {
  return CartCouponEntity.create({
    id: TEST_IDS.COUPON_ID,
    now: TEST_DATES.NOW,
    props: {
      cartId: CartIdVO.create(TEST_IDS.CART_ID),
      code: CouponCodeVO.create('SAVE10'),
      status: CouponStatusVO.active(),
      discount: CouponDiscountVO.create({ type: 'percentage', value: 10 }),
      appliedDiscountAmount: 0,
      currency: TEST_CURRENCY,
      expiresAt: TEST_DATES.NEXT_MONTH,
    },
  });
}

describe('CartCouponRedisRepository', () => {
  let redis: MockCartRedisService;
  let repo: CartCouponRedisRepository;

  beforeEach(() => {
    redis = makeMockCartRedisService();
    repo = new CartCouponRedisRepository(redis as never);
  });

  describe('save() + findByCartAndCode()', () => {
    it('should save and retrieve by cart + code', async () => {
      await repo.save(makeCoupon());
      const found = await repo.findByCartAndCode(TEST_IDS.CART_ID, 'SAVE10');
      expect(found?.id).toBe(TEST_IDS.COUPON_ID);
      expect(found?.code.value).toBe('SAVE10');
    });

    it('should return null for missing code', async () => {
      const found = await repo.findByCartAndCode(TEST_IDS.CART_ID, 'MISSING');
      expect(found).toBeNull();
    });
  });

  describe('existsByCartAndCode()', () => {
    it('should return true for saved coupon', async () => {
      await repo.save(makeCoupon());
      expect(await repo.existsByCartAndCode(TEST_IDS.CART_ID, 'SAVE10')).toBe(true);
    });

    it('should return false for missing', async () => {
      expect(await repo.existsByCartAndCode(TEST_IDS.CART_ID, 'MISSING')).toBe(false);
    });
  });

  describe('findByCartId()', () => {
    it('should return all coupons for cart', async () => {
      await repo.save(makeCoupon());
      const list = await repo.findByCartId(TEST_IDS.CART_ID);
      expect(list.length).toBeGreaterThan(0);
    });
  });

  describe('findUsableByCartId()', () => {
    it('should return usable coupon', async () => {
      await repo.save(makeCoupon());
      const usable = await repo.findUsableByCartId(TEST_IDS.CART_ID);
      expect(usable?.id).toBe(TEST_IDS.COUPON_ID);
    });

    it('should return null when no coupons', async () => {
      const usable = await repo.findUsableByCartId(TEST_IDS.CART_ID);
      expect(usable).toBeNull();
    });
  });

  describe('exists()', () => {
    it('should return true after save', async () => {
      await repo.save(makeCoupon());
      expect(await repo.exists(TEST_IDS.COUPON_ID)).toBe(true);
    });
  });

  describe('delete()', () => {
    it('should remove coupon', async () => {
      await repo.save(makeCoupon());
      await repo.delete(TEST_IDS.COUPON_ID);
      expect(await repo.exists(TEST_IDS.COUPON_ID)).toBe(false);
    });
  });
});
