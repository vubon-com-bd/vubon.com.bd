/**
 * E2E — Checkout Eligibility Flow (Application Layer)
 * @module cart-service/test/e2e/application
 *
 * Tests the cart → checkout pipeline via ProceedToCheckoutHandler.
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';

import { CartService } from '@application/services/impl/cart.service.js';
import { CartItemService } from '@application/services/impl/cart-item.service.js';
import { ProceedToCheckoutHandler } from '@application/commands/checkout/proceed-to-checkout.handler.js';
import { ProceedToCheckoutCommand } from '@application/commands/checkout/proceed-to-checkout.command.js';

import { createE2ERepos, type E2ERepoBundle } from './setup/in-memory-repos.js';

const USER_ID = '33333333-3333-4333-8333-333333333333';
const PRODUCT_ID = '44444444-4444-4444-8444-444444444444';

describe('E2E — Application / Checkout Eligibility Flow', () => {
  let repos: E2ERepoBundle;
  let cartService: CartService;
  let itemService: CartItemService;

  let mockEventBridge: { publishFromEntity: ReturnType<typeof jest.fn> };
  let mockEventBus: { publish: ReturnType<typeof jest.fn> };
  let mockProductClient: { getByIds: ReturnType<typeof jest.fn> };
  let checkoutHandler: ProceedToCheckoutHandler;

  beforeEach(() => {


    mockEventBridge = {


      publishFromEntity: jest.fn().mockResolvedValue(undefined),


    };
    mockEventBus = { publish: jest.fn().mockResolvedValue(undefined) };
    mockProductClient = { getByIds: jest.fn().mockResolvedValue([]) };
    repos = createE2ERepos();
    cartService = new CartService(repos.carts, repos.items, mockEventBridge as never);
    itemService = new CartItemService(repos.items, repos.carts, mockEventBridge as never);
    checkoutHandler = new ProceedToCheckoutHandler(cartService, mockEventBus as never, mockProductClient as never);
  });

  it('checkout on cart with items returns cart', async () => {
    const created = await cartService.create({ type: 'user', currency: 'BDT' }, USER_ID);
    const cartId = created.cartId;

    await itemService.add({ cartId, productId: PRODUCT_ID, quantity: 2 });

    const cmd = new ProceedToCheckoutCommand({ cartId });
    const result = await checkoutHandler.execute(cmd);

    expect(result.id).toBe(cartId);
  });

  it('checkout on empty cart throws', async () => {
    const created = await cartService.create({ type: 'user', currency: 'BDT' }, USER_ID);

    const cmd = new ProceedToCheckoutCommand({ cartId: created.cartId });

    await expect(checkoutHandler.execute(cmd)).rejects.toThrow();
  });

  it('checkout on non-existent cart throws', async () => {
    const cmd = new ProceedToCheckoutCommand({
      cartId: '99999999-9999-4999-8999-999999999999',
    });

    await expect(checkoutHandler.execute(cmd)).rejects.toThrow();
  });
});
