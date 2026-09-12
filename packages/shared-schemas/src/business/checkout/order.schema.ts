import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { MoneySchema } from '../../common/money.schema';
import { UserSchema } from '../../user/user.schema';
import { CheckoutSchema } from './checkout.schema';
import { OrderItemSchema } from './order-item.schema';
import { OrderHistorySchema } from './order-history.schema';
import { OrderTrackingSchema } from './order-tracking.schema';
import { BillingAddressSchema } from './billing-address.schema';
import { ShippingAddressSchema } from './shipping-address.schema';
import { DeliveryMethodSchema } from './delivery-method.schema';
import { ORDER_STATUS } from '@vubon/shared-constants/src/business/checkout/order-status.constants';

const orderStatusKeys = Object.keys(ORDER_STATUS) as [string, ...string[]];

export const OrderSchema = BaseSchema.extend({
  orderId: z.string().uuid(),
  orderNumber: z.string().min(1).max(50),
  checkoutId: z.string().uuid(),
  checkout: CheckoutSchema,
  userId: z.string().uuid(),
  user: UserSchema,
  status: z.enum(orderStatusKeys),
  items: z.array(OrderItemSchema),
  billingAddress: BillingAddressSchema,
  shippingAddress: ShippingAddressSchema,
  deliveryMethod: DeliveryMethodSchema,
  subtotal: MoneySchema,
  discountTotal: MoneySchema,
  taxTotal: MoneySchema,
  shippingCost: MoneySchema,
  grandTotal: MoneySchema,
  currency: z.string().min(3).max(3),
  paymentStatus: z.enum(['pending', 'paid', 'failed', 'refunded']),
  paymentMethod: z.string(),
  paymentId: z.string().optional(),
  history: z.array(OrderHistorySchema),
  tracking: z.array(OrderTrackingSchema),
  isPaid: z.boolean().default(false),
  isShipped: z.boolean().default(false),
  isDelivered: z.boolean().default(false),
  isCancelled: z.boolean().default(false),
  isReturned: z.boolean().default(false),
  placedAt: z.date(),
  shippedAt: z.date().optional(),
  deliveredAt: z.date().optional(),
  cancelledAt: z.date().optional(),
  returnedAt: z.date().optional(),
  metadata: z.object({
    notes: z.string().optional(),
    giftMessage: z.string().optional(),
    isGift: z.boolean().default(false),
    ipAddress: z.string(),
    userAgent: z.string(),
    deviceId: z.string(),
    source: z.string(),
  }),
});

export const OrderCreateSchema = OrderSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  history: true,
  tracking: true,
  isPaid: true,
  isShipped: true,
  isDelivered: true,
  isCancelled: true,
  isReturned: true,
  placedAt: true,
});
