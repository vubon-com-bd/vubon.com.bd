/**
 * Fulfillment Schema
 * @module shared-schemas/logistics
 *
 * Values আসে shared-constants/logistics/fulfillment.constants থেকে।
 */

import { z } from 'zod';
import { BaseEntitySchema } from '../common/base/base-entity.schema';
import { UuidSchema } from '../common/primitives/uuid.schema';
import {
  FULFILLMENT_STATUS,
  FULFILLMENT_TYPE,
  FULFILLMENT_PRIORITY,
} from '@vubon/shared-constants/logistics';

export const FulfillmentStatusSchema = z.enum(
  Object.values(FULFILLMENT_STATUS) as [string, ...string[]]
);

export const FulfillmentTypeSchema = z.enum(
  Object.values(FULFILLMENT_TYPE) as [string, ...string[]]
);

export const FulfillmentPrioritySchema = z.enum(
  Object.values(FULFILLMENT_PRIORITY) as [string, ...string[]]
);

export const FulfillmentSchema = BaseEntitySchema.extend({
  orderId: UuidSchema,
  vendorId: UuidSchema.optional(),
  warehouseId: UuidSchema.optional(),
  status: FulfillmentStatusSchema,
  type: FulfillmentTypeSchema,
  priority: FulfillmentPrioritySchema,
  itemIds: z.array(UuidSchema).min(1).max(100),
  assignedTo: UuidSchema.optional(),
  pickedAt: z.string().datetime().optional(),
  packedAt: z.string().datetime().optional(),
  shippedAt: z.string().datetime().optional(),
  cancelledAt: z.string().datetime().optional(),
  notes: z.string().max(1000).optional(),
  slaDueAt: z.string().datetime().optional(),
});

export const FulfillmentPublicSchema = FulfillmentSchema.pick({
  id: true,
  orderId: true,
  status: true,
  type: true,
  priority: true,
}).extend({
  itemCount: z.number().int().nonnegative(),
});

export const FulfillmentListFilterSchema = z.object({
  status: FulfillmentStatusSchema.optional(),
  type: FulfillmentTypeSchema.optional(),
  priority: FulfillmentPrioritySchema.optional(),
  orderId: UuidSchema.optional(),
  vendorId: UuidSchema.optional(),
  warehouseId: UuidSchema.optional(),
  fromDate: z.string().datetime().optional(),
  toDate: z.string().datetime().optional(),
});

export type FulfillmentStatusSchemaType = z.infer<typeof FulfillmentStatusSchema>;
export type FulfillmentTypeSchemaType = z.infer<typeof FulfillmentTypeSchema>;
export type FulfillmentPrioritySchemaType = z.infer<typeof FulfillmentPrioritySchema>;
export type FulfillmentSchemaType = z.infer<typeof FulfillmentSchema>;
export type FulfillmentPublicSchemaType = z.infer<typeof FulfillmentPublicSchema>;
export type FulfillmentListFilterSchemaType = z.infer<typeof FulfillmentListFilterSchema>;
