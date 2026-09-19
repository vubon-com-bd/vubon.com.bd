/**
 * Cart Item Types
 * @module shared-types/business/cart
 *
 * Cart item — একটা product/variant cart-এ।
 */

import type { CartId, ProductId, Money, Url } from '../../common/primitives';

export interface CartItem {
  readonly id: string;
  readonly cartId: CartId;
  readonly productId: ProductId;
  readonly variantId?: string;
  readonly sku: string;
  readonly name: string;
  readonly imageUrl?: Url;
  readonly unitPrice: Money;
  readonly compareAtPrice?: Money;
  readonly quantity: number;
  readonly subtotal: Money;
  readonly discountAmount?: Money;
  readonly taxAmount?: Money;
  readonly total: Money;
  readonly currency: string;
  readonly attributes?: Readonly<Record<string, string>>;
  readonly isAvailable: boolean;
  readonly addedAt: string;
  readonly updatedAt: string;
}

export interface CartItemInput {
  readonly productId: ProductId;
  readonly variantId?: string;
  readonly quantity: number;
  readonly attributes?: Readonly<Record<string, string>>;
}

export interface CartItemUpdateInput {
  readonly quantity?: number;
  readonly attributes?: Readonly<Record<string, string>>;
}

export interface CartItemPublic {
  readonly id: string;
  readonly productId: ProductId;
  readonly variantId?: string;
  readonly name: string;
  readonly imageUrl?: Url;
  readonly unitPrice: Money;
  readonly quantity: number;
  readonly total: Money;
  readonly isAvailable: boolean;
}
