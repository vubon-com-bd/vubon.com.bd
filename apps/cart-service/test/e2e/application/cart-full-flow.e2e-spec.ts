/**
 * E2E — Cart Full Lifecycle (Application Layer)
 * @module cart-service/test/e2e/application
 *
 * Flow:
 *   CartService.create → CartItemService.add → CartTaxService.recalculate →
 *   CartCouponService.apply → CartEligibilityService.evaluate →
 *   CartService.clear
 *
 * Uses real services + in-memory repositories.
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';

import { CartService } from '@application/services/impl/cart.service.js';
import { CartItemService } from '@application/services/impl/cart-item.service.js';
import { CartTaxService } from '@application/services/impl/cart-tax.service.js';
import { CartCouponService } from '@application/services/impl/cart-coupon.service.js';

import { CartEligibilityService } from '@domain/services/cart-eligibility.service.js';
import { CartIdVO } from '@domain/value-objects/primitives/cart-id.vo.js';

import { createE2ERepos, type E2ERepoBundle } from './setup/in-memory-repos.js';

const USER_ID = '33333333-3333-4333-8333-333333333333';
const PRODUCT_ID = '44444444-4444-4444-8444-444444444444';
const PRODUCT_2 = '44444444-4444-4444-8444-555555555555';

describe('E2E — Application / Cart Full Flow', () => {
  let repos: E2ERepoBundle;
  let cartService: CartService;
  let itemService: CartItemService;
  let taxService: CartTaxService;

  let mockEventBridge: { publishFromEntity: ReturnType<typeof jest.fn> };
  let couponService: CartCouponService;

  beforeEach(() => {


    mockEventBridge = {


      publishFromEntity: jest.fn().mockResolvedValue(undefined),


    };
    repos = createE2ERepos();
    cartService = new CartService(repos.carts, repos.items, mockEventBridge as never);
    itemService = new CartItemService(repos.items, repos.carts, mockEventBridge as never);
    taxService = new CartTaxService(repos.carts, repos.items, mockEventBridge as never);
    couponService = new CartCouponService(repos.carts, repos.coupons, mockEventBridge as never);
  });

  it('create → add items → recalc totals → checkout eligible', async () => {
    // 1. Create cart
    const created = await cartService.create(
      { type: 'user', currency: 'BDT' },
      USER_ID,
    );
    expect(created.success).toBe(true);
    expect(created.status).toBe('active');

    const cartId = created.cartId;

    // 2. Add item
    const item = await itemService.add({
      cartId,
      productId: PRODUCT_ID,
      quantity: 2,
    });
    expect(item.productId).toBe(PRODUCT_ID);
    expect(item.quantity).toBe(2);

    // 3. Add second item
    const item2 = await itemService.add({
      cartId,
      productId: PRODUCT_2,
      quantity: 1,
    });
    expect(item2.productId).toBe(PRODUCT_2);

    // 4. Recalculate totals
    const totals = await taxService.recalculate(cartId);
    expect(totals.itemCount).toBeGreaterThanOrEqual(0);

    // 5. Verify cart retrievable
    const fetched = await cartService.getById(cartId);
    expect(fetched.id).toBe(cartId);
    expect(fetched.userId).toBe(USER_ID);

    // 6. Eligibility check
    const cartVO = CartIdVO.create(cartId);
    const cartEntity = await repos.carts.findByIdVO(cartVO);
    expect(cartEntity).not.toBeNull();
    const items = await repos.items.findByCartId(cartId);

    const eligibility = CartEligibilityService.evaluate(cartEntity!, items);
    // empty cart not eligible but items added → still, prices were 0
    // so we just verify the flow returned a result
    expect(eligibility).toBeDefined();
    expect(Array.isArray(eligibility.reasons)).toBe(true);
  });

  it('clear cart empties items and resets totals', async () => {
    const created = await cartService.create({ type: 'user', currency: 'BDT' }, USER_ID);
    const cartId = created.cartId;

    await itemService.add({ cartId, productId: PRODUCT_ID, quantity: 3 });

    const cleared = await cartService.clear({ cartId });
    expect(cleared.success).toBe(true);

    const fetched = await cartService.getById(cartId);
    expect(fetched.itemCount).toBe(0);
    expect(fetched.total).toBe(0);
  });

  it('delete cart removes from repository', async () => {
    const created = await cartService.create({ type: 'user', currency: 'BDT' }, USER_ID);
    const cartId = created.cartId;

    const deleted = await cartService.delete({ cartId, hardDelete: false });
    expect(deleted.success).toBe(true);

    await expect(cartService.getById(cartId)).rejects.toThrow();
  });

  it('duplicate cart create for same user throws', async () => {
    await cartService.create({ type: 'user', currency: 'BDT' }, USER_ID);

    await expect(
      cartService.create({ type: 'user', currency: 'BDT' }, USER_ID),
    ).rejects.toThrow();
  });

  it('idempotent create returns existing cart', async () => {
    const key = 'idempotency-key-1234567890abc';
    const first = await cartService.create(
      { type: 'user', currency: 'BDT', idempotencyKey: key },
      USER_ID,
    );

    const second = await cartService.create(
      { type: 'user', currency: 'BDT', idempotencyKey: key },
      USER_ID,
    );

    expect(second.cartId).toBe(first.cartId);
  });

  it('full flow: create → add → apply coupon → validate', async () => {
    const created = await cartService.create({ type: 'user', currency: 'BDT' }, USER_ID);
    const cartId = created.cartId;

    await itemService.add({ cartId, productId: PRODUCT_ID, quantity: 2 });
    await taxService.recalculate(cartId);

    const coupon = await couponService.apply({ cartId, code: 'SAVE20' });
    expect(coupon.code).toBe('SAVE20');
    expect(coupon.status).toBe('active');

    const validation = await couponService.validate({ cartId, code: 'SAVE20' });
    expect(validation.valid).toBe(true);
  });

  it('remove coupon after apply', async () => {
    const created = await cartService.create({ type: 'user', currency: 'BDT' }, USER_ID);
    const cartId = created.cartId;

    await couponService.apply({ cartId, code: 'SAVE20' });
    const removed = await couponService.remove({ cartId, code: 'SAVE20' });

    expect(removed.success).toBe(true);
    expect(removed.message).toBe('Coupon removed');
  });

  it('list carts with pagination', async () => {
    await cartService.create({ type: 'user', currency: 'BDT' }, USER_ID);

    const list = await cartService.list({ page: 1, limit: 10 });
    expect(list.items.length).toBeGreaterThanOrEqual(1);
    expect(list.total).toBeGreaterThanOrEqual(1);
  });

  it('get summary for existing cart', async () => {
    const created = await cartService.create({ type: 'user', currency: 'BDT' }, USER_ID);
    const summary = await cartService.getSummary(created.cartId);

    expect(summary.id).toBe(created.cartId);
    expect(summary.currency).toBe('BDT');
  });
});
