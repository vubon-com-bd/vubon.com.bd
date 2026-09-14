/**
 * Inventory Location Schema
 * @module shared-schemas/logistics
 */

import { z } from 'zod';
import { UuidSchema } from '../common/primitives/uuid.schema';

export const InventoryLocationSchema = z.object({
  id: UuidSchema,
  warehouseId: UuidSchema,
  zone: z.string().min(1).max(50),
  aisle: z.string().max(20).optional(),
  rack: z.string().max(20).optional(),
  shelf: z.string().max(20).optional(),
  bin: z.string().max(20).optional(),
  barcode: z.string().max(100).optional(),
  isActive: z.boolean(),
});

export const InventoryStockSchema = z.object({
  id: UuidSchema,
  productId: UuidSchema,
  variantId: UuidSchema.optional(),
  locationId: UuidSchema,
  warehouseId: UuidSchema,
  quantity: z.number().int().nonnegative(),
  reserved: z.number().int().nonnegative(),
  available: z.number().int().nonnegative(),
  lastCountedAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime(),
});

export const InventoryMovementSchema = z.object({
  id: UuidSchema,
  stockId: UuidSchema,
  type: z.enum(['inbound', 'outbound', 'transfer', 'adjustment', 'return']),
  quantity: z.number().int(),
  fromLocationId: UuidSchema.optional(),
  toLocationId: UuidSchema.optional(),
  referenceType: z.string().max(50).optional(),
  referenceId: z.string().max(100).optional(),
  reason: z.string().max(500).optional(),
  movedBy: UuidSchema,
  movedAt: z.string().datetime(),
});

export type InventoryLocationSchemaType = z.infer<typeof InventoryLocationSchema>;
export type InventoryStockSchemaType = z.infer<typeof InventoryStockSchema>;
export type InventoryMovementSchemaType = z.infer<typeof InventoryMovementSchema>;
