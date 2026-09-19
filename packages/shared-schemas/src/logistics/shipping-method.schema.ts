/**
 * Shipping Method Schema
 * @module shared-schemas/logistics
 *
 * Values আসে shared-constants/logistics/shipping-method.constants থেকে।
 */

import { z } from 'zod';
import { BaseEntitySchema } from '../common/base/base-entity.schema';
import { UuidSchema } from '../common/primitives/uuid.schema';
import { PositiveMoneySchema, MoneySchema } from '../common/primitives/money.schema';
import {
  SHIPPING_METHOD,
  SHIPPING_METHOD_STATUS,
  SHIPPING_RATE_TYPE,
} from '@vubon/shared-constants/logistics';

export const ShippingMethodValueSchema = z.enum(
  Object.values(SHIPPING_METHOD) as [string, ...string[]]
);

export const ShippingMethodStatusSchema = z.enum(
  Object.values(SHIPPING_METHOD_STATUS) as [string, ...string[]]
);

export const ShippingRateTypeSchema = z.enum(
  Object.values(SHIPPING_RATE_TYPE) as [string, ...string[]]
);

export const ShippingMethodSchema = BaseEntitySchema.extend({
  name: z.string().min(1).max(150),
  code: z.union([ShippingMethodValueSchema, z.string().min(1).max(50)]),
  displayName: z.string().min(1).max(150),
  status: ShippingMethodStatusSchema,
  rateType: ShippingRateTypeSchema,
  baseCost: PositiveMoneySchema,
  freeAbove: MoneySchema.optional(),
  currency: z.string().length(3),
  minDeliveryDays: z.number().int().min(0).max(30),
  maxDeliveryDays: z.number().int().min(0).max(60),
  maxWeightKg: z.number().positive().optional(),
  maxDimensionsCm: z.number().positive().optional(),
  codEnabled: z.boolean(),
  trackingEnabled: z.boolean(),
  coverageZones: z.array(UuidSchema).max(100).optional(),
  couriers: z.array(UuidSchema).max(50).optional(),
  isDefault: z.boolean(),
  isActive: z.boolean(),
});

export const ShippingMethodPublicSchema = ShippingMethodSchema.pick({
  id: true,
  name: true,
  displayName: true,
  rateType: true,
  baseCost: true,
  currency: true,
  minDeliveryDays: true,
  maxDeliveryDays: true,
  codEnabled: true,
});

export type ShippingMethodValueSchemaType = z.infer<typeof ShippingMethodValueSchema>;
export type ShippingMethodStatusSchemaType = z.infer<typeof ShippingMethodStatusSchema>;
export type ShippingRateTypeSchemaType = z.infer<typeof ShippingRateTypeSchema>;
export type ShippingMethodSchemaType = z.infer<typeof ShippingMethodSchema>;
export type ShippingMethodPublicSchemaType = z.infer<typeof ShippingMethodPublicSchema>;
