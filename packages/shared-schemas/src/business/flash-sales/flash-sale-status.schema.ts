/**
 * Flash Sale Status Schema
 * @module shared-schemas/business/flash-sales
 *
 * Values আসে shared-constants/business/flash-sale-status.constants থেকে।
 */

import { z } from 'zod';
import { FLASH_SALE_STATUS } from '@vubon/shared-constants/business';

export const FlashSaleStatusSchema = z.enum(
  Object.values(FLASH_SALE_STATUS) as [string, ...string[]]
);

export type FlashSaleStatusSchemaType = z.infer<typeof FlashSaleStatusSchema>;
