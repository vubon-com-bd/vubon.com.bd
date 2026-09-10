import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { QuantitySchema } from '../../common/quantity.schema';
import { ProductSchema } from '../product/product.schema';
import { FLASH_SALE_INVENTORY } from '@vubon/shared-constants/src/business/flash-sales/flash-sale-inventory.constants';

const inventoryStatusKeys = Object.keys(FLASH_SALE_INVENTORY.STATUS) as [string, ...string[]];
const inventoryTypeKeys = Object.keys(FLASH_SALE_INVENTORY.INVENTORY_TYPES) as [
  string,
  ...string[],
];

export const FlashSaleInventorySchema = BaseSchema.extend({
  inventoryId: z.string().uuid(),
  flashSaleId: z.string().uuid(),
  productId: z.string().uuid(),
  product: ProductSchema,
  status: z.enum(inventoryStatusKeys),
  type: z.enum(inventoryTypeKeys),
  totalQuantity: QuantitySchema,
  reservedQuantity: QuantitySchema,
  soldQuantity: QuantitySchema,
  availableQuantity: QuantitySchema,
  isAvailable: z.boolean().default(true),
  isReserved: z.boolean().default(false),
  isSoldOut: z.boolean().default(false),
  lastUpdated: z.date(),
  metadata: z.record(z.unknown()).optional(),
});
