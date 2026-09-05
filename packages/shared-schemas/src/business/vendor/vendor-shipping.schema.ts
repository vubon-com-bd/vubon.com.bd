/**
 * Vendor Shipping Schema
 * ভেন্ডর শিপিং সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { VENDOR_SHIPPING } from '@vubon/shared-constants';

export const VendorShippingSchema = BaseSchema.extend({
  vendorId: z.string().uuid(),
  type: z.enum(Object.values(VENDOR_SHIPPING.TYPES) as [string, ...string[]]),
  name: z.string().min(1, 'Shipping name is required'),
  nameBangla: z.string().optional(),
  carrier: z.enum(Object.values(VENDOR_SHIPPING.CARRIERS) as [string, ...string[]]),
  carrierCode: z.string().optional(),
  cost: z.number().min(0, 'Cost must be greater than or equal to 0'),
  freeShippingThreshold: z.number().min(0).optional(),
  estimatedDays: z.number().int().min(0).default(3),
  isActive: z.boolean().default(true),
  zones: z.array(z.enum(Object.values(VENDOR_SHIPPING.ZONES) as [string, ...string[]])).default([]),
  metadata: z.record(z.union([z.string(), z.number(), z.boolean()])).optional(),
});

export const VendorShippingCreateSchema = VendorShippingSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const VendorShippingUpdateSchema = VendorShippingCreateSchema.partial();

export type VendorShipping = z.infer<typeof VendorShippingSchema>;
export type VendorShippingCreate = z.infer<typeof VendorShippingCreateSchema>;
export type VendorShippingUpdate = z.infer<typeof VendorShippingUpdateSchema>;
