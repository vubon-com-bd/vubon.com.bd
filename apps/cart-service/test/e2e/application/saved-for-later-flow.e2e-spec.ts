/**
 * E2E — Saved For Later Flow (Application Layer)
 * @module cart-service/test/e2e/application
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';

import { CartService } from '@application/services/impl/cart.service.js';
import { CartItemService } from '@application/services/impl/cart-item.service.js';
import { SavedForLaterService } from '@application/services/impl/saved-for-later.service.js';

import { createE2ERepos, type E2ERepoBundle } from './setup/in-memory-repos.js';

const USER_ID = '33333333-3333-4333-8333-333333333333';
const PRODUCT_ID = '44444444-4444-4444-8444-444444444444';

describe('E2E — Application / Saved For Later Flow', () => {
  let repos: E2ERepoBundle;
  let cartService: CartService;
  let itemService: CartItemService;

  let mockEventBridge: { publishFromEntity: ReturnType<typeof jest.fn> };
  let savedService: SavedForLaterService;

  beforeEach(() => {


    mockEventBridge = {


      publishFromEntity: jest.fn().mockResolvedValue(undefined),


    };
    repos = createE2ERepos();
    cartService = new CartService(repos.carts, repos.items, mockEventBridge as never);
    itemService = new CartItemService(repos.items, repos.carts, mockEventBridge as never);
    savedService = new SavedForLaterService(repos.saved, repos.carts, repos.items, mockEventBridge as never);
  });

  it('save item → list → remove', async () => {
    const created = await cartService.create({ type: 'user', currency: 'BDT' }, USER_ID);
    const cartId = created.cartId;

    const item = await itemService.add({ cartId, productId: PRODUCT_ID, quantity: 2 });

    const saved = await savedService.save({ cartId, itemId: item.id });
    expect(saved.productId).toBe(PRODUCT_ID);

    const list = await savedService.listByUser(USER_ID);
    expect(list.length).toBeGreaterThanOrEqual(1);

    const removed = await savedService.remove({ savedItemId: saved.id });
    expect(removed.success).toBe(true);
  });

  it('get saved item by id', async () => {
    const created = await cartService.create({ type: 'user', currency: 'BDT' }, USER_ID);
    const cartId = created.cartId;

    const item = await itemService.add({ cartId, productId: PRODUCT_ID, quantity: 1 });
    const saved = await savedService.save({ cartId, itemId: item.id });

    const fetched = await savedService.getById(saved.id);
    expect(fetched.id).toBe(saved.id);
  });

  it('get throws for unknown saved item', async () => {
    await expect(
      savedService.getById('99999999-9999-4999-8999-999999999999'),
    ).rejects.toThrow();
  });
});
