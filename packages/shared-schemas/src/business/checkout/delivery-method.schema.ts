import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { MoneySchema } from '../../common/money.schema';
import { DELIVERY_METHOD } from '@vubon/shared-constants/src/business/checkout/delivery-method.constants';

const deliveryMethodTypeKeys = Object.keys(DELIVERY_METHOD.TYPES) as [string, ...string[]];

export const DeliveryMethodSchema = BaseSchema.extend({
  deliveryId: z.string().uuid(),
  checkoutId: z.string().uuid(),
  type: z.enum(deliveryMethodTypeKeys),
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  cost: MoneySchema,
  estimatedDays: z.number().int().min(1),
  estimatedDelivery: z.date(),
  isAvailable: z.boolean().default(true),
  isSelected: z.boolean().default(false),
  trackingNumber: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});
