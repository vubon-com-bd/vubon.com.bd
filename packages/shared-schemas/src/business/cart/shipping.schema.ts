import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { MoneySchema } from '../../common/money.schema';
import { AddressSchema } from '../../common/address.schema';
import { SHIPPING } from '@vubon/shared-constants/src/business/cart/shipping.constants';
import { SHIPPING_METHODS } from '@vubon/shared-constants/src/common/shipping-methods.constants';
import { USER_ADDRESS } from '@vubon/shared-constants/src/user/user-address.constants';

const shippingTypeKeys = Object.keys(SHIPPING.TYPES) as [string, ...string[]];
const shippingMethodKeys = Object.keys(SHIPPING_METHODS) as [string, ...string[]];
const userAddressKeys = Object.keys(USER_ADDRESS) as [string, ...string[]];

export const ShippingSchema = BaseSchema.extend({
  shippingId: z.string().uuid(),
  cartId: z.string().uuid(),
  type: z.enum(shippingTypeKeys),
  method: z.enum(shippingMethodKeys),
  cost: MoneySchema,
  freeShippingThreshold: MoneySchema.optional(),
  estimatedDays: z.number().int().min(1),
  address: AddressSchema,
  addressType: z.enum(userAddressKeys),
  trackingNumber: z.string().optional(),
  carrier: z.string().optional(),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});
