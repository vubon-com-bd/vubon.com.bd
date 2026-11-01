/**
 * Cart test fixtures
 */
import { CartEntity } from '@domain/entities/cart.entity.js';
import { CartIdVO } from '@domain/value-objects/primitives/cart-id.vo.js';
import { CartTypeVO } from '@domain/value-objects/primitives/cart-type.vo.js';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo.js';
import { SessionIdVO } from '@domain/value-objects/primitives/session-id.vo.js';
import { TEST_IDS, TEST_DATES, TEST_CURRENCY } from './ids.fixture.js';

export function makeUserCart(overrides: Partial<{ total: number }> = {}): CartEntity {
  const cart = CartEntity.create({
    id: CartIdVO.create(TEST_IDS.CART_ID),
    props: {
      type: CartTypeVO.user(),
      userId: UserIdVO.create(TEST_IDS.USER_ID),
      currency: TEST_CURRENCY,
      expiresAt: TEST_DATES.NEXT_MONTH,
    },
    now: TEST_DATES.NOW,
  });

  if (overrides.total !== undefined && overrides.total > 0) {
    cart.updateTotals(
      {
        subtotal: overrides.total,
        discount: 0,
        tax: 0,
        shipping: 0,
      },
      TEST_DATES.NOW,
    );
  }

  return cart;
}

export function makeGuestCart(): CartEntity {
  return CartEntity.create({
    id: CartIdVO.create(TEST_IDS.CART_ID_2),
    props: {
      type: CartTypeVO.guest(),
      sessionId: SessionIdVO.create(TEST_IDS.SESSION_ID),
      currency: TEST_CURRENCY,
      expiresAt: TEST_DATES.NEXT_WEEK,
    },
    now: TEST_DATES.NOW,
  });
}

export function makeReconstitutedCart(): CartEntity {
  return CartEntity.reconstitute({
    id: TEST_IDS.CART_ID,
    createdAt: TEST_DATES.YESTERDAY,
    updatedAt: TEST_DATES.NOW,
    status: 'active',
    props: {
      type: CartTypeVO.user(),
      userId: UserIdVO.create(TEST_IDS.USER_ID),
      currency: TEST_CURRENCY,
      itemCount: 2,
      subtotal: 200,
      discountAmount: 0,
      taxAmount: 0,
      shippingAmount: 0,
      total: 200,
      expiresAt: TEST_DATES.NEXT_MONTH,
      lastActivityAt: TEST_DATES.NOW,
    },
    version: 3,
  });
}
