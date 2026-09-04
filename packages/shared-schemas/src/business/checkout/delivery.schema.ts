/**
 * Delivery Schema
 * ডেলিভারি সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { DELIVERY_STATUS } from '@vubon/shared-constants';

export const DeliverySchema = BaseSchema.extend({
  orderId: z.string().uuid(),
  type: z.enum([
    'standard',
    'express',
    'same_day',
    'next_day',
    'scheduled',
    'pickup',
    'dropshipping',
  ]),
  status: z.enum(Object.values(DELIVERY_STATUS) as [string, ...string[]]),
  carrier: z.string().min(1, 'Carrier is required'),
  trackingNumber: z.string().optional(),
  trackingUrl: z.string().url().optional(),
  estimatedDeliveryDate: z.date(),
  actualDeliveryDate: z.date().optional(),
  shippingLabel: z.string().url().optional(),
  packingSlip: z.string().url().optional(),
  invoice: z.string().url().optional(),
  notes: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const DeliveryCreateSchema = DeliverySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const DeliveryUpdateSchema = DeliveryCreateSchema.partial();

export const DeliveryTrackingSchema = z.object({
  deliveryId: z.string().uuid(),
  status: z.enum(Object.values(DELIVERY_STATUS) as [string, ...string[]]),
  description: z.string().min(1),
  descriptionBangla: z.string().optional(),
  location: z.string().optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  note: z.string().optional(),
});

export type Delivery = z.infer<typeof DeliverySchema>;
export type DeliveryCreate = z.infer<typeof DeliveryCreateSchema>;
export type DeliveryUpdate = z.infer<typeof DeliveryUpdateSchema>;
export type DeliveryTracking = z.infer<typeof DeliveryTrackingSchema>;
