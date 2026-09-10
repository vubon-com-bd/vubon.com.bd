import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { MoneySchema } from '../../common/money.schema';
import { UserSchema } from '../../user/user.schema';
import { CartSchema } from '../cart/cart.schema';
import { CheckoutStepSchema } from './checkout-step.schema';
import { CheckoutSessionSchema } from './checkout-session.schema';
import { BillingAddressSchema } from './billing-address.schema';
import { ShippingAddressSchema } from './shipping-address.schema';
import { DeliveryMethodSchema } from './delivery-method.schema';
import { CHECKOUT_STATUS } from '@vubon/shared-constants/src/business/checkout/checkout-status.constants';

const checkoutStatusKeys = Object.keys(CHECKOUT_STATUS) as [string, ...string[]];

export const CheckoutSchema = BaseSchema.extend({
  checkoutId: z.string().uuid(),
  cartId: z.string().uuid(),
  cart: CartSchema,
  userId: z.string().uuid(),
  user: UserSchema,
  status: z.enum(checkoutStatusKeys),
  steps: z.array(CheckoutStepSchema),
  currentStep: z.number().int().min(0),
  session: CheckoutSessionSchema,
  billingAddress: BillingAddressSchema,
  shippingAddress: ShippingAddressSchema,
  deliveryMethod: DeliveryMethodSchema,
  subtotal: MoneySchema,
  discountTotal: MoneySchema,
  taxTotal: MoneySchema,
  shippingCost: MoneySchema,
  grandTotal: MoneySchema,
  currency: z.string().min(3).max(3),
  isComplete: z.boolean().default(false),
  isExpired: z.boolean().default(false),
  expiresAt: z.date(),
  completedAt: z.date().optional(),
  metadata: z.object({
    ipAddress: z.string(),
    userAgent: z.string(),
    deviceId: z.string(),
    sessionId: z.string(),
    utmSource: z.string().optional(),
    utmMedium: z.string().optional(),
    utmCampaign: z.string().optional(),
  }),
});

export const CheckoutCreateSchema = CheckoutSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  currentStep: true,
  isComplete: true,
  isExpired: true,
  completedAt: true,
});

export const CheckoutUpdateSchema = CheckoutCreateSchema.partial();
