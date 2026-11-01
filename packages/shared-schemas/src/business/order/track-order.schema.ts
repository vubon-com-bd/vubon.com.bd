/**
 * Track Order Request Schema
 * @module shared-schemas/business/order/requests
 */

import { z } from 'zod';

export const TrackOrderRequestSchema = z
  .object({
    orderNumber: z.string().min(1).max(50).optional(),
    trackingNumber: z.string().min(1).max(100).optional(),
    email: z.string().email().optional(),
    phone: z.string().max(20).optional(),
  })
  .strict()
  .refine((data) => data.orderNumber !== undefined || data.trackingNumber !== undefined, {
    message: 'Either orderNumber or trackingNumber must be provided',
  });

export type TrackOrderRequestSchemaType = z.infer<typeof TrackOrderRequestSchema>;
