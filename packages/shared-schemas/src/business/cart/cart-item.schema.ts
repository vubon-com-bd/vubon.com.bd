import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { MoneySchema } from '../../common/money.schema';
import { QuantitySchema } from '../../common/quantity.schema';
import { ProductSchema } from '../product/product.schema';
import { VariantSchema } from '../product/variant.schema';
import { CART_ITEM } from '@vubon/shared-constants/src/business/cart/cart-item.constants';

const cartItemStatusKeys = Object.keys(CART_ITEM.STATUS) as [string, ...string[]];
const cartItemTypeKeys = Object.keys(CART_ITEM.TYPES) as [string, ...string[]];

export const CartItemSchema = BaseSchema.extend({
  itemId: z.string().uuid(),
  cartId: z.string().uuid(),
  productId: z.string().uuid(),
  product: ProductSchema,
  variantId: z.string().uuid().optional(),
  variant: VariantSchema.optional(),
  status: z.enum(cartItemStatusKeys),
  type: z.enum(cartItemTypeKeys),
  quantity: QuantitySchema,
  maxQuantity: z.number().int().min(1).default(99),
  unitPrice: MoneySchema,
  totalPrice: MoneySchema,
  discountPrice: MoneySchema,
  taxPrice: MoneySchema,
  finalPrice: MoneySchema,
  isSelected: z.boolean().default(true),
  isGift: z.boolean().default(false),
  giftMessage: z.string().optional(),
  notes: z.string().optional(),
  metadata: z.object({
    addedAt: z.date(),
    updatedAt: z.date(),
    source: z.string(),
    wishlistId: z.string().uuid().optional(),
    savedForLaterId: z.string().uuid().optional(),
  }),
});

export const CartItemCreateSchema = CartItemSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  totalPrice: true,
  discountPrice: true,
  taxPrice: true,
  finalPrice: true,
});
