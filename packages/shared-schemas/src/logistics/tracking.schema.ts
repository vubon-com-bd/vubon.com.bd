/**
 * Tracking Schema
 * @module shared-schemas/logistics
 *
 * Values আসে shared-constants/logistics/tracking.constants থেকে।
 */

import { z } from 'zod';
import { UuidSchema } from '../common/primitives/uuid.schema';
import {
  TRACKING_EVENT,
  TRACKING_STATUS,
  TRACKING_SOURCE,
} from '@vubon/shared-constants/logistics';

export const TrackingEventSchema = z.enum(Object.values(TRACKING_EVENT) as [string, ...string[]]);

export const TrackingStatusSchema = z.enum(Object.values(TRACKING_STATUS) as [string, ...string[]]);

export const TrackingSourceSchema = z.enum(Object.values(TRACKING_SOURCE) as [string, ...string[]]);

export const TrackingEventEntrySchema = z.object({
  id: z.string().min(1),
  shipmentId: UuidSchema.optional(),
  orderId: UuidSchema.optional(),
  event: TrackingEventSchema,
  status: TrackingStatusSchema,
  source: TrackingSourceSchema,
  message: z.string().min(1).max(500),
  location: z.string().max(255).optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  occurredAt: z.string().datetime(),
  receivedAt: z.string().datetime(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const TrackingInfoSchema = z.object({
  trackingNumber: z.string().min(1).max(100),
  courierCode: z.string().max(50).optional(),
  status: TrackingStatusSchema,
  currentEvent: TrackingEventSchema.optional(),
  currentLocation: z.string().max(255).optional(),
  estimatedDeliveryAt: z.string().datetime().optional(),
  events: z.array(TrackingEventEntrySchema).max(500),
  lastUpdatedAt: z.string().datetime(),
});

export const TrackingPublicSchema = TrackingInfoSchema.pick({
  trackingNumber: true,
  status: true,
  currentEvent: true,
  events: true,
});

export type TrackingEventSchemaType = z.infer<typeof TrackingEventSchema>;
export type TrackingStatusSchemaType = z.infer<typeof TrackingStatusSchema>;
export type TrackingInfoSchemaType = z.infer<typeof TrackingInfoSchema>;
export type TrackingPublicSchemaType = z.infer<typeof TrackingPublicSchema>;
