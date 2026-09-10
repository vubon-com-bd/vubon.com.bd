import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { MoneySchema } from '../../common/money.schema';
import { QuantitySchema } from '../../common/quantity.schema';
import { ProductSchema } from '../product/product.schema';
import { VariantSchema } from '../product/variant.schema';
import { ORDER_ITEM } from '@vubon/shared-constants/src/business/checkout/order-item.constants';

const orderItemStatusKeys = Object.keys(ORDER_ITEM.STATUS) as [string, ...string[]];

export const OrderItemSchema = BaseSchema.extend({
  itemId: z.string().uuid(),
  orderId: z.string().uuid(),
  productId: z.string().uuid(),
  product: ProductSchema,
  variantId: z.string().uuid().optional(),
  variant: VariantSchema.optional(),
  status: z.enum(orderItemStatusKeys),
  name: z.string().min(1).max(255),
  sku: z.string().min(1).max(100),
  quantity: QuantitySchema,
  unitPrice: MoneySchema,
  totalPrice: MoneySchema,
  discountPrice: MoneySchema,
  taxPrice: MoneySchema,
  finalPrice: MoneySchema,
  isReturnable: z.boolean().default(true),
  isRefunded: z.boolean().default(false),
  refundedAmount: MoneySchema.optional(),
  metadata: z.record(z.unknown()).optional(),
});
