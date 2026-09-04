/**
 * Shipping Schema
 * শিপিং সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { SHIPPING } from '@vubon/shared-constants';

export const ShippingSchema = BaseSchema.extend({
  type: z.enum([
    SHIPPING.TYPES.STANDARD,
    SHIPPING.TYPES.EXPRESS,
    SHIPPING.TYPES.SAME_DAY,
    SHIPPING.TYPES.NEXT_DAY,
    SHIPPING.TYPES.INTERNATIONAL,
    SHIPPING.TYPES.FREE,
    SHIPPING.TYPES.PICKUP,
    SHIPPING.TYPES.DROPSHIPPING,
  ]),
  name: z.string().min(1, 'Shipping name is required'),
  nameBangla: z.string().optional(),
  carrier: z.enum([
    SHIPPING.CARRIERS.SA_PARIBAN,
    SHIPPING.CARRIERS.REDX,
    SHIPPING.CARRIERS.PATHAO,
    SHIPPING.CARRIERS.STEADFAST,
    SHIPPING.CARRIERS.SUNDARBAN,
    SHIPPING.CARRIERS.PAPERFLY,
    SHIPPING.CARRIERS.ECOURIER,
    SHIPPING.CARRIERS.DHL,
    SHIPPING.CARRIERS.FEDEX,
    SHIPPING.CARRIERS.UPS,
  ]),
  carrierCode: z.string().optional(),
  cost: z.number().min(0, 'Cost must be greater than or equal to 0'),
  freeShippingThreshold: z.number().min(0).optional(),
  estimatedDays: z.number().int().min(0).default(3),
  isActive: z.boolean().default(true),
  zones: z
    .array(
      z.enum([
        SHIPPING.ZONES.DHAKA,
        SHIPPING.ZONES.CHITTAGONG,
        SHIPPING.ZONES.RAJSHAHI,
        SHIPPING.ZONES.KHULNA,
        SHIPPING.ZONES.BARISAL,
        SHIPPING.ZONES.SYLHET,
        SHIPPING.ZONES.RANGPUR,
        SHIPPING.ZONES.MYMENSINGH,
        SHIPPING.ZONES.INTERNATIONAL,
      ])
    )
    .default([]),
  metadata: z.record(z.unknown()).optional(),
});

export const ShippingCreateSchema = ShippingSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const ShippingUpdateSchema = ShippingCreateSchema.partial();

export const ShippingCalculationSchema = z.object({
  type: z.enum([
    SHIPPING.TYPES.STANDARD,
    SHIPPING.TYPES.EXPRESS,
    SHIPPING.TYPES.SAME_DAY,
    SHIPPING.TYPES.NEXT_DAY,
    SHIPPING.TYPES.INTERNATIONAL,
    SHIPPING.TYPES.FREE,
    SHIPPING.TYPES.PICKUP,
    SHIPPING.TYPES.DROPSHIPPING,
  ]),
  address: z.object({
    division: z.string(),
    district: z.string(),
    upazila: z.string().optional(),
    zipCode: z.string().optional(),
  }),
  items: z.array(
    z.object({
      weight: z.number().min(0).optional(),
      quantity: z.number().int().min(1),
    })
  ),
});

export type Shipping = z.infer<typeof ShippingSchema>;
export type ShippingCreate = z.infer<typeof ShippingCreateSchema>;
export type ShippingUpdate = z.infer<typeof ShippingUpdateSchema>;
export type ShippingCalculation = z.infer<typeof ShippingCalculationSchema>;
