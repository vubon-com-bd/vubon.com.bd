import { BaseEntity } from '../../common/base.types';
import { Money } from '../../common/money.types';
import { Quantity } from '../../common/quantity.types';
import { CART_ITEM } from '@vubon/shared-constants/src/business/cart/cart-item.constants';
import { Product } from '../product/product.types';
import { Variant } from '../product/variant.types';
import { Cart } from './cart.types';

export interface CartItemMetadata {
  addedAt: Date;
  updatedAt: Date;
  source: string;
  wishlistId?: string;
  savedForLaterId?: string;
}

export interface CartItem extends BaseEntity {
  itemId: string;
  cartId: string;
  cart: Cart;
  productId: string;
  product: Product;
  variantId?: string;
  variant?: Variant;
  status: keyof typeof CART_ITEM.STATUS | string;
  type: keyof typeof CART_ITEM.TYPES | string;
  quantity: Quantity;
  maxQuantity: number;
  unitPrice: Money;
  totalPrice: Money;
  discountPrice: Money;
  taxPrice: Money;
  finalPrice: Money;
  isSelected: boolean;
  isGift: boolean;
  giftMessage?: string;
  notes?: string;
  metadata: CartItemMetadata;
}
