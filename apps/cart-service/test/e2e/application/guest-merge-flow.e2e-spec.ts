/**
 * E2E — Guest Cart Merge Flow (Application Layer)
 * @module cart-service/test/e2e/application
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';

import { CartService } from '@application/services/impl/cart.service.js';
import { CartItemService } from '@application/services/impl/cart-item.service.js';
import { GuestCartService } from '@application/services/impl/guest-cart.service.js';
import { CartMergerService } from '@application/services/impl/cart-merger.service.js';

import { createE2ERepos, type E2ERepoBundle } from './setup/in-memory-repos.js';

const USER_ID = '33333333-3333-4333-8333-333333333333';
const PRODUCT_ID = '44444444-4444-4444-8444-444444444444';

describe('E2E — Application / Guest Merge Flow', () => {
  let repos: E2ERepoBundle;
  let cartService: CartService;
  let itemService: CartItemService;
  let guestService: GuestCartService;

  let mockEventBridge: { publishFromEntity: ReturnType<typeof jest.fn> };
  let mergerService: CartMergerService;

  beforeEach(() => {


    mockEventBridge = {


      publishFromEntity: jest.fn().mockResolvedValue(undefined),


    };
    repos = createE2ERepos();
    cartService = new CartService(repos.carts, mockEventBridge as never);
    itemService = new CartItemService(repos.items, repos.carts, mockEventBridge as never);
    guestService = new GuestCartService(repos.guests, repos.carts, repos.mergers, mockEventBridge as never);
    mergerService = new CartMergerService(repos.carts, repos.items, repos.mergers, mockEventBridge as never);
  });

  it('create guest cart returns token', async () => {
    const result = await guestService.create({ currency: 'BDT' });

    expect(result.success).toBe(true);
    expect(result.guestCartId).toBeDefined();
    expect(result.token.length).toBeGreaterThan(16);
  });

  it('find guest cart by token after create', async () => {
    const created = await guestService.create({ currency: 'BDT' });

    const found = await guestService.findByToken(created.token);

    expect(found).not.toBeNull();
    expect(found?.token).toBe(created.token);
  });

  it('expire guest cart', async () => {
    const created = await guestService.create({ currency: 'BDT' });

    const expired = await guestService.expire(created.guestCartId);
    expect(expired.status).toBe('expired');
  });

  it('abandon guest cart', async () => {
    const created = await guestService.create({ currency: 'BDT' });

    const abandoned = await guestService.abandon(created.guestCartId);
    expect(abandoned.status).toBe('abandoned');
  });

  it('plan merge between two active carts', async () => {
    // create two carts
    const c1 = await cartService.create({ type: 'guest', currency: 'BDT' });
    const c2 = await cartService.create({ type: 'user', currency: 'BDT' }, USER_ID);

    await itemService.add({ cartId: c1.cartId, productId: PRODUCT_ID, quantity: 2 });
    await itemService.add({ cartId: c2.cartId, productId: PRODUCT_ID, quantity: 1 });

    const plan = await mergerService.plan(c1.cartId, c2.cartId);
    expect(plan.sourceCartId).toBe(c1.cartId);
    expect(plan.targetCartId).toBe(c2.cartId);
    expect(plan.itemsMerged).toBeGreaterThanOrEqual(0);
  });

  it('execute merge persists merger', async () => {
    const c1 = await cartService.create({ type: 'guest', currency: 'BDT' });
    const c2 = await cartService.create({ type: 'user', currency: 'BDT' }, USER_ID);

    await itemService.add({ cartId: c1.cartId, productId: PRODUCT_ID, quantity: 2 });

    const result = await mergerService.execute(c1.cartId, c2.cartId);

    expect(result.success).toBe(true);
    expect(repos.mergers.size).toBeGreaterThanOrEqual(1);
  });

  it('merge same cart throws', async () => {
    const c = await cartService.create({ type: 'guest', currency: 'BDT' });

    await expect(mergerService.execute(c.cartId, c.cartId)).rejects.toThrow();
  });
});
