import { z } from 'zod';
import { FLASH_SALE_TYPE } from '@vubon/shared-constants/src/business/flash-sales/flash-sale-type.constants';

const flashSaleTypeKeys = Object.keys(FLASH_SALE_TYPE) as [string, ...string[]];

export const FlashSaleTypeSchema = z.object({
  type: z.enum(flashSaleTypeKeys),
  category: z.literal('flash_sale'),
  durationHours: z.number().min(1),
  maxProducts: z.number().int().min(1),
  maxDiscount: z.number().min(0).max(100),
  isRecurring: z.boolean().default(false),
});

export const FlashSaleTypeEnumSchema = z.enum(flashSaleTypeKeys);
