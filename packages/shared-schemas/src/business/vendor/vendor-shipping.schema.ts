/**
 * Vendor Shipping Schema
 * @module shared-schemas/business/vendor
 *
 * Values আসে shared-constants/business/vendor-shipping.constants থেকে।
 */

import { z } from 'zod';
import { VENDOR_SHIPPING_METHOD, VENDOR_SHIPPING_ZONE } from '@vubon/shared-constants/business';
import { UuidSchema } from '../../common/primitives/uuid.schema';
import { MoneySchema } from '../../common/primitives/money.schema';

export const VendorShippingMethodSchema = z.enum(
  Object.values(VENDOR_SHIPPING_METHOD) as [string, ...string[]]
);

export const VendorShippingZoneSchema = z.enum(
  Object.values(VENDOR_SHIPPING_ZONE) as [string, ...string[]]
);

export const VendorShippingSchema = z.object({
  id: UuidSchema,
  vendorId: UuidSchema,
  method: VendorShippingMethodSchema,
  zone: VendorShippingZoneSchema,
  cost: MoneySchema,
  currency: z.string().length(3),
  freeAbove: MoneySchema.optional(),
  minDeliveryDays: z.number().int().min(0).max(30),
  maxDeliveryDays: z.number().int().min(0).max(60),
  isActive: z.boolean(),
  trackingRequired: z.boolean(),
  allowPickup: z.boolean(),
  allowCourier: z.boolean(),
});

export type VendorShippingMethodSchemaType = z.infer<typeof VendorShippingMethodSchema>;
export type VendorShippingZoneSchemaType = z.infer<typeof VendorShippingZoneSchema>;
export type VendorShippingSchemaType = z.infer<typeof VendorShippingSchema>;
