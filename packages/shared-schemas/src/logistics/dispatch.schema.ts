/**
 * Dispatch Schema
 * @module shared-schemas/logistics
 *
 * Values আসে shared-constants/logistics/dispatch.constants থেকে।
 */

import { z } from 'zod';
import { BaseEntitySchema } from '../common/base/base-entity.schema';
import { UuidSchema } from '../common/primitives/uuid.schema';
import { DISPATCH_STATUS, DISPATCH_TYPE } from '@vubon/shared-constants/logistics';

export const DispatchStatusSchema = z.enum(Object.values(DISPATCH_STATUS) as [string, ...string[]]);

export const DispatchTypeSchema = z.enum(Object.values(DISPATCH_TYPE) as [string, ...string[]]);

export const DispatchSchema = BaseEntitySchema.extend({
  dispatchNumber: z.string().min(1).max(50),
  status: DispatchStatusSchema,
  type: DispatchTypeSchema,
  shipmentIds: z.array(UuidSchema).min(1).max(500),
  courierId: UuidSchema.optional(),
  vehicleId: UuidSchema.optional(),
  driverId: UuidSchema.optional(),
  warehouseId: UuidSchema.optional(),
  manifestUrl: z.string().url().optional(),
  itemCount: z.number().int().nonnegative(),
  totalWeight: z.number().nonnegative().optional(),
  dispatchedAt: z.string().datetime().optional(),
  estimatedArrivalAt: z.string().datetime().optional(),
  deliveredAt: z.string().datetime().optional(),
  cancelledAt: z.string().datetime().optional(),
  notes: z.string().max(1000).optional(),
});

export const DispatchPublicSchema = DispatchSchema.pick({
  id: true,
  dispatchNumber: true,
  status: true,
  type: true,
  itemCount: true,
  dispatchedAt: true,
});

export const DispatchCreateInputSchema = z
  .object({
    type: DispatchTypeSchema,
    shipmentIds: z.array(UuidSchema).min(1).max(500),
    courierId: UuidSchema.optional(),
    vehicleId: UuidSchema.optional(),
    driverId: UuidSchema.optional(),
    warehouseId: UuidSchema.optional(),
    notes: z.string().max(1000).optional(),
  })
  .strict();

export type DispatchStatusSchemaType = z.infer<typeof DispatchStatusSchema>;
export type DispatchTypeSchemaType = z.infer<typeof DispatchTypeSchema>;
export type DispatchSchemaType = z.infer<typeof DispatchSchema>;
export type DispatchPublicSchemaType = z.infer<typeof DispatchPublicSchema>;
export type DispatchCreateInputSchemaType = z.infer<typeof DispatchCreateInputSchema>;
