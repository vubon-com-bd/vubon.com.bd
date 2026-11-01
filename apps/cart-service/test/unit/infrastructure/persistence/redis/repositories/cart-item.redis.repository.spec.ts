/**
 * CartItemRedisRepository — Unit Tests
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { CartItemRedisRepository } from '@infrastructure/persistence/redis/repositories/cart-item.redis.repository.js';
import { CartItemIdVO } from '@domain/value-objects/primitives/cart-item-id.vo.js';
import { CartItemEntity } from '@domain/entities/cart-item.entity.js';
import { CartIdVO } from '@domain/value-objects/primitives/cart-id.vo.js';
import { CartItemQuantityVO } from '@domain/value-objects/primitives/cart-item-quantity.vo.js';
import { CartItemStatusVO } from '@domain/value-objects/primitives/cart-item-status.vo.js';
import { ProductIdVO } from '@domain/value-objects/primitives/product-id.vo.js';
import { VariantIdVO } from '@domain/value-objects/primitives/variant-id.vo.js';
import { TEST_IDS, TEST_DATES, TEST_CURRENCY } from '@fixtures/index';
import {
  makeMockCartRedisService,
  type MockCartRedisService,
} from '@test-infra/index';

function makeItem(overrides: { variantId?: string } = {}): CartItemEntity {
  return CartItemEntity.create({
    id: CartItemIdVO.create(TEST_IDS.CART_ITEM_ID),
    now: TEST_DATES.NOW,
    props: {
      cartId: CartIdVO.create(TEST_IDS.CART_ID),
      productId: ProductIdVO.create(TEST_IDS.PRODUCT_ID),
      variantId: overrides.variantId ? VariantIdVO.create(overrides.variantId) : undefined,
      quantity: CartItemQuantityVO.create(2),
      status: CartItemStatusVO.active(),
      unitPrice: 100,
      currency: TEST_CURRENCY,
    },
  });
}

describe('CartItemRedisRepository', () => {
  let redis: MockCartRedisService;
  let repo: CartItemRedisRepository;

  beforeEach(() => {
    redis = makeMockCartRedisService();
    repo = new CartItemRedisRepository(redis as never);
  });

  describe('save() + findByIdVO()', () => {
    it('should save and retrieve item', async () => {
      const item = makeItem();
      await repo.save(item);
      const found = await repo.findByIdVO(CartItemIdVO.reconstitute(item.id));
      expect(found?.id).toBe(item.id);
      expect(found?.quantity.value).toBe(2);
    });

    it('should return null for missing', async () => {
      const found = await repo.findByIdVO(CartItemIdVO.reconstitute(TEST_IDS.CART_ITEM_ID));
      expect(found).toBeNull();
    });
  });

  describe('exists()', () => {
    it('should return true after save', async () => {
      const item = makeItem();
      await repo.save(item);
      expect(await repo.exists(item.id)).toBe(true);
    });
  });

  describe('findByCartId()', () => {
    it('should return items for cart', async () => {
      await repo.save(makeItem());
      const items = await repo.findByCartId(TEST_IDS.CART_ID);
      expect(items.length).toBeGreaterThan(0);
    });
  });

  describe('findInCartByProduct()', () => {
    it('should find item by cart + product', async () => {
      const item = makeItem();
      await repo.save(item);
      const found = await repo.findInCartByProduct(
        TEST_IDS.CART_ID,
        TEST_IDS.PRODUCT_ID,
      );
      expect(found?.id).toBe(item.id);
    });

    it('should return null when missing', async () => {
      const found = await repo.findInCartByProduct(
        TEST_IDS.CART_ID,
        TEST_IDS.PRODUCT_ID_2,
      );
      expect(found).toBeNull();
    });
  });

  describe('existsInCart()', () => {
    it('should return true for existing product', async () => {
      await repo.save(makeItem());
      expect(await repo.existsInCart(TEST_IDS.CART_ID, TEST_IDS.PRODUCT_ID)).toBe(true);
    });

    it('should return false for missing product', async () => {
      expect(await repo.existsInCart(TEST_IDS.CART_ID, TEST_IDS.PRODUCT_ID_2)).toBe(false);
    });
  });

  describe('countByCartId()', () => {
    it('should count items', async () => {
      await repo.save(makeItem());
      const count = await repo.countByCartId(TEST_IDS.CART_ID);
      expect(count).toBeGreaterThan(0);
    });
  });

  describe('delete()', () => {
    it('should remove item', async () => {
      const item = makeItem();
      await repo.save(item);
      await repo.delete(item.id);
      expect(await repo.exists(item.id)).toBe(false);
    });
  });

  describe('findAll()', () => {
    it('should return empty (Redis primary not supported)', async () => {
      expect(await repo.findAll()).toEqual([]);
    });
  });
});
