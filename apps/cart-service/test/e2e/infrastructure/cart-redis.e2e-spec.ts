/**
 * E2E — Redis Repository + Mapper Integration
 * @module cart-service/test/e2e/infrastructure
 *
 * Uses in-memory emulation of CartRedisService with real repository logic.
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { CartRedisRepository } from '@infrastructure/persistence/redis/repositories/cart.redis.repository.js';
import { CartItemRedisRepository } from '@infrastructure/persistence/redis/repositories/cart-item.redis.repository.js';
import { CartIdVO } from '@domain/value-objects/primitives/cart-id.vo.js';
import { CartItemIdVO } from '@domain/value-objects/primitives/cart-item-id.vo.js';
import { CartItemEntity } from '@domain/entities/cart-item.entity.js';
import { CartItemQuantityVO } from '@domain/value-objects/primitives/cart-item-quantity.vo.js';
import { CartItemStatusVO } from '@domain/value-objects/primitives/cart-item-status.vo.js';
import { ProductIdVO } from '@domain/value-objects/primitives/product-id.vo.js';
import { TEST_IDS, TEST_DATES, TEST_CURRENCY } from '@fixtures/index';
import { makeUserCart } from '@fixtures/cart.fixture';

// ─── In-memory Redis emulation ───

class InMemoryRedis {
  private readonly store = new Map<string, unknown>();
  private readonly ttls = new Map<string, number>();

  get = jest.fn(async <T = unknown>(key: string): Promise<T | null> => {
    return (this.store.get(key) as T) ?? null;
  });

  set = jest.fn(async (key: string, value: unknown, ttl?: number): Promise<void> => {
    this.store.set(key, value);
    if (ttl !== undefined) this.ttls.set(key, ttl);
  });

  setNoExpiry = jest.fn(async (key: string, value: unknown): Promise<void> => {
    this.store.set(key, value);
  });

  del = jest.fn(async (key: string): Promise<void> => {
    this.store.delete(key);
    this.ttls.delete(key);
  });

  delMany = jest.fn(async (keys: readonly string[]): Promise<number> => {
    let count = 0;
    for (const k of keys) if (this.store.delete(k)) count += 1;
    return count;
  });

  exists = jest.fn(async (key: string): Promise<boolean> => this.store.has(key));

  keys = jest.fn(async (pattern: string): Promise<readonly string[]> => {
    const regex = new RegExp('^' + pattern.replace(/\*/g, '.*') + '$');
    return Array.from(this.store.keys()).filter((k) => regex.test(k));
  });

  ttl = jest.fn(async (key: string): Promise<number> => this.ttls.get(key) ?? -1);
  expire = jest.fn(async (): Promise<boolean> => true);
  increment = jest.fn(async (_key: string, delta = 1): Promise<number> => delta);
  isHealthy = jest.fn(async (): Promise<boolean> => true);
  raw = {};

  // Test helpers
  size(): number {
    return this.store.size;
  }

  keysList(): readonly string[] {
    return Array.from(this.store.keys());
  }

  clear(): void {
    this.store.clear();
    this.ttls.clear();
  }
}

describe('E2E — Redis Repository + Mapper', () => {
  let redis: InMemoryRedis;
  let cartRepo: CartRedisRepository;
  let itemRepo: CartItemRedisRepository;

  beforeEach(() => {
    redis = new InMemoryRedis();
    cartRepo = new CartRedisRepository(redis as never);
    itemRepo = new CartItemRedisRepository(redis as never);
  });

  // ═══════════════ CART FULL FLOW ═══════════════

  it('E2E: full cart save → read → update → delete flow', async () => {
    // 1. Create and save cart
    const cart = makeUserCart();
    await cartRepo.save(cart);

    // Verify indexes were created
    expect(redis.size()).toBeGreaterThan(0);

    // 2. Read it back
    const found = await cartRepo.findByIdVO(CartIdVO.reconstitute(cart.id));
    expect(found).not.toBeNull();
    expect(found?.id).toBe(cart.id);
    expect(found?.userId?.value).toBe(TEST_IDS.USER_ID);
    expect(found?.isActive()).toBe(true);

    // 3. Find by user
    const byUser = await cartRepo.findByUserId(TEST_IDS.USER_ID);
    expect(byUser.length).toBeGreaterThan(0);

    // 4. Find active by user
    const active = await cartRepo.findActiveByUserId(TEST_IDS.USER_ID);
    expect(active).not.toBeNull();

    // 5. Update totals
    if (found) {
      found.updateTotals({ subtotal: 250, discount: 0, tax: 0, shipping: 0 });
      await cartRepo.save(found);

      const updated = await cartRepo.findById(cart.id);
      expect(updated?.total).toBe(250);
    }

    // 6. Delete
    await cartRepo.delete(cart.id);
    const deleted = await cartRepo.findById(cart.id);
    expect(deleted).toBeNull();
  });

  // ═══════════════ INDEX BEHAVIOR ═══════════════

  it('E2E: save creates multiple indexes', async () => {
    const cart = makeUserCart();
    await cartRepo.save(cart);

    // Should have created:
    // - cart:by-id:<id>
    // - cart:by-user:<userId>
    // - cart:active-by-user:<userId>
    // - cart:by-status:active
    // - cart:all-ids
    expect(await cartRepo.exists(cart.id)).toBe(true);
    expect(await cartRepo.countByUserId(TEST_IDS.USER_ID)).toBe(1);
  });

  // ═══════════════ ITEM FLOW ═══════════════

  it('E2E: cart item save + retrieve by cart', async () => {
    // 1. Create item
    const item = CartItemEntity.create({
      id: CartItemIdVO.create(TEST_IDS.CART_ITEM_ID),
      now: TEST_DATES.NOW,
      props: {
        cartId: CartIdVO.create(TEST_IDS.CART_ID),
        productId: ProductIdVO.create(TEST_IDS.PRODUCT_ID),
        quantity: CartItemQuantityVO.create(2),
        status: CartItemStatusVO.active(),
        unitPrice: 100,
        currency: TEST_CURRENCY,
      },
    });

    // 2. Save item
    await itemRepo.save(item);

    // 3. Retrieve by id
    const found = await itemRepo.findByIdVO(
      CartItemIdVO.reconstitute(item.id),
    );
    expect(found).not.toBeNull();
    expect(found?.quantity.value).toBe(2);
    expect(found?.unitPrice).toBe(100);

    // 4. Retrieve by cart
    const itemsByCart = await itemRepo.findByCartId(TEST_IDS.CART_ID);
    expect(itemsByCart.length).toBe(1);

    // 5. Check product index
    const foundByProduct = await itemRepo.findInCartByProduct(
      TEST_IDS.CART_ID,
      TEST_IDS.PRODUCT_ID,
    );
    expect(foundByProduct?.id).toBe(item.id);
  });

  // ═══════════════ MULTI-ITEM FLOW ═══════════════

  it('E2E: multiple items in one cart', async () => {
    const itemA = CartItemEntity.create({
      id: CartItemIdVO.create(TEST_IDS.CART_ITEM_ID),
      now: TEST_DATES.NOW,
      props: {
        cartId: CartIdVO.create(TEST_IDS.CART_ID),
        productId: ProductIdVO.create(TEST_IDS.PRODUCT_ID),
        quantity: CartItemQuantityVO.create(1),
        status: CartItemStatusVO.active(),
        unitPrice: 100,
        currency: TEST_CURRENCY,
      },
    });

    const itemB = CartItemEntity.create({
      id: CartItemIdVO.create(TEST_IDS.CART_ITEM_ID_2),
      now: TEST_DATES.NOW,
      props: {
        cartId: CartIdVO.create(TEST_IDS.CART_ID),
        productId: ProductIdVO.create(TEST_IDS.PRODUCT_ID_2),
        quantity: CartItemQuantityVO.create(3),
        status: CartItemStatusVO.active(),
        unitPrice: 50,
        currency: TEST_CURRENCY,
      },
    });

    await itemRepo.save(itemA);
    await itemRepo.save(itemB);

    const all = await itemRepo.findByCartId(TEST_IDS.CART_ID);
    expect(all.length).toBe(2);

    const count = await itemRepo.countByCartId(TEST_IDS.CART_ID);
    expect(count).toBe(2);
  });

  // ═══════════════ STATE TRANSITIONS ═══════════════

  it('E2E: cart status transitions persist correctly', async () => {
    const cart = makeUserCart();
    cart.applyItemCountDelta(1); // Add item so it can be abandoned
    await cartRepo.save(cart);

    // Mark as abandoned
    cart.abandon();
    await cartRepo.save(cart);

    const found = await cartRepo.findById(cart.id);
    expect(found?.isAbandoned()).toBe(true);

    const abandonedCarts = await cartRepo.findByStatus('abandoned');
    expect(abandonedCarts.length).toBeGreaterThan(0);
  });
});
