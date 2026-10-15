/**
 * CartItem test fixtures
 */
import { CartItemEntity } from '@domain/entities/cart-item.entity.js';
import { CartItemIdVO } from '@domain/value-objects/primitives/cart-item-id.vo.js';
import { CartItemQuantityVO } from '@domain/value-objects/primitives/cart-item-quantity.vo.js';
import { CartIdVO } from '@domain/value-objects/primitives/cart-id.vo.js';
import { ProductIdVO } from '@domain/value-objects/primitives/product-id.vo.js';
import { VariantIdVO } from '@domain/value-objects/primitives/variant-id.vo.js';
import { TEST_IDS, TEST_DATES, TEST_CURRENCY } from './ids.fixture.js';

export function makeCartItem(opts: {
  id?: string;
  productId?: string;
  variantId?: string;
  quantity?: number;
  unitPrice?: number;
} = {}): CartItemEntity {
  return CartItemEntity.create({
    id: CartItemIdVO.create(opts.id ?? TEST_IDS.CART_ITEM_ID),
    props: {
      cartId: CartIdVO.create(TEST_IDS.CART_ID),
      productId: ProductIdVO.create(opts.productId ?? TEST_IDS.PRODUCT_ID),
      variantId: opts.variantId
        ? VariantIdVO.create(opts.variantId)
        : undefined,
      quantity: CartItemQuantityVO.create(opts.quantity ?? 2),
      unitPrice: opts.unitPrice ?? 100,
      currency: TEST_CURRENCY,
    },
    now: TEST_DATES.NOW,
  });
}

export function makeCartItems(count = 2): CartItemEntity[] {
  return Array.from({ length: count }, (_, i) =>
    makeCartItem({
      id: `22222222-2222-4222-8222-${String(i).padStart(12, '0')}`,
      productId: `44444444-4444-4444-8444-${String(i).padStart(12, '0')}`,
      quantity: 1,
      unitPrice: 50 * (i + 1),
    }),
  );
}
