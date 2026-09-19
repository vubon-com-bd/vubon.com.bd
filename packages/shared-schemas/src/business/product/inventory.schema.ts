/**
 * Inventory Schema
 * @module shared-schemas/business/product
 *
 * Values আসে shared-constants/business/inventory.constants থেকে।
 */

import { z } from 'zod';
import { INVENTORY_STATUS } from '@vubon/shared-constants/business';
import { UuidSchema } from '../../common/primitives/uuid.schema';

export const InventoryStatusSchema = z.enum(
  Object.values(INVENTORY_STATUS) as [string, ...string[]]
);

export const InventorySchema = z.object({
  id: UuidSchema,
  productId: UuidSchema,
  variantId: UuidSchema.optional(),
  vendorId: UuidSchema.optional(),
  sku: z.string().min(1).max(64),
  quantity: z.number().int().nonnegative(),
  reserved: z.number().int().nonnegative(),
  available: z.number().int().nonnegative(),
  status: InventoryStatusSchema,
  lowStockThreshold: z.number().int().nonnegative(),
  locationId: UuidSchema.optional(),
  lastRestockedAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime(),
});

export const InventoryAdjustmentSchema = z.object({
  inventoryId: UuidSchema,
  delta: z.number().int(),
  reason: z.string().min(1).max(500),
  reference: z.string().max(255).optional(),
  adjustedBy: UuidSchema,
  adjustedAt: z.string().datetime(),
});

export const InventoryAlertSchema = z.object({
  inventoryId: UuidSchema,
  productId: UuidSchema,
  variantId: UuidSchema.optional(),
  currentStock: z.number().int().nonnegative(),
  threshold: z.number().int().nonnegative(),
  status: InventoryStatusSchema,
  createdAt: z.string().datetime(),
});

export type InventoryStatusSchemaType = z.infer<typeof InventoryStatusSchema>;
export type InventorySchemaType = z.infer<typeof InventorySchema>;
export type InventoryAdjustmentSchemaType = z.infer<typeof InventoryAdjustmentSchema>;
export type InventoryAlertSchemaType = z.infer<typeof InventoryAlertSchema>;
