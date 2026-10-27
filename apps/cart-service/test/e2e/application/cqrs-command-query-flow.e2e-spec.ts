/**
 * E2E — CQRS Command + Query flow (Application Layer)
 * @module cart-service/test/e2e/application
 *
 * Tests handlers in end-to-end CQRS chain.
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';

import { CartService } from '@application/services/impl/cart.service.js';
import { CartItemService } from '@application/services/impl/cart-item.service.js';

import { CreateCartHandler } from '@application/commands/cart/create-cart.handler.js';
import { CreateCartCommand } from '@application/commands/cart/create-cart.command.js';
import { AddItemHandler } from '@application/commands/item/add-item.handler.js';
import { AddItemCommand } from '@application/commands/item/add-item.command.js';
import { GetCartHandler } from '@application/queries/cart/get-cart.handler.js';
import { GetCartQuery } from '@application/queries/cart/get-cart.query.js';
import { GetCartSummaryHandler } from '@application/queries/cart/get-cart-summary.handler.js';
import { GetCartSummaryQuery } from '@application/queries/cart/get-cart-summary.query.js';

import { createE2ERepos, type E2ERepoBundle } from './setup/in-memory-repos.js';

const USER_ID = '33333333-3333-4333-8333-333333333333';
const PRODUCT_ID = '44444444-4444-4444-8444-444444444444';

describe('E2E — Application / CQRS Command + Query Flow', () => {
  let repos: E2ERepoBundle;
  let cartService: CartService;

  let mockEventBridge: { publishFromEntity: ReturnType<typeof jest.fn> };
  let itemService: CartItemService;

  beforeEach(() => {


    mockEventBridge = {


      publishFromEntity: jest.fn().mockResolvedValue(undefined),


    };
    repos = createE2ERepos();
    cartService = new CartService(repos.carts, repos.items, mockEventBridge as never);
    itemService = new CartItemService(repos.items, repos.carts, mockEventBridge as never);
  });

  it('create cart via command → query via handler', async () => {
    const createHandler = new CreateCartHandler(cartService);
    const createCmd = new CreateCartCommand({ type: 'user', currency: 'BDT' }, USER_ID);
    const created = await createHandler.execute(createCmd);

    expect(created.success).toBe(true);

    const getHandler = new GetCartHandler(cartService);
    const query = new GetCartQuery(created.cartId);
    const cart = await getHandler.execute(query);

    expect(cart.id).toBe(created.cartId);
    expect(cart.userId).toBe(USER_ID);
  });

  it('add item via command → query summary via handler', async () => {
    const createHandler = new CreateCartHandler(cartService);
    const created = await createHandler.execute(
      new CreateCartCommand({ type: 'user', currency: 'BDT' }, USER_ID),
    );

    const addHandler = new AddItemHandler(itemService);
    const item = await addHandler.execute(
      new AddItemCommand({ cartId: created.cartId, productId: PRODUCT_ID, quantity: 3 }),
    );
    expect(item.quantity).toBe(3);

    const summaryHandler = new GetCartSummaryHandler(cartService);
    const summary = await summaryHandler.execute(new GetCartSummaryQuery(created.cartId));
    expect(summary.id).toBe(created.cartId);
  });

  it('command create → query get → command delete flow', async () => {
    const createHandler = new CreateCartHandler(cartService);
    const created = await createHandler.execute(
      new CreateCartCommand({ type: 'user', currency: 'BDT' }, USER_ID),
    );

    const getHandler = new GetCartHandler(cartService);
    const fetched = await getHandler.execute(new GetCartQuery(created.cartId));
    expect(fetched.id).toBe(created.cartId);

    await cartService.delete({ cartId: created.cartId, hardDelete: false });

    await expect(
      getHandler.execute(new GetCartQuery(created.cartId)),
    ).rejects.toThrow();
  });
});
