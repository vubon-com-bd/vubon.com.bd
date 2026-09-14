/**
 * Order Tracking Schema
 * @module shared-schemas/business/order
 *
 * Values আসে shared-constants/business/order-tracking.constants থেকে।
 */

import { z } from 'zod';
import { ORDER_TRACKING_EVENT } from '@vubon/shared-constants/business';
import { UuidSchema } from '../../common/primitives/uuid.schema';
import { LatLngSchema } from '../../common/geo/coordinates.schema';

export const OrderTrackingEventSchema = z.enum(
  Object.values(ORDER_TRACKING_EVENT) as [string, ...string[]]
);

export const OrderTrackingEntrySchema = z.object({
  id: UuidSchema,
  orderId: UuidSchema,
  event: OrderTrackingEventSchema,
  message: z.string().min(1).max(500),
  location: z.string().max(255).optional(),
  coordinates: LatLngSchema.optional(),
  occurredAt: z.string().datetime(),
  createdBy: z.string().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const OrderTrackingPublicSchema = OrderTrackingEntrySchema.pick({
  event: true,
  message: true,
  occurredAt: true,
});

export const OrderTrackingSummarySchema = z.object({
  orderId: UuidSchema,
  currentEvent: OrderTrackingEventSchema,
  currentMessage: z.string(),
  lastUpdatedAt: z.string().datetime(),
  estimatedDeliveryAt: z.string().datetime().optional(),
  events: z.array(OrderTrackingPublicSchema).max(500),
});

export type OrderTrackingEventSchemaType = z.infer<typeof OrderTrackingEventSchema>;
export type OrderTrackingEntrySchemaType = z.infer<typeof OrderTrackingEntrySchema>;
export type OrderTrackingPublicSchemaType = z.infer<typeof OrderTrackingPublicSchema>;
export type OrderTrackingSummarySchemaType = z.infer<typeof OrderTrackingSummarySchema>;
