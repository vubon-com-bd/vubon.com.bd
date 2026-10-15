/**
 * E2E Fixtures — deterministic test data
 * @module cart-service/test/e2e/setup
 */
import { CartEntity } from '@domain/entities/cart.entity.js';
import { CartItemEntity } from '@domain/entities/cart-item.entity.js';
import { CartIdVO } from '@domain/value-objects/primitives/cart-id.vo.js';
import { CartTypeVO } from '@domain/value-objects/primitives/cart-type.vo.js';
import { CartItemIdVO } from '@domain/value-objects/primitives/cart-item-id.vo.js';
import { CartItemQuantityVO } from '@domain/value-objects/primitives/cart-item-quantity.vo.js';
import { ProductIdVO } from '@domain/value-objects/primitives/product-id.vo.js';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo.js';
import { SessionIdVO } from '@domain/value-objects/primitives/session-id.vo.js';

const NOW = new Date().toISOString();
const DAY = 24 * 3600 * 1000;
const NEXT_MONTH = new Date(Date.now() + 30 * DAY).toISOString();
const NEXT_WEEK = new Date(Date.now() + 7 * DAY).toISOString();

export const E2E_IDS = {
  CART: '11111111-1111-4111-8111-111111111111',
  CART_2: '11111111-1111-4111-8111-222222222222',
  ITEM: '22222222-2222-4222-8222-222222222222',
  ITEM_2: '22222222-2222-4222-8222-333333333333',
  USER: '33333333-3333-4333-8333-333333333333',
  PRODUCT: '44444444-4444-4444-8444-444444444444',
  PRODUCT_2: '44444444-4444-4444-8444-555555555555',
  VARIANT: '55555555-5555-4555-8555-555555555555',
  SESSION: 'e2e-session-1234567890',
} as const;

export const E2E_DATES = { NOW, NEXT_MONTH, NEXT_WEEK } as const;
export const E2E_CURRENCY = 'BDT' as const;

/**
 * Create a fresh user cart.
 */
export function makeE2EUserCart(total = 0): CartEntity {
  const cart = CartEntity.create({
    id: CartIdVO.create(E2E_IDS.CART),
    props: {
      type: CartTypeVO.user(),
      userId: UserIdVO.create(E2E_IDS.USER),
      currency: E2E_CURRENCY,
      expiresAt: NEXT_MONTH,
    },
    now: NOW,
  });

  if (total > 0) {
    cart.updateTotals(
      { subtotal: total, discount: 0, tax: 0, shipping: 0 },
      NOW,
    );
  }
  return cart;
}

/**
 * Create a fresh guest cart.
 */
export function makeE2EGuestCart(): CartEntity {
  return CartEntity.create({
    id: CartIdVO.create(E2E_IDS.CART_2),
    props: {
      type: CartTypeVO.guest(),
      sessionId: SessionIdVO.create(E2E_IDS.SESSION),
      currency: E2E_CURRENCY,
      expiresAt: NEXT_WEEK,
    },
    now: NOW,
  });
}

/**
 * Create a cart item.
 */
export function makeE2EItem(opts: {
  id?: string;
  productId?: string;
  variantId?: string;
  quantity?: number;
  unitPrice?: number;
} = {}): CartItemEntity {
  return CartItemEntity.create({
    id: CartItemIdVO.create(opts.id ?? E2E_IDS.ITEM),
    props: {
      cartId: CartIdVO.create(E2E_IDS.CART),
      productId: ProductIdVO.create(opts.productId ?? E2E_IDS.PRODUCT),
      quantity: CartItemQuantityVO.create(opts.quantity ?? 2),
      unitPrice: opts.unitPrice ?? 100,
      currency: E2E_CURRENCY,
    },
    now: NOW,
  });
}
