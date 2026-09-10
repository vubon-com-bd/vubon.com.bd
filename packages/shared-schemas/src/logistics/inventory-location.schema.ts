import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { QuantitySchema } from '../common/quantity.schema';
import { ProductSchema } from '../business/product/product.schema';
import { INVENTORY_LOCATION } from '@vubon/shared-constants/src/logistics/inventory-location.constants';

const inventoryLocationStatusKeys = Object.keys(INVENTORY_LOCATION.STATUS) as [string, ...string[]];
const inventoryLocationTypeKeys = Object.keys(INVENTORY_LOCATION.TYPES) as [string, ...string[]];

export const InventoryLocationSchema = BaseSchema.extend({
  locationId: z.string().uuid(),
  warehouseId: z.string().uuid(),
  productId: z.string().uuid(),
  product: ProductSchema,
  status: z.enum(inventoryLocationStatusKeys),
  type: z.enum(inventoryLocationTypeKeys),
  locationCode: z.string(),
  quantity: QuantitySchema,
  reservedQuantity: QuantitySchema,
  availableQuantity: QuantitySchema,
  isAvailable: z.boolean().default(true),
  isReserved: z.boolean().default(false),
  isOccupied: z.boolean().default(false),
  lastUpdated: z.date(),
  metadata: z.record(z.unknown()).optional(),
});
