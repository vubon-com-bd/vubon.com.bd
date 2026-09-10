import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { TRACKING } from '@vubon/shared-constants/src/logistics/tracking.constants';

const trackingStatusKeys = Object.keys(TRACKING.STATUS) as [string, ...string[]];

export const TrackingSchema = BaseSchema.extend({
  trackingId: z.string().uuid(),
  shipmentId: z.string().uuid(),
  trackingNumber: z.string().min(1).max(100),
  status: z.enum(trackingStatusKeys),
  carrier: z.string(),
  events: z.array(
    z.object({
      eventId: z.string().uuid(),
      status: z.string(),
      location: z.string(),
      description: z.string(),
      timestamp: z.date(),
      metadata: z.record(z.unknown()),
    })
  ),
  isActive: z.boolean().default(true),
  isDelivered: z.boolean().default(false),
  isExpired: z.boolean().default(false),
  expiresAt: z.date(),
  metadata: z.record(z.unknown()).optional(),
});
