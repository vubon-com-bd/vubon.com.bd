import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { QuantitySchema } from '../../common/quantity.schema';
import { INVENTORY } from '@vubon/shared-constants/src/business/product/inventory.constants';

const inventoryStatusKeys = Object.keys(INVENTORY.STATUS) as [string, ...string[]];
const inventoryTypeKeys = Object.keys(INVENTORY.TYPES) as [string, ...string[]];

export const InventorySchema = BaseSchema.extend({
  inventoryId: z.string().uuid(),
  productId: z.string().uuid(),
  variantId: z.string().uuid().optional(),
  quantity: QuantitySchema,
  reserved: z.number().int().min(0).default(0),
  sold: z.number().int().min(0).default(0),
  returned: z.number().int().min(0).default(0),
  damaged: z.number().int().min(0).default(0),
  status: z.enum(inventoryStatusKeys),
  type: z.enum(inventoryTypeKeys),
  reorderPoint: z.number().int().min(0).default(10),
  reorderQuantity: z.number().int().min(1).default(50),
  warehouseId: z.string(),
  warehouseLocation: z.string(),
  isInStock: z.boolean().default(true),
  isLowStock: z.boolean().default(false),
  isOutOfStock: z.boolean().default(false),
  lastRestockedAt: z.date().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const InventoryCreateSchema = InventorySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  sold: true,
  returned: true,
  damaged: true,
});
