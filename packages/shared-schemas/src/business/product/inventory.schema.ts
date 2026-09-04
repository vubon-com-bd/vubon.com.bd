/**
 * Inventory Schema
 * ইনভেন্টরি সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { INVENTORY_STATUS } from '@vubon/shared-constants';

export const InventorySchema = BaseSchema.extend({
  productId: z.string().uuid(),
  variantId: z.string().uuid().optional(),
  quantity: z.number().int().min(0).default(0),
  reserved: z.number().int().min(0).default(0),
  available: z.number().int().min(0).default(0),
  lowStockThreshold: z.number().int().min(0).default(10),
  status: z.enum(Object.values(INVENTORY_STATUS) as [string, ...string[]]),
  location: z.string().optional(),
  warehouseId: z.string().uuid().optional(),
  batchNumber: z.string().optional(),
  expiryDate: z.date().optional(),
  lastRestockedAt: z.date().optional(),
  lastSoldAt: z.date().optional(),
});

export const InventoryMovementSchema = BaseSchema.extend({
  inventoryId: z.string().uuid(),
  productId: z.string().uuid(),
  variantId: z.string().uuid().optional(),
  quantity: z.number().int(),
  type: z.enum([
    'purchase',
    'sale',
    'return',
    'adjustment',
    'transfer',
    'restock',
    'damage',
    'loss',
  ]),
  referenceId: z.string().uuid().optional(),
  referenceType: z.string().optional(),
  note: z.string().optional(),
  performedBy: z.string().uuid(),
});

export const InventoryCreateSchema = InventorySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  reserved: true,
  available: true,
});

export const InventoryUpdateSchema = InventoryCreateSchema.partial();

export type Inventory = z.infer<typeof InventorySchema>;
export type InventoryMovement = z.infer<typeof InventoryMovementSchema>;
export type InventoryCreate = z.infer<typeof InventoryCreateSchema>;
export type InventoryUpdate = z.infer<typeof InventoryUpdateSchema>;
