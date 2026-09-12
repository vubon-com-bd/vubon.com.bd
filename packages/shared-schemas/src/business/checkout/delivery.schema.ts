import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { MoneySchema } from '../../common/money.schema';
import { DELIVERY } from '@vubon/shared-constants/src/business/checkout/delivery.constants';
import { OrderSchema } from './order.schema';
import { DeliveryMethodSchema } from './delivery-method.schema';
import { ShippingAddressSchema } from './shipping-address.schema';

const deliveryStatusKeys = Object.keys(DELIVERY.STATUS) as [string, ...string[]];
const deliveryTypeKeys = Object.keys(DELIVERY.TYPES) as [string, ...string[]];

export const DeliverySchema = BaseSchema.extend({
  deliveryId: z.string().uuid(),
  orderId: z.string().uuid(),
  order: OrderSchema,
  status: z.enum(deliveryStatusKeys),
  type: z.enum(deliveryTypeKeys),
  method: DeliveryMethodSchema,
  address: ShippingAddressSchema,
  trackingNumber: z.string().optional(),
  carrier: z.string().optional(),
  cost: MoneySchema,
  isCod: z.boolean().default(false),
  codAmount: MoneySchema.optional(),
  isCollected: z.boolean().default(false),
  collectedAt: z.date().optional(),
  collectedBy: z.string().optional(),
  scheduledDate: z.date(),
  scheduledTime: z.string(),
  startedAt: z.date().optional(),
  deliveredAt: z.date().optional(),
  deliveryAttempts: z.array(
    z.object({
      attemptNumber: z.number().int().min(1),
      attemptedAt: z.date(),
      status: z.enum(['attempted', 'delivered', 'failed']),
      reason: z.string().optional(),
      notes: z.string().optional(),
    })
  ),
  maxAttempts: z.number().int().min(1).default(3),
  notes: z.string().optional(),
  signature: z.string().optional(),
  metadata: z.object({
    isPriority: z.boolean().default(false),
    isExpress: z.boolean().default(false),
    requiresSignature: z.boolean().default(false),
    requiresPhoto: z.boolean().default(false),
    requiresOtp: z.boolean().default(false),
    ageRestricted: z.boolean().default(false),
  }),
});
