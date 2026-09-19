/**
 * Flash Sale Inventory Schema
 * @module shared-schemas/business/flash-sales
 *
 * Values আসে shared-constants/business/flash-sale-inventory.constants থেকে।
 */

import { z } from 'zod';
import { FLASH_SALE_INVENTORY_STATUS } from '@vubon/shared-constants/business';
import { UuidSchema } from '../../common/primitives/uuid.schema';

export const FlashSaleInventoryStatusSchema = z.enum(
  Object.values(FLASH_SALE_INVENTORY_STATUS) as [string, ...string[]]
);

export const FlashSaleInventorySchema = z.object({
  id: UuidSchema,
  flashSaleId: UuidSchema,
  productId: UuidSchema,
  variantId: UuidSchema.optional(),
  status: FlashSaleInventoryStatusSchema,
  totalStock: z.number().int().nonnegative(),
  reservedStock: z.number().int().nonnegative(),
  soldStock: z.number().int().nonnegative(),
  availableStock: z.number().int().nonnegative(),
  maxPerUser: z.number().int().positive().max(100),
  syncIntervalSeconds: z.number().int().positive(),
  lastSyncedAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const InventoryReservationSchema = z.object({
  inventoryId: UuidSchema,
  userId: UuidSchema,
  quantity: z.number().int().positive().max(100),
  reservedAt: z.string().datetime(),
  expiresAt: z.string().datetime(),
  cartId: UuidSchema.optional(),
  releasedAt: z.string().datetime().optional(),
  convertedAt: z.string().datetime().optional(),
});

export const InventorySnapshotSchema = z.object({
  inventoryId: UuidSchema,
  totalStock: z.number().int().nonnegative(),
  reservedStock: z.number().int().nonnegative(),
  soldStock: z.number().int().nonnegative(),
  availableStock: z.number().int().nonnegative(),
  capturedAt: z.string().datetime(),
});

export type FlashSaleInventoryStatusSchemaType = z.infer<typeof FlashSaleInventoryStatusSchema>;
export type FlashSaleInventorySchemaType = z.infer<typeof FlashSaleInventorySchema>;
export type InventoryReservationSchemaType = z.infer<typeof InventoryReservationSchema>;
export type InventorySnapshotSchemaType = z.infer<typeof InventorySnapshotSchema>;
