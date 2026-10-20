/**
 * Delivery Method Schema
 * @module shared-schemas/business/order
 */

import { z } from 'zod';
import { UuidSchema } from '../../common/primitives/uuid.schema.js';
import { MoneySchema } from '../../common/primitives/money.schema.js';
import { IsoDateTimeSchema } from '../../common/primitives/timestamp.schema.js';

export const DeliveryMethodTypeSchema = z.enum([
  'flat_rate',
  'weight_based',
  'distance_based',
  'free',
  'pickup',
]);

export const DeliveryMethodSchema = z.object({
  id: UuidSchema,
  name: z.string().min(1).max(150),
  type: DeliveryMethodTypeSchema,
  carrier: z.string().max(100).optional(),
  baseCost: MoneySchema,
  currency: z.string().length(3),
  estimatedDays: z.number().int().nonnegative().max(365),
  isActive: z.boolean(),
  createdAt: IsoDateTimeSchema,
  updatedAt: IsoDateTimeSchema,
});

export const DeliveryMethodPublicSchema = DeliveryMethodSchema.pick({
  id: true,
  name: true,
  type: true,
  carrier: true,
  baseCost: true,
  currency: true,
  estimatedDays: true,
  isActive: true,
});

export type DeliveryMethodTypeSchemaType = z.infer<typeof DeliveryMethodTypeSchema>;
export type DeliveryMethodSchemaType = z.infer<typeof DeliveryMethodSchema>;
export type DeliveryMethodPublicSchemaType = z.infer<typeof DeliveryMethodPublicSchema>;
