/**
 * E2E — Abandoned Cart Flow (Application Layer)
 * @module cart-service/test/e2e/application
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';

import { CartService } from '@application/services/impl/cart.service.js';
import { CartItemService } from '@application/services/impl/cart-item.service.js';
import { AbandonedCartService } from '@application/services/impl/abandoned-cart.service.js';

import { CartEntity } from '@domain/entities/cart.entity.js';
import { CartIdVO } from '@domain/value-objects/primitives/cart-id.vo.js';
import { CartTypeVO } from '@domain/value-objects/primitives/cart-type.vo.js';
import { CartItemIdVO } from '@domain/value-objects/primitives/cart-item-id.vo.js';
import { ProductIdVO } from '@domain/value-objects/primitives/product-id.vo.js';
import { CartItemQuantityVO } from '@domain/value-objects/primitives/cart-item-quantity.vo.js';
import { CartItemStatusVO } from '@domain/value-objects/primitives/cart-item-status.vo.js';
import { CartItemEntity } from '@domain/entities/cart-item.entity.js';

import { createE2ERepos, type E2ERepoBundle } from './setup/in-memory-repos.js';

const CART_ID = '11111111-1111-4111-8111-111111111111';
const ITEM_ID = '22222222-2222-4222-8222-222222222222';
const PRODUCT_ID = '44444444-4444-4444-8444-444444444444';

function makeOldCart(hoursAgo: number): CartEntity {
  const lastActivity = new Date(Date.now() - hoursAgo * 3600 * 1000).toISOString();
  const cart = CartEntity.reconstitute({
    id: CART_ID,
    createdAt: lastActivity,
    updatedAt: lastActivity,
    status: 'active',
    props: {
      type: CartTypeVO.user(),
      currency: 'BDT',
      itemCount: 2,
      subtotal: 500,
      discountAmount: 0,
      taxAmount: 0,
      shippingAmount: 0,
      total: 500,
      expiresAt: '2099-12-31T23:59:59.000Z',
      lastActivityAt: lastActivity,
    },
  });
  return cart;
}

describe('E2E — Application / Abandoned Cart Flow', () => {
  let repos: E2ERepoBundle;

  let mockEventBridge: { publishFromEntity: ReturnType<typeof jest.fn> };
  let abandonedService: AbandonedCartService;

  beforeEach(() => {


    mockEventBridge = {


      publishFromEntity: jest.fn().mockResolvedValue(undefined),


    };
    repos = createE2ERepos();
    abandonedService = new AbandonedCartService(repos.abandoned, repos.carts, mockEventBridge as never);
  });

  it('detect abandoned cart after 48h idle', async () => {
    const cart = makeOldCart(48);
    await repos.carts.save(cart);
    await repos.items.save(
      CartItemEntity.create({
        id: CartItemIdVO.create(ITEM_ID),
        now: '2024-01-01T00:00:00.000Z',
        props: {
          cartId: CartIdVO.create(CART_ID),
          productId: ProductIdVO.create(PRODUCT_ID),
          quantity: CartItemQuantityVO.create(2),
          status: CartItemStatusVO.active(),
          unitPrice: 250,
          currency: 'BDT',
        },
      }),
    );

    const result = await abandonedService.detect(CART_ID);
    expect(result.cartId).toBe(CART_ID);
    expect(result.status).toBe('pending');
  });

  it('detect throws for active cart (2h idle)', async () => {
    const cart = makeOldCart(2);
    await repos.carts.save(cart);

    await expect(abandonedService.detect(CART_ID)).rejects.toThrow();
  });

  it('send reminder → status becomes reminded', async () => {
    const cart = makeOldCart(48);
    await repos.carts.save(cart);

    const detected = await abandonedService.detect(CART_ID);
    const reminded = await abandonedService.sendReminder(detected.id, 'email');

    expect(reminded.status).toBe('reminded');
    expect(reminded.remindersSent).toBe(1);
  });

  it('recover abandoned cart with order id', async () => {
    const cart = makeOldCart(48);
    await repos.carts.save(cart);

    const detected = await abandonedService.detect(CART_ID);
    const recovered = await abandonedService.recover(detected.id, 'order-123');

    expect(recovered.status).toBe('recovered');
    expect(recovered.recoveredOrderId).toBe('order-123');
  });

  it('mark lost after detection', async () => {
    const cart = makeOldCart(48);
    await repos.carts.save(cart);

    const detected = await abandonedService.detect(CART_ID);
    const lost = await abandonedService.markLost(detected.id, 'no response');

    expect(lost.status).toBe('lost');
  });
});
