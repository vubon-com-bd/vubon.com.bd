/**
 * Warehouse application validator
 * @module logistics-service/application/validators
 */
import { z } from 'zod';
import { WarehouseSchema } from '@vubon/shared-schemas/logistics';

export const WarehouseCreateValidator = WarehouseSchema.omit({
  id: true, createdAt: true, updatedAt: true, deletedAt: true,
}).extend({
  capacityM3: z.number().positive(),
  capacityKg: z.number().positive(),
});
export type WarehouseCreateValidated = z.infer<typeof WarehouseCreateValidator>;
