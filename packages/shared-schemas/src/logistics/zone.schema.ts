/**
 * Zone Schema
 * @module shared-schemas/logistics
 *
 * Values আসে shared-constants/logistics/zone.constants থেকে।
 */

import { z } from 'zod';
import { BaseEntitySchema } from '../common/base/base-entity.schema';
import { PositiveMoneySchema, MoneySchema } from '../common/primitives/money.schema';
import { ZONE_STATUS, ZONE_TYPE, ZONE_PRICING_TYPE } from '@vubon/shared-constants/logistics';

export const ZoneStatusSchema = z.enum(Object.values(ZONE_STATUS) as [string, ...string[]]);

export const ZoneTypeSchema = z.enum(Object.values(ZONE_TYPE) as [string, ...string[]]);

export const ZonePricingTypeSchema = z.enum(
  Object.values(ZONE_PRICING_TYPE) as [string, ...string[]]
);

export const ZoneSchema = BaseEntitySchema.extend({
  name: z.string().min(1).max(150),
  code: z.string().min(1).max(50),
  type: ZoneTypeSchema,
  status: ZoneStatusSchema,
  pricingType: ZonePricingTypeSchema,
  parentId: z.string().optional(),
  postalCodes: z.array(z.string().max(20)).max(1000).optional(),
  districts: z.array(z.string().max(100)).max(100).optional(),
  divisions: z.array(z.string().max(100)).max(20).optional(),
  shippingCost: PositiveMoneySchema,
  freeAbove: MoneySchema.optional(),
  currency: z.string().length(3),
  minDeliveryDays: z.number().int().min(0).max(30),
  maxDeliveryDays: z.number().int().min(0).max(60),
  codEnabled: z.boolean(),
  codCharge: MoneySchema.optional(),
  codMaxAmount: MoneySchema.optional(),
  isRemote: z.boolean(),
  isActive: z.boolean(),
});

export const ZonePublicSchema = ZoneSchema.pick({
  id: true,
  name: true,
  code: true,
  type: true,
  shippingCost: true,
  currency: true,
  minDeliveryDays: true,
  maxDeliveryDays: true,
});

export type ZoneStatusSchemaType = z.infer<typeof ZoneStatusSchema>;
export type ZoneTypeSchemaType = z.infer<typeof ZoneTypeSchema>;
export type ZoneSchemaType = z.infer<typeof ZoneSchema>;
export type ZonePublicSchemaType = z.infer<typeof ZonePublicSchema>;
