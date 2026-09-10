import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { ORDER_TRACKING } from '@vubon/shared-constants/src/business/checkout/order-tracking.constants';

const orderTrackingStatusKeys = Object.keys(ORDER_TRACKING.STATUS) as [string, ...string[]];

export const OrderTrackingSchema = BaseSchema.extend({
  trackingId: z.string().uuid(),
  orderId: z.string().uuid(),
  trackingNumber: z.string().min(1).max(100),
  carrier: z.string().min(1).max(100),
  status: z.enum(orderTrackingStatusKeys),
  location: z.string(),
  description: z.string(),
  estimatedDelivery: z.date().optional(),
  actualDelivery: z.date().optional(),
  isDelivered: z.boolean().default(false),
  metadata: z.record(z.unknown()).optional(),
  occurredAt: z.date(),
});
